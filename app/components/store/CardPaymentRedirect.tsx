"use client";

// app/components/store/CardPaymentRedirect.tsx
//
// Loads the gateway's Checkout script and hands the customer over to the bank's
// payment page. If the script can't load (blocked, offline), the way out marks
// this attempt as not paid, so the order page offers "try again".

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Checkout?: {
      configure: (config: { session: { id: string } }) => void;
      showPaymentPage: () => void;
    };
  }
}

export default function CardPaymentRedirect({
  scriptUrl,
  sessionId,
  cancelPath,
}: {
  scriptUrl: string;
  sessionId: string;
  cancelPath: string;
}) {
  const [failed, setFailed] = useState(false);

  function openPaymentPage() {
    try {
      if (!window.Checkout) throw new Error("Checkout script missing");
      window.Checkout.configure({ session: { id: sessionId } });
      window.Checkout.showPaymentPage();
    } catch (err) {
      console.error("[card] couldn't open the payment page", err);
      setFailed(true);
    }
  }

  return (
    <div className="w-full max-w-md text-center">
      <Script src={scriptUrl} strategy="afterInteractive" onLoad={openPaymentPage} onError={() => setFailed(true)} />

      {failed ? (
        <>
          <h1 className="text-[#0B3E80] font-extrabold uppercase text-3xl leading-none mb-3">
            We couldn&apos;t open the payment page
          </h1>
          <p className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/70 mb-8 leading-relaxed">
            Your order is saved and nothing has been charged.
          </p>
          {/* A full navigation, not next/link: this is an API route that redirects. */}
          <a
            href={cancelPath}
            className="inline-block bg-[#0B3E80] text-white hover:bg-[#2B87C8] font-bold uppercase text-sm tracking-wider px-8 py-4 transition-colors"
          >
            Back to my order
          </a>
        </>
      ) : (
        <>
          <h1 className="text-[#0B3E80] font-extrabold uppercase text-3xl leading-none mb-3">
            Opening secure payment
          </h1>
          <p className="font-[family-name:var(--font-outfit)] text-[#0B3E80]/70 leading-relaxed" role="status">
            Taking you to Bank of Beirut&apos;s payment page…
          </p>
        </>
      )}
    </div>
  );
}
