"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSiteData } from "@/lib/data";
import { MobileNav } from "./MobileNav";

const site = getSiteData();

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    if (avatarOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [avatarOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 min-h-16 h-16 transition-all duration-500 ${
          scrolled
            ? "mx-4 lg:mx-8 mt-3 rounded-2xl bg-gradient-to-r from-white/10 via-white/75 to-white/10 backdrop-blur-2xl border border-white/15 shadow-xl shadow-black/5"
            : "bg-black/25 backdrop-blur-sm border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-6xl">
          <Link
            href="/"
            className={`flex items-center gap-2 shrink-0 transition-[filter,drop-shadow] duration-300 ${
              scrolled
                ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:drop-shadow-[0_4px_12px_rgba(15,118,110,0.25)]"
                : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:drop-shadow-[0_4px_16px_rgba(249,115,22,0.2)]"
            }`}
          >
            <Image
              src="/assets/logo-1.png"
              alt={site.brand.name}
              width={220}
              height={56}
              className="h-14 md:h-16 w-auto"
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {site.nav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 px-3 py-1.5 ${
                    scrolled
                      ? `header-nav-text-scrolled ${isActive ? "text-primary font-semibold" : "text-primary/70 hover:text-primary"}`
                      : `header-nav-text-transparent ${isActive ? "text-white font-semibold" : "text-white/90 hover:text-white"}`
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 ${
                      scrolled
                        ? "w-1.5 h-1.5 bg-accent"
                        : "w-5 h-0.5 bg-accent"
                    }`} aria-hidden />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center">
            <div className="relative" ref={avatarRef}>
              <button
                type="button"
                onClick={() => setAvatarOpen((v) => !v)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary/50 overflow-hidden ${
                  scrolled
                    ? avatarOpen
                      ? "bg-primary/20 text-primary shadow-[0_0_0_2px_rgba(15,118,110,0.3)]"
                      : "bg-primary/15 text-primary hover:bg-primary/25 hover:text-primary hover:scale-105 shadow-[0_0_0_1px_rgba(15,118,110,0.2)]"
                    : avatarOpen
                      ? "bg-white/25 text-white shadow-[0_0_0_2px_rgba(255,255,255,0.4),0_0_20px_rgba(255,255,255,0.15)]"
                      : "bg-white/10 text-white hover:bg-white/20 hover:text-white hover:scale-105 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_0_16px_rgba(255,255,255,0.1)] shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                }`}
                aria-label="Account menu"
                aria-expanded={avatarOpen}
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-60" aria-hidden />
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {avatarOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white/95 backdrop-blur-xl shadow-xl border border-white/40 py-2 z-50">
                  <Link
                    href="/login"
                    onClick={() => setAvatarOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setAvatarOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors ${
              scrolled ? "text-primary" : "text-white"
            }`}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        nav={site.nav}
      />
    </>
  );
}
