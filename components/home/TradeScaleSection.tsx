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
};

type TradeScaleSectionProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  stats?: AboutStat[] | null;
  highlights?: string[] | null;
  office?: ContactInfo | null;
};

const officeCards = [
  {
    city: "Rotterdam",
    icon: MapPin,
    address: "Waalhaven Oostzijde 12\n3087 BM Rotterdam, Netherlands",
    phone: "+31 10 456 7890",
    email: "europe@oranthus.com",
  },
  {
    city: "Dubai",
    icon: Building2,
    address: "DMCC Business Centre\nJumeirah Lakes Towers, Dubai UAE",
    phone: "+971 4 123 4567",
    email: "mena@oranthus.com",
  },
];

const metricIcons = [TrendingUp, Globe, ShieldCheck, Sparkles];

const defaultStats = [
  { value: "$500M+", label: "Annual trade volume" },
  { value: "420+", label: "Team members" },
  { value: "6", label: "Global offices" },
  { value: "25", label: "Years in business" },
];

const defaultHighlights = [
  "Transparent sourcing and contract clarity",
  "Quality checks at every stage of handling",
  "Reliable logistics across key trade corridors",
];

export default function TradeScaleSection({
  eyebrow = "WHO WE ARE",
  title = "Built on trust. Proven at scale.",
  description = "For more than two decades, Oranthus has connected growers, manufacturers, and buyers through a disciplined trade model built on transparency, quality, and execution.",
  stats = defaultStats,
  highlights = defaultHighlights,
  office,
}: TradeScaleSectionProps) {
  const resolvedStats = stats ?? defaultStats;
  const resolvedHighlights = highlights ?? defaultHighlights;
  const hqAddress = office?.address || "100 Maritime Blvd, Suite 4500\nSingapore 018983";
  const hqPhone = office?.phone || "+65 6789 0123";
  const hqEmail = office?.email || "partners@oranthus.com";

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
                  const Icon = metricIcons[index % metricIcons.length];

                  return (
                    <motion.div
                      key={`${stat?.label ?? "metric"}-${index}`}
                      variants={cardVariants}
                      className="rounded-2xl border border-white/10 bg-[#F9F2E6]/8 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <Icon className="h-5 w-5 text-white/65" />
                        <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">Metric</span>
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
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/70">
                <Globe className="h-4 w-4" />
                Global headquarters
              </div>
              <div className="mt-6 space-y-4 text-sm text-white/82">
                <p className="whitespace-pre-line">{hqAddress}</p>
                <p>{hqPhone}</p>
                <p>{hqEmail}</p>
              </div>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {[{ city: "Singapore (HQ)", icon: Building2, address: hqAddress, phone: hqPhone, email: hqEmail }, ...officeCards].map((officeCard, index) => {
                const Icon = officeCard.icon;
                return (
                  <motion.div
                    key={officeCard.city}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-[1.75rem] border border-white/10 bg-[#F9F2E6]/10 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10">
                        <Icon className="h-5 w-5 text-white/80" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{officeCard.city}</h3>
                    </div>

                    <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/78">
                      <p className="whitespace-pre-line">{officeCard.address}</p>
                      <p>{officeCard.phone}</p>
                      <p>{officeCard.email}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}