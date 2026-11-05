import { CtaLink } from "@/components/ui/cta-button";
import { SERVICES } from "@/content/home-sections";

import { SectionHeading } from "./section-heading";
import { ServiceStage } from "./service-scenes";

/**
 * Services grid: even 3x2 on lg, 2-up on sm. Each card carries a looping CSS-animated scene that
 * illustrates the service (see service-scenes.tsx).
 */
export function ServicesGrid() {
  return (
    <section
      aria-labelledby="services-title"
      className="px-2 py-2 sm:px-4 sm:py-4"
    >
      {/* Rounded panel inset from the page edges. */}
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#edf5f3] py-24 ring-1 ring-[#0f766e]/10 sm:rounded-[3rem] sm:py-32">
        <div className="container-page">
          <SectionHeading
            id="services-title"
            eyebrow={SERVICES.eyebrow}
            title={SERVICES.title}
            intro={SERVICES.intro}
          />

          <ul
            data-fx="stagger"
            className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {SERVICES.items.map((s, i) => (
              <li
                key={s.title}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-2 ring-1 ring-ink/[0.06] shadow-[0_1px_2px_rgb(27_30_35/0.04)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgb(15_118_110/0.35)]"
              >
                <ServiceStage
                  scene={s.scene}
                  tint={s.tint}
                  className="h-64 rounded-[1.35rem] sm:h-72"
                />
                <div className="flex flex-1 flex-col px-5 pt-5 pb-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                    <span
                      aria-hidden="true"
                      className="text-sm font-semibold tabular-nums text-ink/30"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink/60">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div data-fx="reveal" className="mt-12 flex justify-center">
            <CtaLink href={SERVICES.cta.href} variant="primary" size="lg">
              {SERVICES.cta.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
