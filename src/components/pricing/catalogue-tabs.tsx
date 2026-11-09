"use client";

import { Clapperboard, Palette } from "lucide-react";
import { useState } from "react";

import { InfoTip } from "@/components/ui/info-tip";
import { PRICING_CATALOGUE } from "@/content/pricing";
import { cn } from "@/lib/utils";

const ICONS = { graphics: Palette, videos: Clapperboard } as const;

/**
 * Graphics / Videos tabs (ARIA tabs). Both lists are server-rendered and stay
 * in the DOM; the inactive panel is hidden, as on live (Bootstrap tab-pane).
 */
export function CatalogueTabs() {
  const tabs = PRICING_CATALOGUE.tabs;
  const [active, setActive] = useState(0);
  return (
    <div className="mt-12 sm:mt-14">
      <div role="tablist" aria-label="Design types" className="mx-auto flex w-fit gap-1 rounded-full bg-white p-1.5 ring-1 ring-[#0f766e]/15">
        {tabs.map((t, i) => {
          const Icon = ICONS[t.id];
          const on = i === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`pr-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`pr-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
                  setActive(next);
                  document.getElementById(`pr-tab-${tabs[next].id}`)?.focus();
                }
              }}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full px-6 font-bold transition-colors",
                on ? "bg-ink text-white" : "text-ink/60 hover:text-ink",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {t.label}
              <span className={cn("rounded-full px-1.5 text-xs tabular-nums", on ? "bg-white/15" : "bg-surface")}>{t.items.length}</span>
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.id}
          id={`pr-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`pr-tab-${t.id}`}
          hidden={i !== active}
          className="mt-10"
        >
          <ul className="pr-chips flex flex-wrap justify-center gap-2">
            {t.items.map((item, k) => {
              const last = k === t.items.length - 1;
              return (
                <li
                  key={item.label}
                  style={{ ["--i" as string]: Math.min(k, 30) }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.88rem] font-semibold ring-1",
                    last ? "bg-ink text-white ring-ink" : "bg-white text-ink/80 ring-[#0f766e]/12",
                  )}
                >
                  {item.label}
                  {item.tip && <InfoTip text={item.tip} label={item.label} />}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
