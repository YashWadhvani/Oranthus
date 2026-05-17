import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { productPageQuery } from "@/sanity/lib/queries";

type ProductPageProps = {
  params: Promise<{
    slug: string;
    productSlug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productSlug } = await params;
  const product = await client.fetch(productPageQuery, { slug, productSlug });

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[#FFFFFF]">
      <section className="py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-[#ECE8DF] bg-[#FAF8F5] shadow-[0_20px_60px_rgba(15,15,15,0.08)]">
              <div className="relative h-[360px] sm:h-[480px]">
                <Image
                  src={product.thumbnailUrl || "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop"}
                  alt={product.thumbnailAlt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
              </div>
            </div>

            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
                {product.category?.title || "Product Detail"}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                {product.name}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#555555] font-light max-w-3xl">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {product.grade && <span className="rounded-full border border-[#D9A96B]/20 bg-[#D9A96B]/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-medium">{product.grade}</span>}
                {product.origin && <span className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#555555] font-medium">Origin: {product.origin}</span>}
                {product.leadTime && <span className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#555555] font-medium">Lead Time: {product.leadTime}</span>}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={`/products/${slug}`} className="rounded-lg border border-[#ECE8DF] px-5 py-3 text-sm font-medium text-[#111111] transition-colors hover:border-[#D9A96B] hover:text-[#D9A96B]">
                  ← Back to Category
                </Link>
                <Link href="/contact" className="rounded-lg bg-[#D9A96B] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c89a5a]">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width grid gap-8 lg:grid-cols-3">
          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">Sourcing</p>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">{product.sourcing || "Carefully sourced from trusted growers and processors with export-ready handling."}</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">MOQ / Packaging</p>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">MOQ: {product.moq || "On request"}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#555555] font-light">Packaging: {product.packaging || "Custom export packaging"}</p>
              {product.moqNote && <p className="mt-2 text-sm leading-relaxed text-[#555555] font-light">{product.moqNote}</p>}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">Storage</p>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">Shelf Life: {product.shelfLife || "Varies by product"}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#555555] font-light">{product.storageInstructions || "Store in a cool, dry place away from direct sunlight."}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width grid gap-10 lg:grid-cols-2">
          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">Specifications</p>
              <div className="mt-6 space-y-4">
                {product.specifications?.length ? product.specifications.map((spec: { label?: string; value?: string }) => (
                  <div key={`${spec.label}-${spec.value}`} className="flex items-start justify-between gap-4 border-b border-[#ECE8DF] pb-3">
                    <span className="text-sm font-medium text-[#111111]">{spec.label}</span>
                    <span className="text-sm text-[#555555] text-right">{spec.value}</span>
                  </div>
                )) : (
                  <p className="text-sm text-[#555555] font-light">Custom specifications available on request.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">Applications & Notes</p>
              <div className="mt-6 space-y-4 text-sm text-[#555555] font-light">
                <p>{product.moqNote || "Flexible commercial terms and product-specific MOQ available."}</p>
                <p>{product.certificationNotes?.length ? `Certifications: ${product.certificationNotes.join(", ")}` : "Export compliance and certifications can be supplied per market requirement."}</p>
                {product.applications?.length ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.applications.map((application) => (
                      <span key={application} className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#555555]">
                        {application}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
