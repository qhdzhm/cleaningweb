import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "NaturePure Cleaning | Chemical-Free House Cleaning Hobart | Eco-Friendly Cleaners",
  description: "Professional chemical-free house cleaning in Hobart, Tasmania. We use only water and premium microfibre - safe for kids, pets & allergies. Weekly, fortnightly & monthly cleaning. Call 0478 759 693 for a free quote!",
  keywords: [
    // 主关键词
    "house cleaning Hobart",
    "chemical free cleaning Hobart",
    "eco friendly cleaning Tasmania",
    "regular cleaning service Hobart",
    "domestic cleaning Hobart",
    "home cleaning Hobart",
    "cleaning service Tasmania",
    "microfibre cleaning",
    "green cleaning Hobart",
    "natural cleaning service",
    "weekly cleaning Hobart",
    "fortnightly cleaning service",
    // 郊区关键词 - 根据你服务的区域调整
    "house cleaning Sandy Bay",
    "cleaning service Kingston",
    "house cleaning Blackmans Bay",
    "cleaning service Battery Point",
    "house cleaning Glenorchy",
    "cleaning service Moonah",
    "house cleaning Bellerive",
    "cleaning service Howrah",
    "house cleaning Lindisfarne",
    "cleaning service New Town",
    "house cleaning South Hobart",
    "cleaning service Taroona",
    "house cleaning Rosny",
    "cleaning service Clarence",
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
    title: "NaturePure Cleaning | Chemical-Free House Cleaning Hobart",
    description: "Professional chemical-free house cleaning in Hobart. Safe for kids, pets & allergies. Call 0478 759 693 for a free quote!",
    url: "https://naturepurecleaning.com.au",
    siteName: "NaturePure Cleaning",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NaturePure Cleaning | Chemical-Free House Cleaning Hobart",
    description: "Professional chemical-free house cleaning in Hobart. Safe for kids, pets & allergies.",
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
  verification: {
    // 你需要在 Google Search Console 验证后添加这个
    // google: "your-google-verification-code",
  },
};

// JSON-LD 结构化数据 - 帮助 Google 理解你的业务
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://naturepurecleaning.com.au",
  name: "NaturePure Cleaning",
  image: "https://naturepurecleaning.com.au/images/logo.png",
  description: "Professional chemical-free house cleaning service in Hobart, Tasmania. We use only water and premium microfibre for a healthier clean.",
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Weekly House Cleaning",
          description: "Regular weekly chemical-free house cleaning service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fortnightly House Cleaning",
          description: "Fortnightly chemical-free house cleaning service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Monthly House Cleaning",
          description: "Monthly chemical-free house cleaning service",
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
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
