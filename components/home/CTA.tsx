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
          ? `linear-gradient(to bottom, rgba(17, 17, 17, 0.93), rgba(17, 17, 17, 0.93)), url(${bgImageUrl})`
          : undefined
      }} 
      className="relative overflow-hidden bg-cover bg-center py-20 sm:py-28 lg:py-32 section-padding bg-[linear-gradient(135deg,#0b0b0b_0%,#151515_50%,#0b0b0b_100%)]"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(217,169,107,0.04),transparent_55%)] pointer-events-none" />
      
      <div className="container-width">
        <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-[#D9A96B]/20 bg-[#161616]/60 backdrop-blur-xl p-12 sm:p-20 shadow-[0_24px_60px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Decorative glowing blobs inside the card */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#D9A96B]/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#D9A96B]/5 blur-[80px] pointer-events-none" />
          
          <motion.div
            className="text-center relative z-10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={itemVariants} className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              {eyebrow}
            </motion.p>

            <motion.h2 variants={itemVariants} className="mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              {title}
            </motion.h2>

            <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-300 font-light">
              {description}
            </motion.p>

            <div className="mt-10 flex items-center justify-center">
              <motion.div
                variants={itemVariants}
                viewport={{ once: true }}
              >
                <Button asChild className="bg-[#D9A96B] px-12 py-7 text-white text-base font-semibold rounded-lg hover:bg-[#c89a5a] transition-all duration-300 shadow-[0_8px_30px_rgba(217,169,107,0.15)] hover:shadow-[0_12px_40px_rgba(217,169,107,0.3)] hover:-translate-y-0.5">
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
      </div>
    </section>
  );
}