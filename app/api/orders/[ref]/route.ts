// app/api/orders/[ref]/route.ts
//
// GET /api/orders/:ref?t=<token>: the order page polls this for the payment
// state. The token (lib/payments/token.ts) is required, so a guessed reference
// reveals nothing. The answer comes from the order sheet, never from the
// browser, so a customer can't talk their order into "paid".

import { NextResponse } from "next/server";
import { loadOrder, publicView } from "@/lib/payments/orders";
import { isValidOrderToken } from "@/lib/payments/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(request: Request, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const reference = decodeURIComponent(ref);
  const token = new URL(request.url).searchParams.get("t");

  if (!isValidOrderToken(reference, token)) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404, headers: NO_STORE });
  }

  const result = await loadOrder(reference);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.notFound ? "not found" : "unavailable" },
      { status: result.notFound ? 404 : 503, headers: NO_STORE },
    );
  }

  return NextResponse.json({ ok: true, order: publicView(reference, result.loaded) }, { headers: NO_STORE });
}
