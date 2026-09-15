// app/api/orders/route.ts
//
// The only server-side code in the store. It exists for four reasons, in order
// of importance:
//
//   1. Price integrity. The browser sends product IDs and quantities — never
//      prices. Every total is recomputed here from the catalogue, so a crafted
//      request cannot buy a $45 jersey for $1.
//   2. Credential safety. The order-book URL and its shared secret never reach
//      the client bundle.
//   3. Reliability. A server-to-server call to Google has no CORS class of bug.
//   4. Abuse control. Honeypot, rate limiting and payload validation live here.
//
// There is no database and no state between requests.

import { NextResponse } from "next/server";
import { getZone, priceCart, round2 } from "@/lib/store/pricing";
import { hasErrors, validateOrder } from "@/lib/store/validate";
import type { CustomerDetails, OrderPayload } from "@/lib/store/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ITEMS = 40;
const RATE_LIMIT = { windowMs: 60_000, max: 5 };

// Per-instance only — serverless spreads requests across instances, so this
// stops naive bursts rather than a determined attacker. Good enough at this
// volume; a shared store would be the upgrade if abuse ever becomes real.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t > RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

/** ATH-260911-K4P2 — short enough to read over the phone, unique in practice. */
function orderReference(): string {
  const d = new Date();
  const stamp = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()]
    .map((n) => String(n).padStart(2, "0"))
    .join("");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `ATH-${stamp}-${suffix}`;
}

function clean(value: unknown, max = 240): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many orders from this connection. Please wait a minute." },
      { status: 429 },
    );
  }

  let payload: OrderPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a bot fills every field it finds, a human never sees this one.
  // Answer 200 so the bot believes it succeeded and doesn't retry.
  if (clean(payload.company)) {
    return NextResponse.json({ ok: true, reference: orderReference(), order: null });
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return NextResponse.json({ ok: false, error: "Your bag is empty." }, { status: 400 });
  }
  if (payload.items.length > MAX_ITEMS) {
    return NextResponse.json({ ok: false, error: "Too many items in one order." }, { status: 400 });
  }

  const customer: CustomerDetails = {
    name: clean(payload.customer?.name, 120),
    phone: clean(payload.customer?.phone, 40),
    email: clean(payload.customer?.email, 160),
    zone: payload.customer?.zone ?? "beirut",
    address: clean(payload.customer?.address, 300),
    building: clean(payload.customer?.building, 160),
    landmark: clean(payload.customer?.landmark, 160),
    notes: clean(payload.customer?.notes, 600),
  };
  const payment = {
    method: payload.payment?.method ?? "cod",
    reference: clean(payload.payment?.reference, 80),
  };

  const fieldErrors = validateOrder(customer, payment);
  if (hasErrors(fieldErrors)) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  // THE important line: prices come from the catalogue, never from the request.
  const priced = priceCart(payload.items);
  if (priced.lines.length === 0) {
    return NextResponse.json(
      { ok: false, error: priced.errors[0] ?? "Nothing in your bag is still available." },
      { status: 409 },
    );
  }

  const zone = getZone(customer.zone);
  const deliveryUSD = zone.feeUSD;
  const totalUSD = round2(priced.subtotalUSD + deliveryUSD);
  const reference = orderReference();

  const order = {
    reference,
    placedAt: new Date().toISOString(),
    customer,
    zoneLabel: zone.label,
    zoneEta: zone.eta,
    payment,
    lines: priced.lines,
    subtotalUSD: priced.subtotalUSD,
    deliveryUSD,
    totalUSD,
    status: payment.method === "cod" ? "NEW — COD" : "AWAITING PAYMENT",
    unavailable: priced.errors,
  };

  // Forward to the order book. A failure here must not lose the order: we still
  // return success with the reference, and the confirmation screen pushes the
  // WhatsApp hand-off so it reaches the club regardless.
  let recorded = false;
  const webhook = process.env.ORDERS_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        // text/plain avoids a CORS preflight on Apps Script and is what it reads.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ secret: process.env.ORDERS_SHARED_SECRET ?? "", order }),
        signal: AbortSignal.timeout(10_000),
      });
      recorded = res.ok;
      if (!res.ok) console.error("[orders] order book rejected", reference, res.status);
    } catch (err) {
      console.error("[orders] order book unreachable", reference, err);
    }
  } else {
    console.warn("[orders] ORDERS_WEBHOOK_URL not set — order not recorded:", reference);
  }

  // Always log the full payload so a failed delivery can be replayed by hand.
  if (!recorded) console.error("[orders] UNRECORDED ORDER", JSON.stringify(order));

  return NextResponse.json({ ok: true, reference, recorded, order });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
