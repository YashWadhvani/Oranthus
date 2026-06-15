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
    ctaButtonHref
  },

  "about": *[_type == "aboutPage"][0]{
    overviewTitle,
    overviewDescription,
    stats
  },

  "categories": *[_type == "category"] | order(name asc),

  "services": *[_type == "service"] | order(title asc),

  "certifications": *[_type == "certification"],

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
*[_type=="certification"]{
  _id,
  title,
  image,
  description
}
`;

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