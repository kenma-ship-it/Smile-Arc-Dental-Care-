import type { StaticImageData } from "next/image";
import c4b from "@/assets/cases/case-4-before.webp";
import c4a from "@/assets/cases/case-4-after.webp";
import c6b from "@/assets/cases/case-6-before.webp";
import c6a from "@/assets/cases/case-6-after.webp";
import c5b from "@/assets/cases/case-5-before.webp";
import c5a from "@/assets/cases/case-5-after.webp";
import appliance from "@/assets/cases/space-maintainer-appliance.webp";

export type SmileCase = {
  id: string;
  tabLabel: string;
  treatment: string | null;
  before: StaticImageData;
  after: StaticImageData;
  altBefore: string;
  altAfter: string;
  extra?: { image: StaticImageData; alt: string; caption: string };
  consentConfirmed: boolean;
};

/** Real case photographs from the clinic. Crop only: no retouching or AI changes. */
export const cases: SmileCase[] = [
  {
    // NOTE: both Case 1 photos carry the Google Gemini sparkle mark (bottom right),
    // which suggests they were generated or edited with AI. Replace them with the
    // original camera files before the site goes live.
    id: "case-1",
    tabLabel: "Case 1",
    treatment: null,
    before: c4b,
    after: c4a,
    altBefore: "Front view of a patient's teeth showing decay before treatment",
    altAfter: "Front view of the same patient's teeth after treatment",
    consentConfirmed: false,
  },
  {
    id: "case-2",
    tabLabel: "Case 2",
    treatment: null,
    before: c6b,
    after: c6a,
    altBefore: "Close-up of a patient's smile before treatment",
    altAfter: "Close-up of the same patient's smile after treatment",
    consentConfirmed: false,
  },
  {
    id: "space-maintainer",
    tabLabel: "Space maintainer",
    treatment: "Space maintainer",
    before: c5b,
    after: c5a,
    altBefore: "A child's upper front teeth with a gap where a tooth is missing, before treatment",
    altAfter: "The same child's teeth after treatment",
    extra: {
      image: appliance,
      alt: "A space maintainer appliance resting on a plaster model of the teeth",
      caption: "The type of appliance used for space maintenance",
    },
    consentConfirmed: false,
  },
];
