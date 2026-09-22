"use client";

import Image from "next/image";
import { m } from "motion/react";
import { DemoFlag } from "@/components/ui/DemoFlag";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { SHOW_DEMO_FLAGS } from "@/data/clinic";
import { services } from "@/data/services";
import { requestBooking, showCase } from "@/lib/prefill";

/* Hoisted: variants must not be re-created on every render */
const list = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const row = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Services() {
  const featured = services.find((s) => s.image);
  const others = services.filter((s) => s !== featured);

  return (
    <section id="services" aria-labelledby="services-title" className="section-pad border-t border-line-soft bg-mint/60">
      <div className="wrap rail">
        <SectionHead id="services-title" title="Services">
          <p>Choose a service, then pick a time. You can also book without choosing one.</p>
          {SHOW_DEMO_FLAGS && (
            <p className="mt-4 text-sm">
              Entries tagged <DemoFlag>Sample</DemoFlag> are placeholders until the clinic confirms its list.
            </p>
          )}
        </SectionHead>

        <div>
          {featured && (
            <article className="grid items-center gap-8 rounded-[0.625rem] border border-line bg-surface p-6 sm:grid-cols-[minmax(0,1fr)_13rem] sm:p-9">
              <div>
                <h3 className="h-card">{featured.name}</h3>
                <p className="mt-3 max-w-[32rem] text-muted">{featured.summary}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    type="button"
                    onClick={() => requestBooking({ serviceId: featured.id })}
                    className="btn btn-primary btn-sm"
                  >
                    Book this service
                  </button>
                  <button
                    type="button"
                    onClick={() => showCase("space-maintainer")}
                    className="link inline-flex min-h-11 items-center gap-1.5 text-[0.95rem]"
                  >
                    See a case
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {featured.image && (
                <div className="mx-auto w-full max-w-[13rem] rounded-full bg-gradient-to-br from-leaf-300 to-tide-300 p-[3px]">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt ?? ""}
                    sizes="208px"
                    placeholder="blur"
                    className="aspect-square w-full rounded-full object-cover"
                  />
                </div>
              )}
            </article>
          )}

          <m.ul
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-8 border-t border-line"
          >
            {others.map((service) => (
              <m.li
                key={service.id}
                variants={row}
                data-reveal
                className="group grid items-center gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <h3 className="font-display text-[1.45rem] leading-tight tracking-[-0.01em] transition-transform duration-300 group-hover:translate-x-1">
                    {service.name} {!service.confirmed && <DemoFlag className="ml-1 -translate-y-0.5">Sample</DemoFlag>}
                  </h3>
                  <p className="mt-1.5 max-w-[34rem] text-[0.98rem] text-muted">{service.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => requestBooking({ serviceId: service.id })}
                  className="relative inline-flex min-h-11 items-center gap-2 justify-self-start text-[0.95rem] font-semibold text-primary sm:justify-self-end"
                  aria-label={`Book ${service.name}`}
                >
                  <span className="relative">
                    Book this service
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-leaf-500 to-tide-500 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </span>
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </m.li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
