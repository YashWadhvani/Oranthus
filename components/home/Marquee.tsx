"use client";

import { motion } from "framer-motion";

type MarqueeItem = string | {
    text?: string | null;
};

type MarqueeProps = {
    items?: MarqueeItem[] | null;
};

export default function Marquee({ items = null }: MarqueeProps) {
    const marqueeItems = items && items.length > 0 ? items : null;

    if (!marqueeItems) return null;

    // To ensure the marquee spans the full screen width and loops seamlessly,
    // we repeat the base items array to ensure a minimum count per copy.
    let baseItems = marqueeItems;
    while (baseItems.length < 8) {
        baseItems = [...baseItems, ...marqueeItems];
    }

    return (
        <div className="relative overflow-hidden border-y border-[#E7D8B8] bg-[#FAF5EA] py-4 sm:py-5 flex">
            {/* Gradient overlays for smooth fading edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAF5EA] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAF5EA] to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, "-50%"] }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {/* First copy of items */}
                <div className="flex gap-8 pr-8 shrink-0">
                    {baseItems.map((item, index) => (
                        <span
                            key={`copy1-${index}`}
                            className="shrink-0 inline-flex items-center rounded-full border border-[#D9A96B]/20 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8C661E] shadow-[0_10px_24px_rgba(15,15,15,0.04)]"
                        >
                            {typeof item === "string" ? item : item?.text}
                        </span>
                    ))}
                </div>

                {/* Second copy of items */}
                <div className="flex gap-8 pr-8 shrink-0">
                    {baseItems.map((item, index) => (
                        <span
                            key={`copy2-${index}`}
                            className="shrink-0 inline-flex items-center rounded-full border border-[#D9A96B]/20 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8C661E] shadow-[0_10px_24px_rgba(15,15,15,0.04)]"
                        >
                            {typeof item === "string" ? item : item?.text}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

