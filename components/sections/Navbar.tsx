"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SKALA TIPOGRAFI (sama di semua section)
 * Judul section: font-serif text-3xl md:text-4xl lg:text-5xl | Lead: text-base md:text-lg
 * Body: text-base | Small: text-sm | Caption: text-xs
 */

// Pastikan id section di page.tsx sama dengan href di bawah.
const navLinks = [
  { name: "Tipe Unit", href: "#explore" },
  { name: "Lokasi", href: "#location" },
  { name: "Harga", href: "#pricing" },
  { name: "Survey", href: "#survey" },
  { name: "FAQ", href: "#faq" },
];

const WA_URL = `https://wa.me/62816500340?text=${encodeURIComponent(
  "Halo Summit Private Village, saya tertarik dengan unitnya dan ingin konsultasi."
)}`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const close = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Kunci scroll saat menu terbuka tanpa menggeser layout,
  // tutup otomatis di layar besar, dan tutup dengan Escape.
  useEffect(() => {
    const body = document.body;
    const header = headerRef.current;

    if (isOpen) {
      // Hitung lebar scrollbar SEBELUM overflow di-hidden,
      // lalu ganti dengan padding supaya lebar konten tetap sama.
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
        if (header) header.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
      if (header) header.style.paddingRight = "";
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none",
          isScrolled || isOpen
            ? "bg-[#1D363A]/95 shadow-lg shadow-black/10 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-4 md:h-20 md:px-8">
          {/* Logo Summit (emas di atas hijau tua, tidak perlu filter) */}
          <a
            href="#"
            onClick={close}
            aria-label="Summit Private Village, kembali ke atas"
            className="relative z-[60] block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5C0B]"
          >
            <div className="relative h-9 w-[80px] md:h-10 md:w-[120px]">
              <Image
                src="/logoSummit.png"
                alt="Summit Private Village"
                fill
                priority
                sizes="100px"
                className="object-contain object-left"
              />
            </div>
          </a>

          {/* Navigasi desktop */}
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-8 md:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5C0B]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#FF5C0B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e65209] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:inline-flex"
          >
            <MessageCircle size={16} />
            Hubungi kami
          </a>

          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            className="relative z-[60] rounded-lg p-2 text-white md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF5C0B]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Menu mobile layar penuh */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-[#1D363A] px-6 pb-8 pt-20 transition-[opacity,visibility] duration-300 motion-reduce:transition-none md:hidden",
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav aria-label="Navigasi mobile" className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={close}
              className="border-b border-white/10 py-3.5 font-serif text-xl text-white transition-colors hover:text-[#FF5C0B] sm:text-2xl"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FF5C0B] px-4 py-3.5 text-sm font-semibold text-white"
          >
            <MessageCircle size={16} />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}