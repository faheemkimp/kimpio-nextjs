"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Pages whose closing CTA already renders <FooterPanel> (CTA + footer in one panel). */
const OWN_FOOTER = new Set(["/", "/graphic-design-services", "/video-design-services", "/pricing", "/kimp360-platform", "/salary-cost-calculator", "/our-work", "/kimp360-product-updates", "/our-work/video-samples", "/compare-service", "/reviews", "/white-label-graphic-design", "/entrepreneurs", "/fitness-health-brands", "/professional-services", "/faq",
  "/about-us", "/contact-us", "/affiliates", "/careers", "/careers/graphic-designer", "/careers/project-manager", "/careers/content-writer",
  "/careers/motion-graphics-artist", "/careers/illustrator", "/small-business", "/startups", "/marketing", "/enterprise-clients", "/yspace",
  "/canva-designers", "/design-categories", "/brand-assets", "/privacy-policy", "/terms-of-services", "/cookie-policy-eu", "/llm-information-guidance"]);

/** Hides the standalone site footer on pages that render their own footer panel. */
export function FooterGate({ children }: { children: ReactNode }) {
  const path = usePathname().replace(/(.)\/$/, "$1");
  // /case-study/ and every /case-study/{slug}/ close with their own FinalCta panel.
  return OWN_FOOTER.has(path) || path === "/case-study" || path.startsWith("/case-study/") ? null : children;
}
