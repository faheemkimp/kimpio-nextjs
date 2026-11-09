"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

/** Scroll distance (px) before the strip slides in. */
const SHOW_AFTER = 600;

/**
 * Sticky "free trial" strip pinned to the bottom of the viewport. It slides up
 * once the visitor has scrolled past SHOW_AFTER, and slides back down (then goes
 * `visibility: hidden`, so it can't be tabbed into) as soon as any <footer>
 * enters the viewport, so it never covers the footer or the closing CTA panel.
 * The strip lives in the layout and survives client navigation, so footers are
 * re-observed on every route change (the previous page's footer is gone).
 */
export function TrialStrip() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setFooterInView(visible.size > 0);
    });
    // Observe every footer, including ones streamed in after this effect runs
    // (a page's closing panel can arrive later than the layout). Full-screen
    // sections with their own bottom controls opt in with `data-hide-trial`
    // (e.g. the pinned /our-work/ slider), so the strip never covers them.
    const watched = new WeakSet<Element>();
    const watchFooters = () =>
      document.querySelectorAll("footer, [data-hide-trial]").forEach((f) => {
        if (watched.has(f)) return;
        watched.add(f);
        io.observe(f);
      });
    watchFooters();
    const mo = new MutationObserver(watchFooters);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  const shown = scrolled && !footerInView;

  return (
    <aside
      aria-label="Free trial"
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-3 z-40 px-3 sm:bottom-5 sm:px-5",
        "transition-[translate,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0",
        shown
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-[calc(100%+2rem)] opacity-0",
      )}
    >
      <div className="relative mx-auto max-w-188 pt-7">
        {/* Offer tag: a dark tab with a slanted left edge, tucked behind the strip's top-right corner. */}
        <div
          className={cn(
            "absolute top-0 right-4 z-0 h-12 rounded-tr-xl bg-[linear-gradient(180deg,#2a2f36_0%,#121418_100%)] pt-1.5 pr-4 pl-8 text-[0.7rem] font-bold whitespace-nowrap text-white sm:right-5 sm:h-12 sm:pt-1.5 sm:pr-4 sm:pl-9 sm:text-[0.8rem]",
            "[clip-path:polygon(1.25rem_0,100%_0,100%_100%,0_100%)] sm:[clip-path:polygon(1.5rem_0,100%_0,100%_100%,0_100%)]",
          )}
        >
          Get 50% Off For 4 Months
        </div>

        <div
          className={cn(
            "relative z-10 flex items-center gap-3 rounded-2xl py-3 pr-3 pl-23 text-white sm:gap-4 sm:rounded-[1.125rem] sm:py-4 sm:pr-4 sm:pl-32",
            "bg-ink bg-[radial-gradient(60%_140%_at_0%_50%,rgb(241_115_30/0.55)_0%,transparent_70%),radial-gradient(50%_120%_at_100%_100%,rgb(124_105_232/0.35)_0%,transparent_70%)]",
            "shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_20px_44px_-14px_rgb(27_30_35/0.6)] ring-1 ring-white/10",
          )}
        >
          {/* Mascot: head pops out above the strip, shoulders clipped by its bottom edge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 w-21 [clip-path:inset(-100%_0_0_0_round_0_0_0_1rem)] sm:w-28 sm:[clip-path:inset(-100%_0_0_0_round_0_0_0_1.125rem)]"
          >
            <Image
              src="/images/home/trial-mascot.png"
              alt=""
              width={302}
              height={266}
              sizes="(min-width: 640px) 120px, 84px"
              className="w-full translate-y-[6%] drop-shadow-[0_-4px_12px_rgb(0_0_0/0.35)]"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[0.95rem] leading-tight font-bold sm:text-[1.25rem]">
              Try our 7 day free trial now
            </p>
            <p className="mt-0.5 hidden text-sm text-white/75 sm:block">
              Sign up in 2 minutes | Cancel Anytime
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <CtaLink
              href="/register-now/"
              variant="light"
              className="hidden h-11 px-4 text-[0.9rem] sm:inline-flex"
              tabIndex={shown ? undefined : -1}
            >
              Sign up
            </CtaLink>
            <CtaLink
              href="/book-a-call"
              className="h-10 px-3 text-sm sm:h-11 sm:px-4 sm:text-[0.9rem]"
              tabIndex={shown ? undefined : -1}
            >
              <span className="sm:hidden">Book a demo</span>
              <span className="hidden sm:inline">Book a demo call</span>
            </CtaLink>
          </div>
        </div>
      </div>
    </aside>
  );
}
