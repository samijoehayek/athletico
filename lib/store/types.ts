// lib/store/types.ts
// Shared shapes for the Athletico store. These types are imported by both the
// browser and the order route handler, so anything here must stay isomorphic.

export type Category = "kit" | "training" | "equipment" | "accessories";

/** Stock is maintained by hand in the catalogue — see docs/STORE.md. */
export type StockState = "in" | "low" | "out";

export interface Variant {
  /** Display label: "S", "M", "ONE SIZE", "5" … */
  size: string;
  sku: string;
  stock: StockState;
}

export interface Colourway {
  id: string;
  name: string;
  /** Swatch colour. Two-tone kits use `hexSecondary` for a split swatch. */
  hex: string;
  hexSecondary?: string;
  images: string[];
}

export interface Personalisation {
  priceUSD: number;
  maxChars: number;
  /** Straight-on photo of the back of the shirt the name/number render onto. */
  backImage: string;
  /**
   * Colour the name and number are printed in. Must contrast with the garment:
   * off-white on a dark shirt, navy on a light one. Defaults to off-white.
   */
  printColor?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  priceUSD: number;
  /** [0] is the card's resting image, [1] the one it cross-fades to on hover. */
  images: string[];
  colourways?: Colourway[];
  variants: Variant[];
  personalisation?: Personalisation;
  description: string;
  details: string[];
  /** Promotes the product into the kit-drop band on the landing page. */
  featured?: boolean;
}

/** What the browser is allowed to send us. Prices are deliberately absent. */
export interface CartLineInput {
  slug: string;
  size: string;
  colourwayId?: string;
  qty: number;
  personalisation?: { name: string; number: string };
}

/** A line after the server has re-priced it from the catalogue. */
export interface PricedLine extends CartLineInput {
  name: string;
  sku: string;
  colourwayName?: string;
  image: string;
  unitPriceUSD: number;
  personalisationFeeUSD: number;
  lineTotalUSD: number;
}

export interface PricedCart {
  lines: PricedLine[];
  subtotalUSD: number;
  errors: string[];
}

/** BOB Finance only — paid up front so a personalised kit can't be refused at the door. */
export type PaymentMethodId = "bob";

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  /** Id of the branch the order is collected from — see lib/branches.ts. */
  branch: string;
}

export interface OrderPayload {
  items: CartLineInput[];
  customer: CustomerDetails;
  payment: { method: PaymentMethodId; reference: string };
  /** Honeypot — must be empty. Bots fill it, humans never see it. */
  company?: string;
}
