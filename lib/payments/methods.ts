// lib/payments/methods.ts
//
// The ways a customer can pay, as shown at checkout. Isomorphic: the browser
// renders these, the server validates against the same ids. Which methods are
// actually offered is decided on the server (lib/payments/providers.ts) from
// the credentials that are configured, so a method without credentials never
// appears.

export type PaymentMethodId = "bob-wallet" | "card";

export interface PaymentMethodInfo {
  id: PaymentMethodId;
  label: string;
  /** One line under the label at checkout. */
  blurb: string;
  /** Written into the order sheet's METHOD / PAYMENT columns. */
  sheetLabel: string;
}

export const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethodInfo> = {
  "bob-wallet": {
    id: "bob-wallet",
    label: "BOB Wallet",
    blurb: "Enter your BOB Finance mobile number, then approve the payment in the BOB app.",
    sheetLabel: "BOB Wallet",
  },
  card: {
    id: "card",
    label: "Card",
    blurb: "Visa or Mastercard, paid on Bank of Beirut's secure payment page.",
    sheetLabel: "Card",
  },
};

export function isPaymentMethodId(value: unknown): value is PaymentMethodId {
  return value === "bob-wallet" || value === "card";
}

/** Payment state as recorded in the Orders tab of the order sheet. */
export type PaymentStatus = "PENDING PAYMENT" | "PAID" | "PAYMENT FAILED" | "REFUNDED";

/** What the browser does after an order has been created. */
export type PaymentNextStep =
  /** Leave the site for a payment page (the card gateway, or the simulator). */
  | { kind: "redirect"; url: string }
  /** Stay on the order page and wait (BOB: the customer approves in the app). */
  | { kind: "await"; url: string };
