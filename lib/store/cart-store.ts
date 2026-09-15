// lib/store/cart-store.ts
//
// The cart lives in a module-level store rather than component state so it can
// be read with `useSyncExternalStore`. That is the correct primitive for state
// backed by an external system (here, localStorage): the server snapshot is
// always empty, the client snapshot is whatever the browser had, and React
// reconciles the two without a hydration mismatch and without a setState in an
// effect.

import { lineKey, MAX_QTY_PER_LINE } from "./pricing";
import type { CartLineInput } from "./types";

const STORAGE_KEY = "athletico-cart-v1";

/** Stable empty reference — getServerSnapshot must not allocate per call. */
const SERVER_SNAPSHOT: CartLineInput[] = [];

let items: CartLineInput[] = SERVER_SNAPSHOT;
let loadedFromStorage = false;
const listeners = new Set<() => void>();

function loadOnce() {
  if (loadedFromStorage) return;
  loadedFromStorage = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) {
      items = parsed.filter(
        (i): i is CartLineInput =>
          i && typeof i.slug === "string" && typeof i.size === "string" && Number(i.qty) > 0,
      );
    }
  } catch {
    // Private mode, blocked storage, or corrupt JSON — start empty.
  }
}

function commit(next: CartLineInput[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or unavailable; the cart still works for this session.
  }
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  // First subscriber pulls the cart out of storage. React re-reads the snapshot
  // immediately after subscribing, so the restored cart paints straight away.
  loadOnce();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): CartLineInput[] {
  return items;
}

export function getServerSnapshot(): CartLineInput[] {
  return SERVER_SNAPSHOT;
}

export function addItem(item: CartLineInput) {
  const key = lineKey(item);
  const existing = items.find((i) => lineKey(i) === key);
  commit(
    existing
      ? items.map((i) =>
          lineKey(i) === key ? { ...i, qty: Math.min(i.qty + item.qty, MAX_QTY_PER_LINE) } : i,
        )
      : [...items, { ...item, qty: Math.min(item.qty, MAX_QTY_PER_LINE) }],
  );
}

export function setItemQty(key: string, qty: number) {
  commit(
    qty < 1
      ? items.filter((i) => lineKey(i) !== key)
      : items.map((i) => (lineKey(i) === key ? { ...i, qty: Math.min(qty, MAX_QTY_PER_LINE) } : i)),
  );
}

export function removeItem(key: string) {
  commit(items.filter((i) => lineKey(i) !== key));
}

export function clearCart() {
  commit([]);
}
