// lib/payments/mpgs.ts
//
// Server-only client for the Mastercard Payment Gateway (MPGS) that Bank of
// Beirut runs for the club. Hosted Checkout: card details are typed on
// Mastercard's page, never on this site. Knows nothing about orders or the
// sheet; lib/payments/card.ts wires it to them.
//
// Test and production differ only by env vars: a test merchant ID starts with
// "TEST" (TESTATHLETICO), and the password and host come with it.

const API_VERSION = 100;
const TIMEOUT_MS = 15_000;

interface MpgsConfig {
  merchantId: string;
  password: string;
  baseUrl: string;
}

function config(): MpgsConfig | null {
  const merchantId = process.env.MPGS_MERCHANT_ID?.trim();
  const password = process.env.MPGS_API_PASSWORD?.trim();
  const baseUrl = process.env.MPGS_BASE_URL?.trim().replace(/\/+$/, "");
  return merchantId && password && baseUrl ? { merchantId, password, baseUrl } : null;
}

/** True when the credentials are the gateway's test profile: no real money moves. */
export function mpgsIsTest(): boolean {
  return Boolean(config()?.merchantId.startsWith("TEST"));
}

/**
 * Credentials are present and safe to use here. A test merchant is refused on
 * production, because test cards mark orders PAID with no money, unless
 * PAYMENTS_TEST_ON_PRODUCTION=1 says the live site is deliberately in its testing
 * phase. Checkout then shows a "Test mode" notice and orders are tagged as tests.
 * The switch only ever applies to a test merchant: with production credentials
 * it does nothing, so leaving it set can't affect real payments.
 */
export function mpgsConfigured(): boolean {
  if (!config()) return false;
  if (!mpgsIsTest() || process.env.VERCEL_ENV !== "production") return true;
  return process.env.PAYMENTS_TEST_ON_PRODUCTION === "1";
}

/** The gateway's Checkout script, which sends the browser to the payment page. */
export function checkoutScriptUrl(): string | null {
  const c = config();
  return c ? `${c.baseUrl}/static/checkout/checkout.min.js` : null;
}

async function request(c: MpgsConfig, path: string, init?: RequestInit): Promise<Response> {
  const auth = Buffer.from(`merchant.${c.merchantId}:${c.password}`).toString("base64");
  return fetch(`${c.baseUrl}/api/rest/version/${API_VERSION}/merchant/${c.merchantId}${path}`, {
    ...init,
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

export interface CheckoutSessionInput {
  /** Unique per payment attempt: the gateway refuses a reused order id. */
  gatewayOrderId: string;
  reference: string;
  amountUSD: number;
  email: string;
  returnUrl: string;
  cancelUrl: string;
}

export type SessionResult = { ok: true; sessionId: string } | { ok: false; error: string };

export async function createCheckoutSession(input: CheckoutSessionInput): Promise<SessionResult> {
  const c = config();
  if (!c) return { ok: false, error: "MPGS is not configured" };

  try {
    const res = await request(c, "/session", {
      method: "POST",
      body: JSON.stringify({
        apiOperation: "INITIATE_CHECKOUT",
        checkoutMode: "WEBSITE",
        interaction: {
          // One-step charge: no separate capture for the club to remember.
          operation: "PURCHASE",
          merchant: { name: "Athletico Sports Club" },
          returnUrl: input.returnUrl,
          cancelUrl: input.cancelUrl,
          // Orders are collected from a branch, so no address is ever needed.
          displayControl: { billingAddress: "HIDE", shipping: "HIDE", customerEmail: "READ_ONLY" },
        },
        customer: { email: input.email },
        order: {
          id: input.gatewayOrderId,
          reference: input.reference,
          // Always the server's total, from the catalogue, never the browser's.
          amount: input.amountUSD.toFixed(2),
          currency: "USD",
          description: `Athletico Store ${input.reference}`,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.session?.id) {
      return { ok: false, error: `gateway refused the session: ${data.error?.explanation ?? `HTTP ${res.status}`}` };
    }
    return { ok: true, sessionId: data.session.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** The parts of the gateway's order record that decide whether it was paid. */
export interface GatewayOrder {
  id: string;
  result?: string;
  status?: string;
  currency?: string;
  amount?: number;
  totalCapturedAmount?: number;
  sourceOfFunds?: { provided?: { card?: { brand?: string; number?: string } } };
  transaction?: {
    result?: string;
    transaction?: { id?: string; receipt?: string };
  }[];
}

export type RetrieveResult =
  /** `order` is null when the gateway has no such order: nothing was attempted. */
  | { ok: true; order: GatewayOrder | null }
  | { ok: false; error: string };

export async function retrieveGatewayOrder(gatewayOrderId: string): Promise<RetrieveResult> {
  const c = config();
  if (!c) return { ok: false, error: "MPGS is not configured" };

  try {
    const res = await request(c, `/order/${encodeURIComponent(gatewayOrderId)}`);
    const data = await res.json();
    if (res.ok) return { ok: true, order: data as GatewayOrder };
    // The gateway answers 400 "Unable to find order" for an unknown id.
    if (res.status === 400 && /unable to find order/i.test(data.error?.explanation ?? "")) {
      return { ok: true, order: null };
    }
    return { ok: false, error: data.error?.explanation ?? `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export type CardOutcome =
  | { state: "paid"; receipt?: string; cardLabel: string }
  | { state: "failed"; reason: string }
  | { state: "pending" }
  /** Money was captured but doesn't match the order. Needs a person, not code. */
  | { state: "mismatch"; detail: string };

/**
 * THE rule for card payments. An order is paid only if the gateway itself says
 * it was captured, in full, in USD. Nothing the browser sends can reach this.
 */
export function classifyGatewayOrder(order: GatewayOrder, expectedTotalUSD: number): CardOutcome {
  if (order.result === "SUCCESS" && order.status === "CAPTURED") {
    const captured = Number(order.totalCapturedAmount);
    if (order.currency !== "USD" || Math.abs(captured - expectedTotalUSD) > 0.001) {
      return {
        state: "mismatch",
        detail: `captured ${order.totalCapturedAmount} ${order.currency}, order total ${expectedTotalUSD} USD`,
      };
    }
    const card = order.sourceOfFunds?.provided?.card;
    const lastFour = card?.number?.slice(-4);
    const paid = [...(order.transaction ?? [])].reverse().find((t) => t.result === "SUCCESS");
    return {
      state: "paid",
      receipt: paid?.transaction?.receipt ?? paid?.transaction?.id,
      cardLabel: [card?.brand, lastFour && `•••• ${lastFour}`].filter(Boolean).join(" "),
    };
  }
  if (
    order.result === "FAILURE" ||
    order.status === "FAILED" ||
    order.status === "CANCELLED" ||
    order.status === "AUTHENTICATION_UNSUCCESSFUL"
  ) {
    return { state: "failed", reason: `Card payment ${order.status ?? order.result}` };
  }
  // Refunds, chargebacks and in-progress states don't change the order here.
  return { state: "pending" };
}
