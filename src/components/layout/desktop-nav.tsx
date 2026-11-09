"use client";

import { ArrowRight, ArrowUpRight, CircleCheck } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";

import { HERO } from "@/content/home";
import {
  MAIN_NAV,
  type FeaturedCaseStudy,
  type MegaItem,
  type NavLink,
} from "@/content/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { NavIcon } from "./nav-icon";

const BOOK_CALL = { label: "Book A Call", href: "/book-a-call/" };

const itemBase =
  "relative h-10 rounded-lg bg-transparent px-3.5 text-[1.05rem] font-semibold tracking-[-0.005em] transition-colors duration-300";
// The base trigger style sets bg-muted on several open/hover combos; each one is overridden here.
const itemLight =
  "text-ink hover:bg-ink/5 hover:text-ink focus:bg-ink/5 focus:text-ink data-popup-open:bg-ink/5 data-popup-open:text-ink data-popup-open:hover:bg-ink/8 data-open:bg-ink/5 data-open:hover:bg-ink/8 data-open:focus:bg-ink/8";
/** Over the dark hero: white labels on a dark-glass pill. */
const itemDark =
  "text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-popup-open:bg-white/15 data-popup-open:text-white data-popup-open:hover:bg-white/20 data-open:bg-white/15 data-open:hover:bg-white/20 data-open:focus:bg-white/20";

const arrowReveal =
  "size-3.5! -translate-x-1 text-brand opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Active item: the same background as hover (no underline), so the current section reads as "held" hover. */
const activeLight = "bg-ink/5";
const activeDark = "bg-white/10";

/* ───────────────────────── link rows ───────────────────────── */

const rowLink =
  "group/link items-start gap-4 rounded-2xl p-3 whitespace-normal transition-colors hover:bg-surface hover:text-ink focus:bg-surface";

/** Icon (or photo) + label + description, side by side. Used by Services, KIMP360, Our Work, Kimp For. */
function RowLink({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <NavigationMenuLink
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={cn(rowLink, active && "bg-brand-soft/60")}
    >
      {link.icon ? (
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft ring-1 ring-brand/10 transition-[transform,background-color] duration-300 ease-out group-hover/link:-rotate-3 group-hover/link:bg-white">
          <NavIcon name={link.icon} className="size-6" />
        </span>
      ) : link.image ? (
        <Image
          src={link.image.src}
          alt={link.image.alt}
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-ink/5 transition-transform duration-300 group-hover/link:-rotate-2"
        />
      ) : null}
      <span className="flex min-w-0 flex-col gap-1 pt-0.5">
        <span className="flex items-center gap-1.5 text-[1.05rem] font-bold text-ink">
          {link.label}
          <ArrowRight aria-hidden="true" className={arrowReveal} />
        </span>
        {link.description && (
          <span className="text-[0.92rem] leading-snug font-medium text-ink/70">{link.description}</span>
        )}
      </span>
    </NavigationMenuLink>
  );
}

/** Icon + label row, no description. Used by "More". */
function CompactLink({ link, active }: { link: NavLink; active: boolean }) {
  const isFile = link.href.endsWith(".pdf");
  return (
    <NavigationMenuLink
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/link gap-3 rounded-xl px-2 py-2 text-base font-semibold whitespace-nowrap text-ink transition-colors hover:bg-surface hover:text-ink focus:bg-surface",
        active && "bg-brand-soft/60 text-ink",
      )}
    >
      {link.icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft ring-1 ring-brand/10 transition-transform duration-300 group-hover/link:-rotate-3 group-hover/link:bg-white">
          <NavIcon name={link.icon} className="size-5" />
        </span>
      )}
      {link.label}
      {isFile ? (
        <ArrowUpRight aria-hidden="true" className="size-3.5! text-muted-foreground" />
      ) : (
        <ArrowRight aria-hidden="true" className={arrowReveal} />
      )}
    </NavigationMenuLink>
  );
}

/* ───────────────────────── panel parts ───────────────────────── */

/** Dark intro card with a 3D object breaking out of the corner. */
function Intro({ item }: { item: MegaItem }) {
  const { intro } = item;
  return (
    <div className="group/intro relative flex h-full w-full min-h-[17rem] flex-col overflow-hidden rounded-2xl bg-ink p-6 text-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-10 size-52 rounded-full bg-brand/45 blur-3xl"
      />
      <Image
        src={intro.image}
        alt=""
        aria-hidden="true"
        width={136}
        height={136}
        className="pointer-events-none absolute -right-3 -bottom-3 size-34 rotate-[-8deg] drop-shadow-[0_18px_24px_rgb(0_0_0/0.45)] transition-transform duration-500 ease-out group-hover/intro:translate-y-[-6px] group-hover/intro:rotate-0"
      />
      <span className="relative text-[0.78rem] font-bold tracking-[0.12em] text-brand uppercase">{item.label}</span>
      <span className="relative mt-3 text-[1.3rem] leading-snug font-bold">{intro.title}</span>
      <span className="relative mt-2 max-w-[13rem] text-[0.95rem] leading-relaxed text-white/85">{intro.text}</span>
      {intro.link && (
        <NavigationMenuLink
          href={intro.link.href}
          className="group/il relative mt-auto w-fit gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur hover:bg-white hover:text-ink focus:bg-white focus:text-ink"
        >
          {intro.link.label}
          <ArrowRight aria-hidden="true" className="size-4! transition-transform group-hover/il:translate-x-0.5" />
        </NavigationMenuLink>
      )}
    </div>
  );
}

/** Link columns, laid out as a list: at most 3 rows per column. */
function Links({ item, pathname }: { item: MegaItem; pathname: string }) {
  if (item.layout === "compact") {
    return (
      <div className="flex gap-6">
        {item.groups.map((g) => (
          <div key={g.heading} className="flex w-56 flex-col gap-1">
            {g.heading && (
              <span className="mb-1 px-2 text-[0.75rem] font-bold tracking-[0.12em] text-ink/50 uppercase">{g.heading}</span>
            )}
            <ul className="flex flex-col gap-0.5">
              {g.links.map((l) => (
                <li key={l.href}>
                  <CompactLink link={l} active={isActive(pathname, l.href)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  const links = item.groups.flatMap((g) => g.links);
  const cols = Math.ceil(links.length / 3);
  const perCol = Math.ceil(links.length / cols);
  const columns = Array.from({ length: cols }, (_, i) => links.slice(i * perCol, (i + 1) * perCol));
  return (
    <div className="flex gap-4">
      {columns.map((col, i) => (
        <ul key={i} className="flex w-80 flex-col gap-1">
          {col.map((l) => (
            <li key={l.href}>
              <RowLink link={l} active={isActive(pathname, l.href)} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function CaseStudyCard({ f }: { f: FeaturedCaseStudy }) {
  // The gradient is a background-image, so the link's hover background-color doesn't hide it.
  return (
    <NavigationMenuLink
      href={f.href}
      className="group/feat h-full w-full flex-col items-stretch gap-4 rounded-2xl bg-[linear-gradient(160deg,#fff5ec,#f2f5f8)] p-5 whitespace-normal ring-1 ring-ink/5 transition-shadow hover:shadow-lg"
    >
      <span className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-ink/5">
          <NavIcon name="case-studies" className="size-6" />
        </span>
        <span className="flex flex-col">
          <span className="text-[1.05rem] font-bold text-ink">{f.heading}</span>
          <span className="text-[0.8rem] leading-snug text-ink/65">{f.intro}</span>
        </span>
      </span>
      <span className="flex gap-4">
        <Image
          src={f.image.src}
          alt={f.image.alt}
          width={96}
          height={128}
          className="h-32 w-24 shrink-0 rounded-xl object-cover transition-transform duration-500 group-hover/feat:scale-[1.03]"
        />
        <span className="flex flex-col gap-2">
          <span className="text-[0.95rem] leading-snug font-bold text-ink">{f.title}</span>
          <span className="line-clamp-3 text-sm leading-relaxed font-medium text-ink/75">{f.quote}</span>
        </span>
      </span>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {f.cta}
        <ArrowRight aria-hidden="true" className="size-4! transition-transform group-hover/feat:translate-x-0.5" />
      </span>
    </NavigationMenuLink>
  );
}

/** Footer bar: the hero's trust points plus a sales-call link. */
function TrustBar() {
  return (
    <div className="flex items-center gap-6 border-t border-border bg-surface/70 px-6 py-3">
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {HERO.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-[0.9rem] font-medium whitespace-nowrap text-ink/85">
            <CircleCheck aria-hidden="true" className="size-4 text-teal-brand" />
            {feature}
          </li>
        ))}
      </ul>
      <NavigationMenuLink
        href={BOOK_CALL.href}
        className="group/help ml-auto shrink-0 gap-2.5 rounded-full py-1 pr-3 pl-1 text-sm font-semibold whitespace-nowrap text-ink hover:bg-white hover:text-brand focus:bg-white"
      >
        <span className="grid size-8 place-items-center rounded-full bg-brand-soft">
          <NavIcon name="book-call" className="size-4.5" />
        </span>
        <span className="font-normal text-muted-foreground">Have questions?</span>
        {BOOK_CALL.label}
        <ArrowRight aria-hidden="true" className="size-4! transition-transform group-hover/help:translate-x-0.5" />
      </NavigationMenuLink>
    </div>
  );
}

/**
 * Contained dropdown: link columns on the left, a feature card on the right, trust bar below.
 * Every panel shares one fixed width so the popup never resizes between menus; it must be
 * definite (not grown from content) because Base UI sizes the popup from the content's
 * natural width, and a growing card made that measurement balloon.
 */
function MegaPanel({ item, pathname }: { item: MegaItem; pathname: string }) {
  return (
    <div className="w-[66rem] max-w-[calc(100vw-2rem)]">
      <div className="flex items-stretch gap-6 p-5">
        <div className="min-w-0 py-1">
          <Links item={item} pathname={pathname} />
        </div>
        {/* Fills whatever width the link columns leave in the fixed-width panel. */}
        <div className="flex min-w-[19rem] flex-1">
          {item.featured ? <CaseStudyCard f={item.featured} /> : <Intro item={item} />}
        </div>
      </div>
      <TrustBar />
    </div>
  );
}

/* ───────────────────────── nav ───────────────────────── */

/**
 * Desktop navigation (≥ lg): a contained mega menu card that drops from the
 * header, centred under it and sized to its content.
 * Same items and destinations as the live WordPress menu.
 */
export function DesktopNav({
  anchor,
  onDark = false,
}: {
  anchor?: RefObject<HTMLElement | null>;
  onDark?: boolean;
}) {
  const pathname = usePathname();
  const item = onDark ? itemDark : itemLight;
  const activeBg = onDark ? activeDark : activeLight;
  return (
    <NavigationMenu
      aria-label="Main"
      className="hidden lg:flex"
      align="center"
      anchor={anchor}
      sideOffset={10}
      collisionPadding={16}
      popupClassName={cn(
        "rounded-3xl overflow-hidden",
        // Smoother open/close: drop and settle in, lift away a little faster on close.
        "data-starting-style:-translate-y-3 data-starting-style:scale-[0.96]",
        "data-ending-style:-translate-y-2 data-ending-style:scale-[0.97] data-ending-style:duration-[0.22s] data-ending-style:ease-[cubic-bezier(0.4,0,1,1)]",
        "motion-reduce:transition-none",
      )}
    >
      <NavigationMenuList className="gap-0.5">
        {MAIN_NAV.map((navItem) => {
          if (navItem.kind === "link") {
            const active = isActive(pathname, navItem.href);
            return (
              <NavigationMenuItem key={navItem.label}>
                <NavigationMenuLink
                  href={navItem.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(itemBase, item, "inline-flex items-center", active && activeBg)}
                >
                  {navItem.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }
          const active = navItem.groups.some((g) => g.links.some((l) => isActive(pathname, l.href)));
          return (
            <NavigationMenuItem key={navItem.label}>
              <NavigationMenuTrigger className={cn(itemBase, item, active && activeBg)}>
                {navItem.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <MegaPanel item={navItem} pathname={pathname} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
