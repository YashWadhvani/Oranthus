// src/components/layout/Footer.tsx

import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

type ContactInfo = {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  whatsapp?: string | null;
};

type FooterProps = {
  contactInfo?: ContactInfo | null;
};

export default function Footer({ contactInfo }: FooterProps) {
  return (
    <footer className="border-t border-[#ECE8DF] bg-[#FAF8F5]">
      <div className="container-width py-20">
        
        <div className="grid gap-16 md:grid-cols-3">
          
          {/* Brand */}
          <div>
            <h2
              className="text-3xl font-semibold text-[#111111]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Oranthus
            </h2>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-[#555555] font-light">
              Premium exporters of high-quality dried products,
              delivering excellence, trust, and global standards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#111111]">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base text-[#555555] transition-colors hover:text-[#D9A96B] font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#111111]">
              Contact
            </h3>

            <div className="mt-6 space-y-4 text-base text-[#555555] font-light">
              <p>{contactInfo?.address || "Ahmedabad, Gujarat, India"}</p>
              <p>{contactInfo?.email || "contact@oranthus.com"}</p>
              <p>{contactInfo?.phone || "+91 98765 43210"}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-[#ECE8DF] pt-8 text-center">
          <p className="text-sm text-[#555555] font-light">
            © {new Date().getFullYear()} Oranthus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}