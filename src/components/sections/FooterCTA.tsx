"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function FooterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);

  useGsapReveal(ref);
  useTextReveal(headlineRef, { mode: "words", y: 20, stagger: 0.05 });

  useEffect(() => {
    if (!ctaWrapRef.current) return;
    ScrollTrigger.create({
      trigger: ctaWrapRef.current,
      start: "top 90%",
      onEnter: () => ctaWrapRef.current?.classList.add("footer-cta-glow"),
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 max-w-4xl relative">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary shadow-2xl shadow-primary/20">
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent/15 blur-2xl" aria-hidden />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-xl" aria-hidden />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-56 h-56 rounded-full border border-white/5" aria-hidden />
          <div className="absolute bottom-0 left-1/4 w-24 h-24 rounded-full bg-accent/10 blur-2xl" aria-hidden />

          <div className="relative z-10 px-6 py-10 md:px-12 md:py-12 text-center">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
              Free Consultation
            </span>
            <h2 ref={headlineRef} className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              Get in touch with our expert counselors for personalized guidance and end-to-end admission support.
            </p>
            <div ref={ctaWrapRef} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button href="/contact" variant="primary">
                Book Free Consultation
              </Button>
              <Button href="/register" variant="secondary" className="!border-white/60 !text-white hover:!bg-white/15 hover:!border-white">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
