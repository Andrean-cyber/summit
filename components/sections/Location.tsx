"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck, Clock, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SKALA TIPOGRAFI (pakai kelas yang sama di semua section agar konsisten)
 * Font: satu keluarga sans (Plus Jakarta Sans), hierarki lewat tebal tipis.
 * - Judul section : text-3xl sm:text-4xl lg:text-5xl, kata kunci font-extrabold, sisanya font-light
 * - Lead          : text-base md:text-lg font-light
 * - Body          : text-base
 * - Small         : text-sm
 * - Caption       : text-xs
 */

const MAX_MINUTES = 10; // acuan panjang bar (tempuh terjauh = Jatim Park 3)

type Place = {
  name: string;
  minutes: number;
  group: "Pendidikan" | "Wisata";
  image: string;
};

// Waktu tempuh diambil dari PDF Summit (urut dari terdekat).
// Foto masih foto Corestay, ganti manual di folder /public.
const places: Place[] = [
  { name: "UIN Maulana Malik Ibrahim, Kampus 3", minutes: 3, group: "Pendidikan", image: "/uin.webp" },
  { name: "Ar-Rohmah Putri Islamic Boarding School", minutes: 3, group: "Pendidikan", image: "/arohmahI.webp" },
  { name: "Ar-Rohmah Putra Islamic Boarding School", minutes: 3, group: "Pendidikan", image: "/arohmahA.webp" },
  { name: "Thursina International Islamic Boarding School", minutes: 4, group: "Pendidikan", image: "/thursinah.webp" },
  { name: "Taman Rekreasi Sengkaling", minutes: 4, group: "Wisata", image: "/sengkaling.webp" },
  { name: "UMM Malang", minutes: 5, group: "Pendidikan", image: "/umm.webp" },
  { name: "Jatim Park 3", minutes: 10, group: "Wisata", image: "/jatimpark3.webp" },
];

const facts = [
  { Icon: ShieldCheck, text: "One gate system" },
  { Icon: Clock, text: "Resepsionis 24 jam" },
  { Icon: TreePine, text: "Taman dan kawasan hijau" },
];

const MAPS_QUERY = "3HG7+7W9 Dau Malang";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;

export default function Location() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#1D363A] px-4 py-16 text-white md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-14">
        {/* KIRI: judul + daftar waktu tempuh */}
        <div className="min-w-0 lg:col-span-7">
          <h2 className="max-w-xl text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
            <span className="font-extrabold text-[#FF5C0B]">Dau, Malang:</span>{" "}
            <span className="font-light">dekat kampus, pesantren, dan tempat wisata keluarga</span>
          </h2>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/70 md:text-lg">
            Semua tujuan di bawah bisa dicapai dalam{" "}
            <span className="font-semibold text-white">3 sampai 10 menit</span>. Kawasan yang
            selalu ramai oleh mahasiswa, wali santri, dan wisatawan ini menjaga permintaan sewa
            tetap hidup sepanjang tahun.
          </p>

          {/* Legenda warna bar */}
          <div className="mt-8 flex items-center gap-6 text-sm font-medium text-white/70">
            <span className="flex items-center gap-2">
              <span className="h-2 w-6 rounded-full bg-white" /> Pendidikan
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-6 rounded-full bg-[#FF5C0B]" /> Wisata
            </span>
          </div>

          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {places.map((place) => (
              <li
                key={place.name}
                className="grid grid-cols-[56px_1fr_auto] items-center gap-4 py-4 md:grid-cols-[72px_1fr_auto] md:gap-5"
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-white/10 md:h-[72px] md:w-[72px]">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug md:text-base">{place.name}</p>
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-1000 ease-out motion-reduce:transition-none",
                        place.group === "Wisata" ? "bg-[#FF5C0B]" : "bg-white"
                      )}
                      style={{
                        width: isVisible ? `${(place.minutes / MAX_MINUTES) * 100}%` : "0%",
                      }}
                    />
                  </div>
                </div>

                <p className="text-right text-3xl font-extrabold leading-none tracking-tight tabular-nums md:text-4xl">
                  {place.minutes}
                  <span className="ml-1 text-xs font-light tracking-normal text-white/60">
                    menit
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* KANAN: peta */}
        <div className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
              <iframe
                title="Lokasi Summit Private Village"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 md:h-96"
              />
              <div className="space-y-4 p-5 md:p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    Alamat
                  </p>
                  <p className="mt-1 text-base font-bold">Dau, Malang, Jawa Timur</p>
                  <p className="mt-0.5 text-sm font-light text-white/60">
                    Plus code {MAPS_QUERY.split(" ")[0]}
                  </p>
                </div>
                <Link
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#FF5C0B] px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#e65209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-base"
                >
                  <MapPin size={18} />
                  Buka di Google Maps
                </Link>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {facts.map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 text-sm font-medium text-white/80"
                >
                  <Icon size={16} className="text-[#FF5C0B]" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}