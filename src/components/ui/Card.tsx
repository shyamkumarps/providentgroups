"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-white border border-primary/15 shadow-card
        ${hover ? "transition-all duration-300 hover:shadow-card-hover hover:border-primary/25 hover:-translate-y-0.5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
