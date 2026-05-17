import { defineQuery } from "next-sanity";

export const homepageQuery = defineQuery(`
  {
    "homepage": *[_type == "homepage"][0]{
      heroEyebrow,
      heroTitle,
      heroSubtitle,
      heroCtaText,
      heroSecondaryCtaText,
      heroSecondaryCtaHref,
      "heroImageUrl": heroImage.asset->url,
      "heroImageAlt": coalesce(heroImage.alt, heroTitle),
      heroStats[]{
        value,
        label
      },
      aboutEyebrow,
      aboutTitle,
      aboutDescription,
      aboutVisionEyebrow,
      aboutVisionTitle,
      aboutVisionDescription,
      aboutMissionEyebrow,
      aboutMissionTitle,
      aboutMissionDescription,
      aboutValuesEyebrow,
      aboutValuesTitle,
      aboutValuesDescription,
      aboutValues[] {
        title,
        description,
        icon
      },
      aboutFounderEyebrow,
      aboutFounderTitle,
      aboutFounderName,
      aboutFounderRole,
      aboutFounderMessage,
      aboutSourcingEyebrow,
      aboutSourcingTitle,
      aboutSourcingDescription,
      aboutSourcingPoints,
      aboutStats[]{
        value,
        label
      },
      categoriesEyebrow,
      categoriesTitle,
      categoriesDescription,
      whyChooseUsEyebrow,
      whyChooseUsTitle,
      whyChooseUsDescription,
      whyChooseUsFeatures[]{
        title,
        description,
        icon
      },
      certificationsEyebrow,
      certificationsTitle,
      certificationsDescription,
      ctaEyebrow,
      ctaTitle,
      ctaDescription,
      ctaButtonText,
      ctaButtonHref
    },
    "categories": *[_type == "category"] | order(title asc) {
      _id,
      title,
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt, title),
      "productCount": count(*[_type == "product" && references(^._id)])
    },
    "certifications": *[_type == "certification"] | order(title asc) {
      _id,
      title,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt, title),
      description,
      issuer,
      scope,
      validity,
      standards
    },
    "contactInfo": *[_type == "contactInfo"][0]{
      email,
      phone,
      address,
      whatsapp,
      mapEmbedUrl,
      businessHours
    }
  }
`);

export const productsPageQuery = defineQuery(`
  {
    "homepage": *[_type == "homepage"][0]{
      categoriesEyebrow,
      categoriesTitle,
      categoriesDescription
    },
    "categories": *[_type == "category"] | order(title asc) {
      _id,
      title,
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt, title),
      "productCount": count(*[_type == "product" && references(^._id)])
    }
  }
`);

export const categoryPageQuery = defineQuery(`
  {
    "category": *[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt, title),
      "productCount": count(*[_type == "product" && references(^._id)])
    },
    "products": *[_type == "product" && category->slug.current == $slug] | order(name asc) {
      _id,
      name,
      description,
      "slug": slug.current,
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": coalesce(thumbnail.alt, name),
      packaging,
      moq,
      origin,
      grade,
      leadTime
    }
  }
`);

export const productPageQuery = defineQuery(`
  *[_type == "product" && slug.current == $productSlug && category->slug.current == $categorySlug][0]{
    _id,
    name,
    description,
    sourcing,
    "slug": slug.current,
    "thumbnailUrl": thumbnail.asset->url,
    "thumbnailAlt": coalesce(thumbnail.alt, name),
    "galleryUrls": gallery[].asset->url,
    "galleryAlts": gallery[].alt,
    category->{
      _id,
      title,
      "slug": slug.current
    },
    grade,
    specifications[]{
      label,
      value
    },
    packaging,
    moq,
    moqNote,
    origin,
    leadTime,
    shelfLife,
    storageInstructions,
    applications,
    certificationNotes
  }
`);