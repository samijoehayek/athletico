// app/api/payments/card/webhook/route.ts
//
// The gateway's server-to-server notification: the backup for a customer who
// paid and closed the tab before coming back. Registered in the merchant portal
// (Admin → Webhook Notifications), which issues the secret it sends in the
// X-Notification-Secret header. The notification's contents aren't trusted
// either; it only names the order to look up at the gateway.

import { timingSafeEqual } from "node:crypto";
import { after, NextResponse } from "next/server";
import { reconcileCardAttempt, referenceOfAttempt } from "@/lib/payments/card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The gateway wants an answer within 2 s; the order sheet can take longer. */
const ANSWER_WITHIN_MS = 1_500;

function secretMatches(given: string | null, expected: string): boolean {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const expected = process.env.MPGS_WEBHOOK_SECRET?.trim();
  if (!expected) return NextResponse.json({ ok: false }, { status: 404 });
  if (!secretMatches(request.headers.get("x-notification-secret"), expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let attempt: unknown;
  try {
    attempt = (await request.json())?.order?.id;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const reference = referenceOfAttempt(attempt);
  // Not one of the shop's orders (a portal test, say): acknowledge and ignore.
  if (!reference) return NextResponse.json({ ok: true });

  const work = reconcileCardAttempt(reference, attempt as string, "webhook");
  const settled = await Promise.race([
    work,
    new Promise<"late">((resolve) => setTimeout(() => resolve("late"), ANSWER_WITHIN_MS)),
  ]);
  if (settled === "late") {
    // Answer in time and finish in the background. A failure past this point is
    // logged by reconcileCardAttempt rather than retried by the gateway.
    after(() => work);
    return NextResponse.json({ ok: true });
  }
  // A quick failure is answered as one, so the gateway retries it.
  return NextResponse.json({ ok: settled }, { status: settled ? 200 : 503 });
}
