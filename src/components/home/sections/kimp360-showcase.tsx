import { BrandMemoryCard } from "@/components/home/kimp360/brand-memory-card";
import { TeamCard } from "@/components/home/kimp360/team-card";
import { KIMP360 } from "@/content/home-sections";

import { AiPreferenceDemo } from "./ai-preference-demo";
import { SectionHeading } from "./section-heading";

/**
 * KIMP360: the per-brand AI preference (interactive demo) beside the request
 * board, then the Brand memory and team collaboration demo cards.
 */
export function Kimp360Showcase() {
  const { preference, workflow } = KIMP360;
  return (
    <section aria-labelledby="kimp360-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 size-[30rem] rounded-full bg-[#ffb27a]/20 blur-3xl" />
        <div className="absolute -right-40 bottom-20 size-[30rem] rounded-full bg-[#a594f9]/15 blur-3xl" />
      </div>

      <div className="container-page">
        <SectionHeading id="kimp360-title" eyebrow={KIMP360.eyebrow} title={KIMP360.title} intro={KIMP360.intro} />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 lg:grid-cols-12 lg:gap-5">
          {/* AI preference */}
          <article data-fx="reveal" className="flex min-w-0 flex-col rounded-[1.75rem] bg-white p-2 ring-1 ring-border lg:col-span-7">
            <div className="relative isolate rounded-[1.35rem] bg-surface p-4 sm:p-8">
              <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 rounded-[inherit] opacity-70" />
              <AiPreferenceDemo />
              <p className="mt-3 text-center text-xs text-muted-foreground">{preference.caption} Try switching it.</p>
            </div>
            <div className="px-4 pt-6 pb-5 sm:px-6">
              <h3 className="text-2xl leading-tight font-bold text-ink sm:text-[1.75rem]">{preference.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/65">{preference.body}</p>
            </div>
          </article>

          {/* Workflow board */}
          <article
            data-fx="reveal"
            data-delay="0.1"
            className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white sm:p-9 lg:col-span-5"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -right-24 -bottom-24 size-80 rounded-full bg-brand/35 blur-3xl" />
            </div>
            <h3 className="text-2xl font-bold">{workflow.title}</h3>
            <p className="mt-3 leading-relaxed text-white/65">{workflow.body}</p>
            <div aria-hidden="true" className="mt-8 -mr-16 grid flex-1 grid-cols-4 gap-3 sm:-mr-24">
              {workflow.columns.map((col, c) => (
                <div key={col.label} className="flex min-w-0 flex-col gap-2.5 rounded-2xl bg-white/[0.06] p-2.5 ring-1 ring-white/10">
                  <span className="flex items-center gap-1.5 truncate px-1 text-xs font-bold text-white/80">
                    <span className="size-2 shrink-0 rounded-full" style={{ background: col.color }} />
                    {col.label}
                  </span>
                  {col.cards.map((cardLabel, k) => (
                    <span
                      key={cardLabel}
                      className="board-card flex flex-col gap-2 rounded-xl bg-white p-2.5 text-ink shadow-sm"
                      style={{ animationDelay: `${(c * 2 + k) * 0.6}s` }}
                    >
                      <span className="h-1 w-8 rounded-full" style={{ background: col.color }} />
                      <span className="text-[0.7rem] leading-tight font-semibold">{cardLabel}</span>
                      <span className="flex -space-x-1.5">
                        <span className="size-4 rounded-full bg-[#ffd2ae] ring-2 ring-white" />
                        <span className="size-4 rounded-full bg-[#cfc6ff] ring-2 ring-white" />
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Brand memory + team collaboration: looping product demos */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-5">
          <BrandMemoryCard className="lg:col-span-8" />
          <TeamCard className="lg:col-span-4" />
        </div>
      </div>
    </section>
  );
}
