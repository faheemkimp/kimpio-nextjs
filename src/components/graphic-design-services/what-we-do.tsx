import {
  ArrowRight,
  Ban,
  BookOpen,
  Check,
  Info,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Printer,
  ShoppingBag,
  X,
  type LucideIcon,
} from "lucide-react";

import { GDS_WHAT_WE_DO as W } from "@/content/graphic-design-services";
import { cn } from "@/lib/utils";

import "./gds.css";

type GroupKey = (typeof W.groups)[number]["key"];

const GROUP_STYLE: Record<GroupKey, { icon: LucideIcon; tile: string }> = {
  brand: { icon: Palette, tile: "bg-[#fff1e7] text-brand" },
  social: { icon: Megaphone, tile: "bg-[#ffe9f0] text-[#e0457b]" },
  print: { icon: Printer, tile: "bg-teal-soft text-teal-brand" },
  publishing: { icon: BookOpen, tile: "bg-[#eef0ff] text-[#5b5bd6]" },
  ecommerce: { icon: ShoppingBag, tile: "bg-[#fff6d9] text-[#b7791f]" },
  web: { icon: MonitorSmartphone, tile: "bg-[#e6f3ff] text-[#2b7bd6]" },
};

const TIP_ID = "gds-wwd-tip";

/**
 * "What We Do" catalogue: design types grouped into category cards, with the
 * out-of-scope list in a red side card. Every item is static markup, so the
 * full list is always crawlable. Keeps the live <h2>s "What We Do" and
 * "What We Don’t Do:"; category labels are deliberately not headings.
 */
export function WhatWeDoCatalogue() {
  return (
    <div className="mt-14 space-y-4 sm:mt-20 sm:space-y-5">
      <div
        data-fx="reveal"
        className="rounded-[1.75rem] bg-white p-4 ring-1 ring-border sm:rounded-[2rem] sm:p-8"
      >
        <div className="px-2 pt-2 sm:px-0 sm:pt-0">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-ink sm:text-3xl">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-teal-soft text-teal-brand"
            >
              <Check className="size-5" strokeWidth={3} />
            </span>
            {W.doTitle}
          </h2>
          <p className="mt-2 text-ink/60">
            <span className="font-bold text-ink">
              {W.doItems.length} design types
            </span>{" "}
            across {W.groups.length} categories, all on one plan.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {W.groups.map((g) => {
            const s = GROUP_STYLE[g.key];
            const Icon = s.icon;
            return (
              <div
                key={g.key}
                className="group/card flex flex-col rounded-2xl bg-surface/70 p-5 ring-1 ring-border transition-[box-shadow,background-color] duration-300 hover:bg-white hover:shadow-[0_24px_40px_-28px_rgb(27_30_35/0.35)]"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-10 place-items-center rounded-xl transition-transform duration-300 group-hover/card:-rotate-6",
                      s.tile,
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <p className="font-bold text-ink">{g.label}</p>
                  <span className="ml-auto text-sm font-semibold text-ink/40 tabular-nums">
                    {g.items.length}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => {
                    const tip = W.tooltips[item];
                    return (
                      <li
                        key={item}
                        className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.85rem] font-semibold text-ink/80 ring-1 ring-border"
                      >
                        {item}
                        {tip && (
                          <span className="relative inline-flex">
                            <button
                              type="button"
                              aria-describedby={TIP_ID}
                              className="peer grid place-items-center rounded-full text-brand"
                            >
                              <Info className="size-4" aria-hidden="true" />
                              <span className="sr-only">About {item}</span>
                            </button>
                            <span
                              id={TIP_ID}
                              role="tooltip"
                              className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-xl bg-ink px-3.5 py-2.5 text-xs leading-relaxed font-medium text-white opacity-0 shadow-xl transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100"
                            >
                              {tip}
                            </span>
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer: live-chat note + samples CTA */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-ink/[0.03] p-5 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
          <p className="flex gap-3 leading-relaxed text-ink/70">
            <MessageCircle
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-brand"
            />
            <span>
              {W.note.before}
              <a
                href={W.note.link.href}
                className="font-semibold text-teal-brand underline decoration-teal-brand/30 underline-offset-4 hover:decoration-teal-brand"
              >
                {W.note.link.label}
              </a>
              {W.note.after}
            </span>
          </p>
          <a
            href={W.samplesCta.href}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-bold text-white transition-colors hover:bg-brand"
          >
            {W.samplesCta.label}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* Out of scope: full-width red band */}
      <div
        data-fx="reveal"
        data-delay="0.1"
        className="relative isolate overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[#fff4f5] to-[#ffe3e7] p-6 ring-1 ring-[#e11d48]/15 sm:rounded-[2rem] sm:p-8 lg:flex lg:items-center lg:gap-10 lg:px-10"
      >
        <Ban
          aria-hidden="true"
          className="absolute -right-10 -bottom-16 -z-10 size-48 text-[#e11d48]/[0.07]"
          strokeWidth={1.5}
        />
        <div className="shrink-0">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-[#9f1239] sm:text-3xl">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-[#e11d48] text-white"
            >
              <X className="size-5" strokeWidth={3} />
            </span>
            {W.dontTitle}
          </h2>
          <p className="mt-2 text-sm text-[#9f1239]/60">
            Outside our design-only scope.
          </p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2 lg:mt-0 lg:ml-auto lg:justify-end">
          {W.dontItems.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2.5 rounded-full bg-white/80 px-4 py-2.5 font-semibold text-[#e11d48] ring-1 ring-[#e11d48]/15"
            >
              <span
                aria-hidden="true"
                className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e11d48]/10 text-[#e11d48]"
              >
                <X className="size-3" strokeWidth={3.5} />
              </span>
              <span className="line-through decoration-[#e11d48]/50 decoration-2">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
