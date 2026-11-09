import {
  Bot,
  Check,
  Equal,
  FileText,
  Hourglass,
  type LucideIcon,
  MessageSquareText,
  PenTool,
  Plus,
  RotateCw,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { HYBRID } from "@/content/home-sections";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

type Row = { text: string; kind: "bad" | "good" | "loop" };
type Flow = {
  from: { icon: LucideIcon; label: string };
  wire: { label: string; speed: string };
  via: { icon: LucideIcon; label: string; badge: string; iconClass?: string };
  out: { title: string; rows: Row[] };
};

/** Illustrative pipelines for each card's top panel. Decorative only. */
const OPTION_META: { icon: LucideIcon; flow: Flow }[] = [
  {
    icon: Bot,
    flow: {
      from: { icon: MessageSquareText, label: "Prompt" },
      wire: { label: "secs", speed: "0.6s" },
      via: { icon: Bot, label: "AI tool", badge: "AI", iconClass: "flow-glitch" },
      out: {
        title: "Output",
        rows: [
          { text: "Generic", kind: "bad" },
          { text: "Off-brand", kind: "bad" },
          { text: "6 fingers", kind: "bad" },
        ],
      },
    },
  },
  {
    icon: Hourglass,
    flow: {
      from: { icon: FileText, label: "Brief" },
      wire: { label: "days", speed: "3.2s" },
      via: { icon: Hourglass, label: "Designer", badge: "1", iconClass: "flow-flip" },
      out: {
        title: "Revisions",
        rows: [
          { text: "On-brand", kind: "good" },
          { text: "Round 2", kind: "loop" },
          { text: "Round 3…", kind: "loop" },
        ],
      },
    },
  },
];

const KIMP_FLOW: Flow = {
  from: { icon: FileText, label: "Brief" },
  wire: { label: "hours", speed: "1s" },
  via: { icon: PenTool, label: "AI + designer", badge: "PM" },
  out: {
    title: "Delivered",
    rows: [
      { text: "On-brand", kind: "good" },
      { text: "Human-made", kind: "good" },
      { text: "PM approved", kind: "good" },
    ],
  },
};

/** Renders `text` with the first `phrase` picked out in brand colour (text itself unchanged). */
function Highlight({ text, phrase }: { text: string; phrase: string }) {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong className="font-bold text-brand">{phrase}</strong>
      {text.slice(at + phrase.length)}
    </>
  );
}

/**
 * "AI alone isn't enough": [AI-only] + [Traditional] = [KIMP]. On large
 * screens the two half-answers slide in from the sides as you scroll and
 * meet the featured KIMP card; smaller screens stack with operators between.
 * Each card's top panel is a small animated pipeline (input -> worker -> output).
 */
export function HybridEquation() {
  return (
    <section aria-labelledby="hybrid-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />

      <div className="container-page">
        {/* Title runs full width on two lines (claim / counter-claim); problem and answer sit side by side below. */}
        <SectionHeading
          id="hybrid-title"
          eyebrow={HYBRID.eyebrow}
          title={HYBRID.title}
          align="left"
          className="max-w-none"
          // The softened second sentence is the h2's last child span: start it on its own line.
          titleClassName="[&>span:last-child]:block"
        />

        <div data-fx="reveal" data-delay="0.15" className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-slate-brand uppercase">The problem</p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">{HYBRID.intro}</p>
          </div>
          <div className="border-l-2 border-brand pl-5">
            <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">KIMP&apos;s answer</p>
            <p className="mt-2 text-base leading-relaxed font-medium text-ink sm:text-[1.05rem]">
              <Highlight text={HYBRID.answer} phrase="your creative department" />
            </p>
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:mt-32 lg:grid-cols-[1fr_auto_1fr_auto_1.2fr] lg:gap-4">
          {HYBRID.options.map((opt, i) => {
            const { icon: Icon, flow } = OPTION_META[i];
            return (
              <div key={opt.title} className="contents">
                <article
                  data-fx="merge"
                  data-from={i === 0 ? "left" : "right"}
                  className="flex flex-col rounded-[1.75rem] bg-white p-2 ring-1 ring-border"
                >
                  <div className="rounded-[1.35rem] bg-surface/80 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-11 place-items-center rounded-2xl bg-white text-slate-brand shadow-sm ring-1 ring-border">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-brand ring-1 ring-border">
                        {opt.verdict}
                      </span>
                    </div>
                    <FlowDiagram flow={flow} />
                  </div>
                  <div className="px-5 pt-5 pb-6">
                    <h3 className="text-xl font-bold text-ink">{opt.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {opt.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[0.95rem] leading-snug text-ink/70">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#fde8e8] text-[#d93a3f]">
                            <X className="size-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                <Operator>{i === 0 ? <Plus /> : <Equal />}</Operator>
              </div>
            );
          })}

          {/* KIMP: the featured, dark card */}
          <article
            data-fx="reveal"
            className="relative isolate mt-32 flex flex-col overflow-visible rounded-[1.75rem] p-2 text-white shadow-[0_40px_80px_-40px_rgb(241_115_30/0.75)] lg:mt-0"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] bg-ink">
              <div className="absolute -top-24 -right-16 size-72 rounded-full bg-brand/45 blur-3xl" />
              <div className="absolute -bottom-24 -left-10 size-60 rounded-full bg-[#7c69e8]/30 blur-3xl" />
            </div>
            {/* chest-up mascot: layered under the card fill (-z-20 vs -z-10) and sunk 14px,
                so the card edge hides its straight bottom cut */}
            <Image
              src="/images/mascot/hero-chest.webp"
              alt=""
              width={744}
              height={580}
              sizes="160px"
              className="pointer-events-none absolute right-8 bottom-[calc(100%-14px)] -z-20 w-40 sm:w-44"
            />
            <div className="rounded-[1.35rem] bg-white/[0.06] p-5 ring-1 ring-white/10">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand text-white shadow-[0_8px_18px_-8px_rgb(241_115_30/0.9)]">
                  <Sparkles className="size-5" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand">{HYBRID.kimp.verdict}</span>
              </div>
              <FlowDiagram flow={KIMP_FLOW} dark />
            </div>
            <div className="px-5 pt-5 pb-6">
              <h3 className="text-2xl font-bold">{HYBRID.kimp.title}</h3>
              <ul className="mt-4 space-y-3">
                {HYBRID.kimp.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] leading-snug font-semibold text-white/90">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        <p
          data-fx="reveal"
          className="mx-auto mt-14 max-w-3xl text-center text-xl leading-relaxed font-semibold text-ink sm:text-2xl"
        >
          {HYBRID.outro}
        </p>
      </div>
    </section>
  );
}

/** input node -> labelled wire -> worker node (with badge) -> wire -> output card. */
function FlowDiagram({ flow, dark = false }: { flow: Flow; dark?: boolean }) {
  const { from, wire, via, out } = flow;
  const wireStyle = {
    "--wire-speed": wire.speed,
    "--wire": dark ? "rgb(241 115 30 / 0.7)" : "rgb(27 30 35 / 0.28)",
  } as CSSProperties;

  return (
    <div aria-hidden="true" className="mt-5 flex items-center" style={wireStyle}>
      <FlowNode icon={from.icon} label={from.label} dark={dark} />
      <Wire label={wire.label} dark={dark} />
      <FlowNode icon={via.icon} label={via.label} badge={via.badge} iconClass={via.iconClass} dark={dark} />
      <Wire dark={dark} delay="0.3s" />

      <div
        className={cn(
          "w-[6.75rem] shrink-0 overflow-hidden rounded-lg text-[0.68rem] font-semibold shadow-sm ring-1",
          dark ? "bg-white/[0.07] ring-white/15" : "bg-white ring-border",
        )}
      >
        <p
          className={cn(
            "border-b px-2 py-1 text-[0.58rem] font-bold tracking-wider uppercase",
            dark ? "border-white/10 text-white/50" : "border-border text-ink/45",
          )}
        >
          {out.title}
        </p>
        <ul className="space-y-1 px-2 py-1.5">
          {out.rows.map((r, k) => (
            <li
              key={r.text}
              className={cn("flow-row flex items-center gap-1.5 whitespace-nowrap", dark ? "text-white/85" : "text-ink/70")}
              style={{ "--i": k } as CSSProperties}
            >
              <RowIcon kind={r.kind} />
              {r.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FlowNode({
  icon: Icon,
  label,
  badge,
  iconClass,
  dark,
}: {
  icon: LucideIcon;
  label: string;
  badge?: string;
  iconClass?: string;
  dark: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <span
        className={cn(
          "relative grid size-10 place-items-center rounded-xl shadow-sm ring-1",
          dark ? "bg-white/[0.08] text-brand ring-white/15" : "bg-white text-slate-brand ring-border",
        )}
      >
        <Icon className={cn("size-[1.1rem]", iconClass)} />
        {badge && (
          <span className="absolute -top-2 -right-2.5">
            <span className="flow-ping absolute inset-0 rounded-full bg-brand/50" />
            <span className="relative grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[0.55rem] leading-none font-bold text-white">
              {badge}
            </span>
          </span>
        )}
      </span>
      <span className={cn("text-[0.62rem] font-semibold whitespace-nowrap", dark ? "text-white/60" : "text-ink/50")}>{label}</span>
    </div>
  );
}

function Wire({ label, dark, delay = "0s" }: { label?: string; dark: boolean; delay?: string }) {
  return (
    <div className="relative mx-1 -mt-5 h-4 min-w-4 flex-1">
      {label && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[0.58rem] whitespace-nowrap",
            dark ? "text-brand" : "text-ink/45",
          )}
        >
          {label}
        </span>
      )}
      <span className="flow-wire absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2" />
      <span
        className={cn("flow-packet absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full", dark ? "bg-brand shadow-[0_0_8px_#f1731e]" : "bg-slate-brand")}
        style={{ "--packet-delay": delay } as CSSProperties}
      />
    </div>
  );
}

function RowIcon({ kind }: { kind: Row["kind"] }) {
  if (kind === "bad")
    return (
      <span className="grid size-3 shrink-0 place-items-center rounded-full bg-[#fde8e8] text-[#d93a3f]">
        <X className="size-2" strokeWidth={3.5} />
      </span>
    );
  if (kind === "loop") return <RotateCw className="flow-spin size-3 shrink-0 text-slate-brand" strokeWidth={2.5} />;
  return (
    <span className="grid size-3 shrink-0 place-items-center rounded-full bg-brand text-white">
      <Check className="size-2" strokeWidth={3.5} />
    </span>
  );
}

function Operator({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center">
      <span className="grid size-11 place-items-center rounded-full bg-white text-ink shadow-[0_8px_20px_-10px_rgb(27_30_35/0.4)] ring-1 ring-border [&_svg]:size-5 [&_svg]:stroke-[2.5]">
        {children}
      </span>
    </div>
  );
}
