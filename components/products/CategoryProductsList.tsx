"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, 
  MapPin, 
  Clock, 
  Package, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ProductDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: string | null;
  sourcing?: string | null;
  thumbnailUrl?: string | null;
  thumbnailAlt?: string | null;
  grade?: string | null;
  specifications?: {
    label?: string | null;
    value?: string | null;
  }[] | null;
  packaging?: string | null;
  moq?: string | null;
  moqNote?: string | null;
  origin?: string | null;
  leadTime?: string | null;
  shelfLife?: string | null;
  storageInstructions?: string | null;
  applications?: string[] | null;
  certificationNotes?: string[] | null;
};

type CategoryProductsListProps = {
  products: ProductDetail[];
  categorySlug: string;
  categoryTitle: string;
};

export default function CategoryProductsList({ 
  products, 
  categorySlug,
  categoryTitle 
}: CategoryProductsListProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct]);

  return (
    <>
      <section className="bg-[#FAF8F5] py-20 sm:py-28 section-padding">
        <div className="container-width">
          <div className="mb-12 max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">
              Available Range
            </p>
            <h2 
              className="text-4xl sm:text-5xl font-semibold text-[#111111]" 
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Explore {categoryTitle} Specifications
            </h2>
            <p className="mt-4 text-base text-[#555555] font-light">
              Select any product card below to view detailed chemical and physical specifications, shipping packaging parameters, and MOQ options.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.length ? (
              products.map((product) => (
                <Card 
                  key={product._id} 
                  className="group overflow-hidden rounded-2xl border-[#ECE8DF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(15,15,15,0.03)] hover:shadow-[0_16px_48px_rgba(217,169,107,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={product.thumbnailUrl || "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop"}
                      alt={product.thumbnailAlt || product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        {product.grade || "Export Grade"}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-8 flex flex-col flex-grow">
                    <h3 
                      className="text-2xl font-semibold text-[#111111] group-hover:text-[#D9A96B] transition-colors duration-300" 
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {product.name}
                    </h3>
                    
                    <p className="mt-4 text-sm leading-relaxed text-[#555555] font-light line-clamp-3 flex-grow">
                      {product.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-[#555555] font-medium uppercase tracking-wider">
                      {product.moq && (
                        <span className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-3 py-1">
                          MOQ: {product.moq}
                        </span>
                      )}
                      {product.origin && (
                        <span className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-3 py-1">
                          {product.origin}
                        </span>
                      )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#ECE8DF]/60 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A96B]">
                      <span>View Specifications</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-[#ECE8DF]">
                <p className="text-[#555555] font-light">No products found in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Details Modal Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedProduct(null)}
          />

          {/* Modal Container */}
          <div className="relative max-w-4xl w-full rounded-3xl bg-white border border-[#ECE8DF] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#ECE8DF] text-[#111111] hover:bg-[#FAF8F5] hover:text-[#D9A96B] transition-all duration-300 shadow-sm"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Section: Cover Image & Key Badges */}
            <div className="relative md:w-[40%] bg-[#FAF8F5] border-b md:border-b-0 md:border-r border-[#ECE8DF] flex flex-col shrink-0">
              <div className="relative h-64 md:h-full min-h-[220px]">
                <Image
                  src={selectedProduct.thumbnailUrl || "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1200&auto=format&fit=crop"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <span className="rounded bg-[#D9A96B] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    {selectedProduct.grade || "Export Quality"}
                  </span>
                  <h4 className="mt-3 text-sm font-semibold tracking-wide flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#D9A96B]" />
                    Origin: {selectedProduct.origin || "India"}
                  </h4>
                </div>
              </div>
            </div>

            {/* Right Section: Details (Scrollable) */}
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-260px)] md:max-h-[85vh] flex-grow">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D9A96B] font-semibold">
                  {categoryTitle}
                </span>
                <h3 
                  className="mt-2 text-3xl sm:text-4xl font-semibold text-[#111111]" 
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {selectedProduct.name}
                </h3>
                
                <p className="mt-4 text-base leading-relaxed text-[#555555] font-light">
                  {selectedProduct.description}
                </p>

                {/* Sourcing Details */}
                {selectedProduct.sourcing && (
                  <div className="mt-6 p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE8DF]/60 text-sm leading-relaxed text-[#555555] font-light">
                    <h5 className="font-semibold text-[#111111] mb-1 text-[11px] uppercase tracking-[0.15em] text-[#D9A96B]">Sourcing Process</h5>
                    {selectedProduct.sourcing}
                  </div>
                )}

                {/* Tabular Specifications */}
                <div className="mt-8">
                  <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Technical Specifications
                  </h4>
                  <div className="border border-[#ECE8DF] rounded-xl overflow-hidden bg-white shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                    {selectedProduct.specifications?.length ? (
                      selectedProduct.specifications.map((spec, idx) => (
                        <div 
                          key={`${spec.label}-${idx}`} 
                          className={`flex justify-between items-center px-5 py-3.5 text-sm ${
                            idx !== selectedProduct.specifications!.length - 1 ? "border-b border-[#ECE8DF]/60" : ""
                          }`}
                        >
                          <span className="font-medium text-[#111111]">{spec.label}</span>
                          <span className="text-[#555555] font-light text-right">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-5 py-4 text-sm text-[#555555] font-light">
                        Custom mesh size, color value, and moisture requirements graded per buyer contract.
                      </div>
                    )}
                  </div>
                </div>

                {/* Logistic Parameters */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="p-5 rounded-xl border border-[#ECE8DF] bg-white">
                    <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#D9A96B] font-semibold flex items-center gap-2 mb-3">
                      <Package className="h-4 w-4" /> Packing & MOQ
                    </h5>
                    <div className="space-y-1.5 text-xs text-[#555555] font-light">
                      <p><strong className="font-medium text-[#111111]">MOQ:</strong> {selectedProduct.moq || "On request"}</p>
                      <p><strong className="font-medium text-[#111111]">Packaging:</strong> {selectedProduct.packaging || "Custom export packaging"}</p>
                      {selectedProduct.leadTime && <p><strong className="font-medium text-[#111111]">Lead Time:</strong> {selectedProduct.leadTime}</p>}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border border-[#ECE8DF] bg-white">
                    <h5 className="text-[11px] uppercase tracking-[0.2em] text-[#D9A96B] font-semibold flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4" /> Storage & Integrity
                    </h5>
                    <div className="space-y-1.5 text-xs text-[#555555] font-light">
                      <p><strong className="font-medium text-[#111111]">Shelf Life:</strong> {selectedProduct.shelfLife || "12 Months"}</p>
                      <p><strong className="font-medium text-[#111111]">Directives:</strong> {selectedProduct.storageInstructions || "Store in sealed, cool, dry containers."}</p>
                    </div>
                  </div>
                </div>

                {/* Applications and Certifications */}
                {selectedProduct.applications?.length || selectedProduct.certificationNotes?.length ? (
                  <div className="mt-8 border-t border-[#ECE8DF]/60 pt-6 space-y-4">
                    {selectedProduct.applications?.length ? (
                      <div>
                        <h5 className="text-[11px] uppercase tracking-[0.25em] text-[#D9A96B] font-semibold mb-2">Suitable Applications</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProduct.applications.map((app) => (
                            <span 
                              key={app} 
                              className="rounded-full border border-[#ECE8DF] bg-[#FAF8F5] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#555555]"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {selectedProduct.certificationNotes?.length ? (
                      <div className="flex items-start gap-2.5 text-xs text-[#555555] font-light bg-[#FAF8F5] p-3 rounded-lg border border-[#ECE8DF]/60">
                        <AlertCircle className="h-4 w-4 text-[#D9A96B] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-medium text-[#111111]">Compliance Notes:</strong> {selectedProduct.certificationNotes.join(", ")}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* Action Buttons Footer */}
              <div className="border-t border-[#ECE8DF] p-6 bg-[#FAF8F5] flex justify-end gap-3 shrink-0">
                <button 
                  className="px-6 py-2.5 rounded-lg border border-[#ECE8DF] bg-white text-xs font-semibold uppercase tracking-[0.18em] text-[#555555] hover:bg-[#FAF8F5] hover:text-[#111111] transition-all"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
                <Link 
                  href={`/contact?product=${encodeURIComponent(selectedProduct.name)}`}
                  className="px-6 py-2.5 rounded-lg bg-[#D9A96B] text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#c89a5a] transition-all shadow-[0_4px_12px_rgba(217,169,107,0.2)]"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
