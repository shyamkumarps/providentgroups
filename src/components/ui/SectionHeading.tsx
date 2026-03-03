interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
        {title}
      </h2>
      <div className="w-12 h-[3px] bg-accent rounded-full mx-auto mt-3 mb-4" />
      {subtitle && (
        <p className="text-neutral-muted text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
