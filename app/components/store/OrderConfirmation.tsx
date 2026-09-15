"use client";

// app/components/store/OrderConfirmation.tsx
//
// The third delivery path. Even if the Google Sheet and both emails failed, a
// customer who taps the WhatsApp button puts the order straight into the channel
// the club actually works in.

import Link from "next/link";
import { useMemo } from "react";
import { useHydrated } from "@/lib/store/use-hydrated";
import {
  BOB_ACCOUNT,
  BOB_NAME,
  WHISH_NAME,
  WHISH_NUMBER,
  whatsappOrderLink,
} from "@/lib/store/config";
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
  zoneLabel: string;
  zoneEta: string;
  payment: { method: string; reference: string };
  lines: StoredLine[];
  subtotalUSD: number;
  deliveryUSD: number;
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

  const message = order
    ? [
        `Hello Athletico — I've just placed order ${reference}.`,
        "",
        ...order.lines.map(
          (l) =>
            `• ${l.qty}× ${l.name} (${l.size}${l.colourwayName ? `, ${l.colourwayName}` : ""})` +
            (l.personalisation?.name || l.personalisation?.number
              ? ` — ${l.personalisation.name} ${l.personalisation.number}`
              : ""),
        ),
        "",
        `Total: ${formatUSD(order.totalUSD)}`,
        `Payment: ${labelFor(order.payment.method)}${
          order.payment.reference ? ` (ref ${order.payment.reference})` : ""
        }`,
        `Name: ${order.customer.name}`,
      ].join("\n")
    : `Hello Athletico — I've just placed order ${reference}.`;

  const awaitingPayment = order?.payment.method === "whish" || order?.payment.method === "bob";

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

        {awaitingPayment && (
          <div className="border-l-4 border-[#FFE400] bg-[#FFE400]/10 px-5 py-4 mb-8">
            <h2 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wide mb-2">
              Finish your payment
            </h2>
            <p className="text-[#0B3E80]/75 text-sm leading-relaxed">
              {order?.payment.method === "whish" ? (
                <>
                  Send <strong>{formatUSD(order.totalUSD)}</strong> to {WHISH_NAME} on{" "}
                  <strong>{WHISH_NUMBER}</strong> from your Whish app.
                </>
              ) : (
                <>
                  Pay <strong>{order ? formatUSD(order.totalUSD) : ""}</strong> to {BOB_NAME},
                  account <strong>{BOB_ACCOUNT}</strong>, at any BoB Finance branch.
                </>
              )}{" "}
              We check every transfer by hand and your order is packed as soon as it clears.
            </p>
          </div>
        )}

        <a
          href={whatsappOrderLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase text-sm tracking-wider px-8 py-4 transition-colors mb-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.04 2.01C6.53 2.01 2.01 6.53 2.01 12.04c0 1.77.46 3.5 1.33 5.03L2 22l5.11-1.33a10 10 0 0 0 4.93 1.26h.01c5.51 0 10.03-4.52 10.03-10.03 0-5.51-4.52-9.89-10.03-9.89zm5.88 14.26c-.25.7-1.45 1.34-2 1.43-.5.08-1.14.12-1.84-.12-.43-.14-.99-.32-1.7-.64-3.01-1.3-4.97-4.3-5.12-4.5-.15-.2-1.22-1.63-1.22-3.11 0-1.48.78-2.21 1.06-2.51.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.85 2.07.93 2.22.08.15.13.33.02.53-.11.2-.16.33-.31.51-.15.18-.32.4-.46.54-.15.15-.3.32-.13.62.17.3.75 1.23 1.6 1.99 1.1.98 2.03 1.28 2.33 1.43.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.41-.25.69-.15.28.1 1.77.84 2.08.99.3.15.51.23.59.36.08.13.08.75-.17 1.45z" />
          </svg>
          Send order on WhatsApp
        </a>

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
              <Row
                label={`Delivery — ${order.zoneLabel}`}
                value={order.deliveryUSD === 0 ? "Free" : formatUSD(order.deliveryUSD)}
              />
              <div className="flex justify-between pt-2 mt-1 border-t border-[#0B3E80]/15">
                <span className="text-[#0B3E80] font-bold uppercase tracking-wider">Total</span>
                <span className="text-[#0B3E80] font-bold text-lg">{formatUSD(order.totalUSD)}</span>
              </div>
              <p className="text-[#0B3E80]/50 text-xs pt-3">Expected: {order.zoneEta}.</p>
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

function labelFor(method: string): string {
  if (method === "whish") return "Whish";
  if (method === "bob") return "BOB Finance";
  return "Cash on delivery";
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#0B3E80]/60">{label}</span>
      <span className="text-[#0B3E80]">{value}</span>
    </div>
  );
}
