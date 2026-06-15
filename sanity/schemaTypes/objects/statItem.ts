import { defineField, defineType } from "sanity";

export const statItem = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",

  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "number",
    }),

    defineField({
        name: "suffix",
        title: "Suffix",
        type: "string"
    }),

    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
  ],
});