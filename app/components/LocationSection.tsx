'use client';

import { Navigation, MapPin, Clock } from 'lucide-react';
import { wedding } from '@/data/wedding';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

/**
 * Localização — mapa leve (embed do Google Maps),
 * endereço completo e atalho para abrir a rota.
 */
export default function LocationSection() {
  const { venue, date } = wedding;
  const mapQuery = encodeURIComponent(`${venue.name}, ${venue.address}`);
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`;

  return (
    <section id="local" className="relative bg-champagne py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          kicker="Localização"
          title="Onde tudo acontece"
          subtitle="Um refúgio cercado de natureza, a poucos minutos da cidade — fácil de encontrar, difícil de esquecer."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Informações */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col">
              <div>
                <p className="flex items-center gap-2.5 text-[0.62rem] font-semibold uppercase tracking-luxe text-gold">
                  <MapPin size={13} strokeWidth={1.6} aria-hidden="true" />
                  O local
                </p>
                <h3 className="mt-5 font-serif text-[clamp(1.8rem,3.6vw,2.5rem)] font-light leading-snug text-graphite">
                  {venue.name}
                </h3>
                <p className="mt-4 text-[1rem] leading-[1.85] text-graphite-soft text-pretty">
                  {venue.address}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3.5">
                  <Clock size={15} strokeWidth={1.5} aria-hidden="true" className="text-olive" />
                  <p className="text-[0.92rem] text-graphite-soft">
                    {date.display} · a partir das {venue.ceremonyTime}
                  </p>
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row lg:mt-auto lg:pt-10">
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto"
                >
                  <Navigation size={16} strokeWidth={1.6} aria-hidden="true" />
                  Abrir no Google Maps
                </a>
              </div>

              <p className="mt-7 text-[0.82rem] leading-[1.8] text-graphite-faint">
                {venue.notes}
              </p>
            </div>
          </Reveal>

          {/* Mapa */}
          <Reveal className="lg:col-span-7" delay={0.12} y={34}>
            <div className="relative h-[22rem] overflow-hidden rounded-[1.5rem] border border-graphite/[0.08] shadow-card sm:h-[28rem] lg:h-full lg:min-h-[26rem]">
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-soft-pulse bg-champagne-dark/40"
              />
              <iframe
                src={embedUrl}
                title={`Mapa de ${venue.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="relative h-full w-full border-0 grayscale-[0.25] transition-all duration-700 ease-luxe hover:grayscale-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
