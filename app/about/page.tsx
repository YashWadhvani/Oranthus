import About from "@/components/home/About";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

import { CheckCircle2, Globe2, Leaf, Target, Users } from "lucide-react";

const valueIcons = {
  shieldCheck: CheckCircle2,
  handshake: Users,
  leaf: Leaf,
  globe: Globe2,
  sparkles: Target,
};

export default async function AboutPage() {
  const data = await client.fetch(homepageQuery);
  const content = data?.homepage;
  const about = data?.about;

  const aboutStats = about?.stats?.map((s: { value?: number; suffix?: string; label?: string }) => ({
    value: `${s.value || 0}${s.suffix || ""}`,
    label: s.label
  })) || null;

  return (
    <main>
      <About
        eyebrow="Who We Are"
        title={about?.overviewTitle}
        description={about?.overviewDescription}
        stats={aboutStats}
      />

      <section className="bg-[#FFFFFF] py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width grid gap-8 lg:grid-cols-3">
          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FAF8F5] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">{about?.visionEyebrow || "Vision"}</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                {about?.visionTitle || "To be a trusted global partner"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">
                {about?.vision || "We aim to deliver consistent quality and long-term value to international buyers."}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FAF8F5] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">{about?.missionEyebrow || "Mission"}</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                {about?.missionTitle || "Source, process, and export"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">
                {about?.mission || "We build reliable supply chains that serve the needs of global food and ingredient markets."}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#ECE8DF] bg-[#FAF8F5] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
            <CardContent className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">{about?.founderEyebrow || "Founder"}</p>
              <h2 className="mt-4 text-2xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                {about?.founderTitle || "A message from our founder"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">
                {about?.founderMessage || "Oranthus was created to serve global buyers with dependable quality and ethical sourcing."}
              </p>
              <p className="mt-4 text-sm font-medium text-[#111111]">
                {about?.founderName || "Arun Mehta"}
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[#555555]">{about?.founderRole || "Founder & Director"}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width">
          <div className="max-w-3xl mb-12">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">{about?.valuesEyebrow || "Values"}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
              {about?.valuesTitle || "What we stand for"}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#555555] font-light">
              {about?.valuesDescription || "Our values shape how we source, process, and deliver every shipment."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(about?.values || []).map((value: { title?: string; description?: string; icon?: string }, index: number) => {
              const Icon = valueIcons[value.icon as keyof typeof valueIcons] || Target;

              return (
                <Card key={`${value.title}-${index}`} className="rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D9A96B]/10 bg-[#D9A96B]/10 text-[#D9A96B]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#555555] font-light">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] py-16 sm:py-24 md:py-28 lg:py-32 section-padding">
        <div className="container-width">
          <Card className="rounded-3xl border-[#ECE8DF] bg-[#FAF8F5] shadow-[0_12px_40px_rgba(15,15,15,0.06)]">
            <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-12">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">{about?.sourcingEyebrow || "Sourcing"}</p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                  {about?.sourcingTitle || "Reliable sourcing from trusted partners"}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#555555] font-light">
                  {about?.sourcingDescription || "We work with vetted growers, processors, and logistics partners to ensure every export order meets specifications."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {(about?.sourcingPoints || [
                  "Verified supplier onboarding",
                  "Quality checks at origin",
                  "Export packaging controls",
                  "Traceability and compliance",
                ]).map((point: string) => (
                  <div key={point} className="rounded-2xl border border-[#ECE8DF] bg-[#FFFFFF] p-5 text-sm text-[#555555] shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
                    {point}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <WhyChooseUs
        eyebrow={content?.whyChooseUsEyebrow}
        title={content?.whyChooseUsTitle}
        description={content?.whyChooseUsDescription}
        features={content?.whyChooseUsFeatures}
      />
    </main>
  );
}
