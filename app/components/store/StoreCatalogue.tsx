"use client";

// app/components/store/StoreCatalogue.tsx
//
// Category filtering is client-side with a Framer Motion layout transition —
// no page reload for a sixteen-product range. The kit-drop band is injected
// after the first row when nothing is filtered, so it breaks the grid rather
// than sitting above or below it.

import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/store/catalog";
import type { Category, Product } from "@/lib/store/types";
import ProductCard from "./ProductCard";
import KitDropBand from "./KitDropBand";

const ROW = 4;

export default function StoreCatalogue({ featured }: { featured: Product | null }) {
  const [active, setActive] = useState<Category | "all">("all");

  const products = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );

  const showBand = active === "all" && featured && products.length > ROW;
  const head = showBand ? products.slice(0, ROW) : products;
  const tail = showBand ? products.slice(ROW) : [];

  return (
    <section className="w-full bg-[#F1EAEA] px-6 md:px-12 lg:px-16 py-14 md:py-20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10 md:mb-12">
          {CATEGORIES.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={isActive}
                className={`px-5 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider border transition-all ${
                  isActive
                    ? "bg-[#0B3E80] text-white border-[#0B3E80]"
                    : "bg-transparent text-[#0B3E80] border-[#0B3E80]/30 hover:border-[#0B3E80] hover:bg-[#0B3E80]/5"
                }`}
              >
                {c.label}
              </button>
            );
          })}
          <span className="ml-auto text-[#0B3E80]/50 text-xs uppercase tracking-widest">
            {products.length} {products.length === 1 ? "item" : "items"}
          </span>
        </div>

        <Grid key={active} products={head} priorityCount={ROW} />
      </div>

      {showBand && featured && (
        <div className="max-w-screen-2xl mx-auto">
          <KitDropBand product={featured} />
        </div>
      )}

      {tail.length > 0 && (
        <div className="max-w-screen-2xl mx-auto">
          <Grid key={`${active}-tail`} products={tail} />
        </div>
      )}
    </section>
  );
}

function Grid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    // Entrance uses the `fadeInUp` keyframes already defined in globals.css rather
    // than a JS animation library. A CSS animation runs as soon as the element
    // paints, so the catalogue is never invisible waiting on hydration — which it
    // was when this ran through Framer Motion's `initial` state.
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
      {products.map((product, i) => (
        <div
          key={product.slug}
          style={{
            animation: "fadeInUp 0.45s ease-out both",
            animationDelay: `${Math.min(i, 7) * 45}ms`,
          }}
        >
          <ProductCard product={product} priority={i < priorityCount} />
        </div>
      ))}
    </div>
  );
}
