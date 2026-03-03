"use client";

import { useState, useEffect, useRef } from "react";

export function ScrollDirectionButton() {
  const [direction, setDirection] = useState<"down" | "up">("down");
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const nearBottom = scrollY + windowHeight >= docHeight - 100;
      const scrollingUp = scrollY < lastScrollY.current;

      if (nearBottom) {
        setDirection("up");
      } else if (scrollingUp) {
        setDirection("up");
      } else {
        setDirection("down");
      }

      setVisible(scrollY > 200);
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (direction === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={direction === "up" ? "Scroll to top" : "Scroll to bottom"}
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
      {direction === "up" ? (
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
