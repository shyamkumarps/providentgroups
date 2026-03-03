"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import type { SiteData } from "@/lib/data";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  nav: SiteData["nav"];
}

const iconClass = "w-4 h-4 min-[375px]:w-5 min-[375px]:h-5 shrink-0";
const navIcons: Record<string, React.ReactNode> = {
  Home: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  About: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Courses: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Gallery: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Contact: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export function MobileNav({ isOpen, onClose, nav }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      requestAnimationFrame(() => {
        if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
        if (panelRef.current) gsap.fromTo(panelRef.current, { x: "100%" }, { x: 0, duration: 0.35, ease: "power3.out" });
        if (navLinksRef.current) {
          const links = navLinksRef.current.querySelectorAll("a");
          gsap.fromTo(links, { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.12, ease: "power3.out" });
        }
      });
    } else {
      const scrollY = document.body.style.top ? Math.abs(parseInt(document.body.style.top, 10)) : 0;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      requestAnimationFrame(() => {
        if (scrollY) window.scrollTo(0, scrollY);
      });
      if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      if (panelRef.current) gsap.to(panelRef.current, { x: "100%", duration: 0.25 });
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, []);

  if (!isOpen) return null;

  const linkClass = (href: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `flex items-center gap-2.5 min-[375px]:gap-3 rounded-xl px-3 min-[375px]:px-4 py-2.5 min-[375px]:py-3 text-[13px] min-[360px]:text-sm font-medium transition-all duration-200 ${
      isActive ? "bg-white/15 text-white" : "text-white/90 hover:bg-white/10 hover:text-white"
    }`;
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm overflow-hidden touch-none"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 w-[min(18rem,88vw)] max-w-72 shadow-2xl z-50 md:hidden flex flex-col bg-gradient-to-b from-primary to-primary-dark overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/assets/patterns/blob-1.svg')] bg-cover bg-center opacity-[0.06] pointer-events-none" aria-hidden />
        {/* Wave at very top edge - full structured wave; height scales down on small phones */}
        <div className="shrink-0 relative h-9 min-[375px]:h-10 min-[400px]:h-12 w-full overflow-hidden pointer-events-none" aria-hidden>
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 400 48"
            preserveAspectRatio="none"
          >
            <path
              fill="rgba(255,255,255,0.1)"
              d="M0,0 L400,0 L400,24 Q300,12 200,24 Q100,36 0,24 L0,0 Z"
            />
            <path
              fill="rgba(255,255,255,0.05)"
              d="M0,0 L400,0 L400,26 Q320,14 200,26 Q80,38 0,26 L0,0 Z"
            />
          </svg>
        </div>
        <div className="mobile-nav-scroll flex flex-col flex-1 min-h-0 px-3 min-[375px]:px-4 pb-4 min-[375px]:pb-6 overflow-y-auto overflow-x-hidden overscroll-contain">
          <p className="text-white/50 text-[10px] min-[360px]:text-xs font-semibold uppercase tracking-wider px-3 min-[375px]:px-4 mb-1.5 min-[360px]:mb-2">Menu</p>
          <nav ref={navLinksRef} className="flex flex-col gap-0.5 min-[375px]:gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={linkClass(item.href)}
              >
                {navIcons[item.label] ?? null}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="my-3 min-[375px]:my-4 border-t border-white/15" />
          <p className="text-white/50 text-[10px] min-[360px]:text-xs font-semibold uppercase tracking-wider px-3 min-[375px]:px-4 mb-1.5 min-[360px]:mb-2">Account</p>
          <div className="flex flex-col gap-0.5 min-[375px]:gap-1">
            <Link href="/login" onClick={onClose} className={linkClass("/login")}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login</span>
            </Link>
            <Link href="/register" onClick={onClose} className={linkClass("/register")}>
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Register</span>
            </Link>
          </div>
          <div className="mt-auto pt-4 min-[375px]:pt-6">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 min-[375px]:gap-2 w-full rounded-xl px-4 min-[375px]:px-6 py-3 min-[375px]:py-3.5 text-sm min-[360px]:text-base font-semibold bg-accent text-white hover:bg-accent-light shadow-lg shadow-accent/25 hover:shadow-accent/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            >
              <span>Book Free Consultation</span>
              <svg className="w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
