import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { clinic, addressOneLine, telUrl, whatsappUrl } from "@/data/clinic";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="on-dark bg-night pt-16 pb-8 text-white/90">
      <div className="wrap">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo tone="light" />
            <p lang="hi" className="deva mt-4 text-lg text-mist">
              {clinic.blessing}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-mist">Timings</h4>
            <p className="mt-3 leading-relaxed text-white/80">
              {clinic.hours.displayDays}
              <br />
              {clinic.hours.displaySessions[0]}
              <br />
              {clinic.hours.displaySessions[1]}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-mist">Contact</h4>
            <ul className="mt-3 grid gap-3">
              <li>
                <a href={telUrl} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                  <Icon name="phone" className="h-4 w-4" /> {clinic.phone.display}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                  <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-mist">Address</h4>
            <p className="mt-3 leading-relaxed text-white/80">{addressOneLine}</p>
            <a
              href={clinic.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-tide-300 hover:text-white"
            >
              Get directions <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <hr className="hairline my-10" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-mist">
          <p>
            &copy; {year} {clinic.name}. All rights reserved.
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 font-semibold hover:text-white">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
