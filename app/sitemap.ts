import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const SITE_URL = "https://www.oranthus.com";

async function fetchSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`
  );
}

async function fetchCertificationSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "certification" && defined(slug.current) && active == true]{ "slug": slug.current }`
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                       lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/about`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/products`,         lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/services`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/certifications`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const [categories, certifications] = await Promise.all([
    fetchSlugs(),
    fetchCertificationSlugs(),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(({ slug }) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const certificationRoutes: MetadataRoute.Sitemap = certifications.map(({ slug }) => ({
    url: `${SITE_URL}/certifications/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...certificationRoutes];
}
