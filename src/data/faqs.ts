import { clinic } from "./clinic";

export type Faq = { q: string; a: string };

/** Only factual questions that the verified clinic details can answer. */
export const faqs: Faq[] = [
  {
    q: "How do I book an appointment?",
    a: `Use the booking form on this page, call ${clinic.phone.display}, or message the clinic on WhatsApp. Pick a service, a day and a time, and the clinic will confirm your slot.`,
  },
  {
    q: "What are the clinic timings?",
    a: `${clinic.hours.displayDays}, ${clinic.hours.displaySessions[0]} and ${clinic.hours.displaySessions[1]}. Sunday: ${clinic.hours.sunday.text}`,
  },
  {
    q: "Where is the clinic?",
    a: `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city} ${clinic.address.postalCode}. Use the Get directions button in the Find the clinic section to open the route in Google Maps.`,
  },
  {
    q: "What should I bring to my visit?",
    a: "Any earlier dental records or X-rays you have, and a list of the medicines you currently take. If you are not sure what to bring, call the clinic before you come.",
  },
  {
    q: "What if I have sudden dental pain?",
    a: `For urgent dental pain, call the clinic on ${clinic.phone.display}. Do not wait for an online booking.`,
  },
  {
    q: "Can I contact the clinic on WhatsApp?",
    a: `Yes. Message ${clinic.phone.display} on WhatsApp. The Send on WhatsApp button at the end of the booking form fills in your details for you.`,
  },
  {
    q: "Is the booking form on this page live?",
    a: "Not yet. This is a demo: the booked slots are sample data and nothing is sent to the clinic until you use the WhatsApp button or call.",
  },
];
