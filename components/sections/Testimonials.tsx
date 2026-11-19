"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SKALA TIPOGRAFI (sama di semua section)
 * Satu keluarga font sans (font-sans), hierarki dari tebal-tipis:
 * Judul section: text-3xl md:text-4xl lg:text-5xl font-light tracking-tight (kata kunci font-semibold)
 * Kutipan: text-2xl md:text-3xl font-light | Nama: text-base font-semibold
 * Lead: text-base md:text-lg font-light | Body: text-base | Small: text-sm font-light | Caption: text-xs
 */

const WA_URL = `https://wa.me/62816500340?text=${encodeURIComponent(
  "Halo Summit Private Village, saya ingin bertanya tentang unit yang tersedia."
)}`;

/**
 * PENTING: data di bawah adalah DUMMY (nama, kota, dan isi kutipan fiktif).
 * Unit belum dibangun, jadi tidak ada testimoni tamu menginap: pemberi testimoni hanya
 * pembeli atau calon pembeli, dan isinya seputar survey, konsep, spesifikasi, dan pelayanan tim.
 * Ganti dengan testimoni ASLI (dengan izin yang bersangkutan) sebelum website dipublikasikan.
 * Jika belum ada, kosongkan array ini: section otomatis tidak ditampilkan.
 * Foto avatar masih milik Corestay, ganti manual di /public.
 */
const testimonials = [
  {
    quote:
      "Saya sudah survey ke lokasi di Dau dan melihat langsung rencana kawasannya. Konsep one gate system dan lingkungannya yang tenang membuat saya yakin mengambil satu unit untuk keluarga.",
    author: "Budi Santoso",
    title: "Pembeli unit",
    origin: "Surabaya",
    avatar: "/psn1.webp",
  },
  {
    quote:
      "Yang membuat saya tertarik adalah simulasi pendapatannya yang dijelaskan terbuka, lengkap dengan catatan bahwa itu estimasi. Smart doorlock juga cocok untuk villa sewa karena pengelolaannya lebih praktis.",
    author: "dr. Rina Kusumawati",
    title: "Pembeli unit",
    origin: "Sidoarjo",
    avatar: "/dokter.webp",
  },
  {
    quote:
      "Tim Summit menjelaskan spesifikasi dan harga dengan jelas lewat WhatsApp. Desain tropical modern dua lantainya sesuai dengan yang saya cari untuk rumah kedua di Malang.",
    author: "Andi Prasetyo",
    title: "Calon pembeli",
    origin: "Jakarta",
    avatar: "/psn2.webp",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];
  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden bg-[#F2F6F5] px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="max-w-2xl text-3xl font-light leading-tight tracking-tight text-[#1D363A] md:text-4xl lg:text-5xl">
          Kata mereka yang <span className="font-semibold">sudah mengenal</span> Summit
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* KIRI: daftar pemberi testimoni */}
          <div
            role="tablist"
            aria-label="Pilih testimoni"
            className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {testimonials.map((item, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={idx}
                  role="tab"
                  id={`tab-${idx}`}
                  aria-selected={isActive}
                  aria-controls="testimonial-panel"
                  onClick={() => setActive(idx)}
                  className={cn(
                    "flex min-w-[220px] items-center gap-4 rounded-2xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5C0B] lg:min-w-0",
                    isActive
                      ? "border-[#1D363A] bg-white"
                      : "border-transparent bg-white/60 hover:bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2",
                      isActive ? "border-[#FF5C0B]" : "border-transparent"
                    )}
                  >
                    <Image src={item.avatar} alt="" fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-[#1D363A]">
                      {item.author}
                    </p>
                    <p className="truncate text-sm font-light text-[#1D363A]/60">
                      {item.title}, {item.origin}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* KANAN: kutipan */}
          <div
            role="tabpanel"
            id="testimonial-panel"
            aria-labelledby={`tab-${active}`}
            className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl bg-[#1D363A] p-8 text-white md:p-12 lg:col-span-8"
          >
            <Quote
              size={96}
              aria-hidden="true"
              className="absolute right-6 top-6 fill-[#FF5C0B]/15 text-transparent md:right-10 md:top-10"
            />

            <blockquote
              key={active}
              className="relative animate-in fade-in duration-500 motion-reduce:animate-none"
            >
              <p className="text-2xl font-light leading-snug tracking-tight md:text-3xl">
                {current.quote}
              </p>
            </blockquote>

            <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold">{current.author}</p>
                <p className="text-sm font-light text-white/60">
                  {current.title}, {current.origin}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={prev}
                  aria-label="Testimoni sebelumnya"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-[#FF5C0B] hover:bg-[#FF5C0B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Testimoni berikutnya"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-[#FF5C0B] hover:bg-[#FF5C0B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#1D363A]/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-base font-light text-[#1D363A]/70">
            Ingin bertanya langsung ke <span className="font-medium">tim Summit</span>?
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF5C0B] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e65209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D363A]"
          >
            <MessageCircle size={18} />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}