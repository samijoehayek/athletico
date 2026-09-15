// app/components/store/RelatedProducts.tsx
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/store/types";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="w-full bg-[#F1EAEA] px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-[#0B3E80] font-extrabold uppercase text-2xl md:text-3xl mb-8 pt-10 border-t border-[#0B3E80]/15">
          You might also like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
