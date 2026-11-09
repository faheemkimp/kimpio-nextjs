"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { AB_COUNTRIES, countryImage } from "@/content/about-us";
import { cn } from "@/lib/utils";

/**
 * Live desktop country slider: one illustrated banner per country, the copy on
 * its right half. Every panel (and its <h3>) is in the server HTML; only the
 * selected one is shown. Desktop only, like live (the phone slider is separate).
 */
export function CountryShowcase() {
  const items = AB_COUNTRIES.items;
  const [active, setActive] = useState(0);
  const go = (d: number) => setActive((i) => (i + d + items.length) % items.length);

  return (
    <div className="hidden lg:block">
      <div role="tablist" aria-label={AB_COUNTRIES.label} className="flex flex-wrap items-center justify-center gap-2">
        {items.map((c, i) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            id={`country-tab-${c.key}`}
            aria-selected={i === active}
            aria-controls={`country-panel-${c.key}`}
            data-click-sound=""
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors",
              i === active ? "bg-ink text-white ring-ink" : "bg-white text-ink/70 ring-border hover:text-ink hover:ring-ink/30",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-[#0b5a4c] shadow-[0_40px_80px_-50px_rgb(2_31_28/0.8)]">
        {items.map((c, i) => {
          const img = countryImage(c.key);
          return (
            <div
              key={c.key}
              role="tabpanel"
              id={`country-panel-${c.key}`}
              aria-labelledby={`country-tab-${c.key}`}
              hidden={i !== active}
              className="ab-country relative aspect-[3840/1100] w-full"
            >
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                sizes="(min-width: 1400px) 1300px, 92vw"
                className="absolute inset-0 size-full object-cover object-left"
              />
              <div className="relative ml-auto flex h-full w-1/2 flex-col justify-center pr-12 pl-4 xl:pr-16">
                <h3 className="text-4xl font-bold text-white xl:text-5xl">{c.name}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">{c.body}</p>
              </div>
            </div>
          );
        })}
        <div className="absolute right-6 bottom-6 flex gap-2">
          {[
            { d: -1, label: "Previous country", Icon: ArrowLeft },
            { d: 1, label: "Next country", Icon: ArrowRight },
          ].map(({ d, label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              data-click-sound=""
              onClick={() => go(d)}
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20"
            >
              <Icon className="size-5" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Live phone slider (its own copy and spellings): a swipeable row of cards. Hidden on desktop, like live. */
export function CountryCards() {
  return (
    <ul
      aria-label={AB_COUNTRIES.label}
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:hidden"
    >
      {AB_COUNTRIES.items.map((c) => {
        const img = countryImage(c.key, true);
        return (
          <li key={c.key} className="w-[82%] shrink-0 snap-center overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-border sm:w-[58%]">
            <Image src={img.src} alt="" width={img.width} height={img.height} sizes="(min-width: 640px) 58vw, 82vw" className="aspect-[674/344] w-full object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-ink">{c.mobileName}</h3>
              <p className="mt-3 leading-relaxed text-ink/65">{c.mobileBody ?? c.body}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
