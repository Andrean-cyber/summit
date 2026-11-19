"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ZoomIn, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SKALA TIPOGRAFI (sama di semua section)
 * Satu keluarga font sans (font-sans), hierarki dari tebal-tipis:
 * Judul section: text-3xl md:text-4xl lg:text-5xl font-light tracking-tight (kata kunci font-semibold)
 * Judul kecil: text-xl font-medium | Lead: text-base md:text-lg font-light
 * Body: text-base font-normal | Small: text-sm font-light | Caption: text-xs
 */

const WA_URL = `https://wa.me/62816500340?text=${encodeURIComponent(
  "Halo Summit Private Village, saya ingin menjadwalkan survey ke lokasi."
)}`;

// Foto berisi dokumentasi kunjungan pembeli dan unit terjual.
// Keterangan disesuaikan dengan isi foto; ubah bila foto penggantinya berbeda.
const spots = [
  {
    title: "Unit blok terjual",
    desc: "Pembeli yang survey langsung lalu mengamankan unitnya.",
    image: "/survy1.webp",
  },
  {
    title: "Kunjungan pembeli",
    desc: "Survey ke lokasi bersama tim Summit Private Village.",
    image: "/survy2.webp",
  },
  {
    title: "Unit blok terjual",
    desc: "Dokumentasi serah terima dengan pembeli di lokasi.",
    image: "/survy3.webp",
  },
  {
    title: "Kunjungan pembeli",
    desc: "Calon pembeli melihat unit dan kawasan secara langsung.",
    image: "/survy4.webp",
  },
];

export default function Survey() {
  const [active, setActive] = useState<{ src: string; title: string } | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Kunci scroll, tutup dengan Escape, fokus ke tombol tutup, lalu kembalikan fokus.
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      lastTriggerRef.current?.focus();
    };
  }, [active]);

  return (
    <section
      id="survey"
      className="w-full overflow-hidden bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-16">
        {/* KIRI: ajakan survey */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-light leading-tight tracking-tight text-[#1D363A] md:text-4xl lg:text-5xl">
              Lihat <span className="font-semibold">langsung</span> sebelum memutuskan
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed text-[#1D363A]/70 md:text-lg">
              Banyak pembeli memutuskan setelah datang langsung ke Summit Private Village di
              Dau, Malang. Jadwalkan survey untuk melihat unit, kawasan dengan one gate
              system, dan lingkungan sekitarnya dengan mata sendiri.
            </p>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FF5C0B] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#e65209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D363A]"
            >
              <MessageCircle size={18} />
              Jadwalkan survey
            </a>
            <p className="mt-3 text-sm font-light text-[#1D363A]/60">
              Balasan lewat WhatsApp <span className="font-medium">0816 500 340</span>.
            </p>
          </div>
        </div>

        {/* KANAN: galeri 2 kolom, kolom kanan sedikit turun */}
        <ul className="grid gap-4 sm:grid-cols-2 sm:pb-12 lg:col-span-7 lg:gap-5">
          {spots.map((spot, i) => (
            <li key={`${spot.image}-${i}`} className={cn(i % 2 === 1 && "sm:mt-12")}>
              <button
                type="button"
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget;
                  setActive({ src: spot.image, title: spot.title });
                }}
                aria-label={`Perbesar foto: ${spot.title}`}
                className="group block w-full overflow-hidden rounded-2xl bg-[#1D363A] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5C0B]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={spot.image}
                    alt={spot.title}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1D363A]">
                    <ZoomIn size={16} />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xl font-medium tracking-tight text-white">{spot.title}</p>
                  <p className="mt-1 text-sm font-light text-white/70">{spot.desc}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* LIGHTBOX */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setActive(null)}
            aria-label="Tutup foto"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF5C0B] md:right-6 md:top-6"
          >
            <X size={22} />
          </button>

          <div
            className="relative h-[65vh] w-full max-w-4xl overflow-hidden rounded-2xl md:h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-contain"
              quality={90}
              priority
            />
          </div>

          <p className="mt-4 text-center text-xl font-medium tracking-tight text-white">
            {active.title}
          </p>
          <p className="mt-1 text-sm font-light text-white/60">
            Tekan Esc atau klik area gelap untuk menutup.
          </p>
        </div>
      )}
    </section>
  );
}