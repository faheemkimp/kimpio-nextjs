"use client";

import { Clapperboard, Code2, Palette } from "lucide-react";
import { useState } from "react";

import { InfoTip } from "@/components/ui/info-tip";
import { ENT_WHAT_WE_DO } from "@/content/enterprise-clients";
import { cn } from "@/lib/utils";

const ICONS = { graphics: Palette, dev: Code2, videos: Clapperboard } as const;

type Item = { label: string; tip?: string };

/**
 * Live Graphics / Dev / Videos tabs (ARIA tabs). All three lists are
 * server-rendered and stay in the DOM; inactive panels are hidden, as on live
 * (Bootstrap tab-pane).
 */
export function WhatWeDoTabs() {
  const tabs = ENT_WHAT_WE_DO.tabs;
  const [active, setActive] = useState(0);
  return (
    <div className="mt-12 sm:mt-14">
      <div role="tablist" aria-label="Work we do" className="mx-auto flex w-fit max-w-full gap-1 rounded-full bg-white p-1.5 ring-1 ring-border">
        {tabs.map((t, i) => {
          const Icon = ICONS[t.id];
          const on = i === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`ent-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`ent-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              data-click-sound=""
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const next = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
                  setActive(next);
                  document.getElementById(`ent-tab-${tabs[next].id}`)?.focus();
                }
              }}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full px-4 font-bold transition-colors sm:px-6",
                on ? "bg-ink text-white" : "text-ink/60 hover:text-ink",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => (
        <div key={t.id} id={`ent-panel-${t.id}`} role="tabpanel" aria-labelledby={`ent-tab-${t.id}`} hidden={i !== active} className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {(t.items as readonly Item[]).map((item) => (
              <li
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[0.88rem] font-semibold text-ink/80 ring-1 ring-border"
              >
                {item.label}
                {item.tip && <InfoTip text={item.tip} label={item.label} />}
              </li>
            ))}
          </ul>
          {"note" in t && <p className="mt-8 text-center font-semibold text-ink">{t.note}</p>}
        </div>
      ))}
    </div>
  );
}
