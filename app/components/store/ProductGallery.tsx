"use client";

// app/components/store/ProductGallery.tsx
// Square thumbnails down the left, main image right, click-to-zoom lightbox.
// The column is pinned with CSS `sticky` rather than a scroll library: it
// survives resize and orientation change with no cleanup, and reads identically.

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const safeIndex = Math.min(index, images.length - 1);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <>
      <div className="flex gap-3 md:gap-4">
        {images.length > 1 && (
          <div className="hidden sm:flex flex-col gap-3 shrink-0">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === safeIndex}
                className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden border transition-all ${
                  i === safeIndex ? "border-[#0B3E80]" : "border-transparent hover:border-[#0B3E80]/40"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label="Zoom image"
          className="relative flex-1 aspect-[4/5] bg-[#e3e9f2] overflow-hidden cursor-zoom-in group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={images[safeIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={images[safeIndex]}
                alt={alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile pagination — thumbnails are hidden below sm. */}
      {images.length > 1 && (
        <div className="flex sm:hidden justify-center gap-2 mt-4">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`w-8 h-1 transition-colors ${i === safeIndex ? "bg-[#0B3E80]" : "bg-[#0B3E80]/25"}`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} enlarged`}
            className="fixed inset-0 z-[10002] bg-[#0B3E80]/95 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <div className="relative w-full max-w-3xl aspect-[4/5]">
              <Image src={images[safeIndex]} alt={alt} fill sizes="90vw" className="object-contain" />
            </div>
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Close"
              className="absolute top-6 right-6 w-11 h-11 border border-white/40 text-white flex items-center justify-center hover:bg-[#2B87C8] hover:border-[#2B87C8] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
