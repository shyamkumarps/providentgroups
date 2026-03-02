import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if user prefers reduced motion (accessibility).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Multi-speed parallax within a section. Query children with selector and assign speeds.
 * speed > 0: moves up slower than scroll (typical for backgrounds).
 */
export function createParallaxLayers(
  container: HTMLElement,
  selector: string,
  speeds: number[]
): (() => void) {
  if (typeof window === "undefined" || prefersReducedMotion()) return () => {};
  const elements = container.querySelectorAll<HTMLElement>(selector);
  const triggers: ScrollTrigger[] = [];
  elements.forEach((el, i) => {
    const speed = speeds[i % speeds.length] ?? 0.5;
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const y = (1 - self.progress) * window.innerHeight * speed * 0.5;
        gsap.set(el, { y: -y });
      },
    });
    triggers.push(st);
  });
  return () => triggers.forEach((t) => t.kill());
}

/**
 * Pin a section for a scroll distance (in pixels). Use with a timeline for scroll-driven animation.
 * Pass the section element (e.g. ref.current from a hook).
 */
export function pinSection(
  el: HTMLElement | null,
  pinSpacerHeight: number = 500
): (() => void) | void {
  if (!el || typeof window === "undefined" || prefersReducedMotion()) return;
  const st = ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: `+=${pinSpacerHeight}`,
    pin: true,
  });
  return () => st.kill();
}
