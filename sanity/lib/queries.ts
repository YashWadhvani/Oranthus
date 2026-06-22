import { defineQuery } from "next-sanity";

export const homepageQuery = `
{
  "homepage": *[_type == "homepage"][0]{
    heroSlides,
    marqueeItems,
    stats,

    featuredCategories[]->{
      _id,
      name,
      description,
      image,
      "slug": slug.current
    },

    featuredServices[]->{
      _id,
      title,
      description,
      icon,
      "slug": slug.current
    },

    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonHref,
    ctaBgImage,

    categoriesEyebrow,
    categoriesTitle,
    categoriesDescription,

    whyChooseUsEyebrow,
    whyChooseUsTitle,
    whyChooseUsDescription,
    whyChooseUsFeatures,

    certificationsEyebrow,
    certificationsTitle,
    certificationsDescription,
    ctaEyebrow,

    servicesEyebrow,
    servicesTitle,
    servicesDescription,

    statsEyebrow,
    statsTitle,
    statsDescription,

    tradeEyebrow,
    tradeTitle,
    tradeDescription,
    tradeStoryTitle,
    tradeStoryDescription,
    tradeStoryHighlights
  },

  "about": *[_type == "aboutPage"][0]{
    overviewEyebrow,
    overviewTitle,
    overviewDescription,
    visionEyebrow,
    visionTitle,
    vision,
    missionEyebrow,
    missionTitle,
    mission,
    founderEyebrow,
    founderTitle,
    founderName,
    founderRole,
    founderMessage,
    stats,
    valuesEyebrow,
    valuesTitle,
    valuesDescription,
    values,
    sourcingEyebrow,
    sourcingTitle,
    sourcingDescription,
    sourcingPoints
  },

  "categories": *[_type == "category"] | order(coalesce(title, name) asc) {
    _id,
    "title": coalesce(title, name),
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "imageAlt": coalesce(image.alt, title, name),
    "productCount": count(*[_type == "product" && references(^._id)])
  },

  "services": *[_type == "service"] | order(title asc),

  "certifications": *[_type == "certification" && active == true] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    type,
    issuingAuthority,
    certificateNumber,
    issueDate,
    expiryDate,
    isLifetime,
    badgeText,
    active,
    featured,
    shortDescription,
    fullDescription,
    pdfUrl,
    logo,
    coverImage,
    pdfFile,
    "logoUrl": logo.asset->url,
    "coverImageUrl": coverImage.asset->url,
    "pdfFileUrl": pdfFile.asset->url
  },

  "contactInfo": *[_type == "contactInfo"] | order(_createdAt asc)[0],

  "siteSettings": *[_type == "siteSettings"][0]
}
`;

export const aboutPreviewQuery = `
*[_type=="aboutPage"][0]{
  overviewTitle,
  overviewDescription,
  stats
}
`;

export const whyChooseUsQuery = `
*[_type=="whyChooseUs"][0]{
  title,
  description,
  features
}
`;

export const certificationsQuery = `
*[_type=="certification" && active == true] | order(displayOrder asc) {
  _id,
  title,
  "slug": slug.current,
  type,
  issuingAuthority,
  certificateNumber,
  issueDate,
  expiryDate,
  isLifetime,
  badgeText,
  active,
  featured,
  shortDescription,
  fullDescription,
  pdfUrl,
  logo,
  coverImage,
  pdfFile,
  "logoUrl": logo.asset->url,
  "coverImageUrl": coverImage.asset->url,
  "pdfFileUrl": pdfFile.asset->url
}
`;

export const certificationQuery = defineQuery(`
  *[_type == "certification" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    issuingAuthority,
    certificateNumber,
    issueDate,
    expiryDate,
    isLifetime,
    badgeText,
    active,
    featured,
    shortDescription,
    fullDescription,
    pdfUrl,
    logo,
    coverImage,
    pdfFile,
    "logoUrl": logo.asset->url,
    "coverImageUrl": coverImage.asset->url,
    "pdfFileUrl": pdfFile.asset->url
  }
`);

export const productsPageQuery = defineQuery(`
  {
    "homepage": *[_type == "homepage"][0]{
      categoriesEyebrow,
      categoriesTitle,
      categoriesDescription
    },
    "categories": *[_type == "category"] | order(coalesce(title, name) asc) {
      _id,
      "title": coalesce(title, name),
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt, title, name),
      "productCount": count(*[_type == "product" && references(^._id)])
    }
  }
`);

export const categoryPageQuery = defineQuery(`
  {
    "category": *[_type == "category" && slug.current == $slug][0]{
      _id,
      "title": coalesce(title, name),
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt, title, name),
      "productCount": count(*[_type == "product" && references(^._id)])
    },
    "products": *[_type == "product" && category->slug.current == $slug] | order(name asc) {
      _id,
      name,
      description,
      sourcing,
      "slug": slug.current,
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": coalesce(thumbnail.alt, name),
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
      "title": coalesce(title, name),
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

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    companyName,
    tagline,

    logo,
    favicon,

    email,
    phone,
    whatsapp,
    website,
    address,
    googleMapsLink,

    seoTitle,
    seoDescription,
    ogImage,

    socialLinks
  }
`;