"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { KimpLogo } from "@/components/brand/kimp-logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaLink } from "@/components/ui/cta-button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MAIN_NAV, NAV_ACTIONS, type NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

import { NavIcon } from "./nav-icon";

const rowClass =
  "flex items-center gap-3 rounded-xl px-2.5 py-2 text-base font-semibold text-ink no-underline transition-colors hover:bg-surface hover:text-ink";

function MobileLink({ link }: { link: NavLink }) {
  return (
    <a href={link.href} className={rowClass}>
      {link.icon ? (
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft ring-1 ring-brand/10">
          <NavIcon name={link.icon} size={22} />
        </span>
      ) : link.image ? (
        <Image src={link.image.src} alt={link.image.alt} width={40} height={40} className="size-10 rounded-xl object-cover" />
      ) : null}
      {link.label}
    </a>
  );
}

/** Mobile/tablet navigation (< lg): same items and destinations as desktop. */
export function MobileNav({ onDark = false }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          "grid size-11 place-items-center rounded-xl ring-1 transition-colors lg:hidden",
          onDark ? "text-white ring-white/20 hover:bg-white/10" : "text-ink ring-ink/10 hover:bg-ink/5",
        )}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 overflow-y-auto bg-white p-0">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <KimpLogo className="h-7 text-ink" />
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </div>
        <nav aria-label="Mobile" className="px-3 py-2">
          <Accordion>
            {MAIN_NAV.map((item) =>
              item.kind === "link" ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center rounded-lg px-3 py-3.5 text-[1.08rem] font-semibold text-ink hover:bg-surface"
                >
                  {item.label}
                </a>
              ) : (
                <AccordionItem key={item.label} value={item.label} className="border-none">
                  <AccordionTrigger className="px-3 py-3.5 text-[1.08rem] font-semibold text-ink hover:bg-surface hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 pb-2 pl-1">
                      {item.groups.map((g, i) => (
                        <div key={g.heading ?? i}>
                          {g.heading && (
                            <p className="px-2.5 pb-1 text-[0.78rem] font-bold tracking-[0.12em] text-ink/60 uppercase">
                              {g.heading}
                            </p>
                          )}
                          <ul className="grid gap-0.5">
                            {g.links.map((l) => (
                              <li key={l.href}>
                                <MobileLink link={l} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.featured?.kind === "case-study" && (
                        <MobileLink
                          link={{ label: item.featured.heading, href: item.featured.href, icon: "case-studies" }}
                        />
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </nav>
        <div className="mt-auto grid gap-3 border-t border-border p-5">
          <CtaLink href={NAV_ACTIONS.trial.href} size="md" className="w-full">
            {NAV_ACTIONS.trial.label}
          </CtaLink>
          <CtaLink href={NAV_ACTIONS.signIn.href} variant="light" size="md" className="w-full">
            {NAV_ACTIONS.signIn.label}
          </CtaLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
