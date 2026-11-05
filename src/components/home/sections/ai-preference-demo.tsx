"use client";

import { Check, Hand, Sparkles } from "lucide-react";
import { useState } from "react";

import { KIMP360 } from "@/content/home-sections";
import { cn } from "@/lib/utils";

const { preference } = KIMP360;

/**
 * Illustrative KIMP360 brand setting: a real radio group, so it can be tried.
 * The preview chip under it reflects the choice. Nothing is saved.
 */
export function AiPreferenceDemo() {
  const [choice, setChoice] = useState<string>(preference.options[0].key);
  const [saved, setSaved] = useState(false);
  const human = choice === "human";

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-34px_rgb(27_30_35/0.45)] ring-1 ring-border">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-3 truncate text-sm font-semibold text-ink/70">
          Brand settings · {preference.brand} · AI preference
        </span>
      </div>

      <fieldset className="p-5 sm:p-6">
        <legend className="sr-only">AI preference for {preference.brand} (demo)</legend>
        <div className="grid gap-3">
          {preference.options.map((opt) => {
            const selected = choice === opt.key;
            const Icon = opt.key === "human" ? Hand : Sparkles;
            const accent = opt.key === "human" ? "#00a88e" : "#f1731e";
            return (
              <label
                key={opt.key}
                className={cn(
                  "flex cursor-pointer gap-4 rounded-xl p-4 ring-1 transition-[background-color,box-shadow]",
                  selected ? "bg-surface ring-2" : "ring-border hover:bg-surface/60",
                )}
                style={selected ? { boxShadow: `inset 0 0 0 2px ${accent}` } : undefined}
              >
                <input
                  type="radio"
                  name="ai-preference-demo"
                  value={opt.key}
                  checked={selected}
                  onChange={() => {
                    setChoice(opt.key);
                    setSaved(false);
                  }}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand"
                  style={{ borderColor: selected ? accent : "#cfd5de", background: selected ? accent : "transparent" }}
                >
                  {selected && <Check className="size-3.5 text-white" strokeWidth={3.5} />}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-2 font-bold text-ink">
                    <Icon className="size-4" style={{ color: accent }} aria-hidden="true" />
                    {opt.label}
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{ background: `color-mix(in oklab, ${accent} 14%, white)`, color: accent }}
                    >
                      {opt.tag}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-ink/65">{opt.body}</span>
                </span>
              </label>
            );
          })}
        </div>

        {/* live preview of the next request */}
        <div aria-live="polite" className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-ink/15 px-4 py-3">
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-lg text-white transition-colors",
              human ? "bg-teal-brand" : "bg-brand",
            )}
          >
            {human ? <Hand className="size-4" aria-hidden="true" /> : <Sparkles className="size-4" aria-hidden="true" />}
          </span>
          <span className="text-sm leading-snug text-ink/75">
            Next request: <strong className="text-ink">Instagram carousel</strong>
            <br />
            {human ? "Hand-made by your designer, no AI at any step." : "AI-assisted concepts, finished by your designer."}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            {preference.footer}
            <span className="block font-semibold text-ink/70">{preference.change}</span>
          </p>
          <button
            type="button"
            onClick={() => setSaved(true)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
              saved ? "bg-teal-soft text-teal-brand" : "bg-ink text-white hover:bg-ink-soft",
            )}
          >
            {saved && <Check className="size-4" strokeWidth={3} aria-hidden="true" />}
            <span aria-live="polite">{saved ? "Saved" : preference.save}</span>
          </button>
        </div>
      </fieldset>
    </div>
  );
}
