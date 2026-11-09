import { BarChart3, CalendarCheck, Globe2, Headset, Mail, MapPin, MessagesSquare, Phone, Repeat, Wallet } from "lucide-react";
import type { ReactNode } from "react";

import { HeroProp, HeroStars, type HeroScene } from "@/components/inner/inner-hero";

/*
 * Floating chips around the /about-us/, /contact-us/ and /affiliates/ mascots.
 * Every chip states something the page itself says. Slots follow the InnerHero
 * pattern: top-left, mid-left, top-centre and lower-left stay clear of the mascot.
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

function Card({ children }: { children: ReactNode }) {
  return (
    <HeroProp
      lift={760}
      delay="-0.4s"
      className="bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]"
      inner="w-48 flex-col items-stretch gap-1.5 px-3 py-2.5"
    >
      {children}
    </HeroProp>
  );
}

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
      <span className="text-teal-brand">{icon}</span>
      {children}
    </span>
  );
}

/** /about-us/: the globe-holding mascot with the team's countries, rating and milestones. */
export const ABOUT_SCENE: HeroScene = {
  frame: "Kimp · Global team",
  cursor: "Remote team",
  props: (
    <>
      <IconChip icon={<Headset className="size-4" strokeWidth={2.4} />} label="24/7 Customer Support" />
      <Pills items={["Canada", "India", "Colombia", "+6"]} />
      <Stat
        value={
          <>
            4.8 <HeroStars />
          </>
        }
        label="400+ Reviews"
      />
      <Card>
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <Globe2 className="size-3.5 text-brand" /> Our Story
        </span>
        <Row icon={<CalendarCheck className="size-3" />}>2003 · Design services</Row>
        <Row icon={<CalendarCheck className="size-3" />}>2019 · Kimp launched</Row>
      </Card>
    </>
  ),
};

/** /contact-us/: the envelope-carrying mascot with the live contact details. */
export const CONTACT_SCENE: HeroScene = {
  frame: "Kimp · Contact Us",
  cursor: "Say hello",
  props: (
    <>
      <IconChip icon={<Mail className="size-4" strokeWidth={2.4} />} label="hello@kimp.io" />
      <Pills items={["Email", "Phone", "Chat Now"]} />
      <Stat value={<Phone className="size-4 text-brand" />} label="1-800-946-9778" />
      <Card>
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <MapPin className="size-3.5 text-brand" /> Address
        </span>
        <Row icon={<MapPin className="size-3" />}>7030 Woodbine Avenue</Row>
        <Row icon={<MessagesSquare className="size-3" />}>Markham, ON · Canada</Row>
      </Card>
    </>
  ),
};

/** /affiliates/: the money-sack mascot with the programme's commission, payouts and tracking. */
export const AFFILIATE_SCENE: HeroScene = {
  frame: "Kimp Affiliates · Refer and Earn",
  cursor: "Your referral",
  props: (
    <>
      <IconChip icon={<Repeat className="size-4" strokeWidth={2.4} />} label="Recurring Revenue" />
      <Pills items={["Apply", "Promote", "Earn"]} />
      <Stat value="10%" label="of each monthly fee" />
      <Card>
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <BarChart3 className="size-3.5 text-brand" /> Your dashboard
        </span>
        <Row icon={<Wallet className="size-3" />}>Automated payouts</Row>
        <Row icon={<BarChart3 className="size-3" />}>Real-Time Tracking</Row>
      </Card>
    </>
  ),
};
