/**
 * Single source for the FAQ. The page and the FAQPage structured data both read
 * from here — Google penalises schema whose answers don't match what's on the
 * page, and hand-copying them into two places is how that drift starts.
 */
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "How much does cleaning cost?",
    a: "Use the quote form at the top — a standard home clean gives you an instant price range. Bond cleans, Airbnb turnovers and commercial sites are quoted individually.",
  },
  {
    q: "Do you really use no chemicals?",
    a: "For everyday cleaning we use only water and premium microfibre. It's safer for kids, pets and staff, and it works.",
  },
  {
    q: "Are you insured?",
    a: "Yes — we're fully insured and every cleaner is police checked before they set foot in your space.",
  },
  {
    q: "What areas do you service?",
    a: "Hobart and surrounding suburbs, including Sandy Bay, Glenorchy, Kingston, Moonah, Bellerive and Howrah. Not sure? Just ask.",
  },
  {
    q: "Do I need to be home?",
    a: "No. Many clients give us access instructions and come home to a clean space.",
  },
  {
    q: "What if I'm not happy?",
    a: "Tell us within 24 hours and we'll come back and put it right at no extra cost.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
