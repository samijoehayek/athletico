// lib/store/order-book.ts
//
// Server-only client for the club's order book: the Google Apps Script web app
// in docs/apps-script/Code.gs, bound to the order sheet. It is the shop's only
// store of orders. Never import this from a client component: it reads
// ORDERS_SHARED_SECRET.
//
// Actions (all idempotent on the Apps Script side, under a script lock):
//   createOrder  write the Items + Orders rows as PENDING PAYMENT
//   markPaid     flip to PAID once a gateway has confirmed the money;
//                `firstTime` is true only once, so confirmation emails go once
//   markFailed   flip a still-pending order to PAYMENT FAILED
//   getOrder     read an order back (payment state + the full order)

type OrderBookRequest =
  | { action: "createOrder"; order: unknown }
  | {
      action: "markPaid";
      reference: string;
      payment: { method: string; reference?: string; gatewayId?: string; paidAt?: string };
    }
  | { action: "markFailed"; reference: string; reason?: string }
  | { action: "getOrder"; reference: string };

export type OrderBookResponse = { ok: boolean; error?: string } & Record<string, unknown>;

/** Apps Script can be slow to wake; anything past this is treated as down. */
const TIMEOUT_MS = 15_000;

export function orderBookConfigured(): boolean {
  return Boolean(process.env.ORDERS_WEBHOOK_URL && process.env.ORDERS_SHARED_SECRET);
}

export async function callOrderBook(request: OrderBookRequest): Promise<OrderBookResponse> {
  const url = process.env.ORDERS_WEBHOOK_URL;
  const secret = process.env.ORDERS_SHARED_SECRET;
  if (!url || !secret) {
    return { ok: false, error: "ORDERS_WEBHOOK_URL / ORDERS_SHARED_SECRET not set" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // text/plain is what Apps Script's doPost reads, and avoids any preflight.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...request }),
      // Apps Script answers a POST with a redirect to the response; follow it.
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };

    // Apps Script reports its own failures (bad secret, missing tab) as HTTP 200
    // with ok:false, so the body decides, not the status code.
    const text = await res.text();
    try {
      return JSON.parse(text) as OrderBookResponse;
    } catch {
      // An HTML page here usually means the deployment isn't set to "Anyone".
      return { ok: false, error: "order book returned non-JSON (check the web app's access is 'Anyone')" };
    }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
