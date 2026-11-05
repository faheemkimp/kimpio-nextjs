import { gsap } from "gsap";
import { CARD_START, CARD_Z, type StepId } from "../config";
import { iso } from "../geometry";

type Q = (selector: string) => Element[];

export type WorkflowTimelines = {
  intro: gsap.core.Timeline;
  master: gsap.core.Timeline;
  idle: gsap.core.Animation[];
};

type BuildOptions = {
  q: Q;
  loop: boolean;
  showSocial: boolean;
  platformCount: number;
  onStep: (id: StepId) => void;
};

export function buildWorkflowTimelines({ q, loop, showSocial, platformCount, onStep }: BuildOptions): WorkflowTimelines {
  const one = (s: string) => q(s)[0];
  const card = one("[data-card]");
  const motion = (id: string) => one(`[data-path="${id}"]`) as SVGPathElement;
  const lit = (id: string) => q(`[data-lit="${id}"]`);
  const status = (id: string) => q(`[data-status="${id}"]`);

  /* ---------------- initial state ---------------- */
  const start = iso(CARD_START.x, CARD_START.y, CARD_Z);
  gsap.set(card, { x: start.x, y: start.y, opacity: 0 });
  gsap.set(q("[data-lit]"), { drawSVG: "0%", opacity: 0 });
  gsap.set(q("[data-beam]"), { drawSVG: "0%", opacity: 0 });
  gsap.set(q("[data-type-line]"), { scaleX: 0, transformOrigin: "0% 50%" });
  gsap.set(q("[data-card-progress]"), { scaleX: 0, transformOrigin: "0% 50%" });
  gsap.set(q("[data-card-check]"), { scale: 0, transformOrigin: "50% 50%" });
  gsap.set(q("[data-popup-assign]"), { scale: 0, transformOrigin: "50% 50%" });
  gsap.set(q("[data-cursor]"), { x: 7, y: 6 });

  /* ---------------- helpers ---------------- */
  const activate = (tl: gsap.core.Timeline, id: string, at: number) => {
    tl.to(q(`[data-glow="${id}"]`), { opacity: 1, duration: 0.35 }, at);
  };

  const deactivate = (tl: gsap.core.Timeline, id: string, at: number) => {
    tl.to(q(`[data-glow="${id}"]`), { opacity: 0, duration: 0.35 }, at);
  };

  const swapStatus = (tl: gsap.core.Timeline, from: string, to: string, at: number) => {
    tl.to(status(from), { opacity: 0, y: -5, duration: 0.2, ease: "power1.in" }, at).fromTo(
      status(to),
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" },
      at + 0.15,
    );
  };

  /** Light the groove ahead of the card, then glide the card along its path. */
  const travel = (tl: gsap.core.Timeline, pathId: string, litId: string, at: number, dur: number) => {
    tl.fromTo(lit(litId), { drawSVG: "0%", opacity: 1 }, { drawSVG: "100%", duration: dur * 0.8, ease: "power1.inOut" }, at)
      .to(card, { motionPath: { path: motion(pathId) }, duration: dur, ease: "power2.inOut" }, at + 0.08)
      .to(lit(litId), { opacity: 0.35, duration: 0.5 }, at + dur + 0.1);
  };

  /* ---------------- idle loops ---------------- */
  const ring = gsap.to(q("[data-hub-ring]"), {
    rotation: 360,
    transformOrigin: "50% 50%",
    duration: 5,
    ease: "none",
    repeat: -1,
  });
  const idle: gsap.core.Animation[] = [ring];
  idle.push(
    gsap.to(q("[data-hub-ticks]"), { rotation: -360, transformOrigin: "50% 50%", duration: 12, ease: "none", repeat: -1 }),
    gsap.fromTo(q("[data-hub-beam]"), { opacity: 0.65 }, { opacity: 1, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 }),
    // particles drifting upward
    gsap.fromTo(
      q("[data-holo-particle]"),
      { y: 0, opacity: 0 },
      {
        keyframes: { y: [0, -26, -58], opacity: [0, 0.95, 0], easeEach: "sine.out" },
        duration: 2.4,
        ease: "none",
        stagger: { each: 0.32, from: "random", repeat: -1 },
      },
    ),
    // ripples spreading across the emitter top
    gsap.fromTo(
      q("[data-holo-ripple]"),
      { attr: { r: 18 }, opacity: 0.6 },
      { attr: { r: 52 }, opacity: 0, duration: 2.2, ease: "power1.out", stagger: { each: 1.5, repeat: -1, repeatDelay: 0.8 } },
    ),
  );
  // occasional hologram flicker
  const flicker = gsap.timeline({ repeat: -1, repeatDelay: 3.6 });
  flicker
    .to(q("[data-holo-flicker]"), { opacity: 0.45, duration: 0.05 })
    .to(q("[data-holo-flicker]"), { opacity: 1, duration: 0.06 })
    .to(q("[data-holo-flicker]"), { opacity: 0.7, duration: 0.04 })
    .to(q("[data-holo-flicker]"), { opacity: 1, duration: 0.12 });
  idle.push(flicker);
  if (showSocial) {
    idle.push(
      gsap.to(q("[data-social-float]"), {
        y: -4,
        duration: 1.7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.35, from: "random" },
      }),
    );
  }
  idle.push(
    gsap.to(q("[data-swatch]"), { y: -1.2, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.2 }),
  );

  /* ---------------- intro (first play only) ---------------- */
  const intro = gsap.timeline({ paused: true });
  intro.from(q("[data-rise]"), {
    opacity: 0,
    y: 26,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.07,
  });

  /* ---------------- 1. customer places a task ---------------- */
  const customer = gsap.timeline();
  activate(customer, "customer", 0);
  customer
    .to(q("[data-type-line]"), { scaleX: 1, duration: 0.5, ease: "power1.inOut", stagger: 0.35 }, 0.2)
    .to(q("[data-cursor]"), { x: 0, y: 0, duration: 0.35, ease: "power2.out" }, 1.0)
    .to(q("[data-submit]"), { scale: 0.86, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1 }, 1.4)
    .fromTo(
      card,
      { opacity: 0, scale: 0.55, transformOrigin: "50% 100%" },
      { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.8)" },
      1.55,
    )
    .fromTo(status("new"), { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 }, 1.8)
    .to({}, { duration: 0.3 }, 2.1);

  /* ---------------- 2. Kimp 360 triage ---------------- */
  const hub = gsap.timeline();
  travel(hub, "CH", "outCH", 0, 1.1);
  deactivate(hub, "customer", 0.35);
  activate(hub, "kimp360", 1.0);
  hub
    .fromTo(q("[data-holo-surge]"), { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1, repeatDelay: 0.35 }, 1.0)
    .to(ring, { timeScale: 6, duration: 0.4, ease: "power2.in" }, 1.0)
    .to(ring, { timeScale: 1, duration: 1.2, ease: "power2.out" }, 1.6)
    .fromTo(
      q("[data-hub-popup]"),
      { opacity: 0, scale: 0.86, transformOrigin: "0% 100%" },
      { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" },
      1.1,
    )
    .fromTo(q("[data-popup-new]"), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 1.45)
    .to(q('[data-popup-count="a"]'), { opacity: 0, duration: 0.15 }, 1.55)
    .to(q('[data-popup-count="b"]'), { opacity: 1, duration: 0.15 }, 1.62);
  swapStatus(hub, "new", "requests", 1.5);
  hub
    .fromTo(q("[data-chip]"), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.14, ease: "back.out(2)" }, 1.8)
    .to(q("[data-popup-assign]"), { scale: 1, duration: 0.35, ease: "back.out(2.5)" }, 2.15)
    .fromTo(q("[data-beam]"), { drawSVG: "0%", opacity: 1 }, { drawSVG: "100%", duration: 0.6, ease: "power2.inOut" }, 2.25)
    .to(q("[data-beam]"), { opacity: 0, duration: 0.4 }, 3.0)
    .to(q("[data-hub-popup]"), { opacity: 0, scale: 0.92, duration: 0.3, ease: "power2.in" }, 2.85);

  /* ---------------- 3. designer works on it ---------------- */
  const designer = gsap.timeline();
  travel(designer, "HD", "outHD", 0, 1.2);
  deactivate(designer, "kimp360", 0.35);
  swapStatus(designer, "requests", "progress", 0.2);
  activate(designer, "designer", 1.05);
  designer
    .fromTo(q("[data-designer-status]"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, 1.15)
    .to(q("[data-card-fill]"), { opacity: 1, duration: 0.4, stagger: 0.3, ease: "power1.out" }, 1.35)
    .to(q("[data-mon-fill]"), { opacity: 1, duration: 0.4, stagger: 0.3, ease: "power1.out" }, 1.35)
    .to(q("[data-card-progress]"), { scaleX: 1, duration: 1.7, ease: "power1.inOut" }, 1.3)
    .to(q("[data-chip]"), { opacity: 0, x: 6, duration: 0.3, stagger: 0.08 }, 0.9)
    .to(q("[data-designer-status]"), { opacity: 0, duration: 0.3 }, 3.1);

  /* ---------------- 4. review ---------------- */
  const review = gsap.timeline();
  travel(review, "DR", "DR", 0, 1.0);
  deactivate(review, "designer", 0.3);
  swapStatus(review, "progress", "review", 0.15);
  activate(review, "review", 0.9);
  review
    .fromTo(
      q("[data-review-ring]"),
      { attr: { r: 22 }, opacity: 0.9 },
      { attr: { r: 46 }, opacity: 0, duration: 1.1, stagger: 0.4, ease: "power1.out", immediateRender: false },
      1.0,
    )
    .to(q("[data-card-scan]"), { opacity: 1, duration: 0.15 }, 1.0)
    .fromTo(q("[data-card-scan]"), { y: 0 }, { y: 70, duration: 0.55, ease: "sine.inOut", yoyo: true, repeat: 1 }, 1.0)
    .to(q("[data-card-scan]"), { opacity: 0, duration: 0.15 }, 2.1)
    .to(q("[data-shield-on]"), { opacity: 1, duration: 0.3 }, 2.1)
    .to(q("[data-shield-check-off]"), { opacity: 0, duration: 0.3 }, 2.1)
    .to(q("[data-card-check]"), { scale: 1, duration: 0.45, ease: "back.out(3)" }, 2.15)
    .to(q("[data-card-outline]"), { attr: { stroke: "#16A34A" }, duration: 0.3 }, 2.15)
    .to({}, { duration: 0.2 }, 2.6);

  /* ---------------- 5. delivered back to the customer ---------------- */
  const delivered = gsap.timeline();
  travel(delivered, "RH", "RH", 0, 0.9);
  deactivate(delivered, "review", 0.3);
  swapStatus(delivered, "review", "completed", 0.15);
  delivered.fromTo(q("[data-hub-flash]"), { opacity: 0 }, { opacity: 0.28, duration: 0.2, yoyo: true, repeat: 1 }, 0.85);
  travel(delivered, "HC", "HC", 0.95, 1.05);
  activate(delivered, "customer", 1.65);
  delivered
    .to(q("[data-laptop-design]"), { opacity: 1, duration: 0.5 }, 1.9)
    .fromTo(
      q("[data-react]"),
      { opacity: 0, scale: 0.4, y: 6, transformOrigin: "50% 100%" },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(2.2)" },
      2.15,
    )
    .to(q("[data-react]"), { opacity: 0, y: -8, duration: 0.4 }, 3.0);

  /* ---------------- 6. publish to social ---------------- */
  const social = gsap.timeline();
  if (showSocial) {
    activate(social, "social", 0.1);
    deactivate(social, "customer", 0.4);
    travel(social, "CS", "CS", 0, 0.8);
    social
      .to(card, { scale: 0.7, duration: 0.8, ease: "power2.inOut" }, 0.08)
      .to(q("[data-social-dim]"), { opacity: 0, duration: 0.5, stagger: 0.1 }, 0.2);
    for (let i = 0; i < platformCount; i++) {
      const at = 0.95 + i * 0.12;
      const copy = q(`[data-copy="${i}"]`);
      social
        .fromTo(lit(`spur${i}`), { drawSVG: "0%", opacity: 1 }, { drawSVG: "100%", duration: 0.45 }, 0.75 + i * 0.08)
        .fromTo(copy, { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.2 }, at)
        .to(copy, { motionPath: { path: one(`[data-copy-path="${i}"]`) as SVGPathElement }, duration: 0.7, ease: "power2.inOut" }, at)
        .to(copy, { opacity: 0, scale: 0.6, duration: 0.2 }, at + 0.65)
        .to(q(`[data-social-tile="${i}"]`), { y: -7, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }, at + 0.66)
        .fromTo(q(`[data-pop="${i}"]`), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, at + 0.85)
        .to(q(`[data-pop="${i}"]`), { opacity: 0, y: -10, duration: 0.4 }, at + 2.0);
    }
    social.to(card, { opacity: 0, scale: 0.4, duration: 0.3, ease: "power2.in" }, 0.9).to({}, { duration: 0.1 }, 3.2);
  }

  /* ---------------- reset (fade back to idle before looping) ---------------- */
  const reset = gsap.timeline();
  reset
    .to(q("[data-lit]"), { opacity: 0, duration: 0.6 }, 0)
    .to(q("[data-laptop-design]"), { opacity: 0, duration: 0.5 }, 0)
    .to(q("[data-type-line]"), { scaleX: 0, duration: 0.4 }, 0)
    .to(q("[data-cursor]"), { x: 7, y: 6, duration: 0.4 }, 0)
    .to(q("[data-mon-fill]"), { opacity: 0, duration: 0.5 }, 0)
    .to(q("[data-shield-on]"), { opacity: 0, duration: 0.4 }, 0)
    .to(q("[data-shield-check-off]"), { opacity: 1, duration: 0.4 }, 0)
    .to(q("[data-popup-assign]"), { scale: 0, duration: 0.01 }, 0);
  if (showSocial) {
    deactivate(reset, "social", 0);
    reset.to(q("[data-social-dim]"), { opacity: 0.62, duration: 0.6 }, 0);
  } else {
    deactivate(reset, "customer", 0);
    reset.to(card, { opacity: 0, duration: 0.4 }, 0);
  }
  reset.to({}, { duration: 0.5 }, 0.6);

  /* ---------------- master ---------------- */
  const master = gsap.timeline({ paused: true, repeat: loop ? -1 : 0, repeatDelay: 0.2 });
  const beats: [StepId, gsap.core.Timeline][] = [
    ["customer", customer],
    ["kimp360", hub],
    ["designer", designer],
    ["review", review],
    ["delivered", delivered],
  ];
  if (showSocial) beats.push(["social", social]);
  for (const [id, beat] of beats) {
    master.addLabel(id);
    master.call(onStep, [id], id);
    master.add(beat, id);
  }
  if (loop) master.add(reset, "+=0.3");

  return { intro, master, idle };
}
