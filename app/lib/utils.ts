/** Utilitários gerais do site — sem dependências externas. */

/** Concatena classes condicionais de forma simples. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Fallback silencioso quando o navegador não suporta o recurso. */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/* ---------------------------------------------------------------------------
   Calendário — Google Calendar e arquivo .ics (Apple Calendar / Outlook)
--------------------------------------------------------------------------- */

const CALENDAR_DURATION_MS = 3 * 60 * 60 * 1000; // 3 horas de evento

/** Converte Date -> formato "20270515T193000Z" (UTC) do Google/ICS. */
function toUtcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function toIcsLocalStamp(date: Date): string {
  // Forma flutuante (sem Z) mantém o horário local do casal no .ics
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    date.getFullYear() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

export interface CalendarEvent {
  title: string;
  startIso: string;
  details: string;
  location: string;
  url: string;
}

export function googleCalendarUrl(event: CalendarEvent): string {
  const start = new Date(event.startIso);
  const end = new Date(start.getTime() + CALENDAR_DURATION_MS);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: event.details,
    location: event.location,
    sprop: `website:${event.url}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(event: CalendarEvent): string {
  const start = new Date(event.startIso);
  const end = new Date(start.getTime() + CALENDAR_DURATION_MS);
  const stamp = toUtcStamp(new Date());
  const escape = (value: string) =>
    value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Casamento//Convite//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${stamp}@casamento`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsLocalStamp(start)}`,
    `DTEND:${toIcsLocalStamp(end)}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(event.details)}`,
    `LOCATION:${escape(event.location)}`,
    `URL:${event.url}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Lembrete: casamento amanhã',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcs(event: CalendarEvent, filename: string): void {
  if (!isBrowser()) return;
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Nome de arquivo amigável a partir dos nomes do casal. */
export function icsFilename(bride: string, groom: string): string {
  const slug = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  return `casamento-${slug(bride)}-${slug(groom)}.ics`;
}

/* ---------------------------------------------------------------------------
   Datas — contagem regressiva
--------------------------------------------------------------------------- */

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function getTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const diff = target - Date.now();
  if (Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    isPast: false,
  };
}
