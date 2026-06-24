import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { certificationQuery } from "@/sanity/lib/queries";
import { Award, ShieldCheck, BadgeCheck, FileText, CheckCircle2, Calendar, ArrowLeft } from "lucide-react";

export const revalidate = 60;

type CertificationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(dateStr: string | undefined | null) {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function CertificationDetailPage({ params }: CertificationPageProps) {
  const { slug } = await params;
  const cert = await client.fetch(certificationQuery, { slug });

  if (!cert) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] py-20 sm:py-28 section-padding">
      <div className="container-width max-w-4xl">
        {/* Breadcrumbs */}
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#555555] hover:text-[#D9A96B] transition-colors mb-12 group font-semibold"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Certifications
        </Link>

        {/* Certificate Card */}
        <div className="bg-white rounded-3xl border border-[#ECE8DF] p-8 sm:p-12 shadow-[0_20px_50px_rgba(15,15,15,0.03)] overflow-hidden relative">
          {/* Subtle gold gradient background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.03),transparent_40%)] pointer-events-none" />

          {/* Header */}
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#ECE8DF]/60">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D9A96B] bg-[#D9A96B]/5 border border-[#D9A96B]/15 px-3.5 py-1.5 rounded-full">
                  {cert.type || "Official License"}
                </span>
                {cert.badgeText && (
                  <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full">
                    {cert.badgeText}
                  </span>
                )}
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.2] text-[#111111]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {cert.title}
              </h1>
            </div>

            {/* Icon or Logo representation */}
            <div className="h-20 w-20 shrink-0 flex items-center justify-center rounded-2xl bg-[#FAF8F5] border border-[#ECE8DF] overflow-hidden p-2">
              {cert.logoUrl ? (
                <img
                  src={cert.logoUrl}
                  alt={cert.title || "Authority Logo"}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Award className="h-10 w-10 text-[#D9A96B]" />
              )}
            </div>
          </div>

          {/* Key metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-b border-[#ECE8DF]/60 text-sm">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-[0.15em] text-[#555555]/60 font-semibold">
                Issuing Authority
              </span>
              <span className="font-medium text-[#111111]">
                {cert.issuingAuthority || "Government Authority"}
              </span>
            </div>

            {cert.certificateNumber && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-[0.15em] text-[#555555]/60 font-semibold">
                  Certificate / License Number
                </span>
                <span className="font-mono font-medium text-[#111111]">
                  {cert.certificateNumber}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-[0.15em] text-[#555555]/60 font-semibold">
                Validity Period
              </span>
              <div className="flex items-center gap-2 text-[#111111] font-medium">
                <Calendar className="h-4 w-4 text-[#D9A96B] shrink-0" />
                {cert.isLifetime ? (
                  <span>Permanent / Lifetime</span>
                ) : (
                  <span>
                    {formatDate(cert.issueDate)} – {formatDate(cert.expiryDate)}
                  </span>
                )}
              </div>
            </div>

            {cert.issuingCountry && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-[0.15em] text-[#555555]/60 font-semibold">
                  Jurisdiction / Country
                </span>
                <span className="font-medium text-[#111111]">
                  {cert.issuingCountry}
                </span>
              </div>
            )}
          </div>

          {/* Full description */}
          <div className="py-10">
            <h2 className="text-lg font-semibold text-[#111111] mb-4">
              Scope & Purpose
            </h2>
            <div className="text-base text-[#555555] font-light leading-relaxed space-y-4">
              <p>
                {cert.fullDescription || cert.shortDescription || "This certificate validates our compliance with relevant global standards and statutory guidelines. It covers standard export operations, distribution safety, and grade quality checks."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
