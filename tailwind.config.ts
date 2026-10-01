import type { Config } from 'tailwindcss';

/**
 * Santosh Ghatpande · 5-Day Music Therapy Practitioner Challenge.
 *
 * The Anahat logo palette: white environment, slate teal structure, oxblood
 * accent, saffron and violet spark. Mirrors the :root block in globals.css and
 * the C object in app/_landing/shared.tsx; change all three together.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: '#FFFFFF', alt: '#F8F5F5' },
        ink: { DEFAULT: '#304443', soft: '#5E6D6C', deep: '#304443' },
        gold: {
          DEFAULT: '#FD9309',
          pale: '#F4F0F0',
          wash: '#FFF4E6',
          mid: '#FD9309',
          deep: '#4A0008',
          ink: '#4A0008',
          cta: '#FD9309',
          'on-cta': '#4A0008',
        },
        violet: '#83007D',
        coral: { DEFAULT: '#FD9309', bed: '#F5EBF5', ink: '#83007D' },
        line: { DEFAULT: '#E6E9E8', strong: '#D1D6D6' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { pill: '999px' },
      boxShadow: {
        /* Layered and tinted toward the ink, never a flat grey (C4). */
        soft: '0 4px 20px -10px rgba(48,68,67,0.14)',
        card: '0 18px 44px -26px rgba(48,68,67,0.26)',
        lift: '0 2px 0 0 rgba(253,147,9,0.30), 0 22px 42px -22px rgba(48,68,67,0.34)',
      },
    },
  },
  plugins: [],
};

export default config;
