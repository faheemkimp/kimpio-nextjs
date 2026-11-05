import { Check, Film, MousePointer2, Music, Pencil, Type } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import "./service-scenes.css";

export type ServiceScene = "graphic" | "illustration" | "identity" | "presentation" | "video" | "web";

const delay = (sec: number): CSSProperties => ({ animationDelay: `${sec}s` });
/** Item `i` of a 9s three-state cycle owns seconds [3i, 3i + 3). */
const third = (i: number): CSSProperties => delay(i === 0 ? 0 : -(9 - 3 * i));

/** Animated stage that replaces the static artwork on each services card. */
export function ServiceStage({ scene, tint, className }: { scene: ServiceScene; tint: string; className?: string }) {
  const Scene = SCENES[scene];
  return (
    <div aria-hidden="true" style={{ "--tint": tint } as CSSProperties} className={cn("svc-stage", className)}>
      <Scene />
    </div>
  );
}

function Center({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", className)}>{children}</div>;
}

/** Small UI label chip, like the ones design tools float over the canvas. */
function Chip({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={cn(
        "svc-paper inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[9px] leading-none font-semibold text-ink/75",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Graphic design */
const FORMATS = ["Instagram post · 1080×1080", "Story · 1080×1920", "Facebook ad · 1200×628"];
const HANDLES = [
  "-top-[6px] -left-[6px]",
  "-top-[6px] -right-[6px]",
  "-bottom-[6px] -left-[6px]",
  "-right-[6px] -bottom-[6px]",
];

function GraphicScene() {
  return (
    <>
      <div className="absolute top-5 left-1/2 h-5 w-44 -translate-x-1/2">
        {FORMATS.map((f, i) => (
          <Chip
            key={f}
            style={third(i)}
            className={cn("svc-third absolute inset-x-0 mx-auto w-max", i > 0 && "svc-still-hidden")}
          >
            {f}
          </Chip>
        ))}
      </div>
      <Center className="mt-4">
        <div className="svc-board svc-paper relative rounded-md">
          <div className="absolute inset-0 overflow-hidden rounded-md bg-[#f1731e]">
            <span className="absolute -top-5 -right-5 size-20 rounded-full bg-[#ffb27a]" />
            <span className="absolute -top-1 -right-1 size-9 rounded-full bg-[#ffd9bd]" />
            <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
              <span className="text-[7px] font-bold tracking-[0.18em] uppercase opacity-85">Summer sale</span>
              <span className="mt-0.5 text-[22px] leading-none font-extrabold tracking-tight">40% off</span>
              <span className="mt-2 w-max rounded-full bg-ink px-2 py-1 text-[7px] font-semibold">Shop now</span>
            </div>
          </div>
          {/* Selection frame + handles */}
          <span className="pointer-events-none absolute -inset-[3px] rounded-[7px] border border-[#2f80ed]" />
          {HANDLES.map((p) => (
            <span key={p} className={cn("absolute size-[7px] rounded-[1px] border border-[#2f80ed] bg-white", p)} />
          ))}
          <MousePointer2 className="absolute -right-5 -bottom-6 size-4 fill-ink text-white" strokeWidth={1.5} />
        </div>
      </Center>
    </>
  );
}

/* ---------------------------------------------------------------- Illustration */
const LEAVES: [d: string, fill: string, at: number][] = [
  ["M80 96 C80 82 80 68 80 50", "none", 0.1],
  ["M80 84 C64 82 52 70 49 55 C66 55 78 66 80 84 Z", "#3f9a6b", 0.25],
  ["M80 72 C95 68 107 56 110 41 C93 41 82 53 80 72 Z", "#5bb98a", 0.4],
  ["M80 52 C71 44 71 30 80 19 C89 30 89 44 80 52 Z", "#2f845a", 0.55],
];
const INK = {
  stroke: "#2a2340",
  strokeWidth: 2,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

function IllustrationScene() {
  return (
    <>
      <div className="svc-paper absolute top-5 left-1/2 flex -translate-x-1/2 gap-0.5 rounded-full p-0.5 text-[9px] font-semibold">
        <span className="svc-tab-a flex items-center gap-1 rounded-full px-2 py-1">
          <Pencil className="size-2.5" /> Sketch
        </span>
        <span className="svc-tab-b rounded-full bg-ink px-2 py-1 text-white">Colour</span>
      </div>
      <Center className="mt-5">
        <svg viewBox="0 0 160 160" width={168} height={168}>
          <circle className="svc-art" cx={80} cy={85} r={60} pathLength={1} fill="#ddd5ff" stroke="none" />
          <g className="svc-sway">
            {LEAVES.map(([d, fill, at]) => (
              <path key={d} className="svc-art" style={delay(at)} d={d} pathLength={1} fill={fill} {...INK} />
            ))}
          </g>
          <path
            className="svc-art"
            style={delay(0.7)}
            d="M52 109 H108 L101 146 H59 Z"
            pathLength={1}
            fill="#e07a4f"
            {...INK}
          />
          <rect
            className="svc-art"
            style={delay(0.85)}
            x={45}
            y={96}
            width={70}
            height={13}
            rx={3}
            pathLength={1}
            fill="#c8623a"
            {...INK}
          />
        </svg>
      </Center>
      {/* Palette the fills are picked from */}
      <div className="svc-paper absolute right-4 bottom-4 flex flex-col gap-1 rounded-lg p-1">
        {["#3f9a6b", "#e07a4f", "#ddd5ff"].map((c) => (
          <span key={c} className="size-3.5 rounded-[4px] ring-1 ring-black/10" style={{ background: c }} />
        ))}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- Visual identity */
const SWATCHES = [
  ["#0f766e", "Deep teal"],
  ["#5eead4", "Mint"],
  ["#f1731e", "Signal"],
];

function IdentityScene() {
  const guide = {
    fill: "none",
    stroke: "#0f766e",
    strokeWidth: 0.75,
    pathLength: 1,
    className: "svc-guide",
  };
  return (
    <Center className="flex items-center gap-3">
      <div className="svc-paper flex w-[124px] flex-col items-center rounded-xl px-3 pt-3 pb-2.5">
        <svg viewBox="0 0 80 80" width={78} height={78} className="overflow-visible">
          <line x1={0} y1={40} x2={80} y2={40} {...guide} />
          <line x1={40} y1={0} x2={40} y2={80} {...guide} />
          <circle cx={40} cy={40} r={30} {...guide} />
          <circle cx={52} cy={28} r={12} {...guide} style={delay(0.3)} />
          <rect x={10} y={10} width={60} height={60} {...guide} style={delay(0.5)} />
          <path className="svc-pop" d="M10 70 V40 A30 30 0 0 1 40 10 V70 Z" fill="#0f766e" />
          <path className="svc-pop" style={delay(0.35)} d="M40 70 V40 H70 A30 30 0 0 1 40 70 Z" fill="#5eead4" />
          <circle className="svc-pop" style={delay(0.2)} cx={52} cy={28} r={12} fill="#f1731e" />
        </svg>
        <span className="mt-1.5 h-4 text-[13px] font-extrabold tracking-tight text-ink">
          <span className="svc-type">northwind</span>
        </span>
      </div>
      <div className="flex w-[92px] flex-col gap-1.5">
        {SWATCHES.map(([c, n], i) => (
          <div key={c} style={delay(i * 0.25)} className="svc-slide svc-paper flex items-center gap-1.5 rounded-lg p-1">
            <span className="size-5 shrink-0 rounded-[5px]" style={{ background: c }} />
            <span className="leading-none">
              <span className="block text-[8px] font-semibold text-ink">{n}</span>
              <span className="block font-mono text-[7px] text-ink/50 uppercase">{c}</span>
            </span>
          </div>
        ))}
        <div style={delay(0.75)} className="svc-slide svc-paper flex items-end gap-1.5 rounded-lg px-1.5 py-1">
          <span className="font-serif text-lg leading-none text-ink">Aa</span>
          <span className="pb-0.5 text-[7px] leading-tight text-ink/55">Display Serif</span>
        </div>
      </div>
    </Center>
  );
}

/* ---------------------------------------------------------------- Presentations */
function SlideTitle() {
  return (
    <div className="flex h-full flex-col justify-between bg-ink p-3 text-white">
      <span className="h-1.5 w-6 rounded-full bg-[#f5b301]" />
      <div>
        <p className="text-[15px] leading-none font-extrabold tracking-tight">Q3 Review</p>
        <p className="mt-1 text-[7px] text-white/60">Growth, retention &amp; what&apos;s next</p>
      </div>
    </div>
  );
}
const BARS = [0.35, 0.5, 0.45, 0.7, 0.95];
function SlideChart({ animate = false }: { animate?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-white p-2.5">
      <p className="text-[8px] font-bold text-ink">Revenue, +38% QoQ</p>
      <div className="mt-auto flex h-[62%] items-end gap-1.5 border-b border-ink/15">
        {BARS.map((h, i) => (
          <span
            key={i}
            style={{
              height: `${h * 100}%`,
              ...(animate ? delay(-6 + i * 0.08) : {}),
            }}
            className={cn(
              "flex-1 rounded-t-[2px]",
              animate && "svc-grow",
              i === BARS.length - 1 ? "bg-[#f5b301]" : "bg-ink/15",
            )}
          />
        ))}
      </div>
    </div>
  );
}
function SlideQuote() {
  return (
    <div className="flex h-full flex-col justify-center bg-[#fff3c4] px-3">
      <span className="font-serif text-2xl leading-[0.6] text-[#c98f00]">&ldquo;</span>
      <p className="mt-1 text-[9px] leading-snug font-semibold text-ink">The deck that closed our seed round.</p>
      <p className="mt-1 text-[7px] text-ink/55">Maya R., Founder</p>
    </div>
  );
}

const SLIDES = [SlideTitle, SlideChart, SlideQuote];

function PresentationScene() {
  return (
    <Center className="svc-paper flex gap-2 rounded-xl p-2">
      <div className="relative flex flex-col gap-2">
        <span className="svc-thumb absolute -top-[3px] -left-[3px] h-[28px] w-[40px] rounded-[5px] border-2 border-[#f5b301]" />
        {SLIDES.map((S, i) => (
          <div key={i} className="h-[22px] w-[34px] overflow-hidden rounded-[3px] ring-1 ring-ink/10">
            <div className="h-[110px] w-[170px] origin-top-left scale-[0.2]">
              <S />
            </div>
          </div>
        ))}
      </div>
      <div className="relative h-[110px] w-[170px] overflow-hidden rounded-md ring-1 ring-ink/10">
        {SLIDES.map((S, i) => (
          <div key={i} style={third(i)} className={cn("svc-third absolute inset-0", i > 0 && "svc-still-hidden")}>
            {S === SlideChart ? <SlideChart animate /> : <S />}
          </div>
        ))}
      </div>
    </Center>
  );
}

/* ---------------------------------------------------------------- Video */
function VideoScene() {
  return (
    <Center className="svc-paper w-[250px] overflow-hidden rounded-xl">
      {/* Editor bar: file name + render status */}
      <div className="flex items-center justify-between border-b border-ink/[0.07] px-2.5 py-1.5">
        <span className="flex items-center gap-1.5 text-[7px] font-semibold text-ink/65">
          <span className="svc-rec size-1.5 rounded-full bg-[#e5484d]" />
          launch-teaser.mp4
        </span>
        <span className="relative h-3 w-[54px] text-[6.5px] font-semibold">
          <span className="svc-vid-a absolute inset-0 grid place-items-center rounded-[3px] bg-ink/[0.05] tabular-nums text-ink/50">
            1080p · 30fps
          </span>
          <span className="svc-vid-b svc-still-hidden absolute inset-0 flex items-center justify-center gap-0.5 rounded-[3px] bg-[#d9f2e6] text-[#1f7a52]">
            <Check className="size-2" strokeWidth={3} /> Exported
          </span>
        </span>
      </div>

      <div className="p-2">
        {/* Preview */}
        <div className="relative h-[100px] overflow-hidden rounded-md bg-[linear-gradient(135deg,#ff4f84_0%,#ff7a6b_55%,#ffa24c_100%)]">
          <span className="svc-ring absolute top-3 right-5 size-[76px] rounded-full border border-white/60" />
          <span
            className="svc-ring absolute top-3 right-5 size-[76px] rounded-full border border-white/60"
            style={delay(-1.5)}
          />
          <div className="absolute top-3 left-3 text-[22px] leading-[0.95] font-extrabold tracking-tight text-white">
            <span className="block overflow-hidden">
              <span className="svc-rise block" style={delay(0.4)}>
                New
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="svc-rise block text-[#2a0f1a]" style={delay(0.7)}>
                drop.
              </span>
            </span>
          </div>
          <span className="absolute top-2 right-2 rounded-[3px] bg-black/20 px-1 py-px text-[6.5px] font-semibold tabular-nums text-white">
            00:06
          </span>
          {/* Product: a sneaker that lands, then bobs */}
          <span className="svc-shadow absolute right-[22px] bottom-[18px] h-1.5 w-[70px] rounded-full bg-[#2a0f1a]/25 blur-[2px]" />
          <div className="svc-enter absolute right-3 bottom-5" style={delay(1.1)}>
            <svg viewBox="0 0 90 44" width={92} height={45} className="svc-bob">
              <path
                d="M4 30 C4 20 14 18 22 16 L40 6 C46 4 50 8 52 14 C60 18 74 20 82 26 C88 30 86 38 80 38 H10 C6 38 4 35 4 30 Z"
                fill="#fff"
              />
              <path d="M4 32 H86 V36 C86 38 84 40 80 40 H10 C6 40 4 38 4 36 Z" fill="#2a0f1a" />
              <path d="M30 14 L38 22 M36 11 L44 19" stroke="#ff4f84" strokeWidth={2.5} strokeLinecap="round" />
            </svg>
          </div>
          <span
            className="svc-caption absolute bottom-2.5 left-3 rounded-full bg-white px-1.5 py-0.5 text-[6.5px] font-bold text-[#c2255c]"
            style={delay(1.4)}
          >
            Limited run · 48h
          </span>
          {/* Playback progress, synced with the playhead */}
          <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25">
            <span className="svc-progress block h-full origin-left bg-white" />
          </span>
        </div>

        {/* Timeline */}
        <div className="mt-2 flex gap-1.5">
          <div className="flex flex-col gap-1 pt-3 text-ink/35">
            {[Type, Film, Music].map((Icon, i) => (
              <span key={i} className="grid h-3.5 w-3 place-items-center">
                <Icon className="size-2.5" strokeWidth={2.25} />
              </span>
            ))}
          </div>
          <div className="relative flex-1 space-y-1 pt-3">
            <div className="absolute inset-x-0 top-0 flex justify-between px-px">
              {Array.from({ length: 13 }, (_, i) => (
                <span key={i} className={cn("w-px bg-ink/20", i % 4 === 0 ? "h-2" : "h-1")} />
              ))}
            </div>
            <div className="relative h-3.5 rounded-[3px] bg-[#ffe1ea]">
              <span className="absolute inset-y-0 left-[4%] w-[46%] rounded-[3px] bg-[#ff4f84] px-1 text-[6.5px] leading-[14px] font-semibold text-white">
                Title
              </span>
              {[30, 40, 48].map((l) => (
                <span
                  key={l}
                  className="absolute top-1/2 size-1.5 -translate-y-1/2 rotate-45 bg-white"
                  style={{ left: `${l}%` }}
                />
              ))}
            </div>
            <div className="flex h-3.5 gap-0.5 text-[6px] leading-[14px] font-semibold text-white">
              <span className="w-[55%] truncate rounded-[3px] bg-[#7c6cf2] px-1">Hero shot</span>
              <span className="flex-1 truncate rounded-[3px] bg-[#a99ff7] px-1">Close-up</span>
            </div>
            <div className="flex h-3.5 items-center gap-px rounded-[3px] bg-[#d9f2e6] px-1">
              {Array.from({ length: 40 }, (_, i) => (
                <span
                  key={i}
                  className="svc-wave flex-1 rounded-full bg-[#2f9e6b]"
                  style={{ height: `${30 + ((i * 37) % 9) * 8}%`, animationDelay: `${-(i % 7) * 0.17}s` }}
                />
              ))}
            </div>
            <span className="svc-playhead absolute top-0 bottom-0 left-1/2 w-px bg-[#e5484d]">
              <span className="absolute -top-0.5 -left-[3px] h-2 w-[7px] rounded-[2px] bg-[#e5484d]" />
            </span>
          </div>
        </div>
      </div>
    </Center>
  );
}

/* ---------------------------------------------------------------- Web & app */
function Plant({ leaf, pot, className }: { leaf: string; pot: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className}>
      <g className="svc-leaves">
        <path d="M20 30 C10 27 5 17 7 7 C15 10 20 19 20 30 Z" fill={leaf} opacity={0.8} />
        <path d="M20 30 C30 27 35 16 33 5 C25 9 20 18 20 30 Z" fill={leaf} opacity={0.65} />
        <path d="M20 30 C15 21 16 10 20 1 C24 10 25 21 20 30 Z" fill={leaf} />
      </g>
      <rect x="10" y="28" width="20" height="5" rx="1.5" fill={pot} />
      <path d="M12 32 H28 L26.5 47 H13.5 Z" fill={pot} />
    </svg>
  );
}

const PRODUCTS = [
  { bg: "#e3f3ea", leaf: "#2f845a", pot: "#e07a4f" },
  { bg: "#fff0e1", leaf: "#5bb98a", pot: "#c9a27a" },
  { bg: "#eceeff", leaf: "#3f9a6b", pot: "#7c6cf2" },
];

function WebScene() {
  return (
    <>
      {/* Desktop */}
      <div className="svc-paper absolute top-6 right-[76px] -bottom-3 left-5 overflow-hidden rounded-t-xl sm:left-6">
        <div className="flex items-center gap-1 border-b border-ink/10 bg-surface px-3 py-2">
          <span className="size-1.5 rounded-full bg-[#ff5f57]" />
          <span className="size-1.5 rounded-full bg-[#febc2e]" />
          <span className="size-1.5 rounded-full bg-[#28c840]" />
          <span className="mx-auto rounded bg-white px-5 py-0.5 text-[7px] text-ink/45 ring-1 ring-ink/10">
            leafy.shop
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-2.5 text-[7px] text-ink/60">
          <span className="flex items-center gap-1 text-[9px] font-extrabold text-ink">
            <span className="size-2 rounded-full bg-[#2f9e6b]" /> leafy
          </span>
          <span className="flex gap-2.5">
            <span>Plants</span>
            <span>Care</span>
          </span>
        </div>
        <div className="px-4 pt-1">
          <p className="max-w-[160px] text-[14px] leading-[1.05] font-extrabold tracking-tight text-ink">
            Fresh plants, delivered to your door.
          </p>
          <p className="mt-1.5 text-[7px] leading-snug text-ink/55">Hand-picked, potted and ready to grow.</p>
          <div className="relative mt-2.5 w-max">
            <span className="svc-cta block rounded-full bg-[#2563eb] px-3 py-1.5 text-[8px] font-bold text-white">
              Shop plants
            </span>
            {/* Feedback pin + comment */}
            <span className="svc-pin absolute -top-2.5 -right-2.5 z-10 grid size-4 place-items-center rounded-full rounded-bl-none bg-[#f1731e] text-[7px] font-bold text-white ring-2 ring-white">
              1
            </span>
            <div className="svc-bubble svc-paper absolute top-4 left-[calc(100%-4px)] z-10 w-[118px] rounded-lg p-1.5">
              <div className="relative h-[24px]">
                <div className="svc-msg-a svc-still-hidden absolute inset-0 flex gap-1">
                  <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-[#ffd9bd] text-[6px] font-bold text-[#a34a0e]">
                    JL
                  </span>
                  <p className="text-[7px] leading-snug text-ink/75">Can the button stand out more?</p>
                </div>
                <div className="svc-msg-b absolute inset-0 flex items-center gap-1 text-[7px] font-semibold text-[#2f9e6b]">
                  <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-[#2f9e6b] text-white">
                    <Check className="size-2" strokeWidth={3} />
                  </span>
                  Updated · resolved
                </div>
              </div>
            </div>
            <MousePointer2
              className="svc-cursor absolute top-2 left-10 z-20 size-4 fill-ink text-white"
              strokeWidth={1.5}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {PRODUCTS.map((p, i) => (
              <div key={p.bg} className="svc-tile" style={delay(0.15 * i)}>
                <div className="relative h-[48px] overflow-hidden rounded-md" style={{ background: p.bg }}>
                  <Plant leaf={p.leaf} pot={p.pot} className="absolute bottom-0 left-1/2 h-10 -translate-x-1/2" />
                </div>
                <span className="mt-1 block h-1 w-3/4 rounded-full bg-ink/15" />
                <span className="mt-0.5 block h-1 w-1/3 rounded-full bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="svc-phone absolute right-4 bottom-4 w-[92px] rounded-[18px] bg-ink p-[3px] shadow-[0_18px_30px_-14px_rgb(27_30_35/0.5)]">
        <div className="overflow-hidden rounded-[15px] bg-white pb-2">
          <span className="mx-auto mt-1 block h-1.5 w-7 rounded-full bg-ink" />
          <div className="flex items-center justify-between px-2 pt-1.5">
            <span className="flex items-center gap-0.5 text-[6.5px] font-extrabold text-ink">
              <span className="size-1.5 rounded-full bg-[#2f9e6b]" /> leafy
            </span>
            <span className="space-y-[2px]">
              <span className="block h-px w-2 bg-ink/60" />
              <span className="block h-px w-2 bg-ink/60" />
            </span>
          </div>
          <div className="relative mx-2 mt-1.5 h-[58px] overflow-hidden rounded-md bg-[#dff1e7]">
            <Plant leaf="#2f845a" pot="#e07a4f" className="absolute bottom-0 left-1/2 h-12 -translate-x-1/2" />
          </div>
          <p className="mx-2 mt-1.5 text-[8px] leading-[1.05] font-extrabold tracking-tight text-ink">
            Fresh plants, delivered.
          </p>
          <span className="svc-cta mx-2 mt-1.5 block rounded-full bg-[#2563eb] py-1 text-center text-[6px] font-bold text-white">
            Shop plants
          </span>
        </div>
      </div>
    </>
  );
}

const SCENES: Record<ServiceScene, () => ReactNode> = {
  graphic: GraphicScene,
  illustration: IllustrationScene,
  identity: IdentityScene,
  presentation: PresentationScene,
  video: VideoScene,
  web: WebScene,
};
