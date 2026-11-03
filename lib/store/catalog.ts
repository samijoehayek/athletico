// lib/store/catalog.ts
//
// The catalogue is a file, not a database. Editing a price is a one-line change
// and a deploy, and every change is recorded in git. Stock is set by hand —
// at three to four orders a day that is more accurate than an automated count.
//
// SOURCE: the club's "merch price list.xlsx" and product photos (Nov 2026).
// Names and prices are the club's; the price list has no sizes, so the size
// runs below are the agreed defaults until the club confirms them (see
// docs/shop-launch-plan.md, section 2.1).

import type { Category, Colourway, Product } from "./types";

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "thermals", label: "Thermals" },
  { id: "bags", label: "Bags" },
  { id: "cheer", label: "Cheer Section" },
  { id: "winter", label: "Winter Collection" },
  { id: "training", label: "Training" },
  { id: "gadgets", label: "Gadgets" },
  { id: "casuals", label: "Casuals" },
];

/** Kids' sizes by height in cm, as the club writes them on its order sheet. */
const KIDS = ["120", "130", "140", "150", "160"];
const ADULT = ["S", "M", "L", "XL", "XXL"];
const CLOTHING = [...KIDS, ...ADULT];
const SOCKS = ["KIDS", "ADULT"];
const ONE_SIZE = ["ONE SIZE"];

/** Build a size run, marking any listed sizes as low or sold out. */
function sizes(
  prefix: string,
  run: string[],
  overrides: Record<string, "low" | "out"> = {},
): Product["variants"] {
  return run.map((size) => ({
    size,
    sku: `${prefix}-${size.replace(/\s+/g, "")}`,
    stock: overrides[size] ?? "in",
  }));
}

const img = (name: string) => `/store/products/${name}.jpg`;

// Swatch colours. "Blue" covers the club's royal blue garments; the training
// socks are a darker navy-blue, so they get their own swatch.
const BLUE = "#1F4FD1";
const NAVY_BLUE = "#1B2552";
const WHITE = "#FFFFFF";
const BLACK = "#111111";

/** An option shown with another option's photo until the club sends its own. */
function borrowed(id: string, name: string, hex: string, images: string[], photoOf: string): Colourway {
  return { id, name, hex, images, photoOf };
}

export const PRODUCTS: Product[] = [
  // ── Thermals ────────────────────────────────────────────────────────────
  {
    slug: "training-thermal-pant",
    name: "Training Thermal Pant",
    categories: ["thermals"],
    priceUSD: 30,
    images: [img("thermal-pant")],
    colourways: [
      borrowed("blue", "Blue", BLUE, [img("thermal-pant")], "White"),
      { id: "white", name: "White", hex: WHITE, images: [img("thermal-pant")] },
      borrowed("black", "Black", BLACK, [img("thermal-pant")], "White"),
    ],
    variants: sizes("ATH-THP", CLOTHING),
  },
  {
    slug: "training-thermal-top",
    name: "Training Thermal Top",
    categories: ["thermals"],
    priceUSD: 30,
    images: [img("thermal-top")],
    colourways: [
      borrowed("black", "Black", BLACK, [img("thermal-top")], "White"),
      borrowed("blue", "Blue", BLUE, [img("thermal-top")], "White"),
      { id: "white", name: "White", hex: WHITE, images: [img("thermal-top")] },
    ],
    variants: sizes("ATH-THT", CLOTHING),
  },

  // ── Bags ────────────────────────────────────────────────────────────────
  {
    slug: "shoe-bag",
    name: "Shoe Bag",
    categories: ["bags"],
    priceUSD: 30,
    images: [img("shoe-bag")],
    variants: sizes("ATH-SHB", ONE_SIZE),
  },
  {
    slug: "back-bag",
    name: "Back Bag",
    categories: ["bags"],
    priceUSD: 40,
    images: [img("back-bag")],
    variants: sizes("ATH-BKB", ONE_SIZE),
  },
  {
    slug: "pencil-case",
    name: "Pencil Case",
    categories: ["bags"],
    priceUSD: 15,
    images: [img("pencil-case")],
    variants: sizes("ATH-PNC", ONE_SIZE),
  },

  // ── Cheer section ───────────────────────────────────────────────────────
  {
    slug: "fan-fanion",
    name: "Fan Fanion",
    categories: ["cheer"],
    priceUSD: 10,
    images: [img("fan-fanion")],
    variants: sizes("ATH-FAN", ONE_SIZE),
  },
  {
    slug: "cheer-parent-t-shirt",
    name: "Cheer Parent T-Shirt",
    categories: ["cheer"],
    priceUSD: 20,
    images: [img("cheer-tshirt-1")],
    // Same blue T-shirt, two back prints. The client's photos 2 and 3 show the
    // same "Since 2006" print, so that design carries both of them.
    optionLabel: "Design",
    colourways: [
      { id: "raise-champions", name: "I Raise Champions", hex: BLUE, images: [img("cheer-tshirt-1")] },
      {
        id: "since-2006",
        name: "Athletico S.C. Since 2006",
        hex: BLUE,
        images: [img("cheer-tshirt-2"), img("cheer-tshirt-3")],
      },
    ],
    // A parents' shirt, so adult sizes only.
    variants: sizes("ATH-CHT", ADULT),
  },
  {
    slug: "fan-scarf",
    name: "Fan Scarf",
    categories: ["cheer"],
    priceUSD: 15,
    images: [img("fan-scarf")],
    variants: sizes("ATH-SCF", ONE_SIZE),
  },
  {
    // Listed under both Cheer ($30) and Casuals ($35). Confirmed as one polo at $35.
    slug: "short-sleeve-polo",
    name: "Short Sleeve Polo",
    categories: ["cheer", "casuals"],
    priceUSD: 35,
    images: [img("short-sleeve-polo")],
    variants: sizes("ATH-POL", CLOTHING),
  },
  {
    slug: "field-cap",
    name: "Field Cap",
    categories: ["cheer", "gadgets"],
    priceUSD: 20,
    images: [img("field-cap")],
    variants: sizes("ATH-CAP", ONE_SIZE),
  },

  // ── Winter collection ───────────────────────────────────────────────────
  {
    slug: "tracksuit",
    name: "Tracksuit",
    categories: ["winter"],
    priceUSD: 55,
    images: [img("tracksuit")],
    variants: sizes("ATH-TRK", CLOTHING),
    featured: true,
  },
  {
    slug: "waterproof-training-jacket",
    name: "Waterproof Training Jacket",
    categories: ["winter"],
    priceUSD: 35,
    images: [img("waterproof-jacket")],
    variants: sizes("ATH-JKT", CLOTHING),
  },
  {
    slug: "sweatshirt",
    name: "Sweatshirt",
    categories: ["winter"],
    priceUSD: 35,
    images: [img("sweatshirt")],
    variants: sizes("ATH-SWT", CLOTHING),
  },
  {
    slug: "hoodie",
    name: "Hoodie",
    categories: ["winter"],
    priceUSD: 35,
    images: [img("hoodie-white-1"), img("hoodie-white-2")],
    colourways: [
      // White: the club's own front and back shots, already on the site.
      { id: "white", name: "White", hex: WHITE, images: [img("hoodie-white-1"), img("hoodie-white-2")] },
      { id: "blue", name: "Blue", hex: BLUE, images: [img("hoodie-blue")] },
    ],
    variants: sizes("ATH-HOD", CLOTHING),
  },
  {
    slug: "sweat-pant",
    name: "Sweat Pant",
    categories: ["winter"],
    priceUSD: 30,
    images: [img("sweat-pant")],
    variants: sizes("ATH-SWP", CLOTHING),
  },

  // ── Training ────────────────────────────────────────────────────────────
  {
    slug: "training-socks",
    name: "Training Socks",
    categories: ["training"],
    priceUSD: 10,
    images: [img("training-socks-blue")],
    colourways: [
      { id: "blue", name: "Blue", hex: NAVY_BLUE, images: [img("training-socks-blue")] },
      { id: "white", name: "White", hex: WHITE, images: [img("training-socks-white")] },
    ],
    variants: sizes("ATH-SOC", SOCKS),
  },
  {
    slug: "socks-sleeve",
    name: "Socks Sleeve",
    categories: ["training"],
    priceUSD: 12,
    images: [img("sock-sleeves-blue")],
    colourways: [
      { id: "blue", name: "Blue", hex: BLUE, images: [img("sock-sleeves-blue")] },
      borrowed("white", "White", WHITE, [img("sock-sleeves-blue")], "Blue"),
    ],
    variants: sizes("ATH-SLV", SOCKS),
  },
  {
    slug: "techshirt",
    name: "Techshirt",
    categories: ["training"],
    priceUSD: 35,
    images: [img("techshirt")],
    variants: sizes("ATH-TEC", CLOTHING),
  },
  {
    slug: "tech-sleeveless",
    name: "Tech Sleeveless",
    categories: ["training"],
    priceUSD: 30,
    images: [img("tech-sleeveless")],
    variants: sizes("ATH-TSL", CLOTHING),
  },
  {
    slug: "water-bottle",
    name: "Water Bottle",
    categories: ["training", "gadgets"],
    priceUSD: 20,
    images: [img("water-bottle")],
    variants: sizes("ATH-BTL", ONE_SIZE),
  },

  // ── Athletico gadgets ───────────────────────────────────────────────────
  {
    slug: "face-towel",
    name: "Face Towel",
    categories: ["gadgets"],
    priceUSD: 10,
    images: [img("face-towel")],
    variants: sizes("ATH-TWL", ONE_SIZE),
  },

  // ── Casuals ─────────────────────────────────────────────────────────────
  {
    slug: "cotton-shirt",
    name: "Cotton Shirt",
    categories: ["casuals"],
    priceUSD: 30,
    images: [img("cotton-shirt")],
    variants: sizes("ATH-CTS", CLOTHING),
  },
  {
    slug: "cotton-short",
    name: "Cotton Short",
    categories: ["casuals"],
    priceUSD: 30,
    images: [img("cotton-short")],
    variants: sizes("ATH-CSH", CLOTHING),
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * The option a product opens on: the first one with its own photo, so the
 * picture a customer lands on always matches the colour that's selected.
 */
export function defaultColourwayId(product: Product): string | undefined {
  return (product.colourways?.find((c) => !c.photoOf) ?? product.colourways?.[0])?.id;
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function categoryLabel(id: Category): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getRelated(slug: string, limit = 4): Product[] {
  const product = getProduct(slug);
  if (!product) return [];
  const shares = (p: Product) => p.categories.some((c) => product.categories.includes(c));
  const sameCategory = PRODUCTS.filter((p) => p.slug !== slug && shares(p));
  const filler = PRODUCTS.filter((p) => p.slug !== slug && !shares(p));
  return [...sameCategory, ...filler].slice(0, limit);
}

/** A product is orderable only if at least one variant is in stock. */
export function isOrderable(product: Product): boolean {
  return product.variants.some((v) => v.stock !== "out");
}
