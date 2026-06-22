// src/components/home/CTA.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/ScrollProvider";

import { itemVariants, sectionVariants } from "./motion";

type CTAProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonHref?: string | null;
  bgImageUrl?: string | null;
};

export default function CTA({
  eyebrow = "Let’s Connect",
  title = "Looking For A Reliable Global Export Partner?",
  description = "Connect with us to explore premium dried products sourced and delivered with international quality standards.",
  buttonText = "Contact Us",
  buttonHref = "#contact",
  bgImageUrl = null,
}: CTAProps) {
  const { scrollTo } = useLenis();
  return (
    <section 
      id="contact" 
      style={{ 
        scrollMarginTop: "6rem",
        backgroundImage: bgImageUrl 
          ? `linear-gradient(to bottom, rgba(17, 17, 17, 0.88), rgba(17, 17, 17, 0.88)), url(${bgImageUrl})`
          : undefined
      }} 
      className="relative overflow-hidden bg-cover bg-center py-16 sm:py-24 md:py-28 lg:py-32 section-padding bg-[linear-gradient(135deg,#0b0b0b_0%,#1a1a1a_50%,#0b0b0b_100%)]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.06),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(217,169,107,0.03),transparent_55%)]" />
      
      <div className="container-width text-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants} className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
            {eyebrow}
          </motion.p>

          <motion.h2 variants={itemVariants} className="mx-auto max-w-4xl text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-white mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
            {title}
          </motion.h2>

          <motion.p variants={itemVariants} className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-100 font-light">
            {description}
          </motion.p>

          <div className="mt-14 flex items-center justify-center gap-6">
            <motion.div
              variants={itemVariants}
              viewport={{ once: true }}
            >
              <Button asChild className="bg-[#D9A96B] px-12 py-8 text-white text-base font-medium rounded-lg hover:bg-[#c89a5a] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#D9A96B]/20">
                {buttonHref?.startsWith("#") ? (
                  <a
                    href={buttonHref}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(buttonHref!, { offset: -80 });
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