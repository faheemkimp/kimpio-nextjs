"use client";

import { CheckCheck, Compass, Download, Layers, MessageCircle, MessageSquareText } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { HOW_IT_WORKS } from "@/content/home-sections";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

const STEP_ICONS = [MessageCircle, Compass, Layers, CheckCheck] as const;
const STEP_COLORS = ["#4da3ff", "#7c69e8", "#f1731e", "#00a88e"] as const;
const IMG = "/images/home/redesign";
/** Example brief shown in the illustrative KIMP360 window. */
const SAMPLE_BRIEF = "Create a September promotion campaign for our Canadian customers.";
const STEPS = HOW_IT_WORKS.steps;

/**
 * "How a KIMP subscription works" as a scroll story (the pinned
 * "discover" pattern): on large screens the steps scroll past a sticky
 * KIMP360 window whose screen follows the step in the middle of the viewport.
 * Below lg each step shows its own screen inline. The ink panel grows into
 * place as it scrolls in (data-fx="panel"). The stats strip closes the panel.
 */
export function CampaignJourney() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="how-title" className="relative px-2 py-6 sm:px-3">
      <div data-fx="panel" className="relative isolate overflow-clip rounded-[2rem] bg-ink text-white sm:rounded-[2.5rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/4 size-[34rem] rounded-full bg-brand/25 blur-3xl" />
          <div className="absolute top-1/2 -right-40 size-[30rem] rounded-full bg-[#7c69e8]/25 blur-3xl" />
        </div>

        <div className="container-page py-20 sm:py-28">
          <SectionHeading id="how-title" eyebrow={HOW_IT_WORKS.eyebrow} title={HOW_IT_WORKS.title} intro={HOW_IT_WORKS.intro} tone="dark" />

          <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* steps */}
            <ol className="relative min-w-0">
              <span aria-hidden="true" className="absolute top-2 bottom-2 left-6 w-px bg-white/12" />
              <span
                aria-hidden="true"
                className="absolute top-2 left-6 hidden w-px bg-[linear-gradient(#4da3ff,#7c69e8,#e89a00,#f1731e,#00a88e)] transition-[height] duration-700 lg:block"
                style={{ height: `calc(${((active + 0.5) / STEPS.length) * 100}% - 0.5rem)` }}
              />
              {STEPS.map((step, i) => {
                const Icon = STEP_ICONS[i];
                const on = i === active;
                return (
                  <li
                    key={step.title}
                    ref={(el) => {
                      steps.current[i] = el;
                    }}
                    data-step={i}
                    className={cn(
                      "story-step relative flex gap-5 pb-12 last:pb-0 lg:min-h-[58vh] lg:items-center lg:pb-0",
                      !on && "lg:opacity-35",
                    )}
                  >
                    <span
                      className="relative z-10 grid size-12 shrink-0 place-items-center self-start rounded-full text-white ring-[6px] ring-ink transition-transform duration-500 lg:self-center"
                      style={{ background: STEP_COLORS[i], scale: on ? "1.08" : "1" }}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold tracking-[0.14em] uppercase" style={{ color: STEP_COLORS[i] }}>
                        Step {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-2xl leading-snug font-bold text-white sm:text-[1.75rem]">{step.title}</h3>
                      <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-white/65">{step.body}</p>
                      {/* inline screen below lg */}
                      <div aria-hidden="true" className="mt-6 lg:hidden">
                        <Window>
                          <div className="h-80">
                            <Screen i={i} />
                          </div>
                        </Window>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* sticky stage */}
            <div aria-hidden="true" className="hidden lg:block">
              <div className="sticky top-[calc(50vh-17rem)]">
                <Window>
                  <div className="relative h-[28rem]">
                    {STEPS.map((s, i) => (
                      <div key={s.title} data-active={i === active} className="story-screen absolute inset-0">
                        <Screen i={i} />
                      </div>
                    ))}
                  </div>
                </Window>
                <div className="mt-5 flex justify-center gap-2">
                  {STEPS.map((s, i) => (
                    <span
                      key={s.title}
                      className="h-1.5 rounded-full transition-[width,background-color] duration-500"
                      style={{ width: i === active ? 28 : 8, background: i === active ? STEP_COLORS[i] : "rgb(255 255 255 / 0.2)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Stats />
        </div>
      </div>
    </section>
  );
}


function Stats() {
  return (
    <div className="relative mt-16 lg:mt-20">
      <dl data-fx="reveal" className="relative grid gap-2 rounded-[2rem] bg-white/[0.04] p-2 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-[1.5rem] p-7",
              i === 0 ? "bg-[linear-gradient(140deg,#ff9f55_0%,#f1731e_55%,#d85f0d_100%)]" : "bg-white/[0.06]",
            )}
          >
            <dt className="order-2 mt-4 text-lg font-bold text-white">{s.label}</dt>
            <dd className="order-1">
              <span data-fx="count" className="text-5xl leading-none font-bold tracking-tight text-white tabular-nums sm:text-[3.5rem]">
                {s.value}
              </span>
            </dd>
            <dd className={cn("order-3 mt-1.5 text-[0.95rem] leading-relaxed", i === 0 ? "text-white/85" : "text-white/60")}>{s.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ KIMP360 window + screens (decorative) */

function Window({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 min-w-0 truncate text-xs font-semibold text-ink/60">KIMP360 · Northwind · September promo</span>
        <span className="ml-auto hidden rounded-full bg-brand-soft px-2 py-0.5 text-[0.65rem] font-bold text-brand sm:inline">AI-assisted</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Screen({ i }: { i: number }) {
  switch (i) {
    case 0:
      return <DescribeScreen />;
    case 1:
      return <ExploreScreen />;
    case 2:
      return <ExpandScreen />;
    default:
      return <RefineScreen />;
  }
}

function Thumb({ src, className, sizes = "240px" }: { src: string; className?: string; sizes?: string }) {
  return (
    <Image
      src={`${IMG}/${src}.webp`}
      alt=""
      width={640}
      height={640}
      sizes={sizes}
      className={cn("size-full object-cover", className)}
    />
  );
}

function DescribeScreen() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-ink/50">
        <span className="grid size-6 place-items-center rounded-full bg-ink text-[0.6rem] font-bold text-white">N</span>
        New brief
      </div>
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-3 text-sm leading-snug font-semibold text-white">{SAMPLE_BRIEF}</p>
      <div className="flex flex-wrap gap-1.5">
        {["Instagram", "Stories", "Email", "Display ads"].map((c) => (
          <span key={c} className="rounded-full bg-surface px-2.5 py-1 text-[0.7rem] font-semibold text-ink/70">
            {c}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-end gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-[0.65rem] font-bold text-white">PM</span>
        <p className="rounded-2xl rounded-bl-sm bg-surface px-4 py-3 text-sm leading-snug text-ink">
          Got it! Your designer is on it, with directions coming up shortly.
          <span className="bento-typing ml-2 inline-flex gap-0.5 align-middle">
            <span className="size-1 rounded-full bg-ink/40" />
            <span className="size-1 rounded-full bg-ink/40" />
            <span className="size-1 rounded-full bg-ink/40" />
          </span>
        </p>
      </div>
    </div>
  );
}

function ExploreScreen() {
  const dirs = [
    ["campaign-hero", "A · Bold orange"],
    ["campaign-flatlay", "B · Cozy flat lay"],
    ["campaign-outdoor", "C · Lakeside"],
  ];
  return (
    <div className="flex h-full flex-col">
      <p className="text-sm font-bold">3 on-brand directions</p>
      <div className="mt-3 grid flex-1 grid-cols-3 gap-2.5">
        {dirs.map(([src, label]) => (
          <figure key={src} className="flex flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-border">
            <div className="min-h-0 flex-1">
              <Thumb src={src} sizes="180px" />
            </div>
            <figcaption className="px-2 py-2 text-[0.7rem] font-semibold">{label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function ExpandScreen() {
  return (
    <div className="flex h-full flex-col">
      <p className="flex items-center justify-between text-sm font-bold">
        Campaign assets
        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[0.65rem] text-brand">12 in production</span>
      </p>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[0.7fr_1fr_1fr] grid-rows-2 gap-2.5">
        <Asset src="campaign-story" label="Story 9:16" className="row-span-2" />
        <Asset src="campaign-hero" label="Post 1:1" />
        <Asset src="campaign-flatlay" label="Email header" />
        <Asset src="campaign-outdoor" label="Display 16:9" className="col-span-2" />
      </div>
    </div>
  );
}

function Asset({ src, label, className }: { src: string; label: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl ring-1 ring-border", className)}>
      <Thumb src={src} sizes="200px" />
      <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.65rem] font-bold backdrop-blur">{label}</span>
    </div>
  );
}

function RefineScreen() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-start gap-2.5 rounded-xl bg-surface p-3 text-xs leading-snug">
        <MessageSquareText className="mt-0.5 size-4 shrink-0 text-[#7c69e8]" />
        <span className="text-ink/70">
          <span className="font-bold text-ink">You · </span>
          Love it. Can the mugs sit a little lower? Then we&apos;re good to go.
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl">
        <Thumb src="campaign-outdoor" sizes="420px" />
        <span className="absolute top-3 right-3 -rotate-6 rounded-lg border-2 border-teal-brand bg-white/95 px-3 py-1 text-sm font-black tracking-wider text-teal-brand uppercase shadow">
          Approved
        </span>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
        <span className="grid size-9 place-items-center rounded-lg bg-teal-brand text-white">
          <Download className="size-4" />
        </span>
        <span className="text-xs leading-snug">
          <span className="block font-bold text-ink">Production-ready files</span>
          <span className="text-ink/60">PNG · PDF · source files · unlimited revisions</span>
        </span>
      </div>
    </div>
  );
}
