"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useParallax } from "@/hooks/useParallax";
import { Button } from "@/components/ui/Button";

export function PromoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useGsapReveal(ref);
  useTextReveal(headlineRef, { mode: "words", y: 16, stagger: 0.04, start: "top 82%" });
  useParallax(blobRef, 0.3);

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
      <path fill="#ffffff" d={wavePath} />
    </svg>
  );

  return (
    <section ref={ref} className="section-padding pt-16 pb-16 md:pt-20 md:pb-20 text-white relative overflow-hidden bg-[length:200%_100%] animate-[gradient-shift_12s_ease_infinite] bg-gradient-to-r from-primary via-[#1a3a5c] to-accent">
      {/* Top waves */}
      <div
        className="absolute top-0 left-0 w-full h-12 sm:h-14 md:h-16 overflow-hidden z-20 pointer-events-none"
        aria-hidden
      >
        {waveTop(wave3, "animate-wave-3", 0.3)}
        {waveTop(wave2, "animate-wave-2", 0.5)}
        {waveTop(wave1, "animate-wave-1", 1)}
        <div className="absolute inset-0 bg-dots-grid opacity-40 pointer-events-none z-20" />
      </div>
      <div ref={blobRef} className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url(/assets/patterns/blob-2.svg)", backgroundSize: "cover" }} aria-hidden />
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <h2 ref={headlineRef} className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Transform Your Future with Expert Guidance
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Seize the chance to get into top universities with our end-to-end admission support. Apply today and step into a brighter future.
        </p>
        <Button
          href="/contact"
          variant="secondary"
          className="!bg-white !border-white !text-primary hover:!bg-background hover:!text-primary hover:!border-background hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
        >
          Enroll Now
        </Button>
      </div>
      {/* Bottom waves */}
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
