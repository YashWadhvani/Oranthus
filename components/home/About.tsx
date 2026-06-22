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
    <section id="about" style={{ scrollMarginTop: "6rem" }} className="bg-[#FAF8F5] section-padding py-20 sm:py-28 md:py-32">
      <div className="container-width">
        {/* Main Split Section */}
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {/* Left Column: Brand Statement & Sourcing */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
                {eyebrow}
              </p>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight text-[#111111] mb-6" 
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {title}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#555555] font-light">
                {description}
              </p>
            </div>

            {/* Sourcing credentials grid */}
            <div className="rounded-2xl border border-[#ECE8DF] bg-white p-6 sm:p-8 shadow-[0_8px_24px_rgba(15,15,15,0.03)]">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-5">
                Sourcing Blueprint
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {finalSourcing.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-sm text-[#555555]">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#D9A96B] shrink-0" />
                    <span className="font-light">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Why ORANTHUS Cards Grid */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 
              className="text-2xl sm:text-3xl font-semibold text-[#111111] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Choose ORANTHUS
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {values && values.length > 0 ? (
                values.map((pillar, index) => {
                  const PillarIcon = getIcon(pillar.icon);
                  return (
                    <motion.div
                      key={pillar._key || pillar.title || index}
                      variants={cardVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="rounded-xl border-[#ECE8DF] p-6 shadow-[0_4px_12px_rgba(15,15,15,0.02)] hover:shadow-[0_8px_24px_rgba(217,169,107,0.06)] hover:-translate-y-1 transition-all duration-300 bg-[#FFFFFF] group">
                        <div className="flex gap-4 items-start">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D9A96B]/5 border border-[#D9A96B]/15 text-[#D9A96B] group-hover:bg-[#D9A96B] group-hover:text-white transition-all duration-300">
                            <PillarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-[#111111] transition-colors group-hover:text-[#D9A96B]">
                              {pillar.title}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-[#555555] font-light">
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
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="rounded-xl border-[#ECE8DF] p-6 shadow-[0_4px_12px_rgba(15,15,15,0.02)] hover:shadow-[0_8px_24px_rgba(217,169,107,0.06)] hover:-translate-y-1 transition-all duration-300 bg-[#FFFFFF] group">
                        <div className="flex gap-4 items-start">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D9A96B]/5 border border-[#D9A96B]/15 text-[#D9A96B] group-hover:bg-[#D9A96B] group-hover:text-white transition-all duration-300">
                            <PillarIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-[#111111] transition-colors group-hover:text-[#D9A96B]">
                              {pillar.title}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-[#555555] font-light">
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
        </motion.div>

        {/* Vision & Mission Row */}
        <motion.div
          className="mt-16 sm:mt-24 grid gap-8 sm:grid-cols-2"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {/* Vision Card */}
          <motion.div variants={cardVariants}>
            <Card className="rounded-2xl border-[#ECE8DF] p-8 sm:p-10 shadow-[0_8px_30px_rgba(15,15,15,0.03)] bg-white h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-24 w-24 bg-[#D9A96B]/5 rounded-bl-full flex items-center justify-end p-4 text-[#D9A96B]/10 group-hover:bg-[#D9A96B]/10 transition-colors duration-300">
                <Eye className="h-8 w-8 text-[#D9A96B]" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-4">
                Vision
              </p>
              <h3 
                className="text-2xl sm:text-3xl font-semibold text-[#111111] mb-4"
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
          <motion.div variants={cardVariants}>
            <Card className="rounded-2xl border-[#ECE8DF] p-8 sm:p-10 shadow-[0_8px_30px_rgba(15,15,15,0.03)] bg-white h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-24 w-24 bg-[#D9A96B]/5 rounded-bl-full flex items-center justify-end p-4 text-[#D9A96B]/10 group-hover:bg-[#D9A96B]/10 transition-colors duration-300">
                <Target className="h-8 w-8 text-[#D9A96B]" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-4">
                Mission
              </p>
              <h3 
                className="text-2xl sm:text-3xl font-semibold text-[#111111] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Sustained Global Outreach
              </h3>
              <p className="text-base leading-relaxed text-[#555555] font-light">
                To promote quality Indian products in international markets while creating sustainable growth opportunities for buyers and suppliers worldwide.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}