'use client';

/**
 * The closing half of the page: the guide, the certification pathway, the
 * decision, the recap and the colophon.
 *
 * COPY IS VERBATIM. One thing in the source is rendered as written and flagged
 * rather than quietly corrected: see the note on TwoOptions (a bracketed
 * button label).
 */
import type { Icon } from '@phosphor-icons/react';
import {
  ArrowRight,
  Certificate,
  Check,
  Minus,
  Plus,
  Quotes,
  SealCheck,
  Trophy,
  X,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import SiteFooter from '@/components/SiteFooter';

import { asset } from './asset-version';
import { legoDelay } from './lego-style';
import {
  CHECKOUT_HREF,
  CTA_LABEL,
  CTA_LABEL_OPTION,
  CTA_NOTE,
  PRICE,
  PRODUCT_NAME,
  SESSION_TIMES,
  START_DATE,
} from './offer';
import { C, CtaNote, MediaPlaceholder, PrimaryCTA, SectionHeading } from './shared';

/* ══ 10 · Meet your guide ══════════════════════════════════════════════════
 *
 * NO COMPONENT. This one is prose and stays prose.
 *
 * A founder's story has no inherent structure, no sequence, no contrast, no
 * set, and forcing one onto it (a fake timeline, three "pillar" cards cut out
 * of his paragraphs) is the design equivalent of inventing a claim. So this is
 * clean, well-set type on a capped measure, with ONE object in it: the
 * pull-quote, which is the copy's own line and editorial scaffolding rather
 * than a manufactured structure.
 *
 * ONE portrait of Santosh beside the text, then a full-width press slider
 * under it (the same pattern as tgo-rupali's certificate marquee).
 */
const PORTRAIT = '/brand/santosh-portrait.webp';

const PRESS = [
  {
    src: '/press/feature-page-1.webp',
    w: 840,
    h: 1016,
    alt: 'Magazine feature, page 1: Anahat Music Therapy, Bringing a Scientific Approach to Music-Based Well-Being',
  },
  {
    src: '/press/feature-page-2.webp',
    w: 852,
    h: 1006,
    alt: 'Magazine feature, page 2: Anahat Music Therapy',
  },
  {
    src: '/press/sakal-pune.webp',
    w: 900,
    h: 1506,
    alt: 'Sakal newspaper, Pune, 21 March 2026: feature on Santosh Ghatpande and Anahat Music Therapy',
  },
];

// Three items are narrower than a wide screen, so one loop copy repeats the set.
const PRESS_LOOP = [...PRESS, ...PRESS, ...PRESS];

function PressSlider() {
  const [open, setOpen] = useState<(typeof PRESS)[number] | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <div
        className="kz-rail -mx-4 mt-14 py-4 sm:mt-16"
        data-playing={open ? 'true' : 'false'}
        role="region"
        aria-label="Santosh and Anahat Music Therapy in the press"
      >
        {/* Spacing is margin, not gap, so the -50% loop lands exactly on the copy. */}
        <div className="kz-rail-track" style={{ gap: 0, animationDuration: '110s' }}>
          {[0, 1].map((copy) =>
            PRESS_LOOP.map((p, i) => (
              <button
                key={`${copy}-${i}`}
                type="button"
                onClick={() => setOpen(p)}
                aria-hidden={copy === 1 || i >= PRESS.length ? true : undefined}
                tabIndex={copy === 1 || i >= PRESS.length ? -1 : undefined}
                aria-label={`Open: ${p.alt}`}
                className="mr-4 shrink-0 cursor-zoom-in overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 sm:mr-6"
                style={{
                  background: C.canvas,
                  border: `1px solid ${C.line}`,
                  boxShadow: '0 22px 44px -28px rgba(48,68,67,0.4)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(p.src)}
                  alt=""
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-auto sm:h-[360px]"
                />
              </button>
            )),
          )}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(48,68,67,0.9)' }}
          onClick={() => setOpen(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(open.src)}
            alt={open.alt}
            className="max-h-[92vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            autoFocus
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full"
            style={{ background: C.canvas }}
          >
            <X weight="bold" className="h-5 w-5" style={{ color: C.ink }} />
          </button>
        </div>
      )}
    </>
  );
}

/* One slot. Renders the real image when a path exists and a reserved box at the
   same ratio when it does not, so the two states are never different sizes. */
function GuideShot({
  src,
  ratio,
  label,
  alt,
}: {
  src: string | null;
  ratio: string;
  label: string;
  alt: string;
}) {
  if (src) {
    return (
      <div
        className="overflow-hidden rounded-3xl"
        style={{ border: `1px solid ${C.line}`, background: C.canvas }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ aspectRatio: ratio }}
          loading="lazy"
        />
      </div>
    );
  }
  return <MediaPlaceholder ratio={ratio} label={label} className="rounded-3xl" />;
}

function Guide() {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvas }}>
      <SectionHeading eyebrow="MEET YOUR GUIDE">
        Meet the Man Behind{' '}
        <span className="kz-accent">Anahat Music Therapy</span>
      </SectionHeading>

      <div className="mx-auto mt-12 max-w-[1060px] lg:grid lg:grid-cols-[0.8fr_1fr] lg:items-start lg:gap-12">
        <div className="mb-10 lg:mb-0">
          <GuideShot
            src={asset(PORTRAIT)}
            ratio="3 / 4"
            label="Portrait of Santosh"
            alt="Santosh Ghatpande, founder of Anahat Music Therapy"
          />
        </div>

        <div>
          {/* Left-aligned at every width even though the masthead is centred:
              centred paragraphs of this length are hard work to read. */}
          <div className="space-y-4 text-[16px] leading-[1.75]" style={{ color: C.inkSoft }}>
            <p>
              Santosh Ghatpande is a music therapist, lifelong Hindustani
              classical music practitioner, Certified Life Coach, NLP
              Practitioner and founder of Anahat Music Therapy. After more than
              20 years in the corporate world, including senior leadership
              roles, he chose to leave his corporate career in 2021 and dedicate
              himself fully to understanding, practising and teaching the
              therapeutic application of music.
            </p>
            <p>
              What began with his own curiosity about how music influences the
              mind and body has today grown into 4,000+ people trained in music
              therapy, 8,500+ individual music therapy cases handled &amp;
              documented and 2,500+ workshops conducted. His work has also taken
              music therapy to platforms including the International Yoga
              Festival, Intelligence Bureau Delhi and IIT-BHU.
            </p>
            <p>
              In 2026, Anahat Music Therapy was selected by SiliconIndia as a
              Top Music Therapy Service Provider in India.
            </p>
          </div>

          {/* The one object in the section. A quotation mark set in the display
              face, a saffron hairline, and the line itself in italic serif: the
              page's editorial voice, not a coloured box. */}
          <figure
            data-lego=""
            className="relative mt-9 rounded-2xl px-7 py-8 sm:px-9"
            style={{
              background: C.canvasAlt,
              border: `1px solid ${C.line}`,
              borderLeft: `2px solid ${C.goldMid}`,
              boxShadow: '0 18px 40px -30px rgba(48,68,67,0.28)',
            }}
          >
            <Quotes
              weight="fill"
              aria-hidden
              className="absolute -top-3 left-6 h-7 w-7"
              style={{ color: C.goldMid }}
            />
            <blockquote
              className="font-display text-[clamp(21px,2.5vw,26px)] italic leading-[1.45]"
              style={{ color: C.ink }}
            >
              &ldquo;Music therapy has to be experienced, not merely
              studied.&rdquo;
            </blockquote>
          </figure>

          <p className="mt-7 text-[16px] leading-[1.75]" style={{ color: C.inkSoft }}>
            That belief is at the heart of the {PRODUCT_NAME}, where Santosh
            helps you go beyond simply loving music and begin understanding how
            it can be practically, thoughtfully and therapeutically applied.
          </p>
        </div>
      </div>

      <PressSlider />
    </section>
  );
}

/* ══ 11 · Certification and recognition ════════════════════════════════════
   Three credentials, each a title and a body. A SET, not a sequence: the third
   is an award the organisation holds rather than a step anyone takes, so they
   do not run in an order the reader follows. So it is a hairline-ruled ledger,
   which reads audited and accountable, and each row is marked by its own icon
   with NO ordinal: a number here would be counting something nobody counts,
   and the value stack two sections up is already this page's numbered ledger.

   It is deliberately NOT another icon-card grid, because the Experience
   section several screens up already is one.

   The closing note is the client's own qualifier and it is load-bearing: the
   certifications belong to the broader pathway, not to the 5-day challenge. It
   renders directly under the ledger, not tucked into a footnote, and the same
   statement is in the terms page. */
const CREDENTIALS: { title: string; icon: Icon; body: string }[] = [
  {
    title: 'Anahat Certificate of Completion',
    icon: Certificate,
    body: "Receive an Anahat completion certificate on successfully completing Santosh's full music therapy training programme.",
  },
  {
    title: 'National-Level HSSC Certification',
    icon: SealCheck,
    body: 'Eligible learners can also work towards a national-level HSSC certificate through the Healthcare Sector Skill Council pathway.',
  },
  {
    title: 'Recognised Industry Credibility',
    icon: Trophy,
    body: "Anahat Music Therapy was recognised by SiliconIndia as one of India's Top Music Therapy Service Providers for 2026, marking it among the leading organisations in the country working in the field of music therapy.",
  },
];

function Certification() {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvasAlt }}>
      <SectionHeading sub="This 5-day challenge is only the beginning. Santosh's full practitioner pathway is designed to help serious learners move towards structured training, recognised certification and greater professional credibility.">
        A Practitioner Journey Backed By{' '}
        <span className="kz-accent">Real Certification &amp; Recognition</span>
      </SectionHeading>

      {/* A 1px-gap grid, so the GAPS become the rules: a ruled ledger with no
          card boxes and no shadows. The background is the rule colour. */}
      <ul
        className="mx-auto mt-14 grid max-w-[1000px] gap-px overflow-hidden rounded-2xl"
        style={{ background: C.line, border: `1px solid ${C.line}` }}
      >
        {CREDENTIALS.map((p, i) => (
          <li
            key={p.title}
            data-lego=""
            className="lego-hover-sm flex items-start gap-5 px-6 py-7 sm:px-8"
            style={{ ...legoDelay(i, 70), background: C.canvas }}
          >
            <span
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: C.goldPale, border: `1px solid ${C.line}` }}
              aria-hidden="true"
            >
              <p.icon weight="duotone" className="h-5 w-5" style={{ color: C.goldInk }} />
            </span>
            <span className="min-w-0 flex-1">
              <span
                className="block font-display text-[22px] font-semibold leading-snug"
                style={{ color: C.ink }}
              >
                {p.title}
              </span>
              <span
                className="mt-2 block text-[14.5px] leading-relaxed"
                style={{ color: C.inkSoft }}
              >
                {p.body}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p
        className="mx-auto mt-6 max-w-[1000px] rounded-2xl px-6 py-5 text-[13.5px] leading-relaxed"
        style={{ background: C.canvas, border: `1px solid ${C.line}`, color: C.inkSoft }}
      >
        <strong style={{ color: C.ink }}>Please note:</strong> These
        certifications are part of Santosh&rsquo;s broader practitioner training
        pathway and are not awarded through the {PRODUCT_NAME} alone.
      </p>
    </section>
  );
}

/* ══ 12 · Two options ══════════════════════════════════════════════════════
   A decision with two sides, so it is argued with visual weight rather than
   with a red ✗ and a green ✓: Option 1 is set back (quiet surface, no border
   emphasis, muted type) and Option 2 is the lifted dark teal card that
   carries the click. The layout decides before the copy is read.

   ⚠️ FLAG FOR ATUL: the source writes the button as "[Take Action · ₹497 →]".
   The square brackets and the arrow are the copy's shorthand for "this is a
   button", so the label renders as "Take Action · ₹497" with the page's arrow
   token. If the brackets were meant literally, say so and they go back in. */
function TwoOptions() {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvas }}>
      <SectionHeading>
        Now You Have <span className="kz-accent">Two Options</span> From
        Here
      </SectionHeading>

      <div className="mx-auto mt-12 grid max-w-[940px] items-start gap-5 sm:grid-cols-2">
        {/* The one being set down. */}
        <div
          data-lego="x"
          className="rounded-3xl p-7 sm:p-8"
          style={{
            ['--lego-from' as string]: '-30px',
            background: C.canvasAlt,
            border: `1px solid ${C.line}`,
            opacity: 0.86,
          }}
        >
          <span
            className="lego-stud inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ background: C.canvas, color: C.inkSoft, border: `1px solid ${C.line}` }}
          >
            <Minus weight="bold" className="h-3 w-3" />
            OPTION 1
          </span>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
            Keep music as something you simply enjoy, and continue wondering
            whether your passion could ever become a practical skill, meaningful
            second career or additional source of income.
          </p>
        </div>

        {/* The one being picked up. */}
        <div
          data-lego="x"
          className="rounded-3xl p-7 sm:p-8"
          style={{
            ['--lego-from' as string]: '30px',
            ['--lego-d' as string]: '110ms',
            background: C.navyDeep,
            boxShadow: '0 26px 56px -28px rgba(48,68,67,0.6)',
          }}
        >
          <span
            className="lego-stud inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ border: '1px solid rgba(253,147,9,0.5)', color: C.gold }}
          >
            <Plus weight="bold" className="h-3 w-3" />
            OPTION 2
          </span>
          <p className="mt-5 text-[15px] leading-relaxed" style={{ color: C.onDark }}>
            Spend 5 days learning how music therapy actually works, experience
            its practical application live and take your first step towards
            using music more purposefully for yourself, others and a future
            practice.
          </p>

          <Link
            href={CHECKOUT_HREF}
            data-cta
            className="lego-press cta-shimmer group mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 font-body text-[15px] font-bold"
            style={{
              background: C.ctaGold,
              color: C.onCta,
              ['--shimmer' as string]: 'rgba(255,255,255,0.55)',
            }}
          >
            <span className="inline-flex items-center gap-2.5">
              {CTA_LABEL_OPTION}
              <ArrowRight
                weight="bold"
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══ 13 · Recap ════════════════════════════════════════════════════════════
 *
 * The premium peak. The last thing the reader touches before paying, so it is
 * the most finished object on the page: a layered frame with a saffron
 * flourish and ornament, a medallion seal, a hairline-ruled ledger with a value
 * on EVERY row (never one lump), and the value collapse dramatised: the ₹6,291
 * draws its own strike-through, then ₹497 pops in lit.
 *
 * It stays on the light page, so the peak is earned with craft and depth
 * rather than by turning the lights off.
 */
const RECAP: { what: string; value: number }[] = [
  { what: '5-Day Live Music Therapy Practitioner Challenge', value: 3500 },
  { what: '5 Curated Musical Tracks for Positivity', value: 997 },
  { what: 'Daily Musical Routine Plan', value: 797 },
  { what: 'Music Therapy Monetisation Blueprint', value: 997 },
];

/* SUMMED, never typed. A hard-coded total silently becomes wrong the moment an
   item is dropped or revalued, on the one beat of the page a reader actually
   does the arithmetic on. This sums to the ₹6,291 the source copy names. */
const RECAP_TOTAL = RECAP.reduce((n, r) => n + r.value, 0);
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

function Recap() {
  return (
    <section
      data-final
      className="px-4 py-20 sm:py-28"
      style={{
        background: `radial-gradient(ellipse 68% 44% at 50% 0%, rgba(253,147,9,0.1), transparent 62%), ${C.canvasAlt}`,
      }}
    >
      <div data-lego="" className="kz-recap">
        <div className="kz-seal" aria-hidden>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <h2
          className="text-center font-display text-[clamp(30px,4.1vw,46px)] font-semibold leading-[1.1]"
          style={{ color: C.ink, textWrap: 'balance' } as React.CSSProperties}
        >
          Recap of Everything{' '}
          <span className="kz-accent">You&rsquo;ll Get</span>
        </h2>

        {/* Column headers in the page's spec voice: tracked uppercase. */}
        <div
          className="mt-10 flex items-center justify-between border-b pb-3 text-[10.5px] font-bold uppercase tracking-[0.2em]"
          style={{ borderColor: C.lineStrong, color: C.inkSoft }}
        >
          <span>INCLUDED</span>
          <span>VALUE</span>
        </div>

        <ul className="kz-ledger">
          {RECAP.map((r) => (
            <li key={r.what} className="flex items-center justify-between gap-5 py-4">
              <span className="flex min-w-0 items-start gap-3">
                <span
                  className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{ background: C.goldPale }}
                >
                  <Check weight="bold" className="h-2.5 w-2.5" style={{ color: C.goldInk }} />
                </span>
                <span className="text-[14.5px] leading-snug" style={{ color: C.ink }}>
                  {r.what}
                </span>
              </span>
              <span
                className="shrink-0 font-display text-[18px] font-semibold"
                style={{ color: C.inkSoft }}
              >
                {inr(r.value)}
              </span>
            </li>
          ))}
        </ul>

        {/* The value moment. Total value is struck as it arrives; the price
            you actually pay lands lit, a beat later. */}
        <div
          className="mt-3 flex items-center justify-between gap-5 border-t py-5"
          style={{ borderColor: C.lineStrong }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: C.inkSoft }}
          >
            TOTAL VALUE
          </span>
          <span
            className="kz-strike font-display text-[25px] font-semibold"
            style={{ color: C.inkSoft }}
          >
            {inr(RECAP_TOTAL)}
          </span>
        </div>

        <div
          className="mt-2 rounded-2xl px-6 py-8 text-center"
          style={{ background: C.goldWash, border: `1px solid ${C.lineStrong}` }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: C.goldInk }}
          >
            GET EVERYTHING TODAY FOR
          </p>
          <p className="kz-price kz-lit mt-3 font-display text-[64px] font-semibold leading-none">
            {PRICE}
          </p>
          <p className="mt-2 text-[13px]" style={{ color: C.inkSoft }}>
            (One-time payment)
          </p>
        </div>

        <div className="mx-auto mt-9 flex max-w-[560px] flex-col items-center">
          <PrimaryCTA label={CTA_LABEL} tone="navy" full />
          <CtaNote text={CTA_NOTE} />
        </div>
      </div>
    </section>
  );
}

/* ══ 14 · Colophon ════════════════════════════════════════════════════════
   The disclaimer lives in the shared SiteFooter, so it appears on the checkout
   and the thank-you page too rather than only here, in the client's exact
   wording. This block adds the cohort line above it. */
function Colophon() {
  return (
    <SiteFooter>
      <p className="mx-auto mb-8 max-w-[640px] text-[13px]" style={{ color: C.onDarkMute }}>
        <span className="inline-block">
          Starts {START_DATE} · {SESSION_TIMES} · Live on Zoom
        </span>
        <span aria-hidden className="hidden sm:inline">
          {' · '}
        </span>
        <span className="block sm:inline">{PRICE}, 100% money-back guarantee</span>
      </p>
    </SiteFooter>
  );
}

export default function Close() {
  return (
    <>
      <Guide />
      <Certification />
      <TwoOptions />
      <Recap />
      <Colophon />
    </>
  );
}
