"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { KimpLogo } from "@/components/brand/kimp-logo";
import { CtaLink } from "@/components/ui/cta-button";
import { NAV_ACTIONS } from "@/content/navigation";
import { cn } from "@/lib/utils";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

/**
 * Glass header. Sits in place inside the hero box at the top of the page; once
 * scrolled past, it becomes a full-width dark-teal bar pinned to the top, holding the
 * logo, menu and actions. It slides away while scrolling down and back in on scroll up.
 */
// Floating rounded container for the menu while the header sits in place.
const pill =
  "items-center rounded-[18px] border backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300";
const pillLight = "border-ink/8 bg-white/75";
/** Dark glass to match the teal hero. */
const pillDark = "border-white/15 bg-white/[0.07] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]";
// Inside the scrolled strip the strip itself is the container, so the pill goes flat.
const pillScrolled = "border-transparent bg-transparent shadow-none backdrop-blur-none";

// Past this point the in-place header has scrolled away, so the floating strip takes over.
const FIX_AT = 96;
// The strip only starts hiding on scroll down once the reader is this far into the page.
const HIDE_AFTER = 1000;
// How far the reader must keep scrolling down before the strip hides.
const HIDE_DELTA = 120;
// Scrolling up this little is enough to bring it back; also filters trackpad jitter.
const SHOW_DELTA = 6;

/** Pages whose first section is a dark hero box the in-place header sits inside. Inner pages use the light InnerHero. */
const DARK_HERO_PATHS = new Set(["/"]);

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // The mega menu card anchors to the header bar so it centres under it.
  const headerRef = useRef<HTMLDivElement>(null);
  // Light content on a dark hero (DARK_HERO_PATHS, in place) and on the dark-teal strip (any page, scrolled).
  const onDarkHero = DARK_HERO_PATHS.has(usePathname());
  const onDark = scrolled || onDarkHero;

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > FIX_AT);
      if (y <= HIDE_AFTER) setHidden(false);
      else if (y - lastY > HIDE_DELTA) setHidden(true);
      else if (lastY - y > SHOW_DELTA) setHidden(false);
      else return; // not far enough yet: keep lastY so the distance keeps accumulating
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // The <header> keeps its height in the flow, so going fixed never shifts the page.
    <header className="relative z-40 h-18 w-full">
      <div
        ref={headerRef}
        className={cn(
          scrolled
            ? cn(
                // Full-width bar pinned to the top edge, hero teal.
                "header-bar-fixed fixed inset-x-0 top-0 border-b border-white/10 bg-[linear-gradient(100deg,rgb(4_70_61/0.94),rgb(3_47_42/0.94))] shadow-[0_14px_40px_-16px_rgb(2_31_28/0.6)] backdrop-blur-xl",
                "transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                // Hiding: quicker, accelerating out of view.
                hidden && "duration-300 ease-[cubic-bezier(0.4,0,1,1)]",
                // Keyboard users tabbing into a hidden strip bring it back.
                hidden && "pointer-events-none -translate-y-[calc(100%+2rem)] opacity-0 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100",
              )
            : // In place: inset to match the hero box padding so the bar sits inside its border.
              "absolute inset-x-2 top-3 sm:inset-x-3 sm:top-4",
        )}
      >
      <div
        className={cn(
          // Mobile: logo left, actions right. Desktop: equal side columns so the nav is truly centered.
          "flex w-full items-center justify-between gap-4 transition-[height] duration-300 lg:grid lg:grid-cols-[1fr_auto_1fr]",
          scrolled ? "h-14 px-4 sm:px-6 lg:px-10" : "h-18 px-4 sm:px-6 lg:px-10",
        )}
      >
        <Link href="/" className={cn("flex shrink-0 items-center justify-self-start rounded-lg px-1", onDark ? "text-white" : "text-ink")} aria-label="Kimp home">
          <KimpLogo className={cn("transition-[height] duration-300", scrolled ? "h-6" : "h-8")} title="Kimp" />
        </Link>

        {/* Menu pill */}
        <div className={cn("hidden lg:flex", pill, onDark ? pillDark : pillLight, scrolled && pillScrolled, scrolled ? "p-1" : "p-1.5")}>
          <DesktopNav anchor={headerRef} onDark={onDark} />
        </div>

        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <a
            href={NAV_ACTIONS.signIn.href}
            className={cn(
              "hidden rounded-lg px-3 py-2 text-[1.05rem] font-semibold transition-colors hover:text-brand sm:inline-flex",
              onDark ? "text-white" : "text-ink",
            )}
          >
            {NAV_ACTIONS.signIn.label}
          </a>
          <CtaLink href={NAV_ACTIONS.trial.href} size="sm" className="hidden sm:inline-flex">
            {NAV_ACTIONS.trial.label}
          </CtaLink>
          <MobileNav onDark={onDark} />
        </div>
      </div>
      </div>
    </header>
  );
}
