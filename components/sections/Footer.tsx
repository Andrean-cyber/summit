"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ArrowUp, MessageCircle } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

// TODO: ganti dengan URL akun Summit yang sebenarnya
const INSTAGRAM_URL = "https://www.instagram.com/";
const FACEBOOK_URL = "https://www.facebook.com/";

const WA_URL =
  "https://wa.me/62816500340?text=Halo%2C%20saya%20ingin%20konsultasi%20tentang%20Summit%20Private%20Village.";

const NAV_LINKS = [
  { label: "Pilihan Unit", href: "#explore" },
  { label: "Fasilitas", href: "#facilities" },
  { label: "Lokasi Strategis", href: "#location" },
  { label: "Daftar Harga", href: "#pricing" },
];

const INFO_LINKS = [
  { label: "Pertanyaan (FAQ)", href: "#faq" },
  { label: "Hubungi Kami", href: WA_URL, external: true },
];

const headingCls = "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF5C0B]";
const linkCls = "text-sm font-light text-[#F7F3EA]/70 transition-colors hover:text-[#FF5C0B]";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-[#1D363A] px-4 pb-8 pt-12 text-[#F7F3EA] md:px-10 lg:px-16">
      {/* dotted texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#F7F3EA_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        {/* CTA PANEL (putih, lebih ringkas) */}
        {/* <div className="flex flex-col justify-between gap-6 rounded-3xl bg-white p-6 text-[#1D363A] md:flex-row md:items-center md:p-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-light leading-tight tracking-tight md:text-3xl">
              Wujudkan <span className="font-semibold">villa impian</span> Anda di Dau, Malang
            </h3>
            <p className="mt-2 text-sm font-light text-[#1D363A]/70 md:text-base">
              Jadwalkan konsultasi privat dan dapatkan informasi unit terbaru dari tim Summit.
            </p>
          </div>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#FF5C0B] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e65209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D363A] active:scale-95"
          >
            <MessageCircle size={16} />
            Konsultasi via WhatsApp
          </a>
        </div> */}

        {/* LINK GRID */}
        <div className="grid grid-cols-1 gap-10 border-b border-[#F7F3EA]/10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-5">
            {/* TODO: file ini masih logo Corestay. Ganti dengan logo putih Summit di /public */}
            <Image
              src="/logoSummit.png"
              alt="Summit Private Village"
              width={80}
              height={30}
              className="h-8 w-auto object-contain"
            />
            <p className="max-w-sm text-sm font-light leading-relaxed text-[#F7F3EA]/70">
              Kawasan home villa dengan desain arsitektur tropical modern di Dau, Malang.
              Dikembangkan oleh <span className="font-medium">SAN Group</span>.
            </p>

            <div className="flex flex-col gap-3 pt-1">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Summit Private Village"
                className="group inline-flex items-center gap-3 text-sm font-light text-[#F7F3EA]/70 transition-colors hover:text-[#FF5C0B]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F7F3EA]/20 transition-colors group-hover:border-[#FF5C0B]">
                  <FaInstagram size={16} />
                </span>
                Summit Private Village
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Summit Private Village"
                className="group inline-flex items-center gap-3 text-sm font-light text-[#F7F3EA]/70 transition-colors hover:text-[#FF5C0B]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F7F3EA]/20 transition-colors group-hover:border-[#FF5C0B]">
                  <FaFacebook size={16} />
                </span>
                Summit Private Village
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className={headingCls}>Navigasi</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className={headingCls}>Informasi</h4>
            <ul className="space-y-3">
              {INFO_LINKS.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className={headingCls}>Hubungi Kami</h4>
            <ul className="space-y-3 text-sm font-light text-[#F7F3EA]/70">
              <li className="flex items-center gap-3 transition-colors hover:text-[#FF5C0B]">
                <Phone size={14} className="shrink-0 text-[#FF5C0B]" />
                <a href="tel:+62816500340">+62 816-500-340</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-1 shrink-0 text-[#FF5C0B]" />
                <span>Dau, Malang, Jawa Timur</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] font-light tracking-wide text-[#F7F3EA]/60">
            &copy; {new Date().getFullYear()} Summit Private Village. Developed by SAN Group. All
            rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[11px] tracking-widest text-[#F7F3EA]/60 transition-colors hover:text-[#FF5C0B]"
          >
            <span>Kembali ke atas</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F7F3EA]/20 transition-all group-hover:border-[#FF5C0B] group-hover:bg-[#FF5C0B]/10">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}