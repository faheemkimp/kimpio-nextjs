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
 * scrolled past, it drops in as a compact fixed bar (shorter, smaller logo).
 */
// Floating rounded containers for the menu and the actions.
const pill =
  "items-center rounded-[18px] border border-ink/8 bg-white/75 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300";
const pillScrolled = "border-ink/10 bg-white/90 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  // The mega menu card anchors to the header bar so it centres under it.
  const headerRef = useRef<HTMLDivElement>(null);
  // Homepage hero is dark teal: logo/actions go light while the header sits inside it.
  const onDark = usePathname() === "/" && !scrolled;

  useEffect(() => {
    // Switch to the fixed bar only once the in-place header has scrolled away.
    const onScroll = () => setScrolled(window.scrollY > 96);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // The <header> keeps its height in the flow, so going fixed never shifts the page.
    <header className="relative z-40 h-18 w-full">
      <div
        ref={headerRef}
        className={cn(
          scrolled
            ? "header-bar-fixed fixed inset-x-0 top-0 border-b border-ink/8 bg-white/85 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl"
            : // In place: inset to match the hero box padding so the bar sits inside its border.
              "absolute inset-x-2 top-3 sm:inset-x-3 sm:top-4",
        )}
      >
      <div
        className={cn(
          // Mobile: logo left, actions right. Desktop: equal side columns so the nav is truly centered.
          "flex w-full items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10",
          scrolled ? "h-14" : "h-18",
        )}
      >
        <Link href="/" className={cn("flex shrink-0 items-center justify-self-start rounded-lg px-1", onDark ? "text-white" : "text-ink")} aria-label="Kimp home">
          <KimpLogo className={cn("transition-[height] duration-300", scrolled ? "h-6" : "h-8")} title="Kimp" />
        </Link>

        {/* Menu pill */}
        <div className={cn("hidden lg:flex", pill, scrolled && pillScrolled, scrolled ? "p-1" : "p-1.5")}>
          <DesktopNav anchor={headerRef} />
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
