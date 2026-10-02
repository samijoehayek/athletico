"use client";

// app/components/store/CheckoutForm.tsx
//
// Deliberately a single screen rather than a multi-step wizard. At this order
// value every extra step costs conversion and buys nothing.

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BRANCHES } from "@/lib/branches";
import { useCart } from "@/lib/store/cart-context";
import { COLLECTION_ETA, formatUSD, lineKey } from "@/lib/store/pricing";
import { hasErrors, validateOrder, type FieldErrors } from "@/lib/store/validate";
import type { CustomerDetails, PaymentMethodId } from "@/lib/store/types";
import PaymentPanel from "./PaymentPanel";

const EMPTY: CustomerDetails = {
  name: "",
  phone: "",
  email: "",
  branch: "",
};

const METHOD: PaymentMethodId = "bob";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, priced, hydrated, clear } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY);
  const [reference, setReference] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Collection is free, so the total is the subtotal.
  const total = priced.subtotalUSD;

  function set<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    setCustomer((c) => ({ ...c, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const found = validateOrder(customer, { method: METHOD, reference });
    setErrors(found);
    if (hasErrors(found)) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer,
          payment: { method: METHOD, reference },
          company: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubmitError(data.error ?? "We couldn't place your order. Please try again.");
        setSubmitting(false);
        return;
      }

      // Hand the confirmation page everything it needs without a round trip.
      try {
        window.sessionStorage.setItem(`athletico-order-${data.reference}`, JSON.stringify(data.order));
      } catch {
        // Non-fatal: the confirmation page falls back to a minimal view.
      }
      clear();
      router.push(`/store/order/${data.reference}`);
    } catch {
      setSubmitError("We couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (hydrated && priced.lines.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-24 text-center">
        <h1 className="text-[#0B3E80] font-extrabold uppercase text-3xl md:text-4xl mb-4">
          Your bag is empty
        </h1>
        <p className="text-[#0B3E80]/60 mb-8">Add something to it before checking out.</p>
        <Link
          href="/store"
          className="inline-block bg-[#0B3E80] text-white hover:bg-[#2B87C8] font-bold uppercase text-sm tracking-wider px-8 py-4 transition-colors"
        >
          Browse the store
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-14">
      <h1 className="text-[#0B3E80] font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
        <div className="space-y-10">
          <fieldset>
            <legend className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider mb-4">
              Your details
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" required error={errors.name} className="sm:col-span-2">
                <input
                  type="text"
                  autoComplete="name"
                  value={customer.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className={inputClass(errors.name)}
                />
              </Field>
              <Field label="Phone" required error={errors.phone} hint="We'll call to confirm your order.">
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="70 202 030"
                  value={customer.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  className={inputClass(errors.phone)}
                />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  value={customer.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className={inputClass(errors.email)}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider mb-4">
              Collection
            </legend>

            <Field
              label="Collect from"
              required
              error={errors.branch}
              hint={`${COLLECTION_ETA}. We'll call you when it's ready.`}
            >
              <span className="relative block">
                <select
                  value={customer.branch}
                  onChange={(e) => set("branch", e.target.value)}
                  aria-invalid={Boolean(errors.branch)}
                  className={`${inputClass(errors.branch)} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="" disabled>
                    Choose a branch
                  </option>
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  stroke="#0B3E80"
                  strokeWidth="2"
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <path d="M1 1l5 5 5-5" />
                </svg>
              </span>
            </Field>
          </fieldset>

          <PaymentPanel
            reference={reference}
            onReferenceChange={(r) => {
              setReference(r);
              if (errors.reference) setErrors((e) => ({ ...e, reference: undefined }));
            }}
            total={total}
            error={errors.reference}
          />

          {/* Honeypot — off-screen, never announced, never filled by a human. */}
          <div aria-hidden className="absolute left-[-9999px] w-px h-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 border border-[#0B3E80]/20 bg-white">
          <h2 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider px-5 py-4 border-b border-[#0B3E80]/15">
            Order summary
          </h2>

          <div className="px-5 py-4 space-y-4 max-h-[320px] overflow-y-auto">
            {priced.lines.map((line) => (
              <div key={lineKey(line)} className="flex gap-3">
                <div className="relative w-14 h-16 shrink-0 bg-[#e3e9f2] overflow-hidden">
                  <Image src={line.image} alt="" fill sizes="56px" className="object-cover" />
                  <span className="absolute -top-1 -right-1 bg-[#0B3E80] text-white text-[10px] w-5 h-5 flex items-center justify-center">
                    {line.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <p className="text-[#0B3E80] font-bold uppercase leading-tight">{line.name}</p>
                  <p className="text-[#0B3E80]/50 mt-0.5">
                    {line.size}
                    {line.colourwayName ? ` · ${line.colourwayName}` : ""}
                  </p>
                  {line.personalisation && (
                    <p className="text-[#0B3E80]/70 mt-0.5 uppercase">
                      {line.personalisation.name} {line.personalisation.number}
                    </p>
                  )}
                </div>
                <p className="text-[#0B3E80] font-bold text-xs shrink-0">
                  {formatUSD(line.lineTotalUSD)}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-[#0B3E80]/15 space-y-2 text-sm">
            <Row label="Subtotal" value={formatUSD(priced.subtotalUSD)} />
            <Row label="Collection" value="Free" />
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#0B3E80]/15">
              <span className="text-[#0B3E80] font-bold uppercase tracking-wider">Total</span>
              <span className="text-[#0B3E80] font-bold text-2xl">{formatUSD(total)}</span>
            </div>
          </div>

          <div className="px-5 pb-5">
            {submitError && (
              <p className="text-[#c0392b] text-xs mb-3 leading-relaxed" role="alert">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 font-bold uppercase text-sm tracking-[0.14em] transition-colors ${
                submitting
                  ? "bg-[#0B3E80]/40 text-white cursor-wait"
                  : "bg-[#0B3E80] text-white hover:bg-[#2B87C8]"
              }`}
            >
              {submitting ? "Placing order…" : "Place order"}
            </button>
            <p className="text-[#0B3E80]/45 text-xs mt-3 leading-relaxed text-center">
              You&apos;ll get a confirmation email. {COLLECTION_ETA}.
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}

function inputClass(error?: string) {
  return `w-full border px-3 py-2.5 text-[#0B3E80] bg-white outline-none transition-colors ${
    error ? "border-[#c0392b]" : "border-[#0B3E80]/30 focus:border-[#0B3E80]"
  }`;
}

function Field({
  label,
  children,
  required,
  error,
  hint,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[#0B3E80]/60 text-xs uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-[#c0392b]">*</span>}
      </span>
      {children}
      {error ? (
        <span className="block text-[#c0392b] text-xs mt-1.5" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="block text-[#0B3E80]/45 text-xs mt-1.5">{hint}</span>
      ) : null}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#0B3E80]/60">{label}</span>
      <span className="text-[#0B3E80] font-medium">{value}</span>
    </div>
  );
}
