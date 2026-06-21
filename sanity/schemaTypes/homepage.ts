import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [{ type: "heroSection" }],
    }),

    defineField({
      name: "marqueeItems",
      title: "Marquee Items",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "statItem" }],
    }),

    defineField({
      name: "featuredCategories",
      title: "Featured Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    }),

    defineField({
      name: "featuredServices",
      title: "Featured Services",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
        },
      ],
    }),

    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    }),

    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
    }),

    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
    }),

    defineField({
      name: "ctaButtonHref",
      title: "CTA Button Link",
      type: "string",
    }),

    defineField({
      name: "categoriesEyebrow",
      title: "Categories Eyebrow",
      type: "string",
    }),

    defineField({
      name: "categoriesTitle",
      title: "Categories Title",
      type: "string",
    }),

    defineField({
      name: "categoriesDescription",
      title: "Categories Description",
      type: "text",
    }),

    defineField({
      name: "whyChooseUsEyebrow",
      title: "Why Choose Us Eyebrow",
      type: "string",
    }),

    defineField({
      name: "whyChooseUsTitle",
      title: "Why Choose Us Title",
      type: "string",
    }),

    defineField({
      name: "whyChooseUsDescription",
      title: "Why Choose Us Description",
      type: "text",
    }),

    defineField({
      name: "whyChooseUsFeatures",
      title: "Why Choose Us Features",
      type: "array",
      of: [{ type: "featureItem" }],
    }),

    defineField({
      name: "certificationsEyebrow",
      title: "Certifications Eyebrow",
      type: "string",
    }),

    defineField({
      name: "certificationsTitle",
      title: "Certifications Title",
      type: "string",
    }),

    defineField({
      name: "certificationsDescription",
      title: "Certifications Description",
      type: "text",
    }),

    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
    }),

    defineField({
      name: "servicesEyebrow",
      title: "Services Eyebrow",
      type: "string",
    }),

    defineField({
      name: "servicesTitle",
      title: "Services Title",
      type: "string",
    }),

    defineField({
      name: "servicesDescription",
      title: "Services Description",
      type: "text",
    }),

    defineField({
      name: "statsEyebrow",
      title: "Stats Eyebrow",
      type: "string",
    }),

    defineField({
      name: "statsTitle",
      title: "Stats Title",
      type: "string",
    }),

    defineField({
      name: "statsDescription",
      title: "Stats Description",
      type: "text",
    }),

    defineField({
      name: "tradeEyebrow",
      title: "Trade Eyebrow",
      type: "string",
    }),

    defineField({
      name: "tradeTitle",
      title: "Trade Title",
      type: "string",
    }),

    defineField({
      name: "tradeDescription",
      title: "Trade Description",
      type: "text",
    }),

    defineField({
      name: "tradeStoryTitle",
      title: "Trade Story Title",
      type: "string",
    }),

    defineField({
      name: "tradeStoryDescription",
      title: "Trade Story Description",
      type: "text",
    }),

    defineField({
      name: "tradeStoryHighlights",
      title: "Trade Story Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});