"use client";

import Link from "next/link";
import { useRef } from "react";

import { KimpLogo } from "@/components/brand/kimp-logo";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

/**
 * Secondary header: lives inside the framed hero card (not sticky). Logo on the
 * left and the site's mega menu on the right; the mega menu panel drops from this
 * header and spans its width. Mobile uses the same slide-out menu as the main header.
 */
export function SecondaryHeader() {
  // The mega menu panel anchors to this header, so it lines up with the hero frame.
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header ref={headerRef} className="relative z-30 flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-6 lg:px-10">
      <Link href="/" aria-label="Kimp home" className="flex items-center rounded-lg text-ink">
        <KimpLogo className="h-7 sm:h-8" title="Kimp" />
      </Link>

      <DesktopNav anchor={headerRef} />

      <MobileNav />
    </header>
  );
}
