"use client";

import { motion } from "framer-motion";
import { itemVariants, sectionVariants } from "./motion";
import { CheckCircle2 } from "lucide-react";

type TradeStoryProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  storyTitle?: string | null;
  storyDescription?: string | null;
  storyHighlights?: string[] | null;
};

export default function TradeStory({
  eyebrow = "WHO WE ARE",
  title = "Built on trust. Proven at scale.",
  description = "For more than two decades, Oranthus has connected growers, manufacturers, and buyers through a disciplined trade model built on transparency, quality, and execution.",
  storyTitle = "A structure designed for long-term partnerships.",
  storyDescription = "From origin coordination to final-mile delivery, we keep the moving parts visible, documented, and accountable — so buyers can move faster with fewer surprises.",
  storyHighlights = [
    "Transparent sourcing and contract clarity",
    "Quality checks at every stage of handling",
    "Reliable logistics across key trade corridors",
  ],
}: TradeStoryProps) {
  const highlights = storyHighlights && storyHighlights.length > 0
    ? storyHighlights
    : [
      "Transparent sourcing and contract clarity",
      "Quality checks at every stage of handling",
      "Reliable logistics across key trade corridors",
    ];

  return (
    <section id="trade-story" style={{ scrollMarginTop: "6rem" }} className="bg-[#FFFFFF] section-padding py-20 sm:py-28 md:py-32 border-b border-[#ECE8DF]/40">
      <div className="container-width">
        <motion.div
          className="grid gap-12 lg:grid-cols-2 lg:gap-24 lg:items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {/* Left Column: Brand Vision */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              {eyebrow || "WHO WE ARE"}
            </span>
            <h2
              className="text-4xl sm:text-5xl font-semibold leading-[1.2] tracking-tight text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {title ? title : <>Built on trust.<br />Proven at scale.</>}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#555555] font-light">
              {description || "For more than two decades, Oranthus has connected growers, manufacturers, and buyers through a disciplined trade model built on transparency, quality, and execution."}
            </p>
          </motion.div>

          {/* Right Column: Execution Model */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8 bg-[#FAF8F5] border border-[#ECE8DF] rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgba(15,15,15,0.02)]">
            <div>
              <h3
                className="text-2xl sm:text-3xl font-semibold text-[#111111] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {storyTitle || "A structure designed for long-term partnerships."}
              </h3>
              <p className="text-base leading-relaxed text-[#555555] font-light">
                {storyDescription || "From origin coordination to final-mile delivery, we keep the moving parts visible, documented, and accountable — so buyers can move faster with fewer surprises."}
              </p>
            </div>

            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D9A96B]/10 text-[#D9A96B] mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-[#111111]">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
