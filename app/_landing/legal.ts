/**
 * The business facts every legal page needs.
 *
 * Collected here rather than scattered through three pages so it is one edit,
 * and so a placeholder cannot hide in a paragraph.
 *
 * ⚠️ EVERY `[TODO]` BELOW IS A LAUNCH BLOCKER AND RENDERS ON THE LIVE PAGE.
 * None of them may be invented. These strings appear in the footer of EVERY
 * page (landing, checkout, thank-you) and inside sentences on all three policy
 * pages, and the payment gateway's merchant review checks for the entity, the
 * address, the phone and the email on the site itself rather than buried in a
 * policy page: a reviewer who cannot find them fails the account rather than
 * writing to ask.
 *
 * `brand`, `product` and the disclaimer at the bottom ARE this client's and are
 * correct: they come verbatim from COPY-SOURCE.md.
 */
export const LEGAL = {
  /** ⚠️ The LEGAL person: the proprietor's name, or the Pvt Ltd / LLP name as
   *  registered. This is what has to match the PAN and the Razorpay merchant
   *  record. */
  entity: 'Anahat Transformations LLP',
  /** The name the BUYER recognises. Two fields, never one: collapsing them gets
   *  one of the two audiences wrong. */
  tradeName: 'Anahat Music Therapy',
  /* The legal STRUCTURE, which the terms page names in its opening sentence.
     Asserting the wrong one is not cosmetic: it decides who the counterparty
     is, who carries the liability, and which name has to match the PAN.

     DELIBERATELY EMPTY, not unfinished. Empty is the one safe value while it is
     unknown: the terms page reads `LEGAL_STRUCTURE_KNOWN` below and runs its
     opening sentence WITHOUT naming a structure, which asserts nothing untrue.
     A bracketed placeholder rendered into the middle of a contractual sentence
     would be worse than the sentence not making the claim.

     To fill it, use the phrase as it should READ in a sentence, lower case:
     'sole proprietor', 'a partnership firm', 'a private limited company'. */
  structure: 'a limited liability partnership',
  /** Full registered address including PIN. */
  address: 'F No 5/6 Latakunj Apts Chintamani Soc Karvenagar Pune 411052, Maharashtra',
  /** A monitored number, in the form it should be read as. */
  phone: '8010891765',
  /** The same number, digits and + only, for the tel: href. */
  phoneHref: '+918010891765',
  /** Refund and data requests land here. Must be a real monitored inbox. */
  email: 'listen@anahatmusictherapy.com',
  /** ⚠️ The seat of the district court covering the registered address. Confirm
   *  rather than infer: the client may prefer a specific forum. */
  jurisdiction: 'Pune, Maharashtra',
  /** ⚠️ The date the policies are published under. A policy dated before it was
   *  published is the kind of detail a dispute picks at. */
  effectiveDate: '5 October 2026',

  /* ── this client's, verbatim from the copy source ───────────────────────── */
  brand: 'Anahat Music Therapy',
  product: '5-Day Music Therapy Practitioner Challenge',
} as const;

/**
 * Has the legal structure actually been answered?
 *
 * The terms page names the structure in its opening sentence, and that
 * sentence is a contractual statement about who the buyer's counterparty is.
 * While this is false the sentence runs WITHOUT a structure, which is accurate
 * and asserts nothing untrue. It stays a launch blocker either way; this only
 * decides how the page reads until it is answered.
 */
export const LEGAL_STRUCTURE_KNOWN = LEGAL.structure.trim().length > 0;

/**
 * THE DISCLAIMER, verbatim from COPY-SOURCE.md.
 *
 * This is the client's own wording and it is legal copy: do not reword it, do
 * not split it, and do not let it drift between pages, which is the whole
 * reason it lives as one string. It is landing-page copy that also has to
 * appear on the checkout and the thank-you page, so it is defined here and
 * rendered by the shared footer.
 */
export const LEGAL_DISCLAIMER =
  'All content, live sessions, exercises and resources are for educational and general wellbeing purposes only. This is not medical advice and does not diagnose, treat, cure or prevent any disease. Music therapy may complement, but does not replace, care from a qualified healthcare professional. Do not stop, reduce or alter prescribed medication or treatment without medical guidance. Individual experiences and results vary based on health history, participation, consistency and application. Testimonials reflect individual experiences and do not guarantee similar results. Participation in this 5-day challenge does not qualify or certify you as a professional music therapy practitioner. Further training, assessment and certification may be required for professional practice. This website is not affiliated with or endorsed by Meta. FACEBOOK and INSTAGRAM are trademarks of Meta Platforms, Inc.';
