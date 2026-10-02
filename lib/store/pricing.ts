// lib/store/pricing.ts
//
// The single source of truth for money. The browser imports this to render
// totals; the order route imports the SAME functions to recompute them from
// scratch. The browser is never trusted with a price — it sends product IDs
// and quantities, and the server works out what that actually costs.

import { getProduct } from "./catalog";
import type {
  CartLineInput,
  PaymentMethodId,
  PricedCart,
  PricedLine,
} from "./types";

/** Every order is collected from a branch; there is no delivery. */
export const COLLECTION_ETA = "Ready for collection within 10–15 days";

export const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  blurb: string;
  requiresReference: boolean;
  referenceLabel?: string;
}[] = [
  {
    id: "bob",
    label: "BOB Finance",
    blurb: "Scan the QR code with the BOB Finance app and pay the exact total, then enter the transaction reference below.",
    requiresReference: true,
    referenceLabel: "BOB transaction reference",
  },
];

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
