/**
 * The line items, and the one place they are defined.
 *
 * Values are numeric so the summary can sum them and show a real total rather
 * than a hard-coded string. These mirror the value stack on the landing page
 * exactly: if one changes, both must, or the checkout promises something the
 * page did not. The sum is the ₹6,291 the source copy names.
 */
export const RECAP: { title: string; value: number }[] = [
  { title: '5-Day Live Music Therapy Practitioner Challenge', value: 3500 },
  { title: '5 Curated Musical Tracks for Positivity', value: 997 },
  { title: 'Daily Musical Routine Plan', value: 797 },
  { title: 'Music Therapy Monetisation Blueprint', value: 997 },
];

export const VALUE_TOTAL = RECAP.reduce((n, r) => n + r.value, 0);

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
