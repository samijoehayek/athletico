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
import { TERMS_PATH } from "@/lib/legal/terms";
import { useCart } from "@/lib/store/cart-context";
import { COLLECTION_ETA, formatUSD, lineKey } from "@/lib/store/pricing";
import {
  TERMS_NOT_ACCEPTED,
  hasErrors,
  validateOrder,
  type FieldErrors,
} from "@/lib/store/validate";
import type { PaymentMethodId, PaymentNextStep } from "@/lib/payments/methods";
import type { CustomerDetails } from "@/lib/store/types";
import PaymentMethodPicker from "./PaymentMethodPicker";

const EMPTY: CustomerDetails = {
  name: "",
  phone: "",
  email: "",
  branch: "",
};

/**
 * `methods` is what the server offers right now (decided from the payment
 * credentials configured), `testMode` that no real money can move.
 */
export default function CheckoutForm({
  methods,
  testMode,
}: {
  methods: PaymentMethodId[];
  testMode: boolean;
}) {
  const router = useRouter();
  const { items, priced, hydrated, clear } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>(EMPTY);
  // With a single method on offer there's nothing to choose.
  const [method, setMethod] = useState<PaymentMethodId | undefined>(
    methods.length === 1 ? methods[0] : undefined,
  );
  const [mobile, setMobile] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Collection is free, so the total is the subtotal.
  const total = priced.subtotalUSD;

  function set<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    setCustomer((c) => ({ ...c, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function chooseMethod(m: PaymentMethodId) {
    setMethod(m);
    // Most people pay from the phone they gave as contact; offer it, editable.
    if (m === "bob-wallet" && !mobile) setMobile(customer.phone);
    if (errors.method) setErrors((er) => ({ ...er, method: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const found = validateOrder(customer, { method, mobile }, methods);
    if (!termsAccepted) found.terms = TERMS_NOT_ACCEPTED;
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
          payment: { method, mobile: method === "bob-wallet" ? mobile : undefined },
          termsAccepted,
          hp: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        // Highlight whatever the server rejected (it re-validates every field).
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setSubmitError(data.error ?? "We couldn't place your order. Please try again.");
        setSubmitting(false);
        return;
      }

      // The order now exists in the club's order sheet, so the bag has done its
      // job. Payment happens next: on the bank's page (redirect) or in the BOB
      // app while the order page waits (await). Either way the order page,
      // which reads the sheet, is where the customer ends up.
      clear();
      const next = data.next as PaymentNextStep;
      if (next.kind === "redirect") window.location.assign(next.url);
      else router.push(next.url);
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
              {/* Optional. Fills the NAME column of the club's order sheet, which
                  tracks orders by player (parents usually buy for a child). */}
              <Field
                label="Player's name"
                error={errors.playerName}
                hint="If you're ordering for a player, e.g. your child. Leave empty if it's for you."
                className="sm:col-span-2"
              >
                <input
                  type="text"
                  autoComplete="off"
                  value={customer.playerName ?? ""}
                  onChange={(e) => set("playerName", e.target.value)}
                  aria-invalid={Boolean(errors.playerName)}
                  className={inputClass(errors.playerName)}
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

          <PaymentMethodPicker
            methods={methods}
            value={method}
            onChange={chooseMethod}
            mobile={mobile}
            onMobileChange={(v) => {
              setMobile(v);
              if (errors.mobile) setErrors((er) => ({ ...er, mobile: undefined }));
            }}
            errors={{ method: errors.method, mobile: errors.mobile }}
            testMode={testMode}
          />

          {/* Honeypot: off-screen, never announced, never filled by a human.
              Its name and label must mean nothing to browser autofill. It used
              to be "Company", and Chrome filled it from customers' saved
              addresses, so real orders were discarded as spam. */}
          <div aria-hidden className="absolute left-[-9999px] w-px h-px overflow-hidden">
            <label htmlFor="ath-hp">Leave this field empty</label>
            <input
              id="ath-hp"
              name="ath-hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore
              data-form-type="other"
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
            {/* Clause 1.2 of the Terms: acceptance is a ticked box, not implied.
                The link opens in a new tab so the bag and the form stay put. */}
            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (errors.terms) setErrors((er) => ({ ...er, terms: undefined }));
                }}
                aria-invalid={Boolean(errors.terms)}
                aria-describedby={errors.terms ? "terms-error" : undefined}
                className="mt-0.5 w-4 h-4 shrink-0 accent-[#0B3E80] cursor-pointer"
              />
              {/* Outfit, like the site's other body copy (spans default to the display font). */}
              <span className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/75 text-sm leading-relaxed">
                I have read and accept the{" "}
                <a
                  href={TERMS_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2B87C8] underline underline-offset-2 hover:text-[#0B3E80]"
                >
                  Terms and Conditions of Sale
                </a>
                .
              </span>
            </label>
            {errors.terms && (
              <p id="terms-error" className="text-[#c0392b] text-xs -mt-2 mb-4" role="alert">
                {errors.terms}
              </p>
            )}
            {submitError && (
              <p className="text-[#c0392b] text-xs mb-3 leading-relaxed" role="alert">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || methods.length === 0}
              className={`w-full py-4 font-bold uppercase text-sm tracking-[0.14em] transition-colors ${
                submitting
                  ? "bg-[#0B3E80]/40 text-white cursor-wait"
                  : methods.length === 0
                    ? "bg-[#0B3E80]/20 text-[#0B3E80]/50 cursor-not-allowed"
                    : "bg-[#0B3E80] text-white hover:bg-[#2B87C8]"
              }`}
            >
              {submitting ? "Placing order…" : method === "card" ? "Continue to payment" : "Place order & pay"}
            </button>
            {/* Says what happens next for the chosen method, so the bank page or the
                BOB notification is expected rather than a surprise. */}
            <p className="text-[#0B3E80]/45 text-xs mt-3 leading-relaxed text-center">
              {method === "card"
                ? "You'll pay on Bank of Beirut's secure page, then come back here."
                : method === "bob-wallet"
                  ? "You'll approve the payment in your BOB Finance app."
                  : "Choose a payment method above."}{" "}
              {COLLECTION_ETA}.
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
