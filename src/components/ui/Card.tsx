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
        rounded-2xl bg-white border border-primary/15
        shadow-lg shadow-primary/5
        ${hover ? "transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/25 hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
