"use client";

import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, SearchCheck, ShieldCheck, ShipWheel } from "lucide-react";

import { cardVariants, itemVariants, sectionVariants } from "./motion";

type Step = {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

type OperationsSectionProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  steps?: Step[] | null;
};

const iconMap = {
  searchCheck: SearchCheck,
  clipboardList: ClipboardList,
  shieldCheck: ShieldCheck,
  shipWheel: ShipWheel,
} as const;

const defaultSteps: Step[] = [
  {
    title: "Discover demand",
    icon: "searchCheck",
    description: "We define product fit, market conditions, packaging, and timelines before moving to execution.",
  },
  {
    title: "Qualify the supply chain",
    icon: "clipboardList",
    description: "Supplier checks, documentation, and commercial terms are aligned before any commitment is made.",
  },
  {
    title: "Protect quality in transit",
    icon: "shieldCheck",
    description: "Packaging, loading, and handling controls are designed to safeguard freshness and compliance.",
  },
  {
    title: "Deliver and support",
    icon: "shipWheel",
    description: "We stay involved through shipping, customs, and post-delivery follow-up to keep things moving.",
  },
];

export default function OperationsSection({
  eyebrow = "HOW WE WORK",
  title = "A clear process from inquiry to delivery.",
  description = "We manage sourcing, documentation, logistics, and aftercare so every shipment moves with clarity and control.",
  steps = defaultSteps,
}: OperationsSectionProps) {
  const resolvedSteps = steps ?? defaultSteps;

  return (
    <section className="bg-[#FAF8F5] section-padding py-20 sm:py-28 lg:py-32">
      <div className="container-width">
        <motion.div
          className="max-w-3xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8C661E]">
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg leading-relaxed text-[#555555]">
            {description}
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {resolvedSteps.map((step, index) => {
            const Icon = step?.icon ? iconMap[step.icon as keyof typeof iconMap] : SearchCheck;

            return (
              <motion.article
                key={`${step?.title ?? "step"}-${index}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-[1.75rem] border border-[#ECE8DF] bg-white p-7 shadow-[0_10px_30px_rgba(15,15,15,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,15,15,0.08)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8C661E]/10 text-[#8C661E] transition-colors group-hover:bg-[#8C661E] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8C661E]/60">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                  {step?.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-[#555555]">
                  {step?.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#8C661E]">
                  <span>Scroll-ready execution</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}