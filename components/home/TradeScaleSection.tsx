"use client";

import { motion } from "framer-motion";
import { Building2, Globe, MapPin, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

import { cardVariants, itemVariants, sectionVariants } from "./motion";

type AboutStat = {
  value?: string | null;
  label?: string | null;
};

type ContactInfo = {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  businessHours?: string | null;
};

type TradeScaleSectionProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  stats?: AboutStat[] | null;
  highlights?: string[] | null;
  office?: ContactInfo | null;
};

const defaultStats = [
  { value: "100%", label: "Traceable batches" },
  { value: "Vetted", label: "Sourcing partners" },
  { value: "Direct", label: "Farm-gate coordination" },
  { value: "Custom", label: "Export packaging options" },
];

const defaultHighlights = [
  "Transparent sourcing and contract clarity",
  "Quality checks at every stage of handling",
  "Reliable logistics across key trade corridors",
];


export default function TradeScaleSection({
  eyebrow = "WHO WE ARE",
  title = "Built on trust. Grounded in quality.",
  description = "Oranthus connects growers, processors, and international buyers through a direct trade model built on transparency, strict quality control, and export efficiency.",
  stats = defaultStats,
  highlights = defaultHighlights,
  office,
}: TradeScaleSectionProps) {
  const resolvedStats = stats ?? defaultStats;
  const resolvedHighlights = highlights ?? defaultHighlights;
  const hqAddress = office?.address || "123 Export Street, Ahmedabad,\nGujarat 380001, India";
  const hqPhone = office?.phone || "+91 93169 27113";
  const hqEmail = office?.email || "info@oranthus.com";

  return (
    <section className="relative overflow-hidden bg-[#8C661E] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.09),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_30%)]" />
      <div className="container-width section-padding py-20 sm:py-28 lg:py-32">
        <motion.div
          className="max-w-3xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-6 text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {description}
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-start">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.14)] backdrop-blur-sm sm:p-10"
          >
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/70">
              <Sparkles className="h-4 w-4" />
              Trade story
            </div>

            <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
                  A structure designed for long-term partnerships.
                </h3>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78">
                  From origin coordination to final-mile delivery, we keep the moving parts visible, documented, and accountable — so buyers can move faster with fewer surprises.
                </p>

                <div className="mt-8 space-y-4">
                  {resolvedHighlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/80">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-white/75" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {resolvedStats.map((stat, index) => {
                  const Icon = ShieldCheck;

                  return (
                    <motion.div
                      key={`${stat?.label ?? "metric"}-${index}`}
                      variants={cardVariants}
                      className="rounded-2xl border border-white/10 bg-[#F9F2E6]/8 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <Icon className="h-5 w-5 text-white/65" />
                        <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">Indicator</span>
                      </div>
                      <p className="mt-6 text-4xl font-semibold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                        {stat?.value}
                      </p>
                      <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/70">{stat?.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
              className="rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/70">
                  <MapPin className="h-4 w-4" />
                  Main Office & Exporter HQ
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-white/82">
                <h4 className="text-lg font-semibold text-white">Ahmedabad, India</h4>
                <p className="whitespace-pre-line leading-relaxed">{hqAddress}</p>
                <p className="flex items-center gap-2">
                  <span className="text-white/60">Phone:</span> {hqPhone}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-white/60">Email:</span> {hqEmail}
                </p>
                {office?.businessHours && (
                  <p className="flex items-center gap-2">
                    <span className="text-white/60">Hours:</span> {office.businessHours}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}