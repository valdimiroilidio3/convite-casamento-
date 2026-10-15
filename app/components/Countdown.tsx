'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/data/wedding';
import { getTimeLeft, cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

interface UnitProps {
  value: number;
  label: string;
  index: number;
  reduce: boolean;
}

function CountdownUnit({ value, label, index, reduce }: UnitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: reduce ? 0 : index * 0.12, ease }}
      className="flex flex-col items-center"
    >
      <span className="font-serif text-[clamp(2.6rem,9vw,5.25rem)] font-light leading-none text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-4 text-[0.58rem] font-medium uppercase tracking-luxe text-white/65 sm:text-[0.66rem]">
        {label}
      </span>
    </motion.div>
  );
}

/**
 * Contagem regressiva em destaque sobre foto.
 * Atualiza em tempo real e muda a mensagem após o evento.
 */
export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState(() => getTimeLeft(wedding.date.iso));
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => setLeft(getTimeLeft(wedding.date.iso)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { value: left.days, label: 'Dias' },
    { value: left.hours, label: 'Horas' },
    { value: left.minutes, label: 'Minutos' },
    { value: left.seconds, label: 'Segundos' },
  ];

  return (
    <section
      id="contagem"
      aria-label="Contagem regressiva para o casamento"
      className="relative overflow-hidden"
    >
      {/* Fundo fotográfico */}
      <div className="absolute inset-0">
        <Image
          src={wedding.images.countdown}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(46,56,44,0.88)_0%,rgba(46,56,44,0.72)_55%,rgba(46,56,44,0.58)_100%)]"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:px-10 sm:py-28 lg:py-36">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="text-[0.62rem] font-medium uppercase tracking-luxe text-gold-light"
        >
          {left.isPast ? 'Com gratidão' : 'Falta pouco'}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, delay: 0.08, ease }}
          className="mx-auto mt-6 max-w-2xl font-serif text-[clamp(1.95rem,4.8vw,3.25rem)] font-light leading-[1.18] text-white text-balance"
        >
          {left.isPast ? (
            <>O nosso grande dia chegou.</>
          ) : (
            <>Contamos os instantes para viver este dia ao seu lado</>
          )}
        </motion.h2>

        {mounted && !left.isPast ? (
          <div className="mx-auto mt-14 flex max-w-2xl items-start justify-center gap-5 sm:gap-10 lg:gap-16">
            {units.map((unit, index) => (
              <CountdownUnit
                key={unit.label}
                value={unit.value}
                label={unit.label}
                index={index}
                reduce={Boolean(reduce)}
              />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="mx-auto mt-12 max-w-xl text-[1.02rem] leading-relaxed text-white/80"
          >
            Obrigado por fazer parte da nossa história. Que a memória deste dia nos acompanhe para
            sempre.
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-14"
        >
          <span aria-hidden="true" className="mx-auto block h-px w-14 bg-white/25" />
          <p className={cn('mt-6 text-[0.7rem] uppercase tracking-luxe text-white/55')}>
            {wedding.date.display} · {wedding.date.timeRange} · {wedding.venue.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
