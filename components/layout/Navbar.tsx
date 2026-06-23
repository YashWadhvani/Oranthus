"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/ScrollProvider";

import { SiteSettings } from "@/types/site-settings";

type NavbarProps = {
    siteSettings?: SiteSettings | null;
    logoUrl?: string | null;
};

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
];

const menuContainerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15
        }
    },
    exit: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
} as const;

const menuItemVariants = {
    initial: { opacity: 0, y: 25 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1] as const
        }
    },
    exit: { 
        opacity: 0, 
        y: 20,
        transition: {
            duration: 0.35,
            ease: "easeIn"
        }
    }
} as const;

const menuOverlayVariants = {
    initial: {
        opacity: 0,
        clipPath: "circle(0px at calc(100% - 40px) 40px)"
    },
    animate: {
        opacity: 1,
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        transition: {
            type: "tween",
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1] as const
        }
    },
    exit: {
        opacity: 0,
        clipPath: "circle(0px at calc(100% - 40px) 40px)",
        transition: {
            type: "tween",
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1] as const
        }
    }
} as const;

export default function Navbar({ siteSettings, logoUrl }: NavbarProps) {
    const companyName = siteSettings?.companyName || "ORANTHUS";
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { stop, start } = useLenis();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (isOpen) {
            stop();
            document.body.style.overflow = "hidden";
        } else {
            start();
            document.body.style.overflow = "";
        }
        return () => {
            start();
            document.body.style.overflow = "";
        };
    }, [isOpen, stop, start]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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

    const contactHref = siteSettings?.whatsapp
        ? `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, "")}`
        : siteSettings?.phone
          ? `tel:${siteSettings.phone}`
          : siteSettings?.email
            ? `mailto:${siteSettings.email}`
            : "/contact";

    const isExternal = contactHref.startsWith("http");

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-[#ECE8DF] bg-white/85 backdrop-blur-xl">
                <div className="container-width flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {logoUrl ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src={logoUrl}
                                    alt={companyName}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ) : null}
                        <span
                            className="text-2xl font-semibold tracking-wide text-[#111111] transition-colors duration-300 group-hover:text-[#D9A96B]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            {companyName}
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
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

                    {/* Desktop CTA Button */}
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

                    {/* Mobile menu trigger */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="rounded-md p-2 transition-colors duration-300 hover:bg-[#FAF8F5] text-[#111111]"
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuOverlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 z-[60] bg-[#FAF8F5] text-[#111111] flex flex-col justify-between overflow-y-auto shadow-2xl"
                        style={{ paddingTop: "env(safe-area-inset-top)" }}
                    >
                        {/* Ambient Glow */}
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#D9A96B]/5 blur-3xl pointer-events-none" />

                            {/* Top Bar matching Sticky Header */}
                            <div className="border-b border-[#ECE8DF] w-full bg-[#FAF8F5]/85 backdrop-blur-md sticky top-0 z-10">
                                <div className="container-width flex h-20 items-center justify-between">
                                    <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
                                        {logoUrl ? (
                                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                                <Image
                                                    src={logoUrl}
                                                    alt={companyName}
                                                    fill
                                                    className="object-contain"
                                                    priority
                                                />
                                            </div>
                                        ) : null}
                                        <span
                                            className="text-2xl font-semibold tracking-wide text-[#111111] transition-colors duration-300 group-hover:text-[#D9A96B]"
                                            style={{ fontFamily: "var(--font-playfair)" }}
                                        >
                                            {companyName}
                                        </span>
                                    </Link>
                                    
                                    {/* Close Button Inside the Overlay Top Bar */}
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-md p-2 transition-colors duration-300 text-[#111111] hover:bg-[#ECE8DF]/40"
                                        aria-label="Close menu"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Links and CTA / Social Footer */}
                            <div className="flex-1 flex flex-col justify-between container-width py-12 px-4 relative z-10">
                                {/* Navigation Links List */}
                                <motion.nav 
                                    variants={menuContainerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex flex-col gap-8 items-center justify-center my-auto py-8"
                                >
                                    {navLinks.map((link) => (
                                        <motion.div key={link.label} variants={menuItemVariants}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="relative group text-4xl font-medium tracking-wide text-[#111111] transition-colors duration-300 hover:text-[#D9A96B]"
                                                style={{ fontFamily: "var(--font-playfair)" }}
                                            >
                                                {link.label}
                                                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#D9A96B] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.nav>

                                {/* Footer / CTA & Social Links */}
                                <motion.div 
                                    variants={menuContainerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex flex-col gap-6 items-center w-full max-w-sm mx-auto mt-auto"
                                >
                                    <motion.div variants={menuItemVariants} className="w-full">
                                        <Button
                                            asChild
                                            className="w-full bg-[#D9A96B] text-white hover:bg-[#c89a5a] text-base py-6 rounded-xl shadow-md hover:shadow-[#D9A96B]/20 transition-all duration-300"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <a
                                                href={contactHref}
                                                target={isExternal ? "_blank" : undefined}
                                                rel={isExternal ? "noreferrer" : undefined}
                                            >
                                                Get In Touch
                                            </a>
                                        </Button>
                                    </motion.div>

                                    <motion.div variants={menuItemVariants} className="w-full border-t border-[#ECE8DF] pt-6">
                                        <p className="text-xs uppercase tracking-wider text-[#555555] font-semibold mb-4 text-center">
                                            Connect With Us
                                        </p>
                                        <div className="flex items-center justify-center gap-4">
                                            {socialLinks.map((social) => {
                                                const platformName = social.platform.toLowerCase();
                                                let icon = null;
                                                let hoverClass = "";

                                                if (platformName === "whatsapp") {
                                                    icon = (
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.718.737 5.33 2.135 7.623L.855 23.87a.5.5 0 00.658.658l6.183-1.624a9.87 9.87 0 007.623 2.135c5.45 0 9.85-4.4 9.85-9.85s-4.4-9.85-9.85-9.85zm0 18.25c-2.324 0-4.52-.629-6.404-1.83l-.46.24-1.598.42.42-1.598.24-.46a9.35 9.35 0 011.83-6.404c0 4.873 3.978 8.851 8.851 8.851s8.851-3.978 8.851-8.851-3.978-8.851-8.851-8.851z"/>
                                                        </svg>
                                                    );
                                                    hoverClass = "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]";
                                                } else if (platformName === "instagram") {
                                                    icon = (
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                                        </svg>
                                                    );
                                                    hoverClass = "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]";
                                                } else if (platformName === "linkedin") {
                                                    icon = (
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                            <rect width="4" height="12" x="2" y="9" />
                                                            <circle cx="4" cy="4" r="2" />
                                                        </svg>
                                                    );
                                                    hoverClass = "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]";
                                                } else if (platformName === "facebook") {
                                                    icon = (
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                                        </svg>
                                                    );
                                                    hoverClass = "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]";
                                                } else if (platformName === "youtube") {
                                                    icon = (
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                                                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                                        </svg>
                                                    );
                                                    hoverClass = "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]";
                                                } else if (platformName === "twitter" || platformName === "x") {
                                                    icon = (
                                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                                        </svg>
                                                    );
                                                    hoverClass = "hover:bg-white hover:text-black hover:border-white";
                                                }

                                                return (
                                                    <a
                                                        key={social.platform}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={cn(
                                                            "flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#ECE8DF] text-[#555555] transition-all duration-300",
                                                            hoverClass
                                                        )}
                                                        title={`Visit our ${social.platform}`}
                                                    >
                                                        {icon}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
