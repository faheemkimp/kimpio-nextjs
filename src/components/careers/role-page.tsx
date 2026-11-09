import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ClipboardList, Gift, Info, Laptop, MapPin, Sparkles, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { TagManager } from "@/components/analytics/tag-manager";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { Eyebrow } from "@/components/home/sections/section-heading";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CtaLink } from "@/components/ui/cta-button";
import { CAREER_ROLES, ROLE_SUBTITLE, type CareerRole } from "@/content/careers-roles";
import { getPageSeo } from "@/lib/seo/page-seo";
import { cn } from "@/lib/utils";

import { ROLE_SCENES } from "./hero-scenes";

/*
 * One component for the five live role pages (/careers/graphic-designer/ etc.).
 * Each page keeps its own URL, Yoast SEO and live copy (src/content/careers-roles.ts);
 * headings mirror live: <h1> role title, every block title an <h4>.
 */

/** Countries named in each page's "What makes working at Kimp unique?" copy. */
const COUNTRIES = ["Thailand", "Malaysia", "India", "Indonesia", "Sri Lanka"] as const;

/** Title, description, robots, canonical, OG and schema come from Yoast for the role's exact URL. */
export async function roleMetadata(slug: CareerRole["slug"]): Promise<Metadata> {
  return (await getPageSeo(CAREER_ROLES[slug].path)).metadata;
}

export async function RolePage({ slug }: { slug: CareerRole["slug"] }) {
  const role: CareerRole = CAREER_ROLES[slug];
  const { schema, yoast } = await getPageSeo(role.path);
  const [responsibilities, professional, equipment, benefits] = role.details;
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live <h1> is the role title; the "Remote Work - Full-Time Roles" subtitle is not a heading. */}
        <InnerHero
          id="role-hero-title"
          titleAs="h1"
          eyebrow={`${ROLE_SUBTITLE[0]} - ${ROLE_SUBTITLE[1]}`}
          title={{ lead: "", highlight: role.title }}
          intro={role.intro}
          primaryCta={role.apply}
          marquee={role.marquee}
          strip={role.strip}
          mascot={role.mascot}
          custom={ROLE_SCENES[slug]}
          tall
        />

        {/* ---------- intro + "What makes working at Kimp unique?" ---------- */}
        <section aria-labelledby="role-unique-title" className="py-24 sm:py-32">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <p data-fx="reveal" className="text-2xl leading-snug font-semibold tracking-[-0.01em] text-ink sm:text-[1.9rem]">
                {role.lead}
              </p>
              <div data-fx="reveal" className="mt-10 border-l-4 border-brand pl-6">
                <h4 id="role-unique-title" className="text-xl font-bold text-ink sm:text-2xl">
                  {role.unique.title}
                </h4>
                {role.unique.body.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-ink/65 sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div data-fx="reveal" className="hero-frame relative isolate overflow-hidden rounded-[2rem] px-6 pt-8 pb-6 sm:px-8">
              <Image
                src="/images/careers/experienced-designer-ch.webp"
                alt=""
                width={1887}
                height={896}
                sizes="(min-width: 1024px) 34rem, 92vw"
                className="h-auto w-full"
              />
              <ul aria-hidden="true" className="mt-6 flex flex-wrap justify-center gap-2">
                {COUNTRIES.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white/85 ring-1 ring-white/12"
                  >
                    <MapPin className="size-3.5 text-brand" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- responsibilities, requirements, benefits ---------- */}
        <section aria-label={`${role.title} role details`} className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
          <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
          <div className="container-page grid gap-4 lg:grid-cols-2 lg:gap-5">
            {/* Responsibilities: the lead card, numbered */}
            <div data-fx="reveal" className="rounded-[1.6rem] bg-ink p-7 text-white sm:p-10 lg:row-span-2">
              <BlockTitle icon={ClipboardList} dark>
                {responsibilities.title}
              </BlockTitle>
              <ol className="mt-8 space-y-5">
                {responsibilities.items.map((item, i) => (
                  <li key={item} className="flex gap-4">
                    <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed text-white/80">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <DetailCard icon={BadgeCheck} block={professional} />
            <DetailCard icon={Laptop} block={equipment} />
            {/* Benefits: full width, one tile per perk */}
            <div data-fx="reveal" className="rounded-[1.6rem] bg-white p-7 ring-1 ring-border sm:p-10 lg:col-span-2">
              <BlockTitle icon={Gift}>{benefits.title}</BlockTitle>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.items.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl bg-brand-soft p-5 leading-relaxed font-medium text-ink/80">
                    <Sparkles aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- what the role works on ---------- */}
        <section aria-labelledby="role-kinds-title" className="py-24 sm:py-32">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>{role.title}</Eyebrow>
              <h4 id="role-kinds-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-5xl">
                {role.kinds.title}
              </h4>
            </div>
            <ul data-fx="stagger" className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-2.5 sm:gap-3">
              {role.kinds.items.map((item, i) => {
                const last = i === role.kinds.items.length - 1;
                return (
                  <li
                    key={item}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold sm:text-base",
                      last ? "bg-ink text-white" : "bg-white text-ink/80 ring-1 ring-border",
                    )}
                  >
                    <Check aria-hidden="true" className={cn("size-4", last ? "text-brand" : "text-teal-brand")} strokeWidth={3} />
                    {item}
                  </li>
                );
              })}
            </ul>

            {/* Live green bar: the link sits inside the <h4>. */}
            <div data-fx="reveal" className="mx-auto mt-14 max-w-5xl rounded-[1.6rem] bg-teal-brand px-6 py-6 text-white sm:px-10 sm:py-8">
              <h4 className="flex flex-col gap-3 text-lg font-bold sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:text-xl">
                {role.samples.title}{" "}
                <a
                  href={role.samples.href}
                  data-click-sound=""
                  className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-bold break-all text-teal-brand transition-transform hover:-translate-y-0.5 sm:self-auto sm:text-base"
                >
                  {role.samples.url}
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </a>
              </h4>
            </div>
          </div>
        </section>

        {/* ---------- housekeeping + apply ---------- */}
        <section aria-labelledby="role-house-title" className="pb-24 sm:pb-32">
          <div className="container-page">
            <div data-fx="reveal" className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] bg-white p-7 ring-1 ring-border shadow-[0_40px_80px_-60px_rgb(27_30_35/0.45)] sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
              <div>
                <BlockTitle icon={Info} id="role-house-title">
                  {role.housekeeping.title}
                </BlockTitle>
                <ul className="mt-6 space-y-3">
                  {role.housekeeping.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink/70">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <CtaLink href={role.apply.href} size="lg" className="self-start lg:self-end">
                {role.apply.label}
                <ArrowRight aria-hidden="true" />
              </CtaLink>
            </div>
          </div>
        </section>
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" collab />
      <ScrollFx />
    </>
  );
}

function BlockTitle({ icon: Icon, dark = false, id, children }: { icon: LucideIcon; dark?: boolean; id?: string; children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", dark ? "bg-white/10 text-brand" : "bg-brand-soft text-brand")}
      >
        <Icon className="size-5" strokeWidth={2.2} />
      </span>
      <h4 id={id} className={cn("text-xl font-bold sm:text-2xl", dark ? "text-white" : "text-ink")}>
        {children}
      </h4>
    </div>
  );
}

function DetailCard({ icon, block }: { icon: LucideIcon; block: CareerRole["kinds"] }) {
  return (
    <div data-fx="reveal" className="rounded-[1.6rem] bg-white p-7 ring-1 ring-border sm:p-10">
      <BlockTitle icon={icon}>{block.title}</BlockTitle>
      <ul className="mt-6 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-ink/70">
            <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal-brand">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
