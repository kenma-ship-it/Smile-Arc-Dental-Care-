import { SITE_URL } from "@/data/clinic";

/**
 * Search engines are allowed by default. While the site still holds sample reviews
 * and placeholder services, set NEXT_PUBLIC_ALLOW_INDEXING=false so it is not indexed.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export const siteTitle = "Smile Arc Dental Care | Dentist in Kalachowki, Mumbai";
export const siteDescription =
  "Smile Arc Dental Care, Ambewadi, Kalachowki, Mumbai. Consultations with Dr. Janhavi Parab, B.D.S (Mumbai), Dental Surgeon. Book an appointment or call 83692 22854.";

export { SITE_URL };
