"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

type ContactInfo = {
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
};

type NavbarProps = {
  contactInfo?: ContactInfo | null;
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ contactInfo }: NavbarProps) {
  const contactHref = contactInfo?.whatsapp
    ? `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`
    : contactInfo?.phone
      ? `tel:${contactInfo.phone}`
      : contactInfo?.email
        ? `mailto:${contactInfo.email}`
        : "/contact";
  const isExternalContact = contactHref.startsWith("http");

  return (
    <header className="sticky top-0 z-50 border-b border-[#ECE8DF] bg-[#FFFFFF]/85 backdrop-blur-xl">
      <div className="container-width flex h-20 items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-2xl font-semibold tracking-wide text-[#111111]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Oranthus
          </span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild className="bg-[#D9A96B] text-white hover:bg-[#c89a5a]">
            <a
              href={contactHref}
              target={isExternalContact ? "_blank" : undefined}
              rel={isExternalContact ? "noreferrer" : undefined}
            >
              Get In Touch
            </a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="rounded-md p-2 transition hover:bg-[#FAF8F5]">
                <Menu className="h-6 w-6 text-[#111111]" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] border-l border-[#ECE8DF] bg-[#FFFFFF]">
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

                <Button asChild className="mt-4 bg-[#D9A96B] text-white hover:bg-[#c89a5a]">
                  <a
                    href={contactHref}
                    target={isExternalContact ? "_blank" : undefined}
                    rel={isExternalContact ? "noreferrer" : undefined}
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