// lib/store/use-hydrated.ts
"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during SSR and the hydrating render, true afterwards. Used to hold back
 * browser-only values (a restored cart count, a sessionStorage read) until the
 * client has taken over, without a setState in an effect.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
