import Hero from "../components/home/Hero";
import About from "@/components/home/About";
import Categories from "@/components/home/Categories";
import Certifications from "@/components/home/Certifications";
import CTA from "@/components/home/CTA";
import WhyChooseUs from "@/components/home/WhyChooseUs";

import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
  const content = await client.fetch(homepageQuery);
  const homepage = content?.homepage;

  return (
    <>
      <Hero
        eyebrow={homepage?.heroEyebrow}
        title={homepage?.heroTitle}
        subtitle={homepage?.heroSubtitle}
        ctaText={homepage?.heroCtaText}
        secondaryCtaText={homepage?.heroSecondaryCtaText}
        secondaryCtaHref={homepage?.heroSecondaryCtaHref}
        heroImage={homepage?.heroImageUrl}
        heroImageAlt={homepage?.heroImageAlt}
        stats={homepage?.heroStats}
      />

      <About
        eyebrow={homepage?.aboutEyebrow}
        title={homepage?.aboutTitle}
        description={homepage?.aboutDescription}
        stats={homepage?.aboutStats}
      />

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