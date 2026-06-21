"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, ShieldCheck, BadgeCheck, FileText, CheckCircle2 } from "lucide-react";

import { cardVariants, itemVariants, sectionVariants } from "./motion";

type Certification = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  issuer?: string | null;
  validity?: string | null;
  standards?: string[] | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  logoUrl?: string | null;
  logoAlt?: string | null;
  certificationNumber?: string | null;
};

type CertificationsProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  certifications?: Certification[] | null;
};

const certIcons = [Award, ShieldCheck, BadgeCheck, CheckCircle2, FileText];

export default function Certifications({
  eyebrow = "Certifications",
  title = "International Standards & Compliance",
  description = "Trusted badges and approvals that reinforce our quality-first export process.",
  certifications = [
    { title: "ISO Certified" },
    { title: "APEDA Approved" },
    { title: "FSSAI Certified" },
    { title: "HACCP Standards" },
  ],
}: CertificationsProps) {
  const certsToRender = certifications ?? [];

  return (
    <section id="certifications" style={{ scrollMarginTop: "6rem" }} className="bg-[#FFFFFF] section-padding py-16 sm:py-24 md:py-28 lg:py-32">
      <div className="container-width">
        <motion.div
          className="mb-20 text-center max-w-3xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <motion.p variants={itemVariants} className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">{eyebrow}</motion.p>

          <motion.h2 variants={itemVariants} className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>{title}</motion.h2>

          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#555555] font-light">{description}</motion.p>
        </motion.div>

        <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
          {certsToRender.map((item, index) => (
            <motion.div 
              key={item?._id ?? `${item?.title ?? "certification"}-${index}`} 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ delay: index * 0.08 }}
              className="group flex flex-col items-center gap-5 rounded-2xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 text-center shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_32px_rgba(15,15,15,0.08)] transition-all duration-300 hover:-translate-y-2 hover:bg-[#FFFFFF]"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FFFFFF] border border-[#ECE8DF] group-hover:border-[#D9A96B]/30 transition-all duration-300 overflow-hidden p-2">
                {item?.logoUrl ? (
                  <Image src={item.logoUrl} alt={item.logoAlt || item.title || "Authority Logo"} width={80} height={80} className="w-full h-full object-contain" />
                ) : item?.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.imageAlt || item.title || "Certification badge"} width={48} height={48} className="object-contain" />
                ) : (() => {
                  const Icon = certIcons[index % certIcons.length];
                  return <Icon className="h-10 w-10 text-[#D9A96B] transition-transform duration-300 group-hover:scale-110" />;
                })()}
              </div>

              <h3 className="text-lg font-semibold text-[#111111]">{item?.title}</h3>
              {item?.certificationNumber && (
                <span className="inline-block text-xs font-mono font-medium text-[#D9A96B] border border-[#D9A96B]/20 bg-[#D9A96B]/5 px-2.5 py-0.5 rounded">
                  No: {item.certificationNumber}
                </span>
              )}
              <p className="text-sm text-[#555555] font-light">{item?.description || "Certified & Approved"}</p>
              {item?.issuer && <p className="text-xs text-[#555555] uppercase tracking-[0.2em]">{item.issuer}</p>}
              {item?.validity && <p className="text-xs text-[#555555]">Validity: {item.validity}</p>}
              {item?.standards?.length ? (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {item.standards.map((standard) => (
                    <span key={standard} className="rounded-full border border-[#ECE8DF] bg-[#FFFFFF] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#555555]">
                      {standard}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}