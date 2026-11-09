// lib/payments/card.ts
//
// Server-only. Card payments for an order: starts a Hosted Checkout attempt and
// settles the order sheet from what the gateway reports. The customer's return,
// a cancel and the gateway's webhook all end up in reconcileCardAttempt, so they
// agree, and any of them can fire twice or in any order: the sheet's markPaid
// happens once, and a late failure never undoes a confirmed payment.
//
// Each attempt has its own gateway order id, ATH-261109-K4P2-3F9A0C, because the
// gateway refuses to reuse one after a failure. Those ids also lead back to the
// order, which is how a webhook finds it with no database.

import { randomBytes } from "node:crypto";
import { callOrderBook } from "../store/order-book";
import {
  classifyGatewayOrder,
  createCheckoutSession,
  mpgsConfigured,
  mpgsIsTest,
  retrieveGatewayOrder,
} from "./mpgs";
import { loadOrder } from "./orders";
import type { PayableOrder, StartResult } from "./providers";
import { orderToken } from "./token";

/** The order a gateway order id belongs to, or null if it isn't one of ours. */
export function referenceOfAttempt(gatewayOrderId: unknown): string | null {
  if (typeof gatewayOrderId !== "string") return null;
  return /^(ATH-\d{6}-[A-Z0-9]+)-[A-F0-9]{6}$/.exec(gatewayOrderId)?.[1] ?? null;
}

/**
 * This site's public address, for the URLs the gateway sends customers back to.
 * Never taken from the incoming request, whose Host header anyone can set.
 */
export function siteOrigin(): string {
  const explicit = process.env.PAYMENTS_SITE_ORIGIN?.trim().replace(/\/+$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const cardProvider = {
  configured: mpgsConfigured,

  async start(order: PayableOrder): Promise<StartResult> {
    const attempt = `${order.reference}-${randomBytes(3).toString("hex").toUpperCase()}`;
    const params = new URLSearchParams({ ref: order.reference, t: orderToken(order.reference), a: attempt });
    const back = `${siteOrigin()}/api/payments/card/return?${params}`;

    const session = await createCheckoutSession({
      gatewayOrderId: attempt,
      reference: order.reference,
      amountUSD: order.totalUSD,
      email: order.customer.email,
      returnUrl: back,
      cancelUrl: `${back}&cancelled=1`,
    });
    if (!session.ok) {
      console.error("[card] session failed", order.reference, session.error);
      return { ok: false, error: "We couldn't open the bank's payment page. Please try again." };
    }

    params.set("session", session.sessionId);
    return { ok: true, next: { kind: "redirect", url: `/store/pay/card?${params}` } };
  },
};

/** Who is asking: the customer coming back (or cancelling), or the gateway. */
export type ReconcileSource = "return" | "cancel" | "webhook";

/**
 * Brings the order sheet into line with the gateway for one payment attempt.
 * Returns false only when it should be tried again (gateway or sheet unreachable).
 */
export async function reconcileCardAttempt(
  reference: string,
  attempt: string,
  source: ReconcileSource,
): Promise<boolean> {
  const gateway = await retrieveGatewayOrder(attempt);
  if (!gateway.ok) {
    console.error("[card] couldn't read the gateway order", attempt, gateway.error);
    return false;
  }

  const stored = await loadOrder(reference);
  if (!stored.ok) {
    console.error("[card] couldn't load the order", reference, attempt, stored.error);
    return stored.notFound; // Retrying can't make a missing order appear.
  }

  const outcome = gateway.order
    ? classifyGatewayOrder(gateway.order, stored.loaded.order.totalUSD)
    : null;

  if (outcome?.state === "paid") {
    const method = `Card${mpgsIsTest() ? " (test)" : ""}${outcome.cardLabel ? ` · ${outcome.cardLabel}` : ""}`;
    const paid = await callOrderBook({
      action: "markPaid",
      reference,
      payment: { method, reference: outcome.receipt, gatewayId: attempt },
    });
    if (!paid.ok) {
      // The bank has the money and the sheet doesn't know. Keep everything needed
      // to fix it by hand; the webhook's retries may also still get through.
      console.error("[card] UNRECORDED PAYMENT", reference, attempt, method, outcome.receipt, paid.error);
      return false;
    }
    if (paid.secondPayment) {
      console.error("[card] SECOND PAYMENT for a paid order, refund it", reference, attempt, outcome.receipt);
    }
    return true;
  }

  if (outcome?.state === "mismatch") {
    // Should be impossible: the session carries the server's total. Never mark
    // it paid, and don't call it failed either, since money did move.
    console.error("[card] AMOUNT MISMATCH", reference, attempt, outcome.detail);
    return true;
  }

  const reason =
    outcome?.state === "failed"
      ? outcome.reason
      : source === "cancel"
        ? "Cancelled on the payment page"
        : !outcome && source === "return"
          ? "No payment reached the gateway"
          : null;
  // Otherwise still in progress, or a webhook about an attempt with no record.
  if (!reason) return true;

  const failed = await callOrderBook({ action: "markFailed", reference, reason });
  if (!failed.ok) console.error("[card] couldn't mark the order failed", reference, attempt, failed.error);
  return failed.ok;
}
