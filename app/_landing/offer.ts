/**
 * Every date, time, price and destination on the page comes through this file.
 * Nothing below it should ever hard-code one again: when the cohort moves, one
 * edit here moves the announcement bar, the hero, the pills, the schedule
 * heading, the docked bar, the footer and the metadata together.
 */

/* `??` does NOT catch an empty string, and .env.example ships every key blank.
   So a copied-but-unfilled .env.local would give Number('') === 0: a page
   advertising ₹0 and a Razorpay order for zero paise, with nothing throwing.
   Guard on a positive number, not on null. */
const RAW_PRICE = Number(process.env.NEXT_PUBLIC_PRICE_RUPEES);
export const PRICE_RUPEES = Number.isFinite(RAW_PRICE) && RAW_PRICE > 0 ? RAW_PRICE : 497;
export const PRICE_PAISE = PRICE_RUPEES * 100;
export const PRICE = `₹${PRICE_RUPEES.toLocaleString('en-IN')}`;

/** The anchor the announcement bar names. Rising, per the source copy. */
export const PRICE_RISES_TO = '₹1799';

export const START_DATE = '21st October';
export const SESSION_TIMES = '6AM & 7PM';

export const PRODUCT_NAME = '5-Day Music Therapy Practitioner Challenge';
/** The GA4 item id. One slug, read by the browser tracker and by the webhook's
 *  server-side purchase, so the two cannot describe different products. */
export const GA4_ITEM_ID = 'santosh-5day-music-therapy';
export const BRAND = 'Anahat Music Therapy';
export const GUIDE_NAME = 'Santosh Ghatpande';

/* Stat bar figures, all from the source copy. */
export const STUDENTS_TRAINED = '4000+';
export const YEARS_IN_FIELD = '15+ Years';
export const RECOGNITION_YEAR = 'SiliconIndia 2026';

/* The value-stack line items live in app/checkout/included.ts and the total is
   derived from them there, never typed. It comes to the ₹6,291 the source copy
   names. */

/**
 * The WhatsApp community invite. The thank-you page is built around joining it
 * as the single next step, so an empty value there shows the buyer a dead
 * button at the exact moment they have just paid.
 *
 * ⚠️ REQUIRED BEFORE LAUNCH. Create the group, take the invite link.
 */
export const WHATSAPP_INVITE = process.env.NEXT_PUBLIC_WHATSAPP_INVITE ?? '';

/** The next click is a payment. Every CTA on the page, including the docked
 *  bar, points here. */
export const CHECKOUT_HREF = '/checkout';

/** The CTA label and its reassurance line, as written in the source copy. */
export const CTA_LABEL = `Start Your 5-Day Music Therapy Challenge · ${PRICE}`;
export const CTA_NOTE = 'Join Risk-Free · 100% Money-Back Guarantee';
/** The sticky offer card and the Option 2 card carry their own labels. */
export const CTA_LABEL_STICKY = 'Reserve My Spot';
export const CTA_LABEL_OPTION = `Take Action · ${PRICE}`;
