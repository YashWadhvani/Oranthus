import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

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
  const mapEmbedUrl = getGoogleMapsEmbedUrl(contactInfo?.mapEmbedUrl);

  return (
    <main className="bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 section-padding">
        <div className="container-width">
          <div className="max-w-3xl mb-16 sm:mb-20 mx-auto text-center">
            <p className="mb-6 sm:mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              Get In Touch
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-[#111111] mb-6 sm:mb-8" 
              style={{ fontFamily: "var(--font-playfair)" }}>
              Contact Oranthus
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-[#555555] max-w-2xl font-light mx-auto">
              Reach out to us for inquiries, partnerships, or to place your order. Our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Map View */}
      <section className="py-16 sm:py-20 md:py-24 section-padding bg-[#FFFFFF]">
        <div className="container-width">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-3xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 sm:p-10 shadow-[0_8px_24px_rgba(15,15,15,0.04)]">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold">Location</p>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                Visit our export office
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">
                {contactInfo?.businessHours ? `Business Hours: ${contactInfo.businessHours}` : "Open Monday to Saturday for inquiries and shipment coordination."}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light">
                {contactInfo?.address || "Ahmedabad, Gujarat, India"}
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_12px_40px_rgba(15,15,15,0.06)]">
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  title="Oranthus map location"
                  className="h-[360px] w-full sm:h-[420px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-[360px] items-center justify-center bg-[#FAF8F5] px-8 text-center text-sm text-[#555555] sm:h-[420px]">
                  Add a Google Maps embed URL in Sanity to show the office location here.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-16 sm:py-20 md:py-24 section-padding bg-[#FAF8F5]">
        <div className="container-width">
          <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <div className="rounded-2xl border border-[#ECE8DF] bg-[#FFFFFF] p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9A96B]/10 border border-[#D9A96B]/20 mb-6">
                <svg className="h-6 w-6 text-[#D9A96B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">Email</h3>
              <p className="text-[#555555] font-light mb-4">
                {contactInfo?.email || "contact@oranthus.com"}
              </p>
              <a href={`mailto:${contactInfo?.email || "contact@oranthus.com"}`} 
                className="text-sm font-medium text-[#D9A96B] hover:text-[#c89a5a] transition-colors">
                Send Email →
              </a>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-[#ECE8DF] bg-[#FFFFFF] p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9A96B]/10 border border-[#D9A96B]/20 mb-6">
                <svg className="h-6 w-6 text-[#D9A96B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">Phone</h3>
              <p className="text-[#555555] font-light mb-4">
                {contactInfo?.phone || "+91 98765 43210"}
              </p>
              <a href={`tel:${contactInfo?.phone || "+919876543210"}`} 
                className="text-sm font-medium text-[#D9A96B] hover:text-[#c89a5a] transition-colors">
                Call Now →
              </a>
            </div>

            {/* Address */}
            <div className="rounded-2xl border border-[#ECE8DF] bg-[#FFFFFF] p-8 sm:p-10 md:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9A96B]/10 border border-[#D9A96B]/20 mb-6">
                <svg className="h-6 w-6 text-[#D9A96B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">Address</h3>
              <p className="text-[#555555] font-light">
                {contactInfo?.address || "Ahmedabad, Gujarat, India"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      {contactInfo?.whatsapp && (
        <section className="py-16 sm:py-20 section-padding">
          <div className="container-width text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111111] mb-8" 
              style={{ fontFamily: "var(--font-playfair)" }}>
              Quick Response on WhatsApp
            </h2>
            <p className="text-lg text-[#555555] font-light mb-10 max-w-xl mx-auto">
              Message us directly for immediate assistance with inquiries or orders.
            </p>
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5F] text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.718.737 5.33 2.135 7.623L.855 23.87a.5.5 0 00.658.658l6.183-1.624a9.87 9.87 0 007.623 2.135c5.45 0 9.85-4.4 9.85-9.85s-4.4-9.85-9.85-9.85zm0 18.25c-2.324 0-4.52-.629-6.404-1.83l-.46.24-1.598.42.42-1.598.24-.46a9.35 9.35 0 011.83-6.404c0 4.873 3.978 8.851 8.851 8.851s8.851-3.978 8.851-8.851-3.978-8.851-8.851-8.851z"/>
              </svg>
              Message on WhatsApp
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
