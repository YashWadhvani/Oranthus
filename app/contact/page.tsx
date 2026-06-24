import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact/ContactForm";
import { FaWhatsapp } from "react-icons/fa";

export const revalidate = 60;

export const metadata = {
  title: "Contact Us",
  description:
    "Reach out to Oranthus for bulk trade inquiries, sourcing quotes, export documentation, and container shipment scheduling. Connect with our sourcing desk via WhatsApp, email, or our inquiry form for fast response on dried vegetables, spices, and agri commodity exports from India.",
  keywords: [
    "contact Oranthus",
    "agri export inquiry India",
    "bulk trade quote India",
    "sourcing desk India",
    "export inquiry form",
    "container shipment quote",
    "dried vegetable bulk order",
    "WhatsApp trade inquiry India",
    "Oranthus contact",
  ],
  alternates: { canonical: "https://www.oranthus.com/contact" },
  openGraph: {
    title: "Oranthus - Contact Us",
    description:
      "Connect with Oranthus sourcing desk for bulk trade quotes, export documentation, and container scheduling inquiries.",
    url: "https://www.oranthus.com/contact",
  },
};
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  ArrowRight,
  ShieldCheck,
  Building
} from "lucide-react";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { ScrollStagger, ScrollStaggerItem } from "@/components/layout/ScrollStagger";

function getGoogleMapsEmbedUrl(mapUrl?: string | null) {
  if (!mapUrl) {
    return null;
  }

  try {
    const url = new URL(mapUrl);

    if (!url.hostname.includes("google.") || !url.pathname.startsWith("/maps")) {
      return mapUrl;
    }

    if (url.searchParams.get("output") === "embed" || url.pathname.includes("/embed")) {
      return mapUrl;
    }

    const coordinates = url.pathname.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);

    if (coordinates) {
      const [, latitude, longitude] = coordinates;
      return `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;
    }

    const query = url.searchParams.get("q");

    if (query) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    }

    return mapUrl;
  } catch {
    return mapUrl;
  }
}

export default async function ContactPage() {
  const data = await client.fetch(homepageQuery);
  const contactInfo = data?.contactInfo || {};
  const products = data?.products || [];
  const services = data?.services || [];
  
  // Resolve address and coordinates
  const hqAddress = contactInfo?.address || "123 Export Street, Ahmedabad, Gujarat 380001, India";
  const hqPhone = contactInfo?.phone || "+91 93169 27113";
  const hqEmail = contactInfo?.email || data?.siteSettings?.email || "info@oranthus.com";
  const businessHours = contactInfo?.businessHours || "Mon–Sat, 9:00 AM to 6:00 PM IST";
  const mapEmbedUrl = getGoogleMapsEmbedUrl(contactInfo?.mapEmbedUrl) || "https://www.google.com/maps?q=Ahmedabad,Gujarat,India&output=embed";

  const whatsappNumber = contactInfo?.whatsapp
    ? contactInfo.whatsapp.replace(/\D/g, "")
    : "919316927113";

  return (
    <main className="bg-[#FFFFFF] overflow-hidden">
      {/* 1. Page Header Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-gradient-to-b from-[#FAF8F5] to-[#FFFFFF] section-padding border-b border-[#ECE8DF]/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.04),transparent_50%)] pointer-events-none" />
        <div className="container-width relative z-10 text-center">
          <ScrollReveal delay={0.05}>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              Get In Touch
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-[#111111] mb-8 max-w-4xl mx-auto" 
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Contact Our Sourcing Desk
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-lg sm:text-xl leading-relaxed text-[#555555] max-w-3xl font-light mx-auto">
              Have questions about grade analysis, packaging setups, or shipping schedules? Reach out to our export officers for swift support.
            </p>
          </ScrollReveal>
        </div>
      </section>
 
      {/* 2. Overhauled Split Layout (Contact Cards + Map/Form) */}
      <section className="py-20 sm:py-28 md:py-32 section-padding bg-white">
        <div className="container-width">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            
            {/* Left Column: Premium Contact Details Cards */}
            <div className="flex flex-col gap-6">
              <ScrollReveal direction="left">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">
                  Communications Channels
                </span>
                <h2 
                  className="text-3xl sm:text-4xl font-semibold leading-tight text-[#111111] mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Reach Oranthus Directly
                </h2>
              </ScrollReveal>
 
              <ScrollStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {/* Email Card */}
                <ScrollStaggerItem>
                  <Card className="rounded-2xl border-[#ECE8DF] bg-[#FAF8F5] p-6 shadow-sm hover:shadow-md hover:border-[#D9A96B]/30 transition-all duration-300 h-full">
                    <div className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#ECE8DF] text-[#D9A96B]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-wider">Email Support</h4>
                        <p className="mt-1 text-sm text-[#555555] font-light break-all">{hqEmail}</p>
                        <a href={`mailto:${hqEmail}`} className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#D9A96B] hover:text-[#c89a5a] transition-colors">
                          <span>Send Message</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </ScrollStaggerItem>
 
                {/* Phone Card */}
                <ScrollStaggerItem>
                  <Card className="rounded-2xl border-[#ECE8DF] bg-[#FAF8F5] p-6 shadow-sm hover:shadow-md hover:border-[#D9A96B]/30 transition-all duration-300 h-full">
                    <div className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#ECE8DF] text-[#D9A96B]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-wider">Phone Support</h4>
                        <p className="mt-1 text-sm text-[#555555] font-light">{hqPhone}</p>
                        <a href={`tel:${hqPhone.replace(/\s+/g, "")}`} className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#D9A96B] hover:text-[#c89a5a] transition-colors">
                          <span>Place Call</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </ScrollStaggerItem>
 
                {/* Address Card */}
                <ScrollStaggerItem className="sm:col-span-2 lg:col-span-1">
                  <Card className="rounded-2xl border-[#ECE8DF] bg-[#FAF8F5] p-6 shadow-sm hover:shadow-md hover:border-[#D9A96B]/30 transition-all duration-300 h-full">
                    <div className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-[#ECE8DF] text-[#D9A96B]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#111111] uppercase tracking-wider">Export HQ</h4>
                        <p className="mt-1 text-sm leading-relaxed text-[#555555] font-light whitespace-pre-line">{hqAddress}</p>
                      </div>
                    </div>
                  </Card>
                </ScrollStaggerItem>
              </ScrollStagger>
 
              {/* Large WhatsApp CTA Button */}
              <ScrollReveal direction="left" className="mt-4 p-6 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_20px_rgba(37,211,102,0.04)]">
                <div className="text-center sm:text-left">
                  <h4 className="text-base font-semibold text-[#111111] flex items-center justify-center sm:justify-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                    WhatsApp Trade desk
                  </h4>
                  <p className="text-xs text-[#555555] font-light mt-1">Get immediate specifications and freight estimations.</p>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5f] text-white px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#25D366]/20 shrink-0"
                >
                  <span>Chat on WhatsApp</span>
                  <FaWhatsapp className="h-5 w-5" />
                </a>
              </ScrollReveal>
            </div>
            {/* Right Column: Sourcing Inquiry Form */}
            <div className="flex flex-col gap-8 scroll-mt-24" id="inquiry-form-section">
              <ContactForm 
                products={products} 
                services={services} 
                contactEmail={hqEmail} 
                whatsappNumber={whatsappNumber}
              />
            </div>
 
          </div>
        </div>
      </section>

      {/* 3. Full-Width Map Location */}
      <section className="pb-20 sm:pb-28 md:pb-32 section-padding bg-white">
        <div className="container-width">
          <ScrollReveal direction="up" className="overflow-hidden rounded-3xl border border-[#ECE8DF] bg-white shadow-[0_12px_40px_rgba(15,15,15,0.04)] p-2">
            <iframe
              src={mapEmbedUrl}
              title="Oranthus maps coordinates"
              className="h-[380px] w-full sm:h-[460px] rounded-[1.5rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
