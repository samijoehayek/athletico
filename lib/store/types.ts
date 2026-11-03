// lib/store/types.ts
// Shared shapes for the Athletico store. These types are imported by both the
// browser and the order route handler, so anything here must stay isomorphic.

/** The sections of the club's price list (merch price list.xlsx). */
export type Category =
  | "thermals"
  | "bags"
  | "cheer"
  | "winter"
  | "training"
  | "gadgets"
  | "casuals";

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
  /**
   * Set when this option has no photo of its own yet and borrows another
   * option's images — e.g. "white" on the blue thermal. The product page says
   * which version the photo shows, so nobody orders from a misleading picture.
   */
  photoOf?: string;
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
  /**
   * Usually one. A few items sit in two sections of the club's price list
   * (the cap, the bottle, the polo), and they show under both filters.
   */
  categories: Category[];
  priceUSD: number;
  /** [0] is the card's resting image, [1] the one it cross-fades to on hover. */
  images: string[];
  colourways?: Colourway[];
  /**
   * What the `colourways` represent. "Colour" (the default) renders swatches;
   * "Design" renders labelled buttons, for options that differ by print rather
   * than by colour (the cheer T-shirt's three back designs).
   */
  optionLabel?: "Colour" | "Design";
  variants: Variant[];
  personalisation?: Personalisation;
  /** Search and share description. Not shown on the page (client request, Oct 2026). */
  description?: string;
  /** Material / fit bullets, only when the club supplies them. */
  details?: string[];
  /** Promotes the product into the featured band on the store landing page. */
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
  /**
   * Optional: the player the order is for, when a parent buys for a child.
   * It fills the NAME column of the order sheet, as on the club's paper sheet;
   * when empty, the buyer's name is used.
   */
  playerName?: string;
}

export interface OrderPayload {
  items: CartLineInput[];
  customer: CustomerDetails;
  payment: { method: PaymentMethodId; reference: string };
  /**
   * The customer ticked "I agree to the Terms and Conditions of Sale" (clause
   * 1.2 of the Terms requires it). The server records which version was in
   * force; it never trusts a version id sent by the browser.
   */
  termsAccepted: boolean;
  /** Honeypot — must be empty. Bots fill it, humans never see it. */
  company?: string;
}
