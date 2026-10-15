'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Nossa história', href: '#historia' },
  { label: 'O grande dia', href: '#dia' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Presentes', href: '#presentes' },
  { label: 'RSVP', href: '#rsvp' },
];

/**
 * Navbar fixa: transparente sobre o hero e com fundo
 * translúcido (blur) após a rolagem. Menu mobile em overlay.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const { bride, groom } = wedding.couple;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Fecha o menu com a tecla ESC
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const overHero = !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe',
          scrolled
            ? 'border-b border-graphite/[0.07] bg-champagne/[0.72] backdrop-blur-xl supports-[backdrop-filter]:bg-champagne/60'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[4.75rem] lg:px-12">
          {/* Marca do casal */}
          <a
            href="#inicio"
            className="group flex items-baseline gap-[0.4rem] transition-opacity duration-500 hover:opacity-80"
            aria-label={`${bride} e ${groom} — início`}
          >
            <span
              className={cn(
                'font-serif text-xl italic transition-colors duration-700 ease-luxe lg:text-[1.35rem]',
                overHero ? 'text-champagne-light' : 'text-graphite'
              )}
            >
              {bride}
            </span>
            <span className="font-serif text-base font-light italic text-gold lg:text-lg">&amp;</span>
            <span
              className={cn(
                'font-serif text-xl italic transition-colors duration-700 ease-luxe lg:text-[1.35rem]',
                overHero ? 'text-champagne-light' : 'text-graphite'
              )}
            >
              {groom}
            </span>
          </a>

          {/* Navegação desktop */}
          <nav aria-label="Navegação principal" className="hidden items-center gap-9 lg:flex">
            {navLinks.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative text-[0.72rem] font-medium uppercase tracking-wide2 transition-colors duration-500',
                  overHero
                    ? 'text-champagne-light/85 hover:text-white'
                    : 'text-graphite-soft hover:text-graphite'
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-luxe group-hover:scale-x-100',
                    overHero ? 'bg-white/70' : 'bg-gold'
                  )}
                />
              </a>
            ))}
            <a
              href="#rsvp"
              className={cn(
                'rounded-full px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-wide2 transition-all duration-500 ease-luxe active:scale-[0.97]',
                overHero
                  ? 'border border-white/35 bg-white/10 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/20'
                  : 'border border-transparent bg-olive text-champagne-light shadow-btn hover:bg-olive-deep'
              )}
            >
              Confirmar presença
            </a>
          </nav>

          {/* Ações mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="#rsvp"
              className={cn(
                'rounded-full px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-all duration-500 active:scale-[0.97]',
                overHero
                  ? 'border border-white/35 bg-white/10 text-white backdrop-blur-md'
                  : 'bg-olive text-champagne-light shadow-btn'
              )}
            >
              RSVP
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500',
                overHero
                  ? 'border-white/30 text-white'
                  : 'border-graphite/15 text-graphite'
              )}
            >
              <Menu size={19} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[60] flex flex-col bg-champagne lg:hidden"
            initial={{ opacity: 0, y: reduce ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <div className="flex h-[4.25rem] items-center justify-between px-5">
              <span className="font-serif text-xl italic text-graphite">
                {bride}
                <span className="px-1 font-light text-gold">&amp;</span>
                {groom}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite/15 text-graphite transition-colors hover:border-gold/50"
              >
                <X size={19} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Navegação móvel" className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.08 + index * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline justify-between border-b border-graphite/[0.07] py-4"
                    >
                      <span className="font-serif text-[2rem] font-light leading-none text-graphite transition-colors duration-300 group-hover:text-olive">
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-[0.62rem] uppercase tracking-luxe text-gold/70"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-10"
              >
                <a
                  href="#rsvp"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full"
                >
                  Confirmar presença
                </a>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
