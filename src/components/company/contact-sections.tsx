import { Mail, MapPin, Phone } from "lucide-react";

import { CT_DETAILS } from "@/content/contact-us";

import { ChatButton } from "./chat-button";

/** Live "contactpage-section": contact and address cards, Chat Now, and the Google Maps embed. */
export function ContactDetails() {
  const d = CT_DETAILS;
  const row =
    "group flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 font-semibold text-ink ring-1 ring-border transition-colors hover:bg-brand-soft hover:ring-brand/30";
  const icon = "grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand ring-1 ring-border";
  return (
    <section aria-label={d.contactTitle} className="container-page py-24 sm:py-32">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-6">
        <div data-fx="stagger" className="flex flex-col gap-5">
          <div className="rounded-[1.6rem] bg-white p-7 ring-1 ring-border">
            <h3 className="text-2xl font-bold text-ink">{d.contactTitle}</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={d.email.href} className={row}>
                  <span className={icon}>
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  {d.email.label}
                </a>
              </li>
              <li>
                <a href={d.phone.href} className={row}>
                  <span className={icon}>
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  {d.phone.label}
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-[1.6rem] bg-ink p-7 text-white">
            <h3 className="text-2xl font-bold">{d.addressTitle}</h3>
            <p className="mt-5 flex items-start gap-3 leading-relaxed text-white/75">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand ring-1 ring-white/15">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span>
                {d.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </div>
          <div>
            <ChatButton label={d.chat} fallback={d.email.href} />
          </div>
        </div>

        <div data-fx="reveal" className="relative min-h-[22rem] overflow-hidden rounded-[1.6rem] bg-surface ring-1 ring-border lg:min-h-0">
          <iframe
            src={d.map.src}
            title={d.map.title}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
