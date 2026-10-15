import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
}

/** Cabeçalho de seção editorial — kicker, título serifado e subtítulo. */
export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal className={cn(centered && 'flex flex-col items-center text-center', className)}>
      {kicker ? (
        <p className={cn('kicker', centered && 'justify-center', light && 'text-gold-light')}>
          {kicker}
        </p>
      ) : null}

      <h2
        className={cn(
          'mt-5 font-serif text-[clamp(2.15rem,5.2vw,3.65rem)] font-light leading-[1.12] tracking-tight text-balance',
          light ? 'text-champagne-light' : 'text-graphite'
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={cn(
            'mt-5 max-w-xl text-[0.98rem] leading-relaxed text-pretty',
            light ? 'text-champagne-dark/85' : 'text-graphite-soft'
          )}
        >
          {subtitle}
        </p>
      ) : null}

      <span
        aria-hidden="true"
        className={cn(
          'mt-8 block h-px w-12',
          light ? 'bg-gold-light/50' : 'bg-gold/45'
        )}
      />
    </Reveal>
  );
}
