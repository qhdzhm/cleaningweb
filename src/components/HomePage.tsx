"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowsClockwise,
  Bathtub,
  Bed,
  Broom,
  Buildings,
  CalendarBlank,
  CaretDown,
  ChatCircleText,
  CheckCircle,
  CookingPot,
  Desktop,
  ForkKnife,
  HouseLine,
  Info,
  Leaf,
  List,
  LockSimple,
  MapPin,
  Phone,
  ShieldCheck,
  Smiley,
  Sparkle,
  Toilet,
  Users,
  X,
  type Icon,
} from "@phosphor-icons/react";
import { supabase, type Booking } from "@/lib/supabase";
import { FAQS } from "@/lib/faq";
import { PHONE_DISPLAY, PHONE_HREF, SMS_DISPLAY, SMS_HREF } from "@/lib/contact";
import {
  describeExtras,
  estimatePrice,
  EXTRA_LABELS,
  EXTRA_PRICES,
  FREQUENCY_LABELS,
  type Extras,
  type Frequency,
} from "@/lib/pricing";

// Same Web3Forms inbox the quote form has always posted to.
const WEB3FORMS_KEY = "1e9599d5-9e74-4c7d-85f4-66841f2a2e99";

// Only a standard home clean can be priced from a formula. Bond cleans, turnovers
// and commercial sites vary too much, so those route to a callback instead.
const SERVICE_OPTIONS = [
  { value: "home", label: "Home cleaning", category: "residential", priced: true },
  { value: "end-of-lease", label: "End of lease / bond clean", category: "residential", priced: false },
  { value: "airbnb", label: "Airbnb turnover", category: "airbnb", priced: false },
  { value: "commercial", label: "Commercial / office", category: "commercial", priced: false },
] as const;

type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

// Each card links to its own landing page — the homepage alone can't rank for
// every service, and these are the only internal links those pages get.
const SERVICE_CARDS = [
  { title: "Home cleaning", href: "/house-cleaning-hobart", image: "/images/service-home.webp", icon: HouseLine },
  { title: "Commercial & office", href: "/commercial-cleaning-hobart", image: "/images/service-commercial.webp", icon: Buildings },
  { title: "Airbnb turnover", href: "/airbnb-cleaning-hobart", image: "/images/service-lease.webp", icon: Sparkle },
];

const AREAS = ["Hobart", "Sandy Bay", "Glenorchy", "Kingston", "Moonah", "New Town", "Bellerive", "Howrah", "Lindisfarne"];

const GOOGLE_REVIEW_URL = "https://g.page/r/CZKCYhr_fkF3EBM/review";

/**
 * Printed material (letterbox DL, magnets, car signage) carries a QR pointing at
 * `/?src=…`. Stapling that onto the booking means the admin list shows which
 * drop produced a lead, without paying for an analytics product. Sanitised
 * because it lands in a free-text note field.
 */
function leadSource(): string | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("src");
  const clean = raw?.replace(/[^\w-]/g, "").slice(0, 40);
  return clean || null;
}

/**
 * Real Google reviews, trimmed for length. Excerpts only — wording is verbatim
 * and "…" marks anything left out. Update the rating line if the count changes.
 */
const REVIEWS = [
  {
    name: "苏布尔嘎",
    quote:
      "Everything was done to a high standard — bathrooms spotless, floors looking great, and all the little details were taken care of. … It's honestly such a relief to find a reliable cleaning service.",
  },
  {
    name: "Annie W",
    quote:
      "Maria did an incredible job on our 3-bedroom home. Very professional, arrived on time, and used eco-friendly products which is perfect for our kids.",
  },
];

type ChecklistTab = "residential" | "commercial" | "airbnb";
type ChecklistArea = { title: string; icon: Icon; items: string[] };

const CHECKLIST: Record<ChecklistTab, { label: string; blurb: string; areas: ChecklistArea[] }> = {
  residential: {
    label: "Residential",
    blurb: "Our standard maintenance clean covers all the essential areas of your home.",
    areas: [
      {
        title: "Kitchen",
        icon: CookingPot,
        items: [
          "Benchtops & splashback wiped",
          "Stovetop cleaned",
          "Sink & tapware polished",
          "Exterior of appliances",
          "Floor vacuumed & mopped",
        ],
      },
      {
        title: "Bathroom",
        icon: Bathtub,
        items: [
          "Shower, bath & screen descaled",
          "Toilet sanitized inside & out",
          "Vanity & mirror polished",
          "Tapware shined",
          "Floor mopped",
        ],
      },
      {
        title: "Living & Bedrooms",
        icon: Bed,
        items: [
          "All surfaces dusted",
          "Mirrors polished",
          "Cobwebs removed",
          "Carpets vacuumed",
          "Hard floors mopped",
        ],
      },
    ],
  },
  commercial: {
    label: "Office / Commercial",
    blurb: "Create a productive, professional environment for your team and clients.",
    areas: [
      {
        title: "Workstations",
        icon: Desktop,
        items: [
          "Desks wiped down",
          "Monitors & keyboards dusted",
          "Chairs vacuumed",
          "Phones sanitized",
          "Bins emptied & lined",
        ],
      },
      {
        title: "Common Areas",
        icon: Users,
        items: [
          "Reception area detailing",
          "Kitchenette cleaning",
          "Meeting rooms organized",
          "Floors vacuumed & mopped",
          "Door handles sanitized",
        ],
      },
      {
        title: "Restrooms",
        icon: Toilet,
        items: [
          "Toilets & urinals sanitized",
          "Sinks & mirrors polished",
          "Consumables restocked",
          "Floors mopped & disinfected",
          "Air freshened",
        ],
      },
    ],
  },
  airbnb: {
    label: "Airbnb / End of Lease",
    blurb: "Hotel-standard preparation for your next guest. We help you get 5-star reviews.",
    areas: [
      {
        title: "Changeover",
        icon: ArrowsClockwise,
        items: [
          "Bed linen changed",
          "Towels replaced",
          "Laundry started (if onsite)",
          "Welcome pack presentation",
          "Damage check & report",
        ],
      },
      {
        title: "Kitchen & Dining",
        icon: ForkKnife,
        items: [
          "Fridge emptied & wiped",
          "Dishes washed & put away",
          "Coffee/Tea station restocked",
          "Oven checked",
          "Surfaces sanitized",
        ],
      },
      {
        title: "Deep Clean Items",
        icon: Broom,
        items: [
          "Inside drawers checked",
          "Under furniture vacuumed",
          "Windows spot cleaned",
          "High dusting",
          "Skirting boards wiped",
        ],
      },
    ],
  },
};

type Panel = "service" | "details" | "contact";

/** Renders desktop-first so SSR and the first client paint agree. */
function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [checklistTab, setChecklistTab] = useState<ChecklistTab>("residential");
  const isMobile = useIsMobile();

  // quote form
  const [service, setService] = useState<ServiceValue>("home");
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [frequency, setFrequency] = useState<Frequency>("fortnightly");
  const [extras, setExtras] = useState<Extras>({ oven: false, windows: false, fridge: false });
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [name, setName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const selected = SERVICE_OPTIONS.find((s) => s.value === service)!;
  const priced = selected.priced;

  const { min, max } = useMemo(
    () => estimatePrice({ bedrooms, bathrooms, frequency, extras }),
    [bedrooms, bathrooms, frequency, extras]
  );

  // Contact is always the last step. The pricing questions only exist for jobs we
  // can actually price — otherwise step 1 would ask a lot and reward nothing.
  const steps: Panel[][] = useMemo(() => {
    if (!priced) return [["service"], ["contact"]];
    return isMobile ? [["service"], ["details"], ["contact"]] : [["service", "details"], ["contact"]];
  }, [priced, isMobile]);

  // Switching service (or resizing across the breakpoint) can shorten the flow.
  useEffect(() => {
    setStep((s) => Math.min(s, steps.length - 1));
  }, [steps.length]);

  const shows = (panel: Panel) => steps[step]?.includes(panel) ?? false;
  const isLast = step === steps.length - 1;
  const STEP_TITLES = ["See your price", "How big is the place?", "Where do we send it?"];
  const title = priced && isMobile ? STEP_TITLES[step] : isLast ? "Almost done" : "Get your free quote";

  function resetQuote() {
    setSubmitted(false);
    setStep(0);
    setName("");
    setSuburb("");
    setPhone("");
  }

  async function submitQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError(false);

    const src = leadSource();

    const booking: Booking = {
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      service_category: selected.category,
      service_subtype: selected.value,
      address: suburb.trim(),
      status: "new",
      notes: src ? `Suburb: ${suburb.trim()} · Source: ${src}` : `Suburb: ${suburb.trim()}`,
    };

    if (priced) {
      booking.bedrooms = bedrooms;
      booking.bathrooms = bathrooms;
      booking.frequency = frequency;
      booking.extras = extras;
      booking.estimated_price_min = min;
      booking.estimated_price_max = max;
    }

    // The database is a convenience; the email IS the lead. Saving used to run
    // inside the same try as the notification, so a database outage threw before
    // the email was ever sent — the customer got an error and we never heard
    // about the enquiry at all. Keep the two independent.
    let savedId = "not-saved";
    try {
      const { data: saved, error: dbError } = await supabase
        .from("bookings")
        .insert(booking)
        .select()
        .single();
      if (dbError) throw dbError;
      savedId = saved?.id ?? "unknown";
    } catch (dbErr) {
      console.error("Booking not saved to the database — sending the email anyway:", dbErr);
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: "NaturePure Website",
          subject: priced
            ? `New quote — ${selected.label}, ${suburb.trim()} — Est. $${min}-$${max}${src ? ` [${src}]` : ""}`
            : `New enquiry — ${selected.label}, ${suburb.trim()}${src ? ` [${src}]` : ""}`,
          name: name.trim(),
          phone: phone.trim(),
          suburb: suburb.trim(),
          service: selected.label,
          details: priced ? `${bedrooms} bed / ${bathrooms} bath · ${FREQUENCY_LABELS[frequency]}` : "Requires custom quote",
          extras: priced ? describeExtras(extras) : "N/A",
          estimated_price: priced ? `$${min} - $${max}` : "Custom quote",
          booking_id: savedId,
          source: src ?? "website",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "Web3Forms rejected the submission");

      setSubmitted(true);
    } catch (err) {
      console.error("Quote submission failed:", err);
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="site-shell">
      {showPromo && (
        <div className="promo-bar">
          <strong>GRAND OPENING</strong>
          <span>20% off your first clean — limited time</span>
          <button className="promo-close" onClick={() => setShowPromo(false)} aria-label="Close promotion">
            <X size={16} />
          </button>
        </div>
      )}

      <header className="header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="NaturePure Cleaning home">
            <Leaf weight="duotone" />
            <span>NaturePure<small>CLEANING</small></span>
          </a>
          <nav className="nav" aria-label="Main navigation">
            <a href="#top">Home</a>
            <a href="#services">Services</a>
            <a href="#what-we-clean">Checklist</a>
            <a href="#reviews">Reviews</a>
            <Link href="/blog">Advice</Link>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn call-btn" href={PHONE_HREF}><Phone weight="fill" />Call {PHONE_DISPLAY}</a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={26} /> : <List size={26} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[["Home", "top"], ["Services", "services"], ["Checklist", "what-we-clean"], ["Reviews", "reviews"], ["FAQ", "faq"], ["Contact", "contact"]].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <Link href="/blog" onClick={() => setMenuOpen(false)}>Advice</Link>
            <a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
            <a href={SMS_HREF}>Text {SMS_DISPLAY}</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-copy-inner">
              <div className="eyebrow"><Leaf weight="fill" />Chemical-free cleaning across Hobart</div>
              <h1>Hobart&apos;s easier way to a beautifully clean space.</h1>
              <p className="hero-sub">
                Office, Airbnb and home cleaning — using only water and premium microfibre. No harsh chemicals, ever.
              </p>
              <div className="hero-trust">
                <div className="trust-item"><ShieldCheck weight="duotone" />Fully insured</div>
                <div className="trust-item"><CheckCircle weight="duotone" />Police checked</div>
                <div className="trust-item"><Smiley weight="duotone" />Satisfaction guaranteed</div>
              </div>
              <div className="hero-actions">
                <a href="#quote" className="btn btn-primary">See my price<ArrowRight /></a>
                <a href={PHONE_HREF} className="btn"><Phone />Call {PHONE_DISPLAY}</a>
              </div>
              <a href={SMS_HREF} className="hero-sms">
                <ChatCircleText weight="fill" />Prefer to text? {SMS_DISPLAY}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/hero.webp"
              alt="NaturePure cleaner working in a bright Hobart home"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 49vw"
            />
          </div>

          <form id="quote" className="quote-card" onSubmit={submitQuote}>
            {submitted ? (
              <div className="quote-success">
                <CheckCircle weight="duotone" />
                <div>
                  <h2>Thanks — we&apos;ve got it.</h2>
                  {/* The enquiry now lives in one place: the inbox. Give a time
                      expectation and a direct line, so nobody is left wondering
                      whether the form actually worked. */}
                  <p>
                    We&apos;ll text or call you within a few hours to confirm your clean.
                    In a hurry? Text us on {SMS_DISPLAY}.
                  </p>
                  <a className="btn" href={SMS_HREF}>Text {SMS_DISPLAY}</a>
                  <button className="btn" type="button" onClick={resetQuote}>Send another request</button>
                </div>
              </div>
            ) : (
              <>
                <div className="quote-head">
                  <h2>{title}</h2>
                  <span className="step-count">Step {step + 1} of {steps.length}</span>
                </div>
                <div className="step-bar"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>

                {shows("service") && (
                  <div className="field">
                    <label htmlFor={isMobile ? undefined : "service"}>What do you need cleaned?</label>
                    {/* Mobile gets its own step for this, so big tap targets fit. On desktop
                        it shares a step with the pricing questions — a select keeps it short. */}
                    {isMobile ? (
                      <div className="service-picker">
                        {SERVICE_OPTIONS.map((o) => (
                          <button
                            type="button"
                            key={o.value}
                            className="service-option"
                            aria-pressed={service === o.value}
                            onClick={() => setService(o.value)}
                          >
                            {o.label}
                            {service === o.value && <CheckCircle weight="fill" size={16} />}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value as ServiceValue)}>
                        {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    )}
                  </div>
                )}

                {shows("details") && (
                  <>
                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="bedrooms">Bedrooms</label>
                        <div className="stepper">
                          <button type="button" onClick={() => setBedrooms((n) => Math.max(1, n - 1))} disabled={bedrooms <= 1} aria-label="Fewer bedrooms">−</button>
                          <span id="bedrooms">{bedrooms}</span>
                          <button type="button" onClick={() => setBedrooms((n) => Math.min(6, n + 1))} disabled={bedrooms >= 6} aria-label="More bedrooms">+</button>
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="bathrooms">Bathrooms</label>
                        <div className="stepper">
                          <button type="button" onClick={() => setBathrooms((n) => Math.max(1, n - 1))} disabled={bathrooms <= 1} aria-label="Fewer bathrooms">−</button>
                          <span id="bathrooms">{bathrooms}</span>
                          <button type="button" onClick={() => setBathrooms((n) => Math.min(4, n + 1))} disabled={bathrooms >= 4} aria-label="More bathrooms">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="frequency">How often?</label>
                      <select id="frequency" name="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)}>
                        {(Object.keys(FREQUENCY_LABELS) as Frequency[]).map((f) => (
                          <option key={f} value={f}>{FREQUENCY_LABELS[f]}</option>
                        ))}
                      </select>
                    </div>

                    <button type="button" className="extras-toggle" aria-expanded={extrasOpen} onClick={() => setExtrasOpen((o) => !o)}>
                      <CaretDown weight="bold" size={12} />
                      {extrasOpen ? "Hide extras" : "Add extras (oven, windows, fridge)"}
                    </button>

                    {extrasOpen && (
                      <div className="extras-list">
                        {(Object.keys(EXTRA_LABELS) as (keyof Extras)[]).map((key) => (
                          <label className="extra-row" key={key}>
                            <input
                              type="checkbox"
                              checked={extras[key]}
                              onChange={(e) => setExtras((prev) => ({ ...prev, [key]: e.target.checked }))}
                            />
                            {EXTRA_LABELS[key]}
                            <span className="price">+${EXTRA_PRICES[key]}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    <div className="price-box">
                      <div>
                        <div className="price-label">Estimated</div>
                        <p className="price-note">per clean · {FREQUENCY_LABELS[frequency].replace(/ \(.*\)/, "")}</p>
                      </div>
                      <div className="price-value">${min} – ${max}</div>
                    </div>
                  </>
                )}

                {shows("service") && !priced && (
                  <div className="price-box custom">
                    <div>
                      <div className="price-label">Custom quote</div>
                      <p className="price-note">Every {selected.label.toLowerCase()} job is different — we&apos;ll price it properly and call you back.</p>
                    </div>
                  </div>
                )}

                {shows("contact") && (
                  <>
                    {/* Keep the number they just earned in view while they hand over details. */}
                    <div className="quote-recap">
                      <span>{selected.label}{priced && ` · ${bedrooms} bed / ${bathrooms} bath`}</span>
                      <strong>{priced ? `$${min} – $${max}` : "Custom quote"}</strong>
                    </div>

                    <div className="field">
                      <label htmlFor="name">Your name</label>
                      <input id="name" name="name" required autoComplete="name" placeholder="e.g. Sarah" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="field-row">
                      <div className="field">
                        <label htmlFor="suburb">Suburb</label>
                        <input id="suburb" name="suburb" required placeholder="e.g. Sandy Bay" value={suburb} onChange={(e) => setSuburb(e.target.value)} />
                      </div>
                      <div className="field">
                        <label htmlFor="phone">Mobile</label>
                        <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="0412 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                <div className="quote-actions">
                  {step > 0 && (
                    <button type="button" className="btn btn-back" onClick={() => setStep((s) => s - 1)}>Back</button>
                  )}
                  {isLast ? (
                    <button className="btn btn-primary" type="submit" disabled={sending}>
                      {sending ? "Sending…" : <>Get this quote<ArrowRight /></>}
                    </button>
                  ) : (
                    <button className="btn btn-primary" type="button" onClick={() => setStep((s) => s + 1)}>
                      Continue<ArrowRight />
                    </button>
                  )}
                </div>

                {error && <p className="form-error">Something went wrong. Please call {PHONE_DISPLAY} or text {SMS_DISPLAY} instead.</p>}
                {shows("contact") && <p className="privacy"><LockSimple />Your details are safe and never shared.</p>}
              </>
            )}
          </form>
        </section>

        <section className="services" id="services">
          <div className="container">
            <div className="eyebrow"><Leaf weight="fill" />Our services</div>
            <h2 className="section-title">Professional cleaning for every space.</h2>
            <div className="services-grid">
              {SERVICE_CARDS.map(({ title, href, image, icon: Icon }) => (
                <Link href={href} className="service-item" key={title}>
                  <div className="service-img"><Image src={image} alt={title} width={800} height={500} /></div>
                  <div className="service-icon"><Icon weight="duotone" /></div>
                  <div className="service-body"><span>{title}</span><ArrowRight /></div>
                </Link>
              ))}
            </div>
            <p className="services-more">
              Moving out? See our{" "}
              <Link href="/end-of-lease-cleaning-hobart">end of lease cleaning in Hobart</Link>.
            </p>
          </div>
        </section>

        <section className="proof" id="about">
          <div className="container proof-grid">
            <div className="proof-copy">
              <div className="eyebrow"><Leaf weight="fill" />Proof you can see</div>
              <h2 className="section-title">Real results. Every time.</h2>
              <p>
                No harsh chemicals — just water, premium microfibre and proper technique. Safe for kids, pets and
                workspaces, and you&apos;ll notice the difference straight away.
              </p>
              <a href="#quote" className="btn">Get my quote<ArrowRight /></a>
            </div>
            <div className="proof-media">
              <Image src="/images/before-after-cooktop.webp" alt="Cooktop before and after NaturePure Cleaning" width={1200} height={650} />
              <div className="media-labels"><span>Before</span><span>After</span></div>
            </div>
          </div>
        </section>

        <section className="checklist" id="what-we-clean">
          <div className="container">
            <div className="eyebrow"><Leaf weight="fill" />Detailed checklist</div>
            <h2 className="section-title">What we clean</h2>
            <div className="checklist-tabs" role="tablist">
              {(Object.keys(CHECKLIST) as ChecklistTab[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={checklistTab === tab}
                  onClick={() => setChecklistTab(tab)}
                >
                  {CHECKLIST[tab].label}
                </button>
              ))}
            </div>
            <p className="checklist-blurb">{CHECKLIST[checklistTab].blurb}</p>
            <div className="checklist-cards">
              {CHECKLIST[checklistTab].areas.map(({ title, icon: AreaIcon, items }) => (
                <div className="checklist-card" key={title}>
                  <div className="checklist-card-head">
                    <span className="checklist-card-icon"><AreaIcon weight="duotone" /></span>
                    <h3>{title}</h3>
                  </div>
                  <ul>
                    {items.map((item) => (
                      <li key={item}><CheckCircle weight="fill" size={15} />{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="checklist-note">
              <Info weight="duotone" size={15} />
              Need something specific? We can customize any checklist to meet your exact requirements.
            </p>
          </div>
        </section>

        <section className="process" id="why-us">
          <div className="container">
            <div className="eyebrow"><Leaf weight="fill" />Our simple process</div>
            <h2 className="section-title">Clean spaces. Zero stress.</h2>
            <div className="steps">
              <div className="step">
                <span className="step-num">1</span>
                <span className="step-icon"><CalendarBlank weight="duotone" /></span>
                <div><h3>See your price</h3><p>Tell us what you need cleaned and where. It takes 30 seconds.</p></div>
              </div>
              <div className="step">
                <span className="step-num">2</span>
                <span className="step-icon"><Sparkle weight="duotone" /></span>
                <div><h3>We do the hard work</h3><p>Our insured, police-checked team arrives on time and fully equipped.</p></div>
              </div>
              <div className="step">
                <span className="step-num">3</span>
                <span className="step-icon"><HouseLine weight="duotone" /></span>
                <div><h3>Love your space</h3><p>Enjoy a beautifully clean space and more time for what matters.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="reviews" id="reviews">
          <div className="container reviews-grid">
            <div className="reviews-intro">
              <div className="eyebrow"><Leaf weight="fill" />Loved by locals</div>
              <h2>What our clients say</h2>
            </div>
            {REVIEWS.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>{review.quote}</blockquote>
                <cite>— {review.name} · Google</cite>
              </article>
            ))}
            <article className="review-card review-cta">
              <Smiley weight="duotone" />
              <h3>Cleaned with us?</h3>
              <p>A quick review helps other Hobart locals find us.</p>
              {GOOGLE_REVIEW_URL && (
                <a className="btn" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                  Leave a review<ArrowRight />
                </a>
              )}
            </article>
          </div>
        </section>

        <section className="areas">
          <div className="container areas-grid">
            <h2>Proudly cleaning homes and businesses across Hobart and nearby suburbs.</h2>
            <div className="area-list">{AREAS.map((area) => <span key={area}><MapPin weight="fill" />{area}</span>)}</div>
            <a href="#quote" className="text-link">Check your suburb<ArrowRight /></a>
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="container faq-grid">
            <div>
              <div className="eyebrow"><Leaf weight="fill" />FAQ</div>
              <h2>Common questions</h2>
            </div>
            <div className="faq-list">
              {FAQS.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}<CaretDown /></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="footer-cta" id="contact">
          <div className="container footer-grid">
            <h2>Ready for a cleaner space?</h2>
            <p>Get an instant price in 30 seconds, or call and we&apos;ll sort it out on the phone. Texts are fine too.</p>
            <div className="footer-actions">
              <a href="#quote" className="btn btn-primary">See my price<ArrowRight /></a>
              <a href={PHONE_HREF} className="btn"><Phone weight="fill" />Call {PHONE_DISPLAY}</a>
              <a href={SMS_HREF} className="btn"><ChatCircleText weight="fill" />Text {SMS_DISPLAY}</a>
            </div>
          </div>
          <div className="container footer-legal">
            <span>&copy; {new Date().getFullYear()} NaturePure Cleaning</span>
            <span>ABN 89 629 311 900</span>
            <span>Fully insured · Hobart, Tasmania</span>
          </div>
        </section>
      </main>
    </div>
  );
}
