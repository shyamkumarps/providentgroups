"use client";

import { useId } from "react";

export type WavePosition = "top" | "bottom";
export type WaveVariant = "soft" | "bold" | "hero";
export type WaveTheme = "light" | "white" | "navy" | "accentBlend";

interface WaveDividerProps {
  /** Where the divider sits: top/bottom of section (absolute), or omit for in-flow between sections */
  position?: "top" | "bottom";
  /** Curve intensity: soft (subtle), bold (pronounced), hero (large) */
  variant?: WaveVariant;
  /** Fill theme for contrast: light (page bg), white, navy (primary), accentBlend (gold tint) */
  theme?: WaveTheme;
  /** Optional subtle drop shadow under the curve */
  withShadow?: boolean;
  /** Optional soft glow along the edge */
  withGlow?: boolean;
  /** Mirror the wave horizontally (e.g. for better alignment with card edge) */
  flipHorizontal?: boolean;
  /** Legacy: Tailwind text color class; maps to theme if theme not set */
  color?: string;
  /** Legacy: Flip the wave vertically; prefer position="bottom" */
  flip?: boolean;
  className?: string;
}

const THEME_STOPS: Record<WaveTheme, { start: string; end: string }> = {
  light: { start: "#FFFBEB", end: "#FEF3C7" },
  white: { start: "#FFFFFF", end: "#FFFBEB" },
  navy: { start: "#0F766E", end: "#0D5C56" },
  accentBlend: { start: "#FFFBEB", end: "#FFF7ED" },
};

const VARIANT_CONFIG = {
  soft: {
    viewBox: "0 0 1440 120",
    path: "M0 120V60c120 40 240 60 360 55s240-35 360-45 240-10 360 5 240 45 360 45 240-30 360-35V120H0z",
    heightClass: "h-8 md:h-12",
  },
  bold: {
    viewBox: "0 0 1440 160",
    path: "M0 160V80c180 50 360 80 540 75s360-45 540-55 360-15 540 5 360 55 540 55 360-35 540-45V160H0z",
    heightClass: "h-12 md:h-16",
  },
  hero: {
    viewBox: "0 0 1440 200",
    path: "M0 200V90c200 60 400 100 600 90s400-60 600-70 400-20 600 0 400 70 600 70 400-45 600-60V200H0z",
    heightClass: "h-16 md:h-24",
  },
};

export function WaveDivider({
  position,
  variant = "bold",
  theme: themeProp,
  withShadow = false,
  withGlow = false,
  flipHorizontal = false,
  color: legacyColor,
  flip: legacyFlip,
  className = "",
}: WaveDividerProps) {
  const gradientId = useId().replace(/:/g, "");
  const theme: WaveTheme =
    themeProp ??
    (legacyColor === "text-white" ? "white" : legacyColor === "text-background" ? "light" : "light");
  const stops = THEME_STOPS[theme];
  const config = VARIANT_CONFIG[variant];
  const isFlipped = legacyFlip ?? position === "bottom";

  const positionClass =
    position === "bottom"
      ? "absolute bottom-0 left-0 right-0 w-full"
      : position === "top"
        ? "absolute top-0 left-0 right-0 w-full"
        : "";

  const flipClass = flipHorizontal ? "scale-x-[-1]" : "";

  return (
    <div
      className={`w-full overflow-hidden leading-none ${isFlipped ? "rotate-180" : ""} ${flipClass} ${positionClass} ${className}`}
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={config.viewBox}
        preserveAspectRatio="none"
        className={`w-full ${config.heightClass} block`}
        style={{
          display: "block",
          filter: withShadow
            ? "drop-shadow(0 4px 6px rgba(0,0,0,0.06))"
            : withGlow
              ? "drop-shadow(0 0 12px rgba(15,118,110,0.08))"
              : undefined,
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={stops.start} stopOpacity={1} />
            <stop offset="100%" stopColor={stops.end} stopOpacity={1} />
          </linearGradient>
        </defs>
        <path fill={`url(#${gradientId})`} d={config.path} />
      </svg>
    </div>
  );
}
