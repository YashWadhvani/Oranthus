import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ShieldCheck, 
  Coins, 
  Award, 
  RotateCcw, 
  Clock, 
  Eye, 
  Target, 
  CheckCircle2, 
  Handshake,
  Leaf,
  Globe,
  PackageCheck,
  Truck,
  Quote
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ScrollStagger, ScrollStaggerItem } from "@/components/layout/ScrollStagger";

export const revalidate = 60;

const iconMap: Record<string, React.ComponentType<any>> = {
  shieldCheck: ShieldCheck,
  coins: Coins,
  award: Award,
  rotateCcw: RotateCcw,
  clock: Clock,
  handshake: Handshake,
  leaf: Leaf,
  globe: Globe,
  packageCheck: PackageCheck,
  truck: Truck
};

function getIcon(name: string | undefined | null) {
  if (!name) return ShieldCheck;
  const lowerName = name.trim().toLowerCase();
  return iconMap[lowerName] || ShieldCheck;
}

export default async function AboutPage() {
  const data = await client.fetch(homepageQuery);
  const about = data?.about;

  const valuePillars = about?.values && about.values.length > 0 ? about.values : [
    {
      title: "Reliable Sourcing",
      description: "Access to trusted Indian manufacturers and suppliers with vetted processing environments.",
      icon: "shieldCheck",
    },
    {
      title: "Competitive Pricing",
      description: "Efficient local procurement workflows and market-driven pricing strategies.",
      icon: "coins",
    },
    {
      title: "Quality Focus",
      description: "Close coordination with suppliers and raw ingredient testing to maintain consistency.",
      icon: "award",
    },
    {
      title: "Flexible Business Approach",
      description: "Support for initial trial orders, regular bulk shipments, and customized packaging requirements.",
      icon: "rotateCcw",
    },
    {
      title: "Customer-Centric Service",
      description: "Transparent real-time communication, active updates, and punctual logistics execution.",
      icon: "clock",
    },
  ];

  const sourcingHighlights = about?.sourcingPoints && about.sourcingPoints.length > 0 ? about.sourcingPoints : [
    "Vetted Supplier Onboarding & Audits",
    "Strict Pre-Shipment Quality Inspections",
    "Phytosanitary & Export Documentation",
    "Customized Shipping Bag Formats",
    "End-to-End Tracking Coordination"
  ];

  return (
    <main className="bg-[#FFFFFF] overflow-hidden">
      {/* 1. Page Hero Banner */}
      <section className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-gradient-to-b from-[#FAF8F5] to-white section-padding border-b border-[#ECE8DF]/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.04),transparent_50%)] pointer-events-none" />
        <div className="container-width relative z-10 text-center">
          <ScrollReveal delay={0.05}>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              {about?.overviewEyebrow || "About Our Company"}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-[#111111] max-w-4xl mx-auto" 
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {about?.overviewTitle || "Born in India. Built for the World."}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[#555555] max-w-3xl font-light mx-auto">
              {about?.overviewDescription || "ORANTHUS is a premier India-based export and sourcing enterprise committed to bridging the gap between global buyers and verified Indian products."}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Company Overview Split Section */}
      <section className="py-20 sm:py-28 md:py-32 section-padding bg-white">
        <div className="container-width">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Overview Text */}
            <ScrollReveal direction="left" className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">
                {about?.sourcingEyebrow || "Overview & Objective"}
              </span>
              <h2 
                className="text-4xl sm:text-5xl font-semibold leading-tight text-[#111111]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {about?.sourcingTitle || "Simplifying Global Ingredient Procurement"}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#555555] font-light">
                {about?.sourcingDescription || "We work with vetted growers, processors, and logistics partners to ensure every export order meets specifications."}
              </p>
            </ScrollReveal>

            {/* Visual Sourcing Blueprints Box */}
            <ScrollReveal direction="right" className="rounded-3xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 sm:p-10 shadow-[0_8px_30px_rgba(15,15,15,0.02)]">
              <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-6">
                Our Sourcing Blueprint
              </h4>
              <div className="space-y-4">
                {sourcingHighlights.map((item: string) => (
                  <div key={item} className="flex items-center gap-3.5 text-sm text-[#555555] font-light">
                    <CheckCircle2 className="h-5 w-5 text-[#D9A96B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="py-20 sm:py-28 section-padding bg-[#FAF8F5] border-y border-[#ECE8DF]/40">
        <ScrollStagger className="container-width grid gap-8 sm:grid-cols-2">
          
          {/* Vision */}
          <ScrollStaggerItem>
            <Card className="rounded-2xl border-[#ECE8DF] p-8 sm:p-12 shadow-[0_8px_24px_rgba(15,15,15,0.02)] bg-white relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 h-28 w-28 bg-[#D9A96B]/5 rounded-bl-full flex items-center justify-end p-6 text-[#D9A96B]/10 transition-colors duration-300 group-hover:bg-[#D9A96B]/10">
                <Eye className="h-10 w-10 text-[#D9A96B]" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-4">
                {about?.visionEyebrow || "Our Vision"}
              </p>
              <h3 
                className="text-3xl font-semibold text-[#111111] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {about?.visionTitle || "Trusted Sourcing Desk"}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#555555] font-light">
                {about?.vision || "To become a trusted global sourcing partner by delivering value, reliability, and long-term business relationships."}
              </p>
            </Card>
          </ScrollStaggerItem>

          {/* Mission */}
          <ScrollStaggerItem>
            <Card className="rounded-2xl border-[#ECE8DF] p-8 sm:p-12 shadow-[0_8px_24px_rgba(15,15,15,0.02)] bg-white relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 h-28 w-28 bg-[#D9A96B]/5 rounded-bl-full flex items-center justify-end p-6 text-[#D9A96B]/10 transition-colors duration-300 group-hover:bg-[#D9A96B]/10">
                <Target className="h-10 w-10 text-[#D9A96B]" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-4">
                {about?.missionEyebrow || "Our Mission"}
              </p>
              <h3 
                className="text-3xl font-semibold text-[#111111] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {about?.missionTitle || "Quality Export Outreach"}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#555555] font-light">
                {about?.mission || "To promote quality Indian products in international markets while creating sustainable growth opportunities for buyers and suppliers worldwide."}
              </p>
            </Card>
          </ScrollStaggerItem>

        </ScrollStagger>
      </section>

      {/* 4. Why ORANTHUS Pillars Grid */}
      <section className="py-20 sm:py-28 md:py-32 section-padding bg-white">
        <div className="container-width">
          <ScrollReveal className="max-w-3xl mb-16 sm:mb-20">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              {about?.valuesEyebrow || "Our Pillars"}
            </p>
            <h2 
              className="text-4xl sm:text-5xl font-semibold leading-tight text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {about?.valuesTitle || "The Pillars of Our Sourcing Network"}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#555555] font-light">
              {about?.valuesDescription || "Importers around the globe rely on Oranthus because we construct our business models entirely on trade transparency, shipping safety, and strict specifications conformity."}
            </p>
          </ScrollReveal>

          <ScrollStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {valuePillars.map((pillar: any, index: number) => {
              const PillarIcon = getIcon(pillar.icon);
              return (
                <ScrollStaggerItem key={pillar._key || pillar.title || index}>
                  <Card 
                    className="rounded-2xl border-[#ECE8DF] bg-[#FAF8F5] p-8 shadow-[0_8px_24px_rgba(15,15,15,0.02)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(217,169,107,0.06)] hover:-translate-y-1.5 hover:bg-white h-full group"
                  >
                    <CardContent className="p-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[#ECE8DF] text-[#D9A96B] transition-colors duration-300 group-hover:bg-[#D9A96B] group-hover:text-white group-hover:border-[#D9A96B]">
                        <PillarIcon className="h-5 w-5" />
                      </div>
                      <h3 
                        className="mt-6 text-xl font-semibold text-[#111111]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#555555] font-light">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStagger>
        </div>
      </section>

      {/* 5. Founder Message Section (Premium Layout) */}
      {about?.founderMessage && (
        <section className="py-20 sm:py-28 md:py-32 section-padding bg-[#FAF8F5] border-t border-[#ECE8DF]/40">
          <div className="container-width">
            <ScrollReveal className="max-w-4xl mx-auto rounded-3xl border border-[#ECE8DF] bg-white p-8 sm:p-12 md:p-16 shadow-[0_8px_30px_rgba(15,15,15,0.02)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-[#D9A96B]/5 pointer-events-none">
                <Quote className="h-32 w-32 rotate-180" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">
                  {about?.founderEyebrow || "Leadership"}
                </span>
                <h3 
                  className="text-3xl sm:text-4xl font-semibold text-[#111111]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {about?.founderTitle || "A Message From Our Founder"}
                </h3>
                
                <blockquote className="text-lg sm:text-xl text-[#555555] font-light leading-relaxed italic border-l-2 border-[#D9A96B] pl-6 my-4">
                  "{about.founderMessage}"
                </blockquote>
                
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-[#111111]">
                    {about.founderName || "Arun Mehta"}
                  </h4>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#D9A96B] font-semibold mt-1">
                    {about.founderRole || "Founder & Director"}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 6. Stats Section */}
      {about?.stats && about.stats.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-t border-[#ECE8DF]/40">
          <div className="container-width">
            <ScrollStagger className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto justify-items-center">
              {about.stats.map((stat: any, index: number) => (
                <ScrollStaggerItem key={stat._key || index} className="text-center">
                  <div className="text-5xl sm:text-6xl font-bold text-[#D9A96B]" style={{ fontFamily: "var(--font-playfair)" }}>
                    {stat.value}{stat.suffix || ""}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#555555] font-medium">
                    {stat.label}
                  </div>
                </ScrollStaggerItem>
              ))}
            </ScrollStagger>
          </div>
        </section>
      )}

      {/* 7. CTA Inquiry Banner */}
      <section className="py-20 sm:py-28 section-padding bg-[#FAF8F5] border-t border-[#ECE8DF]/40">
        <div className="container-width text-center">
          <ScrollReveal className="max-w-2xl mx-auto flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold mb-6">
              Partner With Us
            </p>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#111111] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Coordinate Your Next Import Shipment
            </h2>
            <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed mb-10">
              Our sourcing team is ready to analyze your product specifications, schedule trial batches, and prepare a custom ocean or air container freight quotation.
            </p>
            <div className="flex gap-4">
              <Button 
                asChild
                className="bg-[#D9A96B] text-white hover:bg-[#c89a5a] px-8 rounded-lg shadow-md shadow-[#D9A96B]/10"
              >
                <Link href="/contact">
                  Contact Sourcing Desk
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
