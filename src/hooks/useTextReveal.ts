"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export type TextRevealMode = "words" | "chars";

export interface UseTextRevealOptions {
  mode?: TextRevealMode;
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
}

/**
 * Wraps text content in spans (words or chars) and animates them on scroll.
 * Run in useEffect to avoid hydration mismatch.
 */
function wrapText(el: HTMLElement, mode: TextRevealMode): Element[] {
  const text = el.textContent ?? "";
  el.textContent = "";

  if (mode === "words") {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.map((word) => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.overflow = "hidden";
      span.style.verticalAlign = "top";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = word + "\u00A0";
      span.appendChild(inner);
      el.appendChild(span);
      return inner;
    });
  }

  const chars = [...text];
  return chars.map((char) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.overflow = "hidden";
    span.style.verticalAlign = "top";
    if (/\s/.test(char)) {
      span.style.minWidth = "0.25em";
    }
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.textContent = /\s/.test(char) ? "\u00A0" : char;
    span.appendChild(inner);
    el.appendChild(span);
    return inner;
  });
}

export function useTextReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseTextRevealOptions = {}
) {
  const {
    mode = "words",
    y = 24,
    duration = 0.5,
    stagger = 0.03,
    ease = "power3.out",
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets = wrapText(el, mode);
    if (targets.length === 0) return;

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, mode, y, duration, stagger, ease, start]);
}
