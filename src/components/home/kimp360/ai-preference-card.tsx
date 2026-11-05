"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewPlayback } from "@/components/home/workflow-animation/hooks/useInViewPlayback";
import { BentoCard } from "./bento-card";
import { Check, Cursor, Hand, Sparkles } from "./icons";

gsap.registerPlugin(useGSAP);

type Pref = "ai" | "human";

const OPTIONS: { id: Pref; title: string; badge: string; badgeClass: string; body: string; Icon: typeof Sparkles }[] = [
  {
    id: "ai",
    title: "AI-assisted",
    badge: "Faster turnaround",
    badgeClass: "bg-[#FFEBDD] text-[#C2571A]",
    body: "Designers may use KIMP’s in-house AI assistant. Every design is still built on your brand and finished by a human.",
    Icon: Sparkles,
  },
  {
    id: "human",
    title: "100% human-made",
    badge: "No AI at any step",
    badgeClass: "bg-[#DDF5EC] text-[#03735F]",
    body: "Fully custom, concepted and finished by hand. Allow a little extra time per request.",
    Icon: Hand,
  },
];

const NEXT: Record<Pref, string> = {
  ai: "AI-assisted concepts, finished by your designer.",
  human: "Hand-crafted from the first sketch by your designer.",
};

/**
 * "Your AI preference, per brand": a working brand-settings panel. A demo
 * cursor flips the setting while it is on screen; the first real click hands
 * control to the visitor and the demo stops.
 */
export function AiPreferenceCard({ className = "" }: { className?: string }) {
  const [pref, setPref] = useState<Pref>("ai");
  const [saved, setSaved] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const demo = useRef<gsap.core.Timeline | null>(null);
  const savedTimer = useRef<number | undefined>(undefined);
  const inView = useInViewPlayback(panel, 0.4);

  const flashSaved = () => {
    setSaved(true);
    window.clearTimeout(savedTimer.current);
    savedTimer.current = window.setTimeout(() => setSaved(false), 1600);
  };

  const takeOver = () => {
    if (!demo.current) return;
    demo.current.kill();
    demo.current = null;
    const cursor = panel.current?.querySelector("[data-ai-cursor]");
    if (cursor) gsap.to(cursor, { autoAlpha: 0, duration: 0.2 });
  };

  useEffect(() => () => window.clearTimeout(savedTimer.current), []);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cursor = el.querySelector<HTMLElement>("[data-ai-cursor]");
        if (!cursor) return;
        // cursor target, relative to the panel; re-read on every loop so it survives resizes
        const at = (sel: string, fx: number, fy: number) => () => {
          const p = el.getBoundingClientRect();
          const r = el.querySelector(sel)!.getBoundingClientRect();
          return { x: r.left - p.left + r.width * fx, y: r.top - p.top + r.height * fy };
        };
        const moveTo = (tl: gsap.core.Timeline, sel: string, fx: number, fy: number) =>
          tl.to(cursor, {
            x: () => at(sel, fx, fy)().x,
            y: () => at(sel, fx, fy)().y,
            duration: 0.9,
            ease: "power2.inOut",
          });
        const click = (tl: gsap.core.Timeline, fn: () => void) =>
          tl.to(cursor, { scale: 0.82, duration: 0.09, ease: "power1.in" }).call(fn).to(cursor, { scale: 1, duration: 0.18, ease: "back.out(3)" });

        gsap.set(cursor, { x: () => at('[data-ai-opt="ai"]', 0.85, 1.4)().x, y: () => at('[data-ai-opt="ai"]', 0.85, 1.4)().y, autoAlpha: 0 });
        const tl = gsap.timeline({ repeat: -1, repeatRefresh: true, delay: 0.6, paused: true });
        tl.to(cursor, { autoAlpha: 1, duration: 0.25 });
        moveTo(tl, '[data-ai-opt="human"]', 0.72, 0.42);
        click(tl, () => setPref("human"));
        tl.to({}, { duration: 0.5 });
        moveTo(tl, "[data-ai-save]", 0.6, 0.6);
        click(tl, flashSaved);
        tl.to({}, { duration: 1.8 });
        moveTo(tl, '[data-ai-opt="ai"]', 0.72, 0.42);
        click(tl, () => setPref("ai"));
        tl.to({}, { duration: 0.5 });
        moveTo(tl, "[data-ai-save]", 0.6, 0.6);
        click(tl, flashSaved);
        tl.to({}, { duration: 1.6 });
        demo.current = tl;
        return () => {
          demo.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: panel },
  );

  useEffect(() => {
    const t = demo.current;
    if (!t) return;
    if (inView) t.play();
    else t.pause();
  }, [inView]);

  const choose = (p: Pref) => {
    takeOver();
    setPref(p);
    setSaved(false);
  };
  const save = () => {
    takeOver();
    flashSaved();
  };

  return (
    <BentoCard
      tone="peach"
      title="Your AI preference, per brand"
      body="Tell us once, per brand, whether your designers may use KIMP’s in-house AI assistant. Change it any time; your Creative PM applies it to every request."
      className={className}
    >
      <div className="mt-auto px-4 pt-6 pb-4 sm:px-6 sm:pb-6">
        <div
          ref={panel}
          className="relative rounded-[18px] bg-white text-[#1E1F2B] shadow-[0_24px_50px_-28px_rgba(120,60,20,0.55),0_0_0_1px_rgba(255,255,255,0.9)]"
        >
          {/* window bar */}
          <div className="flex items-center gap-2.5 border-b border-[#F0F2F6] px-4 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <i className="size-2.5 rounded-full bg-[#FF6159]" />
              <i className="size-2.5 rounded-full bg-[#FFBD2E]" />
              <i className="size-2.5 rounded-full bg-[#28C941]" />
            </span>
            <p className="truncate text-[0.75rem] font-medium text-[#5B6478]">
              Brand settings · <span className="text-[#1E1F2B]">Northwind</span> · AI preference
            </p>
          </div>

          <div role="radiogroup" aria-label="AI preference for Northwind" className="space-y-2.5 p-3.5 sm:p-4">
            {OPTIONS.map((o) => {
              const on = pref === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  data-ai-opt={o.id}
                  onClick={() => choose(o.id)}
                  className={`flex w-full items-start gap-3 rounded-[14px] border p-3 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F07422] sm:p-3.5 ${
                    on
                      ? "border-[#F07422] bg-[#FFF8F2] shadow-[0_0_0_3px_rgba(240,116,34,0.12)]"
                      : "border-[#E6EAF0] bg-white hover:border-[#D5DBE4]"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors duration-300 ${
                      on ? "border-[#F07422] bg-[#F07422] text-white" : "border-[#CBD2DD] text-transparent"
                    }`}
                  >
                    <Check className="size-3" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <o.Icon className={`size-4 ${o.id === "ai" ? "text-[#F07422]" : "text-[#03816D]"}`} />
                      <span className="text-[0.9rem] font-semibold">{o.title}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[0.66rem] font-semibold ${o.badgeClass}`}>{o.badge}</span>
                    </span>
                    <span className="mt-1 block text-[0.76rem] leading-[1.55] text-[#6B7489]">{o.body}</span>
                  </span>
                </button>
              );
            })}

            {/* the next request, following the setting */}
            <div className="flex items-center gap-3 rounded-[14px] border border-dashed border-[#E3E7EE] bg-[#FAFBFD] p-3">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-[10px] text-white transition-colors duration-300 ${
                  pref === "ai" ? "bg-gradient-to-br from-[#F6A55E] to-[#E5671B]" : "bg-gradient-to-br from-[#2BB394] to-[#03816D]"
                }`}
              >
                {pref === "ai" ? <Sparkles className="size-4.5" /> : <Hand className="size-4.5" />}
              </span>
              <div key={pref} className="cc-swap min-w-0 text-[0.76rem] leading-[1.45]">
                <p className="text-[#6B7489]">
                  Next request: <span className="font-semibold text-[#1E1F2B]">Instagram carousel</span>
                </p>
                <p className="truncate text-[#5B6478]">{NEXT[pref]}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#F0F2F6] px-4 py-3">
            <p className="text-[0.68rem] leading-[1.45] text-[#8A93A6]">
              Applies to every new request for this brand
              <br />
              Change anytime
            </p>
            <button
              type="button"
              data-ai-save
              onClick={save}
              className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[10px] px-3.5 text-[0.78rem] font-semibold text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F07422] ${
                saved ? "bg-[#03816D]" : "bg-[#14161C] hover:bg-[#2A2E38]"
              }`}
            >
              {saved ? (
                <>
                  <Check className="size-3.5" /> Saved
                </>
              ) : (
                "Save preference"
              )}
            </button>
          </div>

          {/* demo cursor */}
          <Cursor data-ai-cursor className="pointer-events-none invisible absolute top-0 left-0 z-10 size-6 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]" />
          <p className="sr-only" aria-live="polite">
            {saved ? "Preference saved." : ""}
          </p>
        </div>
        <p className="mt-3 text-center text-[0.72rem] text-[#9A6A4C]">Illustrative interface. Example brand. Try switching it.</p>
      </div>
    </BentoCard>
  );
}
