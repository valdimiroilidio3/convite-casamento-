'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { wedding, type StoryItem } from '@/data/wedding';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

function StoryPhoto({ item }: { item: StoryItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', reduce ? '-6%' : '6%']);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] shadow-soft sm:rounded-[1.75rem]"
    >
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 42vw, 88vw"
          className="object-cover transition-transform duration-[1.6s] ease-luxe hover:scale-[1.04]"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-olive-deep/[0.12] via-transparent to-transparent"
      />
    </div>
  );
}

/**
 * Nossa história — timeline editorial.
 * Desktop: composição assimétrica com foto e texto alternados.
 * Mobile: linha vertical limpa com marcadores dourados.
 */
export default function LoveStory() {
  const reduce = useReducedMotion();

  return (
    <section id="historia" className="relative bg-champagne-light py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          kicker="Nossa história"
          title="Cada capítulo nos trouxe até aqui"
          subtitle="Quatro lembranças que resumem o caminho que percorremos — e anunciam o melhor de todos."
        />

        <div className="relative mt-20 lg:mt-28">
          {/* Linha vertical (mobile) */}
          <div
            aria-hidden="true"
            className="absolute left-[0.95rem] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent lg:hidden"
          />

          <ol className="space-y-20 lg:space-y-32">
            {wedding.story.map((item, index) => {
              const reversed = index % 2 === 1;
              return (
                <li key={item.title} className="relative">
                  {/* Marcador (mobile) */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 flex h-[1.95rem] w-[1.95rem] items-center justify-center rounded-full border border-gold/45 bg-champagne-light lg:hidden"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </div>

                  <div className="pl-10 lg:pl-0">
                    <div
                      className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                        reversed ? '' : ''
                      }`}
                    >
                      {/* Foto */}
                      <div
                        className={`lg:col-span-6 ${
                          reversed ? 'lg:order-last lg:col-start-7' : ''
                        }`}
                      >
                        <Reveal y={40}>
                          <StoryPhoto item={item} />
                        </Reveal>
                      </div>

                      {/* Texto */}
                      <div className={`lg:col-span-5 ${reversed ? 'lg:order-first lg:col-start-1' : 'lg:col-start-8'}`}>
                        <Reveal y={28}>
                          <div className={reversed ? 'lg:text-right' : ''}>
                            <p className="font-serif text-[2.6rem] font-light italic leading-none text-gold sm:text-[3.15rem]">
                              {item.year}
                            </p>
                            <h3 className="mt-4 font-serif text-[1.75rem] font-normal leading-snug text-graphite sm:text-[2.15rem]">
                              {item.title}
                            </h3>
                            <p
                              className={`mt-5 text-[0.98rem] leading-[1.85] text-graphite-soft text-pretty ${
                                reversed ? 'lg:ml-auto' : ''
                              } max-w-md`}
                            >
                              {item.text}
                            </p>
                            <span
                              aria-hidden="true"
                              className={`mt-7 block h-px w-12 bg-gold/45 ${
                                reversed ? 'lg:ml-auto' : ''
                              }`}
                            />
                          </div>
                        </Reveal>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Fecho poético */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-24 max-w-lg text-center lg:mt-32">
            <span aria-hidden="true" className="mx-auto block h-px w-16 bg-gold/40" />
            <p className="mt-8 font-serif text-[1.35rem] font-light italic leading-relaxed text-olive sm:text-[1.65rem]">
              “E o melhor da nossa história ainda está por ser escrito.”
            </p>
            <p className="mt-5 text-[0.62rem] font-medium uppercase tracking-luxe text-graphite-faint">
              {wedding.date.display} · {wedding.venue.name}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
