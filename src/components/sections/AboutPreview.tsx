"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { useSvgDraw } from "@/hooks/useSvgDraw";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const aboutCopy =
  "For over a decade, our educational consultancy has been a trusted partner for students aspiring to excel in management, engineering, and medical fields. With tie-ups with more than 150 prestigious universities worldwide, we provide expert guidance and personalised support to help you secure admissions to top-ranked institutions.";

export function AboutPreview() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleDrawRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGsapReveal(textRef, { y: 40, delay: 0.15 });
  useScrollTimeline(sectionRef, (tl) => {
    const wrap = imageWrapRef.current;
    if (wrap) tl.fromTo(wrap, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(50% at 50% 50%)", duration: 1, ease: "power2.out" });
  }, { start: "top 75%", end: "top 35%", scrub: 1 });
  useSvgDraw(circleDrawRef, { start: "top 80%", end: "top 25%", scrub: 1, pathSelector: "circle, path" });

  return (
    <section ref={sectionRef} className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden style={{ backgroundImage: "url(/assets/patterns/gradient-mesh.svg)", backgroundSize: "cover" }} />
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 max-w-6xl relative">
        <SectionHeading
          title="About Provident Groups"
          subtitle="Your trusted partner in education and career guidance."
        />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-md mx-auto">
            {/* Circle outline draws on scroll – frames the student */}
            <div ref={circleDrawRef} className="absolute -inset-6 hidden md:block pointer-events-none text-accent/50" aria-hidden>
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="200" cy="200" r="180" />
              </svg>
            </div>
            <div
              className="absolute -inset-4 rounded-full pointer-events-none opacity-80 animate-orbit-slow"
              aria-hidden
              style={{ background: "conic-gradient(from 120deg, rgba(249,115,22,0.5), rgba(15,118,110,0.15), rgba(249,115,22,0.5))" }}
            />
            {/* Circular frame: gradient fills transparent PNG areas (no box), student inside circle */}
            <div
              ref={imageWrapRef}
              className="group relative aspect-square w-full overflow-hidden rounded-full border border-primary/10 bg-gradient-to-br from-primary/10 via-white to-accent/15 shadow-[0_0_40px_rgba(15,118,110,0.15)]"
              style={{ clipPath: "circle(50% at 50% 50%)" }}
            >
              <div ref={imageRef} className="absolute inset-0 overflow-hidden">
                <Image
                  src="/assets/smiling-student-with-laptop.jpg"
                  alt="Student with Provident Groups – education and career guidance"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 320px"
                />
              </div>
            </div>
          </div>
          <div ref={textRef}>
            <p className="text-neutral-dark text-base md:text-lg leading-relaxed mb-6">
              {aboutCopy}
            </p>
            <Button href="/about" variant="primary">
              Read More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
