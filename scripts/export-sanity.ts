// scripts/export-sanity.ts

import { createClient } from "@sanity/client";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  const data = await client.fetch(`*`);

  fs.writeFileSync(
    "sanity-export.json",
    JSON.stringify(data, null, 2)
  );

  console.log("✅ Exported to sanity-export.json");
}

main();