"use client";

// app/components/store/ProductDetail.tsx
// Two columns on desktop: the gallery stays pinned while the right column
// scrolls through description, sizing and delivery.

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/store/cart-context";
import { formatUSD } from "@/lib/store/pricing";
import type { Product } from "@/lib/store/types";
import KitCustomiser, { isBlocked, type PersonalisationValue } from "./KitCustomiser";
import ProductGallery from "./ProductGallery";
import SizeGuideDrawer from "./SizeGuideDrawer";

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [colourwayId, setColourwayId] = useState(product.colourways?.[0]?.id);
  const [size, setSize] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [attemptedAdd, setAttemptedAdd] = useState(false);
  const [personal, setPersonal] = useState<PersonalisationValue>({
    enabled: false,
    name: "",
    number: "",
  });

  const colourway = product.colourways?.find((c) => c.id === colourwayId);
  const images = colourway?.images ?? product.images;
  const selectedVariant = product.variants.find((v) => v.size === size);
  const soldOut = product.variants.every((v) => v.stock === "out");

  const personalisationBlocked = personal.enabled && isBlocked(personal.name);
  const personalisationEmpty = personal.enabled && !personal.name && !personal.number;

  const unitPrice = useMemo(() => {
    const extra = personal.enabled && product.personalisation && !personalisationEmpty
      ? product.personalisation.priceUSD
      : 0;
    return product.priceUSD + extra;
  }, [product, personal.enabled, personalisationEmpty]);

  const canAdd =
    !soldOut && !!selectedVariant && selectedVariant.stock !== "out" && !personalisationBlocked;

  function handleAdd() {
    setAttemptedAdd(true);
    if (!canAdd || !size) return;
    add({
      slug: product.slug,
      size,
      colourwayId,
      qty: 1,
      personalisation:
        personal.enabled && !personalisationEmpty
          ? { name: personal.name, number: personal.number }
          : undefined,
    });
  }

  return (
    <section className="w-full bg-[#F1EAEA] px-6 md:px-12 lg:px-16 py-10 md:py-14">
      <div className="max-w-screen-2xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-[#0B3E80]/50">
          <Link href="/store" className="hover:text-[#0B3E80] transition-colors">
            Store
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0B3E80]/80">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-8">
            {/* Remount on colourway change so the gallery resets to its first image. */}
            <ProductGallery key={colourwayId ?? "default"} images={images} alt={product.name} />
          </div>

          <div>
            <h1 className="text-[#0B3E80] font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl leading-[0.95]">
              {product.name}
            </h1>
            <p className="text-[#0B3E80] font-bold text-2xl md:text-3xl mt-4">{formatUSD(unitPrice)}</p>
            <p className="text-[#0B3E80]/70 text-sm md:text-base leading-relaxed mt-5 max-w-lg">
              {product.description}
            </p>

            {product.colourways && product.colourways.length > 1 && (
              <div className="mt-8">
                <p className="text-[#0B3E80]/60 text-xs uppercase tracking-wider mb-3">
                  Colour — <span className="text-[#0B3E80]">{colourway?.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colourways.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColourwayId(c.id)}
                      aria-label={c.name}
                      aria-pressed={c.id === colourwayId}
                      className={`w-9 h-9 border transition-all ${
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
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-[#0B3E80]/60 text-xs uppercase tracking-wider">Size</p>
                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  className="text-[#2B87C8] text-xs uppercase tracking-wider underline underline-offset-4 hover:text-[#0B3E80] transition-colors"
                >
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const out = v.stock === "out";
                  const active = v.size === size;
                  return (
                    <button
                      key={v.sku}
                      type="button"
                      disabled={out}
                      onClick={() => setSize(v.size)}
                      aria-pressed={active}
                      className={`min-w-[3rem] px-3 h-12 text-sm font-medium border transition-all ${
                        out
                          ? "border-[#0B3E80]/15 text-[#0B3E80]/30 line-through cursor-not-allowed"
                          : active
                            ? "bg-[#0B3E80] text-white border-[#0B3E80]"
                            : "border-[#0B3E80]/30 text-[#0B3E80] hover:border-[#0B3E80] hover:bg-[#0B3E80]/5"
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
              {selectedVariant?.stock === "low" && (
                <p className="text-[#0B3E80]/60 text-xs mt-2">Only a few left in this size.</p>
              )}
              {attemptedAdd && !size && !soldOut && (
                <p className="text-[#c0392b] text-xs mt-2" role="alert">
                  Please choose a size.
                </p>
              )}
            </div>

            {product.personalisation && (
              <div className="mt-8">
                <KitCustomiser
                  personalisation={product.personalisation}
                  value={personal}
                  onChange={setPersonal}
                  productName={product.name}
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleAdd}
              disabled={soldOut}
              className={`w-full mt-8 py-5 font-bold uppercase text-sm tracking-[0.14em] transition-colors ${
                soldOut
                  ? "bg-[#0B3E80]/20 text-[#0B3E80]/50 cursor-not-allowed"
                  : "bg-[#0B3E80] text-white hover:bg-[#2B87C8]"
              }`}
            >
              {soldOut ? "Sold out" : "Add to bag"}
            </button>

            {personalisationBlocked && (
              <p className="text-[#c0392b] text-xs mt-2" role="alert">
                Please choose a different name before adding to your bag.
              </p>
            )}

            <div className="mt-10 border-t border-[#0B3E80]/15">
              <Accordion title="Details & care" defaultOpen>
                <ul className="space-y-1.5 list-disc pl-4 marker:text-[#2B87C8]">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Delivery">
                <p>
                  Beirut and metro area, 1–2 working days. Rest of Lebanon, 2–3 working days.
                  Collection from a club branch is free and ready the next day.
                </p>
              </Accordion>
              <Accordion title="Returns">
                <p>
                  Exchanges on unworn items with tags within 14 days. Personalised items are made to
                  order and cannot be returned or exchanged.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideDrawer open={guideOpen} onClose={() => setGuideOpen(false)} />
    </section>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#0B3E80]/15">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left text-[#0B3E80] font-bold uppercase text-sm tracking-wide hover:text-[#2B87C8] transition-colors"
      >
        {title}
        <span className="text-xl leading-none" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="pb-5 text-[#0B3E80]/70 text-sm leading-relaxed">{children}</div>}
    </div>
  );
}
