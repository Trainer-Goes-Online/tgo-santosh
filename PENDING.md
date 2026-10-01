# PENDING · tgo-santosh

Everything the build could not decide, in one place. Nothing on this list was
invented, and every item renders as a visible placeholder, a flagged comment or
an empty frame rather than as a quiet gap.

Built 24 Sep 2026 on the locked Kaizen Warm Navy challenge skin. Re-themed
1 Oct 2026 from the client logo (`Anahat Transforamtion_Logo all_All Formats`):
palette and display face now come from the logo, the skin's rhythm is
unchanged. See section 0.

Revised the same day for the three doctrine changes from the `tgo-peeyush`
build: the hero stage is LIGHT (the page now has no dark band at all), the hero
carries a mobile client banner under the headline, and the video testimonials
are the second section on the page.

---

## 0 · Logo re-theme (1 Oct 2026). For review, nothing here blocks launch.

Colours measured from the logo PNG with PIL. Brand roles use only these five:
`#304443` slate teal, `#4A0008` oxblood, `#FD9309` saffron, `#83007D` violet,
`#FFFFFF`. The token names are unchanged and read as roles.

| Role | Value |
|---|---|
| ink, and the dark-object / footer floor (`--navy-deep`) | `#304443` |
| headline accent, eyebrows, small accent text (`--gold-deep`, `--gold-ink`) | `#4A0008`, headline accents are an oxblood into violet gradient (`.kz-accent`) |
| CTA fill / label (`--cta-gold`, `--on-cta`) | `#FD9309` / `#4A0008` (7.22:1) |
| spark fill / spark text (`--coral`, `--coral-ink`) | `#FD9309` / `#83007D` |
| canvas | `#FFFFFF` |
| neutrals: band, beds, wash, rules, soft ink | supplied hexes blended onto white (`#F8F5F5`, `#F4F0F0`, `#FFF4E6`, `#F5EBF5`, `#ECEEEE`, `#E6E9E8`, `#D1D6D6`, `#5E6D6C`) |

Display face: Fraunces became **Crimson Pro** (closest Google match to the
Palatino-style "Anahat" wordmark); body stays Manrope. Display sizes were scaled
about 1.15x to make up for Crimson Pro's smaller x-height.

Logo usage: hero header row (`app/_landing/hero.tsx`, multiply-blended so the
PNG's white ground drops out), Razorpay sheet `image`, favicon and apple icon
(`app/icon.png`, `app/apple-icon.png`), OG / Twitter share image
(`public/brand/anahat-square.png`, twitter card now `summary`, not
`summary_large_image`, because there is no wide share image).

Flags for Atul:

1. **Brand name mismatch.** The logo says "Anahat **Transformations**"; the copy,
   `BRAND`, the Razorpay sheet name and the footer say "Anahat **Music
   Therapy**". Copy was not changed. Confirm which name is the trading name and
   which matches the Razorpay merchant record.
2. **Saffron fails as text on white (2.25:1).** It is used only as fills,
   hairlines, dots, and as type on teal (4.60:1, just over the bar).
3. **The saffron CTA's edge on white is 2.25:1**, under the 3:1 bar for a
   control boundary. The oxblood label carries it. If you want it stricter, the
   light-ground buttons switch to the teal fill (`tone="navy"`).
4. **The headline accent differs from the teal ink by hue, not lightness**
   (oxblood vs teal 1.57:1). Emphasis only, carries no meaning, left as is.
5. **Canvas is pure `#FFFFFF`**, against the skin's "never pure white" (C12),
   because the logo's ground is white and the brief was "as per the logo".
6. **Neutrals are blends of supplied hexes onto white**, not new hues. Say if
   you want them reduced to the five literal values only.
7. **Check the hero logo in Safari / iOS.** If a white box shows, the multiply
   blend is not applying.
8. Thank-you keeps its functional colours (WhatsApp green, success green,
   warning amber): status colours, not brand roles.

---

## 1 · Legal. This group BLOCKS A LAUNCH.

`app/_landing/legal.ts` ships with eight `[TODO]` markers, and they **render on
the live pages**: in the footer of every page (landing, checkout, thank-you) and
inside sentences on all three policy pages.

| Field | What it must be |
|---|---|
| `entity` | The registered legal person. Proprietor's name, or the Pvt Ltd / LLP name as registered. This is what has to match the PAN and the Razorpay merchant record. |
| `structure` | Proprietorship, partnership or company. **Deliberately EMPTY rather than guessed**: the terms page reads `LEGAL_STRUCTURE_KNOWN` and runs its opening sentence without naming a structure, which asserts nothing untrue. |
| `address` | Full registered address including PIN. |
| `phone` + `phoneHref` | A monitored number. `phoneHref` is empty rather than half-filled: a `tel:` link to a placeholder dials nothing. |
| `email` | A real monitored inbox. Refund and data requests both land here, and the thank-you page falls back to it when the WhatsApp link is missing. |
| `jurisdiction` | The seat of the district court covering the registered address. Confirm rather than infer: the client may prefer a specific forum. |
| `effectiveDate` | The date the policies are published under. A policy dated before publication is what a dispute picks at. |

Razorpay's merchant review looks for the entity, a postal address and a working
phone and email **on the site itself**, not buried in a policy page. A reviewer
who cannot find them fails the account rather than writing to ask.

---

## 2 · Copy sign-offs. All rendered verbatim, all still open.

1. **"Price Increases To ₹1799 Tomorrow"**, in the announcement bar
   (`app/_landing/hero.tsx`). On an evergreen page "Tomorrow" stops being true
   the day after launch. Either the campaign carries a real dated deadline, or
   the segment needs re-wording by NO-BRAINER. Not silently changed.
2. **The refund policy has no window and no exclusions**
   (`app/refund-policy/page.tsx`). The copy promises a "100% Money-Back
   Guarantee" five times plus "Join Risk-Free", and nobody supplied terms. Read
   as written, the guarantee is unconditional and open-ended, which is the most
   buyer-favourable reading and the one a card network will take in a dispute.
   The fix is not wording, it is Santosh answering: until when, on what
   conditions, how fast it is processed.
3. **The `[Take Action · ₹497 →]` label** in the two-options beat. The square
   brackets and the arrow read as the copy's shorthand for "this is a button",
   so the label renders as "Take Action · ₹497" with the page's own arrow
   token. If the brackets were meant literally, say so and they go back in.
4. **The thank-you page has no source copy.** `COPY-SOURCE.md` carries none, so
   the two policy lines ("No rescheduling to future batches", "Recordings are
   not guaranteed"), the three prep lines and the community-benefit list are
   HOUSE STANDARD, not Santosh's. Each is flagged at the constant in
   `app/thank-you/page.tsx`. Have him read them.
5. **No session length is stated anywhere**, because the copy does not carry
   one. The page says 6AM and 7PM and nothing about duration. If a buyer needs
   to know, the copy has to say it.

---

## 3 · Assets. All currently rendering as labelled empty frames.

1. **Video testimonials: RESOLVED 1 Oct 2026.** 32 Vimeo clips supplied by
   Atul, wired in `app/_landing/proof.tsx` (16 different clips per rail, Vimeo
   thumbnails as posters, click opens a lightbox player at the clip's own
   ratio). 24 are portrait, 7 landscape, 1 square; landscape posters are
   centre-cropped to 9:16 in the rail. Still open: no names or occupations are
   shown (none supplied, and only with consent), so the deck line "wellness
   professionals, doctors, working professionals, homemakers, musicians..." is
   not yet backed by on-screen captions.
   Written reviews rail added under the videos (1 Oct 2026): 88 screenshots
   from the "Written Reviews" folder in `public/reviews/`. Left out: 4 exact
   duplicates, one group message that is another member promoting her own
   paid course (not a review), and the Google Business Reviews PDF. Phone
   numbers visible on two screenshots were blurred.
2. **The mobile hero banner. NEW, and it is the one asset with a fixed
   deadline of its own**, because the slot sits in the hero.
   - Path: **`public/banner/santosh-banner.png`**
   - Reserved ratio: **16 / 9**
   - Where: `app/_landing/hero.tsx`, the `BANNER` constant at the top of the
     hero block. Set `src` to `'/banner/santosh-banner.png'` and it renders
     through `asset()`; until then a labelled `MediaPlaceholder` holds the same
     box so the headline above it never jumps.
   - 16:9 was **chosen, not supplied**: it is the reference build's own banner
     ratio (`tgo-peeyush`, 1672x941) and the commonest banner export. If the
     artwork comes at a different ratio, change `BANNER.ratio` in the same edit
     rather than letting `object-cover` crop it. A banner usually carries type,
     and a crop eats the words.
   - It is `lg:hidden`: phone and tablet only, because from `lg` up the offer
     card is already the screen's one large image.
3. **The "Affiliated With" logos: RESOLVED 1 Oct 2026.** Two, supplied by
   Atul: Healthcare Sector Skill Council and Skill India, at
   `public/brand/hssc.png` and `public/brand/skill-india.png` (trimmed, white
   knocked out). The HSSC source was a small Google thumbnail (748px JPEG);
   swap in an official file if one exists.
4. **Portrait of Santosh: RESOLVED 1 Oct 2026.** One 3:4 portrait
   (`public/brand/santosh-portrait.webp`, cropped from MSG_6823.JPG). The press
   slider under the text is live (1 Oct 2026): two magazine feature pages and
   the Sakal Pune clipping, in `public/press/`, click to enlarge.
5. **Logo: RESOLVED 1 Oct 2026** (see section 0). Still missing: a wide
   1200x630 OG share image, if link previews should show more than the square
   mark. Until then the twitter card is `summary`.
6. **Optional: cover art** for the challenge and the three resources in the
   value stack. They run as typographic cards with an ordinal, an icon and a
   value, which is the reference build's documented behaviour when no covers
   exist. Give all four the SAME ratio when they land, or four cards tile at
   four heights.

---

## 3b · Design decisions taken during the light-stage pass, for review.

None of these touch a string in `COPY-SOURCE.md`. The structural decisions
still stand; the hexes and the cream/navy wording below predate the logo
re-theme, where section 0 now governs (the rail is `--gold-wash` `#FFF4E6`,
`themeColor` tracks it, and the canvas is pure white).

1. **The announcement rail is on `--gold-wash`.** The stage went light, so a
   navy rail above a near-cream hero read as a leftover from another page. The
   reference build puts its rail on the same wash token, and `themeColor` in
   `app/layout.tsx` now tracks it (`#F9F0DE`) rather than the brand navy.
   **The tension worth naming:** the skin's palette law says `--gold-wash` is
   the ONE gold surface and is spent on the two money moments (the value-stack
   lead card and the recap price box). This makes three. A 40px rail is not a
   section ground, which is what that law was written about, but it is Atul's
   call. The alternative is `--canvas-2` with a `--line-strong` rule under it.
2. **The hero's lit headline token is flat `--gold-deep`, not `.kz-lit`.**
   `--gold` was the on-navy highlight and is 1.3:1 on cream. `.kz-lit` was the
   other candidate, but its gradient opens on `--gold-mid` (1.9:1), which holds
   under a 46px price and not under a 34px headline token on a phone.
   `--gold-deep` clears the 3:1 large-text bar, and it is already the highlight
   every `SectionHeading` below the fold uses, so the page now has one
   highlight treatment for headlines and one (`.kz-lit`) for prices.
3. **The offer card stays on `--canvas`, not a pure white.** The reference
   build steps its card to `#FFFFFF` to separate it from a light stage, but
   this skin's environment is warm and never pure white (C12) and `C` carries
   no `surface` token. The card separates on position and craft instead: the
   floor ramp has deepened toward `--canvas-2` by the time it reaches the card,
   and the card keeps the strong hairline, the warm ring and the drop shadow.
4. **The stage floor ramps `--canvas` → `--canvas-2`**, not into a gold tint.
   Gold is the accent and never the ground. What makes it a stage rather than
   another band is the blooms, the dot grid and the seam.
5. **Band alternation was re-cut end to end** after the testimonials moved,
   because inserting one section at the top inverted every band under it. Six
   sections flipped and every inner card surface flipped with its section.
   Order is now: affiliation `canvas` → testimonials `alt` → experience
   `canvas` → schedule `alt` → sessions `canvas` → recognition `alt` → why
   `canvas` → stack `alt` → guide `canvas` → certification `alt` → two options
   `canvas` → recap `alt` → navy colophon.

---

## 4 · Decisions nobody has made yet.

1. **Which occupation is the qualifying one.** `QualifiedLead` currently fires
   for `working_professional`, which is the house default, not a stated client
   preference: the copy addresses homemakers and working professionals with
   equal weight. Flip it in `lib/track.ts` and `app/api/meta/event/route.ts` if
   Santosh says otherwise, and do it BEFORE any spend. The audience it seeds
   cannot be re-cut afterwards.
2. **The Razorpay sheet's business name** is `Anahat Music Therapy`, read from
   `BRAND` in `app/_landing/offer.ts`. It must match the business name on the
   Razorpay account, or the buyer sees two different names over one card form,
   which is the commonest reason to abandon at the sheet.
3. **The domain.** None was supplied, so there is no fallback host anywhere in
   the code except `http://localhost:3000` in `app/layout.tsx`, which exists
   only so `metadataBase` cannot fail the build. Before setting
   `NEXT_PUBLIC_SITE_URL`, ask the domain which host it is:

   ```bash
   curl -sS -o /dev/null -D - https://the-domain | grep -iE '^HTTP/|^location:'
   ```

   A 308 with a `location:` header means that host is not canonical. House
   standard is the apex with `www` redirecting into it.

---

## 5 · Health classification. Applied from the first line, not retrofitted.

This offer names diabetes, hypertension, hormonal imbalance, digestive and
respiratory concerns, anxiety and depression. A Meta "Health and wellness
condition" classification binds at the ROOT DOMAIN and is not cleanly
reversible, so both surfaces the code owns are already closed:

- `custom_data` carries value, currency, `order_id` and the reviewed occupation
  enum. No product name, no category, no UTM, no fbclid. `CHECKOUT_CONFIG
  .contentName` goes to GA4 and Pabbly only, never to Meta.
- `event_source_url` is reduced to the ORIGIN server-side by `originOnly()`.
- Event names are closed union types, so a new one will not compile.

**Check this by eye in Test Events on the first real event**, before spend. It
is the one thing on this list that cannot be undone later.
