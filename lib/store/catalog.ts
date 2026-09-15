// lib/store/catalog.ts
//
// The catalogue is a file, not a database. Editing a price is a one-line change
// and a deploy, and every change is recorded in git. Stock is set by hand —
// at three to four orders a day that is more accurate than an automated count.
//
// PLACEHOLDER CONTENT: names, copy and imagery below are stand-ins so the build
// can be reviewed end to end. See docs/STORE.md for what the club needs to send.

import type { Category, Product } from "./types";

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "kit", label: "Match Kit" },
  { id: "training", label: "Training" },
  { id: "equipment", label: "Equipment" },
  { id: "accessories", label: "Accessories" },
];

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];

/** Build a full-size run, marking any listed sizes as low or sold out. */
function sizes(
  prefix: string,
  run: string[] = APPAREL,
  overrides: Record<string, "low" | "out"> = {},
): Product["variants"] {
  return run.map((size) => ({
    size,
    sku: `${prefix}-${size}`,
    stock: overrides[size] ?? "in",
  }));
}

export const PRODUCTS: Product[] = [
  {
    slug: "home-jersey",
    name: "Home Jersey 25/26",
    category: "kit",
    priceUSD: 45,
    images: ["/store/home-jersey-1.svg", "/store/home-jersey-2.svg"],
    colourways: [
      {
        id: "navy",
        name: "Club Navy",
        hex: "#0B3E80",
        images: ["/store/home-jersey-1.svg", "/store/home-jersey-2.svg"],
      },
      {
        id: "white",
        name: "Brand White",
        hex: "#F1EAEA",
        images: ["/store/home-jersey-alt-1.svg", "/store/home-jersey-alt-2.svg"],
      },
    ],
    variants: sizes("ATH-HJ", APPAREL, { XS: "low", XXL: "out" }),
    personalisation: {
      priceUSD: 8,
      maxChars: 12,
      backImage: "/store/shirt-back.svg",
    },
    description:
      "The 25/26 home shirt, in club navy with the crest at the chest. Lightweight breathable knit built for match conditions in Lebanon.",
    details: [
      "100% recycled polyester piqué",
      "Regular fit — size up for a relaxed cut",
      "Embroidered club crest",
      "Machine wash cold, do not tumble dry",
    ],
    featured: true,
  },
  {
    slug: "away-jersey",
    name: "Away Jersey 25/26",
    category: "kit",
    priceUSD: 45,
    images: ["/store/away-jersey-1.svg", "/store/away-jersey-2.svg"],
    colourways: [
      {
        id: "yellow",
        name: "Athletico Yellow",
        hex: "#FFE400",
        images: ["/store/away-jersey-1.svg", "/store/away-jersey-2.svg"],
      },
    ],
    variants: sizes("ATH-AJ", APPAREL, { S: "low" }),
    personalisation: {
      priceUSD: 8,
      maxChars: 12,
      backImage: "/store/shirt-back-away.svg",
    },
    description:
      "The 25/26 away shirt in Athletico yellow, with a tonal navy trim at the collar and cuff.",
    details: [
      "100% recycled polyester piqué",
      "Regular fit",
      "Embroidered club crest",
      "Machine wash cold, do not tumble dry",
    ],
    featured: true,
  },
  {
    slug: "goalkeeper-kit",
    name: "Goalkeeper Kit",
    category: "kit",
    priceUSD: 55,
    images: ["/store/goalkeeper-kit-1.svg", "/store/goalkeeper-kit-2.svg"],
    variants: sizes("ATH-GK", ["S", "M", "L", "XL"]),
    personalisation: {
      priceUSD: 8,
      maxChars: 12,
      backImage: "/store/shirt-back.svg",
    },
    description:
      "Long-sleeve goalkeeper shirt with padded elbow panels, sold with matching shorts.",
    details: [
      "Padded elbow protection",
      "Long sleeve",
      "Shirt and shorts included",
      "Machine wash cold",
    ],
  },
  {
    slug: "match-shorts",
    name: "Match Shorts",
    category: "kit",
    priceUSD: 22,
    images: ["/store/match-shorts-1.svg", "/store/match-shorts-2.svg"],
    variants: sizes("ATH-MS", APPAREL, { XXL: "low" }),
    description:
      "Match-day shorts in club navy, cut for range of movement with a bonded waistband.",
    details: ["Recycled polyester", "Elasticated bonded waistband", "Side seam pockets"],
  },
  {
    slug: "match-socks",
    name: "Match Socks",
    category: "kit",
    priceUSD: 10,
    images: ["/store/match-socks-1.svg", "/store/match-socks-2.svg"],
    variants: [
      { size: "30–34", sku: "ATH-SK-30", stock: "in" },
      { size: "35–38", sku: "ATH-SK-35", stock: "in" },
      { size: "39–42", sku: "ATH-SK-39", stock: "in" },
      { size: "43–46", sku: "ATH-SK-43", stock: "low" },
    ],
    description: "Ribbed match socks with a cushioned footbed and arch support.",
    details: ["Cushioned footbed", "Arch compression", "Club navy with yellow cuff"],
  },
  {
    slug: "training-jersey",
    name: "Training Jersey",
    category: "training",
    priceUSD: 30,
    images: ["/store/training-jersey-1.svg", "/store/training-jersey-2.svg"],
    variants: sizes("ATH-TJ"),
    description:
      "Everyday training top in a lighter knit than the match shirt, built to be worn four times a week.",
    details: ["Moisture-wicking knit", "Raglan sleeve", "Printed crest"],
  },
  {
    slug: "training-shorts",
    name: "Training Shorts",
    category: "training",
    priceUSD: 20,
    images: ["/store/training-shorts-1.svg", "/store/training-shorts-2.svg"],
    variants: sizes("ATH-TS"),
    description: "Training shorts with zip pockets, cut slightly longer than the match short.",
    details: ["Zip side pockets", "Drawcord waist", "Recycled polyester"],
  },
  {
    slug: "club-tracksuit",
    name: "Club Tracksuit",
    category: "training",
    priceUSD: 75,
    images: ["/store/club-tracksuit-1.svg", "/store/club-tracksuit-2.svg"],
    variants: sizes("ATH-TR", ["S", "M", "L", "XL", "XXL"], { XXL: "out" }),
    description:
      "Full club tracksuit — jacket and pants — in navy with the crest at the chest and a yellow taped placket.",
    details: ["Jacket and pants included", "Full-zip with stand collar", "Zip pockets", "Tapered leg"],
    featured: true,
  },
  {
    slug: "club-hoodie",
    name: "Club Hoodie",
    category: "training",
    priceUSD: 45,
    images: ["/store/club-hoodie-1.svg", "/store/club-hoodie-2.svg"],
    variants: sizes("ATH-HD", APPAREL, { M: "low", L: "low" }),
    description: "Heavyweight brushed-back hoodie with an embroidered crest.",
    details: ["340gsm brushed-back fleece", "Embroidered crest", "Kangaroo pocket", "Unisex fit"],
  },
  {
    slug: "rain-jacket",
    name: "Rain Jacket",
    category: "training",
    priceUSD: 60,
    images: ["/store/rain-jacket-1.svg", "/store/rain-jacket-2.svg"],
    variants: sizes("ATH-RJ", ["S", "M", "L", "XL"]),
    description: "Lightweight packable shell for touchline weather. Taped seams, storm hood.",
    details: ["Water-resistant coated shell", "Taped seams", "Packs into its own pocket"],
  },
  {
    slug: "match-ball",
    name: "Match Ball — Size 5",
    category: "equipment",
    priceUSD: 35,
    images: ["/store/match-ball-1.svg", "/store/match-ball-2.svg"],
    variants: [{ size: "5", sku: "ATH-MB-5", stock: "in" }],
    description:
      "Thermally bonded match ball in club colours. FIFA Basic standard, for competitive fixtures.",
    details: ["Thermally bonded seamless construction", "FIFA Basic", "Butyl bladder", "Size 5"],
    featured: true,
  },
  {
    slug: "training-ball",
    name: "Training Ball",
    category: "equipment",
    priceUSD: 22,
    images: ["/store/training-ball-1.svg", "/store/training-ball-2.svg"],
    variants: [
      { size: "3", sku: "ATH-TB-3", stock: "in" },
      { size: "4", sku: "ATH-TB-4", stock: "in" },
      { size: "5", sku: "ATH-TB-5", stock: "low" },
    ],
    description: "Machine-stitched training ball built to survive a season on hard ground.",
    details: ["Machine-stitched TPU", "Abrasion-resistant casing", "Sizes 3, 4 and 5"],
  },
  {
    slug: "boot-bag",
    name: "Boot Bag",
    category: "accessories",
    priceUSD: 25,
    images: ["/store/boot-bag-1.svg", "/store/boot-bag-2.svg"],
    variants: [{ size: "ONE SIZE", sku: "ATH-BB-OS", stock: "in" }],
    description: "Ventilated boot bag with a separate wet compartment and a shoulder strap.",
    details: ["Ventilated boot compartment", "Separate wet pocket", "Adjustable shoulder strap"],
  },
  {
    slug: "water-bottle",
    name: "Water Bottle",
    category: "accessories",
    priceUSD: 12,
    images: ["/store/water-bottle-1.svg", "/store/water-bottle-2.svg"],
    variants: [{ size: "750ML", sku: "ATH-WB-750", stock: "in" }],
    description: "750ml squeeze bottle with a fast-flow cap, in club navy.",
    details: ["750ml", "BPA-free", "Fast-flow valve", "Dishwasher safe"],
  },
  {
    slug: "club-cap",
    name: "Club Cap",
    category: "accessories",
    priceUSD: 18,
    images: ["/store/club-cap-1.svg", "/store/club-cap-2.svg"],
    variants: [{ size: "ONE SIZE", sku: "ATH-CP-OS", stock: "in" }],
    description: "Six-panel cotton cap with an embroidered crest and adjustable strap.",
    details: ["100% cotton twill", "Embroidered crest", "Adjustable metal clasp"],
  },
  {
    slug: "club-scarf",
    name: "Club Scarf",
    category: "accessories",
    priceUSD: 20,
    images: ["/store/club-scarf-1.svg", "/store/club-scarf-2.svg"],
    variants: [{ size: "ONE SIZE", sku: "ATH-SC-OS", stock: "in" }],
    description: "Knitted terrace scarf in navy and yellow, with LIVE YOUR PASSION on the reverse.",
    details: ["Double-sided jacquard knit", "140cm × 18cm", "Fringed ends"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getRelated(slug: string, limit = 4): Product[] {
  const product = getProduct(slug);
  if (!product) return [];
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== slug && p.category === product.category,
  );
  const filler = PRODUCTS.filter((p) => p.slug !== slug && p.category !== product.category);
  return [...sameCategory, ...filler].slice(0, limit);
}

/** A product is orderable only if at least one variant is in stock. */
export function isOrderable(product: Product): boolean {
  return product.variants.some((v) => v.stock !== "out");
}
