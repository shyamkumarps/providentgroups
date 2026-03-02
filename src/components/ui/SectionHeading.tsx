interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-12 md:mb-16 ${className}`}>
      <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-4" />
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral-muted text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
