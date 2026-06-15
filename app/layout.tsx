import type { Metadata } from "next";
import "./globals.css";

import { inter, playfair } from "@/lib/fonts";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/ScrollProvider";

import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

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

    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}
            >
                <ScrollProvider>
                    <Navbar siteSettings={siteSettings} />

                    <main className="min-h-screen">{children}</main>

                    <Footer siteSettings={siteSettings} />
                </ScrollProvider>
            </body>
        </html>
    );
}
