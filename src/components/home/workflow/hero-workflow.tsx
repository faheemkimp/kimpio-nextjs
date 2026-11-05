"use client";

import { animate } from "animejs";
import gsap from "gsap";
import { Check, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { HERO_WORKFLOW } from "@/content/home";
import { cn } from "@/lib/utils";

import type { SceneState, WorkflowScene } from "./scene";

const STAGES = HERO_WORKFLOW.stages;
const N = STAGES.length;

type Marks = {
  arrive: number[];
  done: number[];
  finale: number;
  reset: number;
  end: number;
};

/**
 * The master loop. Every value the 3D scene draws is tweened here, so seeking,
 * pausing and reduced motion all fall out of one GSAP timeline.
 */
function buildTimeline(s: SceneState, stops: number[], legs: number[]) {
  const tl = gsap.timeline({
    paused: true,
    repeat: -1,
    defaults: { ease: "none" },
  });
  const arrive: number[] = [];
  const done: number[] = [];
  s.u = stops[0];
  s.trail = 0;

  // establishing shot of the whole board, then move in on station 1
  tl.to(s, { zoom: 1, duration: 1.3, ease: "power2.out" }, 0).to(
    s,
    { cam: 1, duration: 1.5, ease: "power2.inOut" },
    0.35,
  );

  // 1 · submit request: the brief card rises, "sends", and the request drops onto the track
  arrive.push(0.3);
  tl.to(s, { card: 1, duration: 0.75, ease: "back.out(1.6)" }, 0.3)
    .to(
      s,
      { send: 1, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 },
      1.05,
    )
    .to(s, { doc: 1, duration: 0.65, ease: "power1.inOut" }, 1.15)
    .to(s, { marble: 1, duration: 0.2, ease: "back.out(2)" }, 1.75)
    .to(s, { drop: 0, duration: 0.7, ease: "bounce.out" }, 1.75)
    .to(s, { trail: 1, lit0: 1, duration: 0.4 }, 2.3);
  done.push(2.35);

  let t = 2.9;
  const travel = (i: number) => {
    const d = gsap.utils.clamp(1.4, 2.6, legs[i - 1] / 4.4);
    tl.to(s, { u: stops[i], f: i, duration: d, ease: "power2.inOut" }, t)
      // breathe out a little mid-flight so the next station comes into view
      .to(
        s,
        {
          cam: 0.78,
          duration: d / 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        },
        t,
      );
    t += d;
    arrive.push(t - 0.12);
    return t;
  };

  // 2 · received at Kimp: the gate lights up and the team steps forward
  let a = travel(1);
  tl.to(s, { arch: 1, duration: 0.5 }, a - 0.1)
    .to(s, { team: 1, duration: 1.1 }, a + 0.15)
    .to(s, { lit1: 1, duration: 0.3 }, a + 1.2);
  done.push(a + 1.25);
  t = a + 2.0;

  // 3 · processed in Kimp360: files pop up, then snap into ordered rows
  a = travel(2);
  tl.to(s, { pegs: 1, duration: 1.3 }, a + 0.05)
    .to(s, { sort: 1, duration: 0.8, ease: "power1.inOut" }, a + 1.35)
    .to(s, { lit2: 1, duration: 0.4 }, a + 2.1);
  done.push(a + 2.15);
  t = a + 2.55;

  // 4 · design in progress: shapes assemble, two revision passes
  a = travel(3);
  tl.to(s, { shapes: 1, duration: 1.1 }, a)
    .to(s, { rev: 1, duration: 0.9, ease: "power2.inOut" }, a + 1.1)
    .to(s, { rev: 2, duration: 0.9, ease: "power2.inOut" }, a + 2.05)
    .to(s, { lit3: 1, duration: 0.4 }, a + 2.95);
  done.push(a + 3.0);
  t = a + 3.4;

  // 5 · delivered: the request lands in the cup and the finished artwork pops up
  a = travel(4);
  tl.to(s, { sink: 1, duration: 0.5, ease: "power2.in" }, a)
    .to(s, { out: 1, duration: 0.85, ease: "back.out(1.5)" }, a + 0.4)
    .to(s, { lit4: 1, duration: 0.4 }, a + 0.55)
    .to(s, { confetti: 1, duration: 1.7 }, a + 0.7);
  done.push(a + 0.9);

  const finale = a + 1.5;
  // pull back to reveal the whole board, every checkpoint lit
  tl.to(s, { cam: 0, duration: 1.8, ease: "power2.inOut" }, finale - 0.2);

  const reset = finale + 3.2;
  tl.to(
    s,
    {
      card: 0,
      arch: 0,
      team: 0,
      pegs: 0,
      sort: 0,
      shapes: 0,
      out: 0,
      trail: 0,
      marble: 0,
      lit0: 0,
      lit1: 0,
      lit2: 0,
      lit3: 0,
      lit4: 0,
      zoom: 0.94,
      duration: 0.7,
      ease: "power2.in",
    },
    reset,
  );
  const end = reset + 0.9;
  tl.set(
    s,
    {
      u: stops[0],
      f: 0,
      sink: 0,
      drop: 1,
      doc: 0,
      send: 0,
      rev: 0,
      confetti: 0,
    },
    end,
  );

  return { tl, marks: { arrive, done, finale, reset, end } satisfies Marks };
}

/**
 * Frameless: the root may bleed past its parent (the hero grid cell). The
 * canvas fades into the page, while the UI and the camera framing stay aligned
 * to the parent, measured into the --wf-l/r/t/b insets.
 */
export function HeroWorkflow({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useRef<{
    goTo: (i: number) => void;
    toggle: () => boolean;
  } | null>(null);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reached, setReached] = useState(-1);
  const [doneCount, setDoneCount] = useState(0);
  const [finale, setFinale] = useState(false);

  // ----------------------------------------------------------- scene + loop
  useEffect(() => {
    const el = root.current!;
    const canvas = canvasRef.current!;
    let api: WorkflowScene | null = null;
    let disposed = false;
    let teardown = () => {};

    const wire = (scene: WorkflowScene) => {
      const { tl, marks } = buildTimeline(scene.state, scene.stops, scene.legs);
      const still = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      const pins = Array.from({ length: N }, () => ({ x: 0, y: 0 }));
      let needs = true;
      let visible = false;
      let userPaused = false;
      let last = { r: -2, d: -1, f: false };

      const report = () => {
        const time = tl.time();
        const live = time < marks.reset;
        let r = -1;
        marks.arrive.forEach((at, i) => live && time >= at && (r = i));
        const d = live ? marks.done.filter((at) => time >= at).length : 0;
        const f = live && time >= marks.finale;
        if (r !== last.r) setReached(r);
        if (d !== last.d) setDoneCount(d);
        if (f !== last.f) setFinale(f);
        last = { r, d, f };
      };
      tl.eventCallback("onUpdate", () => {
        needs = true;
        report();
      });

      /** the parent cell in local px: pins outside it are hidden */
      let frameBox = { l: 0, r: 0, t: 0, b: 0 };
      const layout = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        const compact = w < 480;
        const box = el.getBoundingClientRect();
        const cell = el.parentElement?.getBoundingClientRect() ?? box;
        const inset = {
          l: Math.max(0, cell.left - box.left),
          r: Math.max(0, box.right - cell.right),
          t: Math.max(0, cell.top - box.top),
          b: Math.max(0, box.bottom - cell.bottom),
        };
        for (const k of ["l", "r", "t", "b"] as const)
          el.style.setProperty(`--wf-${k}`, `${inset[k].toFixed(1)}px`);
        const gap = compact ? 18 : inset.l > 0 ? 64 : 30;
        frameBox = { l: inset.l, r: w - inset.r, t: inset.t, b: h - inset.b };
        const chip = chipRef.current!;
        scene.resize(w, h, {
          t: chip.offsetTop + chip.offsetHeight + (compact ? 14 : 20),
          b: inset.b + (compact ? 18 : 30),
          l: inset.l + gap,
          r: inset.r + gap,
        });
        needs = true;
      };
      const ro = new ResizeObserver(layout);
      ro.observe(el);
      if (el.parentElement) ro.observe(el.parentElement);
      layout();

      const tick = (_: number, deltaMs: number) => {
        if (!visible || !needs) return;
        const dt = tl.paused() || still ? 0 : Math.min(deltaMs / 1000, 0.05);
        needs = scene.frame(dt) || !tl.paused();
        scene.project(pins);
        pins.forEach((p, i) => {
          const node = pinRefs.current[i];
          if (!node) return;
          node.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
          const inside =
            p.x > frameBox.l + 12 &&
            p.x < frameBox.r - 12 &&
            p.y > frameBox.t &&
            p.y < frameBox.b;
          node.style.opacity = inside ? "" : "0";
          node.style.pointerEvents = inside ? "" : "none";
          // labels open toward the roomier side so they never clip at the panel edge
          const side =
            p.x > frameBox.l + (frameBox.r - frameBox.l) * 0.56 ? "l" : "r";
          if (node.dataset.side !== side) node.dataset.side = side;
        });
      };
      gsap.ticker.add(tick);

      const sync = () => {
        if (visible && !userPaused && !still && !document.hidden) tl.play();
        else tl.pause();
        needs = true;
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        sync();
      });
      io.observe(el);
      document.addEventListener("visibilitychange", sync);

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        scene.setPointer(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          ((e.clientY - r.top) / r.height) * 2 - 1,
        );
        needs = true;
      };
      const onLeave = () => {
        scene.setPointer(0, 0);
        needs = true;
      };
      if (finePointer && !still) {
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
      }

      let seek: gsap.core.Tween | null = null;
      if (still) {
        // one composed still: every stage complete, artwork delivered
        setReduced(true);
        tl.time(marks.finale + 1.2);
        report();
      } else {
        controls.current = {
          goTo(i) {
            seek?.kill();
            tl.pause();
            const target = marks.arrive[i] + 0.05;
            seek = gsap.to(tl, {
              time: target,
              duration: gsap.utils.clamp(
                0.45,
                1.2,
                Math.abs(target - tl.time()) * 0.1,
              ),
              ease: "power2.inOut",
              onUpdate: () => void (needs = true),
              onComplete: sync,
            });
          },
          toggle() {
            userPaused = !userPaused;
            sync();
            return userPaused;
          },
        };
      }

      return () => {
        seek?.kill();
        tl.kill();
        gsap.ticker.remove(tick);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        controls.current = null;
      };
    };

    import("./scene")
      .then(({ createWorkflowScene }) =>
        createWorkflowScene(canvas, { mobile: window.innerWidth < 768 }),
      )
      .then((scene) => {
        if (disposed) return scene.dispose();
        api = scene;
        teardown = wire(scene);
        setReady(true);
      })
      .catch(() => !disposed && setFailed(true));

    return () => {
      disposed = true;
      teardown();
      api?.dispose();
    };
  }, []);

  // ------------------------------------------------------- UI micro-motion
  const prev = useRef({ reached: -1, done: 0, finale: false });
  useEffect(() => {
    const el = root.current;
    if (!el || !ready || reduced) return;
    const was = prev.current;
    // short one-shot animations: left to finish on their own (reverting would re-hide the label card)
    if (reached !== was.reached || finale !== was.finale) {
      const card = el.querySelector(`.js-pin-card-${reached}`);
      if (card && !finale) {
        const dx =
          card.closest<HTMLElement>("[data-side]")?.dataset.side === "l"
            ? 10
            : -10;
        animate(card, {
          opacity: [0, 1],
          translateX: [dx, 0],
          scale: [0.92, 1],
          duration: 550,
          ease: "outBack(1.8)",
        });
      }
    }
    if (doneCount > was.done) {
      const i = doneCount - 1;
      const dot = el.querySelector(`.js-pin-dot-${i}`);
      const wave = el.querySelector(`.js-pin-wave-${i}`);
      if (dot)
        animate(dot, {
          scale: [
            { to: 1.3, duration: 180 },
            { to: 1, duration: 420 },
          ],
          ease: "outBack(2.5)",
        });
      if (wave)
        animate(wave, {
          scale: [1, 2.6],
          opacity: [0.55, 0],
          duration: 900,
          ease: "outExpo",
        });
      animate(el.querySelectorAll(`.js-pin-check-${i}`), {
        scale: [0, 1],
        rotate: [-45, 0],
        duration: 500,
        ease: "outBack(2.5)",
      });
    }
    prev.current = { reached, done: doneCount, finale };
  }, [reached, doneCount, finale, ready, reduced]);

  // ------------------------------------------------------------- markup
  const showFinale = finale || reduced;
  const completed = reduced ? N : doneCount;
  const { title } = HERO_WORKFLOW;

  return (
    <div
      ref={root}
      className={cn("relative isolate w-full select-none", className)}
    >
      <p className="sr-only">
        {title.lead}
        {title.accent} workflow:{" "}
        {STAGES.map((st, i) => `${i + 1}. ${st.label}: ${st.body}`).join(" ")}
      </p>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "workflow-canvas absolute inset-0 size-full transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      />

      {/* station pins, positioned every frame from the 3D scene */}
      {!failed && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          {STAGES.map((st, i) => {
            const isDone = completed > i;
            const active = reached === i && !showFinale;
            return (
              <div
                key={st.label}
                ref={(n) => void (pinRefs.current[i] = n)}
                data-side="r"
                className={cn(
                  "group absolute top-0 left-0 transition-opacity duration-300 will-change-transform",
                  active ? "z-20" : "z-10",
                )}
              >
                <button
                  type="button"
                  onClick={() => controls.current?.goTo(i)}
                  disabled={reduced || !ready}
                  aria-label={`Show step ${i + 1}: ${st.label}`}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full disabled:cursor-default",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full bg-teal-brand opacity-0",
                      `js-pin-wave-${i}`,
                    )}
                  />
                  {active && !isDone && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand/35" />
                  )}
                  <span
                    className={cn(
                      "relative grid size-7 place-items-center rounded-full text-xs font-bold shadow-[0_6px_14px_-6px_rgb(27_30_35/0.45)] transition-colors duration-300",
                      `js-pin-dot-${i}`,
                      isDone
                        ? "bg-teal-brand text-white"
                        : active
                          ? "bg-brand text-white"
                          : "bg-white text-ink/55 ring-1 ring-ink/10",
                    )}
                  >
                    {isDone ? (
                      <Check
                        className={cn("size-3.5", `js-pin-check-${i}`)}
                        strokeWidth={3.5}
                      />
                    ) : (
                      i + 1
                    )}
                  </span>
                </button>

                {active && (
                  <div
                    className={cn(
                      "pointer-events-none absolute top-0 -translate-y-1/2 opacity-0",
                      `js-pin-card-${i}`,
                      "group-data-[side=l]:right-5 group-data-[side=l]:origin-right group-data-[side=r]:left-5 group-data-[side=r]:origin-left",
                    )}
                  >
                    <div className="rounded-xl bg-white/95 px-3 py-2 whitespace-nowrap shadow-[0_14px_30px_-14px_rgb(27_30_35/0.45)] ring-1 ring-ink/5 backdrop-blur-sm">
                      <p className="text-xs leading-tight font-semibold text-ink sm:text-[13px]">
                        {st.label}
                      </p>
                      <p
                        className={cn(
                          "mt-1 flex items-center gap-1.5 text-[11px] leading-none font-medium transition-colors duration-300",
                          isDone ? "text-teal-brand" : "text-muted-foreground",
                        )}
                      >
                        {isDone ? (
                          <Check
                            className={cn("size-3", `js-pin-check-${i}`)}
                            strokeWidth={3.5}
                          />
                        ) : (
                          <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                        )}
                        {st.objective}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* brand chip */}
      <div
        ref={chipRef}
        className="absolute top-[calc(var(--wf-t,0px)+0.75rem)] left-[calc(var(--wf-l,0px)+0.75rem)] z-30 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[13px] font-semibold text-ink shadow-[0_6px_16px_-10px_rgb(27_30_35/0.4)] ring-1 ring-ink/5 backdrop-blur-sm sm:left-[calc(var(--wf-l,0px)+1.5rem)] lg:top-[var(--wf-t,0px)] lg:left-[var(--wf-l,0px)]"
      >
        <span className="relative flex size-2">
          {!reduced && !paused && (
            <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />
          )}
          <span className="relative size-2 rounded-full bg-brand" />
        </span>
        <span>
          {title.lead}
          <span className="text-brand">{title.accent}</span>
        </span>
        <span className="font-medium text-ink/45">· {HERO_WORKFLOW.badge}</span>
      </div>

      {/* pause / play: the loop autoplays, so it must stay stoppable */}
      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused(controls.current?.toggle() ?? false)}
          disabled={!ready}
          aria-label={paused ? "Play animation" : "Pause animation"}
          className="absolute right-[calc(var(--wf-r,0px)+0.75rem)] bottom-[calc(var(--wf-b,0px)+0.75rem)] z-30 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-[0_6px_16px_-8px_rgb(27_30_35/0.45)] ring-1 ring-ink/5 backdrop-blur-sm transition-transform hover:scale-105 disabled:opacity-40 lg:right-[var(--wf-r,0px)] lg:bottom-[var(--wf-b,0px)]"
        >
          {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
        </button>
      )}
    </div>
  );
}
