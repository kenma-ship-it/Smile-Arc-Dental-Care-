"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/cn";

const expandTransition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };

function FaqItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="flex w-full items-start justify-between gap-6 py-5 text-left"
        >
          <span className="font-display text-[1.25rem] leading-snug tracking-[-0.01em]">{q}</span>
          <span
            className={cn(
              "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300",
              open && "rotate-180",
            )}
          >
            <Icon name="chevron-down" className="h-4 w-4 text-muted" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={expandTransition}
            style={{ overflow: "hidden" }}
          >
            <p className="max-w-[40rem] pb-6 text-muted">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" aria-labelledby="faqs-title" className="section-pad border-t border-line-soft">
      <div className="wrap rail">
        <SectionHead id="faqs-title" title="Common questions" />
        <div className="border-t border-line">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
