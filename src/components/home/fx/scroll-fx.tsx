"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * One scroll-motion controller for the homepage. Sections stay server-rendered
 * and opt in with `data-fx` attributes; this component wires them to GSAP
 * ScrollTrigger after hydration. Every effect is a `from` state, so without JS
 * (or with reduced motion) the page renders in its final, fully visible state.
 *
 *   data-fx="reveal"      fade + rise once when it enters
 *   data-fx="stagger"     same, for each direct child in sequence
 *   data-fx="words"       masked word-by-word rise (SectionHeading titles)
 *   data-fx="panel"       inset panel that grows to full size while scrolling in
 *   data-fx="parallax"    drifts with scroll; data-speed (-1..1), default 0.2
 *   data-fx="draw"        SVG path(s) inside draw themselves with scroll
 *   data-fx="count"       leading number counts up once ("875K+", "$1,397")
 *   data-fx="merge"       slides toward the centre; data-from="left|right"
 *   data-fx="fill"        scaleX 0 -> 1 once (progress bars)
 */
export function ScrollFx() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const all = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
      const once = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });

      // Explicit end values (fromTo) instead of `from`: a `from` tween reads the
      // element's *current* opacity as its destination, so if a CSS transition or a
      // re-run (StrictMode, refresh) catches it mid-fade the element stays hidden.
      // clearProps hands control back to CSS (hover lifts etc.) once it's done.
      all('[data-fx="reveal"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            delay: Number(el.dataset.delay ?? 0),
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: once(el),
          },
        );
      });

      all('[data-fx="stagger"]').forEach((el) => {
        gsap.fromTo(
          el.children,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: once(el),
          },
        );
      });

      all('[data-fx="words"]').forEach((el) => {
        gsap.from(el.querySelectorAll(".fx-word > span"), {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.035,
          ease: "power4.out",
          scrollTrigger: once(el, "top 90%"),
        });
      });

      all('[data-fx="panel"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.93, borderRadius: "4rem" },
          {
            scale: 1,
            borderRadius: getComputedStyle(el).borderRadius || "2.5rem",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: 0.6 },
          },
        );
      });

      all('[data-fx="parallax"]').forEach((el) => {
        const speed = Number(el.dataset.speed ?? 0.2);
        gsap.fromTo(
          el,
          { yPercent: speed * 50 },
          {
            yPercent: speed * -50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      all('[data-fx="draw"]').forEach((el) => {
        const paths = el.querySelectorAll<SVGGeometryElement>(":is(path, line, polyline, circle):not([data-static])");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.fromTo(
            p,
            { strokeDasharray: len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: el.dataset.start ?? "top 85%",
                end: el.dataset.end ?? "bottom 45%",
                scrub: 0.8,
              },
            },
          );
        });
      });

      all('[data-fx="count"]').forEach((el) => {
        // Cache the server-rendered value: effects can re-run (StrictMode, matchMedia) mid-count.
        el.dataset.countValue ??= el.textContent?.trim() ?? "";
        const original = el.dataset.countValue;
        const m = original.match(/^(\D*)([\d,]*\.?\d+)(.*)$/);
        if (!m) return;
        const [, pre, num, post] = m;
        const target = Number(num.replace(/,/g, ""));
        const decimals = num.includes(".") ? num.split(".")[1].length : 0;
        const grouped = num.includes(",");
        const fmt = (v: number) =>
          pre +
          v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: grouped,
          }) +
          post;
        // Only touch the text once the trigger fires, so the real value shows if it never does.
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => {
            const state = { v: 0 };
            gsap.to(state, {
              v: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = fmt(state.v);
              },
              onComplete: () => {
                el.textContent = original;
              },
            });
          },
        });
      });

      all('[data-fx="merge"]').forEach((el) => {
        const dir = el.dataset.from === "right" ? 1 : -1;
        gsap.from(el, {
          xPercent: dir * 18,
          rotate: dir * 3,
          autoAlpha: 0.3,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 45%", scrub: 0.6 },
        });
      });

      all('[data-fx="fill"]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: once(el, "top 92%"),
        });
      });
    });

    // Late-loading images change section heights; keep trigger positions honest.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
