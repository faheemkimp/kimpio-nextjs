import { Bot, CalendarDays, Check, Cookie, Landmark, Lock, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { HeroProp, type HeroScene } from "@/components/inner/inner-hero";
import type { LegalSlug } from "@/content/legal";

/*
 * Floating elements for the legal heroes (InnerHero `custom`). Every chip says
 * something the document itself says (its sections, terms, dates, figures).
 * Decorative only: spans, no headings. Same four slots as the other inner pages.
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

function Pills({ items }: { items: readonly string[] }) {
  return (
    <HeroProp lift={860} delay="-2.6s" className={MID_LEFT} inner="gap-1 px-2">
      {items.map((s, k) => (
        <span
          key={s}
          className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${k === 0 ? "bg-teal-brand text-white" : "bg-surface text-ink/60"}`}
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

export const LEGAL_SCENES: Record<LegalSlug, HeroScene> = {
  /* shield + padlock mascot */
  "privacy-policy": {
    frame: "Privacy Policy · kimp.io",
    cursor: "Your data",
    props: (
      <>
        <IconChip icon={<Lock className="size-4" strokeWidth={2.4} />} label="Encrypted in transit & at rest" />
        <Pills items={["Device Information", "Order Information"]} />
        <Stat value="10 business days" note="To delete data on a verified request" />
        <ListCard
          icon={<ShieldCheck className="size-3.5" />}
          title="Opt out any time"
          items={["Google Analytics opt-out", "Facebook ad settings", "DAA opt-out portal"]}
        />
      </>
    ),
  },
  /* scroll-with-seal mascot */
  "terms-of-services": {
    frame: "Terms Of Service · KIMP",
    cursor: "You",
    props: (
      <>
        <IconChip icon={<Landmark className="size-4" strokeWidth={2.4} />} label="Laws of Ontario, Canada" />
        <Pills items={["Free trial", "Refunds", "Enterprise"]} />
        <Stat value="Pro-rated" note="Refund requests, before next billing date" />
        <ListCard
          icon={<Check className="size-3.5" />}
          title="Sections include"
          items={["Online service terms", "Portfolio license", "Data retention & removal"]}
        />
      </>
    ),
  },
  /* cookie mascot */
  "cookie-policy-eu": {
    frame: "Cookie Policy (EU)",
    cursor: "Your consent",
    props: (
      <>
        <IconChip icon={<CalendarDays className="size-4" strokeWidth={2.4} />} label="Last updated August 29, 2025" />
        <Pills items={["Functional", "Statistics", "Marketing"]} />
        <Stat value="EEA & Switzerland" note="Who this policy applies to" />
        <ListCard
          icon={<Cookie className="size-3.5" />}
          title="Your rights"
          items={["Right of access", "Right to rectification", "Right to object"]}
        />
      </>
    ),
  },
  /* robot-head mascot */
  "llm-information-guidance": {
    frame: "LLM Information & Guidance",
    cursor: "AI assistant",
    props: (
      <>
        <IconChip icon={<Bot className="size-4" strokeWidth={2.4} />} label="Last updated October 11, 2025" />
        <Pills items={["Graphics", "Video", "Graphics + Video", "Enterprise"]} />
        <Stat value="5,000+ businesses" note="Across more than 60 countries" />
        <ListCard
          icon={<Check className="size-3.5" />}
          title="Five-step loop"
          items={["Submit request", "Produce first delivery", "Approve & Complete"]}
        />
      </>
    ),
  },
};
