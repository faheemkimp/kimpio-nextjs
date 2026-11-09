"use client";

import { useEffect, useState } from "react";

import type { PlanId, PriceBox } from "@/content/pricing";

/**
 * Live plan prices, exactly as the WordPress theme loads them on /pricing/:
 *
 * 1. Currency: the `user-location-currency` cookie (shared with every WordPress
 *    page on the domain); on a first visit, the visitor's country from ipapi.co
 *    with the theme's own key, mapped to the 7 billing currencies, then saved
 *    in the cookie for 365 days.
 * 2. Boxes: POST /wp-admin/admin-ajax.php `action=offerSaleNew` (or
 *    `offerSaleNewVisa` with the `kimp-visa-coupon` cookie), `pricepage=1`.
 *    It returns [offer line, Graphics box, Video box, Graphics+Video box, currency].
 *
 * Until (or unless) that answers, the server-rendered USD figures stay on screen.
 */

export type LivePricing = {
  offer?: string;
  boxes: Partial<Record<PlanId, PriceBox>>;
  currency?: string;
};

const IPAPI = "https://ipapi.co/json/?key=lHbP1nDg5RAGMlJUP0FnwEJRBRb0zJ6m6762vlOjv7jZvCOGxp";
const EUR = ["AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES"];
const CURRENCY: Record<string, string> = { US: "usd", GB: "gbp", CA: "cad", AU: "aud", SG: "sgd", MY: "myr" };

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

async function visitorCurrency(): Promise<string> {
  const saved = getCookie("user-location-currency");
  if (saved) return saved;
  let currency = "usd";
  try {
    const data = (await (await fetch(IPAPI)).json()) as { country_code?: string };
    const cc = data.country_code ?? "";
    currency = EUR.includes(cc) ? "eur" : (CURRENCY[cc] ?? "usd");
  } catch {
    /* keep usd, as the theme does */
  }
  const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
  document.cookie = `user-location-currency=${currency}; expires=${expires}; path=/; domain=${window.location.hostname}`;
  return currency;
}

const text = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, " ").trim() || undefined;

/** One WordPress price box (".greplace" etc.) to our PriceBox. */
function parseBox(html: string): PriceBox | undefined {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const priceEl = doc.querySelector(".offerpric");
  if (!priceEl) return undefined;
  const oldEl = priceEl.querySelector(".oldprice");
  const oldPrice = text(oldEl);
  oldEl?.remove();
  const price = text(priceEl);
  if (!price) return undefined;

  const stripEl = doc.querySelector(".strip");
  let strip: PriceBox["strip"];
  if (stripEl) {
    const label = text(stripEl.querySelector("span"));
    stripEl.querySelector("span")?.remove();
    strip = { label: label ?? "", text: text(stripEl) ?? "" };
  }
  return { price, oldPrice, note: text(doc.querySelector(".price_note")), strip };
}

export function useLivePricing(): LivePricing | null {
  const [live, setLive] = useState<LivePricing | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const currency = await visitorCurrency();
      const action = getCookie("kimp-visa-coupon") === "visaoffer" ? "offerSaleNewVisa" : "offerSaleNew";
      const res = await fetch("/wp-admin/admin-ajax.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: new URLSearchParams({ action, pricepage: "1", scurrency: currency }),
        credentials: "same-origin",
      });
      if (!res.ok) return;
      const data = JSON.parse(await res.text()) as string[];
      if (!Array.isArray(data) || data.length < 5 || cancelled) return;
      const offerDoc = new DOMParser().parseFromString(data[0], "text/html");
      setLive({
        offer: text(offerDoc.body),
        boxes: { graphics: parseBox(data[1]), video: parseBox(data[2]), "graphics-video": parseBox(data[3]) },
        currency: text(new DOMParser().parseFromString(data[4], "text/html").body),
      });
    })().catch(() => {
      /* WordPress unreachable: the server-rendered prices stay. */
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return live;
}
