"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export interface UseGsapRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  toggleActions?: string;
}

export function useGsapReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseGsapRevealOptions = {}
) {
  const {
    y = 40,
    duration = 0.7,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
    toggleActions = "play none none reverse",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [ref, y, duration, delay, ease, start, toggleActions]);
}
