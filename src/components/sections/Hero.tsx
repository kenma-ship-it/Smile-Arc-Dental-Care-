import { BookButton } from "@/components/ui/BookButton";
import { Button } from "@/components/ui/Button";
import { clinic, telUrl } from "@/data/clinic";
import { ClinicStatus } from "./ClinicStatus";
import { HeroArt } from "./HeroArt";
import { HeroHeadline } from "./HeroHeadline";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-24 pt-[calc(var(--header-height)+2rem)] lg:pb-28 lg:pt-[calc(var(--header-height)+3.5rem)]"
    >
      <div className="wrap grid items-center gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10">
        <div>
          <ClinicStatus />
          <div className="mt-7">
            <HeroHeadline />
          </div>
          <p className="lede mt-7">
            Book a consultation at {clinic.name} in Ambewadi. Choose a service and a time that suits you, or call the
            clinic.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BookButton size="lg" iconAfter="arrow-right">
              Book appointment
            </BookButton>
            <Button href={telUrl} size="lg" variant="quiet" icon="phone">
              Call clinic
            </Button>
          </div>

          <dl className="mt-14 grid gap-x-10 gap-y-6 border-t border-line pt-7 sm:grid-cols-2">
            <div>
              <dt className="label">Timings</dt>
              <dd className="mt-1.5 leading-snug text-ink">
                {clinic.hours.displayDays}
                <br />
                {clinic.hours.displaySessions[0]}
                <br />
                {clinic.hours.displaySessions[1]}
              </dd>
            </div>
            <div>
              <dt className="label">Find us</dt>
              <dd className="mt-1.5 leading-snug text-ink">
                {clinic.address.line1}
                <br />
                {clinic.address.line2}
                <br />
                <a href={clinic.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="link text-[0.95rem]">
                  Get directions
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <HeroArt />
      </div>
    </section>
  );
}
