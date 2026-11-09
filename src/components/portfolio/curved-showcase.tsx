"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { CtaLink } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

import { Lightbox } from "./lightbox";

import "./portfolio.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ShowcaseSet = { slug: string; label: string; images: string[] };

/** Desktop with motion allowed: the section pins and the mouse wheel slides the curve. */
const CINEMATIC = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
/** Curve strength: max turn (deg) and extra scale at the edges of the viewport. */
const TURN = 40;
const GROW = 0.3;
/** Vertical scroll per pixel of horizontal travel while pinned (lower = faster). */
const SCROLL_RATIO = 0.6;
/** Cards bent on each side beyond the visible ones (only nearby cards are updated per frame). */
const BUFFER = 4;

/** Largest on-screen scale a card reaches at the edges of the curve (1 + 2.2 × GROW, rounded up). */
const EDGE_SCALE = 1.7;
/** Initial `sizes` for card images: tuned to the card height, so most art is sharp from the first request. */
const CARD_SIZES = "(min-width: 768px) 42rem, 90vw";

/**
 * Cards crop with object-fit: cover, so wide art is drawn wider than its card,
 * and the curve enlarges cards towards the edges. If the loaded file is smaller
 * than that, point `sizes` at the real drawn width so the browser fetches a
 * sharper candidate from the srcset (once per image).
 */
function requestSharpSource(img: HTMLImageElement, drawnWidth: number) {
  const need = Math.ceil(drawnWidth * EDGE_SCALE);
  if (Number(img.dataset.sharp ?? 0) >= need) return;
  const loaded = img.currentSrc.match(/[?&]w=(\d+)/)?.[1];
  if (loaded && Number(loaded) >= need * window.devicePixelRatio) return;
  img.dataset.sharp = String(need);
  img.sizes = `${need}px`;
}

/** Hover auto-scroll speed in px/s, as the live kimp.io portfolio pans its cards. */
const PAN_SPEED = 260;

/**
 * Fit a loaded image to its card without upscaling it. Many WordPress originals
 * are small wide banners (e.g. 800×315); cropping those into a portrait card
 * zoomed them and made them blurry. Wide art is now shown whole over a blurred
 * copy of itself; tall art fills the card width and pans down on hover (live).
 */
function setupPan(img: HTMLImageElement) {
  const card = img.parentElement;
  if (!card || !img.naturalWidth || !img.naturalHeight) return;
  const cw = card.clientWidth;
  const ch = card.clientHeight;
  const ratio = img.naturalHeight / img.naturalWidth;
  /* Wider than the card: show it whole (never upscaled) on its blurred backdrop; nothing to scroll. */
  if (ratio < ch / cw) {
    img.dataset.fit = "contain";
    img.removeAttribute("data-pan");
    requestSharpSource(img, cw);
    return;
  }
  /* Taller than the card: fill the width and auto-scroll down on hover, as live. */
  delete img.dataset.fit;
  const distance = cw * ratio - ch;
  requestSharpSource(img, cw);
  img.style.setProperty("--pan-from", "50% 0%");
  img.style.setProperty("--pan-to", "50% 100%");
  if (distance < 12) {
    img.removeAttribute("data-pan");
    return;
  }
  img.style.setProperty("--pan-dur", `${Math.max(1.5, distance / PAN_SPEED).toFixed(2)}s`);
  img.setAttribute("data-pan", "y");
}

/**
 * Curved portfolio showcase for /our-work/: every WordPress sample of the chosen
 * category on the inside of a cylinder (cards near the edges turn in and grow,
 * the centre sits back). Each card's turn/scale comes from its distance to the
 * viewport centre on every scroll frame (transforms only, nearby cards only), so
 * the curve stays put while the work slides through it.
 *
 * Input: native horizontal scroll/swipe everywhere; on desktop the section pins
 * and the page scroll drives the row (mouse wheel), with drag, arrows and
 * keyboard mapped onto the same scroll position. Reduced motion: flat row.
 * Hovering a card auto-scrolls its design (see setupPan / portfolio.css).
 */
export function CurvedShowcase({ sets, cta, alt }: { sets: ShowcaseSet[]; cta: { label: string; href: string }; alt: string }) {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const frame = useRef(0);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [position, setPosition] = useState(1);
  const set = sets[active] ?? sets[0];

  /** Card step (width + gap) and the row's left padding, in px. */
  const metrics = useCallback(() => {
    const items = track.current?.children;
    const first = items?.[0] as HTMLElement | undefined;
    const second = items?.[1] as HTMLElement | undefined;
    return { step: first && second ? second.offsetLeft - first.offsetLeft : 260, pad: first?.offsetLeft ?? 0 };
  }, []);

  /** Bend the cards near the viewport for the current horizontal position. */
  const render = useCallback(() => {
    const vp = viewport.current;
    const list = track.current;
    if (!vp || !list) return;
    const flat = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = vp.clientWidth / 2;
    const x = vp.scrollLeft;
    const { step, pad } = metrics();
    const items = list.children;
    const from = Math.max(0, Math.floor((x - pad) / step) - BUFFER);
    const to = Math.min(items.length - 1, Math.ceil((x + vp.clientWidth - pad) / step) + BUFFER);
    for (let i = from; i <= to; i++) {
      const li = items[i] as HTMLElement;
      const card = li.firstElementChild as HTMLElement | null;
      if (!card) continue;
      const u = gsap.utils.clamp(-1.7, 1.7, (li.offsetLeft + li.offsetWidth / 2 - x - half) / half);
      card.style.transform = flat ? "" : `perspective(1400px) rotateY(${(-u * TURN).toFixed(2)}deg) scale(${(1 + Math.min(u * u, 2.2) * GROW).toFixed(3)})`;
    }
    setPosition(Math.min(items.length, Math.max(1, Math.round((x + half - pad) / step))));
  }, [metrics]);

  const schedule = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(render);
  }, [render]);

  const maxScroll = () => {
    const vp = viewport.current;
    return vp ? Math.max(0, vp.scrollWidth - vp.clientWidth) : 0;
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CINEMATIC, () => {
        const section = root.current!;
        const vp = viewport.current!;
        section.dataset.pinned = "true";
        const state = { p: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 0.6, maxScroll() * SCROLL_RATIO)}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => {
            vp.scrollLeft = state.p * maxScroll();
            render();
          },
        });
        trigger.current = tl.scrollTrigger ?? null;
        return () => {
          delete section.dataset.pinned;
          trigger.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  /* New category: re-measure the pin length, start the row from its first card, deal the cards in. */
  useEffect(() => {
    const vp = viewport.current;
    if (!vp) return;
    vp.scrollLeft = 0;
    const st = trigger.current;
    if (st) {
      const wasInside = window.scrollY >= st.start && window.scrollY <= st.end;
      ScrollTrigger.refresh();
      if (wasInside) window.scrollTo({ top: st.start, behavior: "instant" });
    }
    render();
    const cards = Array.from(track.current?.querySelectorAll("[data-card]") ?? []).slice(0, 12);
    if (cards.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(cards, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "power3.out", clearProps: "opacity,visibility" });
    }
  }, [active, render]);

  useEffect(() => {
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame.current);
    };
  }, [schedule]);

  /** Slide the row by `d` card steps (page scroll when pinned, row scroll otherwise). */
  const nudge = (d: number) => {
    const vp = viewport.current;
    if (!vp) return;
    const delta = d * metrics().step * 2;
    const st = trigger.current;
    const max = maxScroll();
    if (st && max > 0) {
      const target = gsap.utils.clamp(0, max, vp.scrollLeft + delta);
      window.scrollTo({ top: st.start + (st.end - st.start) * (target / max), behavior: "smooth" });
    } else {
      vp.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    nudge(e.key === "ArrowRight" ? 1 : -1);
  };

  /* Mouse drag: moves the page scroll when pinned, the row otherwise. Touch uses native swipe. */
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, start: trigger.current ? window.scrollY : (viewport.current?.scrollLeft ?? 0), moved: false };
  };
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) d.moved = true;
    const st = trigger.current;
    const max = maxScroll();
    if (st && max > 0) window.scrollTo({ top: d.start - dx * ((st.end - st.start) / max), behavior: "instant" });
    else if (viewport.current) viewport.current.scrollLeft = d.start - dx;
  };
  const endDrag = () => window.setTimeout(() => (drag.current = null), 0);

  return (
    <section
      ref={root}
      data-hide-trial
      aria-label="Portfolio"
      className="group/show relative px-2 py-2 sm:px-3 sm:py-3 data-[pinned=true]:h-[100svh] data-[pinned=true]:pt-[4.75rem]"
    >
      <div className="relative isolate flex h-full flex-col overflow-hidden bg-white pt-8 pb-7 sm:pt-10">

        {/* Category chips */}
        <div role="group" aria-label="Choose a category" className="flex gap-1.5 overflow-x-auto px-4 py-1.5 [scrollbar-width:none] sm:mx-auto sm:max-w-6xl sm:flex-wrap sm:justify-center">
          {sets.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.8rem] font-bold whitespace-nowrap ring-1 transition-colors lg:text-sm",
                i === active ? "bg-ink text-white ring-ink" : "bg-white text-ink/70 ring-border hover:text-ink hover:ring-ink/30",
              )}
            >
              {s.label}
              <span className={cn("rounded-full px-1.5 py-0.5 text-[0.65rem] leading-none tabular-nums", i === active ? "bg-white/15" : "bg-surface text-ink/50")}>{s.images.length}</span>
            </button>
          ))}
        </div>

        {/* Curved row */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={viewport}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${set.label}: ${set.images.length} samples`}
            onScroll={schedule}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className="flex h-full items-center overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] focus-visible:outline-none group-data-[pinned=true]/show:cursor-grab group-data-[pinned=true]/show:overflow-hidden group-data-[pinned=true]/show:active:cursor-grabbing"
          >
            <ul ref={track} className="flex items-center gap-4 px-[12vw] py-16 sm:gap-5 sm:py-[clamp(3rem,8vh,5.5rem)]">
              {set.images.map((src, i) => (
                <li key={`${set.slug}-${src}`} className="shrink-0">
                  <button
                    type="button"
                    data-card
                    onClick={() => !drag.current?.moved && setOpen(i)}
                    aria-label={`${alt}: open ${set.label} sample ${i + 1} of ${set.images.length}`}
                    className="ow-card group/card relative block h-[clamp(17rem,46vh,29rem)] w-[clamp(12.75rem,34.5vh,21.75rem)] overflow-hidden rounded-[1.5rem] bg-surface shadow-[0_30px_50px_-28px_rgb(27_30_35/0.5)] ring-1 ring-ink/[0.06]"
                  >
                    <Image src={src} alt="" aria-hidden="true" fill draggable={false} sizes="10rem" className="scale-125 object-cover opacity-70 blur-2xl" />
                    <Image src={src} alt={alt} fill draggable={false} sizes={CARD_SIZES} quality={90} onLoad={(e) => setupPan(e.currentTarget)} className="ow-pan object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Edge fades soften cards entering and leaving */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[7vw] bg-gradient-to-r from-white/90 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[7vw] bg-gradient-to-l from-white/90 to-transparent" />
        </div>

        {/* Controls */}
        <div className="container-page relative flex items-center justify-between gap-4">
          <button type="button" aria-label="Scroll samples left" onClick={() => nudge(-1)} className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink ring-1 ring-border transition hover:ring-ink/30">
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-5">
            <p aria-live="polite" className="hidden text-sm font-semibold text-ink/50 tabular-nums sm:block">
              {set.label} · {position} / {set.images.length}
            </p>
            <CtaLink href={cta.href} size="md">
              {cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
          <button type="button" aria-label="Scroll samples right" onClick={() => nudge(1)} className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:bg-brand">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <Lightbox items={set.images} index={open} onIndex={setOpen} alt={alt} />
    </section>
  );
}
