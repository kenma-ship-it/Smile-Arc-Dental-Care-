import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { clinic, SITE_URL, addressOneLine } from "@/data/clinic";
import MotionProvider from "@/components/motion/MotionProvider";
import { Navbar } from "@/components/sections/Navbar";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

/* ---------- Self-hosted fonts ---------- */

const newsreader = localFont({
  src: "./fonts/newsreader-latin-wght-normal.woff2",
  display: "swap",
  weight: "300 800",
  variable: "--font-newsreader",
});

const figtree = localFont({
  src: "./fonts/figtree-latin-wght-normal.woff2",
  display: "swap",
  weight: "300 700",
  variable: "--font-figtree",
});

const marcellus = localFont({
  src: "./fonts/marcellus-latin-400-normal.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-marcellus",
});

const notoDeva = localFont({
  src: "./fonts/noto-sans-devanagari-devanagari-wght-normal.woff2",
  display: "swap",
  weight: "400 700",
  variable: "--font-noto-deva",
});

/* ---------- Metadata ---------- */

const description = `Book a dental appointment at ${clinic.name}, ${addressOneLine}. ${clinic.doctor.name}, ${clinic.doctor.qualification}. ${clinic.hours.displayDays}, ${clinic.hours.displaySessions.join(" and ")}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${clinic.name} — ${clinic.doctor.name}, ${clinic.doctor.title}`,
    template: `%s | ${clinic.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: clinic.name,
    title: `${clinic.name} — Dental Care in Kalachowki, Mumbai`,
    description,
  },
  alternates: { canonical: "/" },
  robots: { index: false, follow: false }, // demo site: not for indexing yet
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafcfb" },
    { media: "(prefers-color-scheme: dark)", color: "#0c171c" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ---------- JSON-LD ---------- */

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    description,
    url: SITE_URL,
    telephone: clinic.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.lat,
      longitude: clinic.geo.lng,
    },
    openingHoursSpecification: clinic.hours.sessions.flatMap((s) =>
      clinic.hours.openWeekdays.map((wd) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][wd],
        opens: s.open,
        closes: s.close,
      })),
    ),
    /* No aggregateRating: no verified review data yet */
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ---------- Layout ---------- */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${newsreader.variable} ${figtree.variable} ${marcellus.variable} ${notoDeva.variable}`}
    >
      <head>
        {/* Sets the theme before first paint so there is no flash */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd />
      </head>
      <body className="pb-14 lg:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <StickyMobileCta />
        </MotionProvider>
      </body>
    </html>
  );
}
