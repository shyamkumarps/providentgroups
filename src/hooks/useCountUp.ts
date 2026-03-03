"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  endValue: number,
  options: { duration?: number; suffix?: string; prefix?: string; start?: string; once?: boolean } = {}
) {
  const { duration = 2, suffix = "", prefix = "", start = "top 80%", once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };
    const updateText = () => {
      el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    };

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${endValue}${suffix}`;
      return;
    }

    let tween: gsap.core.Tween | null = null;
    const playCount = () => {
      tween?.kill();
      obj.value = 0;
      updateText();
      tween = gsap.to(obj, {
        value: endValue,
        duration,
        ease: "power3.out",
        onUpdate: updateText,
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: playCount,
      onEnterBack: () => {
        if (!once) playCount();
      },
      onLeaveBack: () => {
        if (!once) {
          tween?.kill();
          obj.value = 0;
          updateText();
        }
      },
    });

    return () => {
      tween?.kill();
      trigger.kill();
    };
  }, [ref, endValue, duration, suffix, prefix, start, once]);
}
