// lib/store/config.ts
//
// Club-specific values that differ between environments. Everything here has a
// visible placeholder fallback so the store runs before the club has sent its
// real details — see docs/STORE.md for the handover checklist.

export const BOB_ACCOUNT = process.env.NEXT_PUBLIC_BOB_ACCOUNT || "XXXXXXXXXX";
export const BOB_NAME = process.env.NEXT_PUBLIC_BOB_NAME || "Athletico Sports Club";
export const BOB_QR = "/store/bob-qr.svg";

/** True once real payment details have been supplied. Drives the on-page notice. */
export const PAYMENT_DETAILS_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_BOB_ACCOUNT);

export const STORE_NAME = "Athletico Store";
