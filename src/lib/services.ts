/**
 * One landing page per service. The homepage can only rank for so many terms;
 * these target the specific things people actually search for.
 *
 * Each page must earn its place with real, distinct copy — near-duplicate pages
 * with a word swapped are treated as doorway pages and hurt the whole site.
 */

export type ServicePage = {
  slug: string;
  /** Nav / card label */
  short: string;
  h1: string;
  seoTitle: string;
  description: string;
  intro: string;
  /** Preselects the quote form. Matches SERVICE_OPTIONS in HomePage. */
  quoteValue: string;
  priced: boolean;
  includes: { title: string; items: string[] }[];
  pricing: string[];
  why: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  relatedPost?: { slug: string; label: string };
};

export const SERVICES: ServicePage[] = [
  {
    slug: "house-cleaning-hobart",
    short: "House cleaning",
    h1: "House cleaning in Hobart",
    seoTitle: "House Cleaning Hobart | Chemical-Free Home Cleaners",
    description:
      "Regular home cleaning across Hobart using only water and microfibre. Fully insured, police checked. See your price in 30 seconds — no callback needed.",
    intro:
      "A regular clean that keeps your home on top of itself, done with water and premium microfibre instead of a cupboard full of chemicals. Weekly, fortnightly or monthly — you pick the rhythm, we keep to it.",
    quoteValue: "home",
    priced: true,
    includes: [
      {
        title: "Kitchen",
        items: [
          "Benchtops and splashback wiped",
          "Stovetop cleaned",
          "Sink and tapware polished",
          "Exterior of appliances",
          "Floor vacuumed and mopped",
        ],
      },
      {
        title: "Bathroom",
        items: [
          "Shower, bath and screen descaled",
          "Toilet sanitised inside and out",
          "Vanity and mirror polished",
          "Tapware shined",
          "Floor mopped",
        ],
      },
      {
        title: "Living and bedrooms",
        items: [
          "All surfaces dusted",
          "Mirrors polished",
          "Cobwebs removed",
          "Carpets vacuumed",
          "Hard floors mopped",
        ],
      },
    ],
    pricing: [
      "Home cleaning is the one service we can price from a formula, because the variables are predictable: how many bedrooms, how many bathrooms, and how often we come.",
      "A two-bedroom unit on a fortnightly schedule starts around $115. A four-bedroom house with two bathrooms sits closer to $200. Booking regularly costs less per visit — weekly saves about 15%, fortnightly about 10% — because a home that's never allowed to build up is genuinely quicker to clean.",
      "Oven interiors, inside the fridge and interior windows aren't part of a standard clean anywhere. Add them if you want them; the quote form shows exactly what each one costs.",
    ],
    why: [
      {
        title: "No chemical smell in the house",
        text: "Water and premium microfibre lift dirt mechanically rather than dissolving it in something you'd rather your kids didn't breathe. Nothing lingering after we leave.",
      },
      {
        title: "The same team, not a rotating cast",
        text: "Regular clients get consistency. Someone who knows your place already doesn't need to be re-briefed every fortnight.",
      },
      {
        title: "Insured and police checked",
        text: "Every cleaner is police checked before they set foot in your home, and we're fully insured.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be home?",
        a: "No. Most of our regular clients give us access instructions and simply come home to a clean house.",
      },
      {
        q: "Do you bring your own equipment?",
        a: "Yes — equipment, microfibre and everything else. You don't need to supply anything.",
      },
      {
        q: "Can I skip a week?",
        a: "Of course. Let us know and we'll move it. There's no lock-in contract.",
      },
    ],
    relatedPost: {
      slug: "house-cleaning-cost-hobart",
      label: "What does house cleaning actually cost in Hobart?",
    },
  },
  {
    slug: "end-of-lease-cleaning-hobart",
    short: "End of lease",
    h1: "End of lease cleaning in Hobart",
    seoTitle: "End of Lease Cleaning Hobart | Bond Clean Specialists",
    description:
      "Bond cleaning in Hobart done to the standard property managers inspect against. We quote on the actual property, not a formula. Fully insured, police checked.",
    intro:
      "A bond clean isn't a bigger version of a regular clean — it's a different job, measured against a property manager's checklist rather than your own eyes. We clean to that standard, so the inspection is boring and you get your money back.",
    quoteValue: "end-of-lease",
    priced: false,
    includes: [
      {
        title: "Kitchen",
        items: [
          "Oven cleaned inside — racks, trays, glass and door seal",
          "Rangehood and filter degreased",
          "Cupboards and drawers vacuumed and wiped inside",
          "Behind and beside the fridge and oven where safe to move",
          "Benchtops, sink and tapware descaled",
        ],
      },
      {
        title: "Bathroom",
        items: [
          "Shower screen descaled — glass, frame and bottom track",
          "Grout and tiles scrubbed",
          "Toilet inside, outside, base and hinges",
          "Exhaust fan cover dusted",
          "Vanity, mirror and tapware polished",
        ],
      },
      {
        title: "Throughout",
        items: [
          "Walls spot-cleaned for marks and scuffs",
          "Skirting boards and door frames — including the top edges",
          "Built-in wardrobes vacuumed and wiped inside",
          "Window tracks vacuumed then wiped, flyscreens dusted",
          "Light switches, power points and ceiling fans",
        ],
      },
    ],
    pricing: [
      "We don't put a formula price on bond cleans, and we'd be suspicious of anyone who does. The number depends on the size of the place, how long since it was last cleaned properly, and how strict the agent is — none of which we can guess from a form.",
      "Tell us the address and the inspection date and we'll quote the actual property. The price we give you is the price you pay.",
      "Worth checking before you book anything: if your lease requires carpets to be professionally steam cleaned, that's a separate trade and the agent will usually want the receipt.",
    ],
    why: [
      {
        title: "We clean to the inspection, not to the eye",
        text: "Bonds are rarely lost over big things. They're lost over the oven door seal, the shower screen track, and dust on top of the skirting boards. That's where the time goes.",
      },
      {
        title: "Timed around your move-out",
        text: "We clean after the furniture is out and before the final inspection. Book early — the end of the month is the busiest week for every cleaner in Hobart.",
      },
      {
        title: "If the agent flags something, we come back",
        text: "Tell us within 24 hours of the inspection and we'll return and put it right at no extra cost.",
      },
    ],
    faqs: [
      {
        q: "Do you guarantee my bond back?",
        a: "No cleaner can honestly guarantee that — bond decisions cover damage, rent and repairs, not just cleaning. What we can promise is that if the agent flags a cleaning issue, we come back and fix it free.",
      },
      {
        q: "How long does a bond clean take?",
        a: "Hours, not one quick visit. A small unit might be half a day; a family home can take a full day with a team. We'll tell you when we quote.",
      },
      {
        q: "Do you do carpet steam cleaning?",
        a: "That's a separate trade. Check your lease — if it's required, book it alongside the clean and keep the receipt for the agent.",
      },
    ],
    relatedPost: {
      slug: "end-of-lease-cleaning-checklist-hobart",
      label: "The full end of lease checklist we work to",
    },
  },
  {
    slug: "airbnb-cleaning-hobart",
    short: "Airbnb turnover",
    h1: "Airbnb cleaning and turnovers in Hobart",
    seoTitle: "Airbnb Cleaning Hobart | Turnover Service for Hosts",
    description:
      "Reliable Airbnb turnover cleaning in Hobart — linen, restock, damage reporting, hotel-standard presentation. Built around same-day checkout and check-in windows.",
    intro:
      "Turnovers live or die on timing. Guests check out at 10, the next lot arrive at 2, and everything in between has to be right — because your rating depends on it. We work to that window.",
    quoteValue: "airbnb",
    priced: false,
    includes: [
      {
        title: "Changeover",
        items: [
          "Bed linen changed and beds styled",
          "Towels replaced",
          "Laundry started if onsite",
          "Welcome pack presentation",
          "Damage check and photo report",
        ],
      },
      {
        title: "Kitchen and dining",
        items: [
          "Fridge emptied and wiped",
          "Dishes washed and put away",
          "Coffee and tea station restocked",
          "Oven checked",
          "Surfaces sanitised",
        ],
      },
      {
        title: "Presentation",
        items: [
          "Inside drawers and cupboards checked for left-behind items",
          "Under furniture vacuumed",
          "Windows spot cleaned",
          "High dusting and skirting boards",
          "Final walk-through against your listing photos",
        ],
      },
    ],
    pricing: [
      "Turnovers are quoted per property, not per bedroom. Two apartments with identical floorplans can be completely different jobs depending on whether you supply linen, whether there's onsite laundry, and how much restocking is involved.",
      "Most hosts settle on a fixed per-turnover rate once we've seen the place. If you have multiple properties, tell us — routing several turnovers in the same trip brings the price down.",
      "We can hold a set of your linen and swap it out each visit if that's easier than running the machine between guests.",
    ],
    why: [
      {
        title: "We report damage before your guest does",
        text: "Every turnover includes a check with photos. You find out about the wine on the rug from us, not from a review.",
      },
      {
        title: "Nothing chemical for guests to smell",
        text: "Water and microfibre means no bleach smell greeting someone who just walked in from the airport. It reads as clean, not as covered up.",
      },
      {
        title: "Built for the checkout window",
        text: "Same-day turnarounds are the normal case, not a favour. Tell us your check-in time and we work backwards from it.",
      },
    ],
    faqs: [
      {
        q: "Can you do same-day turnovers?",
        a: "Yes — that's the standard job. Give us your checkout and check-in times and we'll fit the turnover between them.",
      },
      {
        q: "Do you supply linen?",
        a: "We can hold and rotate a set of your linen, or work with what's onsite. Whichever suits your setup.",
      },
      {
        q: "What if a guest leaves the place in a state?",
        a: "We'll photograph it, tell you before we start, and let you decide. You shouldn't find out from the next guest's review.",
      },
    ],
  },
  {
    slug: "commercial-cleaning-hobart",
    short: "Commercial & office",
    h1: "Commercial and office cleaning in Hobart",
    seoTitle: "Commercial Cleaning Hobart | Office & Retail Cleaners",
    description:
      "After-hours office, retail and strata cleaning in Hobart. Chemical-free, fully insured, police-checked cleaners. Quoted on your site, not a per-desk formula.",
    intro:
      "Your team notices a clean office the way they notice good lighting — only when it's missing. We work after hours, to a fixed scope, so the place is simply right every morning.",
    quoteValue: "commercial",
    priced: false,
    includes: [
      {
        title: "Workstations",
        items: [
          "Desks wiped down",
          "Monitors and keyboards dusted",
          "Chairs vacuumed",
          "Phones sanitised",
          "Bins emptied and lined",
        ],
      },
      {
        title: "Common areas",
        items: [
          "Reception detailing",
          "Kitchenette cleaned",
          "Meeting rooms reset",
          "Floors vacuumed and mopped",
          "Door handles sanitised",
        ],
      },
      {
        title: "Restrooms",
        items: [
          "Toilets and urinals sanitised",
          "Sinks and mirrors polished",
          "Consumables restocked",
          "Floors mopped and disinfected",
          "Air freshened",
        ],
      },
    ],
    pricing: [
      "Commercial work is quoted on your site. Floor area matters, but so does what's on it — a fifteen-desk office with one kitchenette is a different job to a clinic with the same footprint.",
      "We'll walk the space, agree a scope in writing, and price it per visit. No hourly rates that quietly expand, and no surprise invoices.",
      "Most clients run nightly or three-times-weekly. Retail and hospitality usually want daily. Tell us what the space needs and we'll build the schedule around your hours.",
    ],
    why: [
      {
        title: "Chemical-free matters more with staff around",
        text: "Nobody wants to start the day in an office that smells like a hospital corridor. Water and microfibre leaves no residue and no fumes for people with asthma or sensitivities.",
      },
      {
        title: "After hours, with keys and alarms handled properly",
        text: "We work around your trading hours. Access, alarm codes and keys are managed formally, and every cleaner is police checked.",
      },
      {
        title: "A scope you can actually hold us to",
        text: "You get the checklist in writing. If something on it isn't done, that's on us — not a debate about what 'a clean' means.",
      },
    ],
    faqs: [
      {
        q: "Can you clean outside business hours?",
        a: "Yes — most of our commercial work is after hours or early morning, so your team never works around us.",
      },
      {
        q: "Are you insured for commercial premises?",
        a: "Yes, fully insured, and every cleaner is police checked before they're given site access.",
      },
      {
        q: "Do you do strata and common areas?",
        a: "Yes — lobbies, corridors, lifts, bin rooms and shared facilities. Tell us the building and we'll take a look.",
      },
    ],
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
