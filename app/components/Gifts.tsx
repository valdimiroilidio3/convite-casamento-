'use client';

import { useState } from 'react';
import { Check, Copy, ExternalLink, Gift } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/data/wedding';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

/**
 * Presentes — seção elegante, sem pressão comercial.
 * Chave Pix com botão de copiar e links para listas externas.
 */
export default function Gifts() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const { gifts } = wedding;

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(gifts.pixKey);
    } catch {
      // Fallback para navegadores antigos
      const input = document.createElement('input');
      input.value = gifts.pixKey;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="presentes" className="relative bg-champagne py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <SectionHeading
          kicker="Presentes"
          title="Seu carinho é o nosso maior presente"
          subtitle="Se desejar nos presentear, preparamos algumas opções com muito carinho — sem qualquer obrigação, apenas amor."
        />

        {/* Pix */}
        <Reveal y={30}>
          <div className="mt-16 rounded-[1.5rem] border border-graphite/[0.08] bg-white/55 p-8 shadow-card sm:p-11 lg:mt-20">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="flex items-center gap-2.5 text-[0.62rem] font-semibold uppercase tracking-luxe text-gold">
                  <Gift size={13} strokeWidth={1.6} aria-hidden="true" />
                  {gifts.pixLabel}
                </p>
                <p className="mt-4 break-all font-serif text-[1.45rem] font-normal leading-snug text-graphite sm:text-[1.75rem]">
                  {gifts.pixKey}
                </p>
              </div>

              <button
                type="button"
                onClick={copyPix}
                aria-label="Copiar chave Pix"
                className="btn-primary relative w-full shrink-0 lg:w-auto lg:min-w-[12.5rem]"
              >
                <motion.span
                  key={copied ? 'copied' : 'copy'}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5"
                >
                  {copied ? (
                    <>
                      <Check size={16} strokeWidth={1.8} aria-hidden="true" />
                      Chave copiada
                    </>
                  ) : (
                    <>
                      <Copy size={16} strokeWidth={1.6} aria-hidden="true" />
                      Copiar chave
                    </>
                  )}
                </motion.span>
              </button>
            </div>

            <p
              role="status"
              aria-live="polite"
              className={`mt-4 text-[0.78rem] transition-opacity duration-500 ${
                copied ? 'text-olive opacity-100' : 'opacity-0'
              }`}
            >
              Chave Pix copiada com sucesso. Obrigado pelo carinho!
            </p>
          </div>
        </Reveal>

        {/* Listas externas */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {gifts.options.map((option, index) => (
            <Reveal key={option.label} y={26} delay={0.08 * index}>
              <a
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[1.5rem] border border-graphite/[0.08] bg-champagne-light/80 p-8 transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-gold/30 hover:bg-white/70 hover:shadow-soft sm:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-[1.55rem] font-normal leading-snug text-graphite">
                    {option.label}
                  </h3>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 text-olive transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/10">
                    <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-[0.92rem] leading-[1.8] text-graphite-soft text-pretty">
                  {option.description}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-auto pt-6 text-[0.62rem] font-semibold uppercase tracking-wide2 text-gold opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                >
                  Acessar lista →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Nota delicada */}
        <Reveal delay={0.15}>
          <p className="mx-auto mt-14 max-w-lg text-center font-serif text-[1.25rem] font-light italic leading-relaxed text-olive sm:text-[1.5rem]">
            “A sua presença é o presente que mais desejamos.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
