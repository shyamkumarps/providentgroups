"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export function useParallax(ref: RefObject<HTMLElement | null>, speed: number = 0.5) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const triggerEl = el.parentElement ?? el;
    el.style.willChange = "transform";
    const tween = gsap.to(el, {
      y: () => -(window.innerHeight * Math.max(0.1, speed) * 0.4),
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: triggerEl,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, speed]);
}
