"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STORAGE_KEY = "banner-promo-closed";

export function BannerPromo() {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setShowFloatingButton(true);
  }, [mounted]);

  const closeModal = () => {
    setModalOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "true");
    setShowFloatingButton(true);
  };

  const openModal = () => setModalOpen(true);

  if (!mounted) return null;

  return (
    <>
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Promotional banner"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />
          <div
            className="relative w-fit max-w-[95vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero/Banner.jpeg"
              alt="Hopeson Group – Admissions for all professional courses. Since 2000."
              className="block max-w-full max-h-[85vh] w-auto h-auto rounded-2xl"
            />
          </div>
        </div>
      )}

      {showFloatingButton && (
        <button
          type="button"
          onClick={openModal}
          className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-primary shadow-lg text-white flex items-center justify-center overflow-hidden border-2 border-accent/70 animate-banner-float-btn hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-transform"
          aria-label="View promotional banner"
        >
          <span className="absolute inset-0 rounded-full overflow-hidden">
            <Image src="/assets/hero/Banner.jpeg" alt="" fill className="object-cover" sizes="56px" />
          </span>
          <span className="absolute inset-0 rounded-full bg-primary/50" />
          <svg
            className="w-6 h-6 relative z-10 text-white drop-shadow-md"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )}
    </>
  );
}
