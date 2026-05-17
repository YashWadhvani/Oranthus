import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Products",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Product Name",
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
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "sourcing",
      title: "Sourcing",
      type: "text",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    defineField({
      name: "grade",
      title: "Grade",
      type: "string",
    }),

    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "packaging",
      title: "Packaging",
      type: "string",
    }),

    defineField({
      name: "moq",
      title: "Minimum Order Quantity",
      type: "string",
    }),

    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
    }),

    defineField({
      name: "moqNote",
      title: "MOQ Note",
      type: "text",
    }),

    defineField({
      name: "leadTime",
      title: "Lead Time",
      type: "string",
    }),

    defineField({
      name: "shelfLife",
      title: "Shelf Life",
      type: "string",
    }),

    defineField({
      name: "storageInstructions",
      title: "Storage Instructions",
      type: "text",
    }),

    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "certificationNotes",
      title: "Certification Notes",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});