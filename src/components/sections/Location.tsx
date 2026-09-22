import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { LazyMount } from "@/components/ui/LazyMount";
import { clinic, addressOneLine, telUrl, whatsappUrl } from "@/data/clinic";

export function Location() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="section-pad border-t border-line-soft">
      <div className="wrap rail">
        <SectionHead id="visit-title" title="Find the clinic">
          <p>{addressOneLine}</p>
        </SectionHead>

        <div>
          <LazyMount minHeight={340} className="overflow-hidden rounded-[0.625rem] border border-line">
            <iframe
              title={`Map showing the location of ${clinic.name}`}
              src={clinic.maps.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[22rem] w-full border-0"
            />
          </LazyMount>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="label flex items-center gap-2">
                <Icon name="pin" className="h-4 w-4" /> Address
              </p>
              <p className="mt-2 leading-snug text-ink">
                {clinic.address.line1}
                <br />
                {clinic.address.line2}
                <br />
                {clinic.address.city} {clinic.address.postalCode}
              </p>
            </div>
            <div>
              <p className="label flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4" /> Timings
              </p>
              <p className="mt-2 leading-snug text-ink">
                {clinic.hours.displayDays}
                <br />
                {clinic.hours.displaySessions[0]}
                <br />
                {clinic.hours.displaySessions[1]}
              </p>
            </div>
            <div>
              <p className="label flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4" /> Contact
              </p>
              <p className="mt-2 leading-snug">
                <a href={telUrl} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                  {clinic.phone.display}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={clinic.maps.directionsUrl} icon="navigation" variant="quiet">
              Get directions
            </Button>
            <Button href={whatsappUrl("Hi, I'd like to visit the clinic.")} icon="whatsapp" variant="quiet">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
