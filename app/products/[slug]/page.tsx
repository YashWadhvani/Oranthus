import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { categoryPageQuery } from "@/sanity/lib/queries";
import CategoryProductsList from "@/components/products/CategoryProductsList";

export const revalidate = 60;

type CategoryProduct = {
  _id: string;
  name: string;
  slug: string;
  description?: string | null;
  sourcing?: string | null;
  thumbnailUrl?: string | null;
  thumbnailAlt?: string | null;
  grade?: string | null;
  specifications?: {
    label?: string | null;
    value?: string | null;
  }[] | null;
  packaging?: string | null;
  moq?: string | null;
  moqNote?: string | null;
  origin?: string | null;
  leadTime?: string | null;
  shelfLife?: string | null;
  storageInstructions?: string | null;
  applications?: string[] | null;
  certificationNotes?: string[] | null;
};

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await client.fetch(categoryPageQuery, { slug });
  const category = data?.category;

  if (!category) return {};

  const title = category.title;
  const description =
    category.description ||
    `Browse export-grade ${title} from India. Oranthus supplies certified, pre-graded ${title} in bulk packaging for international importers. Available in multiple grades with flexible MOQ and container-ready shipments.`;

  return {
    title,
    description,
    keywords: [
      `${title} exporter India`,
      `${title} bulk export`,
      `export grade ${title}`,
      `buy ${title} from India`,
      `${title} supplier India`,
      "dehydrated vegetables export",
      "Indian agri commodity export",
    ],
    alternates: { canonical: `https://www.oranthus.com/products/${slug}` },
    openGraph: {
      title: `Oranthus - ${title}`,
      description,
      url: `https://www.oranthus.com/products/${slug}`,
    },
  };
}

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
      {/* Redesigned Category Hero Section (Modern & Layered) */}
      <section className="relative py-20 sm:py-28 md:py-32 section-padding overflow-hidden border-b border-[#ECE8DF]/40 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.04),transparent_50%)] pointer-events-none" />
        
        <div className="container-width relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
                  Product Category
                </p>
                <h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-[#111111]" 
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {category.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-[#555555] font-light max-w-2xl">
                  {category.description || "Explore our certified range of processed ingredients and agricultural produce, sourced directly and pre-graded for export shipping compliance."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span className="rounded-full border border-[#D9A96B]/25 bg-[#D9A96B]/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#D9A96B] font-semibold">
                  {category.productCount || products.length} Varieties Available
                </span>
                <Link 
                  href="/contact" 
                  className="rounded-full border border-[#ECE8DF] bg-white px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold shadow-sm hover:border-[#D9A96B] hover:text-[#D9A96B] hover:bg-[#FAF8F5] transition-all duration-300"
                >
                  Request Bulk Quote
                </Link>
              </div>
            </div>

            {/* Right Graphic/Image (Asymmetrical Offset Layout) */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-[2rem] border border-[#ECE8DF] bg-white p-3.5 shadow-[0_20px_50px_rgba(15,15,15,0.06)] group overflow-hidden">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <Image
                    src={category.imageUrl || "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop"}
                    alt={category.imageAlt || category.title || "Category image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                  />
                  {/* Glowing gold border overlay */}
                  <div className="absolute inset-0 border border-[#D9A96B]/10 rounded-[1.5rem] pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Render the interactive Client Product Grid with detail Modal Popup */}
      <CategoryProductsList 
        products={products} 
        categorySlug={slug}
        categoryTitle={category.title}
      />
    </main>
  );
}
