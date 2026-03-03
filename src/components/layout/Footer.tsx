import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/data";

const site = getSiteData();
const { brand, contact, nav, social } = site;

const wave1 = "M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 L1000,0 L0,0 Z";
const wave2 = "M0,35 C120,70 320,5 500,35 C680,65 880,5 1000,35 L1000,0 L0,0 Z";
const wave3 = "M0,30 C180,60 300,10 500,30 C700,50 820,10 1000,30 L1000,0 L0,0 Z";

export function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Top wave divider */}
      <div
        className="absolute top-0 left-0 w-full h-12 sm:h-14 md:h-16 overflow-hidden z-10 pointer-events-none"
        aria-hidden
      >
        <svg className="absolute top-0 left-0 block h-12 sm:h-14 md:h-16 animate-wave-3" viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ width: "200%", opacity: 0.3 }}>
          <path fill="var(--background)" d={wave3} />
        </svg>
        <svg className="absolute top-0 left-0 block h-12 sm:h-14 md:h-16 animate-wave-2" viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ width: "200%", opacity: 0.5 }}>
          <path fill="var(--background)" d={wave2} />
        </svg>
        <svg className="absolute top-0 left-0 block h-12 sm:h-14 md:h-16 animate-wave-1" viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ width: "200%", opacity: 1 }}>
          <path fill="var(--background)" d={wave1} />
        </svg>
        {/* Dots on the cream wave area */}
        <div className="absolute inset-0 bg-dots-grid opacity-40 pointer-events-none z-20" />
      </div>
      <div className="container mx-auto px-4 pt-20 pb-28 sm:pb-24 md:pt-24 md:pb-16 max-w-6xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo-1.png"
                alt={brand.name}
                width={189}
                height={48}
                className="h-12 w-auto opacity-90"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              {brand.tagline}. Expert education consultancy and university admissions support in Karnataka.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-accent text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">
                  {contact.email}
                </a>
              </li>
              <li>{contact.address}</li>
              <li>{contact.hours}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"
                  aria-label={s.name}
                >
                  {s.icon === "facebook" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  )}
                  {s.icon === "instagram" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  )}
                  {s.icon === "linkedin" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.919-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  )}
                  {s.icon === "twitter" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 text-sm px-4 sm:px-0">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
