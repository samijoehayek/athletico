// app/store/order/[ref]/page.tsx
import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import OrderConfirmation from "../../../components/store/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order confirmed — Athletico Store",
  robots: { index: false, follow: false },
};

export default async function OrderPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;

  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      <Navbar mode="dark" />
      <OrderConfirmation reference={decodeURIComponent(ref)} />
      <Footer />
    </main>
  );
}
