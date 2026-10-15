import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        champagne: {
          DEFAULT: '#F7F2EA',
          light: '#FCFAF6',
          dark: '#EDE4D6',
        },
        olive: {
          DEFAULT: '#4C5C48',
          deep: '#3A4637',
          soft: '#7E8D78',
          mist: '#DCE2D6',
        },
        gold: {
          DEFAULT: '#B08D57',
          light: '#C9AE7D',
          pale: '#E4D5B7',
        },
        graphite: {
          DEFAULT: '#2B302B',
          soft: '#596157',
          faint: '#8B928A',
        },
        terracotta: {
          DEFAULT: '#A85B44',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      letterSpacing: {
        luxe: '0.32em',
        wide2: '0.18em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(43, 48, 43, 0.04), 0 16px 44px -18px rgba(43, 48, 43, 0.12)',
        soft: '0 24px 70px -24px rgba(43, 48, 43, 0.18)',
        btn: '0 12px 32px -12px rgba(74, 92, 72, 0.45)',
      },
      keyframes: {
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'soft-pulse': 'soft-pulse 3.2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
