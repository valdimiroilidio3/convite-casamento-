'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CalendarPlus, ChevronDown } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { getTimeLeft } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

function CompactCountdown() {
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(() => getTimeLeft(wedding.date.iso));

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => setLeft(getTimeLeft(wedding.date.iso)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { value: left.days, label: 'dias' },
    { value: left.hours, label: 'horas' },
    { value: left.minutes, label: 'min' },
    { value: left.seconds, label: 'seg' },
  ];

  if (!mounted || left.isPast) return null;

  return (
    <div
      className="flex items-center gap-6 sm:gap-9"
      aria-label={`Faltam ${left.days} dias para o casamento`}
    >
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-6 sm:gap-9">
          {index > 0 ? (
            <span aria-hidden="true" className="h-6 w-px bg-white/20 sm:h-8" />
          ) : null}
          <div className="flex flex-col items-center">
            <span className="font-serif text-[1.7rem] font-light leading-none text-white tabular-nums sm:text-[2.15rem]">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="mt-1.5 text-[0.56rem] font-medium uppercase tracking-luxe text-white/60">
              {unit.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Capa cinematográfica em tela cheia com parallax discreto,
 * nomes do casal, data, local e contagem regressiva compacta.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -48]);

  const { couple, date, venue, images } = wedding;

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[620px] w-full items-center justify-center overflow-hidden"
    >
      {/* Foto principal com parallax suave */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 will-change-transform">
        <Image
          src={images.hero}
          alt={`${couple.bride} e ${couple.groom} caminhando juntos em um olival ao pôr do sol`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="scale-[1.06] object-cover"
        />
      </motion.div>

      {/* Overlay para legibilidade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,36,29,0.52)_0%,rgba(30,36,29,0.28)_42%,rgba(30,36,29,0.62)_100%)]"
      />

      {/* Conteúdo */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: reduce ? 0.1 : 2.15, ease }}
          className="text-[0.62rem] font-medium uppercase tracking-luxe text-white/75 sm:text-[0.68rem]"
        >
          Com a bênção de Deus e de suas famílias
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, delay: reduce ? 0.15 : 2.3, ease }}
          className="mt-6 font-serif text-[clamp(2.9rem,11vw,7.5rem)] font-light leading-[1.02] tracking-tight text-white"
        >
          {couple.bride}
          <span className="mx-[0.14em] font-light italic text-gold-light">&amp;</span>
          {couple.groom}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduce ? 0.2 : 2.55, ease }}
          className="mt-7 flex items-center gap-4 sm:gap-6"
        >
          <span aria-hidden="true" className="h-px w-8 bg-white/40 sm:w-14" />
          <p className="text-[0.72rem] font-medium uppercase tracking-luxe text-white/90 sm:text-[0.82rem]">
            {date.display}
          </p>
          <span aria-hidden="true" className="h-px w-8 bg-white/40 sm:w-14" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduce ? 0.25 : 2.7, ease }}
          className="mt-4 text-[0.82rem] tracking-wide2 text-white/70 sm:text-[0.92rem]"
        >
          {venue.name} · {date.time}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: reduce ? 0.3 : 2.85, ease }}
          className="mt-8 max-w-md font-serif text-[1.05rem] font-light italic leading-relaxed text-white/85 sm:text-[1.25rem]"
        >
          Estamos ansiosos para celebrar este momento com você.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: reduce ? 0.35 : 3, ease }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <a href="#rsvp" className="btn-on-dark min-w-[15.5rem]">
            Confirmar presença
          </a>
          <a href="#dia" className="btn-on-dark min-w-[15.5rem] border-white/15">
            <CalendarPlus size={16} strokeWidth={1.5} aria-hidden="true" />
            Detalhes do grande dia
          </a>
        </motion.div>
      </motion.div>

      {/* Contagem compacta + indicador de rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: reduce ? 0.4 : 3.2, ease }}
        className="absolute inset-x-0 bottom-0 z-10 pb-7 sm:pb-9"
      >
        <div className="flex flex-col items-center gap-7">
          <CompactCountdown />
          <a
            href="#carta"
            aria-label="Rolar para a próxima seção"
            className="group flex flex-col items-center gap-2.5 text-white/60 transition-colors duration-500 hover:text-white"
          >
            <span className="text-[0.55rem] font-medium uppercase tracking-luxe">Descobrir</span>
            <span className="relative h-10 w-px overflow-hidden bg-white/15">
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-4 bg-white/80"
                animate={reduce ? { opacity: 1 } : { y: ['-100%', '220%'] }}
                transition={{
                  duration: 2.1,
                  repeat: reduce ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              />
            </span>
            <ChevronDown
              size={13}
              strokeWidth={1.4}
              aria-hidden="true"
              className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
