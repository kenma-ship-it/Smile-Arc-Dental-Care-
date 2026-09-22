"use client";

import { useIstNow } from "@/hooks/useIstNow";
import { clinic } from "@/data/clinic";
import { getClinicStatus } from "@/lib/slots";
import { formatTime, relativeDayLabel, weekdayShort } from "@/lib/time";
import { cn } from "@/lib/cn";

/** Live "open now / closed" pill, worked out in India time from the opening rules. */
export function ClinicStatus({ className }: { className?: string }) {
  const now = useIstNow();
  const status = now ? getClinicStatus(now) : null;

  let label = `Clinic open ${clinic.hours.displayShort}`;
  let detail = "";
  if (status && now) {
    if (status.open) {
      label = "Open now";
      detail = `Closes ${formatTime(status.closesAt)}`;
    } else {
      label = "Closed now";
      const day = relativeDayLabel(status.opensDate, now.iso);
      detail = `Opens ${day === "Today" || day === "Tomorrow" ? day.toLowerCase() : weekdayShort(status.opensDate)} at ${formatTime(status.opensAt)}`;
    }
  }

  return (
    <p
      className={cn(
        "inline-flex min-h-9 items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-1.5 text-[0.9rem]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-2.5 w-2.5 rounded-full", status ? (status.open ? "bg-leaf-500" : "bg-mist") : "bg-line")}
      />
      <span className="font-semibold text-ink">{label}</span>
      {detail && <span className="text-muted">{detail}</span>}
    </p>
  );
}
