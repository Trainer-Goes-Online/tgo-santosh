import { PRICE_PAISE, PRICE_RUPEES } from '@/app/_landing/offer';

/**
 * Every server-side constant the payment and tracking routes need, in one
 * place. The price comes from offer.ts, which reads it from a single env var,
 * so the amount charged can never drift from the amount displayed. Razorpay
 * charges in paise.
 */
export const CHECKOUT_CONFIG = {
  amountRupees: PRICE_RUPEES,
  amountPaise: PRICE_PAISE,
  currency: 'INR',
  /* Used by GA4 (item name) and by the Pabbly hand-off. It is deliberately NOT
     sent to Meta: custom_data carries no product string. See lib/meta-capi.ts. */
  contentName: '5-Day Music Therapy Practitioner Challenge',
  /* ── THIS FUNNEL'S MARK ON ITS OWN ORDERS ──────────────────────────────
     Written into every order's `notes.kind` at create time, and checked by
     the webhook before it fires anything.

     A Razorpay webhook is registered per URL on an ACCOUNT, and every
     subscribed event goes to every registered URL. So this endpoint sees
     every captured payment on the account, not just the ones this checkout
     created: another funnel, a payment link made by hand in the dashboard,
     an invoice. Without this check all of them report as a sale of THIS
     challenge, to Meta, to GA4 and to fulfilment.

     One constant, read by both routes, because a marker written in one file
     and matched by a literal in another silently stops matching the day
     somebody renames the funnel. */
  orderKind: 'santosh_5day_music_therapy',
  /**
   * The canonical origin, and the ONE place it is resolved.
   *
   * ⚠️ NO HARD-CODED FALLBACK, because no launch domain has been supplied for
   * this project yet. An invented one would be sent to Meta as
   * event_source_url on every server event and written into every Razorpay
   * order, quietly attributing live traffic to a domain nobody owns.
   *
   * Before setting NEXT_PUBLIC_SITE_URL, ask the domain which host it is:
   *   curl -sS -o /dev/null -D - https://the-domain | grep -iE '^HTTP/|^location:'
   * A 308 with a location header means that host is not canonical. House
   * standard is the apex with www redirecting into it.
   *
   * A trailing slash is stripped here rather than trusted to be absent: the
   * webhook builds the Pabbly url as `${fallbackEventSourceUrl}/checkout`, so
   * one slash in the env gives `//checkout` on every sale.
   */
  fallbackEventSourceUrl: (process.env.NEXT_PUBLIC_SITE_URL || '')
    .trim()
    .replace(/\/+$/, ''),
  meta: {
    pixelId: process.env.META_PIXEL_ID ?? '',
    accessToken: process.env.META_CAPI_ACCESS_TOKEN ?? '',
    testEventCode: process.env.META_CAPI_TEST_EVENT_CODE ?? '',
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID ?? '',
    keySecret: process.env.RAZORPAY_KEY_SECRET ?? '',
    /* A SEPARATE value from the API keys, taken from Settings -> Webhooks when
       the webhook is registered, not from the API Keys page. It is the one
       that gets missed, and the only symptom is silence: without it the
       webhook rejects every call and no sale is ever reported to Meta, GA4 or
       Pabbly. */
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET ?? '',
  },
} as const;

/** True only when a real CAPI call can be made. Routes check this and skip
 *  quietly rather than posting to Meta with an empty pixel id. */
export const capiReady = () =>
  Boolean(CHECKOUT_CONFIG.meta.pixelId && CHECKOUT_CONFIG.meta.accessToken);

/** Names the env vars that keep capiReady() false, for the skip log lines. */
export const capiMissing = () =>
  [
    !CHECKOUT_CONFIG.meta.pixelId && 'META_PIXEL_ID',
    !CHECKOUT_CONFIG.meta.accessToken && 'META_CAPI_ACCESS_TOKEN',
  ]
    .filter(Boolean)
    .join(', ');

/**
 * Whether this deployment is transacting in test mode, derived rather than
 * declared.
 *
 * Razorpay stamps its own environment into the key id (`rzp_test_` versus
 * `rzp_live_`) so this cannot drift out of sync the way a separate IS_TEST env
 * var would when someone swaps the keys and forgets the flag. A Meta test
 * event code is also treated as test, because events sent with one do not
 * count toward optimisation and the sale they describe is not real.
 *
 * It rides to Pabbly as `is_test` so a staging purchase can be routed away
 * from the live WhatsApp invite instead of onboarding a fictional buyer.
 */
export const isTestMode = () =>
  CHECKOUT_CONFIG.razorpay.keyId.startsWith('rzp_test_') ||
  Boolean(CHECKOUT_CONFIG.meta.testEventCode);
