/**
 * Lets any button on the page ("Book this service", a slot in the hero) hand a choice
 * to the booking form without prop-drilling or a global store.
 */
export type BookingPrefill = { serviceId?: string; date?: string; time?: string };

export const PREFILL_EVENT = "smilearc:prefill";

export function requestBooking(prefill: BookingPrefill = {}) {
  window.dispatchEvent(new CustomEvent<BookingPrefill>(PREFILL_EVENT, { detail: prefill }));
  const target = document.getElementById("book");
  if (target) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#book");
  }
}

/** Jump to the Smile gallery and open a specific case tab. */
export const CASE_EVENT = "smilearc:case";

export function showCase(caseId: string) {
  window.dispatchEvent(new CustomEvent<string>(CASE_EVENT, { detail: caseId }));
  const target = document.getElementById("gallery");
  if (target) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#gallery");
  }
}
