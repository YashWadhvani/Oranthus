import SlideHero from "@/components/home/SlideHero";
import Marquee from "@/components/home/Marquee";
import AnimatedStats from "@/components/home/AnimatedStats";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Categories from "@/components/home/Categories";
import Certifications from "@/components/home/Certifications";
import CTA from "@/components/home/CTA";
import TradeScaleSection from "@/components/home/TradeScaleSection";

import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";

export default async function HomePage() {
    const content = await client.fetch(homepageQuery);

    const homepage = content?.homepage;
    const about = content?.about;

    return (
        <>
            {/* Hero */}

            <SlideHero slides={homepage?.heroSlides ?? []} />

            {/* Marquee */}

            <Marquee items={homepage?.marqueeItems ?? []} />

            {/* Stats */}

            <AnimatedStats
                eyebrow={homepage?.statsEyebrow}
                title={homepage?.statsTitle}
                description={homepage?.statsDescription}
                stats={homepage?.stats ?? []}
            />

            {/* About Preview */}

            <About
                title={about?.overviewTitle}
                description={about?.overviewDescription}
                stats={about?.stats?.map((s: { value?: number; suffix?: string; label?: string }) => ({
                    value: `${s.value || 0}${s.suffix || ""}`,
                    label: s.label
                }))}
            />

            {/* Services */}

            <Services
                eyebrow={homepage?.servicesEyebrow}
                title={homepage?.servicesTitle}
                description={homepage?.servicesDescription}
                services={content?.services ?? []}
            />

            {/* Categories */}

            <Categories
                eyebrow={homepage?.categoriesEyebrow}
                title={homepage?.categoriesTitle}
                description={homepage?.categoriesDescription}
                categories={content?.categories ?? []}
            />

            {/* Trade Section */}

            <TradeScaleSection
                eyebrow={homepage?.tradeEyebrow}
                title={homepage?.tradeTitle}
                description={homepage?.tradeDescription}
                highlights={homepage?.tradeStoryHighlights}
                office={content?.contactInfo || content?.siteSettings}
            />

            {/* Certifications */}

            <Certifications
                eyebrow={homepage?.certificationsEyebrow}
                title={homepage?.certificationsTitle}
                description={homepage?.certificationsDescription}
                certifications={content?.certifications ?? []}
            />

            {/* CTA */}

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
