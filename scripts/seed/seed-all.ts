import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { siteSettingsData } from "./seed-site-settings";
import { aboutPageData } from "./seed-about";
import { servicesData } from "./seed-services";
import { categoriesData } from "./seed-categories";
import { certificationsData } from "./seed-certifications";
import { homepageData } from "./seed-homepage";

dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-16";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion,
});

async function main() {
  try {
    console.log("🌱 Starting seed all...");

    console.log("Seeding site settings...");
    await client.createOrReplace(siteSettingsData as any);

    console.log("Seeding about page...");
    await client.createOrReplace(aboutPageData as any);

    console.log("Seeding services...");
    for (const service of servicesData) {
      await client.createOrReplace(service as any);
    }

    console.log("Seeding categories...");
    for (const category of categoriesData) {
      await client.createOrReplace(category as any);
    }

    console.log("Seeding certifications...");
    for (const cert of certificationsData) {
      await client.createOrReplace(cert as any);
    }

    console.log("Seeding homepage...");
    await client.createOrReplace(homepageData as any);

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();