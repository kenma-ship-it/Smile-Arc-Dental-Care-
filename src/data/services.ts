import type { StaticImageData } from "next/image";
import applianceImg from "@/assets/cases/space-maintainer-appliance.webp";

export type Service = {
  id: string;
  name: string;
  summary: string;
  confirmed: boolean;
  image?: StaticImageData;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    id: "space-maintainer",
    name: "Space maintainer",
    summary:
      "A small appliance that keeps the gap open where a baby tooth has been lost, so the permanent tooth has room to come in.",
    confirmed: true,
    image: applianceImg,
    imageAlt: "A space maintainer appliance resting on a plaster model of a child's upper teeth",
  },
  {
    id: "check-up",
    name: "Check-up and consultation",
    summary: "A first visit to talk through your concern and have your teeth and gums examined.",
    confirmed: true,
  },
  {
    id: "scaling",
    name: "Scaling and polishing",
    summary: "Cleaning to remove plaque and tartar that builds up on the teeth.",
    confirmed: true,
  },
  {
    id: "fillings",
    name: "Fillings",
    summary: "Repair of a tooth that has been damaged by decay.",
    confirmed: true,
  },
  {
    id: "root-canal",
    name: "Root canal treatment",
    summary: "Treatment for a tooth where the inner pulp has become infected or inflamed.",
    confirmed: true,
  },
  {
    id: "crowns",
    name: "Crowns and caps",
    summary: "A cover fitted over a damaged tooth to protect it.",
    confirmed: true,
  },
  {
    id: "dentures",
    name: "Dentures",
    summary: "Removable replacements for missing teeth.",
    confirmed: true,
  },
];

export const NOT_SURE_SERVICE = { id: "not-sure", name: "Not sure yet" } as const;

export const serviceOptions: { id: string; name: string }[] = [
  NOT_SURE_SERVICE,
  ...services.map(({ id, name }) => ({ id, name })),
];
