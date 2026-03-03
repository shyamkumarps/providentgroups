"use client";

import { useState, useEffect, useCallback } from "react";

export function ScrollDirectionButton() {
  const [atBottom, setAtBottom] = useState(false);
  const [visible, setVisible] = useState(false);

  const checkPosition = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollY + windowHeight >= docHeight - 100;

    setAtBottom(nearBottom);
    setVisible(scrollY > 200 || nearBottom);
  }, []);

  useEffect(() => {
    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    return () => window.removeEventListener("scroll", checkPosition);
  }, [checkPosition]);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={atBottom ? "Scroll to top" : "Scroll to bottom"}
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-40
        flex items-center justify-center w-9 h-9 rounded-full
        bg-white/75 backdrop-blur-2xl border border-white/30
        text-primary/80 hover:text-primary hover:bg-white/90
        shadow-[0_4px_16px_rgba(0,0,0,0.10)]
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      {atBottom ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </button>
  );
}
