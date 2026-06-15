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
  ],
});