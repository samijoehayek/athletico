"use client";

// app/components/store/CartButton.tsx
// The STORE entry in the main navigation. It sits with the other nav links
// (the caller passes their classes) and carries a live count once the bag has
// something in it.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/store/cart-context";

export default function CartButton({
  mode = "light",
  className = "",
  onNavigate,
}: {
  mode?: "light" | "dark";
  className?: string;
  onNavigate?: () => void;
}) {
  const { count, hydrated, openCart } = useCart();
  const pathname = usePathname();
  const inStore = pathname?.startsWith("/store");

  const base = `inline-flex items-center gap-2 ${className}`;

  const badge = hydrated && count > 0 && (
    <span
      className={`min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-[11px] font-bold tabular-nums ${
        mode === "dark" ? "bg-[#0B3E80] text-white" : "bg-[#FFE400] text-[#0B3E80]"
      }`}
    >
      {count}
    </span>
  );

  // Inside the store the link opens the bag; elsewhere it navigates to it.
  if (inStore) {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          openCart();
        }}
        className={`${base} text-left`}
        aria-label={`Open bag${count > 0 ? `, ${count} items` : ""}`}
      >
        Store
        {badge}
      </button>
    );
  }

  return (
    <Link href="/store" onClick={onNavigate} className={base}>
      Store
      {badge}
    </Link>
  );
}
