// app/api/payments/card/return/route.ts
//
// Where the gateway sends the customer after the payment page, paid, declined
// or cancelled (&cancelled=1). The link only says "go and look": the outcome is
// read from the gateway by reconcileCardAttempt, so a forged or replayed return
// can't mark anything paid. Then the customer lands on their order page.

import { NextResponse } from "next/server";
import { reconcileCardAttempt, referenceOfAttempt, siteOrigin } from "@/lib/payments/card";
import { isValidOrderToken, orderPageUrl } from "@/lib/payments/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("ref") ?? "";
  const attempt = searchParams.get("a") ?? "";

  if (!isValidOrderToken(reference, searchParams.get("t")) || referenceOfAttempt(attempt) !== reference) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  const source = searchParams.get("cancelled") === "1" ? "cancel" : "return";
  // If this can't settle the order yet, the order page keeps polling and the
  // gateway's webhook still gets its turn.
  await reconcileCardAttempt(reference, attempt, source);

  return NextResponse.redirect(new URL(orderPageUrl(reference), siteOrigin()), 303);
}

export const GET = handle;
export const POST = handle;
