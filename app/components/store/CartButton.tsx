"use client";

// app/components/store/CartButton.tsx
// The STORE entry in the main navigation — the only filled chip in the bar,
// carrying a live count once the bag has something in it.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/store/cart-context";

export default function CartButton({
  mode = "light",
  onNavigate,
  block = false,
}: {
  mode?: "light" | "dark";
  onNavigate?: () => void;
  block?: boolean;
}) {
  const { count, hydrated, openCart } = useCart();
  const pathname = usePathname();
  const inStore = pathname?.startsWith("/store");

  // Inside the store the chip opens the bag; elsewhere it navigates to it.
  const base = `inline-flex items-center gap-2 font-bold uppercase tracking-wider transition-colors ${
    block ? "w-full justify-center px-4 py-3 text-base" : "px-4 py-2 text-sm"
  }`;
  const skin =
    mode === "dark"
      ? "bg-[#0B3E80] text-white hover:bg-[#2B87C8]"
      : "bg-[#FFE400] text-[#0B3E80] hover:bg-white";

  const badge = hydrated && count > 0 && (
    <span
      className={`min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-[11px] tabular-nums ${
        mode === "dark" ? "bg-[#FFE400] text-[#0B3E80]" : "bg-[#0B3E80] text-white"
      }`}
    >
      {count}
    </span>
  );

  if (inStore) {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          openCart();
        }}
        className={`${base} ${skin}`}
        aria-label={`Open bag${count > 0 ? `, ${count} items` : ""}`}
      >
        Store
        {badge}
      </button>
    );
  }

  return (
    <Link href="/store" onClick={onNavigate} className={`${base} ${skin}`}>
      Store
      {badge}
    </Link>
  );
}
