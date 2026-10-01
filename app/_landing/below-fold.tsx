'use client';

/**
 * Everything below the hero. The BEAT numbers are the blueprint's; the order
 * they run in is the order below, which differs from the copy doc in exactly
 * one place and it is a structural rule, not an edit to the copy:
 *
 *  2.5 Video testimonials ........ ./proof   ← moved up, see the note below
 *   3  What you'll experience ..... this file
 *   4  Your 5-Day Schedule ........ this file  ← the signature beat
 *   5  Session timings + CTA ...... this file
 *   5b Who it is for .............. this file  ← did NOT move
 *   8  Why music therapy .......... this file
 *   9  Stack / what you get ....... ./toolkit
 *  10  Meet your guide ............ ./close
 *  11  Certification .............. ./close
 *  12  Two options ................ ./close
 *  13  Recap + final CTA .......... ./close  ← the premium peak
 *  14  Disclaimer + colophon ...... ./close
 *
 * COPY IS VERBATIM. Where the source wraps a sentence across several lines it
 * is joined back into one string; no wording, ordering or punctuation is
 * changed, and nothing is added.
 */
import {
  ArrowRight,
  Brain,
  CalendarBlank,
  CheckSquare,
  ClipboardText,
  Clock,
  Heartbeat,
  MusicNotes,
  UsersThree,
  VideoCamera,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import Close from './close';
import { legoBrick, legoDelay } from './lego-style';
import { domAnimation, LazyMotion } from './motion-lite';
import { CHECKOUT_HREF, CTA_LABEL, CTA_NOTE, SESSION_TIMES } from './offer';
import Proof from './proof';
import { C, SectionHeading } from './shared';
import Toolkit from './toolkit';

/* Three beds, rotated. Not seven: the palette has three colours, and a card
   grid that cycles a rainbow reads as decoration rather than as a set. */
const BEDS = [
  { bed: C.goldPale, fg: C.goldInk },
  { bed: C.coralBed, fg: C.coralInk },
  { bed: C.navyBed, fg: C.ink },
];

/* ══ 3 · Here's What You'll Experience In Just 5 Days ══════════════════════
   Six parallel capabilities, each with a title and a body. A set, not a
   sequence, so it is a grid of equal pieces and the ordering carries no
   meaning the reader has to follow. */
const EXPERIENCE = [
  {
    icon: VideoCamera,
    title: 'Live, Expert-Led Sessions',
    body: 'Join Santosh live on Zoom every day for guided learning, practical activities, real-life examples and interactive exercises you can actively participate in.',
  },
  {
    icon: MusicNotes,
    title: 'Experience Music Therapy In Practice',
    body: 'Go beyond theory through guided therapeutic activities using music and your own voice, so you can personally experience how different techniques are applied.',
  },
  {
    icon: Heartbeat,
    title: 'Explore Real-Life Applications',
    body: 'Understand how music therapy can be used to support areas like concentration, confidence, memory and emotional wellbeing, along with concerns such as diabetes, hypertension, hormonal imbalance, digestive and respiratory issues.',
  },
  {
    icon: Brain,
    title: 'Learn How To Think Like A Practitioner',
    body: 'Start understanding what to observe, what to consider and how different needs may require different therapeutic approaches, instead of using music randomly.',
  },
  {
    icon: ClipboardText,
    title: 'Understand How A Music Therapy Plan Is Built',
    body: 'See how different elements come together to create a more personalised music therapy plan, giving you a clearer picture of how the modality is actually practised.',
  },
  {
    icon: UsersThree,
    title: 'Learn With A Community Of Music Lovers',
    body: 'Be part of a community where you can participate, complete practical activities, share your learnings and explore music therapy alongside people on a similar journey.',
  },
];

function Experience() {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvas }}>
      <SectionHeading sub="Don't just learn about music therapy. Experience how it works, understand where it can be applied and start building the practical foundation to use it with greater purpose and confidence.">
        Here&apos;s What You&apos;ll Experience{' '}
        <span className="kz-accent">In Just 5 Days</span>
      </SectionHeading>

      {/* Six cards tile cleanly at both breakpoints (3 rows of 2, then 2 rows
          of 3), so there is no orphan to place. If the count ever changes to an
          odd number, the reference build's orphan maths in tgo-kaizan's
          Experience grid is what to copy. */}
      <ul className="mx-auto mt-14 grid max-w-[1120px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIENCE.map(({ icon: Icon, title, body }, idx) => {
          const skin = BEDS[idx % BEDS.length];
          return (
            <li
              key={title}
              data-lego=""
              className="lego-hover flex flex-col rounded-3xl p-7"
              style={{
                ...legoBrick(idx),
                /* This band and the card fill are the same value, so the fill
                   is not what makes this a card: the hairline draws the edge
                   and the ink-tinted shadow seats it. Without the shadow six
                   outlined boxes sit flat on the page. */
                background: C.canvas,
                border: `1px solid ${C.line}`,
                boxShadow: '0 18px 44px -26px rgba(48,68,67,0.26)',
                /* A 3px rule along the top edge ties the card to its bed
                   without letting colour take a large area. */
                borderTop: `3px solid ${skin.bed}`,
              }}
            >
              <span
                data-lego-stud=""
                className="lego-stud grid h-12 w-12 place-items-center rounded-2xl"
                style={{ ...legoBrick(idx), background: skin.bed }}
              >
                <Icon weight="duotone" className="h-6 w-6" style={{ color: skin.fg }} />
              </span>
              <h3
                className="mt-5 font-display text-[22px] font-semibold leading-snug"
                style={{ color: C.ink }}
              >
                {title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed" style={{ color: C.inkSoft }}>
                {body}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ══ 4 · Your 5-Day Schedule ═══════════════════════════════════════════════
   The signature beat, and the page's ONE heavy motion moment.

   Five days is a genuine sequence: each one builds on the last, so the
   structure is a spine with a filling rail rather than five cards in a row.
   The rail's progress is a single CSS variable written by a rAF-throttled
   scroll handler; nodes ignite as the fill reaches them. */
const DAYS = [
  {
    n: 'Day 01',
    title: 'Understand How Music Actually Affects The Brain',
    body: 'Learn the fundamentals of the music-brain connection + experience your first guided activity to understand why music can influence the way we think, feel and respond.',
  },
  {
    n: 'Day 02',
    title: 'Discover How Music Can Improve Everyday Life',
    body: 'Explore how music therapy can support areas like concentration, confidence, memory and emotional wellbeing + participate in practical activities you can experience for yourself.',
  },
  {
    n: 'Day 03',
    title: 'Explore Music Therapy For Real Health Concerns',
    body: 'Explore how music therapy can be used as a supportive approach for diabetes, hypertension, hormonal imbalance, digestive and respiratory concerns, anxiety and depression + learn through real-life applications and case examples.',
  },
  {
    n: 'Day 04',
    title: 'Learn To Use Music More Purposefully',
    body: 'Bring together the key principles of music, psychology and health + learn practical ways music and your own voice can be used more intentionally in everyday life.',
  },
  {
    n: 'Day 05',
    title: 'Build The Foundations Of A Music Therapy Plan',
    body: "Bring all five days together and understand how a personalised music therapy plan is thoughtfully structured based on an individual's needs, giving you your first glimpse into how a practitioner approaches real application.",
  },
];

/**
 * Scroll-linked progress for the spine.
 *
 * Writes `--tl-p` (0 → 1) straight onto the <ol> node, so the rail fills
 * without React re-rendering once per frame. The only React state is `active`,
 * which changes five times per pass at most.
 *
 * The "read line" sits at 62% of the viewport height rather than the middle: a
 * day should light as it arrives at the comfortable reading position, not once
 * it has already gone past.
 */
function useSpineProgress(count: number) {
  const olRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;

    // Reduced motion: show the finished state and never listen to scroll.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ol.style.setProperty('--tl-p', '1');
      setActive(count - 1);
      return;
    }

    let raf = 0;
    const measure = () => {
      raf = 0;
      const box = ol.getBoundingClientRect();
      if (!box.height) return;

      const line = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (line - box.top) / box.height));
      ol.style.setProperty('--tl-p', p.toFixed(4));

      /* offsetTop is no use here: each node's offsetParent is its own <li>,
         not the list. Both rects are current, so the difference is the node's
         position within the rail. */
      const travelled = p * box.height;
      let last = -1;
      ol.querySelectorAll<HTMLElement>('[data-tl-node]').forEach((node, i) => {
        const r = node.getBoundingClientRect();
        if (travelled >= r.top + r.height / 2 - box.top) last = i;
      });
      setActive(last);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  return { olRef, active };
}

function Schedule() {
  const { olRef, active } = useSpineProgress(DAYS.length);

  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvasAlt }}>
      <SectionHeading sub="Across 5 days, understand what makes music therapeutic, how it can support different needs and how those principles are practically applied in a music therapy practice.">
        Your <span className="kz-accent">5-Day Schedule</span>
      </SectionHeading>

      {/* Alternating spine. The rail is centred on desktop and slides to the
          left edge on mobile, where a zig-zag has no room. */}
      <ol ref={olRef} className="relative mx-auto mt-14 max-w-[920px]">
        <span aria-hidden className="tl-rail">
          <span className="tl-fill" />
        </span>

        {DAYS.map((d, i) => {
          const left = i % 2 === 0; // card in the left column on desktop
          return (
            <li
              key={d.n}
              className={`relative mb-6 pl-14 sm:mb-9 sm:w-1/2 sm:pl-0 ${
                left ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'
              }`}
            >
              {/* Positioning lives on the outer span and the snap animation on
                  the inner one: one element cannot both hold a centring
                  translate and keyframe its transform. */}
              <span
                data-tl-node
                className={`tl-node ${left ? 'tl-node-right' : 'tl-node-left'} ${
                  i <= active ? 'is-on' : ''
                }`}
              >
                <span aria-hidden className="tl-node-ring" />
                <span className="tl-node-inner">{i + 1}</span>
              </span>

              {/* data-lego-loop, not data-lego: this is the ONE run on the page
                  that replays on every scroll pass, because the spine is meant
                  to be re-read. */}
              <div
                data-lego-loop="x"
                className="lego-hover rounded-2xl p-6"
                style={{
                  ...legoDelay(0),
                  ['--lego-from' as string]: left ? '26px' : '-26px',
                  border: `1px solid ${i <= active ? C.lineStrong : C.line}`,
                  background: C.canvas,
                }}
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                    left ? 'sm:flex-row-reverse' : ''
                  }`}
                  style={{ background: C.coralBed, color: C.coralInk }}
                >
                  <CalendarBlank weight="bold" className="lego-stud h-3 w-3" />
                  {d.n}
                </span>
                <h3
                  className="mt-3.5 font-display text-[23px] font-semibold leading-snug"
                  style={{ color: C.ink }}
                >
                  {d.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: C.inkSoft }}>
                  {d.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ══ 5 · Live Sessions, Twice A Day ════════════════════════════════════════
   A CTA band, not a section with a structure: two timings and a click. It is a
   dark CARD inside a light band, which is the only way dark is allowed on this
   page now that the stage is light. There are exactly two such objects, this
   one and the Option 2 card. */
function SessionsBand() {
  return (
    <section className="px-4 py-14" style={{ background: C.canvas }}>
      <div
        className="mx-auto max-w-[920px] rounded-[28px] px-6 py-12 text-center sm:px-12"
        style={{
          background: C.navyDeep,
          boxShadow: '0 30px 60px -34px rgba(48,68,67,0.55)',
        }}
      >
        {/* A hairline, not a tinted bed: saffron is 4.6:1 on bare teal and any
            saffron wash under it drops the 10.5px label below 4.5. */}
        <span
          data-lego=""
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em]"
          style={{ border: '1px solid rgba(253,147,9,0.5)', color: C.gold }}
        >
          <Clock weight="bold" className="h-3 w-3" />
          Live Sessions, Twice A Day
        </span>

        <h2
          className="mx-auto mt-6 max-w-[620px] font-display text-[clamp(30px,4.4vw,44px)] font-semibold leading-[1.12]"
          style={{ color: C.onDark }}
        >
          {SESSION_TIMES}, <span style={{ color: C.gold }}>live on Zoom</span>.
        </h2>
        <p className="mt-3 text-[15.5px]" style={{ color: C.onDarkMute }}>
          Pick whichever time fits your day.
        </p>

        <div className="mx-auto mt-8 flex max-w-[460px] flex-col items-center">
          <Link
            href={CHECKOUT_HREF}
            data-cta
            className="lego-press cta-shimmer group inline-flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 font-body text-[15px] font-bold"
            style={{
              background: C.ctaGold,
              color: C.onCta,
              ['--shimmer' as string]: 'rgba(255,255,255,0.55)',
            }}
          >
            <span className="inline-flex items-center gap-2.5">
              {CTA_LABEL}
              <ArrowRight
                weight="bold"
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
          <p className="mt-3.5 text-[13.5px] font-medium" style={{ color: C.onDarkMute }}>
            {CTA_NOTE}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══ 6 · Does this sound like you? ═════════════════════════════════════════
   A one-sided self-recognition list: every line is meant to be ticked, so
   there is no second column and nothing to weigh against.

   The blueprint's default for this beat is a coral × glyph, because on most
   challenge funnels these lines are PAINS. Here they are not: every one is an
   affirmative "you are this person" statement and the source copy sets each
   with a ☑️. So the glyph is a matched-weight checkbox, which is the same
   meaning the copy already carries, without the emoji.

   The highlighted phrase in each line is TYPOGRAPHY, not an edit: the words
   and their order are exactly as written. */
const RECOGNITION: [string, string, string][] = [
  [
    'You already work in ',
    'healing, wellness, therapy or psychology',
    ' and want to add music therapy as another practical modality to the way you support people.',
  ],
  [
    "You're a ",
    'homemaker or someone looking for something meaningful of your own',
    ', and want to turn your love for music into a practical skill, purpose or income opportunity.',
  ],
  [
    "You're a ",
    'working professional',
    ' who has always loved music and are now exploring a second career, side income or meaningful new direction.',
  ],
  [
    "You're a ",
    'doctor or healthcare professional',
    ' looking to add a complementary approach beyond your existing area of practice.',
  ],
  [
    "You're a ",
    'musician or serious music lover',
    ' who wants to use music beyond performance and explore how it can become a therapeutic skill.',
  ],
  [
    "You're ",
    'approaching or already in retirement',
    ' and want a renewed sense of purpose, engagement and a way to contribute meaningfully through something you genuinely enjoy.',
  ],
];

function Recognition() {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvasAlt }}>
      <SectionHeading>
        Does this <span className="kz-accent">sound like you</span>?
      </SectionHeading>

      <ul className="mx-auto mt-12 grid max-w-[820px] gap-3">
        {RECOGNITION.map(([pre, hl, post], idx) => (
          <li
            key={hl}
            data-lego=""
            className="lego-hover-sm flex items-start gap-4 rounded-2xl px-5 py-4"
            style={{
              ...legoDelay(idx),
              border: `1px solid ${C.line}`,
              background: C.canvas,
            }}
          >
            <span
              className="lego-stud mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
              style={{ background: C.goldPale }}
            >
              <CheckSquare weight="fill" className="h-3.5 w-3.5" style={{ color: C.goldInk }} />
            </span>
            <span className="text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
              {pre}
              <strong style={{ color: C.ink, fontWeight: 700 }}>{hl}</strong>
              {post}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ══ 8 · Why music therapy: a three-circle Venn ═══════════════════════════
   SVG viewBox 700x688, r=205, A(228,222) B(472,222) C(350,458). On sm+ the
   stage is a fixed 600px, and every label box below was measured against that
   geometry to sit inside its circle's exclusive region with 14px to spare.
   Below sm only the big words fit, so the full text moves to a list under it. */
const VENN_R = 205;
const VENN_CIRCLES = { a: [228, 222], b: [472, 222], c: [350, 458] } as const;

const VENN = [
  {
    key: 'a',
    rgb: '253,147,9',
    ink: C.goldInk,
    eyebrow: 'Something You Love',
    word: 'Music',
    body: 'A passion you already have and genuinely enjoy.',
    pos: { left: '21.67%', top: '27.1%', width: '23.33%' },
  },
  {
    key: 'b',
    rgb: '131,0,125',
    ink: C.coralInk,
    eyebrow: 'Something That Helps Others',
    word: 'Impact',
    body: "A practical way to use music to support people's wellbeing.",
    pos: { left: '78%', top: '26.8%', width: '22.67%' },
  },
  {
    key: 'c',
    rgb: '48,68,67',
    ink: C.ink,
    eyebrow: 'Something You Can Build On',
    word: 'Income',
    body: 'A skill that can grow into a practice, second career or additional income opportunity.',
    pos: { left: '50%', top: '78.8%', width: '30%' },
  },
] as const;

const VENN_TAGLINE = 'Passion - Purpose - Opportunity';

function VennArt() {
  return (
    <svg viewBox="0 0 700 688" aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        {VENN.map(({ key, rgb }) => (
          <radialGradient key={key} id={`venn-fill-${key}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`rgb(${rgb})`} stopOpacity={0.05} />
            <stop offset="100%" stopColor={`rgb(${rgb})`} stopOpacity={0.17} />
          </radialGradient>
        ))}
        <filter id="venn-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="rgb(48,68,67)" floodOpacity="0.12" />
        </filter>
      </defs>
      <g filter="url(#venn-shadow)">
        {VENN.map(({ key }) => (
          <circle
            key={key}
            cx={VENN_CIRCLES[key][0]}
            cy={VENN_CIRCLES[key][1]}
            r={VENN_R}
            fill={C.canvas}
          />
        ))}
      </g>
      {VENN.map(({ key, rgb }) => (
        <g key={key}>
          <circle
            cx={VENN_CIRCLES[key][0]}
            cy={VENN_CIRCLES[key][1]}
            r={VENN_R}
            fill={`url(#venn-fill-${key})`}
            stroke={`rgba(${rgb},0.6)`}
            strokeWidth={1.5}
          />
          <circle
            cx={VENN_CIRCLES[key][0]}
            cy={VENN_CIRCLES[key][1]}
            r={VENN_R - 9}
            fill="none"
            stroke={`rgba(${rgb},0.22)`}
            strokeWidth={1}
            strokeDasharray="2 6"
          />
        </g>
      ))}
    </svg>
  );
}

function WhyMusicTherapy() {
  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvas }}>
      <SectionHeading>
        Why Can Music Therapy Become Such A{' '}
        <span className="kz-accent">Powerful Path</span> For Music
        Lovers?
      </SectionHeading>

      <div className="mx-auto mt-12 max-w-[860px] text-center">
        <p
          className="mx-auto max-w-[680px] text-[16.5px] leading-[1.75]"
          style={{ color: C.inkSoft }}
        >
          Because it can bring together three things most people struggle to
          find in one path:
        </p>

        <div
          className="relative mx-auto mt-10 w-full max-w-[600px]"
          style={{ aspectRatio: '700 / 688', containerType: 'inline-size' }}
        >
          <VennArt />

          <ul>
            {VENN.map(({ ink, eyebrow, word, body, pos }) => (
              <li
                key={word}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={pos}
              >
                <p
                  className="hidden text-[10px] font-bold uppercase leading-[1.4] tracking-[0.16em] sm:block"
                  style={{ color: C.inkSoft }}
                >
                  {eyebrow}
                </p>
                <p
                  className="font-display font-semibold leading-[1.1] sm:mt-1"
                  style={{ color: ink, fontSize: '6.667cqw' }}
                >
                  {word}
                </p>
                <p
                  className="mt-1.5 hidden text-[13px] leading-[1.45] sm:block"
                  style={{ color: C.inkSoft }}
                >
                  {body}
                </p>
              </li>
            ))}
          </ul>

          {/* The seal on the triple overlap. */}
          <div
            className="absolute grid aspect-square w-[17.33%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center"
            style={{
              left: '50%',
              top: '44.9%',
              background: C.goldDeep,
              boxShadow: `0 0 0 3px ${C.canvas}, 0 0 0 4px rgba(253,147,9,0.7), 0 16px 30px -12px rgba(74,0,8,0.55)`,
            }}
          >
            <div>
              <p
                className="font-display font-semibold leading-[1.02]"
                style={{ color: C.onDark, fontSize: 'max(11px, 3cqw)' }}
              >
                Music
                <br />
                Therapy
              </p>
              <p
                className="mx-auto mt-1 hidden max-w-[78px] text-[7px] font-bold uppercase leading-[1.35] tracking-[0.14em] sm:block"
                style={{ color: C.gold }}
              >
                {VENN_TAGLINE}
              </p>
            </div>
          </div>
        </div>

        <p
          className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.18em] sm:hidden"
          style={{ color: C.goldInk }}
        >
          {VENN_TAGLINE}
        </p>
        <ul className="mx-auto mt-6 max-w-[420px] space-y-5 text-left sm:hidden">
          {VENN.map(({ rgb, ink, eyebrow, word, body }) => (
            <li key={word} className="flex gap-4">
              <span
                aria-hidden
                className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ background: `rgba(${rgb},0.2)`, boxShadow: `inset 0 0 0 1.5px rgba(${rgb},0.7)` }}
              />
              <div>
                <p
                  className="text-[10.5px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: C.inkSoft }}
                >
                  {eyebrow}
                </p>
                <p className="font-display text-[22px] font-semibold leading-tight" style={{ color: ink }}>
                  {word}
                </p>
                <p className="mt-1 text-[14.5px] leading-[1.55]" style={{ color: C.inkSoft }}>
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p
          className="mx-auto mt-8 max-w-[680px] text-[16.5px] leading-[1.75]"
          style={{ color: C.inkSoft }}
        >
          You already love music. Music therapy gives you a way to turn that
          love into a skill you can use, build on and earn from.
        </p>
      </div>
    </section>
  );
}

export default function BelowFold() {
  /* LazyMotion mounts the single IntersectionObserver that adds `bw-in` to
     revealed elements. Without it every .bw-reveal-* stays at opacity 0 once
     .bw-js is on the document. */
  return (
    <LazyMotion features={domAnimation}>
      {/* ⚠️ TESTIMONIALS FIRST, since 24 Sep 2026 (Atul's call). They were beat
          7, after the schedule and the recognition list; they now open
          everything below the hero, so the first thing after the offer is other
          people saying it worked.

          FIRST CHILD of this component on purpose: `BelowFold` is rendered
          immediately after `<Hero />` in app/page.tsx, so first here is
          "directly below the hero" WITHOUT pulling the block out of the
          deferred chunk and onto the critical path.

          "Does this sound like you?" did NOT move with it. It stays at beat 5,
          in argument order: it is the turn in the argument, not a proof beat,
          and it only works once the reader knows what the thing is.

          Band alternation was re-cut around the move. Proof takes canvas-alt so
          it separates from the affiliation strip above it, and WhyMusicTherapy
          flipped to canvas so it does not collide with the recognition list it
          now follows. */}
      <Proof />
      <Experience />
      <Schedule />
      <SessionsBand />
      <Recognition />
      <WhyMusicTherapy />
      <Toolkit />
      <Close />
    </LazyMotion>
  );
}
