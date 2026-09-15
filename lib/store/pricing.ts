// lib/store/pricing.ts
//
// The single source of truth for money. The browser imports this to render
// totals; the order route imports the SAME functions to recompute them from
// scratch. The browser is never trusted with a price — it sends product IDs
// and quantities, and the server works out what that actually costs.

import { getProduct } from "./catalog";
import type {
  CartLineInput,
  DeliveryZoneId,
  PaymentMethodId,
  PricedCart,
  PricedLine,
} from "./types";

export const DELIVERY_ZONES: {
  id: DeliveryZoneId;
  label: string;
  feeUSD: number;
  eta: string;
}[] = [
  { id: "beirut", label: "Beirut & metro area", feeUSD: 3, eta: "1–2 working days" },
  { id: "lebanon", label: "Rest of Lebanon", feeUSD: 5, eta: "2–3 working days" },
  { id: "collect", label: "Collect from a branch", feeUSD: 0, eta: "Ready next day" },
];

export const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  blurb: string;
  requiresReference: boolean;
  referenceLabel?: string;
}[] = [
  {
    id: "cod",
    label: "Cash on delivery",
    blurb: "Pay the courier when your order arrives. Nothing to do now.",
    requiresReference: false,
  },
  {
    id: "whish",
    label: "Whish",
    blurb: "Send the exact total from your Whish app, then enter the transaction reference below.",
    requiresReference: true,
    referenceLabel: "Whish transaction reference",
  },
  {
    id: "bob",
    label: "BOB Finance",
    blurb: "Pay at any BoB Finance branch or from the BoB wallet, then enter the reference below.",
    requiresReference: true,
    referenceLabel: "BOB transaction reference",
  },
];

export function getZone(id: DeliveryZoneId) {
  return DELIVERY_ZONES.find((z) => z.id === id) ?? DELIVERY_ZONES[0];
}

export function getPaymentMethod(id: PaymentMethodId) {
  return PAYMENT_METHODS.find((m) => m.id === id) ?? PAYMENT_METHODS[0];
}

export const MAX_QTY_PER_LINE = 10;

/**
 * Re-price a cart from the catalogue. Anything that cannot be resolved — a
 * product that no longer exists, a size that was removed, a variant that sold
 * out — is dropped and reported in `errors` rather than silently priced at zero.
 */
export function priceCart(items: CartLineInput[]): PricedCart {
  const lines: PricedLine[] = [];
  const errors: string[] = [];

  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) {
      errors.push(`"${item.slug}" is no longer available.`);
      continue;
    }

    const variant = product.variants.find((v) => v.size === item.size);
    if (!variant) {
      errors.push(`${product.name} is not available in size ${item.size}.`);
      continue;
    }
    if (variant.stock === "out") {
      errors.push(`${product.name} (${item.size}) has sold out.`);
      continue;
    }

    const qty = Math.floor(Number(item.qty));
    if (!Number.isFinite(qty) || qty < 1) {
      errors.push(`Invalid quantity for ${product.name}.`);
      continue;
    }
    const safeQty = Math.min(qty, MAX_QTY_PER_LINE);

    const colourway = item.colourwayId
      ? product.colourways?.find((c) => c.id === item.colourwayId)
      : undefined;

    // Personalisation is only chargeable on products that actually offer it —
    // otherwise a crafted payload could attach a fee (or skip one) at will.
    let personalisation: CartLineInput["personalisation"];
    let personalisationFeeUSD = 0;
    if (item.personalisation && product.personalisation) {
      const name = String(item.personalisation.name ?? "")
        .toUpperCase()
        .replace(/[^A-Z .'-]/g, "")
        .slice(0, product.personalisation.maxChars)
        .trim();
      const number = String(item.personalisation.number ?? "").replace(/\D/g, "").slice(0, 2);
      if (name || number) {
        personalisation = { name, number };
        personalisationFeeUSD = product.personalisation.priceUSD;
      }
    }

    const unitPriceUSD = product.priceUSD;
    const lineTotalUSD = (unitPriceUSD + personalisationFeeUSD) * safeQty;

    lines.push({
      slug: product.slug,
      size: variant.size,
      colourwayId: colourway?.id,
      colourwayName: colourway?.name,
      qty: safeQty,
      personalisation,
      name: product.name,
      sku: variant.sku,
      image: colourway?.images[0] ?? product.images[0],
      unitPriceUSD,
      personalisationFeeUSD,
      lineTotalUSD,
    });
  }

  const subtotalUSD = round2(lines.reduce((sum, l) => sum + l.lineTotalUSD, 0));
  return { lines, subtotalUSD, errors };
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatUSD(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** Stable identity for a cart line — same product in a different size is a different line. */
export function lineKey(item: {
  slug: string;
  size: string;
  colourwayId?: string;
  personalisation?: { name: string; number: string };
}): string {
  const p = item.personalisation;
  const personal = p && (p.name || p.number) ? `${p.name}#${p.number}` : "";
  return [item.slug, item.size, item.colourwayId ?? "", personal].join("|");
}
