"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import type { SiteData } from "@/lib/data";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  nav: SiteData["nav"];
}

export function MobileNav({ isOpen, onClose, nav }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: 0, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(panelRef.current, { x: "100%", duration: 0.25 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 w-72 bg-primary shadow-2xl z-50 md:hidden flex flex-col pt-20 px-6"
      >
        <nav className="flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-white/90 hover:text-accent font-medium py-2 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={onClose} className="text-white/90 hover:text-accent font-medium py-2 transition-colors">
            Login
          </Link>
          <Link href="/register" onClick={onClose} className="text-white/90 hover:text-accent font-medium py-2 transition-colors">
            Register
          </Link>
        </nav>
        <Link
          href="/contact"
          onClick={onClose}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold bg-accent text-white hover:bg-accent-light shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Book Consultation
        </Link>
      </div>
    </>
  );
}
