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
    const tween = gsap.to(el, {
      // Keep parallax local to the section so backgrounds do not drift off-screen.
      y: () => -(window.innerHeight * Math.max(0.1, speed) * 0.4),
      ease: "none",
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
