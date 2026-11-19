"use client";

import { useEffect, useState } from "react";
import { Check, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SKALA TIPOGRAFI
 * Satu keluarga font sans (font-sans, mengikuti font body), hierarki dibangun dari tebal-tipis:
 * - Judul section : text-3xl md:text-4xl lg:text-5xl, font-light, tracking-tight
 *                   (kata kunci memakai font-semibold)
 * - Judul kartu   : text-2xl md:text-3xl, font-light
 * - Angka besar   : font-light (angka utama) / font-semibold (total)
 * - Lead / Body   : text-base, font-normal (lead: font-light)
 * - Label kecil   : text-sm / text-xs, font-medium
 */

const WA_NUMBER = "62816500340";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Halo, saya tertarik dengan Summit Private Village. Boleh minta info harga dan unit yang tersedia?"
)}`;

const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

// Data simulasi dari PDF Summit (halaman Profit Investment)
const incomeRows = [
  { label: "Weekday (Senin sampai Kamis)", rate: 800_000, days: 10 },
  { label: "Weekend (Jumat sampai Sabtu)", rate: 1_300_000, days: 6 },
  { label: "Minggu", rate: 600_000, days: 2 },
].map((r) => ({ ...r, total: r.rate * r.days }));

const monthly = incomeRows.reduce((sum, r) => sum + r.total, 0); // 17.000.000
const yearly = monthly * 12; // 204.000.000

const unitSpecs = [
  { label: "Kamar", value: "3 kamar tidur, 2 kamar mandi" },
  { label: "Bangunan", value: "2 lantai, LB 75 m², LT 74 m²" },
  { label: "Parkir", value: "1 mobil dan 1 motor" },
  { label: "Taman", value: "1 garden" },
  { label: "Keamanan", value: "One gate system, resepsionis 24 jam" },
];

const inclusions = [
  "Smart doorlock di setiap unit",
  "Smart lamp",
  "Sanitary closet duduk American Standard",
  "Lantai granite 60x60",
  "Cat Jotun",
  "Carport batu andesit",
];

const techSpecs = [
  ["Pondasi", "Footplat"],
  ["Struktur", "Beton bertulang"],
  ["Dinding", "Bata ringan (hebel)"],
  ["Lantai", "Granite 60x60"],
  ["Penutup atap", "Dak rooftop"],
  ["Rangka plafon", "Metal hollow"],
  ["Penutup plafon", "Gypsumboard dan GRC board"],
  ["Kusen dan jendela", "Aluminium"],
  ["Pintu", "Solid engineering"],
  ["Cat", "Jotun"],
  ["Railing tangga", "Besi hollow"],
  ["Railing balkon", "Tempered glass"],
  ["Sanitary", "Closet duduk American Standard"],
  ["Air bersih", "PDAM"],
  ["Listrik", "1300 watt"],
  ["Lighting", "Smart lamp"],
  ["Doorlock", "Smart doorlock"],
  ["Carport", "Batu andesit"],
];

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="pricing"
      className="w-full bg-[#F2F6F5] px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* HEADER */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-light leading-tight tracking-tight text-[#1D363A] md:text-4xl lg:text-5xl">
            Harga mulai <span className="font-semibold">800 jutaan</span>, dengan potensi
            pendapatan dari <span className="font-semibold">sewa harian</span>
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-[#1D363A]/70 md:text-lg">
            Home villa dua lantai di Dau, Malang. Bisa ditempati sendiri, bisa juga dikelola
            sebagai villa sewa.
          </p>
        </div>

        {/* items-start: kartu tidak ditarik setinggi kartu lain dalam satu baris */}
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* KARTU HARGA */}
          <div className="flex flex-col rounded-3xl bg-[#1D363A] p-6 text-white md:p-8 lg:col-span-5">
            <p className="text-sm font-medium text-white/70">Harga mulai dari</p>
            <p className="mt-2 text-4xl font-light leading-none tracking-tight md:text-5xl">
              Rp <span className="font-semibold">800</span> Jutaan
            </p>
            <p className="mt-3 text-sm font-light text-white/60">
              Harga tiap unit berbeda. Hubungi kami untuk daftar harga terbaru dan unit yang masih
              tersedia.
            </p>

            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {unitSpecs.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-sm font-light text-white/60">{s.label}</dt>
                  <dd className="text-right text-base font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#FF5C0B] px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-[#e65209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle size={18} />
              Tanya harga via WhatsApp
            </a>
          </div>

          {/* SIMULASI PENDAPATAN */}
          <div className="rounded-3xl border border-[#1D363A]/10 bg-white p-6 md:p-8 lg:col-span-7">
            <h3 className="text-2xl font-light tracking-tight text-[#1D363A] md:text-3xl">
              Simulasi <span className="font-semibold">potensi pendapatan</span> sewa
            </h3>
            <p className="mt-2 text-sm font-light text-[#1D363A]/60">
              Perhitungan per bulan berdasarkan tarif harian dan jumlah hari terisi.
            </p>

            {/* Bar proporsi tiap sumber pendapatan */}
            <div
              className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-[#1D363A]/10"
              role="img"
              aria-label="Proporsi pendapatan weekday, weekend, dan Minggu"
            >
              {incomeRows.map((r, i) => (
                <div
                  key={r.label}
                  className={cn(
                    "h-full transition-[width] duration-1000 ease-out motion-reduce:transition-none",
                    i === 0 && "bg-[#1D363A]",
                    i === 1 && "bg-[#FF5C0B]",
                    i === 2 && "bg-[#1D363A]/40"
                  )}
                  style={{ width: isVisible ? `${(r.total / monthly) * 100}%` : "0%" }}
                />
              ))}
            </div>

            <ul className="mt-6 divide-y divide-[#1D363A]/10">
              {incomeRows.map((r, i) => (
                <li key={r.label} className="flex items-start justify-between gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1.5 h-3 w-3 shrink-0 rounded-full",
                        i === 0 && "bg-[#1D363A]",
                        i === 1 && "bg-[#FF5C0B]",
                        i === 2 && "bg-[#1D363A]/40"
                      )}
                    />
                    <div>
                      <p className="text-base font-medium text-[#1D363A]">{r.label}</p>
                      <p className="text-sm font-light text-[#1D363A]/60">
                        {rupiah(r.rate)} x {r.days} hari
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-semibold text-[#1D363A]">{rupiah(r.total)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-2 grid gap-4 rounded-2xl bg-[#F2F6F5] p-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-[#1D363A]/60">Per bulan</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-[#1D363A] md:text-3xl">
                  {rupiah(monthly)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1D363A]/60">Per tahun</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-[#FF5C0B] md:text-3xl">
                  {rupiah(yearly)}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs font-light leading-relaxed text-[#1D363A]/50">
              Angka di atas adalah estimasi potensi pendapatan, bukan jaminan. Hasil sebenarnya
              bergantung pada tingkat hunian, tarif, dan pengelolaan.
            </p>
          </div>
        </div>

        {/* FITUR + SPESIFIKASI TEKNIS */}
        <div className="mt-6 grid items-start gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
          <div className="rounded-3xl border border-[#1D363A]/10 bg-white p-6 md:p-8 lg:col-span-5">
            <h3 className="text-2xl font-light tracking-tight text-[#1D363A] md:text-3xl">
              Yang Anda <span className="font-semibold">dapatkan</span>
            </h3>
            <ul className="mt-5 space-y-3">
              {inclusions.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base font-normal text-[#1D363A]/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF5C0B]/10 text-[#FF5C0B]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* self-start: saat tertutup, tinggi mengikuti isinya (tidak ditarik setinggi kartu kiri) */}
          <details className="group self-start rounded-3xl border border-[#1D363A]/10 bg-white p-6 md:p-8 lg:col-span-7">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5C0B] [&::-webkit-details-marker]:hidden">
              <span className="text-2xl font-light tracking-tight text-[#1D363A] md:text-3xl">
                Spesifikasi <span className="font-semibold">teknis</span>
              </span>
              <ChevronDown
                size={22}
                className="shrink-0 text-[#1D363A] transition-transform group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>
            <dl className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {techSpecs.map(([k, v]) => (
                <div key={k} className="border-t border-[#1D363A]/10 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-[#1D363A]/50">
                    {k}
                  </dt>
                  <dd className="mt-0.5 text-base font-normal text-[#1D363A]">{v}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </div>
    </section>
  );
}
