"use client";

// app/components/store/PaymentPanel.tsx
//
// BOB Finance is the only payment method: the customer scans the club's QR code
// in the BOB app and pays before the order is placed, so personalised kit is
// paid for before it's printed.

import Image from "next/image";
import { BOB_ACCOUNT, BOB_NAME, BOB_QR, PAYMENT_DETAILS_CONFIGURED } from "@/lib/store/config";
import { formatUSD, PAYMENT_METHODS } from "@/lib/store/pricing";

export default function PaymentPanel({
  reference,
  onReferenceChange,
  total,
  error,
}: {
  reference: string;
  onReferenceChange: (r: string) => void;
  total: number;
  error?: string;
}) {
  const active = PAYMENT_METHODS[0];

  return (
    <div>
      <h2 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider mb-4">Payment</h2>

      <div className="border border-[#0B3E80] bg-white px-4 py-3.5">
        <span className="block text-[#0B3E80] font-bold uppercase text-sm">{active.label}</span>
        <span className="block text-[#0B3E80]/60 text-xs mt-0.5 leading-relaxed">{active.blurb}</span>
      </div>

      {active.requiresReference && (
        <div className="mt-5 border border-[#0B3E80]/20 bg-white p-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="relative w-32 h-32 shrink-0 mx-auto sm:mx-0 bg-white border border-[#0B3E80]/15">
              <Image
                src={BOB_QR}
                alt={`${active.label} payment QR code`}
                fill
                sizes="128px"
                className="object-contain p-1"
              />
            </div>

            <div className="flex-1 text-sm">
              <p className="text-[#0B3E80]/60 text-xs uppercase tracking-wider mb-2">
                Send exactly
              </p>
              <p className="text-[#0B3E80] font-bold text-2xl mb-3">{formatUSD(total)}</p>
              <p className="text-[#0B3E80]/70 text-xs leading-relaxed">
                To <strong className="text-[#0B3E80]">{BOB_NAME}</strong>, account{" "}
                <strong className="text-[#0B3E80]">{BOB_ACCOUNT}</strong>. Scan the code with the
                BOB Finance app.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="payment-reference"
              className="block text-[#0B3E80]/60 text-xs uppercase tracking-wider mb-1.5"
            >
              {active.referenceLabel} <span className="text-[#c0392b]">*</span>
            </label>
            <input
              id="payment-reference"
              type="text"
              value={reference}
              onChange={(e) => onReferenceChange(e.target.value)}
              placeholder="e.g. 84726193"
              autoComplete="off"
              aria-invalid={Boolean(error)}
              className={`w-full border px-3 py-2.5 text-[#0B3E80] outline-none bg-white transition-colors ${
                error ? "border-[#c0392b]" : "border-[#0B3E80]/30 focus:border-[#0B3E80]"
              }`}
            />
            {error && (
              <p className="text-[#c0392b] text-xs mt-1.5" role="alert">
                {error}
              </p>
            )}
            <p className="text-[#0B3E80]/45 text-xs mt-2 leading-relaxed">
              We check every payment by hand before your order is prepared, so please send the exact
              amount and enter the reference your app gives you.
            </p>
          </div>

          {!PAYMENT_DETAILS_CONFIGURED && (
            <p className="mt-4 border-l-2 border-[#FFE400] bg-[#FFE400]/10 px-3 py-2 text-[#0B3E80] text-xs leading-relaxed">
              <strong>Setup pending:</strong> this QR code and account number are placeholders. The
              club&apos;s real BOB details need to be added before launch.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
