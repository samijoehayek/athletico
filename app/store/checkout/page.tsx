// app/store/checkout/page.tsx
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CheckoutForm from "../../components/store/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Athletico Store",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      <Navbar mode="dark" />
      <CheckoutForm />
      <Footer />
    </main>
  );
}
