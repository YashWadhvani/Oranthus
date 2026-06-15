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

            <AnimatedStats stats={homepage?.stats ?? []} />

            {/* About Preview */}

            <About
                title={about?.overviewTitle}
                description={about?.overviewDescription}
                stats={about?.stats}
            />

            {/* Services */}

            <Services services={homepage?.featuredServices ?? []} />

            {/* Categories */}

            <Categories categories={homepage?.featuredCategories ?? []} />

            {/* Trade Section */}

            <TradeScaleSection office={content?.siteSettings} />

            {/* Certifications */}

            <Certifications certifications={content?.certifications ?? []} />

            {/* CTA */}

            <CTA
                title={homepage?.ctaTitle}
                description={homepage?.ctaDescription}
                buttonText={homepage?.ctaButtonText}
                buttonHref={homepage?.ctaButtonHref}
            />
        </>
    );
}
