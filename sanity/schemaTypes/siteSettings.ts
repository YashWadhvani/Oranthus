// sanity/schemaTypes/siteSettings.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  groups: [
    {
      name: "branding",
      title: "Branding",
    },
    {
      name: "contact",
      title: "Contact",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "social",
      title: "Social Links",
    },
  ],

  fields: [
    // Branding

    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      group: "branding",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "branding",
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "branding",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "branding",
    }),

    // Contact

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      group: "contact",
    }),

    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
      group: "contact",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "text",
      group: "contact",
    }),

    defineField({
      name: "googleMapsLink",
      title: "Google Maps Link",
      type: "url",
      group: "contact",
    }),

    // SEO

    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
      group: "seo",
    }),

    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      group: "seo",
    }),

    defineField({
      name: "ogImage",
      title: "Default Open Graph Image",
      type: "image",
      group: "seo",
      options: {
        hotspot: true,
      },
    }),

    // Social

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "YouTube", value: "youtube" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
            }),

            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});