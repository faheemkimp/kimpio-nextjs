"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the standalone site footer on the homepage, where <FinalCta> already
 * renders the footer links inside its closing panel.
 */
export function FooterGate({ children }: { children: ReactNode }) {
  return usePathname() === "/" ? null : children;
}
