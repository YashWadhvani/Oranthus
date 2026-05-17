import {
  Globe,
  ShieldCheck,
  PackageCheck,
  Leaf,
  Truck,
} from "lucide-react";

type Feature = {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

type WhyChooseUsProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  features?: Feature[] | null;
};

const iconMap = {
  globe: Globe,
  shieldCheck: ShieldCheck,
  packageCheck: PackageCheck,
  leaf: Leaf,
  truck: Truck,
} as const;

export default function WhyChooseUs({
  eyebrow = "Why Choose Us",
  title = "Trusted Export Excellence",
  description = "A premium supply partner built around consistency, transparency, and export-ready standards.",
  features = [
    {
      title: "Global Export",
      icon: "globe",
      description: "Serving international buyers with dependable logistics and responsive communication.",
    },
    {
      title: "Certified Quality",
      icon: "shieldCheck",
      description: "Built on compliance-first sourcing and quality checks at every stage.",
    },
    {
      title: "Secure Packaging",
      icon: "packageCheck",
      description: "Packaging designed to protect freshness, presentation, and shelf life.",
    },
    {
      title: "Premium Sourcing",
      icon: "leaf",
      description: "Carefully selected ingredients and materials from trusted growing regions.",
    },
  ],
}: WhyChooseUsProps) {
  return (
    <section id="why" style={{ scrollMarginTop: "6rem" }} className="bg-[#FAF8F5] section-padding py-16 sm:py-24 md:py-28 lg:py-32">
      <div className="container-width">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <p className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">{eyebrow}</p>

          <h2 className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>{title}</h2>

          <p className="text-lg leading-relaxed text-[#555555] font-light">{description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features?.map((feature, index) => {
            const Icon = feature?.icon ? iconMap[feature.icon as keyof typeof iconMap] : Globe;

            return (
              <div 
                key={`${feature?.title ?? "feature"}-${index}`} 
                className="rounded-2xl border border-[#ECE8DF] bg-[#FFFFFF] p-8 text-center shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_32px_rgba(15,15,15,0.08)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#D9A96B]/15 to-transparent border border-[#D9A96B]/10">
                  <Icon className="h-8 w-8 text-[#D9A96B]" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#111111]">{feature?.title}</h3>

                <p className="mt-4 text-base leading-relaxed text-[#555555] font-light">{feature?.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}