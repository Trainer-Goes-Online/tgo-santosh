'use client';

/**
 * Section 9 · the value stack.
 *
 * Four things that sum to a price, so the shape is accumulation. Two rules
 * decide the treatment:
 *
 *  1. The value is shown PER ITEM, never as one lump. A lump is a claim, a
 *     line-item is a contract.
 *  2. The challenge itself dominates (₹3,500 of the ₹6,291, and the only LIVE
 *     one), so it is lifted out of the grid and given the lead card. The layout
 *     says which one matters before the copy does.
 *
 * This is the FIRST of the page's two accumulation beats. The second is the
 * closing recap, which is a ruled ledger: the two are deliberately different
 * forms so the recap reads as a summing-up rather than as a repeat.
 *
 * ⚠️ NO COVER ART EXISTS for the challenge or the three resources, so these are
 * typographic cards carrying an ordinal, an icon and a value rather than
 * mock-up shots. When covers land they slot in above each title at a single
 * shared ratio, and the grid handles them without any other change. Giving
 * them different ratios is what tiles four cards at four heights.
 */
import type { Icon } from '@phosphor-icons/react';
import {
  Broadcast,
  CheckCircle,
  Lightning,
  MusicNotes,
  Playlist,
  SunHorizon,
  VideoCamera,
} from '@phosphor-icons/react/dist/ssr';

import { legoBrick, legoDelay } from './lego-style';
import { C, SectionEyebrow } from './shared';

const LEAD = {
  n: '01',
  icon: Broadcast,
  title: '5-Day Live Music Therapy Practitioner Challenge',
  value: '(₹3,500 Value)',
  body: 'Experience five live, experiential sessions designed to help you understand how music therapy works, explore its real-life applications, practise guided therapeutic activities and learn how a personalised music therapy plan is thoughtfully put together.',
  tag: 'LIVE ACCESS · INCLUDED',
};

const BONUSES: { n: string; title: string; icon: Icon; value: string; body: string }[] = [
  {
    n: '02',
    title: '5 Curated Musical Tracks for Positivity',
    icon: Playlist,
    value: '(₹997 Value)',
    body: 'A ready-to-use collection of 5 carefully curated music tracks designed to help you experience how music can be used more intentionally for positivity and wellbeing in everyday life.',
  },
  {
    n: '03',
    title: 'Daily Musical Routine Plan',
    icon: SunHorizon,
    value: '(₹797 Value)',
    body: 'A simple daily guide to help you understand when and how to use music more purposefully across your day, so you can begin applying what you learn beyond the live sessions.',
  },
  {
    n: '04',
    title: 'Music Therapy Monetisation Blueprint',
    icon: MusicNotes,
    value: '(₹997 Value)',
    body: 'A practical roadmap to explore music therapy as a second career, additional income stream or meaningful post-retirement practice.',
  },
];

const TAG = 'INSTANT ACCESS · INCLUDED';

/* A bed, not a bare glyph: at this size an unbedded icon reads as debris next
   to a 26px ordinal. Gold-pale is the page's established icon bed. */
function IconBed({ icon: Glyph, size = 'md' }: { icon: Icon; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-14 w-14' : 'h-11 w-11';
  const glyph = size === 'lg' ? 'h-7 w-7' : 'h-5 w-5';
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl ${box}`}
      style={{ background: C.goldPale, border: `1px solid ${C.line}` }}
      aria-hidden="true"
    >
      <Glyph weight="duotone" className={glyph} style={{ color: C.goldInk }} />
    </span>
  );
}

function AccessTag({ text, icon }: { text: string; icon: 'live' | 'instant' }) {
  const Glyph = icon === 'live' ? VideoCamera : Lightning;
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
      style={{ background: C.canvasAlt, border: `1px solid ${C.line}`, color: C.inkSoft }}
    >
      <Glyph weight="fill" className="h-3 w-3" style={{ color: C.goldInk }} />
      {text}
      <CheckCircle weight="fill" className="h-3 w-3" style={{ color: C.coralInk }} />
    </span>
  );
}

export default function Toolkit() {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvasAlt }}>
      <div className="mx-auto max-w-[820px] text-center">
        <div className="mb-5 flex justify-center">
          <SectionEyebrow text="GET INSTANT ACCESS TO" />
        </div>
        <h2
          className="font-display text-[clamp(32px,5vw,53px)] font-semibold leading-[1.1]"
          style={{ color: C.ink, textWrap: 'balance' } as React.CSSProperties}
        >
          Your 5-Day Music Therapy Practitioner Challenge &amp;{' '}
          <span className="kz-accent">Music Therapy Starter Toolkit</span>
        </h2>
      </div>

      <div className="mx-auto mt-14 max-w-[1080px]">
        {/* ── the lead item ─────────────────────────────────────────────── */}
        <article
          data-lego=""
          className="lego-hover-soft rounded-[28px] p-8 sm:p-10"
          style={{
            ...legoDelay(0, 90),
            background: `linear-gradient(160deg, ${C.goldWash} 0%, ${C.canvas} 62%)`,
            border: `1px solid ${C.lineStrong}`,
            boxShadow: '0 24px 54px -32px rgba(48,68,67,0.3)',
          }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="flex shrink-0 flex-col items-start gap-4">
              <span
                className="font-display text-[50px] font-semibold leading-none"
                style={{ color: C.goldDeep }}
              >
                {LEAD.n}
              </span>
              <IconBed icon={LEAD.icon} size="lg" />
            </div>
            <div className="min-w-0 flex-1">
              <h3
                className="font-display text-[28px] font-semibold leading-snug sm:text-[31px]"
                style={{ color: C.ink }}
              >
                {LEAD.title}
              </h3>
              <p
                className="mt-1.5 font-display text-[21px] font-semibold"
                style={{ color: C.goldDeep }}
              >
                {LEAD.value}
              </p>
              <p
                className="mt-3.5 max-w-[620px] text-[15px] leading-relaxed"
                style={{ color: C.inkSoft }}
              >
                {LEAD.body}
              </p>
              <div className="mt-6">
                <AccessTag text={LEAD.tag} icon="live" />
              </div>
            </div>
          </div>
        </article>

        {/* ── the three resources ──────────────────────────────────────────
            Three into two columns leaves one orphan at sm. It spans the full
            row but is width-capped and centred, so it reads as one normal card
            rather than a stranded left-aligned one; the width mirrors the
            gap-5 (20px) track maths. At lg the three tile cleanly. */}
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BONUSES.map((b, i) => {
            const isOrphan = i === BONUSES.length - 1 && BONUSES.length % 2 === 1;
            return (
              <li
                key={b.n}
                data-lego=""
                className={`lego-hover flex flex-col rounded-3xl p-7 ${
                  isOrphan
                    ? 'sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-10px)] lg:col-span-1 lg:max-w-none'
                    : ''
                }`}
                style={{
                  ...legoBrick(i + 1, 80),
                  background: C.canvas,
                  border: `1px solid ${C.line}`,
                }}
              >
                {/* Cover art, when it exists, goes here: above this row, at the
                    same ratio for all three. */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <IconBed icon={b.icon} />
                    <span
                      className="font-display text-[30px] font-semibold leading-none"
                      style={{ color: C.goldDeep }}
                    >
                      {b.n}
                    </span>
                  </div>
                  <span
                    className="font-display text-[18px] font-semibold"
                    style={{ color: C.goldDeep }}
                  >
                    {b.value}
                  </span>
                </div>
                <h3
                  className="mt-4 font-display text-[22px] font-semibold leading-snug"
                  style={{ color: C.ink }}
                >
                  {b.title}
                </h3>
                <p
                  className="mt-2.5 flex-1 text-[14px] leading-relaxed"
                  style={{ color: C.inkSoft }}
                >
                  {b.body}
                </p>
                <div className="mt-6">
                  <AccessTag text={TAG} icon="instant" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
