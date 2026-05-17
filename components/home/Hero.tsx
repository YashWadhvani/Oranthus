"use client";

import { motion } from "framer-motion";
import { useLenis } from "@/components/ScrollProvider";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type HeroStat = {
  value?: string | null;
  label?: string | null;
};

type HeroProps = {
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  secondaryCtaText?: string | null;
  secondaryCtaHref?: string | null;
  heroImage?: string | null;
  heroImageAlt?: string | null;
  stats?: HeroStat[] | null;
};

export default function Hero({
  eyebrow = "Global Import & Export",
  title = "Premium Global Exporters of Dried Products",
  subtitle = "Delivering high-quality dried products worldwide with trusted sourcing, premium packaging, and export excellence.",
  ctaText = "Explore Products",
  secondaryCtaText = "Contact Us",
  secondaryCtaHref = "#contact",
  heroImage = "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1200&auto=format&fit=crop",
  heroImageAlt = "Premium dried products arranged for export",
  stats = [
    { value: "10+", label: "Countries Served" },
    { value: "50+", label: "Product Variants" },
  ],
}: HeroProps) {
  const { scrollTo } = useLenis()
  return (
    <section id="home" style={{ scrollMarginTop: "6rem" }} className="relative overflow-hidden bg-[#FFFFFF] py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.06),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(17,17,17,0.01),transparent_40%)]" />

      <div className="container-width grid items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 lg:grid-cols-2 lg:gap-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
            {eyebrow}
          </p>

          <h1 className="text-6xl lg:text-7xl font-semibold leading-[1.15] tracking-tight text-[#111111] mb-10 max-w-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
            {title}
          </h1>

          <p className="text-lg leading-relaxed text-[#555555] mt-8 max-w-xl font-light">
            {subtitle}
          </p>

          <div className="mt-14 flex flex-wrap gap-6 items-center">
            <Button asChild className="bg-[#D9A96B] px-10 py-8 text-white text-base font-medium rounded-lg hover:bg-[#c89a5a] transition-all duration-300 shadow-md hover:shadow-lg">
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo("#products", { offset: -80 })
                }}
              >
                {ctaText}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-2 border-[#D9A96B] text-[#D9A96B] px-10 py-8 text-base font-medium rounded-lg hover:bg-[#D9A96B] hover:text-white transition-all duration-300"
            >
              <a
                href={secondaryCtaHref ?? undefined}
                onClick={(e) => {
                  if (secondaryCtaHref && secondaryCtaHref.startsWith("#")) {
                    e.preventDefault()
                    scrollTo(secondaryCtaHref, { offset: -80 })
                  }
                  // otherwise allow normal navigation for external/internal links
                }}
              >
                {secondaryCtaText}
              </a>
            </Button>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2">
            {stats?.map((stat, index) => (
              <motion.div
                key={`${stat?.label ?? "stat"}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_32px_rgba(15,15,15,0.08)] transition-shadow duration-300"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#555555] font-medium">
                  Statistics
                </p>
                <h3 className="text-4xl font-semibold text-[#D9A96B] mt-4">
                  {stat?.value}
                </h3>
                <p className="mt-3 text-base text-[#555555] font-light">
                  {stat?.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="relative">
          <div className="absolute -left-12 top-8 h-48 w-48 rounded-full bg-[#D9A96B]/6 blur-3xl" />
          <div className="absolute -right-8 bottom-4 h-56 w-56 rounded-full bg-black/2 blur-3xl" />

          <div className="overflow-hidden rounded-3xl border border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_20px_60px_rgba(15,15,15,0.08)] group">
            <div className="relative overflow-hidden h-[500px] lg:h-[620px]">
              <Image
                src={heroImage || "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1200&auto=format&fit=crop"}
                alt={heroImageAlt || title || "Hero image"}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="eager"
                priority
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-12 -left-4 rounded-2xl border border-[#ECE8DF] bg-[#FFFFFF] p-8 shadow-[0_20px_50px_rgba(15,15,15,0.1)] backdrop-blur-md sm:-left-12 max-w-xs"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#D9A96B] font-semibold">
              Quality Assured
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
              Export Ready
            </h3>
            <p className="mt-3 text-sm text-[#555555] font-light leading-relaxed">
              Carefully sourced, packaged, and prepared for international delivery standards.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
