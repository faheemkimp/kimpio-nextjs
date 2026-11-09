"use client";

import { SlidersHorizontal } from "lucide-react";
import { useId, useState } from "react";

import type { PostCard } from "@/lib/wp/queries";
import { cn } from "@/lib/utils";

import { UpdateCard } from "./update-card";

type Filter = { tagId: number; label: string };

/**
 * Live "blog-sec-360" list with its "Filter By" control (All / Update / Pro Tip).
 * Every card is rendered in the HTML, as on live, so all post links stay
 * crawlable; filtering only hides cards on the client.
 */
export function UpdatesBrowser({
  posts,
  filters,
  filterLabel,
  allLabel,
  more,
}: {
  posts: PostCard[];
  filters: readonly Filter[];
  filterLabel: string;
  allLabel: string;
  more: string;
}) {
  const [active, setActive] = useState<number | "all">("all");
  const name = useId();

  const tagOf = (p: PostCard) => filters.find((f) => p.tags.includes(f.tagId));
  const options = [
    { value: "all" as const, label: allLabel, count: posts.length },
    ...filters.map((f) => ({ value: f.tagId, label: f.label, count: posts.filter((p) => p.tags.includes(f.tagId)).length })),
  ];
  const shown = active === "all" ? posts.length : options.find((o) => o.value === active)?.count ?? 0;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-ink/55" aria-live="polite">
          Showing {shown} of {posts.length}
        </p>
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">{filterLabel}</legend>
          <span aria-hidden="true" className="mr-1 inline-flex items-center gap-2 text-sm font-semibold text-ink/70">
            <SlidersHorizontal className="size-4" />
            {filterLabel}
          </span>
          {options.map((o) => (
            <label
              key={o.value}
              className={cn(
                "relative inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                active === o.value ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-border hover:ring-ink/30",
              )}
            >
              <input
                type="radio"
                name={name}
                value={String(o.value)}
                checked={active === o.value}
                onChange={() => setActive(o.value)}
                className="sr-only"
              />
              {o.label}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[0.7rem] leading-none tabular-nums",
                  active === o.value ? "bg-white/15" : "bg-surface text-ink/60",
                )}
              >
                {o.count}
              </span>
            </label>
          ))}
        </fieldset>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => {
          const tag = tagOf(p);
          const hidden = active !== "all" && !p.tags.includes(active);
          return (
            <li key={p.id} hidden={hidden}>
              <UpdateCard post={p} more={more} tag={tag?.label} latest={i === 0} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
