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
  ],
});