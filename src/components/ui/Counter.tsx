"use client";

import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface CounterProps {
  endValue: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Counter({
  endValue,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  once = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, endValue, { duration, suffix, prefix, once });
  return <span ref={ref} className={className} />;
}
