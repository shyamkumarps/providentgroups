"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { getSiteData } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useParallax } from "@/hooks/useParallax";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";

const site = getSiteData();
const { hero } = site;

const slides = hero.slides && hero.slides.length > 0 ? hero.slides : [{ image: "/assets/hero.svg" }];

const wave1 = "M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 L1000,0 L0,0 Z";
const wave2 = "M0,35 C120,70 320,5 500,35 C680,65 880,5 1000,35 L1000,0 L0,0 Z";
const wave3 = "M0,30 C180,60 300,10 500,30 C700,50 820,10 1000,30 L1000,0 L0,0 Z";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);

  useParallax(bgRef, 0.25);
  useTextReveal(headlineRef, { mode: "words", y: 28, stagger: 0.04, start: "top 88%" });
  useScrollTimeline(sectionRef, (tl) => {
    const content = contentRef.current;
    if (content) tl.fromTo(content, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.96, duration: 1 });
  }, { start: "top top", end: "bottom top", scrub: 1 });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
    if (ctaRef.current) tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === currentIndex ? 1 : 0, duration: 0.8, ease: "power2.inOut" });
    });
  }, [currentIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-16 min-h-screen flex items-center justify-center pb-24 md:pb-32 overflow-visible"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute -inset-y-[15vh] inset-x-0"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              ref={(el) => { if (el) slideRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
                unoptimized={slide.image.endsWith(".svg")}
              />
            </div>
          ))}
          <div className="absolute inset-0 gradient-hero-overlay" />
        </div>
      </div>
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 pointer-events-none z-[5]" aria-hidden>
        <span className="absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-white/20 animate-float" />
        <span className="absolute top-[60%] right-[15%] w-2 h-2 rounded-full bg-accent/30 animate-float-slow" style={{ animationDelay: "-2s" }} />
        <span className="absolute bottom-[25%] left-[20%] w-4 h-4 rounded-full border border-white/25 animate-float-slower" style={{ animationDelay: "-1s" }} />
      </div>
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 pt-32 pb-24 text-center max-w-4xl">
        <h1
          ref={headlineRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          {hero.headline}
        </h1>
        <p
          ref={subRef}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
        >
          {hero.subtext}
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/contact" variant="primary" attentionShimmer>
            {hero.ctaPrimary}
          </Button>
          <Link
            href="/courses"
            className="group/hero group relative inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/70 bg-white/5 px-6 py-3 font-semibold text-sm md:text-base text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20 hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <span>{hero.ctaSecondary}</span>
            <span className="inline-flex shrink-0 h-5 w-0 items-center justify-center overflow-hidden opacity-0 ml-0 transition-[width,opacity,margin] duration-300 ease-out group-hover/hero:w-5 group-hover/hero:opacity-100 group-hover/hero:ml-2" aria-hidden>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      {/* Bottom waves: floating animation, taller height to match PromoBanner/StatsSection presence */}
      <div
        className="absolute -bottom-px left-0 w-full h-16 sm:h-20 md:h-24 overflow-hidden z-[50] pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-dots-grid opacity-[0.18] pointer-events-none z-0" />
        <svg className="absolute bottom-0 left-0 block h-16 sm:h-20 md:h-24 animate-wave-3-reverse" viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ width: "200%", opacity: 0.3 }}>
          <path fill="var(--background)" d={wave3} />
        </svg>
        <svg className="absolute bottom-0 left-0 block h-16 sm:h-20 md:h-24 animate-wave-2-reverse" viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ width: "200%", opacity: 0.5 }}>
          <path fill="var(--background)" d={wave2} />
        </svg>
        <svg className="absolute bottom-0 left-0 block h-16 sm:h-20 md:h-24 animate-wave-1-reverse" viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ width: "200%", opacity: 1 }}>
          <path fill="var(--background)" d={wave1} />
        </svg>
      </div>
      {slides.length > 1 && (
        <div className="absolute inset-0 h-screen pointer-events-none z-20 flex flex-col justify-end items-center pb-8 hidden" aria-hidden>
          <div className="pointer-events-none flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentIndex ? "bg-accent scale-125" : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
