// src/components/home/CTA.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/ScrollProvider";

type CTAProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonHref?: string | null;
};

export default function CTA({
  eyebrow = "Let’s Connect",
  title = "Looking For A Reliable Global Export Partner?",
  description = "Connect with us to explore premium dried products sourced and delivered with international quality standards.",
  buttonText = "Contact Us",
  buttonHref = "#contact",
}: CTAProps) {
  const { scrollTo } = useLenis()
  return (
    <section id="contact" style={{ scrollMarginTop: "6rem" }} className="relative overflow-hidden bg-[linear-gradient(135deg,#0b0b0b_0%,#1a1a1a_50%,#0b0b0b_100%)] py-16 sm:py-24 md:py-28 lg:py-32 section-padding\">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.06),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(217,169,107,0.03),transparent_55%)]" />
      
      <div className="container-width text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
            {eyebrow}
          </p>

          <h2 className="mx-auto max-w-4xl text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-white mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
            {title}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-100 font-light">
            {description}
          </p>

          <div className="mt-14 flex items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button asChild className="bg-[#D9A96B] px-12 py-8 text-white text-base font-medium rounded-lg hover:bg-[#c89a5a] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D9A96B]/20">
                {buttonHref?.startsWith("#") ? (
                  <a
                    href={buttonHref}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(buttonHref!, { offset: -80 })
                    }}
                  >
                    {buttonText}
                  </a>
                ) : (
                  <Link href={buttonHref || "/contact"}>{buttonText}</Link>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}