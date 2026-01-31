import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  title: "NaturePure Cleaning | Hobart Commercial, Airbnb & House Cleaning",
  description: "Premier cleaning agency in Hobart. We specialize in Office Cleaning, Airbnb Turnover, End of Lease, and Regular Home Cleaning. Tech-enabled, eco-friendly, and reliable.",
  keywords: [
    // Core Services
    "house cleaning Hobart",
    "commercial cleaning Hobart",
    "office cleaning Hobart",
    "airbnb cleaning Hobart",
    "end of lease cleaning Hobart",
    "bond cleaning Hobart",
    "strata cleaning Hobart",
    
    // Niche Keywords
    "eco friendly office cleaning",
    "chemical free cleaning Tasmania",
    "bnb turnover service Hobart",
    "holiday rental cleaning",
    "medical centre cleaning Hobart",
    "gym cleaning Hobart",
    
    // Locations (Keep existing)
    "cleaning service Sandy Bay",
    "cleaning service Kingston",
    "cleaning service CBD",
    "cleaning service North Hobart",
    "cleaning service Glenorchy",
    "cleaning service Moonah",
    "cleaning service Bellerive",
    "cleaning service Howrah",
    "cleaning service Lindisfarne",
    "cleaning service Rosny",
  ],
  authors: [{ name: "NaturePure Cleaning" }],
  creator: "NaturePure Cleaning",
  publisher: "NaturePure Cleaning",
  formatDetection: {
    telephone: true,
    email: true,
  },
  metadataBase: new URL("https://naturepurecleaning.com.au"),
  alternates: {
    canonical: "https://naturepurecleaning.com.au",
  },
  openGraph: {
    title: "NaturePure Cleaning | Hobart's Premium Cleaning Agency",
    description: "Office, Airbnb & Home Cleaning in Hobart. Book your professional clean today.",
    url: "https://naturepurecleaning.com.au",
    siteName: "NaturePure Cleaning",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NaturePure Cleaning | Hobart Commercial & House Cleaning",
    description: "Professional cleaning for Offices, Airbnbs & Homes in Hobart.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD 结构化数据 - Updated for Agency Model
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://naturepurecleaning.com.au",
  name: "NaturePure Cleaning",
  image: "https://naturepurecleaning.com.au/images/logo.png",
  description: "Hobart's leading cleaning agency for Commercial, Airbnb, and Residential properties. Professional, insured, and eco-friendly.",
  url: "https://naturepurecleaning.com.au",
  telephone: "+61478759693",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hobart",
    addressRegion: "TAS",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -42.8821,
    longitude: 147.3272,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -42.8821,
      longitude: 147.3272,
    },
    geoRadius: "50000",
  },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "20:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial & Office Cleaning",
          description: "Regular office maintenance, desk sanitizing, and common area cleaning",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Airbnb & Holiday Rental Cleaning",
          description: "Full turnover service including linen change and amenities restocking",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "End of Lease Cleaning",
          description: "Bond-back guarantee cleaning for tenants and property managers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Regular House Cleaning",
          description: "Weekly or fortnightly home maintenance cleaning",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
