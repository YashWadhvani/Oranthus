"use client";

import { motion } from "framer-motion";
import {
  Search,
  Ship,
  Users,
  CheckCircle,
  FileText,
  Box,
  Globe,
  Zap,
} from "lucide-react";

import { cardVariants, itemVariants, sectionVariants } from "./motion";

type Service = {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

type ServicesProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  services?: Service[] | null;
};

const iconMap = {
  search: Search,
  ship: Ship,
  users: Users,
  checkCircle: CheckCircle,
  fileText: FileText,
  box: Box,
  globe: Globe,
  zap: Zap,
} as const;

export default function Services({
  eyebrow = "Our Services",
  title = "Complete Export Solutions",
  description = "End-to-end sourcing and export services designed to simplify your procurement needs.",
  services = [
    {
      title: "Product Sourcing",
      icon: "search",
      description: "Identify and source quality products from trusted Indian manufacturers.",
    },
    {
      title: "Merchant Exporting",
      icon: "ship",
      description: "Professional export support with international logistics coordination.",
    },
    {
      title: "Supplier Identification",
      icon: "users",
      description: "Connect you with vetted and reliable Indian suppliers across sectors.",
    },
    {
      title: "Quality Coordination",
      icon: "checkCircle",
      description: "Ensure product consistency and quality standards throughout the supply chain.",
    },
    {
      title: "Export Documentation",
      icon: "fileText",
      description: "Complete documentation support for hassle-free international trade.",
    },
    {
      title: "Custom Packaging",
      icon: "box",
      description: "Tailored packaging solutions designed for international requirements.",
    },
    {
      title: "Trade Facilitation",
      icon: "globe",
      description: "Streamlined international trade facilitation for seamless transactions.",
    },
    {
      title: "Fast Execution",
      icon: "zap",
      description: "Quick turnaround times with efficient procurement and delivery processes.",
    },
  ],
}: ServicesProps) {
  return (
    <section id="services" style={{ scrollMarginTop: "6rem" }} className="bg-[#FFFFFF] section-padding py-16 sm:py-24 md:py-28 lg:py-32">
      <div className="container-width">
        <motion.div
          className="mb-20 text-center max-w-3xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
        >
          <motion.p variants={itemVariants} className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
            {eyebrow}
          </motion.p>

          <motion.h2 
            variants={itemVariants} 
            className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8" 
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {title}
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#555555] font-light">
            {description}
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services?.map((service, index) => {
            const Icon = service?.icon ? iconMap[service.icon as keyof typeof iconMap] : Search;

            return (
              <motion.div
                key={`${service?.title ?? "service"}-${index}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 text-center shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_32px_rgba(15,15,15,0.08)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#D9A96B]/15 to-transparent border border-[#D9A96B]/10">
                  <Icon className="h-8 w-8 text-[#D9A96B]" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[#111111]">{service?.title}</h3>

                <p className="mt-4 text-base leading-relaxed text-[#555555] font-light">
                  {service?.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
