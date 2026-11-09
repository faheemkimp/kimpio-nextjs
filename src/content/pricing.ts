/**
 * /pricing/ copy, links and plan data, taken verbatim from the live page
 * (content-audit/pricing.txt; plan features, tooltips, the "What's included"
 * answers and the design lists are generated from the live HTML into
 * pricing-data.json, the FAQ into pricing-faq.json).
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): heading text and levels mirror
 * the live page, which has no <h1>. Banner title and every section title are
 * <h2>, plan names and perks <h3>, "What's included" items and FAQ questions
 * <h4>. The live hero has no client-logo strip, so none is added here.
 *
 * Prices: live renders the plan boxes from WordPress (admin-ajax
 * "offerSaleNew") in the visitor's currency, including any running offer.
 * The page server-renders the standard USD figures below and then loads the
 * same WordPress boxes in the browser (src/components/pricing/live-pricing.ts),
 * so offers stay managed in WordPress exactly as today.
 */
import type { FaqItem } from "./graphic-design-services";
import DATA from "./pricing-data.json";
import FAQ_ITEMS from "./pricing-faq.json";

export const PATH = "/pricing/";

export const PRICING_HERO = {
  eyebrow: "Pricing · One flat monthly fee",
  /* Rendered "Kimp Pricing" + line break + "and Plans": same text as the live <h2>. */
  title: { lead: "Kimp Pricing", highlight: "and Plans" },
  intro:
    "Budgeting for design projects doesn’t have to be so hard! At Kimp we offer simple, transparent pricing, with flat rates for all our plans.",
  primaryCta: { label: "View Pricing", href: "#plans-pricing" },
  marquee: ["Flat Rates", "Kimp Pricing", "No Contracts", "Unlimited Design"],
  strip: ["Flat monthly fee", "No contracts", "Cancel any time", "Unlimited requests & revisions", "7-day free trial"],
  mascot: { src: "/images/mascot/fly-pricing-dollar.webp", width: 1440, height: 960 },
} as const;

export type PlanId = "graphics" | "graphics-video" | "video";
export type PlanFeature = { label: string; tip?: string };
export type Plan = { id: PlanId; name: string; blurb: string; features: PlanFeature[] };

/** Server-rendered price boxes (USD, no offer); replaced in the browser by WordPress' live boxes. */
export type PriceBox = {
  price: string;
  period?: string;
  oldPrice?: string;
  note?: string;
  /** Only on the best-value plan: "Best Value:" + saving line. */
  strip?: { label: string; text: string };
};

export const PRICING_PLANS = {
  /** id="plans-pricing" is the hero's "View Pricing" anchor on live. */
  anchor: "plans-pricing",
  eyebrow: "Simple, transparent pricing",
  title: "Pricing",
  plans: DATA.plans as Plan[],
  /* Same figures as the homepage plan cards; the strip copy is the live static HTML. */
  defaults: {
    graphics: { price: "$1,397", period: "/mo" },
    "graphics-video": { price: "$1,697", period: "/mo", strip: { label: "Best Value:", text: "Save $303 Monthly!" } },
    video: { price: "$1,397", period: "/mo" },
  } satisfies Record<PlanId, PriceBox>,
  bestValue: "graphics-video" as PlanId,
  cta: { label: "Start Free Trial", href: "/register-now/" },
  currencyNote: "All prices are in",
  defaultCurrency: "USD",
};

export const PRICING_ENTERPRISE = {
  title: "Need An Enterprise Solution?",
  body: "If your company needs a custom solution, tailored to your unique design needs and workflow, KIMP can help. Book a call to get started.",
  /** Opens in a new tab on live. */
  cta: { label: "Book A Call", href: "https://www.kimp.io/know-about-enterprise-solution/" },
} as const;

export const PRICING_INCLUDED = {
  eyebrow: "Every subscription",
  title: "What's included with my subscription fee?",
  intro: "With each Kimp subscription you get features that will help you make and manage your design requests with ease.",
  /** Live: <h4> name, then the answer, which continues the name ("Kimp Graphics" + "is our power-packed…"). */
  items: DATA.included as { title: string; body: string[] }[],
};

export const PRICING_CATALOGUE = {
  eyebrow: "100+ design categories",
  title: "Create Unlimited Graphic Or Video Design",
  intro: "We can help you with almost everything you might need in the graphic and video design departments.",
  tabs: [
    { id: "graphics", label: "Graphics", items: DATA.graphics as PlanFeature[] },
    { id: "videos", label: "Videos", items: DATA.videos as PlanFeature[] },
  ],
  /** "click here" opens the live chat on WordPress (href="#"). */
  note: {
    before: "If you need a design type not included on this list, just ",
    link: { label: "click here", href: "#" },
    after: " to connect with us on the live chat to find out if we can work on it for you!",
  },
  samplesCta: { label: "View All Graphics Samples", href: "/our-work" },
} as const;

export const PRICING_VOLUME = {
  title: "Have A High Volume Of Work?",
  body: "Have multiple brands or an agency? We can help. Just add as many subscriptions as you need to your account. And we’ll ramp up production.",
  cta: { label: "Contact Us", href: "/contact-us/" },
} as const;

export const PRICING_FAQ = {
  eyebrow: "Billing, answered",
  title: "FAQs",
  intro: "Have questions about how we work and what you get? We’ve got all the answers you need.",
  items: FAQ_ITEMS as FaqItem[],
};
