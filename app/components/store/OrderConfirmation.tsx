"use client";

// app/components/store/OrderConfirmation.tsx
//
// The order page: where every customer lands after checkout, whatever the
// payment method. It shows the payment state as recorded in the order sheet
// (via /api/orders/:ref) and keeps checking while the payment is pending, so
// it turns into the Order Confirmation of clause 5.3 of the Terms only once the
// payment is actually verified, never before.

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PaymentNextStep } from "@/lib/payments/methods";
import type { PublicOrder } from "@/lib/payments/orders";
import { formatUSD } from "@/lib/store/pricing";

type Load =
  | { state: "loading" }
  | { state: "ready"; order: PublicOrder }
  | { state: "not-found" }
  | { state: "unavailable" };

/** Check every 3 s for two minutes, then every 8 s; give up after 20 minutes. */
const FAST_MS = 3_000;
const SLOW_MS = 8_000;
const FAST_FOR_MS = 2 * 60_000;
const GIVE_UP_MS = 20 * 60_000;

export default function OrderConfirmation({ reference, token }: { reference: string; token: string }) {
  const [load, setLoad] = useState<Load>({ state: "loading" });
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);
  // When polling began (set on the first check, reset on retry).
  const startedAt = useRef(0);

  const fetchOrder = useCallback(async (): Promise<Load> => {
    if (!token) return { state: "not-found" };
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(reference)}?t=${encodeURIComponent(token)}`, {
        cache: "no-store",
      });
      if (res.status === 404) return { state: "not-found" };
      const data = await res.json();
      return data.ok ? { state: "ready", order: data.order } : { state: "unavailable" };
    } catch {
      return { state: "unavailable" };
    }
  }, [reference, token]);

  // Poll while the payment is pending (or the sheet was briefly unreachable).
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    async function tick() {
      if (!startedAt.current) startedAt.current = Date.now();
      const next = await fetchOrder();
      if (cancelled) return;
      setLoad((prev) => (next.state === "unavailable" && prev.state === "ready" ? prev : next));

      const elapsed = Date.now() - startedAt.current;
      const keepGoing =
        (next.state === "unavailable" || (next.state === "ready" && next.order.status === "PENDING PAYMENT")) &&
        elapsed < GIVE_UP_MS;
      if (keepGoing) timer = setTimeout(tick, elapsed < FAST_FOR_MS ? FAST_MS : SLOW_MS);
    }

    tick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fetchOrder, retrying]);

  async function retry() {
    setRetrying(true);
    setRetryError(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(reference)}/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setRetryError(data.error ?? "We couldn't restart the payment. Please try again.");
        setRetrying(false);
        return;
      }
      const next = data.next as PaymentNextStep;
      if (next.kind === "redirect") {
        window.location.assign(next.url);
        return;
      }
      startedAt.current = Date.now();
      setLoad({ state: "loading" });
      setRetrying(false);
    } catch {
      setRetryError("We couldn't reach the server. Please check your connection and try again.");
      setRetrying(false);
    }
  }

  return (
    <section className="w-full bg-[#F1EAEA] px-6 md:px-12 lg:px-16 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        {load.state === "loading" && <Heading kicker="Your order" title="One moment" />}

        {load.state === "not-found" && (
          <>
            <Heading kicker="Your order" title="We can't find this order" />
            <p className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/70 mb-8 max-w-lg leading-relaxed">
              The link may be incomplete. Use the link from your order email, or contact us quoting
              your reference.
            </p>
            <Reference value={reference} />
          </>
        )}

        {load.state === "unavailable" && (
          <>
            <Heading kicker="Your order" title="Still checking" />
            <p className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/70 mb-8 max-w-lg leading-relaxed">
              We couldn&apos;t load your order just now. This page keeps trying; you can also refresh it.
            </p>
            <Reference value={reference} />
          </>
        )}

        {load.state === "ready" && (
          <ReadyView order={load.order} onRetry={retry} retrying={retrying} retryError={retryError} />
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

function ReadyView({
  order,
  onRetry,
  retrying,
  retryError,
}: {
  order: PublicOrder;
  onRetry: () => void;
  retrying: boolean;
  retryError: string | null;
}) {
  const total = formatUSD(order.totalUSD);

  return (
    <>
      {order.simulated && (
        <p className="mb-6 inline-block bg-[#FFE400] text-[#0B3E80] text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1">
          Test order · simulated payment
        </p>
      )}

      {order.status === "PAID" && (
        <>
          <Heading kicker="Order confirmed" title={`Thank you, ${order.firstName}`} />
          <Lead>
            Your payment of <strong>{total}</strong> by {order.methodLabel} was received. Your order is
            being prepared and we&apos;ll call you when it&apos;s ready for collection at{" "}
            <strong>{order.branchName}</strong>.
          </Lead>
        </>
      )}

      {order.status === "PENDING PAYMENT" && (
        <>
          <Heading
            kicker="Order received"
            title={order.method === "bob-wallet" ? "Approve in your BOB app" : "Waiting for payment"}
          />
          <Lead>
            {order.method === "bob-wallet" ? (
              <>
                We&apos;ve sent a payment request of <strong>{total}</strong> to your BOB Finance app. Open
                the notification and tap <strong>Approve</strong>. This page updates by itself.
              </>
            ) : (
              <>
                We&apos;re waiting for confirmation of your payment of <strong>{total}</strong>. If you&apos;ve
                just paid, this page updates in a few seconds.
              </>
            )}
          </Lead>
          <Pending />
        </>
      )}

      {order.status === "PAYMENT FAILED" && (
        <>
          <Heading kicker="Order received" title="Payment didn't go through" />
          <Lead>
            Your order is saved and nothing was charged. You can try the payment again; if it keeps
            failing, contact us quoting your reference.
          </Lead>
          <button
            type="button"
            onClick={onRetry}
            disabled={retrying}
            className={`mb-3 px-8 py-4 font-bold uppercase text-sm tracking-[0.14em] transition-colors ${
              retrying ? "bg-[#0B3E80]/40 text-white cursor-wait" : "bg-[#0B3E80] text-white hover:bg-[#2B87C8]"
            }`}
          >
            {retrying ? "Starting payment…" : `Try again · ${total}`}
          </button>
          {retryError && (
            <p className="text-[#c0392b] text-xs mb-6" role="alert">
              {retryError}
            </p>
          )}
        </>
      )}

      {order.status === "REFUNDED" && (
        <>
          <Heading kicker="Your order" title="This order was refunded" />
          <Lead>The payment for this order has been refunded through the original payment method.</Lead>
        </>
      )}

      <div className="mt-6">
        <Reference value={order.reference} />
      </div>

      <div className="border border-[#0B3E80]/20 bg-white">
        <h2 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider px-5 py-4 border-b border-[#0B3E80]/15">
          {order.playerName ? `Order for ${order.playerName}` : "Your order"}
        </h2>
        <div className="px-5 py-4 space-y-3">
          {order.lines.map((l, i) => (
            <div key={i} className="flex justify-between gap-4 text-sm">
              <span className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/75">
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
              <span className="text-[#0B3E80] font-medium shrink-0">{formatUSD(l.lineTotalUSD)}</span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-[#0B3E80]/15 text-sm space-y-1.5">
          <Row label="Subtotal" value={formatUSD(order.subtotalUSD)} />
          <Row label={`Collection — ${order.branchName}`} value="Free" />
          <div className="flex justify-between pt-2 mt-1 border-t border-[#0B3E80]/15">
            <span className="text-[#0B3E80] font-bold uppercase tracking-wider">Total</span>
            <span className="text-[#0B3E80] font-bold text-lg">{total}</span>
          </div>
          <p className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/50 text-xs pt-3">
            {order.collectionEta} at {order.branchName}, once payment is confirmed. Bring your order
            reference when you collect.
          </p>
        </div>
      </div>
    </>
  );
}

function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <>
      <p className="text-[#2B87C8] text-xs uppercase tracking-[0.28em] mb-3">{kicker}</p>
      <h1 className="text-[#0B3E80] font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-4">
        {title}
      </h1>
    </>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/70 text-base mb-6 max-w-xl leading-relaxed">
      {children}
    </p>
  );
}

function Reference({ value }: { value: string }) {
  return (
    <div className="border-2 border-[#0B3E80] bg-white px-6 py-5 mb-8 inline-block">
      <p className="text-[#0B3E80]/55 text-xs uppercase tracking-[0.2em] mb-1">Your reference</p>
      <p className="text-[#0B3E80] font-extrabold text-2xl md:text-3xl tracking-wide">{value}</p>
    </div>
  );
}

function Pending() {
  return (
    <div className="flex items-center gap-3 mb-6" role="status" aria-live="polite">
      {/* Square dots, not a round spinner: the site has no rounded corners. */}
      <span className="flex gap-1" aria-hidden>
        {[0, 150, 300].map((d) => (
          <span key={d} className="w-2 h-2 bg-[#0B3E80] animate-pulse" style={{ animationDelay: `${d}ms` }} />
        ))}
      </span>
      <span className="text-[#0B3E80]/60 text-xs uppercase tracking-wider">Checking payment</span>
    </div>
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
