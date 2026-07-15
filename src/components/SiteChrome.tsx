import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { SERVICES } from "@/lib/services";

/** Header + footer for every page that isn't the homepage (which has its own
 *  interactive header with the mobile menu). */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="NaturePure Cleaning home">
            <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
              <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z" />
            </svg>
            <span>
              NaturePure<small>CLEANING</small>
            </span>
          </Link>
          <nav className="nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`}>
                {s.short}
              </Link>
            ))}
            <Link href="/blog">Advice</Link>
          </nav>
          <a className="btn call-btn" href={PHONE_HREF}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <main>{children}</main>

      <section className="footer-cta">
        <div className="container footer-grid">
          <h2>Ready for a cleaner space?</h2>
          <p>Get an instant price in 30 seconds, or call and we&apos;ll sort it out on the phone.</p>
          <div className="footer-actions">
            <Link href="/#quote" className="btn btn-primary">
              See my price
            </Link>
            <a href={PHONE_HREF} className="btn">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="container footer-legal">
          <span>&copy; {new Date().getFullYear()} NaturePure Cleaning</span>
          <span>ABN 89 629 311 900</span>
          <span>Fully insured · Hobart, Tasmania</span>
        </div>
      </section>
    </div>
  );
}
