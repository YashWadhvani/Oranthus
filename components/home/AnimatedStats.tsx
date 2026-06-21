"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type StatCounter = {
  value?: number | null;
  label?: string | null;
  suffix?: string | null;
};

type AnimatedStatsProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  stats?: StatCounter[] | null;
};

function CountUp({ value, duration = 2.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const current = Math.floor(progress * value);
      setCount(current);

      if (progress === 1) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function AnimatedStats({
  eyebrow = "Performance Snapshot",
  title = "Trusted by importers across markets",
  description = "A concise view of our export scale, reliability, and delivery consistency.",
  stats = null,
}: AnimatedStatsProps) {
  const activeStats = stats && stats.length > 0 ? stats : null;

  if (!activeStats) return null;

  return (
    <section className="bg-[#FAF8F5] section-padding py-16 sm:py-20 lg:py-24">
      <div className="container-width">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D9A96B]">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#555555]">
            {description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activeStats.map((stat, index) => (
            <motion.div
              key={`${stat?.label ?? "stat"}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: index * 0.1, duration: 0.55 }}
              className="rounded-2xl border border-[#ECE8DF] bg-white p-8 text-center shadow-[0_12px_30px_rgba(15,15,15,0.05)]"
            >
              <div className="mb-4 text-4xl sm:text-5xl font-bold text-[#8C661E]" style={{ fontFamily: "var(--font-playfair)" }}>
                <CountUp value={stat?.value || 0} />
                {stat?.suffix && <span className="text-[#D9A96B]">{stat.suffix}</span>}
              </div>
              <p className="text-base font-medium text-[#555555]">
                {stat?.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
