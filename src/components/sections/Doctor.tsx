import { ToothMark } from "@/components/brand/ToothMark";
import { BookButton } from "@/components/ui/BookButton";
import { DemoFlag } from "@/components/ui/DemoFlag";
import { clinic } from "@/data/clinic";

/** Doctor card. No specialisations, experience or awards are claimed. */
export function Doctor() {
  return (
    <article
      aria-labelledby="doctor-name"
      className="grid gap-8 rounded-[0.625rem] border border-line bg-surface p-6 sm:grid-cols-[13rem_1fr] sm:p-8"
    >
      {/* Arch frame - swap for a real portrait by replacing this div with <Image /> */}
      <div
        role="img"
        aria-label="Photo of the doctor coming soon"
        className="relative mx-auto flex aspect-[4/5] w-full max-w-[13rem] flex-col items-center justify-end overflow-hidden rounded-t-[999px] rounded-b-md border border-line bg-gradient-to-b from-ice to-mint pb-5"
      >
        <ToothMark className="absolute left-1/2 top-[22%] h-auto w-[58%] -translate-x-1/2 opacity-[0.22]" />
        <span className="relative text-sm font-semibold text-ink-soft">Photo coming soon</span>
      </div>

      <div className="flex flex-col justify-center">
        <h3 id="doctor-name" className="h-card">
          {clinic.doctor.name}
        </h3>
        <p className="mt-2 text-lg text-ink-soft">
          {clinic.doctor.qualification}
          <br />
          {clinic.doctor.title}
        </p>
        <p className="mt-4 max-w-[30rem] text-muted">
          Consultations at the clinic are with Dr. Parab. Pick a time in the booking form or call ahead.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BookButton size="sm" variant="quiet">
            Book with Dr. Parab
          </BookButton>
          <DemoFlag>Portrait to add</DemoFlag>
        </div>
      </div>
    </article>
  );
}
