/**
 * Homepage copy, links and images, taken verbatim from the live kimp.io homepage
 * (content-audit/home.txt). Heading levels mirror the live page:
 * H1 = hero headline, the hero intro is an <h6>, the logo strip title is an <h2>.
 * Link destinations keep their live form (decision D4), e.g. "/book-a-call".
 */

export const HERO = {
  eyebrow: ["AI-Accelerated", "Human-Led", "Built for Agencies & Marketing Teams"],
  headline: { lead: "Your AI-powered", highlight: "creative department." },
  intro:
    "A dedicated design team, equipped with AI and working from your brand guidelines, so every design is made by humans and never looks like it came out of a generator.",
  introOffer: { lead: "Unlimited graphic and video design requests and revisions,", strong: "for one flat monthly fee." },
  primaryCta: { label: "Start Your Free 7-Day Trial", href: "/register-now/" },
  video: { label: "See How It Works (90 sec)", src: "https://www.youtube.com/embed/Sa20jGoBSnI" },
  features: ["Sign up in 2 minutes", "Cancel anytime", "Absolutely no contracts"],
} as const;

/**
 * "Trusted by" logo strip. Alt text is kept exactly as live (decision D3);
 * note two live alts do not match their files: "Greentoe" → abboott.svg and
 * "Market Health" → aldi.svg (see SEO-URL-AUDIT.md, section 3, issue 7).
 */
export const CLIENT_LOGOS = {
  title: "Trusted by over 5,000 businesses of all sizes.",
  logos: [
    { src: "/images/clients/abboott.svg", alt: "Greentoe", width: 139, height: 36 },
    { src: "/images/clients/aldi.svg", alt: "Market Health", width: 51, height: 56 },
    { src: "/images/clients/client_logo3.svg", alt: "Londonreal", width: 130, height: 24 },
    { src: "/images/clients/client_logo4.svg", alt: "Decathlon", width: 130, height: 28 },
    { src: "/images/clients/client_logo5.svg", alt: "Harley Davidson", width: 71, height: 56 },
    { src: "/images/clients/client_logo6.svg", alt: "Youk", width: 125, height: 40 },
    { src: "/images/clients/client_logo8.svg", alt: "Signle Grain", width: 118, height: 56 },
    { src: "/images/clients/client_logo7.svg", alt: "Universal", width: 88, height: 56 },
    { src: "/images/clients/client_logo9.svg", alt: "One and One", width: 63, height: 40 },
    { src: "/images/clients/targus.svg", alt: "targus", width: 154, height: 31 },
  ],
} as const;

/**
 * Hero workflow visual: one request travelling through the five Kimp360 stages
 * on a 3D track (src/components/home/workflow). `objective` is the short status
 * shown at each station once it completes.
 */
export const HERO_WORKFLOW = {
  title: { lead: "Kimp", accent: "360" },
  badge: "Live workflow",
  stages: [
    {
      label: "Submit Request",
      body: "Drop your brief into Kimp360 in under two minutes. Work starts the moment you hit send.",
      objective: "Request captured",
    },
    {
      label: "Request Received at Kimp",
      body: "Your dedicated design team picks it up straight away. No queues, no bidding, no back-and-forth.",
      objective: "Team assigned",
    },
    {
      label: "Processed in Kimp360",
      body: "Briefs, brand files and feedback are organised in one place, so nothing gets lost along the way.",
      objective: "Brief organised",
    },
    {
      label: "Design in Progress",
      body: "Your designer brings the idea to life, with unlimited revisions until it feels exactly right.",
      objective: "Design crafted",
    },
    {
      label: "Delivered to Client",
      body: "Polished, ready-to-use files land back with you, ready to launch.",
      objective: "Design delivered",
    },
  ],
} as const;

/**
 * "Discover KIMP's Key Benefits" bento. Copy follows the "KIMP Creative
 * Department Homepage" design (Nov 2026). Tile headings stay <h2>s for parity
 * with the live page. `categories.chips` are decorative (aria-hidden).
 */
export const WHY_KIMP = {
  eyebrow: "Why KIMP",
  title: "Discover KIMP's Key Benefits",
  intro:
    "We're not your average design service, and we're not an AI tool. Our subscriptions help you achieve more while saving time and money.",
  tiles: {
    requests: {
      title: "Unlimited Requests & Revisions",
      body: "Request as much as you need, revise until it's perfect, for one flat fee. No contracts, cancel anytime.",
      highlight: "One flat fee, cancel anytime",
    },
    team: {
      title: "Dedicated Team + Creative PM",
      body: "Real designers who learn your brand, and a Creative Project Manager who runs your queue, chases deadlines and turns feedback into action. Not a queue of strangers, not a chatbot.",
      image: { src: "/images/home/kimpch.webp", alt: "Kimp Charater", width: 1086, height: 680 },
    },
    firstTime: {
      title: "Right the First Time",
      body: "A brand profile set up once and a team that knows your style mean fewer revision cycles. Simple designs in hours, not days.",
      highlight: "Simple designs in hours",
    },
    agency: {
      title: "Agency-Ready",
      body: "Unlimited brands and white-label delivery on every plan, so agencies can run every client through one workspace.",
      highlight: "White-label on every plan",
    },
    support: {
      title: "Round-the-Clock Support",
      body: "Real humans, 7 days a week, for questions about billing, accounts and more. Unlimited collaborators at no extra cost.",
      highlight: "Real humans, 7 days a week",
    },
    categories: {
      title: "100+ Design Categories",
      body: "Graphics, video, motion, illustration, print, presentations, UI and more, under one subscription.",
      chips: [
        "Logos", "Social Media", "Branding", "Packaging", "Video Ads", "Motion Graphics",
        "Presentations", "Illustrations", "Web Banners", "Print Design", "Infographics",
        "Email Design", "Merch", "Book Covers", "Video Editing", "Ad Creatives",
      ],
    },
  },
} as const;
