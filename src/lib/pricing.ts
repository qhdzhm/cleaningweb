// Single source of truth for quote pricing.
// Numbers match the original calculator in CTASection (Hobart 2026 market reference).

export const PRICING = {
  BASE: 60, // kitchen + living areas
  PER_BED: 20,
  PER_BATH: 35,
  OVEN: 80,
  WINDOWS: 40,
  FRIDGE: 40,
} as const;

export type Frequency = "one-off" | "weekly" | "fortnightly" | "monthly";

export type Extras = {
  oven: boolean;
  windows: boolean;
  fridge: boolean;
};

export const EXTRA_LABELS: Record<keyof Extras, string> = {
  oven: "Oven deep clean",
  windows: "Interior windows",
  fridge: "Fridge inside & out",
};

export const EXTRA_PRICES: Record<keyof Extras, number> = {
  oven: PRICING.OVEN,
  windows: PRICING.WINDOWS,
  fridge: PRICING.FRIDGE,
};

const FREQUENCY_DISCOUNT: Record<Frequency, number> = {
  weekly: 0.85, // 15% off
  fortnightly: 0.9, // 10% off
  monthly: 1,
  "one-off": 1,
};

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  "one-off": "One-off clean",
  weekly: "Weekly (save 15%)",
  fortnightly: "Fortnightly (save 10%)",
  monthly: "Monthly",
};

export type QuoteInput = {
  bedrooms: number;
  bathrooms: number;
  frequency: Frequency;
  extras: Extras;
};

/**
 * Returns a deliberately fuzzy range rather than an exact figure, so the
 * published number can't be used to undercut us on an exact job.
 */
export function estimatePrice({ bedrooms, bathrooms, frequency, extras }: QuoteInput) {
  let subtotal = PRICING.BASE + bedrooms * PRICING.PER_BED + bathrooms * PRICING.PER_BATH;

  for (const key of Object.keys(extras) as (keyof Extras)[]) {
    if (extras[key]) subtotal += EXTRA_PRICES[key];
  }

  const final = subtotal * FREQUENCY_DISCOUNT[frequency];

  return {
    min: Math.floor(final * 0.95),
    max: Math.ceil(final * 1.1),
  };
}

export function describeExtras(extras: Extras): string {
  const picked = (Object.keys(extras) as (keyof Extras)[])
    .filter((k) => extras[k])
    .map((k) => `${EXTRA_LABELS[k]} (+$${EXTRA_PRICES[k]})`);
  return picked.length ? picked.join(", ") : "None";
}
