// lib/payments/orders.ts
//
// Server-only. Loads an order back from the order sheet and shapes the
// customer-facing view of it. Shared by the order status, retry and simulator
// routes, so they all agree on what an order looks like.

import { callOrderBook } from "../store/order-book";
import type { PricedLine } from "../store/types";
import type { PaymentMethodId, PaymentStatus } from "./methods";
import type { PayableOrder } from "./providers";

/** The order as the order route stored it (the Orders tab's ORDER JSON column). */
export interface StoredOrder extends PayableOrder {
  placedAt: string;
  customer: PayableOrder["customer"] & { phone: string; playerName?: string };
  branchName: string;
  collectionEta: string;
  payment: PayableOrder["payment"] & { label: string };
  lines: PricedLine[];
  subtotalUSD: number;
}

export interface LoadedOrder {
  status: PaymentStatus;
  order: StoredOrder;
  items: { descr: string; size: string; status: string }[];
}

export type LoadResult =
  | { ok: true; loaded: LoadedOrder }
  | { ok: false; notFound: boolean; error: string };

export async function loadOrder(reference: string): Promise<LoadResult> {
  const res = await callOrderBook({ action: "getOrder", reference });
  if (!res.ok) {
    return { ok: false, notFound: res.error === "not found", error: String(res.error ?? "unknown") };
  }
  return {
    ok: true,
    loaded: {
      status: res.payment as PaymentStatus,
      order: res.order as StoredOrder,
      items: (res.items as LoadedOrder["items"]) ?? [],
    },
  };
}

/**
 * What the order page may show. Deliberately leaves out the email address and
 * phone number: the page is reachable by anyone holding its link.
 */
export function publicView(reference: string, loaded: LoadedOrder) {
  const { order, status, items } = loaded;
  return {
    reference,
    status,
    method: order.payment.method as PaymentMethodId,
    methodLabel: order.payment.label,
    simulated: Boolean(order.payment.simulated),
    firstName: String(order.customer.name).split(" ")[0],
    playerName: order.customer.playerName ?? null,
    branchName: order.branchName,
    collectionEta: order.collectionEta,
    placedAt: order.placedAt,
    lines: order.lines.map((l) => ({
      name: l.name,
      size: l.size,
      qty: l.qty,
      colourwayName: l.colourwayName ?? null,
      personalisation: l.personalisation ?? null,
      lineTotalUSD: l.lineTotalUSD,
    })),
    subtotalUSD: order.subtotalUSD,
    totalUSD: order.totalUSD,
    // Per-item progress from the Items tab (ORDERED, READY FOR COLLECTION, …).
    itemStatuses: items.map((i) => i.status),
  };
}

export type PublicOrder = ReturnType<typeof publicView>;
