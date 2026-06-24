"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Coins, 
  Award, 
  RotateCcw, 
  Clock, 
  Eye, 
  Target, 
  CheckCircle2,
  Handshake,
  Leaf,
  Globe,
  PackageCheck,
  Truck
} from "lucide-react";
import { cardVariants, itemVariants, sectionVariants } from "./motion";

type AboutStat = {
  value?: string | number | null;
  label?: string | null;
};

type AboutValue = {
  _key?: string;
  title?: string;
  description?: string;
  icon?: string;
};

type AboutProps = {
  eyebrow?: string | null;
  title?: string;
  description?: string;
  stats?: AboutStat[] | null;
  values?: AboutValue[] | null;
  sourcingPoints?: string[] | null;
};

const iconMap: Record<string, React.ComponentType<any>> = {
  shieldCheck: ShieldCheck,
  coins: Coins,
  award: Award,
  rotateCcw: RotateCcw,
  clock: Clock,
  handshake: Handshake,
  leaf: Leaf,
  globe: Globe,
  packageCheck: PackageCheck,
  truck: Truck
};

function getIcon(name: string | undefined | null) {
  if (!name) return ShieldCheck;
  const lowerName = name.trim().toLowerCase();
  return iconMap[lowerName] || ShieldCheck;
}

export default function About({
  eyebrow = "Who We Are",
  title = "Born in India. Built for the World.",
  description = "ORANTHUS is an India-based export and sourcing company committed to connecting global buyers with reliable Indian products.",
  stats,
  values,
  sourcingPoints,
}: AboutProps) {

  // Fallbacks if not provided from Sanity
  const finalSourcing = sourcingPoints && sourcingPoints.length > 0 ? sourcingPoints : [
    "Verified Supplier Audits",
    "Origin Quality Coordination",
    "Tailored Shipping Sacks & Boxes",
    "Traceability and Full Compliance",
  ];

  const fallbackPillars = [
    {
      title: "Reliable Sourcing",
      description: "Direct farm-gate and facility coordination with vetted Indian manufacturers.",
      icon: ShieldCheck,
    },
    {
      title: "Competitive Pricing",
      description: "Efficient procurement pipelines yielding market-driven commercial pricing.",
      icon: Coins,
    },
    {
      title: "Quality Focus",
      description: "Rigorous quality checks at origin to maintain absolute batch consistency.",
      icon: Award,
    },
    {
      title: "Flexible Business",
      description: "Support for trial orders, customized specifications, and private label packaging.",
      icon: RotateCcw,
    },
    {
      title: "Customer-Centric",
      description: "Transparent, real-time communication and punctual container execution.",
      icon: Clock,
    },
  ];

  return (
    <section id="about" style={{ scrollMarginTop: "6rem" }} className="bg-[#FAF8F5] section-padding py-20 sm:py-28 md:py-32 border-b border-[#ECE8DF]/40">
      <div className="container-width flex flex-col gap-24 sm:gap-32">
        {/* Main Split Section: Title & Description left, Sourcing Blueprint right */}
        <motion.div
          className="grid gap-16 lg:grid-cols-12 lg:items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {/* Left Column: Brand Statement */}
          <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
                {eyebrow}
              </span>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight text-[#111111]" 
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {title}
              </h2>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-[#555555] font-light">
                {description}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Sourcing Blueprint panel */}
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <div className="rounded-3xl border border-[#ECE8DF] bg-white p-8 sm:p-10 shadow-[0_12px_32px_rgba(15,15,15,0.03)] relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-[#D9A96B]/5 rounded-bl-full pointer-events-none" />
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-6">
                Sourcing Blueprint
              </h4>
              <div className="grid gap-4 grid-cols-1">
                {finalSourcing.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3.5 p-4 rounded-xl border border-[#ECE8DF]/50 bg-[#FAF8F5]/30 hover:border-[#D9A96B]/30 hover:bg-[#FAF8F5]/60 transition-all duration-300">
                    <CheckCircle2 className="h-5 w-5 text-[#D9A96B] shrink-0" />
                    <span className="text-sm font-medium text-[#111111]/90">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Strengths Section */}
        <motion.div
          className="flex flex-col gap-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div variants={itemVariants}>
            <span className="text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              Core Strengths
            </span>
            <h3 
              className="text-3xl sm:text-4xl font-semibold text-[#111111] mt-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Choose ORANTHUS
            </h3>
          </motion.div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {values && values.length > 0 ? (
              values.map((pillar, index) => {
                const PillarIcon = getIcon(pillar.icon);
                return (
                  <motion.div
                    key={pillar._key || pillar.title || index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Card className="rounded-2xl border-[#ECE8DF] p-6 shadow-[0_4px_12px_rgba(15,15,15,0.01)] hover:shadow-[0_12px_28px_rgba(217,169,107,0.08)] hover:-translate-y-1 hover:border-[#D9A96B]/30 transition-all duration-500 bg-[#FFFFFF] group relative overflow-hidden h-full">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#D9A96B] transition-colors" />
                      <div className="flex gap-5 items-start h-full">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D9A96B]/5 border border-[#D9A96B]/15 text-[#D9A96B] group-hover:bg-[#D9A96B] group-hover:text-white transition-all duration-300 shadow-sm">
                          <PillarIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-[#111111] transition-colors group-hover:text-[#D9A96B]">
                            {pillar.title}
                          </h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#555555] font-light">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              fallbackPillars.map((pillar, index) => {
                const PillarIcon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Card className="rounded-2xl border-[#ECE8DF] p-6 shadow-[0_4px_12px_rgba(15,15,15,0.01)] hover:shadow-[0_12px_28px_rgba(217,169,107,0.08)] hover:-translate-y-1 hover:border-[#D9A96B]/30 transition-all duration-500 bg-[#FFFFFF] group relative overflow-hidden h-full">
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#D9A96B] transition-colors" />
                      <div className="flex gap-5 items-start h-full">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D9A96B]/5 border border-[#D9A96B]/15 text-[#D9A96B] group-hover:bg-[#D9A96B] group-hover:text-white transition-all duration-300 shadow-sm">
                          <PillarIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-[#111111] transition-colors group-hover:text-[#D9A96B]">
                            {pillar.title}
                          </h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#555555] font-light">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Vision & Mission Row */}
        <motion.div
          className="border-t border-[#ECE8DF]/60 pt-16 sm:pt-20 flex flex-col gap-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div variants={itemVariants}>
            <span className="text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              Our Focus
            </span>
            <h3 
              className="text-3xl sm:text-4xl font-semibold text-[#111111] mt-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Purpose & Long-Term Vision
            </h3>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Vision Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <Card className="rounded-3xl border-[#ECE8DF] p-8 sm:p-12 shadow-[0_8px_30px_rgba(15,15,15,0.02)] bg-white h-full relative overflow-hidden group hover:border-[#D9A96B]/30 hover:shadow-[0_16px_40px_rgba(217,169,107,0.06)] transition-all duration-500">
                <div className="absolute top-0 right-0 h-28 w-28 bg-[#D9A96B]/5 rounded-bl-full flex items-center justify-end p-6 text-[#D9A96B]/10 group-hover:bg-[#D9A96B]/10 transition-colors duration-500">
                  <Eye className="h-10 w-10 text-[#D9A96B]" />
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-4">
                  Vision
                </p>
                <h3 
                  className="text-2xl sm:text-3xl font-semibold text-[#111111] mb-5 group-hover:text-[#D9A96B] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Grounded Sourcing Partner
                </h3>
                <p className="text-base leading-relaxed text-[#555555] font-light">
                  To become a trusted global sourcing partner by delivering value, reliability, and long-term business relationships.
                </p>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <Card className="rounded-3xl border-[#ECE8DF] p-8 sm:p-12 shadow-[0_8px_30px_rgba(15,15,15,0.02)] bg-white h-full relative overflow-hidden group hover:border-[#D9A96B]/30 hover:shadow-[0_16px_40px_rgba(217,169,107,0.06)] transition-all duration-500">
                <div className="absolute top-0 right-0 h-28 w-28 bg-[#D9A96B]/5 rounded-bl-full flex items-center justify-end p-6 text-[#D9A96B]/10 group-hover:bg-[#D9A96B]/10 transition-colors duration-500">
                  <Target className="h-10 w-10 text-[#D9A96B]" />
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-4">
                  Mission
                </p>
                <h3 
                  className="text-2xl sm:text-3xl font-semibold text-[#111111] mb-5 group-hover:text-[#D9A96B] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Sustained Global Outreach
                </h3>
                <p className="text-base leading-relaxed text-[#555555] font-light">
                  To promote quality Indian products in international markets while creating sustainable growth opportunities for buyers and suppliers worldwide.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}