"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export interface UseStaggerRevealOptions {
  childSelector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
}

export function useStaggerReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: UseStaggerRevealOptions = {}
) {
  const {
    childSelector = "> *",
    y = 50,
    duration = 0.6,
    stagger = 0.1,
    ease = "power3.out",
    start = "top 88%",
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const tween = gsap.fromTo(
      children,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [containerRef, childSelector, y, duration, stagger, ease, start]);
}
