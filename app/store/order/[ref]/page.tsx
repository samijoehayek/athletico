// app/store/order/[ref]/page.tsx
//
// /store/order/ATH-…?t=<token>. The token comes from checkout (and, later, the
// order emails); without it the page shows nothing about the order.

import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import OrderConfirmation from "../../../components/store/OrderConfirmation";

export const metadata: Metadata = {
  title: "Your order — Athletico Store",
  robots: { index: false, follow: false },
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ ref: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { ref } = await params;
  const { t } = await searchParams;

  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      <Navbar mode="dark" />
      <OrderConfirmation reference={decodeURIComponent(ref)} token={typeof t === "string" ? t : ""} />
      <Footer />
    </main>
  );
}
