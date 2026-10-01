import type { Metadata, Viewport } from 'next';
import { Crimson_Pro, Manrope } from 'next/font/google';

import Analytics from '@/components/Analytics';
import MetaPixel from '@/components/MetaPixel';
import { asset } from './_landing/asset-version';
import LegoObserver from './_landing/lego';
import { BRAND, PRICE, PRODUCT_NAME, SESSION_TIMES, START_DATE } from './_landing/offer';
import './globals.css';

/* Both faces are variable-only, so neither takes a `weight` array: next/font
   rejects one for a variable family. */
const crimson = Crimson_Pro({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const TITLE = `${PRODUCT_NAME} | ${BRAND}`;
const DESCRIPTION = `A live, expert-led, 5-day music therapy challenge that combines music-and-brain science, guided therapeutic activities, real-life applications and personalised plan-building. Starts ${START_DATE}, ${SESSION_TIMES}, live on Zoom, for ${PRICE}.`;

/**
 * The live origin.
 *
 * ⚠️ NO LAUNCH DOMAIN HAS BEEN SUPPLIED FOR THIS PROJECT, so the fallback below
 * is localhost rather than an invented host. Set NEXT_PUBLIC_SITE_URL before
 * deploying, or every share link and relative OG asset resolves against
 * localhost and a link pasted into WhatsApp previews as a dead local address.
 *
 * This is the ONE origin literal in the codebase. lib/checkout-config.ts reads
 * the same env var and deliberately has no fallback of its own.
 *
 * Deliberately defensive, because metadataBase is evaluated at BUILD time on
 * every route including the generated /_not-found, so a bad value here does not
 * degrade the page, it fails the deploy. `??` does NOT catch an empty string,
 * and Vercel defines a key with a blank value when it is added without one,
 * which gives new URL('') and ERR_INVALID_URL.
 */
const FALLBACK_ORIGIN = 'http://localhost:3000';

function resolveSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (!raw) return FALLBACK_ORIGIN;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_ORIGIN;
  }
}

const SITE_URL = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: BRAND,
    images: [{ url: asset('/brand/anahat-square.png'), width: 512, height: 512, alt: BRAND }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    images: [asset('/brand/anahat-square.png')],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /* Matches the announcement rail at the top of the page. */
  themeColor: '#4A0008',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${crimson.variable} ${manrope.variable}`}>
      <body>
        {/* Marks the document as JS-capable BEFORE first paint, so the CSS
            scroll reveals only hide content when JS is there to reveal it.
            No-JS users and crawlers see everything, and there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('bw-js')",
          }}
        />
        {/* One set of observers for the whole document, mounted here rather
            than per-section. Renders nothing. */}
        <LegoObserver />
        <MetaPixel />
        {/* GA4 + Clarity, from env. Renders nothing until the ids are set.
            Without this every browser-side GA4 call is a silent no-op and the
            webhook reports purchases with no funnel above them. */}
        <Analytics />
        {children}
      </body>
    </html>
  );
}
