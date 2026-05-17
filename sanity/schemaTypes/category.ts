import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Categories",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),

    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
    }),

    defineField({
      name: "description",
      title: "Category Description",
      type: "text",
    }),
  ],
});