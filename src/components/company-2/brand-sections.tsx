import { Download, FileText } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { BA_DESCRIBE, BA_LOGOS, BA_SCREENSHOT, BA_VIDEOS } from "@/content/brand-assets";
import { cn } from "@/lib/utils";

import { AdVideos } from "./ad-videos";

/*
 * /brand-assets/ sections, in the live order with the live heading levels
 * (see src/content/brand-assets.ts). Download links point at the live files.
 */

const br = (ls: readonly string[]) =>
  ls.map((l, i) => (
    <span key={l}>
      {i > 0 && <br className="hidden sm:block" />}
      {i > 0 && " "}
      {l}
    </span>
  ));

/** Live "kimpbrand-section": the three logo versions, each with its download link. */
export function BrandLogos() {
  const l = BA_LOGOS;
  return (
    <section aria-labelledby="ba-logos-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="ba-logos-title" eyebrow={l.eyebrow} title={l.title} intro={br(l.introLines)} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:grid-cols-3 lg:gap-5">
          {l.items.map((it) => {
            const dark = it.tone === "dark";
            return (
              <li key={it.name} className="flex flex-col rounded-[1.75rem] bg-white p-2 ring-1 ring-border">
                <div className={cn("grid h-48 place-items-center rounded-[1.35rem]", dark ? "bg-teal-brand" : "bg-[linear-gradient(160deg,#fff6ee,#f2f5f8_60%)]")}>
                  <Image src={it.preview} alt="" width={138} height={57} className="h-14 w-auto" />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-4">
                  <span className="font-bold text-ink">{it.name}</span>
                  <a
                    href={it.href}
                    data-click-sound=""
                    aria-label={`${l.download} the ${it.name.toLowerCase()} Kimp logo`}
                    className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white shadow-[0_3px_0_#050607] transition hover:-translate-y-0.5"
                  >
                    <Download aria-hidden="true" className="size-4" />
                    {l.download}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Live "brand-360screenshort-section": the KIMP360 product screenshot in a browser frame. */
export function BrandScreenshot() {
  const s = BA_SCREENSHOT;
  return (
    <section aria-labelledby="ba-shot-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="container-page">
        <SectionHeading id="ba-shot-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} align="center" twoTone={false} />
        <figure data-fx="reveal" className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-[0_50px_90px_-50px_rgb(27_30_35/0.55)] ring-1 ring-border">
          <div aria-hidden="true" className="flex gap-1.5 px-3 py-2.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <Image src={s.image.src} alt="" width={s.image.width} height={s.image.height} sizes="(min-width: 1280px) 72rem, 94vw" className="w-full rounded-[1.25rem]" />
        </figure>
      </div>
    </section>
  );
}

/** Live "Describing Kimp": <h2>, the boilerplate and short description (<h4> each), beside the laptop artwork. */
export function BrandDescribe() {
  const d = BA_DESCRIBE;
  return (
    <section aria-labelledby="ba-describe-title" className="py-24 sm:py-32">
      <div className="container-page">
        <div className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] p-8 ring-1 ring-brand/15 sm:p-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeading id="ba-describe-title" eyebrow={d.eyebrow} title={d.title} align="left" twoTone={false} />
            <div className="mt-8 space-y-4">
              {d.blocks.map((b) => (
                <div key={b.title} className="rounded-[1.4rem] bg-white/80 p-6 ring-1 ring-white">
                  <h4 className="flex items-center gap-2 text-lg font-bold text-ink">
                    <FileText aria-hidden="true" className="size-5 text-brand" />
                    {b.title}
                  </h4>
                  <p className="mt-3 leading-relaxed text-ink/70">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="mx-auto w-full max-w-xs lg:max-w-sm">
            <Image src={d.image.src} alt="" width={d.image.width} height={d.image.height} sizes="(min-width: 1024px) 24rem, 80vw" className="w-full drop-shadow-[0_30px_30px_rgb(0_0_0/0.18)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "kimpvedioadd-section": the creative video ads. */
export function BrandVideos() {
  const v = BA_VIDEOS;
  return (
    <section aria-labelledby="ba-videos-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="ba-videos-title" eyebrow={v.eyebrow} title={v.title} intro={v.intro} twoTone={false} />
        <AdVideos items={v.items} more={v.more} play={v.play} />
      </div>
    </section>
  );
}
