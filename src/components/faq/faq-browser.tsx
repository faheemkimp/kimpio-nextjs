"use client";

import { ArrowLeft, Loader2, Plus, Search } from "lucide-react";
import { useState, type FormEvent } from "react";

import { FAQ_BROWSER } from "@/content/faq";
import { cn } from "@/lib/utils";
import type { FaqCategory, FaqItem } from "@/lib/wp/faqs";

import { FaqRichText } from "./faq-rich-text";

type SearchState = { q: string; status: "loading" | "done" | "error"; items: FaqItem[] };

function FaqList({ id, items }: { id: string; items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={`${item.q}-${i}`}
          name={id}
          className="group rounded-[1.4rem] bg-white ring-1 ring-border transition-[box-shadow] open:shadow-[0_24px_44px_-30px_rgb(27_30_35/0.4)] open:ring-brand/30"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 rounded-[1.4rem] px-5 py-5 text-left marker:hidden sm:px-6 [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="hidden w-7 shrink-0 text-sm font-bold text-ink/30 tabular-nums transition-colors group-open:text-brand sm:block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="flex-1 text-base font-bold text-ink sm:text-lg">{item.q}</h4>
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white"
            >
              <Plus className="size-4" strokeWidth={2.5} />
            </span>
          </summary>
          <div className="px-5 pb-6 sm:pr-8 sm:pl-[4.25rem]">
            <FaqRichText nodes={item.a} />
          </div>
        </details>
      ))}
    </div>
  );
}

/**
 * Live "ki_faq-section": category list (sidebar <h4> "CATEGORIES"), a keyword
 * search and the questions. Every category's questions are in the server HTML
 * (inactive ones `hidden`, as live hides them with CSS), so all answers stay
 * crawlable; search calls /api/faq (the live admin-ajax `searchfaqs`).
 */
export function FaqBrowser({ categories, initial }: { categories: FaqCategory[]; initial: string }) {
  const t = FAQ_BROWSER;
  const [active, setActive] = useState(initial);
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState<SearchState | null>(null);
  const [invalid, setInvalid] = useState(false);

  function pick(id: string) {
    setActive(id);
    setSearch(null);
    setTerm("");
    setInvalid(false);
  }

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = term.replace(/\s+/g, " ").trim();
    if (!q) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setSearch({ q, status: "loading", items: [] });
    try {
      const res = await fetch(`/api/faq?q=${encodeURIComponent(q.slice(0, 100))}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { items: FaqItem[] };
      setSearch({ q, status: "done", items: data.items });
    } catch {
      setSearch({ q, status: "error", items: [] });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12 xl:grid-cols-[19rem_1fr]">
      <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[1.6rem] bg-white p-3 ring-1 ring-border sm:p-4 lg:p-5">
          <h4 className="px-2 pt-1 pb-3 text-xs font-bold tracking-[0.18em] text-ink/45">{t.categoriesTitle}</h4>
          <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
            {categories.map((c) => {
              const on = !search && c.id === active;
              return (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => pick(c.id)}
                    aria-pressed={on}
                    aria-controls={`faq-cat-${c.id}`}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold whitespace-nowrap transition-colors sm:text-[0.95rem]",
                      on ? "bg-brand text-white shadow-[0_10px_22px_-12px_rgb(241_115_30/0.8)]" : "bg-surface text-ink/75 hover:bg-brand-soft hover:text-ink lg:bg-transparent",
                    )}
                  >
                    {c.name}
                    <span className={cn("hidden rounded-full px-2 py-0.5 text-xs tabular-nums lg:inline", on ? "bg-white/20 text-white" : "bg-surface text-ink/45")}>
                      {c.items.length}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="min-w-0">
        <form role="search" onSubmit={onSearch} className="flex gap-2 rounded-2xl bg-white p-2 ring-1 ring-border focus-within:ring-2 focus-within:ring-brand/60">
          <label htmlFor="faq-search" className="sr-only">
            {t.searchPlaceholder}
          </label>
          <input
            id="faq-search"
            type="search"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              if (invalid) setInvalid(false);
            }}
            placeholder={t.searchPlaceholder}
            aria-invalid={invalid}
            maxLength={100}
            className={cn(
              "h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-ink outline-none placeholder:text-ink/40 sm:px-4",
              invalid && "placeholder:text-red-600",
            )}
          />
          <button
            type="submit"
            data-click-sound=""
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-ink px-4 font-semibold text-white transition-colors hover:bg-brand sm:px-6"
          >
            {search?.status === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Search className="size-4" aria-hidden="true" />}
            <span className="hidden sm:inline">{t.searchLabel}</span>
            <span className="sr-only sm:hidden">{t.searchLabel}</span>
          </button>
        </form>

        <div className="mt-6" aria-live="polite">
          {search && (
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-ink/60">
                  {t.resultsFor} <span className="font-bold text-ink">“{search.q}”</span>
                  {search.status === "done" && <span className="ml-2 text-sm tabular-nums">({search.items.length})</span>}
                </p>
                <button type="button" onClick={() => pick(active)} className="inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-brand">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {t.clear}
                </button>
              </div>
              {search.status === "loading" && (
                <div className="grid place-items-center rounded-[1.4rem] bg-white py-16 ring-1 ring-border">
                  <Loader2 className="size-6 animate-spin text-brand" aria-hidden="true" />
                </div>
              )}
              {search.status === "error" && <p className="rounded-[1.4rem] bg-white px-6 py-12 text-center text-ink/70 ring-1 ring-border">{t.searchError}</p>}
              {search.status === "done" &&
                (search.items.length ? (
                  <FaqList id="faq-search-results" items={search.items} />
                ) : (
                  <p className="rounded-[1.4rem] bg-white px-6 py-12 text-center text-ink/70 ring-1 ring-border">{t.noResults}</p>
                ))}
            </div>
          )}

          {categories.map((c) => (
            <div key={c.id} id={`faq-cat-${c.id}`} hidden={!!search || c.id !== active}>
              <FaqList id={`faq-cat-${c.id}-list`} items={c.items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
