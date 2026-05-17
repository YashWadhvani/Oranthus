import { defineType, defineField } from "sanity";

export default defineType({
  name: "certification",
  title: "Certifications",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Certification Title",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Certification Image",
      type: "image",
    }),

    defineField({
      name: "description",
      title: "Certification Description",
      type: "text",
    }),

    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
    }),

    defineField({
      name: "scope",
      title: "Scope",
      type: "text",
    }),

    defineField({
      name: "validity",
      title: "Validity",
      type: "string",
    }),

    defineField({
      name: "standards",
      title: "Standards",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});