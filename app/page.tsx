import SlideHero from "../components/home/SlideHero";
import Marquee from "../components/home/Marquee";
import AnimatedStats from "../components/home/AnimatedStats";
import About from "../components/home/About";
import TradeScaleSection from "@/components/home/TradeScaleSection";
import Categories from "@/components/home/Categories";
import Certifications from "@/components/home/Certifications";
import CTA from "@/components/home/CTA";
import OperationsSection from "@/components/home/OperationsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import ProductCategories from "@/components/home/ProductCategories";

import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
  const content = await client.fetch(homepageQuery);
  const homepage = content?.homepage;
  const heroSlides =
    homepage?.heroSlides && homepage.heroSlides.length > 0
      ? homepage.heroSlides
      : homepage?.heroTitle || homepage?.heroSubtitle || homepage?.heroEyebrow
      ? [
          {
            imageUrl: homepage?.heroImageUrl,
            imageAlt: homepage?.heroImageAlt,
            eyebrow: homepage?.heroEyebrow,
            title: homepage?.heroTitle,
            subtitle: homepage?.heroSubtitle,
            ctaText: homepage?.heroCtaText,
            ctaHref: "#products",
            secondaryCtaText: homepage?.heroSecondaryCtaText,
            secondaryCtaHref: homepage?.heroSecondaryCtaHref,
          },
        ]
      : null;

  return (
    <>
      <SlideHero slides={heroSlides} />

      <Marquee items={content?.homepage?.marqueeItems} />

      <AnimatedStats stats={content?.homepage?.statCounters} />

      <About
        eyebrow={homepage?.aboutEyebrow}
        title={homepage?.aboutTitle}
        description={homepage?.aboutDescription}
        stats={homepage?.aboutStats}
      />

      <ProductCategories
        eyebrow={homepage?.productCategoriesEyebrow}
        title={homepage?.productCategoriesTitle}
        description={homepage?.productCategoriesDescription}
        categories={homepage?.productCategories}
      />

      <Services
        eyebrow={homepage?.servicesEyebrow}
        title={homepage?.servicesTitle}
        description={homepage?.servicesDescription}
        services={homepage?.services}
      />

      <TradeScaleSection office={content?.contactInfo} />

      <Categories
        eyebrow={homepage?.categoriesEyebrow}
        title={homepage?.categoriesTitle}
        description={homepage?.categoriesDescription}
        categories={content?.categories}
      />

      <WhyChooseUs
        eyebrow={homepage?.whyChooseUsEyebrow}
        title={homepage?.whyChooseUsTitle}
        description={homepage?.whyChooseUsDescription}
        features={homepage?.whyChooseUsFeatures}
      />

      <OperationsSection
      />

      <Certifications
        eyebrow={homepage?.certificationsEyebrow}
        title={homepage?.certificationsTitle}
        description={homepage?.certificationsDescription}
        certifications={content?.certifications}
      />

      <CTA
        eyebrow={homepage?.ctaEyebrow}
        title={homepage?.ctaTitle}
        description={homepage?.ctaDescription}
        buttonText={homepage?.ctaButtonText}
        buttonHref={homepage?.ctaButtonHref}
      />
    </>
  );
}