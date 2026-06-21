import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dvhn6875";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-05-16";

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
});

async function run() {
  try {
    console.log("Listing all documents in Sanity...");
    const docs = await client.fetch(`*[
      _type in ["homepage", "aboutPage", "category", "product", "certification", "contactInfo", "siteSettings"]
    ]{
      _id,
      _type,
      title,
      name,
      _createdAt
    }`);
    
    console.log(`Total documents found: ${docs.length}`);
    docs.forEach(d => {
      console.log(`- Type: ${d._type}, ID: ${d._id}, Title/Name: ${d.title || d.name}, Created: ${d._createdAt}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
