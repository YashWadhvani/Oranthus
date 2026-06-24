import type { Metadata } from "next";
import "./globals.css";

import { inter, playfair } from "@/lib/fonts";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import PageLoader from "@/components/layout/PageLoader";
import JsonLd from "@/components/seo/JsonLd";

import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

const SITE_URL = "https://www.oranthus.com";

export async function generateMetadata(): Promise<Metadata> {
    const layoutData = await client.fetch(siteSettingsQuery);
    const s = layoutData?.settings;

    const faviconUrl = s?.favicon ? urlFor(s.favicon).url() : null;
    const ogImageUrl = s?.ogImage ? urlFor(s.ogImage).url() : null;
    const pageTitle = s?.seoTitle || "Premium Agricultural Exports from India";
    const description =
        s?.seoDescription ||
        "Oranthus is a certified Indian exporter of dehydrated vegetables, dried spices, and bulk agricultural commodities. Trusted by importers across Europe, the Middle East, and Southeast Asia for consistent quality and on-time container shipments.";

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: `Oranthus - ${pageTitle}`,
            template: "Oranthus - %s",
        },
        description,
        keywords: [
            "Indian agricultural exports",
            "dehydrated vegetables exporter India",
            "dried onion flakes export",
            "dried garlic powder exporter",
            "bulk spice exporter India",
            "FSSAI certified food exporter",
            "IEC certified exporter India",
            "B2B agri export India",
            "container shipment agricultural produce",
            "export grade dried vegetables",
            "merchant exporter India",
            "food grade packaging export",
        ],
        authors: [{ name: "Oranthus" }],
        creator: "Oranthus",
        publisher: "Oranthus",
        robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: SITE_URL,
            siteName: "Oranthus",
            title: `Oranthus - ${pageTitle}`,
            description,
            ...(ogImageUrl
                ? { images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Oranthus - Premium Agricultural Exports from India" }] }
                : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: `Oranthus - ${pageTitle}`,
            description,
            ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
        },
        ...(faviconUrl
            ? { icons: { icon: faviconUrl, shortcut: faviconUrl, apple: faviconUrl } }
            : {}),
        alternates: { canonical: SITE_URL },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const layoutData = await client.fetch(siteSettingsQuery);
    const siteSettings = layoutData?.settings;
    const logoUrl = siteSettings?.logo ? urlFor(siteSettings.logo).url() : null;
    const categories = layoutData?.categories || [];

    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}
            >
                <JsonLd siteSettings={siteSettings} logoUrl={logoUrl} />
                <PageLoader logoUrl={logoUrl} companyName={siteSettings?.companyName} />
                <ScrollProvider>
                    <Navbar siteSettings={siteSettings} logoUrl={logoUrl} />

                    <main className="min-h-screen">{children}</main>

                    <Footer siteSettings={siteSettings} logoUrl={logoUrl} categories={categories} />
                </ScrollProvider>
            </body>
        </html>
    );
}
