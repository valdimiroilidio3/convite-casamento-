'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { wedding, preloaderConfig } from '@/data/wedding';

/**
 * Abertura minimalista com o monograma do casal.
 * Dura pouco tempo, não bloqueia a interação e é ignorada
 * quando o sistema pede redução de movimento.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();
  const { bride, groom, brideInitial, groomInitial } = wedding.couple;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReduced ? 150 : preloaderConfig.durationMs;

    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, duration);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-champagne"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, y: '-100%' }}
          transition={{ duration: reduce ? 0.2 : 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <motion.span
              className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/50 font-serif text-3xl text-olive-deep"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0.2 : 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {brideInitial}
              <span className="px-1 font-light italic text-gold">&amp;</span>
              {groomInitial}
            </motion.span>

            <motion.span
              aria-hidden="true"
              className="mt-7 h-px w-14 origin-center bg-gold/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduce ? 0.2 : 1.1, delay: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              className="mt-6 text-[0.68rem] font-medium uppercase tracking-luxe text-graphite-soft"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.32em' }}
              transition={{ duration: reduce ? 0.2 : 1.2, delay: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {bride} &amp; {groom}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
