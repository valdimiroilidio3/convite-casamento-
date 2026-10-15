'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CalendarPlus,
  CheckCircle2,
  Heart,
  Loader2,
  MapPin,
  Minus,
  Plus,
  UserPlus,
  XCircle,
} from 'lucide-react';
import { wedding } from '@/data/wedding';
import { isFirebaseConfigured } from '@/lib/firebase-flags';
import {
  cn,
  downloadIcs,
  googleCalendarUrl,
  icsFilename,
  type CalendarEvent,
} from '@/lib/utils';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

const ease = [0.16, 1, 0.3, 1] as const;

interface FormState {
  name: string;
  phone: string;
  email: string;
  attending: '' | 'yes' | 'no';
  companions: number;
  companionNames: string[];
  dietary: string;
  message: string;
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  attending: '',
  companions: 0,
  companionNames: [],
  dietary: '',
  message: '',
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 3) errors.name = 'Por favor, informe o seu nome completo.';
  const phoneDigits = form.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) errors.phone = 'Informe um telefone válido com DDD.';
  if (!form.attending) errors.attending = 'Escolha uma das opções acima.';
  if (form.attending === 'yes' && form.companions > 0) {
    const filled = form.companionNames.filter((n) => n.trim().length >= 3).length;
    if (filled < form.companions) {
      errors.companionNames = 'Informe o nome de cada acompanhante.';
    }
  }
  return errors;
}

/** Um dos destaques da página — formulário de RSVP com validação elegante. */
export default function RSVPForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { couple, date, venue, seo } = wedding;

  const calendarEvent: CalendarEvent = {
    title: `Casamento de ${couple.bride} & ${couple.groom}`,
    startIso: date.iso,
    details: `Cerimônia às ${venue.ceremonyTime} — nos vemos lá!`,
    location: `${venue.name} — ${venue.address}`,
    url: seo.baseUrl,
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setCompanions = (count: number) => {
    const safe = Math.max(0, Math.min(5, count));
    setForm((prev) => {
      const names = Array.from({ length: safe }, (_, i) => prev.companionNames[i] ?? '');
      return { ...prev, companions: safe, companionNames: names };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== 'idle') return; // evita envio duplicado

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Foca o primeiro campo com erro para acessibilidade
      const firstKey = Object.keys(found)[0];
      document.getElementById(`rsvp-${firstKey}`)?.focus();
      return;
    }

    setStatus('submitting');
    setServerError(null);

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      attending: form.attending === 'yes',
      companions: form.attending === 'yes' ? form.companions : 0,
      companionNames:
        form.attending === 'yes'
          ? form.companionNames.map((n) => n.trim()).filter(Boolean)
          : [],
      dietary: form.dietary.trim() || null,
      message: form.message.trim() || null,
    };

    try {
      if (isFirebaseConfigured) {
        // SDK do Firebase carregado apenas neste momento (code-splitting).
        const [{ db }, { addDoc, collection, serverTimestamp }] = await Promise.all([
          import('@/lib/firebase'),
          import('firebase/firestore'),
        ]);
        if (!db) throw new Error('Firestore não inicializado');
        await addDoc(collection(db, 'rsvps'), {
          ...payload,
          createdAt: serverTimestamp(),
          source: 'site',
        });
      } else {
        // Modo demonstração: persiste localmente até o Firebase ser configurado.
        const key = 'wedding-rsvps';
        const existing = JSON.parse(localStorage.getItem(key) ?? '[]');
        existing.push({ ...payload, createdAt: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));
        console.warn(
          '[RSVP] Firebase não configurado — dados salvos apenas neste navegador. Veja .env.example.'
        );
      }
      setStatus('success');
    } catch (error) {
      console.error('[RSVP] Falha ao salvar:', error);
      setStatus('idle');
      setServerError(
        'Não conseguimos registrar a sua confirmação agora. Tente novamente em instantes — ou fale conosco pelo WhatsApp.'
      );
    }
  };

  const attending = form.attending;

  return (
    <section id="rsvp" className="relative overflow-hidden bg-olive-deep py-24 sm:py-32 lg:py-40">
      {/* Textura de fundo discreta */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-olive/40 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 sm:px-10">
        <SectionHeading
          kicker="Confirmação de presença"
          title="A sua presença é o que torna este dia completo"
          subtitle={`Confirme até ${date.rsvpDeadlineDisplay}. Leva menos de dois minutos.`}
          light
        />

        <Reveal y={30}>
          <div className="mt-14 rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-7 shadow-soft backdrop-blur-sm sm:p-11">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease }}
                  className="py-6 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <motion.span
                    initial={{ scale: reduce ? 1 : 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold-light/40 bg-white/10"
                  >
                    {attending === 'yes' ? (
                      <Heart size={30} strokeWidth={1.2} className="text-gold-light" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 size={30} strokeWidth={1.2} className="text-gold-light" aria-hidden="true" />
                    )}
                  </motion.span>

                  <h3 className="mt-8 font-serif text-[2rem] font-light leading-snug text-white sm:text-[2.5rem]">
                    {attending === 'yes'
                      ? `Que alegria, ${form.name.split(' ')[0]}!`
                      : 'Obrigado por nos avisar'}
                  </h3>

                  <p className="mx-auto mt-5 max-w-md text-[0.98rem] leading-[1.85] text-white/75 text-pretty">
                    {attending === 'yes'
                      ? `A sua confirmação foi registrada com carinho. Guardamos um lugar para você em ${date.display} — prepare o coração.`
                      : `Sentiremos a sua falta, mas compreendemos. Obrigado por fazer parte da nossa história, mesmo de longe.`}
                  </p>

                  {attending === 'yes' ? (
                    <div className="mx-auto mt-10 flex max-w-md flex-col gap-3.5">
                      <button
                        type="button"
                        onClick={() =>
                          window.open(googleCalendarUrl(calendarEvent), '_blank', 'noopener,noreferrer')
                        }
                        className="btn-on-dark w-full"
                      >
                        <CalendarPlus size={16} strokeWidth={1.5} aria-hidden="true" />
                        Adicionar ao calendário
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          downloadIcs(calendarEvent, icsFilename(couple.bride, couple.groom))
                        }
                        className="btn-on-dark w-full border-white/15"
                      >
                        Baixar arquivo .ics
                      </button>
                      <a
                        href={venue.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-on-dark w-full border-white/15"
                      >
                        <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                        Ver rota no mapa
                      </a>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      setForm(initialState);
                      setStatus('idle');
                    }}
                    className="mt-9 text-[0.7rem] font-semibold uppercase tracking-wide2 text-white/45 underline-offset-4 transition-colors hover:text-white/80 hover:underline"
                  >
                    Enviar outra resposta
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                  aria-label="Formulário de confirmação de presença"
                >
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="mb-2.5 block text-[0.62rem] font-semibold uppercase tracking-luxe text-white/55"
                    >
                      Nome completo *
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Como devemos chamar você?"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                      className="field-input border-white/[0.12] bg-white/[0.07] text-white placeholder:text-white/35 hover:border-white/25 focus:border-gold-light/60 focus:bg-white/[0.12]"
                    />
                    {errors.name ? (
                      <p id="rsvp-name-error" role="alert" className="mt-2.5 text-[0.8rem] text-[#E8B4A4]">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  {/* Telefone + e-mail */}
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rsvp-phone"
                        className="mb-2.5 block text-[0.62rem] font-semibold uppercase tracking-luxe text-white/55"
                      >
                        Telefone *
                      </label>
                      <input
                        id="rsvp-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="(11) 99999-9999"
                        autoComplete="tel"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'rsvp-phone-error' : undefined}
                        className="field-input border-white/[0.12] bg-white/[0.07] text-white placeholder:text-white/35 hover:border-white/25 focus:border-gold-light/60 focus:bg-white/[0.12]"
                      />
                      {errors.phone ? (
                        <p id="rsvp-phone-error" role="alert" className="mt-2.5 text-[0.8rem] text-[#E8B4A4]">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="rsvp-email"
                        className="mb-2.5 block text-[0.62rem] font-semibold uppercase tracking-luxe text-white/55"
                      >
                        E-mail <span className="text-white/35">(opcional)</span>
                      </label>
                      <input
                        id="rsvp-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="voce@email.com"
                        autoComplete="email"
                        className="field-input border-white/[0.12] bg-white/[0.07] text-white placeholder:text-white/35 hover:border-white/25 focus:border-gold-light/60 focus:bg-white/[0.12]"
                      />
                    </div>
                  </div>

                  {/* Presença */}
                  <fieldset id="rsvp-attending">
                    <legend className="mb-3.5 block text-[0.62rem] font-semibold uppercase tracking-luxe text-white/55">
                      Você estará presente? *
                    </legend>
                    <div className="grid gap-3.5 sm:grid-cols-2" role="radiogroup">
                      {[
                        { value: 'yes', label: 'Sim, estaremos presentes', icon: Heart },
                        { value: 'no', label: 'Não poderemos comparecer', icon: XCircle },
                      ].map((option) => {
                        const selected = form.attending === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            id={`rsvp-attending-${option.value}`}
                            role="radio"
                            aria-checked={selected}
                            onClick={() => update('attending', option.value as FormState['attending'])}
                            className={cn(
                              'flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left text-[0.9rem] transition-all duration-500 ease-luxe',
                              selected
                                ? 'border-gold-light/70 bg-white/[0.12] text-white shadow-card'
                                : 'border-white/[0.12] bg-white/[0.05] text-white/70 hover:border-white/30 hover:bg-white/[0.09]'
                            )}
                          >
                            <option.icon
                              size={17}
                              strokeWidth={1.5}
                              aria-hidden="true"
                              className={selected ? 'text-gold-light' : 'text-white/45'}
                            />
                            {option.label}
                            <span
                              aria-hidden="true"
                              className={cn(
                                'ml-auto h-4 w-4 rounded-full border transition-all duration-300',
                                selected ? 'border-gold-light bg-gold-light/90' : 'border-white/30'
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                    {errors.attending ? (
                      <p role="alert" className="mt-2.5 text-[0.8rem] text-[#E8B4A4]">
                        {errors.attending}
                      </p>
                    ) : null}
                  </fieldset>

                  {/* Acompanhantes */}
                  <AnimatePresence initial={false}>
                    {form.attending === 'yes' ? (
                      <motion.div
                        key="companions"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: reduce ? 0.15 : 0.5, ease }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="text-[0.62rem] font-semibold uppercase tracking-luxe text-white/55">
                                Número de acompanhantes
                              </p>
                              <p className="mt-2 text-[0.85rem] text-white/55">
                                Quantas pessoas virão com você (máx. 5)?
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => setCompanions(form.companions - 1)}
                                aria-label="Remover acompanhante"
                                disabled={form.companions === 0}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-white/40 hover:bg-white/10 active:scale-95 disabled:opacity-30"
                              >
                                <Minus size={15} strokeWidth={1.6} aria-hidden="true" />
                              </button>
                              <span className="w-8 text-center font-serif text-2xl font-light text-white tabular-nums">
                                {form.companions}
                              </span>
                              <button
                                type="button"
                                onClick={() => setCompanions(form.companions + 1)}
                                aria-label="Adicionar acompanhante"
                                disabled={form.companions >= 5}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all hover:border-white/40 hover:bg-white/10 active:scale-95 disabled:opacity-30"
                              >
                                <Plus size={15} strokeWidth={1.6} aria-hidden="true" />
                              </button>
                            </div>
                          </div>

                          {form.companions > 0 ? (
                            <div className="mt-6 space-y-3.5">
                              {form.companionNames.map((name, index) => (
                                <div key={index}>
                                  <label
                                    htmlFor={`rsvp-companion-${index}`}
                                    className="mb-2 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-wide2 text-white/50"
                                  >
                                    <UserPlus size={12} strokeWidth={1.6} aria-hidden="true" />
                                    Acompanhante {index + 1}
                                  </label>
                                  <input
                                    id={`rsvp-companion-${index}`}
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                      const next = [...form.companionNames];
                                      next[index] = e.target.value;
                                      update('companionNames', next);
                                    }}
                                    placeholder="Nome completo"
                                    className="field-input border-white/[0.12] bg-white/[0.07] text-white placeholder:text-white/35 hover:border-white/25 focus:border-gold-light/60 focus:bg-white/[0.12]"
                                  />
                                </div>
                              ))}
                              {errors.companionNames ? (
                                <p role="alert" className="text-[0.8rem] text-[#E8B4A4]">
                                  {errors.companionNames}
                                </p>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Observações + mensagem */}
                  <div className="grid gap-8">
                    <div>
                      <label
                        htmlFor="rsvp-dietary"
                        className="mb-2.5 block text-[0.62rem] font-semibold uppercase tracking-luxe text-white/55"
                      >
                        Restrições alimentares <span className="text-white/35">(opcional)</span>
                      </label>
                      <input
                        id="rsvp-dietary"
                        type="text"
                        value={form.dietary}
                        onChange={(e) => update('dietary', e.target.value)}
                        placeholder="Ex.: vegetariano, alergia a frutos do mar…"
                        className="field-input border-white/[0.12] bg-white/[0.07] text-white placeholder:text-white/35 hover:border-white/25 focus:border-gold-light/60 focus:bg-white/[0.12]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rsvp-message"
                        className="mb-2.5 block text-[0.62rem] font-semibold uppercase tracking-luxe text-white/55"
                      >
                        Uma mensagem para os noivos <span className="text-white/35">(opcional)</span>
                      </label>
                      <textarea
                        id="rsvp-message"
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        rows={4}
                        placeholder="Deixe um recado, uma lembrança ou um voto…"
                        className="field-input resize-none border-white/[0.12] bg-white/[0.07] text-white placeholder:text-white/35 hover:border-white/25 focus:border-gold-light/60 focus:bg-white/[0.12]"
                      />
                    </div>
                  </div>

                  {/* Erro do servidor */}
                  {serverError ? (
                    <p
                      role="alert"
                      className="rounded-xl border border-[#E8B4A4]/30 bg-[#E8B4A4]/10 px-5 py-4 text-[0.88rem] leading-relaxed text-[#F2CDBF]"
                    >
                      {serverError}
                    </p>
                  ) : null}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={cn(
                        'btn-primary w-full sm:w-auto sm:min-w-[17rem]',
                        status === 'submitting' && 'cursor-wait opacity-70'
                      )}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={16} strokeWidth={1.8} className="animate-spin" aria-hidden="true" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          <Heart size={16} strokeWidth={1.6} aria-hidden="true" />
                          Confirmar presença
                        </>
                      )}
                    </button>

                    {!mounted || isFirebaseConfigured ? null : (
                      <p className="mt-4 text-[0.72rem] leading-relaxed text-white/40">
                        Modo demonstração: configure o Firebase (.env.example) para receber as
                        confirmações no Firestore.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
