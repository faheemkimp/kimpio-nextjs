"use client";

import { Clapperboard, PenTool, Search, X } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { InfoTip } from "@/components/ui/info-tip";
import { DC_BROWSER, type DcGroup, type DcItem } from "@/content/design-categories";
import { cn } from "@/lib/utils";

const label = (i: DcItem) => (typeof i === "string" ? i : i.label);
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

/**
 * Live "design_cat_section": the "What do you need designed?" search (<h3>)
 * over the A–Z graphics and video lists (<h2> each) and what each plan
 * doesn't include (<h4>). Every category is in the HTML; the search only
 * filters what is shown (live: matching items stay, the rest hide).
 */
export function CategoryBrowser() {
  const b = DC_BROWSER;
  const [query, setQuery] = useState("");
  const inputId = useId();
  const words = norm(query).split(" ").filter(Boolean);
  const match = (i: DcItem) => !words.length || words.some((w) => norm(label(i)).includes(w));
  const total = [...b.graphics.groups, ...b.videos.groups].reduce((n, g) => n + g.items.filter(match).length, 0);

  return (
    <section aria-labelledby="dc-search-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h3 id="dc-search-title" className="text-3xl font-bold tracking-[-0.01em] text-ink sm:text-4xl">
            {b.search.title}
          </h3>
          <form role="search" onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 ring-1 ring-border focus-within:ring-2 focus-within:ring-brand">
            <label htmlFor={inputId} className="sr-only">
              {b.search.label}
            </label>
            <Search aria-hidden="true" className="ml-3 size-5 shrink-0 text-ink/40" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={b.search.placeholder}
              className="h-11 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink/40 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="grid size-9 place-items-center rounded-xl text-ink/50 hover:bg-surface hover:text-ink">
                <X className="size-4" />
              </button>
            )}
            <button
              type="submit"
              data-click-sound=""
              className="h-11 rounded-xl border border-[#c4560a] bg-[linear-gradient(180deg,#ff9f55_0%,#f7802c_45%,#e8650f_100%)] px-5 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_3px_0_#b84d08] active:translate-y-[2px] active:shadow-none"
            >
              {b.search.button}
            </button>
          </form>
          <p aria-live="polite" className={cn("mt-4 text-sm font-medium text-ink/55", (!words.length || total) && "sr-only")}>
            {words.length && !total ? b.noResults : words.length ? `${total} matching categories` : ""}
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Column icon={<PenTool className="size-6" />} title={b.graphics.title} groups={b.graphics.groups} excluded={b.graphics.excluded} match={match} filtering={words.length > 0} />
          <Column icon={<Clapperboard className="size-6" />} title={b.videos.title} groups={b.videos.groups} excluded={b.videos.excluded} match={match} filtering={words.length > 0} dark />
        </div>
      </div>
    </section>
  );
}

function Column({
  icon,
  title,
  groups,
  excluded,
  match,
  filtering,
  dark = false,
}: {
  icon: ReactNode;
  title: string;
  groups: readonly DcGroup[];
  excluded: { title: { before: string; em: string; after: string }; items: readonly string[] };
  match: (i: DcItem) => boolean;
  filtering: boolean;
  dark?: boolean;
}) {
  const count = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <div className={cn("flex min-w-0 flex-col rounded-[2rem] p-6 ring-1 sm:p-8", dark ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-border")}>
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className={cn("grid size-12 place-items-center rounded-2xl", dark ? "bg-teal-brand text-white" : "bg-brand-soft text-brand")}>
          {icon}
        </span>
        <h2 className="text-3xl font-bold tracking-[0.04em]">{title}</h2>
        <span aria-hidden="true" className={cn("ml-auto rounded-full px-3 py-1 text-xs font-bold tabular-nums", dark ? "bg-white/10 text-white/70" : "bg-surface text-ink/55")}>
          A–Z · {count}
        </span>
      </div>

      <div className="mt-7 flex-1 space-y-2">
        {groups.map((g) => {
          const shown = g.items.filter(match);
          return (
            <div
              key={g.letter}
              hidden={filtering && !shown.length}
              className={cn("grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3 rounded-2xl p-2.5", dark ? "odd:bg-white/[0.04]" : "odd:bg-surface/70")}
            >
              <span aria-hidden="true" className={cn("grid size-11 place-items-center rounded-xl text-xl font-bold uppercase", dark ? "bg-white/10 text-brand" : "bg-white text-brand ring-1 ring-border")}>
                {g.letter}
              </span>
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {g.items.map((it) => {
                  const l = label(it);
                  const on = match(it);
                  return (
                    <li
                      key={l}
                      hidden={filtering && !on}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold",
                        filtering && on
                          ? "bg-brand text-white"
                          : dark
                            ? "bg-white/[0.07] text-white/85 ring-1 ring-white/10"
                            : "bg-white text-ink/80 ring-1 ring-border",
                      )}
                    >
                      {l}
                      {typeof it !== "string" && <InfoTip text={it.tip} label={l} tone={dark || (filtering && on) ? "dark" : "light"} />}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className={cn("mt-6 rounded-[1.5rem] p-6", dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] ring-1 ring-brand/15")}>
        <h4 className="text-xl font-bold">
          {excluded.title.before}
          <span className="text-brand">{excluded.title.em}</span>
          {excluded.title.after}
        </h4>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {excluded.items.map((x) => (
            <li
              key={x}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium line-through decoration-1",
                dark ? "bg-white/[0.06] text-white/55 decoration-white/30" : "bg-white/70 text-ink/55 decoration-ink/30",
              )}
            >
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
