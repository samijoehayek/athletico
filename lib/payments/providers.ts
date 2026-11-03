// lib/payments/providers.ts
//
// Server-only. The one place that knows which payment methods exist, which are
// switched on, and how to start or re-check a payment for each.
//
// A method is offered at checkout only when its provider is configured (its
// credentials are set). Real providers:
//   card        Mastercard Gateway (MPGS) Hosted Checkout, Bank of Beirut — step 5
//   bob-wallet  BOB Finance merchant checkout API — step 6
//
// The SIMULATOR stands in for both while credentials are pending, so the whole
// order lifecycle (pending → paid / failed → confirmed) can be exercised against
// the real order sheet. It is on only when PAYMENTS_SIMULATOR=1 AND the
// deployment is not production; a production deployment can never offer it.

import { PAYMENT_METHODS, type PaymentMethodId, type PaymentNextStep } from "./methods";
import { orderPageUrl, orderToken } from "./token";

/** The parts of a stored order a provider needs. */
export interface PayableOrder {
  reference: string;
  totalUSD: number;
  customer: { name: string; email: string };
  payment: { method: PaymentMethodId; mobile?: string; simulated?: boolean };
}

export type StartResult = { ok: true; next: PaymentNextStep } | { ok: false; error: string };

interface PaymentProvider {
  /** Credentials present, so the method can be offered. */
  configured(): boolean;
  /** Begin (or restart, after a failure) the payment for an order. */
  start(order: PayableOrder): Promise<StartResult>;
}

export function simulatorEnabled(): boolean {
  return process.env.PAYMENTS_SIMULATOR === "1" && process.env.VERCEL_ENV !== "production";
}

/** Sends the customer to the simulator page, whatever method they chose. */
const simulator: PaymentProvider = {
  configured: simulatorEnabled,
  async start(order) {
    const params = new URLSearchParams({ ref: order.reference, t: orderToken(order.reference) });
    return { ok: true, next: { kind: "redirect", url: `/store/pay/simulate?${params}` } };
  },
};

// Real providers are registered here as they're built (steps 5 and 6).
const PROVIDERS: Partial<Record<PaymentMethodId, PaymentProvider>> = {};

function providerFor(method: PaymentMethodId): PaymentProvider | null {
  const real = PROVIDERS[method];
  if (real?.configured()) return real;
  return simulatorEnabled() ? simulator : null;
}

/** Methods to offer at checkout, in display order. */
export function availableMethods(): PaymentMethodId[] {
  return (Object.keys(PAYMENT_METHODS) as PaymentMethodId[]).filter((m) => providerFor(m) !== null);
}

/** True when the chosen method would be handled by the simulator. */
export function isSimulated(method: PaymentMethodId): boolean {
  return providerFor(method) === simulator;
}

export async function startPayment(order: PayableOrder): Promise<StartResult> {
  const provider = providerFor(order.payment.method);
  if (!provider) return { ok: false, error: "This payment method isn't available right now." };
  return provider.start(order);
}

export { orderPageUrl };
