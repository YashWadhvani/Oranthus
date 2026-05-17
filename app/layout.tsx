// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import { inter, playfair } from "../lib/fonts";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Oranthus | Premium Exporters",
  description:
    "Premium exporters of dried products delivering quality and trust worldwide.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await client.fetch(homepageQuery);
  const contactInfo = content?.contactInfo;

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}>
        <ScrollProvider>
          <Navbar contactInfo={contactInfo} />

          <main className="min-h-screen">{children}</main>

          <Footer contactInfo={contactInfo} />
        </ScrollProvider>
      </body>
    </html>
  );
}