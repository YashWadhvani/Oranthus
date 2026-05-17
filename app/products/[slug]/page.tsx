import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { categoryPageQuery } from "@/sanity/lib/queries";

type CategoryProduct = {
  _id: string;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  thumbnailAlt?: string | null;
  grade?: string | null;
  moq?: string | null;
  origin?: string | null;
  leadTime?: string | null;
};

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await client.fetch(categoryPageQuery, { slug });
  const category = data?.category;
  const products = (data?.products || []) as CategoryProduct[];

  if (!category) {
    notFound();
  }

  return (
    <main className="bg-[#FFFFFF]">
      <section className="py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
                Product Category
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                {category.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#555555] font-light max-w-2xl">
                {category.description || "Premium export-ready products in this category."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full border border-[#D9A96B]/20 bg-[#D9A96B]/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-medium">
                  {category.productCount || 0} Products
                </span>
                <Link href="/contact" className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#111111] transition-colors hover:border-[#D9A96B] hover:text-[#D9A96B]">
                  Get Quote
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#ECE8DF] bg-[#FAF8F5] shadow-[0_20px_60px_rgba(15,15,15,0.08)]">
              <div className="relative h-[360px] sm:h-[420px]">
                <Image
                  src={category.imageUrl || "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop"}
                  alt={category.imageAlt || category.title || "Category image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width">
          <div className="mb-12 max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">Available Products</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
              Explore products in {category.title}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products.length ? (
              products.map((product) => (
                <Card key={product._id} className="overflow-hidden rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
                  <div className="relative h-56">
                    <Image
                      src={product.thumbnailUrl || "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop"}
                      alt={product.thumbnailAlt || product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">{product.grade || "Export Grade"}</p>
                    <h3 className="mt-3 text-xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>{product.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#555555] line-clamp-3">{product.description}</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#555555]">
                      {product.moq && <span className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-3 py-1">MOQ {product.moq}</span>}
                      {product.origin && <span className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-3 py-1">{product.origin}</span>}
                      {product.leadTime && <span className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-3 py-1">Lead Time {product.leadTime}</span>}
                    </div>
                    <Link href={`/products/${slug}/${product.slug}`} className="mt-6 inline-flex text-sm font-medium text-[#D9A96B] hover:text-[#c89a5a]">
                      View Product →
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-[#555555]">No products found in this category yet.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
