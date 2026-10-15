import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { wedding } from '@/data/wedding';
import './globals.css';

/* Fontes auto-hospedadas (woff2 em app/fonts) — sem chamadas externas. */
const manrope = localFont({
  src: [{ path: './fonts/manrope-latin-wght-normal.woff2', weight: '200 800', style: 'normal' }],
  display: 'swap',
  variable: '--font-manrope',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
});

const cormorant = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin-wght-normal.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-wght-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-cormorant',
  fallback: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
});

const { couple, date, venue, seo } = wedding;
const siteTitle = `${couple.bride} & ${couple.groom} — ${date.display}`;
const siteDescription = seo.description;

export const metadata: Metadata = {
  metadataBase: new URL(seo.baseUrl),
  title: {
    default: siteTitle,
    template: `%s — ${couple.bride} & ${couple.groom}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  keywords: [
    'casamento',
    `${couple.bride} e ${couple.groom}`,
    'convite de casamento',
    'confirmação de presença',
    venue.name,
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: seo.baseUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: seo.ogImage,
        width: 1376,
        height: 768,
        alt: `${couple.bride} & ${couple.groom} — ${date.display}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F2EA',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-champagne text-graphite">
        {children}
      </body>
    </html>
  );
}
