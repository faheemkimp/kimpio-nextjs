import { ArrowRight, Check, Receipt } from "lucide-react";

import { CtaLink } from "@/components/ui/cta-button";
import { BUILD_VS_BUY } from "@/content/home-sections";

import { SectionHeading } from "./section-heading";

/**
 * "The math, made simple": the in-house team as a long paper receipt, KIMP as
 * a single compact ticket. A "vs" badge sits on the seam between them.
 */
export function BuildVsBuy() {
  const { inhouse, kimp } = BUILD_VS_BUY;
  return (
    <section aria-labelledby="math-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="math-title" eyebrow={BUILD_VS_BUY.eyebrow} title={BUILD_VS_BUY.title} intro={BUILD_VS_BUY.intro} />

        <div className="relative mt-14 grid items-start gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-14">
          {/* Receipt */}
          {/* the zig-zag edge is a mask, so the shadow lives on the wrapper as a drop-shadow */}
          <div data-fx="merge" data-from="left" className="mx-auto w-full max-w-lg -rotate-1 drop-shadow-[0_22px_24px_rgb(27_30_35/0.18)]">
          <article className="receipt relative bg-white px-7 pt-8 pb-12 sm:px-9">
            <div className="flex items-center justify-between border-b-2 border-dashed border-ink/15 pb-5">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-slate-brand uppercase">{inhouse.kicker}</p>
                <h3 className="mt-1.5 text-xl font-bold text-ink">{inhouse.title}</h3>
              </div>
              <Receipt className="size-8 text-ink/25" aria-hidden="true" />
            </div>

            <table className="mt-4 w-full text-[0.95rem]">
              <caption className="sr-only">Monthly cost of an in-house creative team</caption>
              <tbody>
                {inhouse.rows.map((r) => (
                  <tr key={r.role}>
                    <th scope="row" className="py-2.5 pr-3 text-left font-medium text-ink/80">
                      <span className="flex items-baseline gap-2">
                        {r.role}
                        <span aria-hidden="true" className="flex-1 translate-y-[-3px] border-b-2 border-dotted border-ink/15" />
                      </span>
                    </th>
                    <td className="py-2.5 text-right font-semibold whitespace-nowrap text-ink tabular-nums">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{inhouse.note}</p>

            <div className="mt-6 flex items-end justify-between gap-4 border-t-2 border-ink pt-5">
              <span className="text-sm font-bold tracking-[0.14em] text-slate-brand uppercase">{inhouse.totalLabel}</span>
              <span className="text-right text-3xl leading-none font-bold text-ink tabular-nums sm:text-4xl">
                <span data-fx="count">{inhouse.total}</span>
                <span className="text-base font-semibold text-slate-brand"> /mo</span>
              </span>
            </div>
            <p className="mt-4 text-[0.8rem] leading-relaxed text-muted-foreground">{inhouse.fine}</p>
          </article>
          </div>

          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 z-10 hidden size-16 -translate-1/2 place-items-center rounded-full bg-ink text-lg font-bold text-white ring-8 ring-surface lg:grid"
          >
            vs
          </span>

          {/* KIMP ticket */}
          <article data-fx="merge" data-from="right" className="relative mx-auto w-full max-w-lg rotate-1 overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_70px_-35px_rgb(241_115_30/0.65)] ring-1 ring-border lg:mt-12">
            <div className="relative isolate overflow-hidden bg-ink px-7 pt-8 pb-10 text-white sm:px-9">
              <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-16 -z-10 size-64 rounded-full bg-brand/50 blur-3xl" />
              <p className="relative text-xs font-bold tracking-[0.18em] text-[#ffb27a] uppercase">{kimp.kicker}</p>
              <h3 className="relative mt-1.5 text-2xl font-bold">{kimp.title}</h3>
              <p className="relative mt-6 flex items-end gap-2">
                <span className="text-sm font-bold tracking-[0.14em] text-white/85 uppercase">{kimp.totalLabel}</span>
              </p>
              <p className="relative text-6xl leading-none font-bold tracking-tight tabular-nums">
                <span data-fx="count">{kimp.total}</span>
                <span className="text-xl font-semibold text-white/60"> /mo</span>
              </p>
            </div>
            {/* perforation */}
            <div aria-hidden="true" className="relative h-0">
              <span className="absolute -top-4 -left-4 size-8 rounded-full bg-surface ring-1 ring-border" />
              <span className="absolute -top-4 -right-4 size-8 rounded-full bg-surface ring-1 ring-border" />
            </div>
            <div className="px-7 pt-7 pb-8 sm:px-9">
              <p className="text-[0.95rem] leading-relaxed text-ink/70">{kimp.note}</p>
              <ul className="mt-5 space-y-3">
                {kimp.rows.map((r) => (
                  <li key={r.role} className="flex items-center gap-3 text-[0.95rem]">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-brand text-white">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="font-medium text-ink">{r.role}</span>
                    <span className="ml-auto text-sm font-bold whitespace-nowrap text-teal-brand">{r.cost}</span>
                  </li>
                ))}
              </ul>
              <CtaLink href={BUILD_VS_BUY.cta.href} className="mt-7 w-full">
                {BUILD_VS_BUY.cta.label}
                <ArrowRight aria-hidden="true" />
              </CtaLink>
              <p className="mt-4 text-center text-sm text-muted-foreground">{kimp.fine}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
