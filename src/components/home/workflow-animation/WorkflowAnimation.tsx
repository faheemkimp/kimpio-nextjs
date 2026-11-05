"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { DEFAULT_PLATFORMS, DEFAULT_STEPS, type Platform, type Step, type StepId } from "./config";
import { WorkflowScene } from "./WorkflowScene";
import { buildWorkflowTimelines, type WorkflowTimelines } from "./timeline/buildTimeline";
import { useInViewPlayback } from "./hooks/useInViewPlayback";

gsap.registerPlugin(useGSAP, MotionPathPlugin, DrawSVGPlugin);

export type WorkflowAnimationProps = {
  /** Start playing as soon as the scene is visible. Default true. */
  autoPlay?: boolean;
  /** Repeat the workflow forever. Default true. */
  loop?: boolean;
  /** Timeline speed multiplier. Default 1. */
  speed?: number;
  /** Include step 6 (publishing to social). Default true. */
  showSocial?: boolean;
  /** Up to four platforms for the social step. */
  platforms?: Platform[];
  /** Override captions/titles (matched by step id). */
  steps?: Step[];
  /** Show the caption + step dots under the board. Default true. */
  showCaption?: boolean;
  onStepChange?: (step: StepId) => void;
  className?: string;
};

export function WorkflowAnimation({
  autoPlay = true,
  loop = true,
  speed = 1,
  showSocial = true,
  platforms = DEFAULT_PLATFORMS,
  steps = DEFAULT_STEPS,
  showCaption = true,
  onStepChange,
  className,
}: WorkflowAnimationProps) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<WorkflowTimelines | null>(null);
  const introDone = useRef(false);
  const [current, setCurrent] = useState<StepId>("customer");
  const [reduced, setReduced] = useState(false);
  const [version, setVersion] = useState(0);
  const inView = useInViewPlayback(root);

  const visibleSteps = useMemo(
    () => steps.filter((s) => showSocial || s.id !== "social"),
    [steps, showSocial],
  );
  const shownPlatforms = useMemo(() => platforms.slice(0, 4), [platforms]);

  const onStepRef = useRef(onStepChange);
  onStepRef.current = onStepChange;
  const handleStep = useCallback((id: StepId) => {
    setCurrent(id);
    onStepRef.current?.(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const q = gsap.utils.selector(root);
          const built = buildWorkflowTimelines({
            q,
            loop,
            showSocial,
            platformCount: shownPlatforms.length,
            onStep: handleStep,
          });
          built.master.timeScale(speed);
          tl.current = built;
          setVersion((v) => v + 1);

          if (ctx.conditions?.reduce) {
            // Static, fully-composed frame: delivered + approved.
            setReduced(true);
            built.idle.forEach((t) => t.pause());
            built.intro.progress(1);
            built.master.seek("delivered+=2.6").pause();
            setCurrent("delivered");
            introDone.current = true;
          } else {
            setReduced(false);
            built.idle.forEach((t) => t.pause());
            introDone.current = false;
          }

          return () => {
            tl.current = null;
          };
        },
      );
    },
    { scope: root, dependencies: [loop, showSocial, shownPlatforms.join(","), speed], revertOnUpdate: true },
  );

  // Play only while visible (and not reduced-motion).
  useEffect(() => {
    const t = tl.current;
    if (!t || reduced || !autoPlay) return;
    if (inView) {
      t.idle.forEach((x) => x.play());
      if (!introDone.current) {
        introDone.current = true;
        t.intro.play(0).then(() => t.master.play());
      } else {
        t.master.play();
      }
    } else {
      t.idle.forEach((x) => x.pause());
      t.master.pause();
    }
  }, [inView, reduced, autoPlay, version]);

  const jumpTo = (id: StepId) => {
    const t = tl.current;
    if (!t) return;
    t.intro.progress(1);
    introDone.current = true;
    if (reduced) {
      t.master.seek(`${id}+=1.9`).pause();
      setCurrent(id);
    } else {
      t.master.play(id);
    }
  };

  const index = Math.max(0, visibleSteps.findIndex((s) => s.id === current));
  const step = visibleSteps[index];

  return (
    <div ref={root} data-ready={version > 0} className={`wf-root relative ${className ?? ""}`}>
      <WorkflowScene platforms={shownPlatforms} showSocial={showSocial} />

      <ol className="sr-only">
        {visibleSteps.map((s) => (
          <li key={s.id}>
            {s.title}: {s.caption}
          </li>
        ))}
      </ol>

      {showCaption && step && (
        <div className="wf-caption pointer-events-auto mx-auto -mt-2 flex w-fit max-w-full flex-col items-center gap-3 sm:-mt-6">
          <div
            aria-live={reduced ? "off" : "polite"}
            className="flex items-center gap-3 rounded-full border border-[#E3E7EE] bg-white/90 py-1.5 pl-1.5 pr-4 text-sm shadow-[0_8px_24px_-12px_rgba(30,40,70,0.25)] backdrop-blur"
          >
            <span className="grid h-7 min-w-7 place-items-center rounded-full bg-gradient-to-br from-[#F6A55E] to-[#F07422] px-2 text-xs font-bold text-white">
              {index + 1}/{visibleSteps.length}
            </span>
            <span key={step.id} className="wf-caption-text font-medium text-[#1E1F2B]">
              <span className="font-semibold">{step.title}</span>
              <span className="mx-1.5 text-[#B5BDCA]">·</span>
              <span className="text-[#5B6478]">{step.caption}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5" role="group" aria-label="Workflow steps">
            {visibleSteps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => jumpTo(s.id)}
                aria-label={`Show step ${i + 1}: ${s.title}`}
                aria-current={i === index ? "step" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F07422] ${
                  i === index ? "w-6 bg-[#F07422]" : "w-1.5 bg-[#CDD3DD] hover:bg-[#AEB6C3]"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
