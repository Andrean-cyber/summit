"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle, BedDouble, Bath, DoorOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const WA_URL = "https://wa.me/62816500340?text=Halo%2C%20saya%20tertarik%20dengan%20Summit%20Private%20Village.%20Boleh%20minta%20informasi%20lebih%20lanjut%3F";

const FACTS = [
  { icon: BedDouble, title: "3 Kamar Tidur", sub: "Unit 2 lantai" },
  { icon: Bath, title: "2 Kamar Mandi", sub: "Desain tropical modern" },
  { icon: DoorOpen, title: "One Gate System", sub: "Akses satu pintu" },
  { icon: Clock, title: "Resepsionis", sub: "Siaga 24 jam" },
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const base = "transition-all duration-700 ease-out";
  const show = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5";

  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#1D363A] px-4 pb-10 pt-28 md:px-10 lg:px-16">
      {/* Background photo */}
      <Image src="/hero1.webp" alt="Tampak depan Summit Private Village" fill priority sizes="100vw" className={cn("-z-20 object-cover transition-transform duration-[2400ms] ease-out", isLoaded ? "scale-100" : "scale-110")} />
      {/* Brand overlay: bottom-up on mobile, left-to-right on desktop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1D363A] via-[#1D363A]/80 to-[#1D363A]/40 lg:bg-gradient-to-r lg:from-[#1D363A] lg:via-[#1D363A]/85 lg:to-[#1D363A]/30" />

      <div className="relative mx-auto w-full max-w-[1320px]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: copy */}
          <div className="lg:col-span-7">
            <div className={cn(base, show, "mb-6 flex items-center gap-3")} style={{ transitionDelay: "0ms" }}>
              <span className="h-px w-10 bg-[#FF5C0B]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F3EA]/80">Summit Private Village</span>
            </div>

            <h1 className={cn(base, show, "text-4xl leading-[1.1] tracking-tight text-[#F7F3EA] sm:text-5xl lg:text-6xl")} style={{ transitionDelay: "100ms" }}>
              <span className="font-light">Home villa privat</span>
              <br />
              <span className="font-extrabold text-[#FF5C0B]">tropical modern</span>
              <span className="font-light"> di Dau, Malang</span>
            </h1>

            <p className={cn(base, show, "mt-6 max-w-xl text-sm font-light leading-relaxed text-[#F7F3EA]/75 md:text-base")} style={{ transitionDelay: "200ms" }}>
              Kawasan home villa dengan desain arsitektur tropical modern. Unit 2 lantai dengan <span className="font-semibold text-[#F7F3EA]">3 kamar tidur</span> dan <span className="font-semibold text-[#F7F3EA]">2 kamar mandi</span>,
              dilengkapi one gate system dan resepsionis 24 jam.
            </p>

            <p className={cn(base, show, "mt-5 text-sm font-light text-[#F7F3EA]/80 lg:hidden")} style={{ transitionDelay: "250ms" }}>
              Harga mulai <span className="font-bold text-[#FF5C0B]">Rp 800 Jutaan</span>
            </p>

            <div className={cn(base, show, "mt-8 flex flex-col gap-4 sm:flex-row")} style={{ transitionDelay: "300ms" }}>
              <a
                href="#explore"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#FF5C0B] px-7 py-3.5 text-xs font-bold text-[#1D363A] shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#F7F3EA] active:scale-95 sm:w-auto"
              >
                Lihat Unit Tersedia
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#F7F3EA]/30 px-7 py-3.5 text-xs font-bold text-[#F7F3EA] transition-all duration-300 hover:border-[#FF5C0B] hover:text-[#FF5C0B] active:scale-95 sm:w-auto"
              >
                <MessageCircle size={15} />
                Tanya via WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT: square photo with corner brackets + price card (desktop only) */}
          {/* RIGHT: square photo with rounded corner brackets + price card (desktop only) */}
          <div className={cn("hidden justify-end transition-all duration-[900ms] ease-out lg:col-span-5 lg:flex", isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")} style={{ transitionDelay: "350ms" }}>
            <div className="relative w-full max-w-[380px]">
              {/* Foto kotak, sudut membulat */}
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_40px_70px_-20px_rgba(0,0,0,0.5)]">
                <Image src="/hero1.webp" alt="Interior unit Summit Private Village" fill sizes="380px" className="object-cover" />
              </div>

              {/* Corner brackets: radius = radius foto (16px) + jarak offset (12px) */}
              <span aria-hidden="true" className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 rounded-tl-[28px] border-l-2 border-t-2 border-[#FF5C0B]" />
              <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-tr-[28px] border-r-2 border-t-2 border-[#FF5C0B]" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-3 -left-3 h-10 w-10 rounded-bl-[28px] border-b-2 border-l-2 border-[#FF5C0B]" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-3 -right-3 h-10 w-10 rounded-br-[28px] border-b-2 border-r-2 border-[#FF5C0B]" />

              {/* Price card */}
              <div className="absolute -bottom-8 -left-12 z-20 rounded-xl bg-[#F7F3EA] p-5 text-[#1D363A] shadow-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1D363A]/60">Harga mulai</p>
                <p className="mt-1 text-3xl font-extrabold leading-none tracking-tight">Rp 800 Jutaan</p>
              </div>
            </div>
          </div>
        </div>

        {/* FACT BAR */}
        <div className={cn(base, show, "mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#F7F3EA]/15 bg-[#F7F3EA]/10 lg:mt-20 lg:grid-cols-4")} style={{ transitionDelay: "500ms" }}>
          {FACTS.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3 bg-[#1D363A]/70 p-4 backdrop-blur-md md:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF5C0B]/15 text-[#FF5C0B]">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight text-[#F7F3EA]">{title}</p>
                <p className="mt-0.5 text-[11px] font-light text-[#F7F3EA]/60">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
