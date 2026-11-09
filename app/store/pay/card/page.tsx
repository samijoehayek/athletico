// app/store/pay/card/page.tsx
//
// A brief stop between checkout and the bank's payment page: the gateway's
// Checkout script has to run on one of our pages to send the customer there.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CardPaymentRedirect from "../../../components/store/CardPaymentRedirect";
import { referenceOfAttempt } from "@/lib/payments/card";
import { checkoutScriptUrl, mpgsConfigured } from "@/lib/payments/mpgs";
import { isValidOrderToken } from "@/lib/payments/token";

export const metadata: Metadata = {
  title: "Secure payment — Athletico Store",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CardPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; t?: string; a?: string; session?: string }>;
}) {
  const { ref = "", t = "", a = "", session = "" } = await searchParams;
  const scriptUrl = checkoutScriptUrl();

  if (
    !mpgsConfigured() ||
    !scriptUrl ||
    !isValidOrderToken(ref, t) ||
    referenceOfAttempt(a) !== ref ||
    !/^SESSION[A-Za-z0-9]+$/.test(session)
  ) {
    notFound();
  }

  const params = new URLSearchParams({ ref, t, a, cancelled: "1" });
  return (
    <main className="bg-[#F1EAEA] min-h-screen flex items-center justify-center px-6 py-16">
      <CardPaymentRedirect
        scriptUrl={scriptUrl}
        sessionId={session}
        cancelPath={`/api/payments/card/return?${params}`}
      />
    </main>
  );
}
