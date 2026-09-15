"use client";

// app/components/store/ProductCard.tsx
//
// Four behaviours do the work here, all of them reusing the site's existing
// hover language (scale-105 over 700ms, white square arrow badge, zero radius):
//   1. cross-fade between a product shot and an in-play shot
//   2. colourway swatches that swap the image without navigating
//   3. a quick-add size strip that rises from the bottom edge on hover
//   4. honest stock states — sold out is shown, never hidden

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/store/cart-context";
import { formatUSD } from "@/lib/store/pricing";
import type { Product } from "@/lib/store/types";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const [colourwayId, setColourwayId] = useState(product.colourways?.[0]?.id);

  const colourway = product.colourways?.find((c) => c.id === colourwayId);
  const images = colourway?.images ?? product.images;
  const soldOut = product.variants.every((v) => v.stock === "out");
  const lowStock = !soldOut && product.variants.some((v) => v.stock === "low");

  return (
    <div className="group flex flex-col">
      <Link
        href={`/store/${product.slug}`}
        className="relative block w-full overflow-hidden bg-[#e3e9f2] aspect-[4/5]"
        aria-label={product.name}
      >
        <Image
          src={images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 25vw"
          priority={priority}
          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <Image
          src={images[1] ?? images[0]}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />

        {/* White square arrow badge, matching the Activities / Inside Athletico cards. */}
        <div className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B3E80" strokeWidth="2">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>

        {lowStock && (
          <span className="absolute top-3 left-3 bg-[#FFE400] text-[#0B3E80] text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-1">
            Last few
          </span>
        )}

        {soldOut && <SoldOutOverlay />}

        {!soldOut && <QuickAddStrip product={product} colourwayId={colourwayId} onAdd={add} />}
      </Link>

      <div className="pt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[#0B3E80] text-sm md:text-base font-bold uppercase leading-tight">
            <Link href={`/store/${product.slug}`} className="hover:text-[#2B87C8] transition-colors">
              {product.name}
            </Link>
          </h3>
          {colourway && <p className="text-[#0B3E80]/50 text-xs mt-1">{colourway.name}</p>}
        </div>
        <p className="text-[#0B3E80] text-sm md:text-base font-bold shrink-0">
          {formatUSD(product.priceUSD)}
        </p>
      </div>

      {product.colourways && product.colourways.length > 1 && (
        <div className="flex gap-2 pt-3">
          {product.colourways.map((c) => (
            <button
              key={c.id}
              type="button"
              onMouseEnter={() => setColourwayId(c.id)}
              onFocus={() => setColourwayId(c.id)}
              onClick={() => setColourwayId(c.id)}
              aria-label={`Show ${c.name}`}
              aria-pressed={c.id === colourwayId}
              className={`w-5 h-5 border transition-all ${
                c.id === colourwayId
                  ? "border-[#0B3E80] ring-1 ring-[#0B3E80] ring-offset-2 ring-offset-[#F1EAEA]"
                  : "border-[#0B3E80]/25 hover:border-[#0B3E80]"
              }`}
              style={{
                background: c.hexSecondary
                  ? `linear-gradient(135deg, ${c.hex} 50%, ${c.hexSecondary} 50%)`
                  : c.hex,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SoldOutOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(11,62,128,0.14) 0 10px, rgba(241,234,234,0.55) 10px 20px)",
        }}
      />
      <span className="relative bg-[#0B3E80] text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-2">
        Sold out
      </span>
    </div>
  );
}

/**
 * Desktop-only. On touch there is no hover to reveal it, and tapping the card
 * to open the full product page is the better interaction anyway.
 */
function QuickAddStrip({
  product,
  colourwayId,
  onAdd,
}: {
  product: Product;
  colourwayId?: string;
  onAdd: ReturnType<typeof useCart>["add"];
}) {
  // Personalisable products need the customiser, so they always go to the page.
  if (product.personalisation) return null;

  return (
    <div className="hidden md:block absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
      <div className="bg-[#0B3E80]/95 backdrop-blur-sm px-3 py-3">
        <p className="text-white/60 text-[10px] uppercase tracking-[0.18em] mb-2">Quick add</p>
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map((v) => (
            <button
              key={v.sku}
              type="button"
              disabled={v.stock === "out"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAdd({ slug: product.slug, size: v.size, colourwayId, qty: 1 });
              }}
              className={`min-w-[2.25rem] px-2 h-8 text-xs font-medium border transition-all ${
                v.stock === "out"
                  ? "border-white/20 text-white/30 line-through cursor-not-allowed"
                  : "border-white/40 text-white hover:bg-[#2B87C8] hover:border-[#2B87C8]"
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
