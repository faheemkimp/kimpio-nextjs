"use client";

import { ArrowRight, Check, Minus } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import type { Rival } from "@/content/compare-service";
import { cn } from "@/lib/utils";

/**
 * Live "The Quick Comparison": one tab per rival, a KIMP-vs-rival table and the
 * matching "Why smart businesses choose KIMP" (<h3>) block. Every panel stays
 * in the HTML (inactive ones `hidden`), as on live, so all copy and headings
 * are present without JavaScript.
 */
export function CompareTabs({ id, eyebrow, title, intro, rivals }: { id: string; eyebrow: string; title: string; intro: string; rivals: Rival[] }) {
  const [active, setActive] = useState(rivals[0]?.id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent, i: number) {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + rivals.length) % rivals.length;
    setActive(rivals[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative isolate scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} align="center" twoTone={false} />

        <div role="tablist" aria-label="Compare KIMP with" className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
          {rivals.map((r, i) => {
            const on = r.id === active;
            return (
              <button
                key={r.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`cs-tab-${r.id}`}
                aria-selected={on}
                aria-controls={`cs-panel-${r.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(r.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ring-1 transition-colors",
                  on ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-border hover:ring-ink/30",
                )}
              >
                <span className={on ? "text-brand" : "text-teal-brand"}>KIMP</span>
                <span className={cn("text-xs font-semibold", on ? "text-white/50" : "text-ink/40")}>vs</span>
                {r.name}
              </button>
            );
          })}
        </div>

        {rivals.map((r) => (
          <div key={r.id} id={`cs-panel-${r.id}`} role="tabpanel" aria-labelledby={`cs-tab-${r.id}`} hidden={r.id !== active} className="mt-10">
            <div className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/[0.06] shadow-[0_40px_80px_-60px_rgb(27_30_35/0.45)]">
              <table className="block w-full md:table">
                <caption className="sr-only">{r.caption}</caption>
                <thead className="hidden md:table-header-group">
                  <tr>
                    <th scope="col" className="w-[18%] px-6 py-6 text-left text-xs font-bold tracking-[0.14em] text-ink/40 uppercase">
                      <span className="sr-only">Criteria</span>
                    </th>
                    <th scope="col" className="w-[41%] bg-teal-soft/60 px-6 py-6 text-left">
                      <span className="block text-xl font-bold text-teal-brand">KIMP</span>
                      <span className="mt-1 block text-sm font-medium text-ink/60">{r.kimpTagline}</span>
                    </th>
                    <th scope="col" className="w-[41%] px-6 py-6 text-left">
                      <span className="block text-xl font-bold text-ink">{r.name}</span>
                      <span className="mt-1 block text-sm font-medium text-ink/50">{r.rivalTagline}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {r.rows.map((row) => (
                    <tr key={row.criteria} className="block border-t border-border p-5 md:table-row md:p-0">
                      <th scope="row" className="block pb-3 text-left text-base font-bold text-ink md:table-cell md:px-6 md:py-6 md:align-top">
                        {row.criteria}
                      </th>
                      <td className="block rounded-2xl bg-teal-soft/60 p-4 md:table-cell md:rounded-none md:px-6 md:py-6 md:align-top">
                        <span className="mb-2 block text-xs font-bold tracking-[0.12em] text-teal-brand uppercase md:hidden">KIMP</span>
                        <Points items={row.kimp} good />
                      </td>
                      <td className="mt-2 block rounded-2xl bg-surface p-4 md:table-cell md:rounded-none md:bg-transparent md:px-6 md:py-6 md:align-top">
                        <span className="mb-2 block text-xs font-bold tracking-[0.12em] text-ink/45 uppercase md:hidden">{r.name}</span>
                        <Points items={row.rival} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hero-frame relative isolate mt-6 overflow-hidden rounded-[2rem] p-8 text-white sm:p-12">
              <h3 className="text-3xl font-bold sm:text-4xl">{r.why.title}</h3>
              <ol className="mt-8 grid gap-4 md:grid-cols-2">
                {r.why.points.map((p, i) => (
                  <li key={p.title} className="flex gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed text-white/70">
                      <strong className="block font-bold text-white">{p.title}</strong>
                      {p.body && <span className="mt-1 block">{p.body}</span>}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {r.why.actions.map((a, i) => (
                  <CtaLink key={a.label} href={a.href} variant={i === 0 ? "primary" : "glass"} size="lg">
                    {a.label}
                    {i === 0 && <ArrowRight aria-hidden="true" />}
                  </CtaLink>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Points({ items, good = false }: { items: string[]; good?: boolean }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((t) => (
        <li key={t} className={cn("flex items-start gap-2.5 leading-relaxed", good ? "text-ink/80" : "text-ink/60")}>
          <span
            aria-hidden="true"
            className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", good ? "bg-teal-brand text-white" : "bg-ink/10 text-ink/50")}
          >
            {good ? <Check className="size-3" strokeWidth={3} /> : <Minus className="size-3" strokeWidth={3} />}
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
