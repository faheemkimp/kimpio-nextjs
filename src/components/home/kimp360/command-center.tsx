"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AiPreferenceCard } from "./ai-preference-card";
import { WorkflowBoardCard } from "./workflow-board-card";
import { BrandMemoryCard } from "./brand-memory-card";
import { TeamCard } from "./team-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * "Your Design Command Center": the Kimp 360 feature bento. Four pastel
 * cards sit straight on the page, each running its own small product demo
 * while it is on screen.
 */
export function CommandCenter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        gsap.from(q("[data-cc-reveal]"), {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: q("[data-cc-head]")[0], start: "top 85%", once: true },
        });
        gsap.from(q("[data-cc-frame]"), {
          y: 60,
          autoAlpha: 0,
          scale: 0.97,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: q("[data-cc-frame]")[0], start: "top 88%", once: true },
        });
        ScrollTrigger.batch(q("[data-cc-card]"), {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { y: 40, autoAlpha: 0, scale: 0.97 },
              { y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.15, clearProps: "transform" },
            ),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="kimp360"
      aria-labelledby="cc-title"
      className="relative bg-white px-2.5 py-2.5 sm:px-4 sm:py-4 lg:px-5 lg:py-5"
    >
      <div className="relative">
        <div className="mx-auto max-w-[1240px] px-3 pt-14 pb-3 sm:px-6 sm:pt-20 sm:pb-6 lg:px-8 lg:pb-8">
          {/* heading */}
          <div data-cc-head className="grid gap-6 px-2 sm:px-3 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p
                data-cc-reveal
                className="inline-flex items-center gap-2 rounded-full border border-[#0E2A4A]/10 bg-white/80 py-1 pr-3 pl-1.5 text-[0.8rem] font-medium text-[#33405A] shadow-[0_6px_16px_-12px_rgba(20,35,60,0.5)] backdrop-blur"
              >
                <span className="relative grid size-5 place-items-center rounded-full bg-[#FFE9D9]">
                  <span className="absolute size-2 animate-ping rounded-full bg-[#F07422]/50 motion-reduce:hidden" />
                  <span className="size-2 rounded-full bg-[#F07422]" />
                </span>
                Introducing KIMP360
              </p>
              <h2
                id="cc-title"
                data-cc-reveal
                className="mt-5 font-heading text-[2.4rem] leading-[1.04] font-bold tracking-[-0.025em] text-[#14233A] sm:text-[3.2rem] xl:text-[3.6rem]"
              >
                Your Design
                <br />
                <span className="bg-gradient-to-r from-[#F08A3E] to-[#E25F12] bg-clip-text text-transparent">Command Center.</span>
              </h2>
            </div>
            <p data-cc-reveal className="max-w-[480px] text-base leading-[1.7] font-medium text-[#4A5A73] sm:text-[1.05rem] lg:justify-self-end lg:pb-2">
              Make, manage and collaborate on design requests, set your AI preference per brand, and keep everything KIMP knows
              about your brand in one place. Included with every subscription.
            </p>
          </div>

          {/* card grid */}
          <div data-cc-frame className="mt-10 sm:mt-14">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
              <AiPreferenceCard className="lg:col-span-5" />
              <WorkflowBoardCard className="lg:col-span-7" />
              <BrandMemoryCard className="lg:col-span-8" />
              <TeamCard className="lg:col-span-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
