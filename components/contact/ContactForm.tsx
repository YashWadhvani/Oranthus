"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

type ProductOption = {
  _id: string;
  name: string;
};

type ServiceOption = {
  _id: string;
  title: string;
};

type ContactFormProps = {
  products: ProductOption[];
  services: ServiceOption[];
  contactEmail: string;
  whatsappNumber: string;
};

const getProductTemplate = (prodName: string) =>
  `Dear Oranthus Team,\n\nI would like to request a bulk quote and specifications sheet for the product: ${prodName}.\n\nInquiry Details:\n- Destination Port: [e.g. Rotterdam, NL]\n- Target Volume: [e.g. 20 Metric Tons]\n- Packing Specification: [e.g. 25kg multi-ply paper bags]\n- Intended Application: [e.g. Food manufacturing]\n\nBest regards,\n[Your Name]`;

const getServiceTemplate = (servName: string) =>
  `Dear Oranthus Team,\n\nI would like to inquire about your export service: ${servName}.\n\nInquiry Details:\n- Product/Commodity: [e.g. Spices, Dehydrated Onion]\n- Sourcing Scope: [e.g. Quality inspection, procurement, freight forwarding]\n- Project Details: [Detail your requirements here...]\n\nBest regards,\n[Your Name]`;

const getGeneralTemplate = () =>
  `Dear Oranthus Team,\n\nI would like to reach out to your trade desk regarding a general business inquiry.\n\nInquiry Details:\n[Detail your business query here...]\n\nBest regards,\n[Your Name]`;

function ContactFormInner({ products, services, contactEmail, whatsappNumber }: ContactFormProps) {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState<"general" | "product" | "service">("general");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");

  const [isMessageEdited, setIsMessageEdited] = useState(false);
  const [submitAction, setSubmitAction] = useState<"whatsapp" | "email">("whatsapp");

  // Parse initial query params and trigger auto-scroll if redirected with parameters
  useEffect(() => {
    const prodParam = searchParams.get("product");
    const servParam = searchParams.get("service");
    let hasParam = false;

    if (prodParam) {
      hasParam = true;
      setInquiryType("product");
      // Find exact product name match or set the raw param value
      const matchedProd = products.find(p => p.name.toLowerCase() === prodParam.toLowerCase());
      const finalProd = matchedProd ? matchedProd.name : prodParam;
      setSelectedProduct(finalProd);
      setMessage(getProductTemplate(finalProd));
    } else if (servParam) {
      hasParam = true;
      setInquiryType("service");
      const matchedServ = services.find(s => s.title.toLowerCase() === servParam.toLowerCase());
      const finalServ = matchedServ ? matchedServ.title : servParam;
      setSelectedService(finalServ);
      setMessage(getServiceTemplate(finalServ));
    } else {
      setInquiryType("general");
      setMessage(getGeneralTemplate());
    }

    if (hasParam) {
      // Small timeout to allow rendering/layout to complete, then scroll smoothly
      setTimeout(() => {
        const element = document.getElementById("inquiry-form-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 350);
    }
  }, [searchParams, products, services]);

  // Update template on inquiry type or item selection change, if not manually edited
  const handleInquiryTypeChange = (type: "general" | "product" | "service") => {
    setInquiryType(type);
    setIsMessageEdited(false);

    if (type === "general") {
      setMessage(getGeneralTemplate());
    } else if (type === "product") {
      const prodName = selectedProduct || (products[0] ? products[0].name : "Dried Onion Flakes");
      if (!selectedProduct && products[0]) {
        setSelectedProduct(products[0].name);
      }
      setMessage(getProductTemplate(prodName));
    } else if (type === "service") {
      const servTitle = selectedService || (services[0] ? services[0].title : "Procurement");
      if (!selectedService && services[0]) {
        setSelectedService(services[0].title);
      }
      setMessage(getServiceTemplate(servTitle));
    }
  };

  const handleProductChange = (prodName: string) => {
    setSelectedProduct(prodName);
    if (!isMessageEdited) {
      setMessage(getProductTemplate(prodName));
    }
  };

  const handleServiceChange = (servTitle: string) => {
    setSelectedService(servTitle);
    if (!isMessageEdited) {
      setMessage(getServiceTemplate(servTitle));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in your Name and Work Email.");
      return;
    }

    let subject = "General Trade Inquiry - Oranthus";
    if (inquiryType === "product" && selectedProduct) {
      subject = `Product Inquiry: Bulk ${selectedProduct}`;
    } else if (inquiryType === "service" && selectedService) {
      subject = `Service Inquiry: ${selectedService}`;
    }

    if (submitAction === "whatsapp") {
      // Format the message with WhatsApp markdown formatting (e.g. *bold*)
      const formattedMessage = `*${subject}*\n\n${message}\n\n*Sender Details:*\n- *Name:* ${name}\n- *Work Email:* ${email}`;

      const cleanNumber = whatsappNumber ? whatsappNumber.replace(/\D/g, "") : "919316927113";
      const finalNumber = cleanNumber.startsWith("91") ? cleanNumber : "91" + cleanNumber;
      const waUrl = `https://wa.me/${finalNumber}?text=${encodeURIComponent(formattedMessage)}`;

      // Redirect to WhatsApp link in a new tab
      const link = document.createElement("a");
      link.href = waUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    } else {
      // Format email mailto link
      const recipient = contactEmail || "info@oranthus.com";
      const fullBody = `${message}\n\n---\nSender Details:\nName: ${name}\nWork Email: ${email}`;
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;

      // Launch default email client
      const link = document.createElement("a");
      link.href = mailtoUrl;
      link.click();
    }
  };

  return (
    <ScrollReveal
      direction="right"
      delay={0.1}
      layout
      className={`rounded-3xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 sm:p-10 shadow-[0_12px_40px_rgba(15,15,15,0.03)] ${
        inquiryType === "general" ? "lg:mt-[94px]" : "lg:mt-0"
      }`}
    >
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-semibold text-[#111111]" style={{ fontFamily: "var(--font-playfair)" }}>
            Send an Export Inquiry
          </h3>
          <p className="text-xs text-[#555555] font-light mt-1">We respond to specifications worksheets within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className={inquiryType === "general" ? "space-y-4" : "space-y-5"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555555]">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-[#ECE8DF] bg-white text-sm focus:outline-none focus:border-[#D9A96B] transition-colors text-[#111111]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555555]">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@importco.com"
                className="w-full px-4 py-2.5 rounded-lg border border-[#ECE8DF] bg-white text-sm focus:outline-none focus:border-[#D9A96B] transition-colors text-[#111111]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#555555]">Inquiry Focus</label>
            <select
              value={inquiryType}
              onChange={(e) => handleInquiryTypeChange(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#ECE8DF] bg-white text-sm focus:outline-none focus:border-[#D9A96B] transition-colors text-[#111111] font-medium"
            >
              <option value="general">General Business Inquiry</option>
              <option value="product">Product Sourcing (Bulk Quote)</option>
              <option value="service">Export Desk Service Support</option>
            </select>
          </div>

          <AnimatePresence initial={false}>
            {inquiryType === "product" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1.5 pb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#555555]">Select Target Product</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => handleProductChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#ECE8DF] bg-white text-sm focus:outline-none focus:border-[#D9A96B] transition-colors text-[#111111]"
                  >
                    {products.map((p) => (
                      <option key={p._id} value={p.name}>{p.name}</option>
                    ))}
                    {!products.length && <option value="Dried Onion Flakes">Dried Onion Flakes</option>}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {inquiryType === "service" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1.5 pb-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#555555]">Select Export Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#ECE8DF] bg-white text-sm focus:outline-none focus:border-[#D9A96B] transition-colors text-[#111111]"
                  >
                    {services.map((s) => (
                      <option key={s._id} value={s.title}>{s.title}</option>
                    ))}
                    {!services.length && <option value="Global Sourcing Desk">Global Sourcing Desk</option>}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#555555]">Inquiry Details</label>
              {isMessageEdited && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMessageEdited(false);
                    if (inquiryType === "general") setMessage(getGeneralTemplate());
                    else if (inquiryType === "product") setMessage(getProductTemplate(selectedProduct));
                    else if (inquiryType === "service") setMessage(getServiceTemplate(selectedService));
                  }}
                  className="text-[10px] text-[#D9A96B] hover:underline cursor-pointer"
                >
                  Reset Template
                </button>
              )}
            </div>
            <textarea
              rows={7}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setIsMessageEdited(true);
              }}
              placeholder="Detail your specifications, moisture limit, packing type (e.g. multi-ply paper bags), target volume, and destination port..."
              className="w-full px-4 py-2.5 rounded-lg border border-[#ECE8DF] bg-white text-sm focus:outline-none focus:border-[#D9A96B] transition-colors resize-none text-[#111111] font-light leading-relaxed"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="submit"
              onClick={() => setSubmitAction("whatsapp")}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5f] text-white py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_12px_rgba(37,211,102,0.15)] cursor-pointer"
            >
              <span>Send via WhatsApp</span>
              <FaWhatsapp className="h-4 w-4" />
            </button>

            <button
              type="submit"
              onClick={() => setSubmitAction("email")}
              className="w-full flex items-center justify-center gap-2 bg-[#D9A96B] hover:bg-[#c89a5a] text-white py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_12px_rgba(217,169,107,0.15)] cursor-pointer"
            >
              <span>Send via Email</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </ScrollReveal>
  );
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<div className="text-center py-8 text-sm text-neutral-500">Loading form parameters...</div>}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}
