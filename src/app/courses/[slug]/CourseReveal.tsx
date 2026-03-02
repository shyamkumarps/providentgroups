"use client";

import { useRef } from "react";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function CourseReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGsapReveal(ref);
  return <div ref={ref}>{children}</div>;
}
