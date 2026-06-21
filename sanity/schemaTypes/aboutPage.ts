import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",

  fields: [
    defineField({
      name: "overviewTitle",
      title: "Overview Title",
      type: "string",
    }),

    defineField({
      name: "overviewDescription",
      title: "Overview Description",
      type: "text",
    }),

    defineField({
      name: "vision",
      title: "Vision",
      type: "text",
    }),

    defineField({
      name: "mission",
      title: "Mission",
      type: "text",
    }),

    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [{ type: "featureItem" }],
    }),

    defineField({
      name: "founderName",
      title: "Founder Name",
      type: "string",
    }),

    defineField({
      name: "founderRole",
      title: "Founder Role",
      type: "string",
    }),

    defineField({
      name: "founderMessage",
      title: "Founder Message",
      type: "text",
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "statItem" }],
    }),

    defineField({
      name: "visionEyebrow",
      title: "Vision Eyebrow",
      type: "string",
    }),

    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
    }),

    defineField({
      name: "missionEyebrow",
      title: "Mission Eyebrow",
      type: "string",
    }),

    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
    }),

    defineField({
      name: "founderEyebrow",
      title: "Founder Eyebrow",
      type: "string",
    }),

    defineField({
      name: "founderTitle",
      title: "Founder Title",
      type: "string",
    }),

    defineField({
      name: "valuesEyebrow",
      title: "Values Eyebrow",
      type: "string",
    }),

    defineField({
      name: "valuesTitle",
      title: "Values Title",
      type: "string",
    }),

    defineField({
      name: "valuesDescription",
      title: "Values Description",
      type: "text",
    }),

    defineField({
      name: "sourcingEyebrow",
      title: "Sourcing Eyebrow",
      type: "string",
    }),

    defineField({
      name: "sourcingTitle",
      title: "Sourcing Title",
      type: "string",
    }),

    defineField({
      name: "sourcingDescription",
      title: "Sourcing Description",
      type: "text",
    }),

    defineField({
      name: "sourcingPoints",
      title: "Sourcing Points",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});