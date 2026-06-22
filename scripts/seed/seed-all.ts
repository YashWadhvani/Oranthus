// seed-all.ts

import { client } from "@/sanity/lib/client";
import { siteSettingsData } from "./seed-site-settings";
import { aboutPageData } from "./seed-about";
import { servicesData } from "./seed-services";
import { categoriesData } from "./seed-categories";
import { certificationsData } from "./seed-certifications";
import { homepageData } from "./seed-homepage";

await client.createOrReplace(siteSettingsData);
await client.createOrReplace(aboutPageData);

for (const service of servicesData)
    await client.createOrReplace(service);

for (const category of categoriesData)
    await client.createOrReplace(category);

for (const cert of certificationsData)
    await client.createOrReplace(cert);

await client.createOrReplace(homepageData);