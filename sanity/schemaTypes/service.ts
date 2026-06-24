import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Select an icon or enter a custom Lucide icon name (e.g. truck, ship, globe, search, box)",
      options: {
        list: [
          { title: "Search (Sourcing)", value: "search" },
          { title: "Ship (Cargo/Logistics)", value: "ship" },
          { title: "Truck (Transit/Delivery)", value: "truck" },
          { title: "Globe (Global Outreach)", value: "globe" },
          { title: "Users (Supplier Network)", value: "users" },
          { title: "Check Circle (Quality Audits)", value: "checkCircle" },
          { title: "File Check / Text (Documentation)", value: "fileText" },
          { title: "Box / Packages (Custom Packing)", value: "box" },
          { title: "Zap (Fast Execution)", value: "zap" },
          { title: "Shield Check (Compliance)", value: "shieldCheck" },
          { title: "Clipboard Check (Specifications)", value: "clipboardCheck" },
          { title: "Trending Up (Market Scale)", value: "trendingUp" },
        ],
      },
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
  ],
});