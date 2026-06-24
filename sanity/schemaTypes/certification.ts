import { defineType, defineField } from "sanity";

export default defineType({
  name: "certification",
  title: "Certification / License",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "authority", title: "Authority" },
    { name: "documents", title: "Documents" },
    { name: "status", title: "Status" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- General Group ---
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      group: "general",
    }),
    defineField({
      name: "type",
      title: "Classification Type",
      type: "string",
      group: "general",
      options: {
        list: [
          { title: "License", value: "License" },
          { title: "Certification", value: "Certification" },
          { title: "Registration", value: "Registration" },
          { title: "Compliance", value: "Compliance" },
          { title: "Approval", value: "Approval" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badgeText",
      title: "Trust Badge Text",
      type: "string",
      group: "general",
      description: "Examples: Government Approved, Export Authorized, Food Safety Compliant, International Standard",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      group: "general",
      initialValue: 0,
    }),

    // --- Authority Group ---
    defineField({
      name: "issuingAuthority",
      title: "Issuing Authority",
      type: "string",
      group: "authority",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "certificateNumber",
      title: "Certificate / License Number",
      type: "string",
      group: "authority",
    }),
    defineField({
      name: "issuingCountry",
      title: "Issuing Country",
      type: "string",
      group: "authority",
      initialValue: "India",
    }),
    defineField({
      name: "issueDate",
      title: "Issue Date",
      type: "date",
      group: "authority",
    }),
    defineField({
      name: "expiryDate",
      title: "Expiry Date",
      type: "date",
      group: "authority",
      hidden: ({ parent }) => !!parent?.isLifetime,
    }),
    defineField({
      name: "isLifetime",
      title: "Is Lifetime / Permanent Validity",
      type: "boolean",
      group: "authority",
      initialValue: false,
    }),

    // --- Documents Group ---
    defineField({
      name: "logo",
      title: "Authority Logo / Stamp",
      type: "image",
      group: "documents",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "documents",
      options: { hotspot: true },
    }),

    // --- Status Group ---
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      group: "status",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active / Published",
      type: "boolean",
      group: "status",
      initialValue: true,
    }),

    // --- SEO Group ---
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      issuingAuthority: "issuingAuthority",
      media: "logo",
    },
    prepare({ title, type, issuingAuthority, media }) {
      return {
        title: title || "Untitled Certification",
        subtitle: `${type || "No Type"} | Auth: ${issuingAuthority || "Unknown"}`,
        media,
      };
    },
  },
});