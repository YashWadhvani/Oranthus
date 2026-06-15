import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
    }),

    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
    }),

    defineField({
      name: "packaging",
      title: "Packaging",
      type: "string",
    }),

    defineField({
      name: "moq",
      title: "MOQ",
      type: "string",
    }),

    defineField({
      name: "shelfLife",
      title: "Shelf Life",
      type: "string",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
  ],
});