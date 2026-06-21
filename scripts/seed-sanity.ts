import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dvhn6875";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-16";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_TOKEN in environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion,
});

const categories = [
  {
    _id: "category-dried-onions",
    _type: "category",
    title: "Dried Onions",
    slug: { _type: "slug", current: "dried-onions" },
    description:
      "Flakes, granules and powders processed for seasoning, manufacturing and retail export markets.",
  },
  {
    _id: "category-dehydrated-garlic",
    _type: "category",
    title: "Dehydrated Garlic",
    slug: { _type: "slug", current: "dehydrated-garlic" },
    description:
      "Garlic flakes, granules and powders with consistent flavor profiles and industrial packing options.",
  },
  {
    _id: "category-spices",
    _type: "category",
    title: "Spices",
    slug: { _type: "slug", current: "spices" },
    description:
      "Bulk spices and specialty powders for food manufacturers, blends and private-label brands.",
  },
  {
    _id: "category-bulk-ingredients",
    _type: "category",
    title: "Bulk Ingredients",
    slug: { _type: "slug", current: "bulk-ingredients" },
    description:
      "Custom blends, rebagging and private-label options with export-ready packaging formats.",
  },
];

const products = [
  {
    _id: "product-dried-onion-flakes",
    _type: "product",
    name: "Dried Onion Flakes",
    slug: { _type: "slug", current: "dried-onion-flakes" },
    category: { _type: "reference", _ref: "category-dried-onions" },
    description:
      "Uniform dried onion flakes ideal for seasonings, snack coatings and soup mixes.",
    sourcing: "Sourced from contracted onion growers with post-harvest drying under controlled conditions.",
    grade: "Export Grade",
    packaging: "10kg / 25kg / 50kg cartons or bulk bags; private-label options",
    moq: "500 kg",
    moqNote: "Sample packs available for qual and testing.",
    origin: "India",
    leadTime: "10–14 days",
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place in sealed packaging.",
    applications: ["Seasonings", "Instant Soup", "Snack Coating"],
    certificationNotes: ["FSSAI", "HACCP", "APEDA Documentation"],
    specifications: [
      { label: "Moisture", value: "Max 6%" },
      { label: "Particle Size", value: "Flakes 3–8 mm" },
    ],
  },
  {
    _id: "product-dried-onion-powder",
    _type: "product",
    name: "Dried Onion Powder",
    slug: { _type: "slug", current: "dried-onion-powder" },
    category: { _type: "reference", _ref: "category-dried-onions" },
    description: "Fine onion powder for blends, seasoning mixes and food processing.",
    sourcing: "Processed from cleaned onion slices with micronized milling and sieve control.",
    grade: "Industrial Grade",
    packaging: "25kg drums / 50kg bags",
    moq: "1000 kg",
    moqNote: "Custom specifications supported.",
    origin: "India",
    leadTime: "14–21 days",
    shelfLife: "18 months",
    storageInstructions: "Keep sealed to avoid moisture pickup.",
    applications: ["Seasoning Blends", "Food Manufacturing"],
    certificationNotes: ["Lab-tested moisture & microbial reports"],
    specifications: [
      { label: "Moisture", value: "Max 5%" },
      { label: "Mesh", value: "80–200 mesh" },
    ],
  },
  {
    _id: "product-garlic-granules",
    _type: "product",
    name: "Dehydrated Garlic Granules",
    slug: { _type: "slug", current: "dehydrated-garlic-granules" },
    category: { _type: "reference", _ref: "category-dehydrated-garlic" },
    description: "Consistent garlic granules with stable flavor and color for industrial use.",
    sourcing: "Garlic cloves dehydrated and milled under low-temperature processes to retain flavor.",
    grade: "A-Grade",
    packaging: "25kg / 50kg poly-lined bags",
    moq: "300 kg",
    moqNote: "Small trial runs supported.",
    origin: "India",
    leadTime: "10–14 days",
    shelfLife: "12 months",
    storageInstructions: "Protect from humidity and odors.",
    applications: ["Seasoning", "Ready Meals", "Blend Manufacturing"],
    certificationNotes: ["HACCP", "FSSAI"],
    specifications: [
      { label: "Granule Size", value: "1–3 mm" },
      { label: "Moisture", value: "Max 6%" },
    ],
  },
  {
    _id: "product-garlic-powder",
    _type: "product",
    name: "Garlic Powder",
    slug: { _type: "slug", current: "garlic-powder" },
    category: { _type: "reference", _ref: "category-dehydrated-garlic" },
    description: "Fine garlic powder for seasoning blends and industrial recipes.",
    sourcing: "Made from dehydrated garlic and micronized to specification.",
    grade: "Foodservice Grade",
    packaging: "25kg drums / 50kg bags",
    moq: "500 kg",
    moqNote: "Custom grind sizes available.",
    origin: "India",
    leadTime: "12–18 days",
    shelfLife: "18 months",
    storageInstructions: "Store in cool, dry place.",
    applications: ["Seasoning", "Sauces", "Manufacturing"],
    certificationNotes: ["Lab-tested batches"],
    specifications: [
      { label: "Mesh", value: "80–200 mesh" },
      { label: "Moisture", value: "Max 5%" },
    ],
  },
  {
    _id: "product-turmeric-powder",
    _type: "product",
    name: "Turmeric Powder",
    slug: { _type: "slug", current: "turmeric-powder" },
    category: { _type: "reference", _ref: "category-spices" },
    description: "Bright yellow turmeric powder for color and flavor in food products.",
    sourcing: "Sourced from quality-controlled spice growers and processed to export standards.",
    grade: "Export Grade",
    packaging: "25kg / 50kg bulk bags",
    moq: "300 kg",
    moqNote: "Private-labeling available.",
    origin: "India",
    leadTime: "10–15 days",
    shelfLife: "18 months",
    storageInstructions: "Protect from light and moisture.",
    applications: ["Spice Blends", "Food Manufacturing"],
    certificationNotes: ["Pesticide-tested batches"],
    specifications: [
      { label: "Curcumin", value: ">3%" },
      { label: "Moisture", value: "Max 8%" },
    ],
  },
  {
    _id: "product-cumin-seeds",
    _type: "product",
    name: "Cumin Seeds",
    slug: { _type: "slug", current: "cumin-seeds" },
    category: { _type: "reference", _ref: "category-spices" },
    description: "Whole cumin seeds for grinding and spice blends.",
    sourcing: "Cleaned and graded seeds with controlled moisture levels.",
    grade: "Select Grade",
    packaging: "25kg / 50kg sacks",
    moq: "250 kg",
    moqNote: "Available in bulk container quantities.",
    origin: "India",
    leadTime: "12–18 days",
    shelfLife: "24 months",
    storageInstructions: "Keep dry and protect from pests.",
    applications: ["Spice Manufacturing", "Retail"],
    certificationNotes: ["Lab-tested for residues"],
    specifications: [
      { label: "Purity", value: "99%+" },
      { label: "Moisture", value: "Max 9%" },
    ],
  },
  {
    _id: "product-red-chilli-powder",
    _type: "product",
    name: "Red Chilli Powder",
    slug: { _type: "slug", current: "red-chilli-powder" },
    category: { _type: "reference", _ref: "category-spices" },
    description: "Balanced chilli powder with vibrant color for food processors.",
    sourcing: "Cleaned, graded and tested for color and heat consistency.",
    grade: "A-Grade",
    packaging: "25kg / 50kg bags",
    moq: "200 kg",
    moqNote: "Color and heat-level options available.",
    origin: "India",
    leadTime: "10–15 days",
    shelfLife: "12 months",
    storageInstructions: "Keep sealed in dry storage.",
    applications: ["Spice Blends", "Food Manufacturing"],
    certificationNotes: ["HACCP", "FSSAI"],
    specifications: [
      { label: "Heat Level", value: "Mild to Hot" },
      { label: "Color Value", value: "High" },
    ],
  },
];

const homepage = {
  _id: "homepage",
  _type: "homepage",
  heroSlides: [
    {
      _key: "hero-slide-1",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
      eyebrow: "Global Ingredient Exporter",
      title: "Premium Dried Onions for Food Manufacturers",
      subtitle:
        "Consistent cut-size, low moisture, and export-ready packaging for seasoning and processed food applications.",
      ctaText: "Explore Onion Products",
      ctaHref: "/products/dried-onions",
      secondaryCtaText: "Request Sample",
      secondaryCtaHref: "/contact",
    },
    {
      _key: "hero-slide-2",
      imageUrl:
        "https://images.unsplash.com/photo-1514995669114-6081b9f5d5f4?q=80&w=1600&auto=format&fit=crop",
      eyebrow: "Dehydrated Garlic Specialists",
      title: "Garlic Granules & Powder with Reliable Quality",
      subtitle:
        "Batch-tested dehydrated garlic for blend houses, contract manufacturers, and global importers.",
      ctaText: "Browse Garlic Range",
      ctaHref: "/products/dehydrated-garlic",
      secondaryCtaText: "Get Quote",
      secondaryCtaHref: "/contact",
    },
    {
      _key: "hero-slide-3",
      imageUrl:
        "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1600&auto=format&fit=crop",
      eyebrow: "Spices & Bulk Ingredients",
      title: "Turmeric, Chilli, Cumin and More",
      subtitle:
        "Traceable sourcing, export documentation, and private-label packing options for global supply chains.",
      ctaText: "View Spices",
      ctaHref: "/products/spices",
      secondaryCtaText: "Talk to Sales",
      secondaryCtaHref: "/contact",
    },
  ],
  marqueeItems: [
    { _key: "mq-1", text: "Dried Onion Flakes" },
    { _key: "mq-2", text: "Onion Powder" },
    { _key: "mq-3", text: "Garlic Granules" },
    { _key: "mq-4", text: "Garlic Powder" },
    { _key: "mq-5", text: "Turmeric Powder" },
    { _key: "mq-6", text: "Red Chilli Powder" },
    { _key: "mq-7", text: "Cumin Seeds" },
  ],
  stats: [
    { _key: "stat-1", value: 30, label: "Countries Served", suffix: "+" },
    { _key: "stat-2", value: 2000, label: "Tons Exported", suffix: "+" },
    { _key: "stat-3", value: 98, label: "On-Time Shipments", suffix: "%" },
  ],
  heroEyebrow: "Global Import & Export",
  heroTitle: "Exporters of Dried Onions, Garlic & Spices",
  heroSubtitle:
    "High-quality dehydrated ingredients with traceable sourcing, export documentation and flexible packing for global buyers.",
  heroCtaText: "Explore Products",
  heroSecondaryCtaText: "Contact Us",
  heroSecondaryCtaHref: "/contact",
  heroStats: [
    { _key: "hero-stat-1", value: "10+", label: "Countries Served" },
    { _key: "hero-stat-2", value: "50+", label: "Product Variants" },
    { _key: "hero-stat-3", value: "5000+", label: "Annual Exports" },
  ],
  aboutEyebrow: "Who We Are",
  aboutTitle: "About Our Company",
  aboutDescription:
    "We specialize in exporting premium dried products with a strong focus on quality, trust, packaging excellence, and long-term international partnerships. Our commitment to sustainability and ethical sourcing sets us apart in the global market.",
  aboutVisionEyebrow: "Vision",
  aboutVisionTitle: "To be a trusted global export partner",
  aboutVisionDescription:
    "We aim to deliver consistent quality and long-term value to international buyers.",
  aboutMissionEyebrow: "Mission",
  aboutMissionTitle: "Source, process, and export with excellence",
  aboutMissionDescription:
    "We build reliable supply chains that serve the needs of global food and ingredient markets.",
  aboutValuesEyebrow: "Values",
  aboutValuesTitle: "What we stand for",
  aboutValuesDescription:
    "Our values shape how we source, process, and deliver every shipment.",
  aboutValues: [
    {
      title: "Quality First",
      description: "Every batch is checked for consistency, safety, and export readiness.",
      icon: "shieldCheck",
    },
    {
      title: "Transparent Sourcing",
      description: "We partner with vetted growers and processors with traceable sourcing.",
      icon: "handshake",
    },
    {
      title: "Sustainable Practices",
      description: "We encourage responsible handling and eco-conscious packaging choices.",
      icon: "leaf",
    },
  ],
  aboutFounderEyebrow: "Founder",
  aboutFounderTitle: "A message from our founder",
  aboutFounderName: "Arun Mehta",
  aboutFounderRole: "Founder & Director",
  aboutFounderMessage:
    "Oranthus was created to serve global buyers with dependable quality, ethical sourcing, and export-friendly service.",
  aboutSourcingEyebrow: "Sourcing",
  aboutSourcingTitle: "Reliable sourcing from trusted partners",
  aboutSourcingDescription:
    "We work with vetted growers, processors, and logistics partners to ensure every export order meets specifications.",
  aboutSourcingPoints: [
    "Verified supplier onboarding",
    "Quality checks at origin",
    "Export packaging controls",
    "Traceability and compliance",
  ],
  aboutStats: [
    { value: "15+", label: "Years Experience" },
    { value: "1000+", label: "Satisfied Clients" },
  ],
  categoriesEyebrow: "Product Categories",
  categoriesTitle: "Explore Our Products",
  categoriesDescription:
    "Hand-picked export categories presented with the same premium care we bring to every shipment.",
  whyChooseUsEyebrow: "Why Oranthus",
  whyChooseUsTitle: "Why Choose Us",
  whyChooseUsDescription:
    "We stand out through our commitment to excellence, quality assurance, and customer satisfaction.",
  whyChooseUsFeatures: [
    {
      title: "Global Reach",
      description: "Exporting to 10+ countries with reliable logistics and partnerships.",
      icon: "globe",
    },
    {
      title: "Quality Assured",
      description: "ISO certified processes ensuring premium product quality at every stage.",
      icon: "shieldCheck",
    },
    {
      title: "Premium Packaging",
      description: "Eco-friendly and protective packaging for international standards.",
      icon: "packageCheck",
    },
    {
      title: "Sustainable Sourcing",
      description: "Ethical practices and partnerships with local producers.",
      icon: "leaf",
    },
    {
      title: "Fast Shipping",
      description: "Efficient logistics ensuring timely delivery worldwide.",
      icon: "truck",
    },
  ],
  certificationsEyebrow: "Certifications",
  certificationsTitle: "International Standards & Compliance",
  certificationsDescription:
    "Trusted badges and approvals that reinforce our quality-first export process.",
  ctaEyebrow: "Ready to Partner",
  ctaTitle: "Let's Work Together",
  ctaDescription: "Get in touch with our team to discuss your export requirements and pricing.",
  ctaButtonText: "Contact Our Team",
  ctaButtonHref: "/contact",
  servicesEyebrow: "Our Services",
  servicesTitle: "Complete Export Solutions",
  servicesDescription:
    "End-to-end sourcing and export services designed to simplify your procurement needs.",
  statsEyebrow: "Performance Snapshot",
  statsTitle: "Trusted by importers across markets",
  statsDescription: "A concise view of our export scale, reliability, and delivery consistency.",
  tradeEyebrow: "WHO WE ARE",
  tradeTitle: "Built on trust. Proven at scale.",
  tradeDescription:
    "For more than two decades, Oranthus has connected growers, manufacturers, and buyers through a disciplined trade model built on transparency, quality, and execution.",
  tradeStoryTitle: "A structure designed for long-term partnerships.",
  tradeStoryDescription:
    "From origin coordination to final-mile delivery, we keep the moving parts visible, documented, and accountable — so buyers can move faster with fewer surprises.",
  tradeStoryHighlights: [
    "Transparent sourcing and contract clarity",
    "Quality checks at every stage of handling",
    "Reliable logistics across key trade corridors",
  ],
};

const certifications = [
  {
    _id: "certification-iso-22000",
    _type: "certification",
    title: "ISO 22000:2018",
    description: "Food safety management system certification for export processing.",
    issuer: "International Standards Body",
    scope: "Food safety management across sourcing, processing, and packaging.",
    validity: "Annual review",
    standards: ["Food Safety", "Quality Management"],
  },
  {
    _id: "certification-apeda",
    _type: "certification",
    title: "APEDA Registered",
    description: "Registered exporter for agricultural and processed food products.",
    issuer: "APEDA, India",
    scope: "Agricultural export compliance and trade support.",
    validity: "Active registration",
    standards: ["Exporter Registration", "Trade Compliance"],
  },
  {
    _id: "certification-fssai",
    _type: "certification",
    title: "FSSAI Licensed",
    description: "Food handling and processing license ensuring domestic compliance.",
    issuer: "FSSAI, India",
    scope: "Food handling, processing, packaging, and distribution.",
    validity: "Current license",
    standards: ["Food Safety", "Hygiene"],
  },
  {
    _id: "certification-haccp",
    _type: "certification",
    title: "HACCP Aligned",
    description: "Hazard control processes aligned to international export expectations.",
    issuer: "Internal QA Program",
    scope: "Critical control point management and batch traceability.",
    validity: "Ongoing",
    standards: ["Process Control", "Traceability"],
  },
];

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  overviewTitle: "About Our Company",
  overviewDescription:
    "We specialize in exporting premium dried products with a strong focus on quality, trust, packaging excellence, and long-term international partnerships. Our commitment to sustainability and ethical sourcing sets us apart in the global market.",
  visionEyebrow: "Vision",
  visionTitle: "To be a trusted global partner",
  vision: "We aim to deliver consistent quality and long-term value to international buyers.",
  missionEyebrow: "Mission",
  missionTitle: "Source, process, and export",
  mission: "We build reliable supply chains that serve the needs of global food and ingredient markets.",
  founderEyebrow: "Founder",
  founderTitle: "A message from our founder",
  founderName: "Arun Mehta",
  founderRole: "Founder & Director",
  founderMessage:
    "Oranthus was created to serve global buyers with dependable quality, ethical sourcing, and export-friendly service.",
  stats: [
    { value: 50, suffix: "+", label: "Premium Products" },
    { value: 10, suffix: "+", label: "Export Countries" },
  ],
  valuesEyebrow: "Values",
  valuesTitle: "What we stand for",
  valuesDescription: "Our values shape how we source, process, and deliver every shipment.",
  values: [
    {
      title: "Quality First",
      description: "Every batch is checked for consistency, safety, and export readiness.",
      icon: "shieldCheck",
    },
    {
      title: "Transparent Sourcing",
      description: "We partner with vetted growers and processors with traceable sourcing.",
      icon: "handshake",
    },
    {
      title: "Sustainable Practices",
      description: "We encourage responsible handling and eco-conscious packaging choices.",
      icon: "leaf",
    },
  ],
  sourcingEyebrow: "Sourcing",
  sourcingTitle: "Reliable sourcing from trusted partners",
  sourcingDescription:
    "We work with vetted growers, processors, and logistics partners to ensure every export order meets specifications.",
  sourcingPoints: [
    "Verified supplier onboarding",
    "Quality checks at origin",
    "Export packaging controls",
    "Traceability and compliance",
  ],
};

const contactInfo = {
  _id: "contactInfo",
  _type: "contactInfo",
  email: "contact@oranthus.com",
  phone: "+91 98765 43210",
  address: "123 Export Street, Ahmedabad, Gujarat 380001, India",
  whatsapp: "+919876543210",
  mapEmbedUrl: "https://www.google.com/maps?q=Ahmedabad&output=embed",
  businessHours: "Mon–Sat, 9:00 AM to 6:00 PM IST",
};

async function seedData() {
  try {
    console.log("🌱 Starting Sanity data seed...");

    await client.createOrReplace(homepage);
    console.log("✅ Homepage upserted");

    await client.createOrReplace(aboutPage);
    console.log("✅ About page document upserted");

    for (const category of categories) {
      await client.createOrReplace(category);
    }
    console.log(`✅ ${categories.length} categories upserted`);

    for (const product of products) {
      await client.createOrReplace(product);
    }
    console.log(`✅ ${products.length} products upserted`);

    for (const certification of certifications) {
      await client.createOrReplace(certification);
    }
    console.log(`✅ ${certifications.length} certifications upserted`);

    await client.createOrReplace(contactInfo);
    console.log("✅ Contact information upserted");

    console.log("🎉 Data seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
