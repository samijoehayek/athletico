// app/store/checkout/page.tsx
//
// Rendered on the server per request, so the payment methods offered always
// match the credentials configured on this deployment (no rebuild needed when
// a provider is switched on or off).

import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CheckoutForm from "../../components/store/CheckoutForm";
import { availableMethods, isSimulated } from "@/lib/payments/providers";

export const metadata: Metadata = {
  title: "Checkout — Athletico Store",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const methods = availableMethods();
  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      <Navbar mode="dark" />
      <CheckoutForm methods={methods} simulated={methods.some(isSimulated)} />
      <Footer />
    </main>
  );
}
