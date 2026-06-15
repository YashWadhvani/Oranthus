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
  eyebrow = "INTERNATIONAL TRADE · SINCE 1999",
  title = "Moving Markets.\nConnecting Continents.",
  subtitle = "Oranthus is a premier international trading house, handling commodities, manufactured goods, and specialty products across 40+ countries with precision, scale, and trust.",
  ctaText = "Partner With Us",
  secondaryCtaText = "Explore Capabilities",
  secondaryCtaHref = "#contact",
  heroImage = "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1200&auto=format&fit=crop",
  heroImageAlt = "Container ship and port cranes at sunset",
  stats = [
    { value: "40+", label: "Countries Served" },
    { value: "500M+", label: "Annual Trade Volume" },
  ],
}: HeroProps) {
  const { scrollTo } = useLenis()
  const tickerItems = [
    "ISO 22000 Certified",
    "Herbs & Botanicals",
    "Dehydrated Tomato Flakes",
    "EU & US Import Ready",
    "Dried Apricot & Fig",
    "Moringa Leaf",
  ]

  return (
    <section id="home" style={{ scrollMarginTop: "6rem" }} className="relative overflow-hidden min-h-[92vh] bg-[#111111] text-white">
      <div className="absolute inset-0">
        <Image
          src={heroImage || "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1200&auto=format&fit=crop"}
          alt={heroImageAlt || title || "Hero image"}
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.82)_0%,rgba(15,15,15,0.62)_42%,rgba(15,15,15,0.34)_70%,rgba(15,15,15,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.28),transparent_26%),radial-gradient(circle_at_left_center,rgba(255,255,255,0.08),transparent_26%)]" />
      </div>

      <div className="relative z-10 flex min-h-[92vh] flex-col">
        <div className="container-width flex-1 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex min-h-[92vh] items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="max-w-4xl py-20 sm:py-24 lg:py-28"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#F0D7AA]">
                {eyebrow}
              </p>

              <h1
                className="mt-6 max-w-4xl text-6xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {title}
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/82 sm:text-xl">
                {subtitle}
              </p>

              <div className="mt-12 flex flex-wrap gap-4 sm:gap-5">
                <Button asChild className="h-14 rounded-md bg-[#F4E6C6] px-8 text-sm font-medium text-[#1A1A1A] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-[#fff0d6] hover:translate-y-[-1px]">
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#products", { offset: -96 });
                    }}
                  >
                    {ctaText}
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-md border border-white/45 bg-white/6 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/12"
                >
                  <a
                    href={secondaryCtaHref ?? undefined}
                    onClick={(e) => {
                      if (secondaryCtaHref && secondaryCtaHref.startsWith("#")) {
                        e.preventDefault();
                        scrollTo(secondaryCtaHref, { offset: -96 });
                      }
                    }}
                  >
                    {secondaryCtaText}
                  </a>
                </Button>
              </div>

              <div className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {stats?.map((stat, index) => (
                  <motion.div
                    key={`${stat?.label ?? "stat"}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.55 }}
                    className="rounded-2xl border border-white/12 bg-white/8 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md"
                  >
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/65">
                      Statistics
                    </p>
                    <h3 className="mt-4 text-4xl font-semibold text-white">
                      {stat?.value}
                    </h3>
                    <p className="mt-3 text-sm text-white/76">
                      {stat?.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/18 backdrop-blur-sm">
          <div className="container-width px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex items-center gap-4 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tickerItems.map((item) => (
                <span
                  key={item}
                  className="whitespace-nowrap rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/78"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
