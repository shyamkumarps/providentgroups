"use client";

import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  attentionShimmer?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-accent text-white hover:bg-accent-light shadow-md hover:shadow-[0_4px_20px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] active:shadow-inner",
  secondary:
    "relative overflow-hidden border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-[0_4px_20px_rgba(15,118,110,0.3)] transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.97] active:shadow-inner",
  ghost:
    "relative overflow-hidden text-primary hover:bg-primary/10 transition-all duration-300 active:scale-[0.98]",
};

const shimmerGradient = "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.42) 44%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.42) 56%, transparent 100%)";

const secondaryShimmerGradient = "linear-gradient(90deg, transparent 0%, rgba(15,118,110,0.12) 44%, rgba(15,118,110,0.22) 50%, rgba(15,118,110,0.12) 56%, transparent 100%)";

function ButtonContent({ children, attentionShimmer, variant }: { children: React.ReactNode; attentionShimmer?: boolean; variant: ButtonVariant }) {
  const isSecondary = variant === "secondary";
  const shimmer = isSecondary ? secondaryShimmerGradient : shimmerGradient;

  return (
    <>
      {attentionShimmer && (
        <span
          className="pointer-events-none absolute inset-0 z-0 animate-cta-attention-shimmer"
          style={{
            background: shimmer,
            backgroundSize: "200% 100%",
          }}
          aria-hidden
        />
      )}
      <span
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[btn-shimmer_1.15s_ease-in-out]"
        style={{
          background: shimmer,
          backgroundSize: "200% 100%",
        }}
        aria-hidden
      />
      <span className="relative z-10 inline-flex items-center justify-center">
        <span>{children}</span>
        <span
          className="inline-flex shrink-0 h-4 w-0 items-center justify-center overflow-hidden opacity-0 ml-0 transition-[width,opacity,margin] duration-300 ease-out group-hover:w-4 group-hover:opacity-100 group-hover:ml-2"
          aria-hidden
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </span>
    </>
  );
}

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  attentionShimmer = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const combined = `${base} ${variantClasses[variant]} ${className}`.trim();
  const hasEffects = variant !== "ghost";
  const content = hasEffects
    ? <ButtonContent attentionShimmer={attentionShimmer} variant={variant}>{children}</ButtonContent>
    : children;

  if (href) {
    return (
      <Link href={href} className={`${combined} ${hasEffects ? "group" : ""}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={`${combined} ${hasEffects ? "group" : ""}`} {...props}>
      {content}
    </button>
  );
}
