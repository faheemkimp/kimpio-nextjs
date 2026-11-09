import {
  Check,
  Download,
  FileText,
  Images,
  LayoutGrid,
  ListChecks,
  Palette,
  Search,
  Sprout,
} from "lucide-react";
import type { ReactNode } from "react";

import { HeroProp, type HeroScene } from "@/components/inner/inner-hero";

/*
 * Floating hero elements for /yspace/, /canva-designers/, /design-categories/
 * and /brand-assets/ (InnerHero `custom`). Every chip repeats something the page
 * itself says; decorative spans only (no headings, no third-party logos).
 * Slots match the ones inner-hero.tsx keeps clear of the mascot.
 */

const TOP_LEFT = "top-[14%] left-[-12%] hidden sm:block";
const MID_LEFT = "top-[46%] left-[2%] lg:left-[-8%]";
const TOP_CENTRE = "top-[-2%] left-[36%]";
const LOWER_LEFT = "bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]";

function IconChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <HeroProp lift={680} delay="-1s" className={TOP_LEFT}>
      <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">{icon}</span>
      <span className="text-xs font-bold">{label}</span>
    </HeroProp>
  );
}

function Pills({ items, teal = false }: { items: readonly string[]; teal?: boolean }) {
  return (
    <HeroProp lift={860} delay="-2.6s" className={MID_LEFT} inner="gap-1 px-2">
      {items.map((s, k) => (
        <span
          key={s}
          className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${k === 0 ? (teal ? "bg-teal-brand text-white" : "bg-brand text-white") : "bg-surface text-ink/60"}`}
        >
          {s}
        </span>
      ))}
    </HeroProp>
  );
}

function Stat({ value, note }: { value: string; note: string }) {
  return (
    <HeroProp lift={560} delay="-3.8s" className={TOP_CENTRE} inner="flex-col items-start gap-0 px-3.5 py-2.5">
      <span className="text-xl leading-none font-bold">{value}</span>
      <span className="mt-1 text-[0.65rem] font-semibold text-ink/50">{note}</span>
    </HeroProp>
  );
}

function ListCard({ icon, title, items }: { icon: ReactNode; title: string; items: readonly string[] }) {
  return (
    <HeroProp lift={760} delay="-0.4s" className={LOWER_LEFT} inner="flex-col items-stretch gap-1 px-3 py-2.5">
      <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
        {icon} {title}
      </span>
      {items.map((s) => (
        <span key={s} className="flex w-44 items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
          <Check className="size-3 shrink-0 text-teal-brand" strokeWidth={3} />
          {s}
        </span>
      ))}
    </HeroProp>
  );
}

/** /yspace/: the Innovation York offer, its promises and the three "How It Works" steps. */
export const YSPACE_SCENE: HeroScene = {
  frame: "YSpace · Innovation York",
  cursor: "Entrepreneur",
  props: (
    <>
      <IconChip icon={<Sprout className="size-4" strokeWidth={2.4} />} label="Scale faster" />
      <Pills items={["Unlimited", "No contracts", "Flat fee"]} teal />
      <Stat value="One flat fee" note="No hidden costs" />
      <ListCard
        icon={<ListChecks className="size-3.5" />}
        title="How it works"
        items={["Submit design requests", "Give feedback", "Approve and download"]}
      />
    </>
  ),
};

/** /canva-designers/: the two Canva plans, turnaround and what the subscription includes. */
export const CANVA_SCENE: HeroScene = {
  frame: "Custom designs · Canva",
  cursor: "Your team",
  props: (
    <>
      <IconChip icon={<Palette className="size-4" strokeWidth={2.4} />} label="Expert design team" />
      <Pills items={["Graphics", "Video", "Templates"]} />
      <Stat value="24 hr" note="Average graphics turnaround" />
      <ListCard
        icon={<Images className="size-3.5" />}
        title="Every subscription"
        items={["Editable Canva links", "Unlimited revisions", "Dedicated project manager"]}
      />
    </>
  ),
};

/** /design-categories/: the A to Z catalogue and its search box. */
export const CATEGORIES_SCENE: HeroScene = {
  frame: "Design categories · A–Z",
  cursor: "Your brief",
  props: (
    <>
      <IconChip icon={<Search className="size-4" strokeWidth={2.4} />} label="What do you need designed?" />
      <Pills items={["Graphics", "Videos"]} teal />
      <Stat value="A – Z" note="Graphics and video categories" />
      <ListCard icon={<LayoutGrid className="size-3.5" />} title="On the list" items={["Logos", "Pitch decks", "Logo Animations"]} />
    </>
  ),
};

/** /brand-assets/: the press kit (logo files, screenshots, boilerplate, video ads, media kit). */
export const BRAND_ASSETS_SCENE: HeroScene = {
  frame: "Press kit · Kimp",
  cursor: "Press",
  props: (
    <>
      <IconChip icon={<Download className="size-4" strokeWidth={2.4} />} label="Logo files" />
      <Pills items={["Green", "White", "Black"]} teal />
      <Stat value="Media Kit" note="Why brands love Kimp" />
      <ListCard
        icon={<FileText className="size-3.5" />}
        title="Writing about Kimp?"
        items={["Our logo", "Product screenshots", "Boilerplate"]}
      />
    </>
  ),
};
