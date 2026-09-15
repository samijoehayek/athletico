// app/store/[slug]/page.tsx
// Pre-built at deploy time, one static page per product.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/store/ProductDetail";
import RelatedProducts from "../../components/store/RelatedProducts";
import { PRODUCTS, getProduct, getRelated } from "@/lib/store/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found — Athletico Store" };

  return {
    title: `${product.name} — Athletico Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(slug);

  // Product structured data, so items can surface in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: "Athletico Sports Club" },
    offers: {
      "@type": "Offer",
      price: product.priceUSD.toFixed(2),
      priceCurrency: "USD",
      availability: product.variants.some((v) => v.stock !== "out")
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar mode="dark" />
      <ProductDetail product={product} />
      <RelatedProducts products={related} />
      <Footer />
    </main>
  );
}
