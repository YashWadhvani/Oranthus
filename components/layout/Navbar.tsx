"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { SiteSettings } from "@/types/site-settings";

type NavbarProps = {
    siteSettings?: SiteSettings | null;
};

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar({ siteSettings }: NavbarProps) {
    const companyName = siteSettings?.companyName || "ORANTHUS";

    const contactHref = siteSettings?.whatsapp
        ? `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, "")}`
        : siteSettings?.phone
          ? `tel:${siteSettings.phone}`
          : siteSettings?.email
            ? `mailto:${siteSettings.email}`
            : "/contact";

    const isExternal = contactHref.startsWith("http");

    return (
        <header className="sticky top-0 z-50 border-b border-[#ECE8DF] bg-white/85 backdrop-blur-xl">
            <div className="container-width flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <span
                        className="text-2xl font-semibold tracking-wide text-[#111111]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        {companyName}
                    </span>
                </Link>

                <nav className="hidden items-center gap-12 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-[#555555] transition-colors duration-300 hover:text-[#D9A96B]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:block">
                    <Button
                        asChild
                        className="bg-[#D9A96B] text-white hover:bg-[#c89a5a]"
                    >
                        <a
                            href={contactHref}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                        >
                            Get In Touch
                        </a>
                    </Button>
                </div>

                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="rounded-md p-2 transition hover:bg-[#FAF8F5]">
                                <Menu className="h-6 w-6 text-[#111111]" />
                            </button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-[300px] border-l border-[#ECE8DF] bg-white"
                        >
                            <div className="mt-12 flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="text-lg font-medium text-[#111111] transition-colors hover:text-[#D9A96B]"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <Button
                                    asChild
                                    className="mt-4 bg-[#D9A96B] text-white hover:bg-[#c89a5a]"
                                >
                                    <a
                                        href={contactHref}
                                        target={
                                            isExternal ? "_blank" : undefined
                                        }
                                        rel={
                                            isExternal
                                                ? "noreferrer"
                                                : undefined
                                        }
                                    >
                                        Get In Touch
                                    </a>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
