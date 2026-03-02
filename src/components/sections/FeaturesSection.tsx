"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/animations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Attractive Scholarships",
    description: "We help you find and apply for scholarships to reduce your education costs.",
    href: "/contact",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Top Courses",
    description: "Nursing, Engineering, Management, Medical, and more from top institutions.",
    href: "/courses",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Best Colleges",
    description: "Partnerships with 150+ universities and top colleges in Karnataka and India.",
    href: "/gallery",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useStaggerReveal(containerRef, {
    childSelector: ".feature-card",
    y: 60,
    duration: 0.7,
    stagger: 0.15,
  });

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const localTriggers: ScrollTrigger[] = [];
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".feature-card");
    const icons = containerRef.current.querySelectorAll<HTMLElement>(".feature-card .icon-wrapper");
    const cardsTween = gsap.fromTo(
      cards,
      { scale: 0.92, rotation: -2 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
    if (cardsTween.scrollTrigger) localTriggers.push(cardsTween.scrollTrigger);
    const iconsTween = gsap.fromTo(
      icons,
      { y: 8 },
      {
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      }
    );
    if (iconsTween.scrollTrigger) localTriggers.push(iconsTween.scrollTrigger);
    const iconEntryTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => sectionRef.current?.classList.add("features-icons-animate"),
      onLeaveBack: () => sectionRef.current?.classList.remove("features-icons-animate"),
    });
    localTriggers.push(iconEntryTrigger);
    return () => {
      cards.forEach((card) => gsap.killTweensOf(card));
      icons.forEach((icon) => gsap.killTweensOf(icon));
      localTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-background relative overflow-hidden -mt-3 pt-14 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24">
      <div className="absolute inset-0 bg-dots-grid opacity-[0.18] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 max-w-6xl relative">
        <SectionHeading
          title="Why Choose Us"
          subtitle="We offer end-to-end support for your education journey—from counseling to admission and beyond."
        />
        <div ref={containerRef} className="grid md:grid-cols-3 gap-8 lg:gap-10 relative z-10">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="feature-card group relative rounded-3xl p-8 bg-white border border-primary/5 overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 feature-card-shadow hover:feature-card-shadow-hover hover:-translate-y-1 hover:border-primary/10"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/20 rounded-t-3xl" aria-hidden />
              <div className="absolute inset-0 noise-overlay pointer-events-none rounded-3xl" aria-hidden />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-accent/8 blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" aria-hidden />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" aria-hidden />
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full border border-primary/5 pointer-events-none" aria-hidden />
              <div className="relative z-10 flex flex-col h-full">
                <div className="icon-wrapper mb-6 inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-primary/8 border border-primary/10 text-primary transition-all duration-300 group-hover:border-accent/40 group-hover:text-accent group-hover:shadow-[0_0_12px_2px_rgba(249,115,22,0.12)]">
                  {f.icon}
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-primary mb-3">{f.title}</h3>
                <p className="text-neutral-muted text-base leading-relaxed mb-6 flex-1">{f.description}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:text-accent transition-colors">
                  Learn more
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
