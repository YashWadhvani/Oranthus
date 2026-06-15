"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import { cardVariants, itemVariants, sectionVariants } from "./motion";

type AboutStat = {
  value?: string | null;
  label?: string | null;
};

type AboutProps = {
  eyebrow?: string | null;
  title?: string;
  description?: string;
  stats?: AboutStat[] | null;
};

export default function About({
  eyebrow = "Who We Are",
  title = "About Our Company",
  description = "We specialize in exporting premium dried products with a strong focus on quality, trust, packaging excellence, and long-term international partnerships.",
  stats = [
    { value: "50+", label: "Premium Products" },
    { value: "10+", label: "Export Countries" },
  ],
}: AboutProps) {
  return (
    <section id="about" style={{ scrollMarginTop: "6rem" }} className="bg-[#FAF8F5] section-padding py-16 sm:py-24 md:py-28 lg:py-32">
      <div className="container-width">
        <motion.div
          className="grid gap-8 sm:gap-12 md:gap-16 lg:grid-cols-2 lg:gap-40 lg:items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <motion.div variants={itemVariants}>
            <p className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              {eyebrow}
            </p>

            <h2 className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8 max-w-xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {title}
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-[#555555] font-light">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Traceable sourcing",
                "Export documentation",
                "Bulk & private label",
                "Worldwide supply",
              ].map((item) => (
                <span key={item} className="rounded-full border border-[#E8DDC9] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8C661E]">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {stats?.map((stat, index) => (
                <motion.div
                  key={`${stat?.label ?? "about-stat"}-${index}`}
                  variants={cardVariants}
                >
                  <Card className="rounded-2xl border-[#ECE8DF] p-8 shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_32px_rgba(15,15,15,0.08)] transition-shadow duration-300 bg-[#FFFFFF]">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#555555] font-medium">
                      Key Metric
                    </p>
                    <h3 className="text-4xl font-semibold text-[#D9A96B] mt-4">
                      {stat?.value}
                    </h3>
                    <p className="mt-4 text-base text-[#555555] font-light">
                      {stat?.label}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}