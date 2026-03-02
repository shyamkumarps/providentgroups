"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export interface UseScrollTimelineOptions {
  start?: string;
  end?: string;
  scrub?: number | true;
}

/**
 * Ties a GSAP timeline to scroll position. The callback receives a timeline
 * to which you add animations; progress is controlled by scroll (scrub).
 */
export function useScrollTimeline<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: (tl: gsap.core.Timeline) => void,
  options: UseScrollTimelineOptions = {}
) {
  const { start = "top bottom", end = "bottom top", scrub = true } = options;
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
      },
    });
    callbackRef.current(tl);

    return () => {
      const st = tl.scrollTrigger;
      if (st) st.kill();
      tl.kill();
    };
  }, [ref, start, end, scrub]);
}
