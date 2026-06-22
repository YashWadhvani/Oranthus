import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Search,
  Ship,
  Users,
  CheckCircle2,
  FileText,
  Package,
  Globe2,
  Zap,
  ShieldCheck,
  Truck,
  ClipboardCheck,
  ArrowRight,
  TrendingUp,
  Compass,
  FileCheck2,
  Boxes,
  HelpCircle,
} from "lucide-react";

// Icon mapper mapping string keys to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  ship: Ship,
  users: Users,
  checkCircle: CheckCircle2,
  fileText: FileCheck2,
  box: Boxes,
  globe: Globe2,
  zap: Zap,
  shieldCheck: ShieldCheck,
  truck: Truck,
  clipboardCheck: ClipboardCheck,
  trendingUp: TrendingUp,
};

const fallbackIcons = [Search, Ship, Users, CheckCircle2, FileCheck2, Boxes, Globe2, Zap];

export default async function ServicesPage() {
  const data = await client.fetch(homepageQuery);
  const services = data?.services || [];
  const content = data?.homepage;

  // Process workflow details
  const processSteps = [
    {
      step: "01",
      title: "Specifications Mapping",
      subtitle: "Custom Grade Definition",
      description: "We align with you to map out product variables including sizing, mesh, moisture limits, packaging materials, and delivery scheduling.",
      icon: ClipboardCheck,
    },
    {
      step: "02",
      title: "Supplier Verification",
      subtitle: "Vetted Origin Sourcing",
      description: "We coordinate with our vetted producers and farmers to select and secure optimal batches that meet parameters at competitive rates.",
      icon: Search,
    },
    {
      step: "03",
      title: "Strict Inspection",
      subtitle: "Quality Coordination",
      description: "Pre-shipment batch testing ensures moisture conformity, microbiological purity, and physical dimensions compliance before sealing container doors.",
      icon: ShieldCheck,
    },
    {
      step: "04",
      title: "Export Clearance & Transit",
      subtitle: "Door-to-Port Delivery",
      description: "We compile all custom certificates (phytosanitary, certificates of origin) and execute transport logistics tracking directly to your port.",
      icon: Truck,
    },
  ];

  return (
    <main className="bg-[#FFFFFF]">
      {/* 1. Services Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-gradient-to-b from-[#FAF8F5] to-[#FFFFFF] section-padding border-b border-[#ECE8DF]/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.04),transparent_50%)] pointer-events-none" />
        <div className="container-width relative z-10 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
            {content?.servicesEyebrow || "Our Offerings"}
          </p>
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.15] tracking-tight text-[#111111] mb-8 max-w-4xl mx-auto" 
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {content?.servicesTitle || "End-to-End Export Solutions"}
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-[#555555] max-w-3xl font-light mx-auto">
            {content?.servicesDescription || "We handle local procurement, supplier verification, quality audits, custom branding, and international document clearance to streamline your global sourcing operations."}
          </p>
        </div>
      </section>

      {/* 2. Services Grid Section */}
      <section className="py-20 sm:py-28 md:py-32 section-padding bg-white">
        <div className="container-width">
          {services.length === 0 ? (
            <div className="text-center py-16 text-[#555555] font-light border border-[#ECE8DF] rounded-2xl">
              No export services registered in Sanity yet. Sourcing desk is open for inquiries.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service: { _id: string; title: string; description: string; icon?: string }, index: number) => {
                let IconComponent: React.ComponentType<{ className?: string }> = (fallbackIcons[index % fallbackIcons.length]) as React.ComponentType<{ className?: string }>;
                if (service.icon && iconMap[service.icon]) {
                  IconComponent = iconMap[service.icon];
                }

                return (
                  <Card 
                    key={service._id || index}
                    className="group rounded-2xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(217,169,107,0.07)] hover:-translate-y-2 hover:bg-white flex flex-col justify-between"
                  >
                    <CardContent className="p-0 flex flex-col h-full justify-between">
                      <div>
                        {/* Styled Icon Wrapper */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-[#ECE8DF] text-[#D9A96B] transition-all duration-300 group-hover:border-[#D9A96B]/30 group-hover:bg-[#D9A96B]/5 shadow-sm">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        
                        <h3 
                          className="mt-6 text-2xl font-semibold text-[#111111] group-hover:text-[#D9A96B] transition-colors duration-300"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {service.title}
                        </h3>
                        
                        <p className="mt-4 text-base leading-relaxed text-[#555555] font-light">
                          {service.description}
                        </p>
                      </div>

                      {/* Small checklist of operations */}
                      <div className="mt-6 pt-6 border-t border-[#ECE8DF]/60">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A96B] transition-all duration-300 group-hover:translate-x-1">
                          <span>Sourcing Desk Support</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. Redesigned Sourcing Timeline Section */}
      <section className="py-20 sm:py-28 md:py-32 section-padding bg-[#FAF8F5] border-y border-[#ECE8DF]/40 overflow-hidden">
        <div className="container-width">
          <div className="max-w-3xl mb-16 sm:mb-20">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              The Journey of Sourced Batches
            </p>
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.2] text-[#111111]" 
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How Oranthus Secures Exports
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#555555] font-light">
              We employ strict critical control point checks to verify the moisture value, cleanliness, and specifications of every single bag before sea freight containers are sealed.
            </p>
          </div>

          <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Horizontal Timeline Connector (Desktop Only) */}
            <div className="absolute top-[48px] left-10 right-10 h-0.5 bg-gradient-to-r from-[#ECE8DF]/40 via-[#D9A96B]/20 to-[#ECE8DF]/40 hidden lg:block z-0" />

            {processSteps.map((step) => {
              const StepIcon = step.icon;

              return (
                <div key={step.step} className="relative z-10 group flex flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-6 lg:flex-col lg:items-start gap-4">
                    {/* Circle representing the step */}
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border border-[#D9A96B]/20 text-[#D9A96B] shadow-[0_8px_20px_rgba(217,169,107,0.04)] group-hover:bg-[#D9A96B] group-hover:text-white group-hover:border-[#D9A96B] transition-all duration-500 transform group-hover:scale-105">
                      <StepIcon className="h-8 w-8" />
                    </div>
                    {/* Step number label */}
                    <span className="text-4xl font-extrabold font-mono tracking-tighter text-[#ECE8DF] group-hover:text-[#D9A96B]/30 transition-colors duration-500 lg:-mt-2">
                      {step.step}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9A96B] font-semibold mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl font-semibold text-[#111111] mb-3 group-hover:text-[#D9A96B] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555555] font-light">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Service CTA Banner */}
      <section className="py-20 sm:py-28 md:py-32 section-padding bg-[#FFFFFF]">
        <div className="container-width">
          <Card className="rounded-3xl border border-[#ECE8DF] bg-gradient-to-br from-[#FAF8F5] via-[#FAF8F5] to-[#D9A96B]/5 shadow-[0_12px_40px_rgba(15,15,15,0.03)] relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#D9A96B]/5 blur-3xl pointer-events-none" />
            
            <CardContent className="p-8 sm:p-12 md:p-16 lg:p-20 relative z-10 text-center flex flex-col items-center">
              <p className="text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold mb-6">
                Start Sourcing
              </p>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#111111] max-w-3xl leading-[1.2]" 
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Connect With Our Sourcing desk
              </h2>
              <p className="mt-6 text-base sm:text-lg text-[#555555] max-w-2xl font-light leading-relaxed mb-10">
                Discuss custom grade specifications, packaging sizes, or container scheduling. Our team provides active export support.
              </p>
              <div className="flex gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#D9A96B] text-white hover:bg-[#c89a5a] px-8 rounded-full shadow-lg shadow-[#D9A96B]/20"
                >
                  <Link href="/contact">
                    Request Sourcing Quote
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
