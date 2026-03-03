"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { getTestimonials } from "@/lib/data";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
const testimonials = getTestimonials();

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteIconRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGsapReveal(containerRef);
  useGsapReveal(quoteIconRef, { y: 20, delay: 0.2 });

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!cardContentRef.current) return;
    gsap.fromTo(cardContentRef.current, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
  }, [activeIndex]);

  const t = testimonials[activeIndex];
  const initials = t.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 max-w-6xl relative">
        <SectionHeading
          title="Success Stories"
          subtitle="Real students, real results. Hear from those we've helped."
        />
        <div ref={containerRef} className="relative mt-8">
          <div ref={quoteIconRef} className="absolute -top-2 left-1/2 -translate-x-1/2 text-accent/30 pointer-events-none" aria-hidden>
            <svg viewBox="0 0 80 80" className="w-20 h-20 md:w-24 md:h-24" fill="currentColor">
              <path d="M0 40C0 24 8 8 24 8c8 0 16 8 16 24s-8 24-16 24c-8 0-16-8-16-24zm40 0C40 24 48 8 64 8c8 0 16 8 16 24s-8 24-16 24c-8 0-16-8-16-24z" />
            </svg>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 w-20 h-20">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-br from-accent via-accent-light to-primary shadow-lg shadow-primary/20">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center border border-primary/10">
                  <span className="text-base font-bold text-primary tracking-wide">{initials}</span>
                </div>
              </div>
            </div>
          <div className="rounded-2xl p-8 md:p-12 pt-14 md:pt-14 text-center relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-card">
            <div className="absolute inset-0 noise-overlay pointer-events-none rounded-2xl" aria-hidden />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/8 blur-2xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full border border-primary/5 pointer-events-none" aria-hidden />
            <div ref={cardContentRef} className="relative z-10">
            <p className="font-semibold text-primary -mt-1">{t.name}</p>
            <p className="text-neutral-muted text-sm mb-5">{t.role}</p>
            <p className="text-primary text-lg md:text-xl leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          </div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-accent" : "bg-neutral-muted/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
