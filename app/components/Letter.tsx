'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { wedding } from '@/data/wedding';
import Reveal from '@/components/Reveal';

/**
 * Carta aos convidados — texto emocional centralizado,
 * foto secundária e assinatura do casal.
 */
export default function Letter() {
  const photoRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-5%', reduce ? '-5%' : '5%']);

  const { couple, images } = wedding;

  return (
    <section id="carta" className="relative overflow-hidden bg-champagne py-24 sm:py-32 lg:py-40">
      {/* Ornamento de fundo sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-olive-mist/40 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Foto secundária com parallax discreto */}
          <div className="lg:col-span-5 lg:order-last">
            <Reveal y={36}>
              <div
                ref={photoRef}
                className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] shadow-soft lg:max-w-none"
              >
                <motion.div style={{ y: photoY }} className="absolute inset-[-8%]">
                  <Image
                    src={images.letter}
                    alt={`${couple.bride} e ${couple.groom} em um momento tranquilo junto à janela`}
                    fill
                    sizes="(min-width: 1024px) 38vw, 86vw"
                    className="object-cover"
                  />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-olive-deep/[0.14] via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>

          {/* Texto da carta */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker">Aos nossos convidados</p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl font-serif text-[clamp(2.1rem,4.6vw,3.35rem)] font-light leading-[1.16] text-graphite text-balance">
                Depois de tantos capítulos compartilhados, escolhemos celebrar o mais especial de
                todos:{' '}
                <em className="font-medium italic text-olive">o início da nossa vida juntos.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 max-w-xl space-y-5 text-[1.02rem] leading-[1.85] text-graphite-soft text-pretty">
                <p>
                  Existe uma beleza silenciosa em construir uma história a dois — e outra ainda
                  maior em dividir esse amor com as pessoas que fazem parte dela. Por isso,
                  queremos você conosco neste dia que tanto sonhamos.
                </p>
                <p>
                  Que a sua presença seja a melhor lembrança que levaremos deste capítulo. Traga
                  o seu abraço, a sua alegria e os seus melhores votos — nós cuidamos do resto.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex items-center gap-5">
                <span aria-hidden="true" className="h-px w-12 bg-gold/50" />
                <p className="font-serif text-[1.65rem] font-light italic text-olive-deep">
                  {couple.bride} &amp; {couple.groom}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
