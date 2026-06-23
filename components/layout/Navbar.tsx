"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";

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
    const textMsg = encodeURIComponent("Hello Oranthus team, I would like to make an inquiry regarding your sourcing and export services.");
    const whatsappFabUrl = `${waUrl}?text=${textMsg}`;
    
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
        ? waUrl
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

            {/* Floating WhatsApp Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 30 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="fixed bottom-6 right-6 z-40"
                    >
                        {/* Ambient double pulse wave effect behind the FAB */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#25D366] z-[-1]"
                            animate={{
                                scale: [1, 1.35],
                                opacity: [0.4, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                ease: "easeOut"
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#25D366] z-[-1]"
                            animate={{
                                scale: [1, 1.35],
                                opacity: [0.4, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                delay: 1.25,
                                ease: "easeOut"
                            }}
                        />

                        {/* Floating button itself */}
                        <motion.a
                            href={whatsappFabUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 hover:bg-[#20ba5f] cursor-pointer"
                            aria-label="Contact us on WhatsApp"
                            whileHover="hover"
                            whileTap="tap"
                            variants={{
                                hover: {
                                    scale: 1.10,
                                    y: -2,
                                    boxShadow: "0 20px 35px rgba(37,211,102,0.45)"
                                },
                                tap: {
                                    scale: 0.95,
                                    y: 0
                                }
                            }}
                        >
                            {/* Inner icon with hover wiggle animation */}
                            <motion.div
                                variants={{
                                    hover: {
                                        rotate: [0, -12, 12, -8, 8, 0],
                                        transition: {
                                            duration: 0.5,
                                            ease: "easeInOut"
                                        }
                                    }
                                }}
                            >
                                <FaWhatsapp className="h-7 w-7" />
                            </motion.div>

                            {/* Static gold notification dot with a premium subtle pulse */}
                            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#D9A96B] border-2 border-white shadow-md flex items-center justify-center">
                                <span className="absolute inset-0 rounded-full bg-[#D9A96B] animate-ping opacity-35" />
                            </span>
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

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
