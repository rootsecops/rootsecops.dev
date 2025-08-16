interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  tagText?: string;
}

export default function SectionTitle({ title, description, className, tagText }: SectionTitleProps) {
  return (
    <div className={`mb-4 md:mb-6 text-center ${className}`}>
      {tagText && (
        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">
          {tagText}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
