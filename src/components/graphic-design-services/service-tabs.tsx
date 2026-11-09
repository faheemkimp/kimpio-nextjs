"use client";

import {
  Check,
  Clock,
  Crown,
  Eye,
  Headset,
  Image as ImageIcon,
  Send,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { GDS_SERVICE, GDS_WORK, type ServiceTabId } from "@/content/graphic-design-services";
import { cn } from "@/lib/utils";

import "./gds.css";

const CYCLE_MS = 7000;

const TAB_ICONS: Record<ServiceTabId, LucideIcon> = {
  team: Users,
  collaborate: UserPlus,
  advanced: Sparkles,
  help: Headset,
};

/** `--i` drives staggered entrances in gds.css. */
export const idx = (i: number) => ({ "--i": i }) as CSSProperties;

/** Kimp Graphics' four selling points (live "service_sec"). */
export function ServiceTabs() {
  return (
    <AccordionStage
      idPrefix="gds"
      tabs={GDS_SERVICE.tabs}
      icons={TAB_ICONS}
      stages={{ team: <TeamBento />, collaborate: <CollaborateBento />, advanced: <AdvancedBento />, help: <HelpBento /> }}
    />
  );
}

export type AccordionTab = { readonly id: string; readonly label: string; readonly body: string };

/**
 * Selling points as an accordion list beside a bento stage. Every label
 * and body is server-rendered and stays in the DOM (collapsed bodies are
 * clipped, not removed), so crawlers read all of them. The list auto-advances
 * until the visitor picks an item; hover/focus pauses it, reduced motion stops it.
 * Each stage's tile animations replay whenever its tab becomes active.
 */
export function AccordionStage<T extends AccordionTab>({
  idPrefix,
  tabs,
  icons,
  stages,
}: {
  idPrefix: string;
  tabs: readonly T[];
  icons: Record<T["id"], LucideIcon>;
  stages: Record<T["id"], ReactNode>;
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || paused || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % tabs.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, paused, visible, tabs.length]);

  const running = auto && !paused && visible;

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8"
    >
      <ul className="flex flex-col gap-3">
        {tabs.map((tab, i) => {
          const on = i === active;
          const Icon: LucideIcon = icons[tab.id as T["id"]];
          return (
            <li
              key={tab.id}
              className={cn(
                "group relative overflow-hidden rounded-[1.4rem] p-5 ring-1 transition-colors duration-300 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-brand sm:p-6",
                on ? "bg-[linear-gradient(135deg,#fff,#fff6ee)] ring-brand/30" : "bg-white ring-border hover:ring-ink/15",
              )}
            >
              {/* Live wraps each label in an <h2> (accordion header); the button's ::after makes the whole card clickable. */}
              <h2>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${idPrefix}-stage-${tab.id}`}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className="flex w-full items-center gap-4 text-left outline-none after:absolute after:inset-0 after:content-['']"
              >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-2xl transition-[background-color,color,transform] duration-300",
                      on ? "scale-105 bg-brand text-white" :"bg-surface text-ink/45 group-hover:text-ink/70",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span aria-hidden="true" className={cn("block text-xs font-bold tracking-[0.14em] tabular-nums", on ? "text-brand" : "text-ink/30")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("block text-lg leading-snug font-bold transition-colors", on ? "text-ink" : "text-ink/70")}>{tab.label}</span>
                  </span>
              </button>
              </h2>
              {/* Body stays in the DOM; the grid-rows trick animates its height. */}
              <div className={cn("grid transition-[grid-template-rows] duration-500", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <p className="pt-3 leading-relaxed text-ink/65 sm:pl-15">{tab.body}</p>
                </div>
              </div>
              {on && running && (
                <span aria-hidden="true" key={`p-${active}`} className="absolute inset-x-0 bottom-0 h-[3px] bg-brand/15">
                  <span className="gds-progress block h-full bg-brand" style={{ animationDuration: `${CYCLE_MS}ms` }} />
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="relative min-h-[30rem] overflow-hidden rounded-[1.75rem] bg-[linear-gradient(160deg,#04463d,#032f2a_60%,#021f1c)] ring-1 ring-ink/10 sm:min-h-[32rem]">
        <div aria-hidden="true" className="absolute -top-24 -left-20 size-72 rounded-full bg-teal-brand/50 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-16 -bottom-24 size-64 rounded-full bg-brand/25 blur-3xl" />
        <div aria-hidden="true" className="fx-dots absolute inset-0 opacity-40 invert" />
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            id={`${idPrefix}-stage-${tab.id}`}
            aria-hidden="true"
            data-active={i === active}
            className="story-screen absolute inset-4 sm:inset-6"
          >
            {stages[tab.id as T["id"]]}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── tiles ───────────────────────── */

export function Tile({ i, className, dark = false, children }: { i: number; className?: string; dark?: boolean; children: ReactNode }) {
  return (
    <div
      style={idx(i)}
      className={cn(
        "gds-tile relative flex min-h-0 flex-col overflow-hidden rounded-[1.25rem] p-4 sm:p-5",
        dark ? "bg-white/[0.07] text-white ring-1 ring-white/12 backdrop-blur" : "bg-white text-ink shadow-[0_24px_40px_-28px_rgb(0_0_0/0.7)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TileLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={cn("text-[0.7rem] font-bold tracking-[0.12em] uppercase", dark ? "text-white/55" : "text-ink/45")}>{children}</p>;
}

export const bento = "grid h-full grid-cols-2 grid-rows-[1.25fr_1fr] gap-3 sm:gap-4";

/* 01 — dedicated team */
function TeamBento() {
  const people = [
    { n: "PM", c: "#f1731e", r: "Project Manager" },
    { n: "D1", c: "#00806c", r: "Designer · Print" },
    { n: "D2", c: "#7c69e8", r: "Designer · Digital" },
    { n: "D3", c: "#4da3ff", r: "Designer · Illustration" },
  ];
  return (
    <div className={bento}>
      <Tile i={0} className="col-span-2">
        <div className="flex items-center justify-between">
          <TileLabel>Your Kimp team</TileLabel>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-[0.7rem] font-bold text-teal-brand">
            <span className="gds-live size-1.5 rounded-full bg-teal-brand" /> Dedicated
          </span>
        </div>
        <ul className="mt-3 grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
          {people.map((p, k) => (
            <li key={p.n} style={idx(k + 1)} className="gds-pop flex flex-col items-center justify-center gap-2 rounded-xl bg-surface px-2 py-3 text-center">
              <span className="relative grid size-10 place-items-center rounded-full text-xs font-bold text-white" style={{ background: p.c }}>
                {p.n}
                <span className="gds-ping absolute -right-0.5 -bottom-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-surface" style={idx(k)} />
              </span>
              <span className="text-[0.72rem] leading-tight font-semibold text-ink/75">{p.r}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-ink/55">
          <span className="grid size-5 place-items-center rounded-full bg-brand text-[0.55rem] font-bold text-white">PM</span>
          Reviewing your brief
          <span className="bento-typing flex gap-0.5">
            <span className="size-1 rounded-full bg-ink/40" />
            <span className="size-1 rounded-full bg-ink/40" />
            <span className="size-1 rounded-full bg-ink/40" />
          </span>
        </p>
      </Tile>

      <Tile i={1}>
        <TileLabel>Brand kit</TileLabel>
        <div className="mt-3 flex gap-1.5">
          {["#1b1e23", "#f1731e", "#ffb47a", "#00806c"].map((c, k) => (
            <span key={c} style={{ ...idx(k + 2), background: c }} className="gds-pop size-8 rounded-lg ring-1 ring-ink/10" />
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="text-3xl leading-none font-bold">Aa</span>
          <span className="text-[0.7rem] font-semibold text-ink/45">Logo · Fonts · Tone</span>
        </div>
      </Tile>

      <Tile i={2} dark className="items-center justify-center text-center">
        <div className="relative">
        <svg viewBox="0 0 64 64" className="size-20 -rotate-90 sm:size-24">
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="6" />
          <circle cx="32" cy="32" r="26" fill="none" stroke="url(#gds-ring)" strokeWidth="6" strokeLinecap="round" className="gds-ring" />
          <defs>
            <linearGradient id="gds-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2fc3a5" />
              <stop offset="1" stopColor="#f1731e" />
            </linearGradient>
          </defs>
        </svg>
        <p className="absolute inset-0 grid place-items-center text-xl font-bold">88%</p>
        </div>
        <div className="mt-2">
          <TileLabel dark>Brand familiarity</TileLabel>
        </div>
      </Tile>
    </div>
  );
}

/* 02 — collaborate */
export function CollaborateBento() {
  const roles = [
    { r: "Admin", Icon: Crown, c: "#f1731e" },
    { r: "Associate", Icon: ShieldCheck, c: "#00806c" },
    { r: "Viewer", Icon: Eye, c: "#7c69e8" },
  ];
  return (
    <div className={bento}>
      <Tile i={0} className="col-span-2">
        <TileLabel>Invite to your KIMP360 board</TileLabel>
        <div className="mt-3 flex gap-2">
          <span className="flex min-w-0 flex-1 items-center rounded-xl bg-surface px-3 py-2.5 text-sm text-ink/70">
            <span className="gds-typing">sarah@yourbrand.com</span>
            <span className="gds-caret ml-px h-4 w-px bg-ink/60" />
          </span>
          <span className="gds-send inline-flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2.5 text-sm font-bold text-white">
            <Send className="size-4" /> Invite
          </span>
        </div>
        <div className="mt-auto flex items-center gap-3 pt-4">
          <span className="flex -space-x-2">
            {["#f1731e", "#00806c", "#7c69e8", "#4da3ff"].map((c, k) => (
              <span key={c} style={{ ...idx(k + 1), background: c }} className="gds-pop grid size-8 place-items-center rounded-full text-[0.65rem] font-bold text-white ring-2 ring-white">
                {"SDMJ"[k]}
              </span>
            ))}
          </span>
          <span className="gds-sent inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-bold text-teal-brand">
            <Check className="size-3.5" strokeWidth={3} /> Invite sent
          </span>
        </div>
      </Tile>

      <Tile i={1}>
        <TileLabel>Access level</TileLabel>
        <ul className="mt-3 flex flex-1 flex-col justify-center gap-1.5">
          {roles.map(({ r, Icon, c }, k) => (
            <li key={r} style={idx(k)} className="gds-role flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-ink/70">
              <Icon className="size-3.5" style={{ color: c }} /> {r}
            </li>
          ))}
        </ul>
      </Tile>

      <Tile i={2} dark className="justify-between">
        <TileLabel dark>Collaborators</TileLabel>
        <div className="h-9 overflow-hidden">
          <ul className="gds-ticker text-3xl leading-9 font-bold">
            <li>+3</li>
            <li>+12</li>
            <li>+40</li>
            <li className="text-brand">Unlimited</li>
          </ul>
        </div>
        <p className="text-xs font-semibold text-white/60">$0 extra per seat</p>
      </Tile>
    </div>
  );
}

/* 03 — advanced graphics */
function AdvancedBento() {
  const samples = [GDS_WORK.samples[0], GDS_WORK.samples[4], GDS_WORK.samples[10]];
  const cats = ["Print", "Digital", "Illustration", "Basic GIFs", "Landing pages", "Packaging", "Print"];
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
      <Tile i={0} className="row-span-2 p-1.5 sm:p-1.5">
        <div className="relative flex-1 overflow-hidden rounded-[1rem]">
          {samples.map((s, k) => (
            <Image
              key={s.src}
              src={s.src}
              alt=""
              width={s.width}
              height={s.height}
              sizes="(min-width: 1024px) 18rem, 45vw"
              style={idx(k)}
              className={cn("gds-swap absolute inset-0 size-full object-cover", k === 0 ? "opacity-100" : "opacity-0")}
            />
          ))}
          <span className="absolute inset-x-2 bottom-2 flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-2 text-xs font-bold backdrop-blur">
            <ImageIcon className="size-3.5 text-brand" /> Delivered this week
          </span>
        </div>
      </Tile>

      <Tile i={1}>
        <TileLabel>Request anything</TileLabel>
        <div className="relative mt-2 flex-1 overflow-hidden [mask-image:linear-gradient(transparent,#000_25%,#000_75%,transparent)]">
          <ul className="gds-scroll flex flex-col gap-1.5 py-2">
            {[...cats, ...cats].map((c, k) => (
              <li key={k} className="w-fit rounded-full bg-surface px-3 py-1 text-xs font-bold text-ink/75 ring-1 ring-border">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Tile>

      <Tile i={2} dark className="justify-between">
        <TileLabel dark>Unlimited revisions</TileLabel>
        <div className="h-8 overflow-hidden">
          <ul className="gds-ticker text-xl leading-8 font-bold">
            <li>Revision 1</li>
            <li>Revision 2</li>
            <li>Revision 3</li>
            <li className="flex items-center gap-1.5 text-[#2fc3a5]">
              <Check className="size-5" strokeWidth={3} /> Approved
            </li>
          </ul>
        </div>
        <p className="text-xs font-semibold text-white/60">No extra cost, ever</p>
      </Tile>
    </div>
  );
}

/* 04 — help */
function HelpBento() {
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={bento}>
      <Tile i={0} className="col-span-2 gap-2.5">
        <TileLabel>Live with your team</TileLabel>
        <div style={idx(1)} className="gds-pop flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-surface px-3.5 py-2 text-sm">Can we resize this flyer for Instagram?</p>
        </div>
        {/* typing dots show briefly, then give way to the reply (hidden at rest / reduced motion) */}
        <div className="gds-blip flex items-end gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-[0.6rem] font-bold text-white">PM</span>
          <span className="bento-typing flex gap-1 rounded-2xl rounded-bl-md bg-teal-brand px-3 py-2.5">
            <span className="size-1.5 rounded-full bg-white/80" />
            <span className="size-1.5 rounded-full bg-white/80" />
            <span className="size-1.5 rounded-full bg-white/80" />
          </span>
        </div>
        <div style={idx(15)} className="gds-pop flex items-end gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-[0.6rem] font-bold text-white">PM</span>
          <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-teal-brand px-3.5 py-2 text-sm text-white">On it! Your designer is picking it up now.</p>
        </div>
        {/* the payoff: the resized file lands in the thread */}
        <div style={idx(24)} className="gds-pop flex items-end gap-2">
          <span className="size-7 shrink-0" />
          <div className="flex items-center gap-3 rounded-2xl rounded-bl-md bg-white px-2 py-2 ring-1 ring-border">
            <Image src={GDS_WORK.samples[4].src} alt="" width={740} height={740} sizes="40px" className="size-10 rounded-lg object-cover" />
            <span className="pr-2 leading-tight">
              <span className="block text-xs font-bold">Flyer_Instagram_1080.png</span>
              <span className="mt-0.5 flex items-center gap-1 text-[0.7rem] font-semibold text-teal-brand">
                <Check className="size-3" strokeWidth={3} /> Delivered
              </span>
            </span>
          </div>
        </div>
      </Tile>

      <Tile i={1}>
        <TileLabel>Design team</TileLabel>
        <div className="mt-3 flex flex-1 items-end justify-between gap-1">
          {week.map((d, k) => (
            <span key={k} className="flex flex-1 flex-col items-center gap-1">
              <span className="flex h-14 w-full items-end">
                <span
                  style={idx(k)}
                  className={cn("gds-grow block w-full rounded-md", k < 5 ? "h-full bg-[linear-gradient(#ffb47a,#f1731e)]" : "h-1.5 bg-ink/10")}
                />
              </span>
              <span className={cn("text-[0.6rem] font-bold", k < 5 ? "text-ink/70" : "text-ink/30")}>{d}</span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-[0.7rem] font-semibold text-ink/50">Monday to Friday</p>
      </Tile>

      <Tile i={2} dark className="items-center justify-center gap-2 text-center">
        <span className="relative grid size-16 place-items-center rounded-full ring-2 ring-white/20">
          <Clock className="size-7 text-white/25" />
          <span className="flow-spin absolute top-1/2 left-1/2 h-6 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-brand" />
        </span>
        <p className="text-lg font-bold">7 days a week</p>
        <TileLabel dark>Customer service</TileLabel>
      </Tile>
    </div>
  );
}
