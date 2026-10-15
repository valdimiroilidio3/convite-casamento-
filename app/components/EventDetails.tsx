'use client';

import {
  CalendarDays,
  Clock,
  MapPin,
  Shirt,
  Sparkles,
  CalendarPlus,
  Download,
  Navigation,
  Church,
  Wine,
} from 'lucide-react';
import { wedding } from '@/data/wedding';
import {
  cn,
  downloadIcs,
  googleCalendarUrl,
  icsFilename,
  type CalendarEvent,
} from '@/lib/utils';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-champagne-light text-olive">
        <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-luxe text-graphite-faint">
          {label}
        </p>
        <p className="mt-1.5 whitespace-pre-line text-[0.95rem] leading-relaxed text-graphite">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * Detalhes do evento — cerimônia, recepção, informações práticas
 * e botões de calendário/rota.
 */
export default function EventDetails() {
  const { couple, date, venue, seo } = wedding;

  const calendarEvent: CalendarEvent = {
    title: `Casamento de ${couple.bride} & ${couple.groom}`,
    startIso: date.iso,
    details: `Estamos ansiosos para celebrar este momento com você. Cerimônia às ${venue.ceremonyTime} e recepção às ${venue.receptionTime}.`,
    location: `${venue.name} — ${venue.address}`,
    url: seo.baseUrl,
  };

  return (
    <section id="dia" className="relative bg-champagne py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          kicker="O grande dia"
          title="Tudo o que você precisa saber"
          subtitle="Separamos os detalhes com carinho para que a sua única preocupação seja aproveitar cada instante."
        />

        {/* Cards de cerimônia e recepção */}
        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <Reveal y={32}>
            <article className="group h-full rounded-[1.5rem] border border-graphite/[0.08] bg-white/55 p-9 shadow-card transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-gold/25 hover:shadow-soft sm:p-11">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-champagne-light text-olive transition-colors duration-500 group-hover:border-gold/60">
                  <Church size={19} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-luxe text-gold">
                    Cerimônia
                  </p>
                  <p className="mt-1 font-serif text-[1.45rem] font-normal text-graphite">
                    {venue.ceremonyTime}
                  </p>
                </div>
              </div>
              <p className="mt-7 text-[0.95rem] leading-[1.85] text-graphite-soft text-pretty">
                O nosso “sim” acontece ao ar livre, cercado de natureza e das pessoas que amamos.
                Chegue com alguns minutos de antecedência para acomodar-se com calma.
              </p>
            </article>
          </Reveal>

          <Reveal y={32} delay={0.1}>
            <article className="group h-full rounded-[1.5rem] border border-graphite/[0.08] bg-white/55 p-9 shadow-card transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-gold/25 hover:shadow-soft sm:p-11">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-champagne-light text-olive transition-colors duration-500 group-hover:border-gold/60">
                  <Wine size={19} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-luxe text-gold">
                    Recepção
                  </p>
                  <p className="mt-1 font-serif text-[1.45rem] font-normal text-graphite">
                    {venue.receptionTime}
                  </p>
                </div>
              </div>
              <p className="mt-7 text-[0.95rem] leading-[1.85] text-graphite-soft text-pretty">
                Em seguida, celebramos com música, brindes e uma noite inesquecível. Prepare o
                seu melhor abraço — e o seu melhor passo de dança.
              </p>
            </article>
          </Reveal>
        </div>

        {/* Informações práticas */}
        <Reveal y={28}>
          <div className="mt-8 rounded-[1.5rem] border border-graphite/[0.08] bg-champagne-light/80 p-9 sm:p-11 lg:mt-10">
            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <DetailRow icon={CalendarDays} label="Data" value={date.display} />
              <DetailRow icon={Clock} label="Horário" value={date.timeRange} />
              <DetailRow icon={MapPin} label="Local" value={`${venue.name}\n${venue.address}`} />
              <DetailRow icon={Shirt} label="Traje" value={venue.dressCode} />
            </div>

            <div className="mt-10 border-t border-graphite/[0.07] pt-8">
              <div className="flex items-start gap-3.5">
                <Sparkles
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-gold"
                />
                <p className="text-[0.9rem] leading-[1.8] text-graphite-soft text-pretty">
                  {venue.notes}
                </p>
              </div>
            </div>

            {/* Ações */}
            <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('btn-primary', 'w-full sm:w-auto')}
              >
                <Navigation size={16} strokeWidth={1.6} aria-hidden="true" />
                Como chegar
              </a>
              <button
                type="button"
                onClick={() =>
                  window.open(googleCalendarUrl(calendarEvent), '_blank', 'noopener,noreferrer')
                }
                className="btn-ghost w-full sm:w-auto"
              >
                <CalendarPlus size={16} strokeWidth={1.5} aria-hidden="true" />
                Google Calendar
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadIcs(calendarEvent, icsFilename(couple.bride, couple.groom))
                }
                className="btn-ghost w-full sm:w-auto"
              >
                <Download size={16} strokeWidth={1.5} aria-hidden="true" />
                Apple / Outlook (.ics)
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
