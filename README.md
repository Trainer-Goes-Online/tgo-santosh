# tgo-santosh

Santosh Ghatpande · Anahat Music Therapy
**5-Day Music Therapy Practitioner Challenge**, ₹497, live on Zoom, starts 21st
October, 6AM and 7PM.

A CHALLENGE funnel: landing page, checkout, thank-you, three legal pages,
Razorpay, Meta CAPI, GA4, Microsoft Clarity and the Pabbly fulfilment hand-off.

- **Copy source:** `COPY-SOURCE.md`, verbatim, the sole source for every string.
- **What is still missing:** `PENDING.md`. Read it before going live.
- **Env:** copy `.env.example` to `.env.local`. Every var is commented with what
  it is, where in the dashboard to find it, and what breaks without it.

```bash
npm install
npm run dev
```

## Shape

```
app/
  _landing/   offer.ts · legal.ts · asset-version.ts · shared.tsx
              hero.tsx · below-fold.tsx · proof.tsx · toolkit.tsx · close.tsx
              sticky-cta.tsx · lego.tsx · lego-style.ts · motion-lite.tsx
  checkout/   page.tsx · included.ts · layout.tsx
  thank-you/  page.tsx · layout.tsx
  privacy-policy/ · refund-policy/ · terms-and-conditions/
  api/        meta/event · razorpay/create-order · razorpay/webhook
components/   MetaPixel · Analytics · FunnelTracker · SiteFooter
              LegalPageLayout · PaymentLogos
lib/          track · ga4 · ga4-server · meta-capi · pabbly · client-signals
              checkout-config · attribution · attribution-edge
              request-signals · order-notes
middleware.ts edge attribution capture, before any JS runs
```

## The rules this codebase is built on

- **The hero stage is LIGHT and the page has no dark band at all** (24 Sep
  2026). Navy survives as the colophon footer and as two contained objects
  inside light bands. Flipping a stage is not a background swap: `.kz-lit` not
  `.kz-lit-dark`, every accent on the stage steps to its ink variant, the dot
  grid inverts its weight, and the seam is a quiet rule rather than a horizon.
- **Video testimonials are the second section**, the first child of
  `BelowFold`, so they sit directly under the hero without leaving the deferred
  chunk. "Does this sound like you?" does not move with them: it stays in
  argument order.
- **The hero carries a mobile client banner** under the headline, `lg:hidden`,
  matched to the breakpoint where the hero grid goes two-column. No `priority`,
  `sizes="100vw"`, ratio declared from the file's own dimensions.
- **One price, one date, one destination.** `app/_landing/offer.ts` is the only
  file permitted to declare any of them. Everything else imports it, including
  `lib/checkout-config.ts`, so the amount charged cannot drift from the amount
  displayed.
- **Purchase comes from the Razorpay webhook, never from the browser.** UPI
  payers do not return to the tab.
- **InitiateCheckout fires on the pay tap, not on arrival.** Checkout arrival is
  `AddToCart`, fired from the checkout's own mount so a direct arrival from an
  email or a retargeting ad is still visible to Meta.
- **The webhook checks the sale is ours.** `create-order` writes
  `notes.kind = 'santosh_5day_music_therapy'` and the webhook returns 200
  "not mine" for anything else, because one Razorpay account fans every payment
  out to every registered webhook URL.
- **Order notes are flat, one key per field.** Fourteen keys against Razorpay's
  limit of fifteen. Serialised JSON is never sliced.
- **Attribution is captured at the edge** in `middleware.ts`, with the browser
  copy in `lib/attribution.ts` as the backup. `lib/attribution-edge.ts` has no
  `'use client'` directive and must never gain one.
- **Health classification hygiene is on from the first line.** See `PENDING.md`
  section 5.
- **Every `/public` image goes through `asset()`**, never a bare path.
# tgo-santosh
