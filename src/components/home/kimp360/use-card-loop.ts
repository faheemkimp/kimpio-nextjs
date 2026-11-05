"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import { useInViewPlayback } from "@/components/home/workflow-animation/hooks/useInViewPlayback";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

export type Q = (selector: string) => Element[];

/**
 * Builds a card's looping GSAP timeline once, and plays it only while the card
 * is on screen. With reduced motion the loop is never built; `still` can pose
 * the card in its finished state instead.
 */
export function useCardLoop(
  root: RefObject<HTMLElement | null>,
  build: (q: Q, el: HTMLElement) => gsap.core.Timeline,
  still?: (q: Q, el: HTMLElement) => void,
) {
  const inView = useInViewPlayback(root, 0.3);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        tl.current = build(q, el).pause();
        return () => {
          tl.current = null;
        };
      });
      mm.add("(prefers-reduced-motion: reduce)", () => still?.(q, el));
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (inView) t.play();
    else t.pause();
  }, [inView]);
}
