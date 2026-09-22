import { addressOneLine, clinic, SITE_URL } from "@/data/clinic";

/**
 * schema.org "Dentist" markup so search engines can show the clinic's details.
 * No aggregateRating or review data is included on purpose: those must come from
 * real, verifiable reviews, and Google penalises made-up ratings.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#clinic`,
    name: clinic.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: clinic.phone.tel,
    description: `Dental clinic in Kalachowki, Mumbai. Consultations with ${clinic.doctor.name}, ${clinic.doctor.qualification}, ${clinic.doctor.title}.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: clinic.maps.placeUrl,
    openingHoursSpecification: clinic.hours.sessions.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: s.open,
      closes: s.close,
    })),
    employee: { "@type": "Person", name: clinic.doctor.name, jobTitle: clinic.doctor.title },
    sameAs: [clinic.maps.placeUrl],
    areaServed: addressOneLine,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
