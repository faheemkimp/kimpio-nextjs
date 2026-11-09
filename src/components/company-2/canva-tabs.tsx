"use client";

import { Check } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; heading: readonly string[]; items: readonly string[] };

/**
 * Live "whatwedo" tabs (graphics / videos). Both panels stay in the HTML (the
 * hidden one with `hidden`), so every <h4> and list item is crawlable as on live.
 */
export function CanvaTabs({ tabs }: { tabs: readonly Tab[] }) {
  const [active, setActive] = useState(0);
  const base = useId();

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  }

  return (
    <div className="mt-12">
      <div role="tablist" aria-label="What we design in Canva" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-2xl bg-white p-1.5 ring-1 ring-border">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`${base}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            data-click-sound=""
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-bold transition-colors sm:px-6 sm:text-base",
              active === i ? "bg-ink text-white shadow-[0_3px_0_#050607]" : "text-ink/60 hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.id}
          id={`${base}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          className="mt-10 rounded-[2rem] bg-white p-6 ring-1 ring-border sm:p-10"
        >
          <h4 className="mx-auto max-w-3xl text-center text-xl leading-snug font-bold text-ink sm:text-2xl">
            {t.heading.map((l, k) => (
              <span key={l}>
                {k > 0 && <br className="hidden sm:block" />}
                {k > 0 && " "}
                {l}
              </span>
            ))}
          </h4>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2.5 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {t.items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[0.95rem] font-medium text-ink/75">
                <Check aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
