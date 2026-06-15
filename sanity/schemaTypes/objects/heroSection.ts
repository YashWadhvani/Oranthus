import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",

  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),

    defineField({
      name: "primaryCtaText",
      title: "Primary CTA Text",
      type: "string",
    }),

    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Link",
      type: "string",
    }),

    defineField({
      name: "secondaryCtaText",
      title: "Secondary CTA Text",
      type: "string",
    }),

    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA Link",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});