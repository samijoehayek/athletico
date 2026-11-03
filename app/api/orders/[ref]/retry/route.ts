// app/api/orders/[ref]/retry/route.ts
//
// POST /api/orders/:ref/retry  {t}: restart the payment for an order whose
// payment failed, was cancelled or expired. Same order, same reference, same
// rows in the sheet; only a new payment attempt. Refused once an order is paid.

import { NextResponse } from "next/server";
import { loadOrder } from "@/lib/payments/orders";
import { orderPageUrl, startPayment } from "@/lib/payments/providers";
import { isValidOrderToken } from "@/lib/payments/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const reference = decodeURIComponent(ref);

  let token: unknown;
  try {
    token = (await request.json())?.t;
  } catch {
    token = undefined;
  }
  if (!isValidOrderToken(reference, token)) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  const result = await loadOrder(reference);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't load your order. Please try again in a minute." },
      { status: 503 },
    );
  }

  const { status, order } = result.loaded;
  if (status === "PAID") {
    // Already paid (e.g. a callback landed after the page showed "failed").
    return NextResponse.json({ ok: true, next: { kind: "await", url: orderPageUrl(reference) } });
  }
  if (status !== "PENDING PAYMENT" && status !== "PAYMENT FAILED") {
    return NextResponse.json(
      { ok: false, error: "This order can't be paid any more. Please contact us quoting your reference." },
      { status: 409 },
    );
  }

  const started = await startPayment(order);
  if (!started.ok) {
    console.error("[orders] retry did not start", reference, started.error);
    return NextResponse.json({ ok: false, error: started.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, next: started.next });
}
