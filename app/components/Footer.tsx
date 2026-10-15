import { Instagram, Mail, MessageCircle, Heart } from 'lucide-react';
import { wedding } from '@/data/wedding';
import Monogram from '@/components/Monogram';

const year = new Date().getFullYear();

/**
 * Rodapé minimalista — monograma, agradecimento e contatos.
 */
export default function Footer() {
  const { couple, date, contact } = wedding;

  return (
    <footer className="relative overflow-hidden bg-graphite text-champagne-light">
      {/* Ornamento */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />

      <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-10 sm:py-24">
        <div className="flex flex-col items-center">
          <Monogram size="lg" light />

          <p className="mt-8 font-serif text-[1.85rem] font-light leading-snug text-champagne-light sm:text-[2.35rem]">
            {couple.bride}
            <span className="mx-2 font-light italic text-gold-light">&amp;</span>
            {couple.groom}
          </p>

          <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-luxe text-champagne-dark/55">
            {date.display} · {wedding.venue.name}
          </p>

          <span aria-hidden="true" className="mt-9 block h-px w-12 bg-gold/35" />

          <p className="mx-auto mt-9 max-w-md text-[0.95rem] leading-[1.9] text-champagne-dark/70 text-pretty">
            Obrigado por fazer parte da nossa história. Cada abraço, cada voto e cada instante
            deste dia ficará guardado para sempre em nossos corações.
          </p>

          <p className="mt-8 flex items-center gap-2 font-serif text-[1.15rem] font-light italic text-gold-light/90">
            Com amor,
            <Heart size={13} strokeWidth={1.4} aria-hidden="true" className="text-gold-light" />
            {couple.bride} &amp; {couple.groom}
          </p>

          {/* Contatos */}
          <nav aria-label="Contatos" className="mt-10 flex items-center gap-3.5">
            {contact.instagramUrl ? (
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do casal"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-champagne-dark/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-light"
              >
                <Instagram size={17} strokeWidth={1.4} aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp para contato"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-champagne-dark/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-light"
            >
              <MessageCircle size={17} strokeWidth={1.4} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Enviar e-mail"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] text-champagne-dark/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-light"
            >
              <Mail size={17} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>

      {/* Créditos discretos */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-7 text-[0.68rem] tracking-wide2 text-champagne-dark/45 sm:flex-row sm:px-10">
          <p>
            © {year} {couple.bride} &amp; {couple.groom}
          </p>
          <p className="uppercase tracking-luxe">Feito com carinho para o nosso grande dia</p>
        </div>
      </div>
    </footer>
  );
}
