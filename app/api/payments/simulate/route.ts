// app/api/payments/simulate/route.ts
//
// POST {ref, t, outcome: "approve" | "decline"}: the payment simulator's
// verdict. Exists only while PAYMENTS_SIMULATOR=1 on a non-production
// deployment (lib/payments/providers.ts); everywhere else it answers 404.
// It drives the real order sheet exactly as a gateway confirmation will, so
// the order page, the PAID / PAYMENT FAILED statuses and retries can be tested
// before any bank credentials exist.

import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { loadOrder } from "@/lib/payments/orders";
import { orderPageUrl, simulatorEnabled } from "@/lib/payments/providers";
import { isValidOrderToken } from "@/lib/payments/token";
import { callOrderBook } from "@/lib/store/order-book";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!simulatorEnabled()) return NextResponse.json({ ok: false }, { status: 404 });

  let body: { ref?: string; t?: string; outcome?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }
  const reference = String(body.ref ?? "");
  if (!isValidOrderToken(reference, body.t)) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  const result = await loadOrder(reference);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 503 });
  const { order } = result.loaded;

  const outcome =
    body.outcome === "approve"
      ? await callOrderBook({
          action: "markPaid",
          reference,
          payment: {
            method: order.payment.label + " (simulated)",
            reference: `SIM-${randomBytes(4).toString("hex").toUpperCase()}`,
            gatewayId: "simulator",
          },
        })
      : await callOrderBook({ action: "markFailed", reference, reason: "Declined in the payment simulator" });

  if (!outcome.ok) return NextResponse.json({ ok: false, error: outcome.error }, { status: 503 });
  return NextResponse.json({ ok: true, url: orderPageUrl(reference) });
}
