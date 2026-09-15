"use client";

// lib/store/cart-context.tsx
//
// A thin React wrapper over lib/store/cart-store.ts. The cart itself lives
// outside React so it can be read with useSyncExternalStore; this file only
// supplies the drawer's open/closed state and derived pricing.
//
// Nothing is sent anywhere until checkout, and what is sent carries no prices —
// see lib/store/pricing.ts for why.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  addItem,
  clearCart,
  getServerSnapshot,
  getSnapshot,
  removeItem,
  setItemQty,
  subscribe,
} from "./cart-store";
import { priceCart } from "./pricing";
import { useHydrated } from "./use-hydrated";
import type { CartLineInput, PricedCart } from "./types";

interface CartValue {
  items: CartLineInput[];
  priced: PricedCart;
  count: number;
  /** False until the client has taken over — guards against SSR mismatch. */
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: CartLineInput) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useHydrated();
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll while the drawer is open. Synchronising an external system
  // (the DOM) with React state is exactly what an effect is for.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const priced = useMemo(() => priceCart(items), [items]);
  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const add = useCallback((item: CartLineInput) => {
    addItem(item);
    setIsOpen(true);
  }, []);
  const setQty = useCallback((key: string, qty: number) => setItemQty(key, qty), []);
  const remove = useCallback((key: string) => removeItem(key), []);
  const clear = useCallback(() => clearCart(), []);

  const value = useMemo(
    () => ({ items, priced, count, hydrated, isOpen, openCart, closeCart, add, setQty, remove, clear }),
    [items, priced, count, hydrated, isOpen, openCart, closeCart, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
