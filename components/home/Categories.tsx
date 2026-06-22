"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import { cardVariants, itemVariants, sectionVariants } from "./motion";

type Category = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  productCount?: number | null;
};

type CategoriesProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  categories?: Category[] | null;
};

export default function Categories({
  eyebrow = "Product Categories",
  title = "Explore Our Categories",
  description = "Hand-picked export categories presented with the same premium care we bring to every shipment.",
  categories = [
    {
      title: "Dried Fruits",
      imageUrl:
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Assorted dried fruits",
    },
    {
      title: "Spices",
      imageUrl:
        "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Colorful spices in bowls",
    },
    {
      title: "Herbs",
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Fresh herbs and dried leaves",
    },
  ],
}: CategoriesProps) {
  return (
    <section id="products" style={{ scrollMarginTop: "6rem" }} className="bg-[#FFFFFF] section-padding py-16 sm:py-24 md:py-28 lg:py-32">
      <div className="container-width">
        <motion.div
          className="mb-20 max-w-3xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <motion.p variants={itemVariants} className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">{eyebrow}</motion.p>
 
          <motion.h2 variants={itemVariants} className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>{title}</motion.h2>
 
          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#555555] max-w-2xl font-light">{description}</motion.p>
        </motion.div>
 
        <div className={`grid gap-10 sm:grid-cols-2 ${
          categories && categories.length === 1 
            ? "lg:grid-cols-1 max-w-md mx-auto" 
            : categories && categories.length === 2 
            ? "lg:grid-cols-2 max-w-4xl mx-auto" 
            : categories && categories.length === 3 
            ? "lg:grid-cols-3" 
            : "lg:grid-cols-4"
        }`}>
          {categories?.map((category, index) => (
            <motion.div
              key={category?._id ?? `${category?.title ?? "category"}-${index}`} 
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ delay: index * 0.08 }}
            >
              <Card 
                className="group overflow-hidden rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_40px_rgba(15,15,15,0.1)] transition-all duration-500 hover:-translate-y-2"
              >
                <Link href={category?.slug ? `/products/${category.slug}` : "/products"} className="block">
                  <div className="relative overflow-hidden h-[360px]">
                    <Image 
                      src={category?.imageUrl || "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop"} 
                      alt={category?.imageAlt || category?.title || "Category image"} 
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
                      {category?.title}
                    </h3>
                    <p className="mt-4 text-base text-[#555555] font-light line-clamp-3">
                      {category?.description || "Premium selection, export-ready quality, and global standards."}
                    </p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="rounded-full border border-[#D9A96B]/20 bg-[#D9A96B]/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-medium">
                        {category?.productCount ? `${category.productCount} Products` : "Export Ready"}
                      </span>
                      <span className="text-sm font-medium text-[#D9A96B] transition-colors group-hover:text-[#c89a5a]">
                        View Category →
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}