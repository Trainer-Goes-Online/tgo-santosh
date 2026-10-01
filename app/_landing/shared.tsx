/**
 * Shared landing primitives: the palette, and the framer-free leaf components
 * used by BOTH the static hero and the lazily-hydrated below-the-fold chunk.
 *
 * Kept animation-runtime-free on purpose so it can be imported from a Server
 * Component without dragging anything into the initial bundle.
 *
 * The palette is the Anahat logo inside the Kaizen challenge rhythm. Role
 * names are the skin's (gold = the accent, coral = the spark, navy = the
 * structure) so every component reads the same; the values are the logo's:
 *
 *   white is the environment, slate teal is the structure, OXBLOOD is the one
 *   accent, and the saffron sun with its violet band partner is the spark.
 *
 * Every non-brand value (bands, beds, rules, inkSoft) is a supplied hex
 * composited at a stated percentage over white, never a new hue.
 */
import { ImageSquare } from '@phosphor-icons/react/dist/ssr';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';

import { CHECKOUT_HREF } from './offer';

export const C = {
  /* ── environment: the logo's own white, so the mark sits on the page with no box ── */
  canvas: '#FFFFFF',
  canvasAlt: '#F8F5F5', // oxblood at 4%
  navyDeep: '#304443', // slate teal: the colophon floor and the two dark cards

  /* ── ink ── */
  ink: '#304443', // slate teal. 10.3:1 on canvas
  inkSoft: '#5E6D6C', // slate teal at 78%. 5.4:1 on canvas, 5.0:1 on canvasAlt
  onDark: '#FFFFFF',
  onDarkMute: 'rgba(255,255,255,0.78)', // 6.9:1 on navyDeep

  /* ── the accent. gold* role names, oxblood and saffron values ──────────
     Saffron is 2.25:1 on white, so on light it is a FILL or a hairline, never
     type. Oxblood carries every accent that has to be read. */
  gold: '#FD9309', // saffron. Accent type ON navyDeep only (4.6:1)
  goldPale: '#F4F0F0', // oxblood at 6%. Icon beds, eyebrow beds
  goldWash: '#FFF4E6', // saffron at 10%. The two money moments only
  goldMid: '#FD9309', // saffron. Hairlines, flourishes, rules. Never a numeral
  goldDeep: '#4A0008', // oxblood. Headline highlight. 16.2:1
  goldInk: '#4A0008', // oxblood. Small text and eyebrows
  ctaGold: '#FD9309', // saffron pill fill
  onCta: '#4A0008', // the label on a saffron pill. 7.2:1

  /* ── the spark: the saffron sun dot, with the violet of the band as its ink ── */
  coral: '#FD9309', // fill only
  coralBed: '#F5EBF5', // violet at 8%
  coralInk: '#83007D', // violet. 9.3:1 on canvas, 8.0:1 on coralBed

  /* ── beds. Three, so the page reads as one palette ── */
  navyBed: '#ECEEEE', // slate teal at 9%

  /* ── rules ── */
  line: '#E6E9E8', // slate teal at 12%
  lineStrong: '#D1D6D6', // slate teal at 22%
} as const;

/* ══════════════════════════════════════════════════════════════════════════
 *  Eyebrow. ALWAYS uppercase, every section that has one.
 *
 *  Sections whose source copy supplies no eyebrow run without one rather than
 *  with an invented label: the copy is the client's, and a two-word kicker is
 *  still copy.
 * ═══════════════════════════════════════════════════════════════════════ */
export function SectionEyebrow({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em]"
      style={{ background: C.goldPale, color: C.goldInk }}
    >
      <span
        className="lego-pulse-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full"
        style={{
          background: C.coral,
          ['--dot-pulse' as string]: 'rgba(253,147,9,0.5)',
        }}
      />
      {text}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  Section masthead: eyebrow → display headline (one lit word) → deck.
 *  Capped measure on both, centred, ≤820px. (R1 / C13.)
 * ═══════════════════════════════════════════════════════════════════════ */
export function SectionHeading({
  eyebrow,
  children,
  sub,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[820px] px-1 text-center">
      {eyebrow && (
        <div className="mb-5 flex justify-center">
          <SectionEyebrow text={eyebrow} />
        </div>
      )}
      <h2
        className="font-display text-[clamp(32px,5vw,53px)] font-semibold leading-[1.1]"
        style={{ color: C.ink, textWrap: 'balance' } as React.CSSProperties}
      >
        {children}
      </h2>
      {sub && (
        <p
          className="mx-auto mt-5 max-w-[660px] text-[15.5px] leading-relaxed sm:text-[16.5px]"
          style={{ color: C.inkSoft }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  The primary CTA (R3).
 *
 *  One saturated pill, generous padding, a layered ink-tinted shadow, a slow
 *  shimmer with a long rest, and the price IN the label. `breathe` is the idle
 *  glow and belongs to exactly one instance per screen, never to two buttons
 *  the reader can see at the same time.
 *
 *  The fill and the LABEL colour are both tokens per tone: a saffron fill with
 *  a white label is 2.25:1, so the saffron pill is labelled in oxblood.
 * ═══════════════════════════════════════════════════════════════════════ */
export function PrimaryCTA({
  href = CHECKOUT_HREF,
  label,
  tone = 'navy',
  breathe = false,
  full = false,
}: {
  href?: string;
  label: string;
  /** navy = teal pill on the light page · gold and cream = on one of the two dark cards */
  tone?: 'navy' | 'gold' | 'cream';
  breathe?: boolean;
  full?: boolean;
}) {
  const skin =
    tone === 'gold'
      ? { background: C.ctaGold, color: C.onCta, shimmer: 'rgba(255,255,255,0.55)' }
      : tone === 'cream'
        ? { background: C.canvas, color: C.ink, shimmer: 'rgba(253,147,9,0.28)' }
        : { background: C.ink, color: C.canvas, shimmer: 'rgba(255,255,255,0.24)' };

  return (
    <Link
      href={href}
      data-cta
      className={`lego-press cta-shimmer group inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-full px-8 py-4 font-body text-[15.5px] font-bold ${
        breathe ? 'cta-breath' : ''
      } ${full ? 'w-full' : 'w-full sm:w-auto'}`}
      style={{
        background: skin.background,
        color: skin.color,
        boxShadow: '0 14px 30px -14px rgba(48,68,67,0.5)',
        ['--shimmer' as string]: skin.shimmer,
      }}
    >
      <span className="inline-flex items-center gap-2.5">
        {label}
        <ArrowRight
          weight="bold"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

/**
 * The reassurance line, welded tight under the button, never separated from
 * it, because the rush and the reassurance are one beat.
 */
export function CtaNote({ text, onDark = false }: { text: string; onDark?: boolean }) {
  return (
    <p
      className="mt-3.5 text-center text-[13.5px] font-medium"
      style={{ color: onDark ? C.onDarkMute : C.inkSoft }}
    >
      {text}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  Art: a supplied image, in the slot a MediaPlaceholder was holding.
 *
 *  Same API as MediaPlaceholder on purpose (ratio + className), so swapping one
 *  for the other never disturbs the surrounding layout.
 *
 *  `ratio` must match the asset's OWN aspect ratio. Every image on this page is
 *  a product mockup carrying text (guide titles, day names, the price seal), and
 *  object-cover in a mismatched box crops that text away. Match the ratio and
 *  nothing is ever cut.
 * ═══════════════════════════════════════════════════════════════════════ */
export function Art({
  src,
  alt,
  ratio = '1 / 1',
  className = '',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  MediaPlaceholder: a reserved slot for art that has not arrived yet.
 *
 *  Deliberately a designed object rather than a grey box: it holds the exact
 *  aspect ratio the real image will take, so nothing reflows when art lands,
 *  and it reads as "reserved" rather than as a failed image. Swap it for an
 *  <img> at the same ratio and no surrounding layout changes.
 *
 *  `label` says what belongs there, so whoever supplies the art knows what is
 *  being asked for without opening the file.
 * ═══════════════════════════════════════════════════════════════════════ */
export function MediaPlaceholder({
  ratio = '16 / 10',
  label,
  className = '',
}: {
  ratio?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl ${className}`}
      style={{
        aspectRatio: ratio,
        background: `repeating-linear-gradient(135deg, ${C.goldPale} 0px, ${C.goldPale} 10px, ${C.canvas} 10px, ${C.canvas} 20px)`,
        border: `1px dashed ${C.lineStrong}`,
      }}
      role="img"
      aria-label={`${label}, image to be supplied`}
    >
      <ImageSquare weight="duotone" className="h-6 w-6" style={{ color: C.goldInk }} />
      <span
        className="px-3 text-center text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ color: C.goldInk }}
      >
        {label}
      </span>
    </div>
  );
}
