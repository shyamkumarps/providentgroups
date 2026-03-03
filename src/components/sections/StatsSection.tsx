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
      <path fill="#ffffff" d={wavePath} />
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
    <section className="section-padding pb-16 md:pb-20 bg-gradient-to-br from-primary via-primary-dark to-[#094843] text-white relative z-0 overflow-hidden -mt-1">
      {/* Top waves: transparent area so section above shows through; white wave shapes cut into teal */}
      <div
        className="absolute -top-1 left-0 w-full h-12 sm:h-14 md:h-16 overflow-hidden z-20 pointer-events-none"
        aria-hidden
      >
        {waveTop(wave3, "animate-wave-3", 0.3)}
        {waveTop(wave2, "animate-wave-2", 0.5)}
        {waveTop(wave1, "animate-wave-1", 1)}
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none z-[1]" style={{ backgroundImage: "url(/assets/patterns/blob-1.svg)", backgroundSize: "cover" }} aria-hidden />
      {/* Decorative illustration near bottom curve */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(120%,480px)] h-24 illustration-blob-strong z-[5]"
        aria-hidden
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {site.stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="flex justify-center mb-2">
                <span className="inline-flex text-white/80 animate-float" style={{ animationDelay: stat.label.length % 2 === 0 ? "0s" : "-1.5s" }} aria-hidden>
                  {stat.label.includes("Years") && (
                    <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {stat.label.includes("University") && (
                    <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {stat.label.includes("Admissions") && (
                    <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  )}
                  {stat.label.includes("Personalized") && (
                    <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </span>
              </div>
              <div className="counter-wrap text-3xl md:text-4xl font-bold text-accent mb-2">
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
      {/* Bottom waves: dots behind wave (match Why Choose Us opacity); cream wave on top */}
      <div
        className="absolute bottom-0 left-0 w-full h-12 sm:h-14 md:h-16 overflow-hidden z-20 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-dots-grid opacity-[0.18] pointer-events-none z-0" />
        {waveBottom(wave3, "animate-wave-3-reverse", 0.3)}
        {waveBottom(wave2, "animate-wave-2-reverse", 0.5)}
        {waveBottom(wave1, "animate-wave-1-reverse", 1)}
      </div>
    </section>
  );
}
