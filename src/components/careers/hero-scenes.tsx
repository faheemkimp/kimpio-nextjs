import { Briefcase, Captions, Check, ClipboardList, Film, Palette, PenLine, PenTool, Users, Wallet } from "lucide-react";
import type { ReactNode } from "react";

import { HeroProp, HeroStars, type HeroScene } from "@/components/inner/inner-hero";
import type { CareerRole } from "@/content/careers-roles";

/*
 * Floating chips around the careers mascots. Every chip states something the
 * live page itself says (team size, clients, perks, the role's tools, tasks and
 * deliverables). Slots follow the InnerHero pattern: top-left, mid-left,
 * top-centre and lower-left stay clear of the mascot.
 */

function IconChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <HeroProp lift={680} delay="-1s" className="top-[14%] left-[-12%] hidden sm:block">
      <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">{icon}</span>
      <span className="text-xs font-bold">{label}</span>
    </HeroProp>
  );
}

function Pills({ items }: { items: readonly string[] }) {
  return (
    <HeroProp lift={860} delay="-2.6s" className="top-[46%] left-[2%] lg:left-[-8%]" inner="gap-1 px-2">
      {items.map((p, k) => (
        <span
          key={p}
          className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${k === 0 ? "bg-teal-brand text-white" : "bg-surface text-ink/60"}`}
        >
          {p}
        </span>
      ))}
    </HeroProp>
  );
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <HeroProp lift={560} delay="-3.8s" className="top-[-2%] left-[36%]" inner="flex-col items-start gap-0 px-3.5 py-2.5">
      <span className="flex items-center gap-2 text-xl leading-none font-bold">{value}</span>
      <span className="mt-1 text-[0.65rem] font-semibold text-ink/50">{label}</span>
    </HeroProp>
  );
}

function Checklist({ icon, title, items }: { icon: ReactNode; title: string; items: readonly string[] }) {
  return (
    <HeroProp
      lift={760}
      delay="-0.4s"
      className="bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]"
      inner="flex-col items-stretch gap-1 px-3 py-2.5"
    >
      <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
        {icon} {title}
      </span>
      {items.map((t) => (
        <span key={t} className="flex w-44 items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
          <Check className="size-3 shrink-0 text-teal-brand" strokeWidth={3} />
          {t}
        </span>
      ))}
    </HeroProp>
  );
}

const ico = "size-4";
const small = "size-3.5";

/** /careers/: team size, clients and perks from the live page. */
export const CAREERS_SCENE: HeroScene = {
  frame: "Careers · Kimp Team",
  cursor: "You?",
  props: (
    <>
      <IconChip icon={<Users className={ico} strokeWidth={2.4} />} label="250+ Team Members" />
      <Pills items={["Designers", "Illustrators", "Writers"]} />
      <Stat value="2200+" label="Clients" />
      <Checklist
        icon={<Wallet className={small} />}
        title="Job perks"
        items={["Competitive Pay", "Local Work Schedule", "Annual Performance Bonus"]}
      />
    </>
  ),
};

/** One scene per role, built from that role's own responsibilities, requirements and project list. */
export const ROLE_SCENES: Record<CareerRole["slug"], HeroScene> = {
  "graphic-designer": {
    frame: "Graphic Designer",
    cursor: "Your PM",
    props: (
      <>
        <IconChip icon={<Palette className={ico} strokeWidth={2.4} />} label="Print & digital creatives" />
        <Pills items={["Photoshop", "InDesign", "Adobe CC"]} />
        <Stat value="Biweekly" label="Consistent pay schedule" />
        <Checklist
          icon={<ClipboardList className={small} />}
          title="Design requests"
          items={["Display ads", "T-shirt graphics", "Event flyers"]}
        />
      </>
    ),
  },
  "project-manager": {
    frame: "Project Manager",
    cursor: "Client",
    props: (
      <>
        <IconChip icon={<Briefcase className={ico} strokeWidth={2.4} />} label="Main point of contact" />
        <Pills items={["Brief", "Design", "Review"]} />
        <Stat value={<HeroStars />} label="Service that warrants 4-5 stars" />
        <Checklist
          icon={<ClipboardList className={small} />}
          title="Your clients"
          items={["Condense client briefs", "Keep tasks on time", "Retain clients 3+ months"]}
        />
      </>
    ),
  },
  "content-writer": {
    frame: "Content Writer",
    cursor: "Your team",
    props: (
      <>
        <IconChip icon={<PenLine className={ico} strokeWidth={2.4} />} label="Blog posts & guides" />
        <Pills items={["Blogs", "Ebooks", "Ad copy"]} />
        <Stat value="Consistent tone" label="Clear marketing copy" />
        <Checklist
          icon={<ClipboardList className={small} />}
          title="Content plan"
          items={["Research topics", "Fill content gaps", "Email campaigns"]}
        />
      </>
    ),
  },
  "motion-graphics-artist": {
    frame: "Motion Graphics",
    cursor: "Your PM",
    props: (
      <>
        <IconChip icon={<Film className={ico} strokeWidth={2.4} />} label="Animated Logos/Openers" />
        <Pills items={["After Effects", "Premiere Pro", "C4D"]} />
        <Stat value={<Captions className="size-5 text-brand" />} label="Add SRT Captions" />
        <Checklist
          icon={<Film className={small} />}
          title="Video requests"
          items={["Social Media Video Ads", "Cinemagraphs", "Event Promo/Recap"]}
        />
      </>
    ),
  },
  illustrator: {
    frame: "Illustrator",
    cursor: "Your PM",
    props: (
      <>
        <IconChip icon={<PenTool className={ico} strokeWidth={2.4} />} label="Custom illustrations" />
        <Pills items={["Illustrator", "Photoshop"]} />
        <Stat value="Print + digital" label="Wide range of applications" />
        <Checklist
          icon={<ClipboardList className={small} />}
          title="Illustration requests"
          items={["T-shirt graphics", "Stickers", "Original infographics"]}
        />
      </>
    ),
  },
};
