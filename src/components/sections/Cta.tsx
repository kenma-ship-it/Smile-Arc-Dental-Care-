import { BookButton } from "@/components/ui/BookButton";
import { Button } from "@/components/ui/Button";
import { ToothMark } from "@/components/brand/ToothMark";
import { clinic, telUrl } from "@/data/clinic";

/** Full-width call-to-action banner before the footer. */
export function Cta() {
  return (
    <section aria-label="Book now" className="on-dark relative overflow-hidden bg-night py-20 text-white lg:py-28">
      <ToothMark
        tone="light"
        className="pointer-events-none absolute -right-[6%] top-[8%] h-auto w-[42%] max-w-[26rem] opacity-[0.06]"
      />
      <div className="wrap relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="h-section text-white">Ready to visit {clinic.shortName}?</h2>
          <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-mist">
            Pick a service and a time that works, or call the clinic to talk it through first.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BookButton variant="light" size="lg" iconAfter="arrow-right">
            Book appointment
          </BookButton>
          <Button href={telUrl} variant="quiet" size="lg" icon="phone">
            Call clinic
          </Button>
        </div>
      </div>
    </section>
  );
}
