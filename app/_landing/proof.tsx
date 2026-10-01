'use client';

/**
 * Beat 2.5 · proof, the first section under the hero. Two self-scrolling rails
 * travelling in opposite directions, sixteen different Vimeo testimonials each.
 *
 * The rails carry posters only. A click opens one lightbox player sized to the
 * clip's own ratio, because eight of the clips are landscape or square and an
 * in-card 9:16 player would shrink those to a strip.
 */
import { Play, X } from '@phosphor-icons/react/dist/ssr';
import { useCallback, useEffect, useRef, useState } from 'react';

import { asset } from './asset-version';
import { C, SectionHeading } from './shared';

type Clip = { id: number; w: number; h: number; thumb: string };

const CLIPS: Clip[] = [
  { id: 1225183259, w: 640, h: 1164, thumb: '2198836805-225d4c26af3dba4e514b9dc33ecffcf30b219e1c4dc55893f74a1d4844af635c' },
  { id: 1225183389, w: 640, h: 1164, thumb: '2198836969-951ed05670ad8099cf74a9b42648b99d0b664bb51190df9d4cbb9aa6e0f2bdf4' },
  { id: 1225183388, w: 640, h: 1131, thumb: '2198836984-29a68db30fe86f0be0e7d3fd8b7b358e7aca3e0351299fc274ee12fcf69eaa1b' },
  { id: 1225183335, w: 640, h: 352, thumb: '2198836909-ce5c20cf6e318de87900805c74630e97b13b7f05a9d09239f81f17cd6571f3a1' },
  { id: 1225183308, w: 640, h: 352, thumb: '2198836855-0d6b6d1c8bc6a5409f41cecce7b633794eb62815bfdd7f1e4a62aa8ed8b3ba58' },
  { id: 1225183253, w: 640, h: 1164, thumb: '2198836799-e83f2c1f3c69ad39d27102d8446c6e4f42e8695618fc93e971b7d695952ee3bc' },
  { id: 1225183336, w: 640, h: 352, thumb: '2198836914-93443130180654de4335a05fa4a7caadf5452e4dd2ba26adc0e79514923e692c' },
  { id: 1225183387, w: 640, h: 1131, thumb: '2198836971-550209f8ca0ef4e6b3376c3ae561b69ced4b40a41fb18ee66818ed81fb961978' },
  { id: 1225183390, w: 640, h: 1131, thumb: '2198836983-8d0a0a08aaab4241119015c5489e9aeb4a39cf600044e9fa4436d78cc6bf3160' },
  { id: 1225183305, w: 640, h: 1131, thumb: '2198836831-9578177ea5af4b0604fdc39e39a72b0416dcce958d3e2dc1822172b404c3fd5c' },
  { id: 1225183207, w: 640, h: 1164, thumb: '2198836726-63361c9f701c41e37f942bb45e778c2a5033d413837a36a852c9173d0effb115' },
  { id: 1225183219, w: 640, h: 1164, thumb: '2198836747-b61dd76017fe754031f13d7aa7e64559aa65405dfa54cea5f026e63c4b3538b6' },
  { id: 1225183339, w: 640, h: 1164, thumb: '2198836921-4fa50145df1b9c37effb36ec5db3f35be7320ffb8c73b166c42e8df511f6f5cb' },
  { id: 1225183200, w: 640, h: 352, thumb: '2198836700-1d94bd5970d94e3a3876c9775846cd48ab7f4d950569ad0a26e10ec4bb094ea4' },
  { id: 1225183338, w: 640, h: 1138, thumb: '2198836920-6ee3a40d45d8d8f0849f2b8002be880a487d267c9a5798ccd106d63aca254401' },
  { id: 1225183258, w: 640, h: 1164, thumb: '2198836798-526acba7a5c05d531b33fd0a10b051988d1ae5a4481b488cb64d34662a0f5c57' },
  { id: 1225183113, w: 640, h: 352, thumb: '2198836630-abfa2b74bfeacbae49dc127cda98a63cc2e897e87e190b72185258a907b61d87' },
  { id: 1225183177, w: 640, h: 1164, thumb: '2198836671-86d3bc11447d5b8ee03c0e0f1ac0ab10d7c3a8f0deadbb5767171a6de98b1b25' },
  { id: 1225183306, w: 640, h: 1141, thumb: '2198836842-e6c50c57745f118426732f1c480c6167c296ac2b727a775b1ba8fb442a09db1c' },
  { id: 1225183310, w: 640, h: 640, thumb: '2198836854-0f06949a8772d03909eb90d1b461c319d47ee359ccc6d079e467788a161c3d54' },
  { id: 1225183252, w: 640, h: 1164, thumb: '2198836800-9b0f7a87a60ae7e3a572313f4c58117ba57d6449ed2e0e5de73cf08fb5d45f35' },
  { id: 1225183076, w: 640, h: 1138, thumb: '2198836580-1d712522ace99c6b1e5cd7106fed8d4c471ab6eb07a0896a2476b6be92cc4630' },
  { id: 1225183078, w: 640, h: 1131, thumb: '2198836554-81e4ef6262324cef159e28b3c14024a57dd7c3418a13784aea5ff0aacf9277db' },
  { id: 1225183138, w: 640, h: 1164, thumb: '2198836654-907e7c13b989a5f26ef49ddc45210ab7e7ff486483d99c7d38f261148eef99f7' },
  { id: 1225183157, w: 640, h: 1138, thumb: '2198836751-f9acc7893627a7f7b35d92c9719040eeb1f1eadc4d80cce42cd5e93c981dd229' },
  { id: 1225183227, w: 640, h: 1131, thumb: '2198836752-30524f8840525ee3afd7d256e61182850de0e0ecdc0cf37ff54deb504164c9bc' },
  { id: 1225183120, w: 640, h: 361, thumb: '2198836636-c67c1c819bde44e0d132228aee5d261c46738a58536eb3134e1d1421d34f36a1' },
  { id: 1225183184, w: 640, h: 1164, thumb: '2198836676-b687f68332fc313b6a910f1091719442b97fd2f30a99e7661aa3aebac3441490' },
  { id: 1225183077, w: 640, h: 1164, thumb: '2198836574-520bac007c1c186e3bcbdcb1a5a5d81fc32d729aa0935ab45e8a69faa71170f3' },
  { id: 1225183075, w: 640, h: 1138, thumb: '2198836573-027b40bdc25fd4ad0d198dddede4c9dbc463883e52446cf67f30a47d87be43be' },
  { id: 1225183108, w: 640, h: 352, thumb: '2198836601-4ce85accf730405c9817b4825c67e7e5ecbf2630a22c01e22e1e57c43f1513c3' },
  { id: 1225183112, w: 640, h: 1164, thumb: '2198836607-cb3907e987b85c497bcd3a35c6d16556cabf830c34634c930425228ae6d2adf4' },
];

const ROWS: [Clip[], Clip[]] = [CLIPS.slice(0, 16), CLIPS.slice(16)];

// Landscape thumbs are centre-cropped to 9:16, so they need the wider source to stay sharp.
const posterUrl = (c: Clip) =>
  `https://i.vimeocdn.com/video/${c.thumb}-d_${c.w > c.h * 0.8 ? 1280 : 640}`;

function Rail({
  clips,
  row,
  reverse,
  paused,
  onPlay,
}: {
  clips: Clip[];
  row: 1 | 2;
  reverse: boolean;
  paused: boolean;
  onPlay: (c: Clip) => void;
}) {
  return (
    <div
      className="kz-rail"
      data-playing={paused ? 'true' : 'false'}
      role="region"
      aria-label={`Video testimonials, row ${row}`}
    >
      {/* Track is rendered twice and travels -50%, so it loops seamlessly. The
          base 92s was tuned for six cards; scale it to keep the same speed. */}
      <div
        className={`kz-rail-track ${reverse ? 'kz-rail-track--reverse' : ''}`}
        style={{ animationDuration: `${Math.round((92 * clips.length) / 6)}s` }}
      >
        {[0, 1].map((copy) =>
          clips.map((c) => (
            <article
              key={`${copy}-${c.id}`}
              aria-hidden={copy === 1 ? true : undefined}
              className="w-[230px] shrink-0 rounded-3xl p-3 sm:w-[264px]"
              style={{
                background: C.canvas,
                border: `1px solid ${C.line}`,
                boxShadow: '0 18px 40px -28px rgba(48,68,67,0.3)',
              }}
            >
              <button
                type="button"
                onClick={() => onPlay(c)}
                className="group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-2xl"
                style={{ background: C.canvasAlt, boxShadow: `inset 0 0 0 1px ${C.line}` }}
                aria-label={`Play testimonial ${CLIPS.indexOf(c) + 1}`}
                tabIndex={copy === 1 ? -1 : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={posterUrl(c)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(48,68,67,0.05) 0%, rgba(48,68,67,0.06) 55%, rgba(48,68,67,0.5) 100%)',
                  }}
                />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 group-hover:scale-105"
                  style={{ background: C.canvas, boxShadow: '0 10px 26px -10px rgba(48,68,67,0.55)' }}
                >
                  <Play weight="fill" className="h-5 w-5 translate-x-[1px]" style={{ color: C.ink }} />
                </span>
              </button>
            </article>
          )),
        )}
      </div>
    </div>
  );
}

function Player({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const ratio = clip.w / clip.h;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Testimonial video"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(48,68,67,0.88)' }}
      onClick={onClose}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-black"
        style={{
          aspectRatio: `${clip.w} / ${clip.h}`,
          width: `min(92vw, calc(82vh * ${ratio}))`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://player.vimeo.com/video/${clip.id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
          title="Testimonial video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full"
        style={{ background: C.canvas }}
      >
        <X weight="bold" className="h-5 w-5" style={{ color: C.ink }} />
      </button>
    </div>
  );
}

/* Written reviews: 88 chat screenshots in public/reviews/review-NN.webp, listed
   here as [width, height]. Two had a reviewer's phone number, blurred in the file. */
const REVIEWS: [number, number][] = [
[884, 1100], [495, 1100], [656, 1100], [849, 1076], [698, 1100], [548, 1100], [556, 1100],
  [875, 1100], [954, 1029], [495, 1100], [495, 1100], [495, 1100], [495, 1100], [682, 1100],
  [516, 1100], [546, 1100], [538, 1100], [555, 1100], [434, 989], [532, 1100], [528, 1100],
  [549, 1100], [531, 1100], [950, 1100], [812, 866], [1080, 493], [605, 1100], [604, 1100],
  [596, 1100], [509, 1100], [511, 1100], [752, 1100], [478, 1100], [488, 1100], [463, 1100],
  [458, 1100], [957, 1100], [489, 1100], [526, 1100], [723, 1100], [758, 1100], [495, 1100],
  [832, 641], [673, 1100], [462, 1100], [573, 1100], [725, 1100], [846, 1039], [834, 673],
  [639, 1100], [461, 1100], [725, 1100], [581, 1100], [629, 1100], [455, 1100], [459, 1100],
  [722, 1100], [499, 1100], [468, 1100], [942, 1070], [510, 1100], [759, 1100], [1079, 756],
  [650, 1100], [495, 1100], [552, 1100], [630, 1100], [474, 1100], [484, 1100], [844, 1100],
  [617, 1100], [598, 1100], [1080, 654], [954, 821], [792, 1100], [890, 1100], [514, 1100],
  [941, 1066], [967, 904], [525, 1100], [1080, 743], [487, 1100], [479, 1100], [500, 1100],
  [500, 1100], [500, 1100], [500, 1100], [500, 1100],
];

const reviewSrc = (i: number) => `/reviews/review-${String(i + 1).padStart(2, '0')}.webp`;

function ReviewRail({ paused, onOpen }: { paused: boolean; onOpen: (i: number) => void }) {
  return (
    <div
      className="kz-rail"
      data-playing={paused ? 'true' : 'false'}
      role="region"
      aria-label="Written reviews"
    >
      {/* Margin, not gap, so the -50% loop lands exactly on the second copy. */}
      <div className="kz-rail-track" style={{ gap: 0, animationDuration: '470s' }}>
        {[0, 1].map((copy) =>
          REVIEWS.map(([w, h], i) => (
            <button
              key={`${copy}-${i}`}
              type="button"
              onClick={() => onOpen(i)}
              aria-hidden={copy === 1 ? true : undefined}
              tabIndex={copy === 1 ? -1 : undefined}
              aria-label={`Open written review ${i + 1}`}
              className="mr-4 shrink-0 cursor-zoom-in overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1 sm:mr-6"
              style={{
                background: C.canvas,
                border: `1px solid ${C.line}`,
                boxShadow: '0 18px 40px -28px rgba(48,68,67,0.3)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(reviewSrc(i))}
                alt=""
                width={w}
                height={h}
                loading="lazy"
                decoding="async"
                className="h-[240px] w-auto sm:h-[300px]"
              />
            </button>
          )),
        )}
      </div>
    </div>
  );
}

function ReviewViewer({ index, onClose }: { index: number; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Written review ${index + 1}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(48,68,67,0.9)' }}
      onClick={onClose}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(reviewSrc(index))}
        alt={`Written review ${index + 1}`}
        className="max-h-[92vh] max-w-full rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close review"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full"
        style={{ background: C.canvas }}
      >
        <X weight="bold" className="h-5 w-5" style={{ color: C.ink }} />
      </button>
    </div>
  );
}

export default function Proof() {
  const [playing, setPlaying] = useState<Clip | null>(null);
  const close = useCallback(() => setPlaying(null), []);
  const [review, setReview] = useState<number | null>(null);
  const closeReview = useCallback(() => setReview(null), []);
  const paused = !!playing || review !== null;

  return (
    <section className="px-4 py-12 sm:py-20 lg:py-24" style={{ background: C.canvasAlt }}>
      <SectionHeading sub="These are people like you. Wellness professionals, doctors, working professionals, homemakers, musicians and lifelong music lovers who were looking for a practical new skill, second career or deeper sense of purpose.">
        Music Lovers Who Turned Their Passion Into A{' '}
        <span className="kz-accent">Practical New Skill</span>
      </SectionHeading>

      <div className="mt-14 space-y-4">
        <Rail clips={ROWS[0]} row={1} reverse={false} paused={paused} onPlay={setPlaying} />
        <Rail clips={ROWS[1]} row={2} reverse paused={paused} onPlay={setPlaying} />
        <ReviewRail paused={paused} onOpen={setReview} />
      </div>

      {playing && <Player clip={playing} onClose={close} />}
      {review !== null && <ReviewViewer index={review} onClose={closeReview} />}
    </section>
  );
}
