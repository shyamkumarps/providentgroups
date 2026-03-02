"use client";

import { useRef } from "react";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { useTextReveal } from "@/hooks/useTextReveal";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export function PageHero({ title, subtitle, imageUrl }: PageHeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useParallax(bgRef, 0.3);
  useTextReveal(titleRef, { mode: "words", y: 24, stagger: 0.05, start: "top 85%" });

  return (
    <section className="relative -mt-16 pt-24 pb-20 md:pt-32 md:pb-28 bg-primary text-white overflow-hidden">
      {imageUrl && (
        <div ref={bgRef} className="absolute inset-0">
          <Image src={imageUrl} alt="" fill className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
      )}
      {!imageUrl && <div className="absolute inset-0 bg-primary/90" />}
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <h1 ref={titleRef} className="font-heading text-4xl md:text-5xl font-bold text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-center text-white/90 mt-4 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
