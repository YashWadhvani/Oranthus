import Certifications from "@/components/home/Certifications";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import ScrollReveal from "@/components/layout/ScrollReveal";

export default async function CertificationsPage() {
  const data = await client.fetch(homepageQuery);
  const content = data?.homepage;
  const certifications = data?.certifications;

  return (
    <main className="bg-[#FFFFFF] overflow-hidden">
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 section-padding bg-gradient-to-b from-[#FAF8F5] to-white border-b border-[#ECE8DF]/40">
        <div className="container-width">
          <div className="max-w-3xl mb-16 sm:mb-20 mx-auto text-center">
            <ScrollReveal delay={0.05}>
              <p className="mb-6 sm:mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
                {content?.certificationsEyebrow || "Quality Assurance"}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-[#111111] mb-6 sm:mb-8" 
                style={{ fontFamily: "var(--font-playfair)" }}>
                {content?.certificationsTitle || "International Certifications"}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="text-lg sm:text-xl leading-relaxed text-[#555555] max-w-2xl font-light mx-auto">
                {content?.certificationsDescription || "Our commitment to quality and compliance is backed by internationally recognized certifications and standards."}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Certifications
        eyebrow=""
        title=""
        description=""
        certifications={certifications}
      />
    </main>
  );
}
