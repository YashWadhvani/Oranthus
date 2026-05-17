import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
    }),

    defineField({
      name: "heroCtaText",
      title: "Hero Primary CTA Text",
      type: "string",
    }),

    defineField({
      name: "heroSecondaryCtaText",
      title: "Hero Secondary CTA Text",
      type: "string",
    }),

    defineField({
      name: "heroSecondaryCtaHref",
      title: "Hero Secondary CTA Link",
      type: "string",
    }),

    defineField({
      name: "heroStats",
      title: "Hero Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "aboutEyebrow",
      title: "About Eyebrow",
      type: "string",
    }),

    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "string",
    }),

    defineField({
      name: "aboutDescription",
      title: "About Description",
      type: "text",
    }),

    defineField({
      name: "aboutVisionEyebrow",
      title: "About Vision Eyebrow",
      type: "string",
    }),

    defineField({
      name: "aboutVisionTitle",
      title: "About Vision Title",
      type: "string",
    }),

    defineField({
      name: "aboutVisionDescription",
      title: "About Vision Description",
      type: "text",
    }),

    defineField({
      name: "aboutMissionEyebrow",
      title: "About Mission Eyebrow",
      type: "string",
    }),

    defineField({
      name: "aboutMissionTitle",
      title: "About Mission Title",
      type: "string",
    }),

    defineField({
      name: "aboutMissionDescription",
      title: "About Mission Description",
      type: "text",
    }),

    defineField({
      name: "aboutValuesEyebrow",
      title: "About Values Eyebrow",
      type: "string",
    }),

    defineField({
      name: "aboutValuesTitle",
      title: "About Values Title",
      type: "string",
    }),

    defineField({
      name: "aboutValuesDescription",
      title: "About Values Description",
      type: "text",
    }),

    defineField({
      name: "aboutValues",
      title: "About Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Value Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Value Description",
              type: "text",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Shield Check", value: "shieldCheck" },
                  { title: "Handshake", value: "handshake" },
                  { title: "Leaf", value: "leaf" },
                  { title: "Globe", value: "globe" },
                  { title: "Sparkles", value: "sparkles" },
                ],
              },
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "aboutFounderEyebrow",
      title: "About Founder Eyebrow",
      type: "string",
    }),

    defineField({
      name: "aboutFounderTitle",
      title: "About Founder Title",
      type: "string",
    }),

    defineField({
      name: "aboutFounderName",
      title: "Founder Name",
      type: "string",
    }),

    defineField({
      name: "aboutFounderRole",
      title: "Founder Role",
      type: "string",
    }),

    defineField({
      name: "aboutFounderMessage",
      title: "Founder Message",
      type: "text",
    }),

    defineField({
      name: "aboutSourcingEyebrow",
      title: "About Sourcing Eyebrow",
      type: "string",
    }),

    defineField({
      name: "aboutSourcingTitle",
      title: "About Sourcing Title",
      type: "string",
    }),

    defineField({
      name: "aboutSourcingDescription",
      title: "About Sourcing Description",
      type: "text",
    }),

    defineField({
      name: "aboutSourcingPoints",
      title: "About Sourcing Points",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "aboutStats",
      title: "About Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "categoriesEyebrow",
      title: "Categories Eyebrow",
      type: "string",
    }),

    defineField({
      name: "categoriesTitle",
      title: "Categories Title",
      type: "string",
    }),

    defineField({
      name: "categoriesDescription",
      title: "Categories Description",
      type: "text",
    }),

    defineField({
      name: "whyChooseUsEyebrow",
      title: "Why Choose Us Eyebrow",
      type: "string",
    }),

    defineField({
      name: "whyChooseUsTitle",
      title: "Why Choose Us Title",
      type: "string",
    }),

    defineField({
      name: "whyChooseUsDescription",
      title: "Why Choose Us Description",
      type: "text",
    }),

    defineField({
      name: "whyChooseUsFeatures",
      title: "Why Choose Us Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
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
              options: {
                list: [
                  { title: "Globe", value: "globe" },
                  { title: "Shield Check", value: "shieldCheck" },
                  { title: "Package Check", value: "packageCheck" },
                  { title: "Leaf", value: "leaf" },
                  { title: "Truck", value: "truck" },
                ],
              },
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "certificationsEyebrow",
      title: "Certifications Eyebrow",
      type: "string",
    }),

    defineField({
      name: "certificationsTitle",
      title: "Certifications Title",
      type: "string",
    }),

    defineField({
      name: "certificationsDescription",
      title: "Certifications Description",
      type: "text",
    }),

    defineField({
      name: "ctaEyebrow",
      title: "CTA Eyebrow",
      type: "string",
    }),

    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    }),

    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
    }),

    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
    }),

    defineField({
      name: "ctaButtonHref",
      title: "CTA Button Link",
      type: "string",
    }),
  ],
});