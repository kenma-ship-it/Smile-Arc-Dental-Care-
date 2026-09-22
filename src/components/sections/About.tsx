import { SectionHead } from "@/components/ui/SectionHead";
import { clinic } from "@/data/clinic";
import { Doctor } from "./Doctor";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad border-t border-line-soft">
      <div className="wrap rail">
        <SectionHead id="about-title" title="About the clinic" />

        <div>
          <p className="max-w-[40rem] font-display text-[clamp(1.55rem,1.15rem+1.7vw,2.4rem)] leading-[1.25] tracking-[-0.012em]">
            {clinic.name} is a dental clinic at Shraddha CHS in Ambewadi, Kalachowki, run by {clinic.doctor.name}.
          </p>

          <p className="mt-6 max-w-[36rem] text-muted">
            {clinic.about.paragraph}
          </p>

          <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="label">On the clinic signboard</p>
              <p lang="hi" className="deva mt-2 text-[1.35rem] leading-snug text-ink">
                {clinic.hindiName}
                <br />
                <span className="text-[1.05rem] text-ink-soft">{clinic.hindiDescriptor}</span>
              </p>
            </div>
            <div>
              <p className="label">Doctor</p>
              <p className="mt-2 text-lg leading-snug text-ink">
                {clinic.doctor.name}
                <br />
                <span className="text-ink-soft">
                  {clinic.doctor.qualification}, {clinic.doctor.title}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Doctor />
          </div>
        </div>
      </div>
    </section>
  );
}
