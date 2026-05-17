import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",

  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),

    defineField({
      name: "mapEmbedUrl",
      title: "Map Embed URL",
      type: "url",
      description: "Use a Google Maps embed URL. Regular share/place URLs are converted on the website when possible.",
    }),

    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "string",
    }),
  ],
});
