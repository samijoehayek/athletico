"use client";

// app/components/store/PaymentSimulator.tsx
//
// The simulator's screen: the order total and two buttons. "Approve" and
// "Decline" go through /api/payments/simulate, which marks the order PAID or
// PAYMENT FAILED in the real order sheet, then returns the customer to the
// order page, exactly the path a real gateway confirmation will take.

import { useEffect, useState } from "react";
import type { PublicOrder } from "@/lib/payments/orders";
import { formatUSD } from "@/lib/store/pricing";

export default function PaymentSimulator({ reference, token }: { reference: string; token: string }) {
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${encodeURIComponent(reference)}?t=${encodeURIComponent(token)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => (d.ok ? setOrder(d.order) : setError("Order not found.")))
      .catch(() => setError("Couldn't load the order."));
  }, [reference, token]);

  async function decide(outcome: "approve" | "decline") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: reference, t: token, outcome }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white">
      <div className="bg-[#FFE400] px-6 py-3">
        <p className="text-[#0B3E80] text-[11px] font-bold uppercase tracking-[0.2em]">
          Payment simulator · test only · no money moves
        </p>
      </div>
      <div className="px-6 py-8">
        <p className="text-[#0B3E80]/55 text-xs uppercase tracking-[0.2em] mb-1">
          {order ? order.methodLabel : "Payment"}
        </p>
        <h1 className="text-[#0B3E80] font-extrabold uppercase text-3xl leading-none mb-2">
          {order ? formatUSD(order.totalUSD) : "…"}
        </h1>
        <p className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/60 text-sm mb-8">
          Order {reference}. This screen stands in for{" "}
          {order?.method === "bob-wallet" ? "the approval screen in the BOB Finance app" : "the bank's card payment page"}{" "}
          until the real credentials are configured.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!order || busy}
            onClick={() => decide("approve")}
            className="py-4 bg-[#0B3E80] text-white font-bold uppercase text-sm tracking-wider hover:bg-[#2B87C8] transition-colors disabled:opacity-40"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={!order || busy}
            onClick={() => decide("decline")}
            className="py-4 border border-[#0B3E80] text-[#0B3E80] font-bold uppercase text-sm tracking-wider hover:bg-[#0B3E80]/5 transition-colors disabled:opacity-40"
          >
            Decline
          </button>
        </div>

        {error && (
          <p className="text-[#c0392b] text-xs mt-4" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
