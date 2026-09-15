// app/store/info/page.tsx
// The page that stops the club answering the same four questions every day.

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { DELIVERY_ZONES, formatUSD } from "@/lib/store/pricing";
import { whatsappOrderLink } from "@/lib/store/config";

export const metadata: Metadata = {
  title: "Shipping, Returns & Sizing — Athletico Store",
  description:
    "Delivery zones and fees, returns and exchanges, and the size guide for the Athletico Sports Club store.",
};

export default function StoreInfoPage() {
  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      <Navbar mode="dark" />

      <section className="px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-[#0B3E80]/50">
            <Link href="/store" className="hover:text-[#0B3E80] transition-colors">
              Store
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#0B3E80]/80">Information</span>
          </nav>

          <h1 className="text-[#0B3E80] font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-10">
            Shipping,
            <br />
            Returns &amp; Sizing
          </h1>

          <Block title="Delivery">
            <p className="mb-5">
              We deliver across Lebanon. Your zone is chosen at checkout and sets the delivery fee.
            </p>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="bg-[#0B3E80] text-white">
                  <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider">Zone</th>
                  <th className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider">Time</th>
                  <th className="text-right px-3 py-2.5 text-xs font-bold uppercase tracking-wider">Fee</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY_ZONES.map((z, i) => (
                  <tr key={z.id} className={i % 2 ? "bg-white/60" : ""}>
                    <td className="px-3 py-2.5 font-medium text-[#0B3E80]">{z.label}</td>
                    <td className="px-3 py-2.5 text-[#0B3E80]/70">{z.eta}</td>
                    <td className="px-3 py-2.5 text-right text-[#0B3E80] font-medium">
                      {z.feeUSD === 0 ? "Free" : formatUSD(z.feeUSD)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[#0B3E80]/55 text-sm">
              Collection is free from any participating club branch and is usually ready the next
              day. We&apos;ll call you when your order is ready.
            </p>
          </Block>

          <Block title="Payment">
            <p className="mb-3">Three ways to pay:</p>
            <ul className="space-y-2 list-disc pl-4 marker:text-[#2B87C8] mb-4">
              <li>
                <strong className="text-[#0B3E80]">Cash on delivery</strong> — pay the courier when
                your order arrives.
              </li>
              <li>
                <strong className="text-[#0B3E80]">Whish</strong> — send the total from your Whish
                app and enter the transaction reference at checkout.
              </li>
              <li>
                <strong className="text-[#0B3E80]">BOB Finance</strong> — pay at any BoB Finance
                branch or from the BoB wallet, then enter the reference.
              </li>
            </ul>
            <p className="text-[#0B3E80]/55 text-sm">
              Transfers are checked by hand before an order is packed, so please send the exact
              amount shown at checkout and keep your reference.
            </p>
          </Block>

          <Block title="Returns & exchanges">
            <ul className="space-y-2 list-disc pl-4 marker:text-[#2B87C8]">
              <li>Exchanges on unworn items with tags attached within 14 days of delivery.</li>
              <li>
                <strong className="text-[#0B3E80]">Personalised items cannot be returned or
                exchanged</strong>, as they are printed to order.
              </li>
              <li>Faulty items are replaced or refunded in full — contact us with your reference.</li>
              <li>Return delivery is arranged by the club; we&apos;ll talk you through it.</li>
            </ul>
          </Block>

          <Block title="Sizing">
            <p className="mb-3">
              Apparel runs XS to XXL. Our match shirts are cut close — if you are between sizes, size
              up. A full measurement table is on every product page under{" "}
              <em>Size guide</em>.
            </p>
            <p className="text-[#0B3E80]/55 text-sm">
              Not sure? Message us before you order and we&apos;ll help you pick.
            </p>
          </Block>

          <Block title="Questions">
            <p className="mb-5">
              The fastest way to reach us is WhatsApp. Have your order reference to hand.
            </p>
            <a
              href={whatsappOrderLink("Hello Athletico — I have a question about the store.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0B3E80] hover:bg-[#2B87C8] text-white font-bold uppercase text-sm tracking-wider px-8 py-4 transition-colors"
            >
              Message the club
            </a>
          </Block>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#0B3E80]/15 pt-8 mb-10">
      <h2 className="text-[#0B3E80] font-extrabold uppercase text-xl md:text-2xl mb-4">{title}</h2>
      <div className="text-[#0B3E80]/75 text-sm md:text-base leading-relaxed">{children}</div>
    </section>
  );
}
