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
    _id: "category-dried-fruits",
    _type: "category",
    title: "Dried Fruits",
    slug: { _type: "slug", current: "dried-fruits" },
    description:
      "Export-grade dried fruits sourced from reliable farms and processed for global retail and ingredient markets.",
  },
  {
    _id: "category-spices",
    _type: "category",
    title: "Spices",
    slug: { _type: "slug", current: "spices" },
    description:
      "Aromatic spices selected for consistent flavor, purity, and international export compliance.",
  },
  {
    _id: "category-herbs",
    _type: "category",
    title: "Herbs",
    slug: { _type: "slug", current: "herbs" },
    description:
      "Natural dried herbs for culinary, wellness, and food processing applications.",
  },
  {
    _id: "category-nuts-seeds",
    _type: "category",
    title: "Nuts & Seeds",
    slug: { _type: "slug", current: "nuts-seeds" },
    description:
      "Carefully processed nuts and seeds delivered with export-ready packaging and quality checks.",
  },
];

const products = [
  {
    _id: "product-golden-dried-mango-slices",
    _type: "product",
    name: "Golden Dried Mango Slices",
    slug: { _type: "slug", current: "golden-dried-mango-slices" },
    category: { _type: "reference", _ref: "category-dried-fruits" },
    description:
      "Sweet tropical dried mango slices with a vibrant natural color and smooth chewy texture.",
    sourcing:
      "Sourced from vetted mango growers and processed in controlled facilities with traceability at each stage.",
    grade: "Premium Export Grade",
    packaging: "1kg / 5kg / 10kg cartons or custom private-label formats",
    moq: "250 kg",
    moqNote: "Trial orders available for new distributors.",
    origin: "India",
    leadTime: "12–18 days",
    shelfLife: "12 months",
    storageInstructions: "Store in a cool, dry place below 25°C and away from direct sunlight.",
    applications: ["Retail", "Bakery", "Snack Packs"],
    certificationNotes: ["FSSAI", "HACCP", "Export Documentation Available"],
    specifications: [
      { label: "Moisture", value: "Max 18%" },
      { label: "Cut", value: "Sliced" },
      { label: "Color", value: "Natural Golden" },
    ],
  },
  {
    _id: "product-premium-raisins",
    _type: "product",
    name: "Premium Raisins",
    slug: { _type: "slug", current: "premium-raisins" },
    category: { _type: "reference", _ref: "category-dried-fruits" },
    description:
      "Uniform, sweet raisins with export-ready cleaning, grading, and packaging.",
    sourcing:
      "Procured from experienced growers with drying, cleaning, and sorting under supervised QA processes.",
    grade: "Select Grade",
    packaging: "Bulk bags, retail pouches, and custom export cartons",
    moq: "500 kg",
    moqNote: "Mixed container options available.",
    origin: "India",
    leadTime: "10–14 days",
    shelfLife: "9 months",
    storageInstructions: "Keep sealed to preserve texture and sweetness.",
    applications: ["Bakery", "Confectionery", "Cereals"],
    certificationNotes: ["FSSAI", "APEDA Documentation"],
    specifications: [
      { label: "Moisture", value: "Max 16%" },
      { label: "Texture", value: "Soft & Uniform" },
      { label: "Foreign Matter", value: "Nil / Controlled" },
    ],
  },
  {
    _id: "product-kashmiri-red-chilli-powder",
    _type: "product",
    name: "Kashmiri Red Chilli Powder",
    slug: { _type: "slug", current: "kashmiri-red-chilli-powder" },
    category: { _type: "reference", _ref: "category-spices" },
    description:
      "Bright red chilli powder offering vibrant color and balanced heat for food manufacturing.",
    sourcing:
      "Made from carefully selected chillies sourced from reliable farming clusters with batch traceability.",
    grade: "A-Grade",
    packaging: "250g / 1kg retail packs or 25kg bulk bags",
    moq: "200 kg",
    moqNote: "Private label options available.",
    origin: "India",
    leadTime: "10–15 days",
    shelfLife: "12 months",
    storageInstructions: "Store in dry conditions and tightly sealed packaging.",
    applications: ["Food Processing", "Spice Blends", "HoReCa"],
    certificationNotes: ["HACCP", "FSSAI", "Lab Tested Batches"],
    specifications: [
      { label: "Heat Level", value: "Mild to Medium" },
      { label: "Color Value", value: "High" },
      { label: "Purity", value: "98%+" },
    ],
  },
  {
    _id: "product-ceylon-cinnamon-sticks",
    _type: "product",
    name: "Ceylon Cinnamon Sticks",
    slug: { _type: "slug", current: "ceylon-cinnamon-sticks" },
    category: { _type: "reference", _ref: "category-spices" },
    description:
      "Aromatic cinnamon sticks sourced for flavor consistency and export durability.",
    sourcing:
      "Harvested from trusted cinnamon processors with moisture and odor controls.",
    grade: "Export Select",
    packaging: "Bundled sticks, carton boxes, and custom retail formats",
    moq: "150 kg",
    moqNote: "Sampling packs available upon request.",
    origin: "Sri Lanka",
    leadTime: "14–20 days",
    shelfLife: "18 months",
    storageInstructions: "Protect from humidity to maintain aroma.",
    applications: ["Tea", "Beverages", "Bakery"],
    certificationNotes: ["Phytosanitary Support", "Export Documentation"],
    specifications: [
      { label: "Length", value: "8–12 cm" },
      { label: "Aroma", value: "Rich" },
      { label: "Breakage", value: "Minimal" },
    ],
  },
  {
    _id: "product-organic-basil-leaves",
    _type: "product",
    name: "Organic Basil Leaves",
    slug: { _type: "slug", current: "organic-basil-leaves" },
    category: { _type: "reference", _ref: "category-herbs" },
    description:
      "Clean dried basil leaves for culinary and food-service applications.",
    sourcing:
      "Harvested from herb growers that follow clean drying and low-residue handling processes.",
    grade: "Organic Select",
    packaging: "Bulk sacks, laminated pouches, and foodservice packs",
    moq: "100 kg",
    moqNote: "Ideal for seasoning blends and food manufacturers.",
    origin: "India",
    leadTime: "8–12 days",
    shelfLife: "10 months",
    storageInstructions: "Keep away from moisture and strong odors.",
    applications: ["Sauces", "Seasoning", "Foodservice"],
    certificationNotes: ["Organic Traceability", "FSSAI"],
    specifications: [
      { label: "Cut", value: "Leaf" },
      { label: "Purity", value: "98%+" },
      { label: "Color", value: "Green" },
    ],
  },
  {
    _id: "product-dehydrated-mint-leaves",
    _type: "product",
    name: "Dehydrated Mint Leaves",
    slug: { _type: "slug", current: "dehydrated-mint-leaves" },
    category: { _type: "reference", _ref: "category-herbs" },
    description:
      "Refreshing mint leaves for teas, chutneys, and food manufacturing.",
    sourcing:
      "Processed from fresh mint under low-temperature drying to preserve flavor and color.",
    grade: "Premium Herb Grade",
    packaging: "Food-grade pouches and bulk cartons",
    moq: "120 kg",
    moqNote: "Custom blend specifications supported.",
    origin: "India",
    leadTime: "8–14 days",
    shelfLife: "10 months",
    storageInstructions: "Store tightly sealed in cool, dry storage.",
    applications: ["Herbal Tea", "Seasoning", "Ready Meals"],
    certificationNotes: ["HACCP", "Export QA"],
    specifications: [
      { label: "Flavor", value: "Cooling" },
      { label: "Cut", value: "Crushed Leaf" },
      { label: "Moisture", value: "Controlled" },
    ],
  },
  {
    _id: "product-roasted-almond-kernels",
    _type: "product",
    name: "Roasted Almond Kernels",
    slug: { _type: "slug", current: "roasted-almond-kernels" },
    category: { _type: "reference", _ref: "category-nuts-seeds" },
    description:
      "Crunchy roasted almond kernels prepared for snack, bakery, and ingredient markets.",
    sourcing:
      "Procured from approved almond suppliers with roasting and grading standards in place.",
    grade: "Select Premium",
    packaging: "Nitrogen-flushed pouches, jars, and bulk cartons",
    moq: "300 kg",
    moqNote: "Retail and industrial packaging available.",
    origin: "India / USA",
    leadTime: "12–16 days",
    shelfLife: "9 months",
    storageInstructions: "Keep in airtight packaging to preserve crunch.",
    applications: ["Snacking", "Bakery", "Toppings"],
    certificationNotes: ["Food Safety Checks", "Allergen Handling"],
    specifications: [
      { label: "Roast", value: "Medium" },
      { label: "Kernel Size", value: "Uniform" },
      { label: "Oil Content", value: "Controlled" },
    ],
  },
  {
    _id: "product-organic-pumpkin-seeds",
    _type: "product",
    name: "Organic Pumpkin Seeds",
    slug: { _type: "slug", current: "organic-pumpkin-seeds" },
    category: { _type: "reference", _ref: "category-nuts-seeds" },
    description:
      "Clean organic pumpkin seeds suitable for food brands, baking, and health-focused retail.",
    sourcing:
      "Harvested and cleaned through a traceable supply chain with organic handling controls.",
    grade: "Organic Grade",
    packaging: "Food-grade pouches and bulk bags",
    moq: "250 kg",
    moqNote: "Private label packaging available on request.",
    origin: "India",
    leadTime: "10–15 days",
    shelfLife: "10 months",
    storageInstructions: "Store in dry, cool conditions away from heat.",
    applications: ["Healthy Snacks", "Granola", "Baking"],
    certificationNotes: ["Organic Controls", "FSSAI", "HACCP"],
    specifications: [
      { label: "Cleaning", value: "Machine Cleaned" },
      { label: "Grade", value: "Uniform" },
      { label: "Moisture", value: "Controlled" },
    ],
  },
];

const homepage = {
  _id: "homepage",
  _type: "homepage",
  heroEyebrow: "Global Import & Export",
  heroTitle: "Premium Global Exporters of Dried Products",
  heroSubtitle:
    "Delivering high-quality dried products worldwide with trusted sourcing, premium packaging, and export excellence.",
  heroCtaText: "Explore Products",
  heroSecondaryCtaText: "Contact Us",
  heroSecondaryCtaHref: "/contact",
  heroStats: [
    { value: "10+", label: "Countries Served" },
    { value: "50+", label: "Product Variants" },
    { value: "5000+", label: "Annual Exports" },
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
