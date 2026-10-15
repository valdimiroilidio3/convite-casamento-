'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { cn } from '@/lib/utils';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

/**
 * Perguntas frequentes — accordion com animação suave.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="relative bg-champagne-light py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <SectionHeading
          kicker="Dúvidas frequentes"
          title="Tudo o que você precisa saber"
          subtitle="Se ficar qualquer dúvida, fale conosco — será um prazer ajudar."
        />

        <div className="mt-14 lg:mt-20">
          <ul className="divide-y divide-graphite/[0.08] border-y border-graphite/[0.08]">
            {wedding.faq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={item.question}>
                  <Reveal y={18} delay={Math.min(index * 0.05, 0.25)}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-button-${index}`}
                        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={cn(
                            'font-serif text-[1.25rem] font-normal leading-snug transition-colors duration-400 sm:text-[1.45rem]',
                            isOpen ? 'text-olive' : 'text-graphite group-hover:text-olive'
                          )}
                        >
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-luxe',
                            isOpen
                              ? 'rotate-45 border-gold/60 bg-gold/10 text-gold'
                              : 'border-graphite/15 text-graphite-soft group-hover:border-gold/45 group-hover:text-gold'
                          )}
                        >
                          <Plus size={15} strokeWidth={1.6} />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`faq-panel-${index}`}
                          role="region"
                          aria-labelledby={`faq-button-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: reduce ? 0.15 : 0.55,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 pr-12 text-[0.95rem] leading-[1.85] text-graphite-soft text-pretty">
                            {item.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contato direto */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-[1.5rem] border border-gold/20 bg-champagne/70 p-9 text-center">
            <p className="font-serif text-[1.35rem] font-light italic text-olive-deep">
              Ainda tem alguma dúvida?
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-graphite-soft">
              Escreva para nós — respondemos com todo o carinho.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3.5 sm:flex-row">
              <a
                href={wedding.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp
              </a>
              <a href={`mailto:${wedding.contact.email}`} className="btn-ghost">
                Enviar e-mail
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
