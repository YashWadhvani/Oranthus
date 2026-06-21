"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/ScrollProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  imageUrl?: string | null;
  imageAlt?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  ctaHref?: string | null;
  secondaryCtaText?: string | null;
  secondaryCtaHref?: string | null;
};

type SlideHeroProps = {
  slides?: Slide[] | null;
};

export default function SlideHero({ slides = null }: SlideHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const { scrollTo } = useLenis();
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});

  const activeSlides = slides && slides.length > 0 ? slides : [];

  useEffect(() => {
    setFailedSlides({});
  }, [slides]);

  useEffect(() => {
    if (!autoPlay || activeSlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const slide = activeSlides[currentSlide];

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const handleCTA = (href?: string | null, e?: React.MouseEvent) => {
    if (!href) return;
    if (e) e.preventDefault();

    if (typeof href === "string" && href.startsWith("#")) {
      scrollTo(href, { offset: -96 });
    }
  };

  return (
    <section id="home" style={{ scrollMarginTop: "6rem" }} className="relative overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={
              failedSlides[currentSlide] || !slide?.imageUrl
                ? "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1600&auto=format&fit=crop"
                : slide.imageUrl
            }
            alt={slide?.imageAlt || "Hero slide"}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            onError={() => {
              setFailedSlides((prev) => ({ ...prev, [currentSlide]: true }));
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.82)_0%,rgba(15,15,15,0.62)_42%,rgba(15,15,15,0.34)_70%,rgba(15,15,15,0.24)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,169,107,0.28),transparent_26%),radial-gradient(circle_at_left_center,rgba(255,255,255,0.08),transparent_26%)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10">
        <div className="container-width px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {slide?.eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#F0D7AA]">
                {slide.eyebrow}
              </p>
            )}

            {slide?.title && (
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1] tracking-tight text-white sm:text-6xl lg:text-[4.75rem]" style={{ fontFamily: "var(--font-playfair)" }}>
                {slide.title}
              </h1>
            )}

            {slide?.subtitle && (
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/82 sm:text-xl">
                {slide.subtitle}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4 sm:gap-5">
              {slide?.ctaText && (
                <Button
                  asChild
                  className="h-14 rounded-md bg-[#F4E6C6] px-8 text-sm font-medium text-[#1A1A1A] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-[#fff0d6] hover:translate-y-[-1px]"
                  onClick={(e) => handleCTA(slide?.ctaHref, e)}
                >
                  <a href={slide?.ctaHref || "#"}>
                    {slide.ctaText}
                  </a>
                </Button>
              )}

              {slide?.secondaryCtaText && (
                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-md border border-white/45 bg-white/6 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/12"
                  onClick={(e) => handleCTA(slide?.secondaryCtaHref, e)}
                >
                  <a href={slide?.secondaryCtaHref || "#"}>
                    {slide.secondaryCtaText}
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Navigation dots & arrows - only show if multiple slides */}
        {activeSlides.length > 1 && (
          <>
            <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
              {activeSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentSlide(index);
                  }}
                  className={`h-3 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-1/2 left-4 right-4 z-20 flex justify-between transform -translate-y-1/2 pointer-events-none">
              <button
                onClick={handlePrev}
                className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
