// lib/payments/token.ts
//
// Server-only. An order's page and API (status, retry) are reachable only with
// a token derived from the order reference, so knowing or guessing a reference
// (they're short, ATH-YYMMDD-XXXX) isn't enough to read someone's order or
// restart their payment. The token is an HMAC, so nothing has to be stored.

import { createHmac, timingSafeEqual } from "node:crypto";

function secret(): string {
  const value = process.env.PAYMENT_TOKEN_SECRET || process.env.ORDERS_SHARED_SECRET;
  if (!value) throw new Error("PAYMENT_TOKEN_SECRET (or ORDERS_SHARED_SECRET) must be set");
  return value;
}

export function orderToken(reference: string): string {
  return createHmac("sha256", secret()).update(`order:${reference}`).digest("base64url").slice(0, 24);
}

export function isValidOrderToken(reference: string, token: unknown): boolean {
  if (typeof token !== "string" || token.length !== 24) return false;
  const expected = Buffer.from(orderToken(reference));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** The customer-facing order page, carrying its token. */
export function orderPageUrl(reference: string): string {
  return `/store/order/${encodeURIComponent(reference)}?t=${orderToken(reference)}`;
}
