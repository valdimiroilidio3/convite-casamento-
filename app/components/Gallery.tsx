'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { cn } from '@/lib/utils';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const ease = [0.16, 1, 0.3, 1] as const;

/** Composição editorial assimétrica — spans do grid de 12 colunas. */
const layout = [
  { span: 'md:col-span-7', aspect: 'aspect-[4/3] md:aspect-[16/11]' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/3] md:aspect-[16/11]' },
  { span: 'md:col-span-4', aspect: 'aspect-[4/5] md:aspect-[4/5]' },
  { span: 'md:col-span-4', aspect: 'aspect-[4/5] md:aspect-[4/5]' },
  { span: 'md:col-span-4', aspect: 'aspect-[4/5] md:aspect-[4/5]' },
  { span: 'md:col-span-12', aspect: 'aspect-[4/3] md:aspect-[21/9]' },
];

interface LightboxProps {
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

function Lightbox({ index, onClose, onNavigate }: LightboxProps) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = wedding.images.gallery;
  const current = items[index];

  // Foco inicial e navegação por teclado
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length);
      if (event.key === 'ArrowRight') onNavigate((index + 1) % items.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, items.length, onClose, onNavigate]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-graphite/[0.92] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.4, ease }}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} de ${items.length}: ${current.alt}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar galeria"
        ref={closeRef}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-300 hover:border-white/50 hover:bg-white/10 hover:text-white sm:right-7 sm:top-7"
      >
        <X size={19} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => onNavigate((index - 1 + items.length) % items.length)}
        aria-label="Foto anterior"
        className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white sm:left-6"
      >
        <ChevronLeft size={26} strokeWidth={1.3} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => onNavigate((index + 1) % items.length)}
        aria-label="Próxima foto"
        className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white sm:right-6"
      >
        <ChevronRight size={26} strokeWidth={1.3} aria-hidden="true" />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          className="relative mx-12 flex max-h-[82svh] w-full max-w-5xl flex-col items-center"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.97, x: 0 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          transition={{ duration: reduce ? 0.15 : 0.45, ease }}
          drag={reduce ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.22}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) onNavigate((index + 1) % items.length);
            else if (info.offset.x > 80) onNavigate((index - 1 + items.length) % items.length);
          }}
        >
          <div className="relative max-h-[70svh] w-full overflow-hidden rounded-xl">
            <Image
              src={current.src}
              alt={current.alt}
              width={1536}
              height={1024}
              className="mx-auto max-h-[70svh] w-auto max-w-full object-contain select-none"
              priority
              draggable={false}
            />
          </div>
          <figcaption className="mt-5 text-center text-[0.72rem] uppercase tracking-wide2 text-white/60">
            {current.alt}
            <span className="ml-3 text-white/35">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Galeria editorial — grid assimétrico, lazy loading,
 * lightbox com navegação por teclado e swipe.
 */
export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = wedding.images.gallery;

  const close = useCallback(() => setActiveIndex(null), []);
  const navigate = useCallback((next: number) => setActiveIndex(next), []);

  return (
    <section id="galeria" className="relative bg-champagne-light py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          kicker="Galeria"
          title="Fragmentos da nossa história"
          subtitle="Instantes reais, luz natural e tudo aquilo que faz o nosso amor parecer tão simples quanto profundo."
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {items.map((item, index) => (
            <Reveal
              key={item.src + index}
              className={cn(layout[index]?.span, 'col-span-1')}
              delay={(index % 3) * 0.08}
              y={26}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ampliar foto: ${item.alt}`}
                className={cn(
                  'group relative w-full overflow-hidden rounded-[1.15rem] shadow-card lg:rounded-[1.35rem]',
                  layout[index]?.aspect
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 46vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.055]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-olive-deep/0 transition-colors duration-700 group-hover:bg-olive-deep/[0.12]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-4 flex h-9 items-center rounded-full border border-white/25 bg-white/10 px-4 text-[0.6rem] font-semibold uppercase tracking-wide2 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100"
                >
                  Ampliar
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <Lightbox index={activeIndex} onClose={close} onNavigate={navigate} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
