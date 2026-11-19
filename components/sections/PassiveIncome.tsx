"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarDays, Info } from "lucide-react";

const WA_URL =
  "https://wa.me/62816500340?text=Halo%2C%20saya%20ingin%20konsultasi%20simulasi%20pendapatan%20Summit%20Private%20Village.";

/* ─────────────────────────────────────────────
   DATA — dari halaman "Profit Investment" PDF Summit
───────────────────────────────────────────── */
const STREAMS = [
  { label: "Week Day", range: "Senin – Kamis", rate: 800_000, days: 10, color: "#FF5C0B" },
  { label: "Week End", range: "Jumat – Sabtu", rate: 1_300_000, days: 6, color: "#F7F3EA" },
  { label: "Minggu", range: "Hari Minggu", rate: 600_000, days: 2, color: "#E9C46A" },
].map((s) => ({ ...s, subtotal: s.rate * s.days }));

const MONTHLY = STREAMS.reduce((sum, s) => sum + s.subtotal, 0); // 17.000.000
const YEARLY = MONTHLY * 12; // 204.000.000
const TOTAL_DAYS = STREAMS.reduce((sum, s) => sum + s.days, 0); // 18

const fmtNum = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const fmt = (n: number) => `Rp ${fmtNum(n)}`;

/* ─────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * ease));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function PassiveIncome() {
  const [isVisible, setIsVisible] = useState(false);
  const [barsIn, setBarsIn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          timer = setTimeout(() => setBarsIn(true), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const yearly = useCountUp(YEARLY, isVisible, 2000);
  const show = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";

  return (
    <section
      ref={sectionRef}
      id="investasi"
      className="relative w-full overflow-hidden bg-[#1D363A] py-16 text-[#F7F3EA] md:py-28"
    >
      {/* dotted texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#F7F3EA_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative mx-auto max-w-[1320px] px-4 md:px-10 lg:px-16">
        {/* ── HEADER ── */}
        <div className={cn("mb-12 max-w-2xl transition-all duration-1000 ease-out md:mb-16", show)}>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#FF5C0B]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F3EA]/70">
              Profit Investment
            </span>
          </div>
          <h2 className="text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            <span className="font-light">Potensi</span>{" "}
            <span className="font-extrabold text-[#FF5C0B]">pendapatan</span>{" "}
            <span className="font-light">unit Summit</span>
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-[#F7F3EA]/70 md:text-base">
            Simulasi potensi pendapatan berdasarkan tarif harian dan jumlah hari terisi dalam satu
            bulan.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ── LEFT: BREAKDOWN ── */}
          <div className="min-w-0 space-y-4 lg:col-span-7">
            {/* stacked share bar */}
            <div className={cn("transition-all delay-100 duration-700 ease-out", show)}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7F3EA]/55">
                Komposisi pendapatan per bulan
              </p>
              <div className="flex h-3 w-full gap-1 overflow-hidden rounded-full">
                {STREAMS.map((s, i) => (
                  <div
                    key={s.label}
                    className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                    style={{
                      width: barsIn ? `${(s.subtotal / MONTHLY) * 100}%` : "0%",
                      transitionDelay: `${i * 150}ms`,
                      backgroundColor: s.color,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* stream cards */}
            {STREAMS.map((s, idx) => {
              const pct = Math.round((s.subtotal / MONTHLY) * 100);
              return (
                <div
                  key={s.label}
                  style={{ transitionDelay: isVisible ? `${150 + idx * 100}ms` : "0ms" }}
                  className={cn(
                    "rounded-2xl border border-[#F7F3EA]/10 bg-[#F7F3EA]/[0.04] p-5 transition-all duration-700 ease-out hover:border-[#FF5C0B]/40",
                    show
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <div>
                        <p className="text-base font-bold leading-tight">{s.label}</p>
                        <p className="mt-0.5 text-[11px] font-light text-[#F7F3EA]/60">
                          {s.range}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-base font-extrabold tabular-nums md:text-lg"
                        style={{ color: s.color }}
                      >
                        {fmt(s.subtotal)}
                      </p>
                      <p className="mt-0.5 text-[11px] font-light text-[#F7F3EA]/60">
                        {pct}% dari total bulanan
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 border-t border-[#F7F3EA]/10 pt-3 text-xs font-light text-[#F7F3EA]/70">
                    <CalendarDays size={12} />
                    <span>
                      {fmt(s.rate)} × {s.days} hari
                    </span>
                  </div>
                </div>
              );
            })}

            {/* monthly total */}
            <div
              style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
              className={cn(
                "flex items-center justify-between gap-4 rounded-2xl bg-[#FF5C0B] px-5 py-5 text-[#1D363A] transition-all duration-700 ease-out",
                show
              )}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Potensi pendapatan per bulan
              </p>
              <p className="shrink-0 text-xl font-extrabold tabular-nums md:text-2xl">
                {fmt(MONTHLY)}
              </p>
            </div>

            {/* disclaimer */}
            <p className="flex items-start gap-2 px-1 pt-1 text-[11px] font-light leading-relaxed text-[#F7F3EA]/55">
              <Info size={13} className="mt-0.5 shrink-0" />
              <span>
                Potensi pendapatan dihitung dari tarif dan jumlah hari terisi yang tercantum pada
                brosur Summit Private Village. Angka bersifat estimasi, bukan jaminan, dan dapat
                berbeda pada kondisi sebenarnya.
              </span>
            </p>
          </div>

          {/* ── RIGHT: YEARLY CARD ── */}
          <div
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
            className={cn(
              "min-w-0 transition-all duration-700 ease-out lg:col-span-5 lg:sticky lg:top-24",
              show
            )}
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#F7F3EA] p-7 text-[#1D363A] md:p-9">
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#FF5C0B]/15" />
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#1D363A]/10" />

              <p className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF5C0B]">
                Potensi pendapatan / tahun
              </p>
              <p className="relative mt-3 text-3xl leading-none tracking-tight tabular-nums sm:text-4xl xl:text-5xl">
                <span className="font-light">Rp</span>{" "}
                <span className="font-extrabold text-[#FF5C0B]">{fmtNum(yearly)}</span>
              </p>
              <p className="relative mt-3 text-sm font-light text-[#1D363A]/70">
                {fmt(MONTHLY)} per bulan × 12 bulan
              </p>

              <div className="relative mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#1D363A]/10 bg-white p-4">
                  <p className="text-2xl font-extrabold leading-none">{TOTAL_DAYS} hari</p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-[#1D363A]/55">
                    Terisi per bulan
                  </p>
                </div>
                <div className="rounded-2xl border border-[#1D363A]/10 bg-white p-4">
                  <p className="text-2xl font-extrabold leading-none">{STREAMS.length} tarif</p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-[#1D363A]/55">
                    Week day, week end, Minggu
                  </p>
                </div>
              </div>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-7 flex items-center justify-between rounded-full bg-[#1D363A] py-2 pl-6 pr-2 text-[#F7F3EA] transition-colors duration-300 hover:bg-[#FF5C0B]"
              >
                <span className="text-sm font-semibold">Konsultasi Simulasi Pendapatan</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F3EA] text-[#1D363A] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}