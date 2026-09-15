// app/store/page.tsx
import type { Metadata } from "next";
import Footer from "../components/Footer";
import StoreHero from "../components/store/StoreHero";
import StoreCatalogue from "../components/store/StoreCatalogue";
import { getFeatured } from "@/lib/store/catalog";

export const metadata: Metadata = {
  title: "Store — Athletico Sports Club",
  description:
    "The official Athletico Sports Club range. Match kit, training wear and equipment, delivered across Lebanon or collected from your branch.",
  openGraph: {
    title: "Athletico Store",
    description: "The official Athletico Sports Club range.",
    type: "website",
  },
};

export default function StorePage() {
  const featured = getFeatured()[0] ?? null;

  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      <StoreHero />
      <StoreCatalogue featured={featured} />
      <Footer />
    </main>
  );
}
