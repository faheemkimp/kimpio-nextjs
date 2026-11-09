import { Check, Image as ImageIcon, Play, Plus } from "lucide-react";
import type { CSSProperties } from "react";

import "@/components/home/sections/service-scenes.css";

/**
 * Kimp Graphics + Video, in the homepage service-scene style (svc-stage /
 * svc-paper): a graphic and a video card drift together around a "+", while
 * the shared queue below works on 3 graphic + 2 video requests at once (the
 * plan's "5 Active Requests"). Decorative; reduced motion shows the final state.
 */
const SLOTS = [
  { kind: "g", label: "Flyer" },
  { kind: "g", label: "Ad set" },
  { kind: "g", label: "Logo" },
  { kind: "v", label: "Reel" },
  { kind: "v", label: "Promo" },
] as const;

export function BundleStage({ tint, className }: { tint: string; className?: string }) {
  return (
    <div aria-hidden="true" style={{ "--tint": tint } as CSSProperties} className={`svc-stage ${className ?? ""}`}>
      {/* one team, one fee */}
      <span className="svc-paper absolute top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-md px-2 py-1 text-[9px] leading-none font-semibold whitespace-nowrap text-ink/75">
        <span className="size-1.5 rounded-full bg-[#f1731e]" />
        <span className="size-1.5 rounded-full bg-[#e8436b]" />
        One team · one flat fee
      </span>

      {/* the two subscriptions merging */}
      <div className="absolute top-[30%] left-1/2 h-24 w-56 -translate-x-1/2">
        <div className="pr-merge-l svc-paper absolute top-0 left-0 h-24 w-28 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-[#f1731e]">
            <span className="absolute -top-4 -right-4 size-14 rounded-full bg-[#ffb27a]" />
            <div className="absolute inset-0 flex flex-col justify-end p-2.5 text-white">
              <span className="flex items-center gap-1 text-[6px] font-bold tracking-[0.16em] uppercase opacity-85">
                <ImageIcon className="size-2.5" /> Graphics
              </span>
              <span className="mt-0.5 text-[16px] leading-none font-extrabold">40% off</span>
            </div>
          </div>
        </div>

        <div className="pr-merge-r svc-paper absolute top-0 right-0 h-24 w-28 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff5f8a,#ff9a62)]">
            <span className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-[60%] place-items-center rounded-full bg-white/90 text-[#e8436b]">
              <Play className="ml-0.5 size-3.5 fill-current" />
            </span>
            <span className="absolute top-2 left-2 text-[6px] font-bold tracking-[0.16em] text-white uppercase">Video</span>
            <span className="absolute inset-x-2 bottom-2 h-1 overflow-hidden rounded-full bg-white/35">
              <span className="pr-scrub block h-full w-full origin-left rounded-full bg-white" />
            </span>
          </div>
        </div>

        <span className="pr-plus absolute top-1/2 left-1/2 z-10 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-white ring-4 ring-[var(--tint)]">
          <Plus className="size-4" strokeWidth={3} />
        </span>
      </div>

      {/* shared queue: 3 graphics + 2 video in progress */}
      <div className="svc-paper absolute inset-x-5 bottom-4 rounded-lg px-2.5 py-2">
        <div className="flex items-center justify-between text-[8px] font-bold text-ink/55">
          <span>In progress</span>
          <span className="tabular-nums text-ink">5 active</span>
        </div>
        <ul className="mt-1.5 grid grid-cols-5 gap-1.5">
          {SLOTS.map((s, i) => {
            const c = s.kind === "g" ? "#f1731e" : "#e8436b";
            return (
              <li key={s.label} className="min-w-0">
                <span className="block truncate text-[7px] font-semibold text-ink/60">{s.label}</span>
                <span className="relative mt-1 block h-1.5 overflow-hidden rounded-full bg-ink/10">
                  <span className="pr-fill absolute inset-0 origin-left rounded-full" style={{ background: c, animationDelay: `${i * 0.35}s` }} />
                </span>
                <span
                  className="pr-done mx-auto mt-1 grid size-3 place-items-center rounded-full text-white"
                  style={{ background: c, animationDelay: `${i * 0.35}s` }}
                >
                  <Check className="size-2" strokeWidth={4} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
