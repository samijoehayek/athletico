"use client";

// app/components/store/OrderConfirmation.tsx
//
// Shown after the order is placed. The customer's confirmation email comes from
// the order book (docs/apps-script/Code.gs).

import Link from "next/link";
import { useMemo } from "react";
import { useHydrated } from "@/lib/store/use-hydrated";
import { BOB_ACCOUNT, BOB_NAME } from "@/lib/store/config";
import { formatUSD } from "@/lib/store/pricing";

interface StoredLine {
  name: string;
  size: string;
  qty: number;
  colourwayName?: string;
  personalisation?: { name: string; number: string };
  lineTotalUSD: number;
}

interface StoredOrder {
  reference: string;
  customer: { name: string; phone: string; email: string };
  branchName: string;
  collectionEta: string;
  payment: { method: string; reference: string };
  lines: StoredLine[];
  subtotalUSD: number;
  totalUSD: number;
}

export default function OrderConfirmation({ reference }: { reference: string }) {
  // The order was stashed by the checkout form before redirecting here, so the
  // confirmation needs no round trip. Read it once the client has taken over.
  const loaded = useHydrated();
  const order = useMemo<StoredOrder | null>(() => {
    if (!loaded) return null;
    try {
      const raw = window.sessionStorage.getItem(`athletico-order-${reference}`);
      return raw ? (JSON.parse(raw) as StoredOrder) : null;
    } catch {
      return null; // Falls through to the minimal view.
    }
  }, [loaded, reference]);

  return (
    <section className="w-full bg-[#F1EAEA] px-6 md:px-12 lg:px-16 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#2B87C8] text-xs uppercase tracking-[0.28em] mb-3">Order received</p>
        <h1 className="text-[#0B3E80] font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-4">
          Thank you
        </h1>
        <p className="text-[#0B3E80]/70 text-base mb-8 max-w-lg leading-relaxed">
          Keep this reference. We&apos;ve emailed you a copy and the club has been notified.
        </p>

        <div className="border-2 border-[#0B3E80] bg-white px-6 py-5 mb-8 inline-block">
          <p className="text-[#0B3E80]/55 text-xs uppercase tracking-[0.2em] mb-1">Your reference</p>
          <p className="text-[#0B3E80] font-extrabold text-2xl md:text-3xl tracking-wide">{reference}</p>
        </div>

        {order && (
          <div className="border-l-4 border-[#FFE400] bg-[#FFE400]/10 px-5 py-4 mb-10">
            <h2 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider mb-2">
              Payment
            </h2>
            <p className="text-[#0B3E80]/75 text-sm leading-relaxed">
              <strong>{formatUSD(order.totalUSD)}</strong> by BOB Finance to {BOB_NAME}, account{" "}
              <strong>{BOB_ACCOUNT}</strong>
              {order.payment.reference ? <> (ref {order.payment.reference})</> : null}. We check
              every payment by hand before your order is prepared.
            </p>
          </div>
        )}

        {loaded && order && (
          <div className="border border-[#0B3E80]/20 bg-white">
            <h2 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider px-5 py-4 border-b border-[#0B3E80]/15">
              Your order
            </h2>
            <div className="px-5 py-4 space-y-3">
              {order.lines.map((l, i) => (
                <div key={i} className="flex justify-between gap-4 text-sm">
                  <span className="text-[#0B3E80]/75">
                    {l.qty}× {l.name}{" "}
                    <span className="text-[#0B3E80]/45">
                      ({l.size}
                      {l.colourwayName ? `, ${l.colourwayName}` : ""})
                    </span>
                    {(l.personalisation?.name || l.personalisation?.number) && (
                      <span className="block text-[#0B3E80]/55 text-xs uppercase mt-0.5">
                        {l.personalisation?.name} {l.personalisation?.number}
                      </span>
                    )}
                  </span>
                  <span className="text-[#0B3E80] font-medium shrink-0">
                    {formatUSD(l.lineTotalUSD)}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-[#0B3E80]/15 text-sm space-y-1.5">
              <Row label="Subtotal" value={formatUSD(order.subtotalUSD)} />
              <Row label={`Collection — ${order.branchName}`} value="Free" />
              <div className="flex justify-between pt-2 mt-1 border-t border-[#0B3E80]/15">
                <span className="text-[#0B3E80] font-bold uppercase tracking-wider">Total</span>
                <span className="text-[#0B3E80] font-bold text-lg">{formatUSD(order.totalUSD)}</span>
              </div>
              <p className="text-[#0B3E80]/50 text-xs pt-3">
                {order.collectionEta} at {order.branchName}. We&apos;ll call you when it&apos;s ready.
              </p>
            </div>
          </div>
        )}

        {loaded && !order && (
          <p className="text-[#0B3E80]/55 text-sm leading-relaxed">
            We no longer have the details of this order in this browser, but the club has it. Quote
            your reference if you need to get in touch.
          </p>
        )}

        <div className="mt-10">
          <Link
            href="/store"
            className="text-[#2B87C8] hover:text-[#0B3E80] text-sm uppercase tracking-wider underline underline-offset-4 transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#0B3E80]/60">{label}</span>
      <span className="text-[#0B3E80]">{value}</span>
    </div>
  );
}
