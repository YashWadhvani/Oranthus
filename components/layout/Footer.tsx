import Link from "next/link";

import { SiteSettings } from "@/types/site-settings";

type FooterProps = {
    siteSettings?: SiteSettings | null;
};

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

export default function Footer({ siteSettings }: FooterProps) {
    return (
        <footer className="border-t border-[#ECE8DF] bg-[#FAF8F5]">
            <div className="container-width py-20">
                <div className="grid gap-16 md:grid-cols-3">
                    <div>
                        <h2
                            className="text-3xl font-semibold text-[#111111]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            {siteSettings?.companyName || "ORANTHUS"}
                        </h2>

                        <p className="mt-6 max-w-sm text-base leading-relaxed text-[#555555] font-light">
                            {siteSettings?.tagline ||
                                "Born in India. Built for the World."}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#111111]">
                            Quick Links
                        </h3>

                        <div className="mt-6 flex flex-col gap-4">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-base font-light text-[#555555] transition-colors hover:text-[#D9A96B]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#111111]">
                            Contact
                        </h3>

                        <div className="mt-6 space-y-4 text-base font-light text-[#555555]">
                            {siteSettings?.address && (
                                <p>{siteSettings.address}</p>
                            )}

                            {siteSettings?.email && (
                                <a
                                    href={`mailto:${siteSettings.email}`}
                                    className="block hover:text-[#D9A96B]"
                                >
                                    {siteSettings.email}
                                </a>
                            )}

                            {siteSettings?.phone && (
                                <a
                                    href={`tel:${siteSettings.phone}`}
                                    className="block hover:text-[#D9A96B]"
                                >
                                    {siteSettings.phone}
                                </a>
                            )}

                            {siteSettings?.website && (
                                <a
                                    href={siteSettings.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block hover:text-[#D9A96B]"
                                >
                                    {siteSettings.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-[#ECE8DF] pt-8 text-center">
                    <p className="text-sm font-light text-[#555555]">
                        © {new Date().getFullYear()}{" "}
                        {siteSettings?.companyName || "ORANTHUS"}. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
