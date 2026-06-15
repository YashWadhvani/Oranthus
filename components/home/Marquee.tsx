"use client";

import { motion } from "framer-motion";

type MarqueeItem = {
    text?: string | null;
};

type MarqueeProps = {
    items?: MarqueeItem[] | null;
};

export default function Marquee({ items = null }: MarqueeProps) {
    const marqueeItems = items && items.length > 0 ? items : null;
    console.log(marqueeItems);

    if (!marqueeItems) return null;

    const duplicatedItems = [...marqueeItems, ...marqueeItems];

    return (
        <div className="relative overflow-hidden border-y border-[#E7D8B8] bg-[#FAF5EA] py-4 sm:py-5">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAF5EA] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAF5EA] to-transparent" />
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: [0, -1920] }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <span
                        key={index}
                        className="shrink-0 inline-flex items-center rounded-full border border-[#D9A96B]/20 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8C661E] shadow-[0_10px_24px_rgba(15,15,15,0.04)]"
                    >
                        {item?.text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
