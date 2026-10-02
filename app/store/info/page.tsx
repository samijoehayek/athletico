// app/store/info/page.tsx
// The page that stops the club answering the same four questions every day.

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BRANCHES } from "@/lib/branches";
import { COLLECTION_ETA } from "@/lib/store/pricing";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collection, Payment & Sizing — Athletico Store",
  description:
    "Branch collection, BOB Finance payment and the size guide for the Athletico Sports Club store.",
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
            Collection,
            <br />
            Payment &amp; Sizing
          </h1>

          <Block title="Collection">
            <p className="mb-5">
              Every order is collected from a club branch — choose yours at checkout. Collection is
              free. {COLLECTION_ETA}, and we&apos;ll call you when your order is ready.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-4 marker:text-[#2B87C8]">
              {BRANCHES.map((b) => (
                <li key={b.id} className="text-[#0B3E80]">
                  {b.name}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Payment">
            <p className="mb-3">
              <strong className="text-[#0B3E80]">BOB Finance</strong> — scan the QR code at
              checkout with the BOB Finance app, pay the exact total, then enter the transaction
              reference.
            </p>
            <p className="text-[#0B3E80]/55 text-sm">
              Payments are checked by hand before an order is prepared, so please send the exact
              amount shown at checkout and keep your reference.
            </p>
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
              href={whatsappLink("Hello Athletico — I have a question about the store.")}
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
