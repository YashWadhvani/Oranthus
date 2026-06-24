import type { Metadata } from "next";
import "./globals.css";

import { inter, playfair } from "@/lib/fonts";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import PageLoader from "@/components/layout/PageLoader";

import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "ORANTHUS",
    description: "Born in India. Built for the World.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const siteSettings = await client.fetch(siteSettingsQuery);
    const logoUrl = siteSettings?.logo ? urlFor(siteSettings.logo).url() : null;

    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}
            >
                <PageLoader logoUrl={logoUrl} companyName={siteSettings?.companyName} />
                <ScrollProvider>
                    <Navbar siteSettings={siteSettings} logoUrl={logoUrl} />

                    <main className="min-h-screen">{children}</main>

                    <Footer siteSettings={siteSettings} logoUrl={logoUrl} />
                </ScrollProvider>
            </body>
        </html>
    );
}
