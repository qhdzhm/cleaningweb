import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/SiteChrome";
import { PHONE_DISPLAY, PHONE_E164, PHONE_HREF, SMS_DISPLAY, SMS_HREF, SITE } from "@/lib/contact";
import { SERVICES, getService } from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = `${SITE}/${service.slug}`;
  return {
    title: service.seoTitle,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      title: service.seoTitle,
      description: service.description,
      url,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${SITE}/${service.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.description,
    serviceType: service.short,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: "NaturePure Cleaning",
      "@id": SITE,
      telephone: PHONE_E164,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hobart",
        addressRegion: "TAS",
        addressCountry: "AU",
      },
    },
    areaServed: { "@type": "City", name: "Hobart" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: service.short, item: url },
    ],
  };

  return (
    <SiteChrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="svc-hero">
        <div className="container">
          <nav className="post-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{service.short}</span>
          </nav>
          <h1>{service.h1}</h1>
          <p className="svc-intro">{service.intro}</p>
          <div className="hero-actions">
            <Link href={`/#quote`} className="btn btn-primary">
              {service.priced ? "See my price" : "Get a quote"}
            </Link>
            <a href={PHONE_HREF} className="btn">
              Call {PHONE_DISPLAY}
            </a>
            <a href={SMS_HREF} className="btn">
              Text {SMS_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="svc-block">
        <div className="container">
          <div className="eyebrow">What&apos;s included</div>
          <h2 className="section-title">Every visit, every time.</h2>
          <div className="checklist-cards">
            {service.includes.map((group) => (
              <div className="checklist-card" key={group.title}>
                <div className="checklist-card-head">
                  <h3>{group.title}</h3>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <svg viewBox="0 0 256 256" fill="currentColor" width="15" height="15" aria-hidden="true">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-block svc-tinted">
        <div className="container svc-split">
          <div>
            <div className="eyebrow">Pricing</div>
            <h2 className="section-title">{service.priced ? "What it costs" : "How we quote it"}</h2>
          </div>
          <div className="svc-prose">
            {service.pricing.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
            {service.relatedPost && (
              <Link className="text-link" href={`/blog/${service.relatedPost.slug}`}>
                {service.relatedPost.label} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="svc-block">
        <div className="container">
          <div className="eyebrow">Why us</div>
          <h2 className="section-title">Why Hobart books us for this.</h2>
          <div className="svc-why">
            {service.why.map((w) => (
              <div key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container faq-grid">
          <div>
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </div>
          <div className="faq-list svc-faq-list">
            {service.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
