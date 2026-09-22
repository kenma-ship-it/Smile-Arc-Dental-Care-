"use client";

import { m } from "motion/react";

const lines = ["Dental care in Kalachowki,", "from Dr. Janhavi Parab."];
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The headline rises into place line by line. Each line sits in its own clipping box,
 * so the text appears to come up from behind a ruler edge rather than fade in.
 */
export function HeroHeadline() {
  return (
    <h1 id="hero-title" className="h-display">
      {lines.map((line, i) => (
        <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <m.span
            data-reveal
            className="block"
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.13, ease }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </h1>
  );
}
