"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getColleges } from "@/lib/data";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { prefersReducedMotion } from "@/lib/animations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const colleges = getColleges();

export function CollegesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(containerRef, { childSelector: ".college-card", stagger: 0.06 });

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".college-card .college-logo-wrap");
    gsap.fromTo(
      cards,
      { filter: "blur(8px)", opacity: 0.6 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 88%" },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 max-w-6xl relative pt-4">
        <SectionHeading
          title="Top Colleges in Karnataka"
          subtitle="We have partnerships with leading institutions for your chosen stream."
        />
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {colleges.map((c) => (
            <Card key={c.name} className="college-card overflow-hidden p-0 flex flex-col bg-white border border-primary/5 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
              <div className="college-logo-wrap relative w-full aspect-[16/10] min-h-[140px] bg-primary/5 flex items-center justify-center overflow-hidden rounded-t-2xl">
                <Image
                  src={c.logo}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-sm font-semibold text-primary">{c.name}</p>
                <p className="text-xs text-neutral-muted mt-0.5">{c.location}</p>
              </div>
            </Card>
          ))}
        </div>
        {/* Our partners – rounded logo strip with optional marquee */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary/5 via-white to-primary/5 border border-primary/10 py-5 px-4 md:px-6" aria-hidden>
          <p className="text-center text-xs font-semibold text-neutral-muted uppercase tracking-widest mb-4">Our partners</p>
          <div className="partners-track overflow-hidden">
            <div className="flex gap-4 md:gap-6 items-center min-w-max animate-marquee-partners py-1" style={{ width: "max-content" }}>
              {[...colleges, ...colleges].map((c, i) => (
                <div
                  key={`${c.name}-${i}`}
                  className="partner-logo flex-shrink-0 h-16 w-28 sm:w-32 md:w-36 rounded-xl bg-white border border-primary/10 shadow-sm flex items-center justify-center p-1 overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  <Image src={c.logo} alt="" width={144} height={64} className="object-cover h-full w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
