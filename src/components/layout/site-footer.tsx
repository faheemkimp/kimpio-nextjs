import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { KimpLogo } from "@/components/brand/kimp-logo";
import { FOOTER } from "@/content/home-sections";
import { cn } from "@/lib/utils";

/**
 * The one footer shell every page shares: a rounded ink panel with brand glows
 * and the link columns + legal line in a glass card at the bottom. Pages that
 * close on a call to action pass it as children so the CTA and the footer live
 * in the same panel (and hide the standalone <SiteFooter> via <FooterGate>).
 */
export function FooterPanel({
  children,
  collab = false,
}: {
  children?: ReactNode;
  /**
   * Pages whose live footer is the older theme footer ("footer_new"): it carries an
   * <h4>In Collaboration With</h4> + the YSpace logo, kept here for heading parity.
   */
  collab?: boolean;
}) {
  return (
    <footer className="relative px-2 pt-6 pb-6 sm:px-3 sm:pb-5">
      <div data-fx="panel" className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-white sm:rounded-[2.5rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-24 size-[34rem] rounded-full bg-brand/35 blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-[#7c69e8]/25 blur-3xl" />
          {/* glossy ribbon drifting in parallax behind the mascot */}
          <div
            data-fx="parallax"
            data-speed="0.5"
            className="absolute top-[8%] -right-[12%] w-[70%] max-w-[56rem] opacity-90 sm:top-[4%] lg:-right-[6%] lg:w-[52%]"
          >
            <Image
              src="/images/home/redesign/ribbon.webp"
              alt=""
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 50vw, 70vw"
              className="w-full"
            />
          </div>
        </div>

        {children ?? <div aria-hidden="true" className="h-10 sm:h-16" />}

        {/* footer links: a glass card inside the same panel */}
        <div className="container-page relative">
          <div data-fx="reveal" className="rounded-[1.75rem] bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
            <FooterLinks />
            {collab && (
              <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                <h4 className="text-sm font-bold tracking-[0.14em] text-white uppercase">In Collaboration With</h4>
                <a href="https://yspace.yorku.ca/" target="_blank" rel="noopener" className="inline-flex rounded-xl bg-white px-3 py-2">
                  <Image src="/images/footer/footer_yspace.png" alt="footer_yspace" width={240} height={70} className="h-8 w-auto" />
                </a>
              </div>
            )}
            <FooterLegal className="mt-10 border-t border-white/10 pt-6" />
          </div>
        </div>

        {/* breathing room below the footer card */}
        <div aria-hidden="true" className="h-10 sm:h-16" />
      </div>
    </footer>
  );
}

/** Standalone footer for pages without their own closing CTA panel. */
export function SiteFooter() {
  return <FooterPanel />;
}

/** Brand blurb + social pills + link columns. Reused inside the homepage closing panel. */
export function FooterLinks({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-6 gap-y-10 text-white/70 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12", className)}>
      <div className="col-span-full max-w-sm lg:col-span-1">
        <Link href="/" aria-label="Kimp home" className="inline-flex text-white">
          <KimpLogo className="h-9" title="Kimp" />
        </Link>
        <p className="mt-5 leading-relaxed">{FOOTER.blurb}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {FOOTER.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                rel="noopener"
                className="inline-flex rounded-full bg-white/8 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-brand hover:ring-brand"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {FOOTER.columns.map((col) => (
        <nav key={col.title} aria-label={col.title}>
          <h2 className="text-sm font-bold tracking-[0.14em] text-white uppercase">{col.title}</h2>
          <ul className="mt-5 space-y-3">
            {col.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-[#ffb27a]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}

export function FooterLegal({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:justify-between", className)}>
      <p>{FOOTER.copyright}</p>
      <p>{FOOTER.address}</p>
    </div>
  );
}
