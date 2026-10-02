"use client";

// app/components/store/CartDrawer.tsx
//
// Right-hand slide-over available from every page once the store exists.
// Traps focus, closes on Escape, and shows the cart the customer left behind
// on their last visit.

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/lib/store/cart-context";
import { COLLECTION_ETA, formatUSD, lineKey } from "@/lib/store/pricing";

export default function CartDrawer() {
  const { isOpen, closeCart, priced, setQty, remove, count } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-hidden
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#0B3E80] z-[10001] flex flex-col"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-white/15">
              <h2 className="text-white font-bold uppercase text-lg tracking-wide">
                Your bag{count > 0 && <span className="text-white/50 font-normal"> ({count})</span>}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={closeCart}
                aria-label="Close bag"
                className="w-10 h-10 border border-white/30 text-white flex items-center justify-center hover:bg-[#2B87C8] hover:border-[#2B87C8] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {priced.lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <p className="text-white/70 text-base mb-6">Your bag is empty.</p>
                <Link
                  href="/store"
                  onClick={closeCart}
                  className="bg-white text-[#0B3E80] hover:bg-[#2B87C8] hover:text-white font-bold uppercase text-sm tracking-wider px-8 py-3.5 transition-colors"
                >
                  Browse the store
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  {priced.lines.map((line) => {
                    const key = lineKey(line);
                    return (
                      <div key={key} className="flex gap-4">
                        <Link
                          href={`/store/${line.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-24 shrink-0 bg-white/10 overflow-hidden"
                        >
                          <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold uppercase text-sm leading-tight">{line.name}</p>
                          <p className="text-white/50 text-xs mt-1">
                            Size {line.size}
                            {line.colourwayName ? ` · ${line.colourwayName}` : ""}
                          </p>
                          {line.personalisation && (
                            <p className="text-[#FFE400] text-xs mt-1 uppercase tracking-wide">
                              {line.personalisation.name} {line.personalisation.number}
                              <span className="text-white/40 normal-case tracking-normal">
                                {" "}
                                (+{formatUSD(line.personalisationFeeUSD)})
                              </span>
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center">
                              <Stepper label="Decrease quantity" onClick={() => setQty(key, line.qty - 1)}>
                                −
                              </Stepper>
                              <span className="w-9 text-center text-white text-sm tabular-nums">{line.qty}</span>
                              <Stepper label="Increase quantity" onClick={() => setQty(key, line.qty + 1)}>
                                +
                              </Stepper>
                            </div>
                            <p className="text-white font-bold text-sm">{formatUSD(line.lineTotalUSD)}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(key)}
                            className="text-white/40 hover:text-white text-[11px] uppercase tracking-wider mt-2 underline underline-offset-2 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {priced.errors.length > 0 && (
                    <div className="border-l-2 border-[#FFE400] bg-white/5 px-4 py-3">
                      {priced.errors.map((e) => (
                        <p key={e} className="text-[#FFE400] text-xs leading-relaxed">
                          {e}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <footer className="border-t border-white/15 px-6 py-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm uppercase tracking-wider">Subtotal</span>
                    <span className="text-white font-bold text-xl">{formatUSD(priced.subtotalUSD)}</span>
                  </div>
                  <p className="text-white/40 text-xs mb-4">Free collection from your branch. {COLLECTION_ETA}.</p>
                  <Link
                    href="/store/checkout"
                    onClick={closeCart}
                    className="block w-full text-center bg-white text-[#0B3E80] hover:bg-[#2B87C8] hover:text-white font-bold uppercase text-sm tracking-wider py-4 transition-colors"
                  >
                    Checkout
                  </Link>
                </footer>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Stepper({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-8 h-8 border border-white/30 text-white flex items-center justify-center hover:bg-[#2B87C8] hover:border-[#2B87C8] transition-all text-base leading-none"
    >
      {children}
    </button>
  );
}
