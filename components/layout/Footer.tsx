import Link from "next/link";
import Image from "next/image";
import { SiteSettings } from "@/types/site-settings";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

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

    // Build premium social links list with fallbacks
    const socialLinks: { platform: string; url: string }[] = [];
    const rawWa = siteSettings?.whatsapp || "9316927113";
    const cleanWa = rawWa.replace(/\D/g, "");
    const waUrl = `https://wa.me/${cleanWa.startsWith("91") ? cleanWa : "91" + cleanWa}`;
    
    socialLinks.push({ platform: "whatsapp", url: waUrl });

    if (siteSettings?.socialLinks && siteSettings.socialLinks.length > 0) {
        siteSettings.socialLinks.forEach((link) => {
            if (link.platform === "whatsapp") {
                const idx = socialLinks.findIndex((s) => s.platform === "whatsapp");
                if (idx !== -1) socialLinks[idx].url = link.url;
            } else {
                socialLinks.push(link);
            }
        });
    }

    if (!socialLinks.some((s) => s.platform === "instagram")) {
        socialLinks.push({ platform: "instagram", url: "https://instagram.com/oranthus" });
    }
    if (!socialLinks.some((s) => s.platform === "linkedin")) {
        socialLinks.push({ platform: "linkedin", url: "https://linkedin.com/company/oranthus" });
    }

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
                        <div className="flex items-center gap-3.5 mt-2">
                            {socialLinks.map((social) => {
                                const platformName = social.platform.toLowerCase();
                                let icon = null;
                                let hoverClass = "";

                                if (platformName === "whatsapp") {
                                    icon = <FaWhatsapp className="h-5 w-5" />;
                                    hoverClass = "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]";
                                } else if (platformName === "instagram") {
                                    icon = <FaInstagram className="h-5 w-5" />;
                                    hoverClass = "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]";
                                } else if (platformName === "linkedin") {
                                    icon = <FaLinkedin className="h-5 w-5" />;
                                    hoverClass = "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]";
                                } else if (platformName === "facebook") {
                                    icon = <FaFacebookF className="h-5 w-5" />;
                                    hoverClass = "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]";
                                } else if (platformName === "youtube") {
                                    icon = <FaYoutube className="h-5 w-5" />;
                                    hoverClass = "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]";
                                } else if (platformName === "twitter" || platformName === "x") {
                                    icon = <FaTwitter className="h-5 w-5" />;
                                    hoverClass = "hover:bg-white hover:text-black hover:border-white";
                                }

                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 transition-all duration-300",
                                            hoverClass
                                        )}
                                        title={`Visit our ${social.platform}`}
                                    >
                                        {icon}
                                    </a>
                                );
                            })}
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
                        {siteSettings?.whatsapp && (
                            <div className="mt-6">
                                <a
                                    href={waUrl}
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
