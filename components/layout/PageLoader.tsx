"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type PageLoaderProps = {
  logoUrl?: string | null;
  companyName?: string | null;
};

export default function PageLoader({ logoUrl, companyName }: PageLoaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Initial page load (keep for 2.2 seconds for premium brand intro animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      // Wait for the slide-up transition to finish before marking initial load as completely done
      const innerTimer = setTimeout(() => {
        setIsInitial(false);
      }, 800);
      return () => clearTimeout(innerTimer);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Intercept internal clicks to slide down the loader BEFORE navigating
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Classify internal links vs external links
      const isInternal =
        (href.startsWith("/") && !href.startsWith("//")) ||
        href.startsWith(window.location.origin);

      // Exclude external links, target="_blank", mailto/tel protocols, and studio path
      if (
        !isInternal ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("/studio") ||
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      // Check if it's the exact same pathname (prevent infinite loop / double loaders)
      try {
        const targetUrl = new URL(href, window.location.href);
        if (targetUrl.pathname === window.location.pathname) {
          if (targetUrl.hash) return; // Let page-scroll hash navigation proceed natively
        }
      } catch (err) {
        // Safe fallback
      }

      // Intercept navigation
      e.preventDefault();
      setIsNavigating(true);

      // Slide down animation duration is 600ms, trigger route change just before it finishes
      setTimeout(() => {
        router.push(href);
      }, 500);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [router]);

  // 2. Page transition slide-up trigger on pathname changes
  useEffect(() => {
    if (pathname !== lastPathnameRef.current) {
      lastPathnameRef.current = pathname;

      // Page change has finished. Keep the loader down for a 200ms buffer, then slide up.
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const showLoader = isInitialLoading || isNavigating;

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5] text-[#111111] transition-transform duration-600 ease-[cubic-bezier(0.85,0,0.15,1)] ${showLoader ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
        }`}
    >
      <style>{`
        @keyframes drawCircle {
          0% { stroke-dashoffset: 289; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseLogo {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes revealText {
          0% { opacity: 0; transform: translateY(16px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-draw-circle {
          animation: drawCircle 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-pulse-logo {
          animation: pulseLogo 2s ease-in-out infinite;
        }
        .animate-reveal-title {
          opacity: 0;
          animation: revealText 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.3s forwards;
        }
        .animate-reveal-subtitle {
          opacity: 0;
          animation: revealText 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.6s forwards;
        }
      `}</style>

      {/* Subtle brand color glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,169,107,0.06),transparent_70%)]" />

      <div
        className={`relative flex flex-col items-center justify-center z-10 transition-all duration-500 ${showLoader ? "opacity-100 scale-100" : isInitial ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100"
          }`}
      >
        <div className="relative flex h-36 w-36 items-center justify-center">
          {/* Animated circular progress ring */}
          <svg className="absolute h-36 w-36 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-[#ECE8DF]/45 fill-none"
              strokeWidth="1.5"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              className={`stroke-[#D9A96B] fill-none ${isInitialLoading ? "animate-draw-circle" : ""
                }`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="289"
              strokeDashoffset={isInitialLoading ? "289" : "0"}
            />
          </svg>

          {/* Inner dot container with logo */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_12px_40px_rgba(217,169,107,0.08)] border border-[#ECE8DF]/45 animate-pulse-logo">
            {logoUrl ? (
              <div className="relative h-16 w-16">
                <Image
                  src={logoUrl}
                  alt={companyName || "Logo"}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <span className="text-xl font-semibold tracking-wider text-[#D9A96B]">O</span>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <h2 className={`text-sm font-semibold tracking-[0.3em] uppercase text-[#111111] ${isInitialLoading ? "animate-reveal-title" : "opacity-100"
            }`}>
            {companyName || "Oranthus"}
          </h2>
          <p className={`mt-2 text-[10px] tracking-[0.2em] uppercase text-[#D9A96B] font-medium ${isInitialLoading ? "animate-reveal-subtitle" : "opacity-100"
            }`}>
            Sourcing & Export
          </p>
        </div>
      </div>
    </div>
  );
}
