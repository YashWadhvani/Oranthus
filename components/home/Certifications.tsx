import Image from "next/image";

type Certification = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  issuer?: string | null;
  validity?: string | null;
  standards?: string[] | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

type CertificationsProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  certifications?: Certification[] | null;
};

export default function Certifications({
  eyebrow = "Certifications",
  title = "International Standards & Compliance",
  description = "Trusted badges and approvals that reinforce our quality-first export process.",
  certifications = [
    { title: "ISO Certified" },
    { title: "APEDA Approved" },
    { title: "FSSAI Certified" },
    { title: "HACCP Standards" },
  ],
}: CertificationsProps) {
  return (
    <section id="certifications" style={{ scrollMarginTop: "6rem" }} className="bg-[#FFFFFF] section-padding py-16 sm:py-24 md:py-28 lg:py-32">
      <div className="container-width">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <p className="mb-8 text-xs uppercase tracking-[0.4em] text-[#D9A96B] font-semibold">{eyebrow}</p>

          <h2 className="text-5xl lg:text-6xl font-semibold leading-[1.2] tracking-tight text-[#111111] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>{title}</h2>

          <p className="text-lg leading-relaxed text-[#555555] font-light">{description}</p>
        </div>

        <div className="grid gap-8 grid-cols-2 md:grid-cols-4">
          {certifications?.map((item, index) => (
            <div 
              key={item?._id ?? `${item?.title ?? "certification"}-${index}`} 
              className="group flex flex-col items-center gap-5 rounded-2xl border border-[#ECE8DF] bg-[#FAF8F5] p-8 text-center shadow-[0_8px_24px_rgba(15,15,15,0.04)] hover:shadow-[0_12px_32px_rgba(15,15,15,0.08)] transition-all duration-300 hover:-translate-y-2 hover:bg-[#FFFFFF]"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#D9A96B]/10 to-transparent border border-[#D9A96B]/10 group-hover:border-[#D9A96B]/20 transition-colors">
                {item?.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.imageAlt || item.title || "Certification badge"} width={48} height={48} className="object-contain" />
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A96B]">Badge</span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-[#111111]">{item?.title}</h3>
              <p className="text-sm text-[#555555] font-light">{item?.description || "Certified & Approved"}</p>
              {item?.issuer && <p className="text-xs text-[#555555] uppercase tracking-[0.2em]">{item.issuer}</p>}
              {item?.validity && <p className="text-xs text-[#555555]">Validity: {item.validity}</p>}
              {item?.standards?.length ? (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {item.standards.map((standard) => (
                    <span key={standard} className="rounded-full border border-[#ECE8DF] bg-[#FFFFFF] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#555555]">
                      {standard}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}