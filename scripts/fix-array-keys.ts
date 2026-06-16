import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dvhn6875";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-16";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_TOKEN in environment variables. Provide a token with write access.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function ensureKeys() {
  try {
    const homepage = await client.getDocument("homepage");
    if (!homepage) {
      console.error("No homepage document found with _id 'homepage'.");
      process.exit(1);
    }

    const updated = { _id: homepage._id, _type: homepage._type } as any;
    let needsPatch = false;

    const arraysToFix = ["heroSlides", "marqueeItems", "statCounters", "heroStats"];

    for (const key of arraysToFix) {
      const arr = homepage[key];
      if (Array.isArray(arr) && arr.length > 0) {
        const fixed = arr.map((item: any) => {
          if (item && typeof item === "object" && !item._key) {
            needsPatch = true;
            return { ...item, _key: `${key}-${nanoid(8)}` };
          }
          return item;
        });
        updated[key] = fixed;
      }
    }

    if (!needsPatch) {
      console.log("All array items already have keys. No changes needed.");
      process.exit(0);
    }

    // Create a patch that patches the arrays
    const patch = client
      .patch(homepage._id)
      .set(updated)
      .commit()
      .then((res) => {
        console.log("✅ Homepage arrays updated with _key values:", res);
      })
      .catch((err) => {
        console.error("❌ Failed to patch homepage:", err);
        process.exit(1);
      });

    await patch;
  } catch (err) {
    console.error("Error ensuring keys:", err);
    process.exit(1);
  }
}

ensureKeys();
