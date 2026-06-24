import SlideHero from "@/components/home/SlideHero";
import Marquee from "@/components/home/Marquee";
import AnimatedStats from "@/components/home/AnimatedStats";
import About from "@/components/home/About";
import TradeStory from "@/components/home/TradeStory";
import Services from "@/components/home/Services";
import Categories from "@/components/home/Categories";
import Certifications from "@/components/home/Certifications";
import CTA from "@/components/home/CTA";

import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export default async function HomePage() {
    const content = await client.fetch(homepageQuery);

    const homepage = content?.homepage;
    const about = content?.about;

    const logoUrl = siteSettingsLogo(content?.siteSettings);

    const ctaBgImageUrl = homepage?.ctaBgImage
        ? urlFor(homepage.ctaBgImage).url()
        : null;

    // Build the dynamic statistics array: try homepage stats first, then about stats.
    const rawStats = (homepage?.stats && homepage.stats.length > 0)
        ? homepage.stats
        : (about?.stats && about.stats.length > 0)
            ? about.stats
            : [];

    const stats = rawStats.map((s: { value?: number | string; suffix?: string; label?: string }) => ({
        value: s.value || 0,
        suffix: s.suffix || "",
        label: s.label
    }));

    return (
        <>
            {/* Hero */}
            <SlideHero slides={homepage?.heroSlides ?? []} />

            {/* Marquee */}
            <Marquee items={homepage?.marqueeItems ?? []} />

            {/* Stats (Performance Snapshot) */}
            {/* <AnimatedStats
                eyebrow={homepage?.statsEyebrow || "Performance Snapshot"}
                title={homepage?.statsTitle || "Trusted by importers across markets"}
                description={homepage?.statsDescription || "A concise view of our export scale, reliability, and delivery consistency."}
                stats={stats}
            /> */}

            {/* About Profile (Merged/Single Section) */}
            <About
                eyebrow={about?.overviewEyebrow || "Who We Are"}
                title={about?.overviewTitle || "Born in India. Built for the World."}
                description={about?.overviewDescription}
                stats={null}
                values={about?.values}
                sourcingPoints={about?.sourcingPoints}
            />

            {/* Trade Story (Scale & Trust) */}
            <TradeStory
                eyebrow={homepage?.tradeEyebrow}
                title={homepage?.tradeTitle}
                description={homepage?.tradeDescription}
                storyTitle={homepage?.tradeStoryTitle}
                storyDescription={homepage?.tradeStoryDescription}
                storyHighlights={homepage?.tradeStoryHighlights}
            />

            {/* Services */}
            <Services
                eyebrow="Our Services"
                title="Complete Export Solutions"
                description="End-to-end sourcing and export services designed to simplify your procurement needs."
                services={content?.services ?? []}
                columns={homepage?.servicesColumns}
            />

            {/* Categories */}
            <Categories
                eyebrow={homepage?.categoriesEyebrow || "Product Categories"}
                title={homepage?.categoriesTitle && homepage.categoriesTitle !== "Explore Our Products" ? homepage.categoriesTitle : "Explore Our Categories"}
                description={homepage?.categoriesDescription}
                categories={content?.categories ?? []}
                columns={homepage?.categoriesColumns}
            />

            {/* Certifications */}
            <Certifications
                eyebrow="Certifications"
                title="International Standards & Compliance"
                description="Trusted badges and approvals that reinforce our quality-first export process."
                certifications={content?.certifications ?? []}
                columns={homepage?.certificationsColumns}
            />

            {/* CTA */}
            <CTA
                eyebrow={homepage?.ctaEyebrow}
                title={homepage?.ctaTitle}
                description={homepage?.ctaDescription}
                buttonText={homepage?.ctaButtonText}
                buttonHref={homepage?.ctaButtonHref}
                bgImageUrl={ctaBgImageUrl}
            />
        </>
    );
}

function siteSettingsLogo(settings: any) {
    if (!settings?.logo) return null;
    try {
        return urlFor(settings.logo).url();
    } catch {
        return null;
    }
}
