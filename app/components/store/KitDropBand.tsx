// app/components/store/KitDropBand.tsx
//
// An editorial break inside the grid. A sixteen-product catalogue reads like a
// spreadsheet without one; with it, the range reads like a drop.

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/store/types";

export default function KitDropBand({ product }: { product: Product }) {
  return (
    <section className="relative w-full bg-[#0B3E80] overflow-hidden my-16 md:my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[320px] sm:h-[420px] lg:h-auto lg:min-h-[520px] order-2 lg:order-1">
          <Image
            src={product.images[1] ?? product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 lg:order-2 px-6 md:px-12 lg:px-16 py-14 md:py-20 flex flex-col justify-center">
          <p className="text-[#FFE400] text-xs md:text-sm font-medium uppercase tracking-[0.28em] mb-4">
            The 25/26 drop
          </p>
          <h2 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] uppercase leading-[0.95] mb-8">
            {product.name}
          </h2>
          <Link
            href={`/store/${product.slug}`}
            className="inline-flex items-center gap-3 w-fit bg-white text-[#0B3E80] hover:bg-[#2B87C8] hover:text-white font-bold uppercase text-sm tracking-wider px-8 py-4 transition-colors"
          >
            Shop the kit
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Marquee, echoing the footer's infinite slogan band. */}
      <div className="overflow-hidden border-t border-white/15 py-3">
        <div className="whitespace-nowrap text-[#F1EAEA]/25 font-bold uppercase text-2xl md:text-4xl">
          {"Live your passion · ".repeat(12)}
        </div>
      </div>
    </section>
  );
}
