"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export interface UseSvgDrawOptions {
  start?: string;
  end?: string;
  scrub?: number | true;
  pathSelector?: string;
}

/**
 * Animates SVG path stroke (draw effect) on scroll using strokeDasharray/strokeDashoffset.
 * Ref can be the path element or a container; use pathSelector to target path(s) inside.
 */
export function useSvgDraw<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseSvgDrawOptions = {}
) {
  const {
    start = "top 85%",
    end = "top 30%",
    scrub = true,
    pathSelector = "path",
  } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    const paths = container.querySelectorAll<SVGPathElement>(pathSelector);
    if (paths.length === 0) return;

    const validPaths: SVGPathElement[] = [];
    paths.forEach((path) => {
      try {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        validPaths.push(path);
      } catch {
        // Skip non-rendered paths (display:none, etc.)
      }
    });

    if (validPaths.length === 0) return;

    const tween = gsap.to(validPaths, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start,
        end,
        scrub,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, start, end, scrub, pathSelector]);
}
