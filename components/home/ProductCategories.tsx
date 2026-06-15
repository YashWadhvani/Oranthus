"use client";

import { motion } from "framer-motion";
import { itemVariants, sectionVariants } from "./motion";

type ProductCategory = {
  name?: string | null;
  description?: string | null;
  items?: string[] | null;
};

type ProductCategoriesProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  categories?: ProductCategory[] | null;
};

export default function ProductCategories({
  eyebrow = "What We Offer",
  title = "Product Categories",
  description = "Comprehensive range of quality products sourced from trusted Indian manufacturers.",
  categories = [
    {
      name: "Agro & Food Products",
      description: "Premium dehydrated and processed agricultural products",
      items: [
        "Dehydrated Onion Flakes",
        "Dehydrated Garlic Flakes",
        "Onion Powder",
        "Garlic Powder",
        "Spices & Seasonings",
        "Herbs & Botanical Products",
        "Moringa Products",
      ],
    },
    {
      name: "Agricultural Commodities",
      description: "Essential commodity crops and processed agricultural materials",
      items: [
        "Grains",
        "Pulses",
        "Oilseeds",
        "Processed Agricultural Products",
      ],
    },
    {
      name: "Industrial & Consumer Products",
      description: "Custom-sourced products from verified Indian manufacturers",
      items: [
        "Products sourced as per buyer requirements",
        "Verified manufacturer partnerships",
        "Quality-assured delivery",
      ],
    },
  ],
}: ProductCategoriesProps) {
  return (
    <section id="categories" style={{ scrollMarginTop: "6rem" }} className="bg-[#FAF8F5] section-padding py-16 sm:py-24 md:py-28 lg:py-32">
      <div className="container-width">
        <motion.div
          className="mb-20 text-center max-w-3xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <motion.p 
            variants={itemVariants} 
            className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold"
          >
            {eyebrow}
          </motion.p>

          <motion.h2 
            variants={itemVariants} 
            className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8" 
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </motion.h2>

          <motion.p 
            variants={itemVariants} 
            className="text-lg leading-relaxed text-[#555555] font-light"
          >
            {description}
          </motion.p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category, index) => (
            <motion.div
              key={`${category?.name ?? "category"}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="rounded-2xl border border-[#ECE8DF] bg-[#FFFFFF] p-10 shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_32px_rgba(15,15,15,0.08)] transition-all duration-300 hover:-translate-y-2"
            >
              {/* Category Header */}
              <div className="mb-8 pb-8 border-b border-[#ECE8DF]">
                <h3 
                  className="text-2xl font-semibold text-[#111111] mb-3" 
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {category?.name}
                </h3>
                <p className="text-base text-[#D9A96B] font-medium">
                  {category?.description}
                </p>
              </div>

              {/* Category Items */}
              <ul className="space-y-3">
                {category?.items?.map((item, itemIndex) => (
                  <motion.li
                    key={`${item}-${itemIndex}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.1) + (itemIndex * 0.05), duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[#D9A96B]" />
                    <span className="text-base text-[#555555] font-light leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
