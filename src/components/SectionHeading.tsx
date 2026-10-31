interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, description, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
        <span className="h-px w-8 bg-orange-500" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold leading-[1.2] text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="max-w-2xl text-base leading-[1.5] text-zinc-400 sm:text-lg">{description}</p>}
    </div>
  );
}
