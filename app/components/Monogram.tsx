import { wedding } from '@/data/wedding';
import { cn } from '@/lib/utils';

interface MonogramProps {
  size?: 'sm' | 'md' | 'lg';
  light?: boolean;
  className?: string;
}

const sizes = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-16 w-16 text-lg',
  lg: 'h-24 w-24 text-2xl',
};

/** Monograma tipográfico do casal em um círculo de linha fina. */
export default function Monogram({ size = 'md', light = false, className }: MonogramProps) {
  const { brideInitial, groomInitial } = wedding.couple;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex select-none items-center justify-center rounded-full border font-serif',
        sizes[size],
        light ? 'border-white/35 text-champagne-light' : 'border-gold/50 text-olive-deep',
        className
      )}
    >
      {brideInitial}
      <span className={cn('px-[0.22em] font-light italic', light ? 'text-gold-light' : 'text-gold')}>
        &amp;
      </span>
      {groomInitial}
    </span>
  );
}
