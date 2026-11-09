/**
 * /affiliates/ (Affiliates - Refer and Earn) copy, taken verbatim from the
 * live page (WordPress template "template-affnew"). All hardcoded in the PHP
 * template. Every "Apply Now" / "Affiliate Login" link points into the
 * AffiliateWP area on WordPress and keeps its live absolute href.
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: no <h1>; <h2> hero
 * "Become A Kimp Affiliate!"; <h2> "Earn Money While You Sleep" with three
 * <h3>; <h2> "We Make It Easy" with three <h3>; <h2> "How It Works" and the
 * three step titles as <h2>; <h2> "If You Go Big, We'll Go Bananas.";
 * <h2> "You Can Count On Kimp". Live has no closing CTA heading.
 */

export const PATH = "/affiliates/";
const DIR = "/images/company";
const AREA = "https://www.kimp.io/affiliate-area/";

export const AF_HERO = {
  eyebrow: "Kimp affiliates",
  title: { lead: "Become A", highlight: "Kimp Affiliate!" },
  intro:
    "Earn 10% of the monthly subscription fee for each client you refer. As long as they remain Kimp users, you'll keep earning payments!",
  primaryCta: { label: "Apply Now", href: AREA },
  login: { label: "Affiliate Login", href: AREA },
  marquee: ["Refer and Earn", "Recurring Revenue", "Easy Payouts", "Affiliates"],
  strip: ["Earn 10% every month", "Automated monthly payouts", "Approval in 1 business day", "Personalized dashboard"],
  /** Master flying pose holding a money sack (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/affiliates.webp", width: 1448, height: 1086 },
} as const;

export const AF_EARN = {
  eyebrow: "Why join",
  title: "Earn Money While You Sleep",
  intro: "As a Kimp Affiliate, it's easy to earn extra cash every month.",
  items: [
    {
      title: "Recurring Revenue",
      body: "Each month, you'll earn 10% of the subscription fee for each customer you refer.",
      icon: `${DIR}/perk-rr-icon.svg`,
    },
    {
      title: "Easy Payouts",
      body: "Receive automated payouts every month that 2 or more of your referrals subscribe to Kimp.",
      icon: `${DIR}/perk-ep-icon.svg`,
    },
    {
      title: "Special Promotions",
      body: "We love rewarding our Affiliates and giving them opportunities to earn more.",
      icon: `${DIR}/perk-sp-icon.svg`,
    },
  ],
} as const;

export const AF_EASY = {
  eyebrow: "Affiliate tools",
  title: "We Make It Easy",
  intro: "The Kimp Team gives you the tools to maximize your earnings.",
  items: [
    {
      title: "Quick Applications",
      body: "Apply using our online application, and receive your approval in 1 business day.",
      icon: `${DIR}/perk-qa-icon.svg`,
    },
    {
      title: "Real-Time Tracking",
      body: "Create your link and point it anywhere on Kimp.io. Then optimize based on what converts best.",
      icon: `${DIR}/perk-rtt-icon.svg`,
    },
    {
      title: "Analytics At A Glance",
      body: "Track your referral performance and your earnings in your personalized dashboard.",
      icon: `${DIR}/perk-ag-icon.svg`,
    },
  ],
  image: {
    src: `${DIR}/affiliates-kimp-charter.webp`,
    width: 1764,
    height: 1476,
    alt: "aff_monkey-holding-a-sign",
    title: "affiliate with kimp",
  },
} as const;

export const AF_STEPS = {
  eyebrow: "3 simple steps",
  title: "How It Works",
  intro: "Spend Less Time On Your Marketing And Scale Your Business Faster",
  items: [
    {
      title: "Apply To Be An Affiliate",
      body: "Fill out our application form and let us know how you’ll promote Kimp.",
      image: { src: `${DIR}/affliate_step1.png`, width: 790, height: 746 },
    },
    {
      title: "Promote Kimp’s Service",
      body: "Once your application is approved, you’ll get a unique link to promote Kimp.",
      image: { src: `${DIR}/affliate_step2.png`, width: 790, height: 746 },
    },
    {
      title: "Earn Recurring Rewards",
      body: "For each referral, earn 10% of their monthly fee, for as long as they're a customer.",
      image: { src: `${DIR}/affliate_step3.png`, width: 790, height: 748 },
    },
  ],
  cta: { label: "Apply Now", href: AREA },
} as const;

export const AF_BIG = {
  eyebrow: "Big networks",
  title: "If You Go Big, We'll Go Bananas.",
  /* Live paragraph: the email is a mailto link (target _blank) inside the sentence. */
  before:
    "Have a large network that you want to promote Kimp to? Think you can make 10 successful referrals per month? Then we have the marketing tools you need. Just contact ",
  email: { label: "affiliate@kimp.io", href: "mailto:affiliate@kimp.io" },
  after: ", and one of our Affiliate Services Representatives would be happy to help you.",
  image: { src: `${DIR}/kimp-card.webp`, width: 1388, height: 952 },
} as const;

export const AF_SUPPORT = {
  eyebrow: "Affiliate support",
  title: "You Can Count On Kimp",
  /* Live has a <br> after "available to". */
  lines: ["The Kimp Affiliate Team is available to", "support you, from the moment you apply."],
  cta: { label: "Apply Now", href: AREA },
} as const;
