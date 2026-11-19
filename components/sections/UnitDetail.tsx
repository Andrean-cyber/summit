"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Maximize2,
  Layers,
  Building2,
  BedDouble,
  Bath,
  Flower2,
  Car,
  DoorOpen,
  Clock,
  Lightbulb,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const WA_URL =
  "https://wa.me/62816500340?text=Halo%2C%20saya%20ingin%20info%20harga%20dan%20unit%20Summit%20Private%20Village.";

/* ─────────────────────────────────────────────
   DATA (sumber: PDF Product Knowledge Summit)
───────────────────────────────────────────── */
const TABS = [
  { id: "unit", label: "Unit" },
  { id: "tech", label: "Spesifikasi Teknis" },
  { id: "facility", label: "Fasilitas" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type Row = { icon?: React.ReactNode; label: string; value: string };

type TabContent = {
  images: string[];
  eyebrow: string;
  heading: string;
  body: string;
  variant: "cards" | "list";
  rows: Row[];
};

const CONTENT: Record<TabId, TabContent> = {
  unit: {
    // Ganti / tambah path foto di sini. Urutan = urutan slide.
    images: [
      "/hero1.webp",
      "/inte1.webp",
      "/inte2.webp",
      "/inte3.webp",

    ],
    eyebrow: "Summit Type 75",
    heading: "Hunian dua lantai dengan\ntiga kamar tidur.",
    body: "Home villa bergaya tropical modern dengan taman, carport, dan tata ruang yang efisien di setiap lantainya.",
    variant: "cards",
    rows: [
      { icon: <Maximize2 size={16} />, label: "Luas Tanah", value: "74 m²" },
      { icon: <Layers size={16} />, label: "Luas Bangunan", value: "75 m²" },
      { icon: <Building2 size={16} />, label: "Jumlah Lantai", value: "2 Lantai" },
      { icon: <BedDouble size={16} />, label: "Kamar Tidur", value: "3 Kamar" },
      { icon: <Bath size={16} />, label: "Kamar Mandi", value: "2 Kamar" },
      { icon: <Flower2 size={16} />, label: "Taman", value: "1 Garden" },
    ],
  },
  tech: {
    images: ["/fsd.webp"],
    eyebrow: "Spesifikasi Teknis",
    heading: "Material dan perlengkapan\nyang digunakan.",
    body: "Rincian struktur, finishing, dan perlengkapan unit Summit Type 75.",
    variant: "list",
    rows: [
      { label: "Pondasi", value: "Footplat" },
      { label: "Struktur", value: "Beton Bertulang" },
      { label: "Dinding", value: "Bata Ringan (Hebel)" },
      { label: "Lantai", value: "Granite 60×60" },
      { label: "Penutup Atap", value: "Dak Rooftop" },
      { label: "Rangka Plafond", value: "Metal Hollow" },
      { label: "Penutup Plafond", value: "Gypsumboard & GRC Board" },
      { label: "Kusen", value: "Aluminium Inkalum" },
      { label: "Pintu", value: "Solid Engineering" },
      { label: "Jendela", value: "Aluminium Inkalum" },
      { label: "Cat", value: "Jotun" },
      { label: "Railing Tangga", value: "Besi Hollow" },
      { label: "Railing Balkon", value: "Tempered Glass" },
      { label: "Sanitary", value: "Closed Duduk American Standard" },
      { label: "Air Bersih", value: "PDAM" },
      { label: "Listrik", value: "1300 Watt" },
      { label: "Lighting", value: "Smart Lamp" },
      { label: "Doorlock", value: "Smart Doorlock" },
      { label: "Carport", value: "Batu Andesit" },
    ],
  },
  facility: {
    images: ["/oneGate.webp"],
    eyebrow: "Fasilitas Kawasan",
    heading: "Keamanan dan kenyamanan\nsepanjang waktu.",
    body: "Akses satu pintu dan resepsionis yang siaga 24 jam untuk penghuni dan tamu.",
    variant: "cards",
    rows: [
      { icon: <DoorOpen size={16} />, label: "Keamanan", value: "One Gate System" },
      { icon: <Clock size={16} />, label: "Resepsionis", value: "24 Jam" },
      { icon: <Car size={16} />, label: "Parkir per Unit", value: "1 Mobil + 1 Motor" },
      { icon: <Lightbulb size={16} />, label: "Smart Home", value: "Smart Lamp & Doorlock" },
      { icon: <Flower2 size={16} />, label: "Taman Kawasan", value: "Area taman di pintu masuk" },
    ],
  },
};

const PERKS = [
  {
    icon: <MapPin size={18} />,
    label: "Dau, Malang",
    desc: "3 menit ke UIN Maulana Malik Ibrahim Kampus 3",
    href: "#location",
  },
  {
    icon: <DoorOpen size={18} />,
    label: "One Gate System",
    desc: "Akses satu pintu kawasan",
  },
  {
    icon: <Clock size={18} />,
    label: "Resepsionis 24 Jam",
    desc: "Siaga sepanjang hari",
  },
  {
    icon: <Building2 size={18} />,
    label: "Dikembangkan SAN Group",
    desc: "PT. Skala Asta Nirwana",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function UnitDetail() {
  const [activeTab, setActiveTab] = useState<TabId>("unit");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Carousel state
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const content = CONTENT[activeTab];
  const images = content.images;

  // Reset carousel setiap kali tab berganti
  useEffect(() => {
    setSlideIndex(0);
  }, [activeTab]);

  const goToSlide = (idx: number) => {
    const total = images.length;
    setSlideIndex(((idx % total) + total) % total);
  };
  const goPrev = () => goToSlide(slideIndex - 1);
  const goNext = () => goToSlide(slideIndex + 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    const threshold = 40;
    if (touchDeltaX.current > threshold) goPrev();
    else if (touchDeltaX.current < -threshold) goNext();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const show = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <section
      id="explore"
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#F7F3EA] py-16 md:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 md:px-10 lg:px-16">
        {/* ── HEADER + TABS (rata tengah di mobile, rata kiri di md+) ── */}
        <div
          className={cn(
            "mb-10 text-center transition-all duration-1000 ease-out md:mb-14 md:text-left",
            show
          )}
        >
          <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
            <span className="h-px w-10 bg-[#FF5C0B]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1D363A]/70">
              Spesifikasi Unit
            </span>
            <span className="h-px w-10 bg-[#FF5C0B] md:hidden" />
          </div>

          <h2 className="text-3xl leading-[1.1] tracking-tight text-[#1D363A] sm:text-4xl md:text-5xl">
            <span className="font-light">Mengenal</span>{" "}
            <span className="font-extrabold text-[#FF5C0B]">Summit Type 75</span>
          </h2>

          <div
            role="tablist"
            className="mt-8 flex gap-5 overflow-x-auto border-b border-[#1D363A]/15 [scrollbar-width:none] md:justify-start md:gap-7 [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    // first:ml-auto + last:mr-auto = tengah di mobile tanpa risiko terpotong
                    "relative shrink-0 cursor-pointer whitespace-nowrap pb-3 text-[11px] uppercase tracking-[0.1em] transition-colors first:ml-auto last:mr-auto sm:text-xs sm:tracking-[0.16em] md:first:ml-0 md:last:mr-0",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5C0B]",
                    active
                      ? "font-bold text-[#1D363A]"
                      : "font-medium text-[#1D363A]/45 hover:text-[#1D363A]"
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-[#FF5C0B] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── MAIN GRID: CONTENT LEFT + GALLERY RIGHT ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* CONTENT (min-w-0 mencegah kolom melebar melebihi layar) */}
          <div
            className={cn(
              "order-2 min-w-0 transition-all delay-200 duration-700 ease-out lg:order-1 lg:col-span-5",
              show
            )}
          >
            <div className="text-center lg:text-left">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF5C0B]">
                {content.eyebrow}
              </p>
              <h3 className="whitespace-pre-line text-xl font-bold leading-snug tracking-tight text-[#1D363A] sm:text-2xl md:text-3xl">
                {content.heading}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[#1D363A]/70 md:text-base lg:mx-0">
                {content.body}
              </p>
            </div>

            {content.variant === "cards" ? (
              <div className="mt-8 grid grid-cols-2 gap-3">
                {content.rows.map((row) => (
                  <div
                    key={`${activeTab}-${row.label}`}
                    className="group rounded-2xl border border-[#1D363A]/10 bg-white p-4 transition-colors duration-300 hover:border-[#FF5C0B]/40"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1D363A]/5 text-[#1D363A] transition-colors duration-300 group-hover:bg-[#FF5C0B] group-hover:text-white">
                      {row.icon}
                    </span>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#1D363A]/50">
                      {row.label}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-snug text-[#1D363A] md:text-base">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <dl className="mt-8 divide-y divide-[#1D363A]/10 border-y border-[#1D363A]/10">
                {content.rows.map((row) => (
                  <div
                    key={`${activeTab}-${row.label}`}
                    className="flex items-baseline justify-between gap-6 py-3"
                  >
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-[#1D363A]/50">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm font-bold text-[#1D363A]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center justify-between rounded-full bg-[#1D363A] py-2 pl-6 pr-2 text-[#F7F3EA] transition-colors duration-300 hover:bg-[#FF5C0B]"
            >
              <span className="text-sm font-semibold">Konsultasi & Info Harga</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F3EA] text-[#1D363A] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </a>
          </div>

          {/* GALLERY */}
          <div
            className={cn(
              "order-1 min-w-0 transition-all delay-100 duration-700 ease-out lg:order-2 lg:col-span-7",
              show
            )}
          >
            <div className="relative">
              {/* offset outline frame */}
              <div className="pointer-events-none absolute -bottom-3 -right-3 hidden h-full w-full rounded-[2rem] border border-[#FF5C0B]/50 md:block" />

              <div
                className="relative h-[320px] w-full overflow-hidden rounded-3xl sm:h-[440px] md:rounded-[2rem] lg:h-[520px]"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* slides track */}
                <div
                  className="absolute inset-0 flex h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                >
                  {images.map((src, i) => (
                    <div key={src} className="relative h-full w-full shrink-0 basis-full">
                      <Image
                        src={src}
                        alt={`${content.eyebrow} - foto ${i + 1}`}
                        fill
                        sizes="(min-width: 1024px) 700px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1D363A]/60 via-transparent to-transparent" />

                {/* caption: disembunyikan di mobile supaya tidak menumpuk dengan kontrol */}
                <div className="absolute bottom-4 left-4 z-10 hidden max-w-[50%] rounded-2xl bg-[#F7F3EA]/95 px-4 py-2.5 shadow-lg sm:block">
                  <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1D363A]">
                    {content.eyebrow}
                  </p>
                </div>

                {/* counter + arrows: mobile = satu baris penuh (counter kiri, panah kanan) */}
                <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between sm:inset-x-auto sm:bottom-4 sm:right-4 sm:justify-end sm:gap-2">
                  <span className="rounded-full bg-[#1D363A]/70 px-3 py-1.5 text-[11px] font-medium tabular-nums text-[#F7F3EA] backdrop-blur-md">
                    {String(slideIndex + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </span>
                  {images.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Foto sebelumnya"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-colors duration-300 hover:bg-[#FF5C0B]"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Foto berikutnya"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-colors duration-300 hover:bg-[#FF5C0B]"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => goToSlide(i)}
                    aria-label={`Ke foto ${i + 1}`}
                    className={cn(
                      "relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300",
                      i === slideIndex
                        ? "border-[#FF5C0B]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── PERKS BAND ── */}
        <div
          className={cn(
            "mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-[#1D363A]/10 transition-all delay-300 duration-700 ease-out sm:grid-cols-2 lg:mt-20 lg:grid-cols-4",
            show
          )}
        >
          {PERKS.map((p) => {
            const cls = "flex items-center gap-4 bg-white p-5 transition-colors duration-300";
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF5C0B]/10 text-[#FF5C0B]">
                  {p.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-[#1D363A]">{p.label}</p>
                  <p className="mt-1 text-[11px] font-light leading-snug text-[#1D363A]/60">
                    {p.desc}
                  </p>
                </div>
              </>
            );
            return p.href ? (
              <a key={p.label} href={p.href} className={cn(cls, "hover:bg-[#F7F3EA]")}>
                {inner}
              </a>
            ) : (
              <div key={p.label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}