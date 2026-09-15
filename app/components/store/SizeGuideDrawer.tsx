"use client";

// app/components/store/SizeGuideDrawer.tsx
// Opens as a slide-over rather than a separate page so the customer never
// leaves the funnel to check a measurement.

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

// PLACEHOLDER measurements — replace with the club's own table.
const APPAREL_ROWS = [
  { size: "XS", chest: "86–91", waist: "71–76", length: "68" },
  { size: "S", chest: "91–97", waist: "76–81", length: "70" },
  { size: "M", chest: "97–102", waist: "81–87", length: "72" },
  { size: "L", chest: "102–107", waist: "87–92", length: "74" },
  { size: "XL", chest: "107–112", waist: "92–97", length: "76" },
  { size: "XXL", chest: "112–118", waist: "97–103", length: "78" },
];

export default function SizeGuideDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#F1EAEA] z-[10001] flex flex-col"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-[#0B3E80]/15">
              <h2 className="text-[#0B3E80] font-bold uppercase text-lg tracking-wide">Size guide</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close size guide"
                className="w-10 h-10 border border-[#0B3E80]/30 text-[#0B3E80] flex items-center justify-center hover:bg-[#2B87C8] hover:border-[#2B87C8] hover:text-white transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-[#0B3E80]/60 text-sm mb-5 leading-relaxed">
                Measurements in centimetres. If you are between sizes, size up — our match shirts
                are cut close.
              </p>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0B3E80] text-white">
                    <th className="text-left px-3 py-2.5 font-bold uppercase text-xs tracking-wider">Size</th>
                    <th className="text-left px-3 py-2.5 font-bold uppercase text-xs tracking-wider">Chest</th>
                    <th className="text-left px-3 py-2.5 font-bold uppercase text-xs tracking-wider">Waist</th>
                    <th className="text-left px-3 py-2.5 font-bold uppercase text-xs tracking-wider">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {APPAREL_ROWS.map((r, i) => (
                    <tr key={r.size} className={i % 2 ? "bg-white/60" : ""}>
                      <td className="px-3 py-2.5 font-bold text-[#0B3E80]">{r.size}</td>
                      <td className="px-3 py-2.5 text-[#0B3E80]/70">{r.chest}</td>
                      <td className="px-3 py-2.5 text-[#0B3E80]/70">{r.waist}</td>
                      <td className="px-3 py-2.5 text-[#0B3E80]/70">{r.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wide mt-8 mb-2">
                How to measure
              </h3>
              <ul className="text-[#0B3E80]/70 text-sm space-y-2 list-disc pl-4 marker:text-[#2B87C8]">
                <li>Chest — around the fullest part, under the arms, tape level.</li>
                <li>Waist — around the natural waistline, keeping one finger under the tape.</li>
                <li>Length — from the highest point of the shoulder straight down.</li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
