import type { ReactNode } from "react";
import {
  Briefcase,
  Calculator,
  Check,
  ChevronDown,
  Clock,
  Gift,
  HeartPulse,
  House,
  Palette,
  Rocket,
  Search,
  Tag,
  TrendingUp,
} from "lucide-react";

import { HeroProp, type HeroScene } from "@/components/inner/inner-hero";

/*
 * Page-specific floating elements for InnerHero (`custom` prop). Every chip says
 * something true that the page itself says (its live copy: categories, steps,
 * perks, trial terms, case-study facts). Decorative only: spans, no headings.
 * Slots match the ones inner-hero.tsx keeps clear of the mascot.
 */

const TOP_LEFT = "top-[14%] left-[-12%] hidden sm:block";
const MID_LEFT = "top-[46%] left-[2%] lg:left-[-8%]";
const TOP_CENTRE = "top-[-2%] left-[36%]";
const LOWER_LEFT = "bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]";

function IconChip({ icon, label, at = TOP_LEFT }: { icon: ReactNode; label: string; at?: string }) {
  return (
    <HeroProp lift={680} delay="-1s" className={at}>
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

/** Low-left card: a titled checklist. */
function ListCard({ icon, title, items }: { icon: ReactNode; title: string; items: readonly string[] }) {
  return (
    <HeroProp lift={760} delay="-0.4s" className={LOWER_LEFT} inner="flex-col items-stretch gap-1 px-3 py-2.5">
      <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
        {icon} {title}
      </span>
      {items.map((s) => (
        <span key={s} className="flex min-w-40 items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold whitespace-nowrap">
          <Check className="size-3 shrink-0 text-teal-brand" strokeWidth={3} />
          {s}
        </span>
      ))}
    </HeroProp>
  );
}

/** /our-work/: the sample categories the page shows (palette mascot). */
export const OUR_WORK_SCENE: HeroScene = {
  frame: "Our client work · Samples",
  cursor: "Your brand",
  props: (
    <>
      <IconChip icon={<Palette className="size-4" strokeWidth={2.4} />} label="Graphics samples" />
      <Pills items={["Branding", "Social media", "Print"]} />
      <Stat value="Real client work" note="Samples of what we do" />
      <HeroProp lift={760} delay="-0.4s" className={LOWER_LEFT} inner="flex-col items-stretch gap-1.5 px-3 py-2.5">
        <span className="text-[0.65rem] font-bold text-ink/60">Packaging · Web &amp; app</span>
        <span className="grid w-40 grid-cols-3 gap-1">
          {["#f1731e", "#00806c", "#7c69e8", "#ffb47a", "#2fc3a5", "#1b1e23"].map((c) => (
            <span key={c} className="aspect-square rounded-md" style={{ background: c }} />
          ))}
        </span>
      </HeroProp>
    </>
  ),
};

/** /salary-cost-calculator/: the calculator's own steps and comparisons (calculator mascot). */
export const SALARY_CALCULATOR_SCENE: HeroScene = {
  frame: "Salary cost calculator",
  cursor: "Your savings",
  props: (
    <>
      <IconChip icon={<Calculator className="size-4" strokeWidth={2.4} />} label="Instant results" />
      <Pills items={["Freelance", "In-House", "KIMP"]} teal />
      <Stat value="Long-term cost" note="Based on local salary data" />
      {/* the calculator's four steps, two per row so the card stays as short as the other slots' cards */}
      <HeroProp lift={760} delay="-0.4s" className={LOWER_LEFT} inner="flex-col items-stretch gap-1 px-3 py-2.5">
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <Calculator className="size-3.5" /> 4 steps
        </span>
        <span className="grid w-60 grid-cols-2 gap-1">
          {["Select Location", "Type of Designer", "Requirements", "Cost Comparison"].map((s, k) => (
            <span key={s} className="flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-teal-brand text-[0.55rem] font-bold text-white">
                {k + 1}
              </span>
              {s}
            </span>
          ))}
        </span>
      </HeroProp>
    </>
  ),
};

/** /white-label-graphic-design/: white-label work for agencies (blank box + label mascot). */
export const WHITE_LABEL_SCENE: HeroScene = {
  frame: "White label · Agencies",
  cursor: "Your client",
  props: (
    <>
      {/* the long title line reaches the top-left slot here, so this chip sits low on the right, like /compare-service/'s */}
      <IconChip icon={<Tag className="size-4" strokeWidth={2.4} />} label="White label" at="right-[2%] bottom-[10%] hidden sm:block" />
      <Pills items={["Graphics", "Videos"]} />
      <Stat value="Unlimited brands" note="Unlimited graphic design" />
      <ListCard
        icon={<Gift className="size-3.5" />}
        title="Free 7 day trial"
        items={["Don't pay unless you subscribe", "Cancel anytime"]}
      />
    </>
  ),
};

/** /entrepreneurs/: launch or scale (light-bulb mascot). */
export const ENTREPRENEURS_SCENE: HeroScene = {
  frame: "Entrepreneurs · Launch & scale",
  cursor: "Your business",
  props: (
    <>
      <IconChip icon={<Rocket className="size-4" strokeWidth={2.4} />} label="Launch or scale" />
      <Pills items={["Graphics", "Videos"]} teal />
      <Stat value="24 Hour" note="Turnarounds for simple tasks" />
      <ListCard
        icon={<Check className="size-3.5" />}
        title="Kimp Perks"
        items={["Unlimited requests", "Unlimited revisions", "Own 100% of your designs"]}
      />
    </>
  ),
};

/** /fitness-health-brands/: get your brand in shape (dumbbell mascot). */
export const FITNESS_HEALTH_SCENE: HeroScene = {
  frame: "Fitness & Health brands",
  cursor: "Your brand",
  props: (
    <>
      <IconChip icon={<HeartPulse className="size-4" strokeWidth={2.4} />} label="Get your brand in shape" />
      <Pills items={["Fitness", "Health"]} />
      <HeroProp lift={560} delay="-3.8s" className={TOP_CENTRE} inner="gap-2 px-3 py-2">
        <Clock className="size-4 text-brand" strokeWidth={2.4} />
        <span className="flex flex-col">
          <span className="text-sm leading-none font-bold">Edits in hours</span>
          <span className="mt-1 text-[0.6rem] font-semibold text-ink/50">RZone Fitness case study</span>
        </span>
      </HeroProp>
      <ListCard
        icon={<Check className="size-3.5" />}
        title="Design requests"
        items={["Social media graphics", "Landing page designs", "Product demo videos"]}
      />
    </>
  ),
};

/** /professional-services/: real-estate brand case study, overflow work (briefcase mascot). */
export const PROFESSIONAL_SERVICES_SCENE: HeroScene = {
  frame: "Professional services",
  cursor: "Your practice",
  props: (
    <>
      <IconChip icon={<House className="size-4" strokeWidth={2.4} />} label="Real estate brands" />
      <Pills items={["Logo", "Custom illustrations"]} teal />
      <HeroProp lift={560} delay="-3.8s" className={TOP_CENTRE} inner="gap-2 px-3 py-2">
        <Briefcase className="size-4 text-brand" strokeWidth={2.4} />
        <span className="flex flex-col">
          <span className="text-sm leading-none font-bold">Overflow work</span>
          <span className="mt-1 text-[0.6rem] font-semibold text-ink/50">Taken care of</span>
        </span>
      </HeroProp>
      <ListCard
        icon={<Check className="size-3.5" />}
        title="Kimp Perks"
        items={["Fee-free collaboration", "24/7 customer support", "Own 100% of your designs"]}
      />
    </>
  ),
};

/** /case-study/: the client stories the page lists (magnifying-glass mascot). */
export const CASE_STUDY_SCENE: HeroScene = {
  frame: "Case Studies · Kimp",
  cursor: "View Case study",
  props: (
    <>
      <IconChip icon={<TrendingUp className="size-4" strokeWidth={2.4} />} label="Scale faster with Kimp" />
      <Pills items={["Businesses", "Nonprofits", "Agencies"]} teal />
      <Stat value="12" note="Client stories" />
      <ListCard
        icon={<Search className="size-3 text-brand" strokeWidth={2.6} />}
        title="CASE STUDIES"
        items={["Nomos", "Igloo", "Smile Fred", "RZone Fitness"]}
      />
    </>
  ),
};

/** /faq/: search and categories (question-mark mascot). */
export const FAQ_SCENE: HeroScene = {
  frame: "FAQ · Answers",
  cursor: "Your question",
  props: (
    <>
      <HeroProp lift={680} delay="-1s" className={TOP_LEFT} inner="gap-2 px-3 py-2">
        <Search className="size-4 text-brand" strokeWidth={2.4} />
        <span className="text-xs font-semibold text-ink/50">Enter keywords to search</span>
      </HeroProp>
      <Pills items={["Free trial", "Billing", "KIMP360"]} teal />
      <Stat value="Q&A" note="Browse by category" />
      <HeroProp lift={760} delay="-0.4s" className={LOWER_LEFT} inner="flex-col items-stretch gap-1 px-3 py-2.5">
        <span className="text-[0.65rem] font-bold text-ink/60">CATEGORIES</span>
        {["Free trial & billing", "Graphics & video", "IP & confidentiality"].map((s, k) => (
          <span
            key={s}
            className="flex w-44 items-center justify-between rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold"
          >
            {s}
            <ChevronDown className={`size-3 text-ink/50 ${k === 0 ? "rotate-180" : ""}`} />
          </span>
        ))}
      </HeroProp>
    </>
  ),
};
