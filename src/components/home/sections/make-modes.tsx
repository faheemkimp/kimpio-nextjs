"use client";

import {
  ArrowRight,
  Brush,
  Download,
  FileText,
  Hand,
  PenTool,
  ScanEye,
  Sparkles,
  Upload,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { CtaLink } from "@/components/ui/cta-button";
import { MODES } from "@/content/home-sections";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

/** Per mode: accent, tab icon, pipeline icons and how much AI is in the loop. */
const MODE_META: Record<
  (typeof MODES.items)[number]["key"],
  { color: string; tint: string; icon: LucideIcon; steps: LucideIcon[]; ai: number; aiLabel: string }
> = {
  assisted: {
    color: "#f1731e",
    tint: "bg-[linear-gradient(160deg,#fff6ee,#ffe3cd)]",
    icon: Sparkles,
    steps: [FileText, WandSparkles, PenTool, Download],
    ai: 45,
    aiLabel: "AI assists, humans finish",
  },
  human: {
    color: "#00a88e",
    tint: "bg-[linear-gradient(160deg,#ecfbf6,#c9f1e6)]",
    icon: Hand,
    steps: [FileText, Brush, PenTool, Download],
    ai: 0,
    aiLabel: "Zero AI, every step by hand",
  },
  finish: {
    color: "#7c69e8",
    tint: "bg-[linear-gradient(160deg,#f5f2ff,#e1daff)]",
    icon: Upload,
    steps: [Upload, ScanEye, PenTool, Download],
    ai: 80,
    aiLabel: "Your AI draft, our human finish",
  },
};

/**
 * "You choose how your designs get made": an accessible tab set (arrow keys move
 * between tabs). All three panels are in the HTML, inactive ones are `hidden`.
 */
export function MakeModes() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const n = MODES.items.length;
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="modes-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="modes-title" eyebrow={MODES.eyebrow} title={MODES.title} align="center" />

        <div
          role="tablist"
          aria-label="How your designs get made"
          onKeyDown={onKey}
          data-fx="reveal"
          className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-1 rounded-2xl bg-white p-1.5 shadow-[0_10px_30px_-18px_rgb(27_30_35/0.35)] ring-1 ring-border sm:flex-row sm:rounded-full"
        >
          {MODES.items.map((m, i) => {
            const meta = MODE_META[m.key];
            const Icon = meta.icon;
            const selected = i === active;
            return (
              <button
                key={m.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`mode-tab-${m.key}`}
                aria-selected={selected}
                aria-controls={`mode-panel-${m.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[0.95rem] font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 sm:rounded-full",
                  selected ? "bg-ink text-white shadow-[0_8px_20px_-8px_rgb(27_30_35/0.6)]" : "text-ink/65 hover:bg-surface hover:text-ink",
                )}
              >
                <Icon className="size-4" style={{ color: selected ? meta.color : undefined }} aria-hidden="true" />
                {m.title}
              </button>
            );
          })}
        </div>

        {MODES.items.map((m, i) => {
          const meta = MODE_META[m.key];
          return (
            <div
              key={m.key}
              role="tabpanel"
              id={`mode-panel-${m.key}`}
              aria-labelledby={`mode-tab-${m.key}`}
              hidden={i !== active}
              tabIndex={0}
              className="mt-8 outline-none"
            >
              <div className="grid gap-2 rounded-[2rem] bg-white p-2 shadow-[0_30px_60px_-40px_rgb(27_30_35/0.4)] ring-1 ring-border lg:grid-cols-[1fr_1.05fr]">
                <div className="flex flex-col p-6 sm:p-10">
                  <span
                    className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase"
                    style={{ color: meta.color, background: `color-mix(in oklab, ${meta.color} 10%, white)` }}
                  >
                    {String(i + 1).padStart(2, "0")} · {m.title}
                  </span>
                  <h3 className="mt-5 text-3xl leading-tight font-bold tracking-tight text-ink sm:text-[2.4rem]">{m.tagline}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{m.body}</p>
                  <div className="mt-auto pt-9">
                    <CtaLink href={MODES.cta.href}>
                      {MODES.cta.label}
                      <ArrowRight aria-hidden="true" />
                    </CtaLink>
                  </div>
                </div>

                {/* Pipeline visual: floating step cards on a tinted stage */}
                <div aria-hidden="true" className={cn("relative isolate overflow-hidden rounded-[1.5rem] p-6 sm:p-10", meta.tint)}>
                  <div className="fx-dots absolute inset-0 -z-10 opacity-60" />
                  <ol className="relative mx-auto max-w-sm space-y-3">
                    <svg viewBox="0 0 40 300" fill="none" preserveAspectRatio="none" className="absolute top-8 bottom-8 left-[1.55rem] h-[calc(100%-4rem)] w-6">
                      <path d="M4 0 C 34 60, -20 120, 16 160 S 30 260, 4 300" stroke={meta.color} strokeWidth="2" strokeDasharray="4 6" opacity="0.55" vectorEffect="non-scaling-stroke" />
                    </svg>
                    {m.steps.map((step, s) => {
                      const StepIcon = meta.steps[s];
                      const last = s === m.steps.length - 1;
                      return (
                        <li
                          key={step}
                          className={cn(
                            "mode-step relative flex items-center gap-4 rounded-2xl bg-white/90 p-3 pr-4 shadow-[0_14px_30px_-20px_rgb(27_30_35/0.5)] ring-1 ring-black/5 backdrop-blur",
                            s % 2 === 1 && "sm:translate-x-6",
                          )}
                          style={{ animationDelay: `${s * 90}ms` }}
                        >
                          <span
                            className="grid size-10 shrink-0 place-items-center rounded-xl text-white"
                            style={{ background: last ? "#1b1e23" : meta.color }}
                          >
                            <StepIcon className="size-5" />
                          </span>
                          <span className="font-semibold text-ink">{step}</span>
                          {last ? (
                            <span className="ml-auto rounded-full bg-[#e6f4f1] px-2 py-0.5 text-[0.7rem] font-bold text-teal-brand">Done</span>
                          ) : (
                            <span className="ml-auto text-xs font-bold text-ink/35">0{s + 1}</span>
                          )}
                        </li>
                      );
                    })}
                  </ol>

                  <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-black/5">
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-ink">
                      <span>AI involvement</span>
                      <span className="text-right" style={{ color: meta.color }}>{meta.aiLabel}</span>
                    </div>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full transition-[width] duration-700"
                        style={{ width: `${Math.max(meta.ai, 3)}%`, background: meta.color }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs font-medium text-ink/50">
                      <span>100% human</span>
                      <span>Human-finished, always</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
