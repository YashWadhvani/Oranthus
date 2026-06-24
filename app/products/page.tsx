import Categories from "@/components/home/Categories";
import { client } from "@/sanity/lib/client";
import { productsPageQuery } from "@/sanity/lib/queries";
import ScrollReveal from "@/components/layout/ScrollReveal";

export const revalidate = 60;

export default async function ProductsPage() {
  const data = await client.fetch(productsPageQuery);
  const content = data?.homepage;
  const categories = data?.categories;

  return (
    <main className="bg-[#FFFFFF] overflow-hidden">
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 section-padding bg-gradient-to-b from-[#FAF8F5] to-white border-b border-[#ECE8DF]/40">
        <div className="container-width">
          <div className="max-w-3xl mb-16 sm:mb-20">
            <ScrollReveal delay={0.05}>
              <p className="mb-6 sm:mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
                {content?.categoriesEyebrow || "Our Products"}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-[#111111] mb-6 sm:mb-8" 
                style={{ fontFamily: "var(--font-playfair)" }}>
                {content?.categoriesTitle && content.categoriesTitle !== "Explore Our Products" ? content.categoriesTitle : "Explore Our Categories"}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="text-lg sm:text-xl leading-relaxed text-[#555555] max-w-2xl font-light">
                {content?.categoriesDescription || "Explore our extensive range of carefully sourced and expertly packaged dried products, ready for global export."}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Categories
        eyebrow=""
        title=""
        description=""
        categories={categories}
      />
    </main>
  );
}
