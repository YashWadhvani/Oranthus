"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, BadgeCheck, FileText, CheckCircle2, Calendar, FileDown, ExternalLink } from "lucide-react";
import { cardVariants, itemVariants, sectionVariants } from "./motion";

type Certification = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
  type?: string | null;
  issuingAuthority?: string | null;
  certificateNumber?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  isLifetime?: boolean | null;
  badgeText?: string | null;
  active?: boolean | null;
  featured?: boolean | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  pdfUrl?: string | null;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  pdfFileUrl?: string | null;
  issuingCountry?: string | null;
};

type CertificationsProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  certifications?: Certification[] | null;
};

const certIcons = [Award, ShieldCheck, BadgeCheck, CheckCircle2, FileText];

function formatDate(dateStr: string | undefined | null) {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function Certifications({
  eyebrow = "Certifications",
  title = "International Standards & Compliance",
  description = "Trusted badges and approvals that reinforce our quality-first export process.",
  certifications = [],
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
          {eyebrow && (
            <motion.p variants={itemVariants} className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              {eyebrow}
            </motion.p>
          )}

          {title && (
            <motion.h2 
              variants={itemVariants} 
              className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8" 
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {title}
            </motion.h2>
          )}

          {description && (
            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#555555] font-light">
              {description}
            </motion.p>
          )}
        </motion.div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-5xl mx-auto">
          {certsToRender.map((item, index) => {
            const docLink = item.pdfFileUrl || item.pdfUrl;
            return (
              <motion.div 
                key={item._id ?? `${item.title ?? "certification"}-${index}`} 
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ delay: index * 0.08 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 shadow-[0_8px_24px_rgba(15,15,15,0.02)] hover:shadow-[0_12px_32px_rgba(217,169,107,0.06)] transition-all duration-300 hover:bg-[#FFFFFF]"
              >
                <div>
                  {/* Badge & Type */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D9A96B] bg-[#D9A96B]/5 border border-[#D9A96B]/15 px-3 py-1 rounded-full">
                      {item.type || "Document"}
                    </span>
                    {item.badgeText && (
                      <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                        {item.badgeText}
                      </span>
                    )}
                  </div>

                  {/* Icon or Logo */}
                  <div className="flex gap-6 items-start">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#FFFFFF] border border-[#ECE8DF] group-hover:border-[#D9A96B]/30 transition-all duration-300 overflow-hidden p-2">
                      {item.logoUrl ? (
                        <Image src={item.logoUrl} alt={item.title || "Authority Logo"} width={80} height={80} className="w-full h-full object-contain" />
                      ) : (() => {
                        const Icon = certIcons[index % certIcons.length];
                        return <Icon className="h-10 w-10 text-[#D9A96B] transition-transform duration-300 group-hover:scale-110" />;
                      })()}
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold text-[#111111] group-hover:text-[#D9A96B] transition-colors">
                        {item.slug ? (
                          <Link href={`/certifications/${item.slug}`}>
                            {item.title}
                          </Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#555555]/80 font-medium">
                        Auth: {item.issuingAuthority || "Government"}
                      </p>
                      {item.certificateNumber && (
                        <span className="inline-block text-xs font-mono text-[#555555] font-light">
                          No: {item.certificateNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-6 text-sm text-[#555555] font-light leading-relaxed">
                    {item.shortDescription || item.fullDescription || "Compliance and documentation verification completed."}
                  </p>

                  {/* Validity / Country info */}
                  <div className="mt-6 pt-4 border-t border-[#ECE8DF]/60 flex flex-wrap justify-between items-center gap-4 text-xs text-[#555555] font-light">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#D9A96B]" />
                      {item.isLifetime ? (
                        <span>Validity: Permanent / Lifetime</span>
                      ) : (
                        <span>
                          Validity: {formatDate(item.issueDate)} – {formatDate(item.expiryDate)}
                        </span>
                      )}
                    </div>
                    {item.issuingCountry && (
                      <span className="text-[11px] uppercase tracking-wider bg-white border border-[#ECE8DF] px-2 py-0.5 rounded text-[#555555]/85">
                        {item.issuingCountry}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions at bottom */}
                <div className="mt-8 pt-4 flex items-center gap-3">
                  {item.slug && (
                    <Button asChild variant="outline" className="flex-1 text-xs border-[#ECE8DF] text-[#111111] hover:bg-[#FAF8F5] rounded-lg">
                      <Link href={`/certifications/${item.slug}`}>
                        Details
                      </Link>
                    </Button>
                  )}
                  {docLink && (
                    <>
                      <Button asChild variant="outline" className="text-xs border-[#ECE8DF] text-[#111111] hover:bg-[#FAF8F5] rounded-lg px-3">
                        <a href={docLink} target="_blank" rel="noopener noreferrer" title="View Document File">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="text-xs border-[#ECE8DF] text-[#111111] hover:bg-[#FAF8F5] rounded-lg px-3">
                        <a href={docLink} download title="Download Document File">
                          <FileDown className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}