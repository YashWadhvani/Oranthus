import Link from "next/link";
import Image from "next/image";
import { SiteSettings } from "@/types/site-settings";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

type FooterProps = {
    siteSettings?: SiteSettings | null;
    logoUrl?: string | null;
};

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

const categoryLinks = [
    { label: "Dehydrated Onions", href: "/products/dried-onions" },
    { label: "Dehydrated Garlic", href: "/products/dehydrated-garlic" },
    { label: "Spices & Seasonings", href: "/products/spices" },
    { label: "Explore All Categories", href: "/products" },
];

export default function Footer({ siteSettings, logoUrl }: FooterProps) {
    const companyName = siteSettings?.companyName || "ORANTHUS";
    const tagline = siteSettings?.tagline || "Born in India. Built for the World.";

    const whatsappNumber = siteSettings?.whatsapp
        ? siteSettings.whatsapp.replace(/\D/g, "")
        : null;

    return (
        <footer className="border-t border-neutral-800 bg-[#111111] text-neutral-400">
            {/* Top Grid Area */}
            <div className="container-width py-20">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Column 1: Brand & Logo */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-3 group w-max">
                            {logoUrl ? (
                                <div className="relative h-9 w-9 overflow-hidden rounded bg-white p-0.5">
                                    <Image
                                        src={logoUrl}
                                        alt={companyName}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : null}
                            <span
                                className="text-2xl font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-[#D9A96B]"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                {companyName}
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-neutral-400 font-light max-w-xs">
                            {tagline}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            {/* WhatsApp Direct */}
                            {whatsappNumber && (
                                <a
                                    href={`https://wa.me/${whatsappNumber}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
                                    title="Chat on WhatsApp"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.718.737 5.33 2.135 7.623L.855 23.87a.5.5 0 00.658.658l6.183-1.624a9.87 9.87 0 007.623 2.135c5.45 0 9.85-4.4 9.85-9.85s-4.4-9.85-9.85-9.85zm0 18.25c-2.324 0-4.52-.629-6.404-1.83l-.46.24-1.598.42.42-1.598.24-.46a9.35 9.35 0 011.83-6.404c0 4.873 3.978 8.851 8.851 8.851s8.851-3.978 8.851-8.851-3.978-8.851-8.851-8.851z"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Categories */}
                    <div>
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-6">
                            Export Offerings
                        </h4>
                        <div className="flex flex-col gap-4">
                            {categoryLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-light text-neutral-400 hover:text-[#D9A96B] transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Quick Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-6">
                            Company Link
                        </h4>
                        <div className="flex flex-col gap-4">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-light text-neutral-400 hover:text-[#D9A96B] transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Contact & Support */}
                    <div>
                        <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-6">
                            Trade Desk
                        </h4>
                        <div className="flex flex-col gap-4 text-sm font-light leading-relaxed">
                            {siteSettings?.address && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 shrink-0 text-[#D9A96B] mt-0.5" />
                                    <span>{siteSettings.address}</span>
                                </div>
                            )}
                            {siteSettings?.email && (
                                <a
                                    href={`mailto:${siteSettings.email}`}
                                    className="flex items-center gap-3 hover:text-white transition-colors"
                                >
                                    <Mail className="h-5 w-5 shrink-0 text-[#D9A96B]" />
                                    <span>{siteSettings.email}</span>
                                </a>
                            )}
                            {siteSettings?.phone && (
                                <a
                                    href={`tel:${siteSettings.phone}`}
                                    className="flex items-center gap-3 hover:text-white transition-colors"
                                >
                                    <Phone className="h-5 w-5 shrink-0 text-[#D9A96B]" />
                                    <span>{siteSettings.phone}</span>
                                </a>
                            )}
                        </div>

                        {/* WhatsApp CTA Button */}
                        {whatsappNumber && (
                            <div className="mt-6">
                                <a
                                    href={`https://wa.me/${whatsappNumber}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba5f] transition-all duration-300 shadow-md shadow-[#25D366]/10"
                                >
                                    <span>WhatsApp Trade Desk</span>
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Area */}
                <div className="mt-16 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-500">
                    <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
                    <p className="flex items-center gap-1.5 uppercase tracking-widest text-[9px] text-neutral-400">
                        <span>Born in India</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D9A96B]" />
                        <span>Built for the World</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
