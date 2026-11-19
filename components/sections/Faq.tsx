"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SKALA TIPOGRAFI (sama di semua section)
 * Judul section: font-serif text-3xl md:text-4xl lg:text-5xl | Lead: text-base md:text-lg
 * Body: text-base | Small: text-sm | Caption: text-xs
 */

const WA_URL = `https://wa.me/62816500340?text=${encodeURIComponent(
  "Halo Summit Private Village, saya punya pertanyaan tentang unit."
)}`;

// Semua jawaban bersumber dari PDF Product Knowledge dan data yang kamu berikan.
const faqItems = [
  {
    question: "Berapa harga unit di Summit Private Village?",
    answer:
      "Harga unit mulai dari 800 jutaan. Harga tiap unit berbeda, jadi hubungi tim kami lewat WhatsApp untuk daftar harga terbaru dan unit yang masih tersedia.",
  },
  {
    question: "Di mana lokasi Summit Private Village?",
    answer:
      "Di Dau, Malang (plus code 3HG7+7W9). Dari lokasi, UIN Maulana Malik Ibrahim Kampus 3 dan Ar-Rohmah Putri serta Putra hanya sekitar 3 menit. Thursina dan Taman Rekreasi Sengkaling sekitar 4 menit, UMM sekitar 5 menit, dan Jatim Park 3 sekitar 10 menit.",
  },
  {
    question: "Seperti apa spesifikasi unitnya?",
    answer:
      "Unit dua lantai dengan 3 kamar tidur dan 2 kamar mandi. Untuk Tipe 75, luas bangunan 75 m² dan luas tanah 74 m², dilengkapi carport untuk 1 mobil dan 1 motor serta 1 garden. Bangunan memakai struktur beton bertulang, dinding hebel, lantai granite 60x60, cat Jotun, smart lamp, dan smart doorlock.",
  },
  {
    question: "Fasilitas apa saja yang ada di kawasan?",
    answer:
      "Kawasan menggunakan one gate system dengan resepsionis 24 jam, serta area taman. Desainnya mengusung konsep tropical modern.",
  },
  {
    question: "Berapa potensi pendapatan jika disewakan?",
    answer:
      "Estimasinya sekitar Rp17.000.000 per bulan atau Rp204.000.000 per tahun, dengan asumsi tarif weekday Rp800.000 selama 10 hari, weekend Rp1.300.000 selama 6 hari, dan Minggu Rp600.000 selama 2 hari dalam sebulan. Angka ini hanya potensi dan bukan jaminan, karena hasil nyata bergantung pada tingkat hunian dan tarif.",
  },
  {
    question: "Bagaimana cara survey atau meminta informasi lengkap?",
    answer:
      "Hubungi kami lewat WhatsApp 0816 500 340. Kami juga bisa dihubungi lewat Instagram dan Facebook Summit Private Village.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-16">
        {/* KIRI: judul + kontak */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-serif text-3xl leading-tight text-[#1D363A] md:text-4xl lg:text-5xl">
              Pertanyaan yang sering ditanyakan
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#1D363A]/70 md:text-lg">
              Belum menemukan jawabannya? Tim kami siap membantu.
            </p>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF5C0B] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e65209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D363A]"
            >
              <MessageCircle size={18} />
              Tanya via WhatsApp
            </a>

            {/* TODO: tambahkan link IG dan FB jika URL resminya sudah ada */}
            <dl className="mt-8 space-y-2 text-sm text-[#1D363A]/70">
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-[#1D363A]/50">WhatsApp</dt>
                <dd>0816 500 340</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-[#1D363A]/50">Instagram</dt>
                <dd>Summit Private Village</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-[#1D363A]/50">Facebook</dt>
                <dd>Summit Private Village</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* KANAN: akordeon */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-[#1D363A]/15 border-y border-[#1D363A]/15">
            {faqItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <li key={item.question}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      id={`faq-button-${idx}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5C0B]"
                    >
                      <span
                        className={cn(
                          "font-serif text-xl leading-snug transition-colors md:text-2xl",
                          isOpen ? "text-[#FF5C0B]" : "text-[#1D363A]"
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                          isOpen
                            ? "border-[#1D363A] bg-[#1D363A] text-white"
                            : "border-[#1D363A]/30 text-[#1D363A]"
                        )}
                      >
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-button-${idx}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-base leading-relaxed text-[#1D363A]/70">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
