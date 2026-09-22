import { useId } from "react";
import { MARK_STROKES, MARK_VIEWBOX } from "./mark-data";

export type MarkTone = "brand" | "light";

const palettes = {
  brand: {
    green: ["#2A9163", "#6FBF9E"],
    blue: ["#3A8CCB", "#63AADF"],
  },
  light: {
    green: ["#5FC79A", "#A6E0C6"],
    blue: ["#6AB4EC", "#A5D0F5"],
  },
} as const;

/** Gradient coordinates live in the mark's own viewBox space. */
export function MarkGradients({ id, tone }: { id: string; tone: MarkTone }) {
  const p = palettes[tone];
  return (
    <defs>
      <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1="200" y1="30" x2="40" y2="170">
        <stop offset="0" stopColor={p.green[0]} />
        <stop offset="1" stopColor={p.green[1]} />
      </linearGradient>
      <linearGradient id={`${id}-b`} gradientUnits="userSpaceOnUse" x1="180" y1="75" x2="115" y2="176">
        <stop offset="0" stopColor={p.blue[0]} />
        <stop offset="1" stopColor={p.blue[1]} />
      </linearGradient>
    </defs>
  );
}

/** The clinic's tooth mark, rebuilt as vector shapes from the signboard logo. */
export function ToothMark({
  className,
  tone = "brand",
  title,
}: {
  className?: string;
  tone?: MarkTone;
  title?: string;
}) {
  const id = `mk${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <MarkGradients id={id} tone={tone} />
      {MARK_STROKES.map((s) => (
        <path key={s.id} d={s.shape} fill={`url(#${id}-${s.tone === "green" ? "g" : "b"})`} />
      ))}
    </svg>
  );
}
