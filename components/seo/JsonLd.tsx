type SocialLink = {
  platform?: string;
  url?: string;
};

type SiteSettings = {
  companyName?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: SocialLink[];
};

interface JsonLdProps {
  siteSettings: SiteSettings | null;
  logoUrl: string | null;
}

export default function JsonLd({ siteSettings, logoUrl }: JsonLdProps) {
  const siteUrl = siteSettings?.website || "https://www.oranthus.com";
  const companyName = siteSettings?.companyName || "Oranthus";

  const sameAs = (siteSettings?.socialLinks || [])
    .filter((l) => l.url)
    .map((l) => l.url as string);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    url: siteUrl,
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(siteSettings?.email || siteSettings?.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            ...(siteSettings?.phone ? { telephone: siteSettings.phone } : {}),
            ...(siteSettings?.email ? { email: siteSettings.email } : {}),
            contactType: "customer service",
            availableLanguage: ["English", "Hindi"],
          },
        }
      : {}),
    ...(siteSettings?.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteSettings.address,
            addressCountry: "IN",
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: companyName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
