"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { DesignCard, HERO2_COLORS as C, type Glyph } from "./design-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Secondary hero illustration (scene units: 1200×560): peach hills, teal + peach
 * ribbons flowing into a monitor, Kimp badges, sparkles and floating design cards.
 *
 * Motion (skipped with prefers-reduced-motion):
 * - load: cards burst out from the monitor into place, badges/sparkles pop in;
 * - scroll: everything spreads away from the centre (parallax). Each element
 *   carries `data-dx` / `data-dy` = its offset from the centre in -1…1, so left
 *   items drift left, top items drift up, and so on. Ribbons only sink a
 *   little, so their ends stay tucked behind the monitor.
 */

const RIBBONS_SOFT = [
  { d: "M-700 400 C -400 430, -200 430, -40 410 C 120 360, 250 470, 470 420", side: -1 },
  { d: "M1900 380 C 1600 410, 1400 410, 1240 390 C 1060 350, 950 470, 730 420", side: 1 },
];

const RIBBONS_POP = [
  { d: "M-700 360 C -400 380, -200 360, -40 320 C 150 240, 260 430, 420 360 S 560 300, 600 350", side: -1 },
  { d: "M-700 470 C -400 500, -200 520, -40 490 C 120 430, 250 540, 390 480 S 520 420, 560 430", side: -1 },
  { d: "M1900 330 C 1600 350, 1400 330, 1240 290 C 1060 230, 960 410, 800 350 S 650 310, 610 350", side: 1 },
  { d: "M1900 450 C 1600 480, 1400 500, 1240 470 C 1080 410, 980 540, 840 480 S 690 420, 650 430", side: 1 },
];

/** Streams pouring out of the bottom of the monitor. */
const POUR = [
  { d: "M505 440 C 500 500, 450 520, 420 600", color: C.cardSoft },
  { d: "M560 440 C 560 500, 535 530, 530 600", color: C.pop },
  { d: "M640 440 C 640 500, 665 530, 670 600", color: C.cardSoft },
  { d: "M695 440 C 700 500, 750 520, 780 600", color: C.pop },
];

const BADGES = [
  { x: 330, y: 300, r: -12 },
  { x: 885, y: 255, r: 10 },
  { x: 250, y: 505, r: 8 },
  { x: 990, y: 410, r: -8 },
  { x: 560, y: 75, r: 6 },
];

const SPARKS = [
  { x: 205, y: 225, r: 0 },
  { x: 700, y: 95, r: 30 },
  { x: 440, y: 270, r: -20 },
  { x: 940, y: 180, r: 15 },
  { x: 1080, y: 330, r: -10 },
];

const round = (n: number) => Math.round(n * 1000) / 1000;

/** How far (fraction of their distance from the centre) elements are pulled in before scrolling. */
const GATHER = 0.15;

/** Floating cards, positioned in % of the scene. */
const CARDS: { glyph: Glyph; left: number; top: number; width: number; rotate: number; delay: number; hideSm?: boolean }[] = [
  { glyph: "brand", left: 41, top: 18, width: 18, rotate: -2, delay: 0 },
  { glyph: "palette", left: 2, top: 46, width: 9, rotate: -14, delay: 0.6 },
  { glyph: "image", left: 10, top: 74, width: 9, rotate: 10, delay: 1.4, hideSm: true },
  { glyph: "pen", left: 11, top: 18, width: 9.5, rotate: 12, delay: 2.1 },
  { glyph: "type", left: 20, top: 38, width: 11.5, rotate: -16, delay: 0.9 },
  { glyph: "shapes", left: 27, top: 66, width: 9, rotate: 14, delay: 1.8 },
  { glyph: "grid", left: 30, top: 8, width: 8, rotate: -8, delay: 2.6 },
  { glyph: "play", left: 62, top: 6, width: 8.5, rotate: 10, delay: 1.1 },
  { glyph: "layers", left: 68, top: 28, width: 12, rotate: 8, delay: 0.3 },
  { glyph: "palette", left: 81, top: 10, width: 9, rotate: -10, delay: 2.3 },
  { glyph: "type", left: 82, top: 47, width: 10, rotate: -12, delay: 1.6 },
  { glyph: "pen", left: 65, top: 64, width: 10, rotate: 12, delay: 0.7 },
  { glyph: "image", left: 89, top: 74, width: 8.5, rotate: 8, delay: 2.9, hideSm: true },
];

/** Card height as % of scene height (card art is 132×92, scene is 1200×560). */
const cardHeight = (width: number) => (width * 1200 * 92) / (132 * 560);
/** Offset of a scene point from the monitor area, in -1…1. */
const spreadOf = (x: number, y: number) => ({ "data-dx": round((x - 600) / 600), "data-dy": round((y - 300) / 300) });

function Ribbon({ d, color, width }: { d: string; color: string; width: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={C.ink} strokeWidth={width + 6} strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
    </>
  );
}

function SceneArt() {
  return (
    <svg
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid slice"
      overflow="visible"
      className="absolute inset-0 size-full"
      focusable="false"
    >
      {/* peach hills (run past the viewBox so the scene bleeds to the frame edges) */}
      <g data-hills="">
        <path
          d="M-700 250 C -400 200, -200 280, 0 260 C 70 190, 150 240, 220 200 C 300 150, 380 210, 450 170 C 520 130, 600 180, 680 150 C 760 120, 840 180, 920 160 C 1000 140, 1100 200, 1200 170 C 1400 140, 1600 230, 1900 200 L1900 700 L-700 700 Z"
          fill="#fff1e7"
        />
        <path
          d="M-700 320 C -400 300, -200 350, 0 330 C 120 290, 240 320, 360 290 C 480 260, 560 300, 700 280 C 840 260, 980 300, 1200 270 C 1450 240, 1650 300, 1900 280 L1900 700 L-700 700 Z"
          fill="#ffe4d1"
          opacity={0.7}
        />
      </g>

      {RIBBONS_SOFT.map((r) => (
        <g key={r.d} data-ribbon={r.side}>
          <Ribbon d={r.d} color={C.cardSoft} width={30} />
        </g>
      ))}
      {RIBBONS_POP.map((r) => (
        <g key={r.d} data-ribbon={r.side}>
          <Ribbon d={r.d} color={C.pop} width={26} />
        </g>
      ))}

      {/* monitor + the streams pouring out of it */}
      <g data-monitor="">
        {POUR.map((p) => (
          <Ribbon key={p.d} d={p.d} color={p.color} width={38} />
        ))}
        <rect x={455} y={290} width={290} height={172} rx={20} fill={C.ink} />
        <g>
          <rect x={467} y={302} width={266} height={146} rx={10} fill="#fff8f2" />
          <circle cx={528} cy={372} r={30} fill={C.pop} stroke={C.ink} strokeWidth={3} />
          <path d="M512 380 L524 360 L536 376 L544 368 L552 384 Z" fill={C.accent} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
          <rect x={580} y={338} width={120} height={12} rx={6} fill={C.ink} />
          <rect x={580} y={360} width={86} height={10} rx={5} fill={C.card} />
          <rect x={580} y={378} width={104} height={10} rx={5} fill={C.cardSoft} />
          <rect x={580} y={404} width={56} height={22} rx={11} fill={C.pop} stroke={C.ink} strokeWidth={2.5} />
          <path d="M676 404 L676 428 L682 422 L688 434 L693 432 L687 420 L696 420 Z" fill="#ffffff" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
        </g>
        <circle cx={600} cy={296} r={2.5} fill="#ffffff" opacity={0.6} />
      </g>

      {/* Kimp badges */}
      {BADGES.map((b) => (
        <g key={`${b.x}-${b.y}`} data-spread="" {...spreadOf(b.x, b.y)}>
          <g data-pop="">
            <g transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}>
              <rect x={-15} y={-15} width={30} height={30} rx={7} fill={C.pop} stroke={C.ink} strokeWidth={3} />
              <text x={0} y={7} textAnchor="middle" fontSize={20} fontWeight={800} fill={C.ink} style={{ fontFamily: "inherit" }}>
                K
              </text>
            </g>
          </g>
        </g>
      ))}

      {/* sparkles */}
      {SPARKS.map((s) => (
        <g key={`${s.x}-${s.y}`} data-spread="" {...spreadOf(s.x, s.y)}>
          <g data-pop="">
            <g transform={`translate(${s.x} ${s.y}) rotate(${s.r})`} stroke={C.ink} strokeWidth={3} strokeLinecap="round">
              <line x1={0} y1={-14} x2={0} y2={-6} />
              <line x1={-12} y1={4} x2={-5} y2={1} />
              <line x1={12} y1={4} x2={5} y2={1} />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

export function HeroIllustration() {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const box = scene.current!;
        const dx = (el: Element) => Number((el as HTMLElement).dataset.dx);
        const dy = (el: Element) => Number((el as HTMLElement).dataset.dy);

        /* Load: cards burst out of the monitor, badges and sparkles pop in. */
        const intro = gsap.timeline({ defaults: { ease: "back.out(1.4)" }, delay: 0.25 });
        intro.from("[data-burst]", {
          x: (_, el) => -dx(el) * box.clientWidth * 0.5,
          y: (_, el) => -dy(el) * box.clientHeight * 0.5 + box.clientHeight * 0.15,
          scale: 0.35,
          opacity: 0,
          duration: 1.1,
          stagger: { each: 0.05, from: "center" },
        });
        intro.from(
          "[data-pop]",
          { scale: 0, opacity: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.06 },
          "-=0.6",
        );

        /* Scroll: everything starts gathered round the monitor and spreads out as you scroll. */
        const W = () => box.clientWidth;
        const H = () => box.clientHeight;
        const spread = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: 0, end: "bottom 35%", scrub: 0.8 },
        });
        spread
          .fromTo(
            "[data-card]",
            {
              // pulled in towards the centre by GATHER of their distance
              x: (_, el) => -dx(el) * (W() / 2) * GATHER,
              y: (_, el) => -dy(el) * (H() / 2) * GATHER,
              rotation: 0,
              scale: 0.92,
            },
            {
              x: (_, el) => dx(el) * W() * 0.85,
              // Top cards rise behind the hero copy (the copy is layered above the illustration).
              y: (_, el) => dy(el) * H() * (dy(el) > 0 ? 1 : 1.1),
              rotation: (_, el) => dx(el) * 32,
              scale: (_, el) => 1 + Math.abs(dx(el)) * 0.25,
            },
            0,
          )
          .fromTo(
            "[data-spread]",
            { x: (_, el) => -dx(el) * 600 * GATHER, y: (_, el) => -dy(el) * 300 * GATHER },
            { x: (_, el) => dx(el) * 1000, y: (_, el) => dy(el) * (dy(el) > 0 ? 450 : 420) },
            0,
          )
          .to("[data-ribbon]", { y: 20 }, 0)
          .to("[data-monitor]", { y: 20 }, 0)
          .to("[data-hills]", { y: 40 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="relative z-0 mt-6 overflow-x-clip sm:mt-4">
      {/* On small screens the scene is wider than the viewport and centred, so cards stay readable. */}
      <div
        ref={scene}
        className="relative left-1/2 aspect-[1200/560] w-[175%] -translate-x-1/2 sm:w-[125%] lg:w-[min(100%,72rem)]"
      >
        <SceneArt />
        {CARDS.map((c, i) => {
          const cx = c.left + c.width / 2;
          const cy = c.top + cardHeight(c.width) / 2;
          const data = { "data-dx": round((cx - 50) / 50), "data-dy": round((cy - 50) / 50) };
          return (
            <div
              key={i}
              data-card=""
              {...data}
              className={c.hideSm ? "absolute hidden sm:block" : "absolute"}
              style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.width}%`, rotate: `${c.rotate}deg` }}
            >
              <div data-burst="" {...data}>
                <div className="hero2-float" style={{ animationDelay: `${-c.delay}s`, animationDuration: `${5 + (i % 4)}s` }}>
                  <DesignCard glyph={c.glyph} className="block h-auto w-full drop-shadow-[0_10px_12px_rgb(196_86_10/0.2)]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
