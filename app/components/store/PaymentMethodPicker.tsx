"use client";

// app/components/store/PaymentMethodPicker.tsx
//
// The payment step of the checkout: one card per method the server offers
// (lib/payments/providers.ts decides, from the credentials configured). BOB
// Wallet asks for the BOB mobile number the payment request is pushed to;
// card needs nothing here, because card details are typed on the bank's page,
// never on this site.

import { PAYMENT_METHODS, type PaymentMethodId } from "@/lib/payments/methods";

export default function PaymentMethodPicker({
  methods,
  value,
  onChange,
  mobile,
  onMobileChange,
  errors,
  simulated,
}: {
  methods: PaymentMethodId[];
  value: PaymentMethodId | undefined;
  onChange: (m: PaymentMethodId) => void;
  mobile: string;
  onMobileChange: (v: string) => void;
  errors: { method?: string; mobile?: string };
  simulated: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider mb-4">Payment</legend>

      {simulated && (
        <p className="mb-4 border-l-4 border-[#FFE400] bg-[#FFE400]/15 px-4 py-3 text-[#0B3E80] text-xs leading-relaxed">
          <strong>Test mode:</strong> payments go to a simulator, not to BOB or the bank. No money is taken.
        </p>
      )}

      {methods.length === 0 ? (
        // Only reachable while no provider is configured; the order can't be placed.
        <p className="border border-[#0B3E80]/20 bg-white px-4 py-4 text-[#0B3E80]/75 text-sm leading-relaxed">
          Online payment is being set up and will open very soon. Thank you for your patience.
        </p>
      ) : (
        <div role="radiogroup" aria-label="Payment method" aria-invalid={Boolean(errors.method)} className="space-y-3">
          {methods.map((id) => {
            const info = PAYMENT_METHODS[id];
            const active = value === id;
            return (
              <div
                key={id}
                className={`border bg-white transition-colors ${
                  active ? "border-[#0B3E80] ring-1 ring-[#0B3E80]" : "border-[#0B3E80]/25 hover:border-[#0B3E80]/60"
                }`}
              >
                <label className="flex items-start gap-3 px-4 py-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment-method"
                    value={id}
                    checked={active}
                    onChange={() => onChange(id)}
                    className="mt-1 w-4 h-4 shrink-0 accent-[#0B3E80] cursor-pointer"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[#0B3E80] font-bold uppercase text-sm tracking-wide">{info.label}</span>
                      {id === "card" && <SchemeBadges />}
                    </span>
                    <span className="block font-[family-name:var(--font-outfit)] text-[#0B3E80]/65 text-sm mt-1 leading-relaxed">
                      {info.blurb}
                    </span>
                  </span>
                </label>

                {/* The BOB number lives inside its card so it's obvious what it's for. */}
                {id === "bob-wallet" && active && (
                  <div className="px-4 pb-4 pl-11">
                    <label className="block">
                      <span className="block text-[#0B3E80]/60 text-xs uppercase tracking-wider mb-1.5">
                        BOB Finance mobile number <span className="text-[#c0392b]">*</span>
                      </span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="70 202 030"
                        value={mobile}
                        onChange={(e) => onMobileChange(e.target.value)}
                        aria-invalid={Boolean(errors.mobile)}
                        className={`w-full border px-3 py-2.5 text-[#0B3E80] bg-white outline-none transition-colors ${
                          errors.mobile ? "border-[#c0392b]" : "border-[#0B3E80]/30 focus:border-[#0B3E80]"
                        }`}
                      />
                      {errors.mobile ? (
                        <span className="block text-[#c0392b] text-xs mt-1.5" role="alert">
                          {errors.mobile}
                        </span>
                      ) : (
                        <span className="block font-[family-name:var(--font-outfit)] text-[#0B3E80]/50 text-xs mt-1.5">
                          The number your BOB Finance app is registered with. You&apos;ll get a
                          notification to approve the payment.
                        </span>
                      )}
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {errors.method && (
        <p className="text-[#c0392b] text-xs mt-2" role="alert">
          {errors.method}
        </p>
      )}
    </fieldset>
  );
}

/** Plain-text scheme marks: no third-party logos to license or keep up to date. */
function SchemeBadges() {
  return (
    <span className="flex gap-1.5" aria-label="Visa and Mastercard accepted">
      {["VISA", "Mastercard"].map((s) => (
        <span
          key={s}
          className="border border-[#0B3E80]/25 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#0B3E80]/70"
        >
          {s}
        </span>
      ))}
    </span>
  );
}
