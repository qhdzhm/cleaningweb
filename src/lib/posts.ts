/**
 * Blog content lives here as data rather than MDX — it keeps the build
 * dependency-free and every post is typed, so a missing date or description
 * (both of which SEO depends on) is a compile error rather than a silent gap.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** Used for <title>. Keep under ~60 chars. */
  seoTitle: string;
  /** Used for meta description. Keep under ~155 chars. */
  description: string;
  /** ISO date. Drives sitemap lastmod and BlogPosting datePublished. */
  date: string;
  updated?: string;
  readingMinutes: number;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "house-cleaning-cost-hobart",
    title: "What does house cleaning actually cost in Hobart?",
    seoTitle: "House Cleaning Prices in Hobart (2026 Guide)",
    description:
      "A straight answer on Hobart house cleaning prices: what drives the number, what a typical 3-bedroom clean costs, and why most quotes are a range.",
    date: "2026-07-15",
    readingMinutes: 5,
    body: [
      {
        type: "p",
        text: "Most cleaning websites in Hobart won't show you a price. You fill in a form, wait a day, and get a number with no explanation. We'd rather just tell you how the maths works, so you can sanity-check any quote you get — ours included.",
      },
      { type: "h2", text: "The short answer" },
      {
        type: "p",
        text: "For a standard maintenance clean on a regular schedule in Hobart, most homes land between about $115 and $210 per visit. A one-bedroom unit can come in under that. A four-bedroom house with two bathrooms sits at the top of it. One-off cleans cost more than the same house on a regular schedule, and end-of-lease jobs are priced separately again — we'll get to why.",
      },
      { type: "h2", text: "What actually drives the price" },
      {
        type: "p",
        text: "Three things move the number more than anything else, and none of them are surprising once you see them written down.",
      },
      { type: "h3", text: "1. Bathrooms cost more than bedrooms" },
      {
        type: "p",
        text: "This catches people out. A bedroom is mostly floor and flat surfaces — quick to do well. A bathroom is grout, glass, tapware and a toilet, all of which need time and technique. In our own pricing a bathroom adds nearly twice what a bedroom does, and that ratio is fairly standard across the industry.",
      },
      { type: "h3", text: "2. How often you book" },
      {
        type: "p",
        text: "A home cleaned every fortnight never gets a chance to build up. The same house cleaned once a year is a different job entirely — same address, twice the work. That's why regular bookings are cheaper per visit: weekly saves around 15%, fortnightly around 10%. It isn't a loyalty gimmick; the job is genuinely smaller.",
      },
      { type: "h3", text: "3. The extras" },
      {
        type: "p",
        text: "Oven interiors, inside the fridge, and interior windows aren't part of a standard clean anywhere. They're slow, awkward jobs. Expect them to be quoted separately — an oven is typically the most expensive single add-on you'll see.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "Here's roughly what a few real Hobart homes look like on a fortnightly schedule, so you can find yourself on the list:",
      },
      {
        type: "table",
        head: ["Home", "Fortnightly clean"],
        rows: [
          ["2 bedroom unit, 1 bathroom", "$115 – $134"],
          ["3 bedroom house, 1 bathroom", "$132 – $154"],
          ["3 bedroom house, 2 bathrooms", "$162 – $189"],
          ["4 bedroom house, 2 bathrooms", "$179 – $208"],
        ],
      },
      {
        type: "p",
        text: "Add roughly $80 if you want the oven done, and about $40 each for interior windows or the fridge.",
      },
      { type: "h2", text: "Why is it always a range?" },
      {
        type: "p",
        text: "Because no two three-bedroom houses are the same. Ceiling height, how much is on the benches, whether there's a dog, how long since the last proper clean — all of it moves the time on site. Any cleaner who gives you an exact dollar figure sight-unseen is either padding it to be safe, or is going to ask for more later. A range is the honest version.",
      },
      { type: "h2", text: "Why end-of-lease costs more" },
      {
        type: "p",
        text: "A bond clean isn't a bigger version of a regular clean — it's a different job with a different standard. You're cleaning inside cupboards, behind appliances, walls, tracks, and the oven, to a level a property manager will inspect against a checklist. It takes hours, not one visit. That's why we won't put a formula price on it: we'd rather look at the place and quote it properly than guess and argue later.",
      },
      { type: "h2", text: "Questions worth asking any Hobart cleaner" },
      {
        type: "ul",
        items: [
          "Are you insured, and are your cleaners police checked?",
          "Is the price per visit or per hour — and what happens if it takes longer?",
          "What's actually included, in writing?",
          "Do you bring your own equipment and products?",
          "What happens if I'm not happy with the result?",
        ],
      },
      {
        type: "callout",
        text: "Our quote form gives you a price range in about 30 seconds — no email required, no waiting for a callback.",
      },
    ],
  },
  {
    slug: "end-of-lease-cleaning-checklist-hobart",
    title: "End of lease cleaning in Hobart: the checklist that gets your bond back",
    seoTitle: "End of Lease Cleaning Checklist (Hobart Bond Guide)",
    description:
      "What Hobart property managers actually inspect at the final check, room by room — plus the five things that most often cost tenants part of their bond.",
    date: "2026-07-15",
    readingMinutes: 7,
    body: [
      {
        type: "p",
        text: "Bond disputes in Tasmania are rarely about big dramatic damage. They're about an oven that wasn't done properly, a shower screen with water marks, and dust in the window tracks. Small things, inspected closely, at the worst possible moment — when you've already moved out and you're tired.",
      },
      {
        type: "p",
        text: "Here's what actually gets looked at, and where people lose money.",
      },
      { type: "h2", text: "The five things that most often cost you" },
      {
        type: "ul",
        items: [
          "The oven — by a distance the number one issue. Racks, glass, and the seal, not just a wipe of the front.",
          "Shower screens — soap scum and hard water marks show up under an inspector's torch even when the glass looks fine to you.",
          "Window tracks and flyscreens — almost nobody thinks of these until they're pointed out on the report.",
          "Skirting boards and door frames — dust sits on the top edge where you don't look.",
          "Inside cupboards and drawers — crumbs in an empty kitchen drawer is a classic fail.",
        ],
      },
      { type: "h2", text: "Kitchen" },
      {
        type: "ul",
        items: [
          "Oven cleaned inside — racks, trays, glass door and the door seal",
          "Rangehood and filter degreased",
          "Cooktop and splashback, including behind the knobs",
          "All cupboards and drawers emptied, vacuumed and wiped inside and out",
          "Benchtops and sink, tapware descaled and polished",
          "Dishwasher filter and seal",
          "Behind and beside the fridge and oven where they can be moved safely",
        ],
      },
      { type: "h2", text: "Bathroom and laundry" },
      {
        type: "ul",
        items: [
          "Shower screen descaled — glass, frame and the track at the bottom",
          "Grout and tiles scrubbed",
          "Toilet cleaned inside and out, including the base and behind the seat hinges",
          "Vanity, mirror and tapware polished",
          "Exhaust fan cover dusted",
          "Laundry tub and behind the machine",
        ],
      },
      { type: "h2", text: "Living areas and bedrooms" },
      {
        type: "ul",
        items: [
          "Walls spot-cleaned for marks and scuffs",
          "Skirting boards, door frames and doors wiped — including the top edges",
          "Light switches and power points",
          "Built-in wardrobes vacuumed and wiped inside, including shelves and rails",
          "Ceiling fans and light fittings dusted",
          "Cobwebs removed from corners and cornices",
          "Carpets vacuumed thoroughly; hard floors mopped",
        ],
      },
      { type: "h2", text: "Windows and the bits everyone forgets" },
      {
        type: "ul",
        items: [
          "Interior glass cleaned",
          "Window tracks vacuumed then wiped",
          "Flyscreens dusted or washed",
          "Sliding door tracks",
          "Air conditioner filters",
          "Balcony or courtyard swept",
        ],
      },
      { type: "h2", text: "About carpet cleaning" },
      {
        type: "p",
        text: "If your lease says the carpets must be professionally steam cleaned, a vacuum won't satisfy it — property managers usually want a receipt. Check your lease before you book anything, because paying for it twice is a miserable way to end a tenancy.",
      },
      { type: "h2", text: "Should you do it yourself?" },
      {
        type: "p",
        text: "You can. Plenty of people do, and if you're organised and have a spare weekend it can work out. Be honest with yourself about two things: the oven will take longer than you think, and you'll need to go back over the place with fresh eyes, because after eight hours you stop seeing dust.",
      },
      {
        type: "p",
        text: "The case for paying someone is mostly about risk. A bond is usually four weeks' rent. If a professional clean costs a fraction of that and removes the argument entirely, the maths tends to work — particularly if the agent is strict.",
      },
      { type: "h2", text: "Timing it properly" },
      {
        type: "p",
        text: "Clean after the furniture is out and before the final inspection — not the other way around. Book it in as soon as you know your move-out date; the end of the month is busy for every cleaner in Hobart, and the last week before Christmas is worse.",
      },
      {
        type: "callout",
        text: "Bond cleans aren't priced off a formula — every place is different. Tell us the address and the inspection date and we'll quote it properly.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function allPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}
