// app/store/pay/simulate/page.tsx
//
// Stand-in for the bank's payment page and the BOB app while their credentials
// are pending. Exists only when PAYMENTS_SIMULATOR=1 on a non-production
// deployment; production answers 404.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaymentSimulator from "../../../components/store/PaymentSimulator";
import { simulatorEnabled } from "@/lib/payments/providers";

export const metadata: Metadata = {
  title: "Payment simulator — Athletico Store",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SimulatePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; t?: string }>;
}) {
  if (!simulatorEnabled()) notFound();
  const { ref, t } = await searchParams;
  return (
    <main className="bg-[#0B3E80] min-h-screen flex items-center justify-center px-6 py-16">
      <PaymentSimulator reference={String(ref ?? "")} token={String(t ?? "")} />
    </main>
  );
}
