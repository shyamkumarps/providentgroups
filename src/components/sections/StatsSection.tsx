"use client";

import { useRef } from "react";
import { getSiteData } from "@/lib/data";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { Counter } from "@/components/ui/Counter";

const site = getSiteData();

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(containerRef, { childSelector: ".stat-item", stagger: 0.12, y: 24 });

  const wave1 = "M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 L1000,0 L0,0 Z";
  const wave2 = "M0,35 C120,70 320,5 500,35 C680,65 880,5 1000,35 L1000,0 L0,0 Z";
  const wave3 = "M0,30 C180,60 300,10 500,30 C700,50 820,10 1000,30 L1000,0 L0,0 Z";

  const waveTop = (wavePath: string, cls: string, opacity: number) => (
    <svg
      className={`absolute top-0 left-0 block h-12 sm:h-14 md:h-16 ${cls}`}
      viewBox="0 0 1000 80"
      preserveAspectRatio="none"
      style={{ width: "200%", opacity }}
    >
      <path fill="var(--background)" d={wavePath} />
    </svg>
  );

  const waveBottom = (wavePath: string, cls: string, opacity: number) => (
    <svg
      className={`absolute bottom-0 left-0 block h-12 sm:h-14 md:h-16 ${cls}`}
      viewBox="0 0 1000 80"
      preserveAspectRatio="none"
      style={{ width: "200%", opacity }}
    >
      <path fill="var(--background)" d={wavePath} />
    </svg>
  );

  return (
    <section className="section-padding pb-16 md:pb-20 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
      {/* Top waves: 3 layered cream waves cutting into teal */}
      <div
        className="absolute top-0 left-0 w-full h-12 sm:h-14 md:h-16 overflow-hidden z-20 pointer-events-none"
        aria-hidden
      >
        {waveTop(wave3, "animate-wave-3", 0.3)}
        {waveTop(wave2, "animate-wave-2", 0.5)}
        {waveTop(wave1, "animate-wave-1", 1)}
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url(/assets/patterns/blob-1.svg)", backgroundSize: "cover" }} aria-hidden />
      {/* Decorative illustration near bottom curve */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(120%,480px)] h-24 illustration-blob-strong"
        aria-hidden
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {site.stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="counter-wrap text-4xl md:text-5xl font-bold text-accent mb-2">
                <Counter
                  endValue={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                  once={false}
                />
              </div>
              <p className="text-white/90 text-sm md:text-base font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom waves: 3 layered cream waves cutting into teal */}
      <div
        className="absolute bottom-0 left-0 w-full h-12 sm:h-14 md:h-16 overflow-hidden z-10 pointer-events-none"
        aria-hidden
      >
        {waveBottom(wave3, "animate-wave-3-reverse", 0.3)}
        {waveBottom(wave2, "animate-wave-2-reverse", 0.5)}
        {waveBottom(wave1, "animate-wave-1-reverse", 1)}
      </div>
    </section>
  );
}
