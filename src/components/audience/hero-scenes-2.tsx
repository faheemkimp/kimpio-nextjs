import type { ReactNode } from "react";
import { Building2, Check, Clock, Megaphone, Receipt, Rocket, Store, Users } from "lucide-react";

import { HeroProp, type HeroScene } from "@/components/inner/inner-hero";

/*
 * InnerHero `custom` scenes for /small-business/, /startups/, /marketing/ and
 * /enterprise-clients/. Every chip repeats something the page itself says (its
 * live perks, features and plan details). Decorative spans only, no headings.
 * Slots are the four inner-hero.tsx keeps clear of the mascot.
 */

const MID_LEFT = "top-[46%] left-[2%] lg:left-[-8%]";
const TOP_CENTRE = "top-[-2%] left-[36%]";
const LOWER_LEFT = "bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]";
/* By the mascot's boots (as /compare-service/ does): these heroes' long titles reach into the top-left slot. */
const LOWER_RIGHT = "right-[2%] bottom-[10%] hidden sm:block";

function IconChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <HeroProp lift={680} delay="-1s" className={LOWER_RIGHT}>
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

function Stat({ icon, value, note }: { icon: ReactNode; value: string; note: string }) {
  return (
    <HeroProp lift={560} delay="-3.8s" className={TOP_CENTRE} inner="gap-2 px-3 py-2">
      <span className="text-brand">{icon}</span>
      <span className="flex flex-col">
        <span className="text-sm leading-none font-bold">{value}</span>
        <span className="mt-1 text-[0.6rem] font-semibold text-ink/50">{note}</span>
      </span>
    </HeroProp>
  );
}

function ListCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <HeroProp lift={760} delay="-0.4s" className={LOWER_LEFT} inner="flex-col items-stretch gap-1 px-3 py-2.5">
      <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
        <Check className="size-3.5" /> {title}
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

/** /small-business/: storefront mascot; perks and the three design kinds from the page. */
export const SMALL_BUSINESS_SCENE: HeroScene = {
  frame: "Small Business · Design team",
  cursor: "Your business",
  props: (
    <>
      <IconChip icon={<Store className="size-4" strokeWidth={2.4} />} label="Skip The Interviews" />
      <Pills items={["Print", "Digital", "Illustrations"]} teal />
      <Stat icon={<Receipt className="size-4" strokeWidth={2.4} />} value="Flat Monthly Fee" note="No hourly billing" />
      <ListCard title="Your Dedicated Design Team" items={["Unlimited requests", "Multiple projects", "Streamlined communications"]} />
    </>
  ),
};

/** /startups/: rocket mascot; build, launch and scale, plus the remote-team features. */
export const STARTUPS_SCENE: HeroScene = {
  frame: "Startups · Build, launch, scale",
  cursor: "Your startup",
  props: (
    <>
      <IconChip icon={<Rocket className="size-4" strokeWidth={2.4} />} label="Launch and scale" />
      <Pills items={["Build", "Launch", "Scale"]} />
      <Stat icon={<Clock className="size-4" strokeWidth={2.4} />} value="2-3 designs" note="Per business day, on average" />
      <ListCard title="Your Remote Design Solution" items={["Unlimited requests", "Multiple brands", "Collaborate with your team"]} />
    </>
  ),
};

/** /marketing/: megaphone mascot; campaign stages and scalable output from the page. */
export const MARKETING_SCENE: HeroScene = {
  frame: "Marketing Teams · Campaigns",
  cursor: "Your campaign",
  props: (
    <>
      <IconChip icon={<Megaphone className="size-4" strokeWidth={2.4} />} label="Get Scalable Design" />
      <Pills items={["Awareness", "Engagement", "Conversion"]} teal />
      <Stat icon={<Users className="size-4" strokeWidth={2.4} />} value="Team Collaboration" note="At no extra cost" />
      <ListCard title="One-Stop-Design-Shop" items={["Unlimited requests", "As many brands as you’d like", "Streamlined communications"]} />
    </>
  ),
};

/** /enterprise-clients/: skyscraper mascot; client count and plan details from the page. */
export const ENTERPRISE_SCENE: HeroScene = {
  frame: "Enterprise · Design at scale",
  cursor: "Your team",
  props: (
    <>
      <IconChip icon={<Building2 className="size-4" strokeWidth={2.4} />} label="500+ Enterprise clients" />
      <Pills items={["Graphics", "Videos", "Dev"]} teal />
      <Stat icon={<Clock className="size-4" strokeWidth={2.4} />} value="12–24 hrs" note="Priority delivery" />
      <ListCard title="Every Enterprise plan" items={["Dedicated Creative Director", "AI-Savvy Designers", "API + Zapier Access"]} />
    </>
  ),
};
