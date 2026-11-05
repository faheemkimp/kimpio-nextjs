import Link from "next/link";

import { KimpLogo } from "@/components/brand/kimp-logo";
import { FOOTER } from "@/content/home-sections";
import { cn } from "@/lib/utils";

/** Site footer: brand blurb, three link columns, legal line. */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/70">
      <FooterLinks className="container-page py-16 sm:py-20" />
      <div className="border-t border-white/10">
        <FooterLegal className="container-page py-6" />
      </div>
    </footer>
  );
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
