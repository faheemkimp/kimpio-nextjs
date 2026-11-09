/**
 * Copy shared word-for-word by the live "team" audience pages built on one
 * WordPress template family (template-small_business, template-startup,
 * template-marketing): /small-business/, /startups/, /marketing/. Each page's
 * own wording lives in its content file; this holds only what is identical.
 *
 * The live templates point their images at the current theme folder, where they
 * 404; the same files still exist in the previous theme ("kimpan") and were
 * copied from there into /images/audience/teams/.
 */

import { AUDIENCE_CALL, AUDIENCE_WORK } from "./audience-shared";

const DIR = "/images/audience/teams";

/** Live perk icons (decorative; live alt text is placeholder noise such as "80"). */
export const TEAM_ICONS = {
  skip: `${DIR}/skip-interview.svg`,
  ownership: `${DIR}/ownership-icon.svg`,
  scalable: `${DIR}/get-scalable-design.svg`,
  experienced: `${DIR}/experienced-designers.svg`,
  support: `${DIR}/year-round-support.svg`,
  team: `${DIR}/team-collaboration.svg`,
  fee: `${DIR}/flat-monthly-fee.svg`,
} as const;

export const SKIP_PERK = {
  icon: TEAM_ICONS.skip,
  title: "Skip The Interviews",
  body: "Skip the proposals, contracts, and hidden fees. Get matched up with a dedicated design team of professionals.",
} as const;

export const OWNERSHIP_PERK = {
  icon: TEAM_ICONS.ownership,
  title: "100% Ownership",
  body: "You retain the rights to all of the original source files created for your design requests with a Kimp subscription.",
} as const;

export const FEE_PERK = {
  icon: TEAM_ICONS.fee,
  title: "Flat Monthly Fee",
  body: "No surprises, no hourly billing, and no hidden fees. Pay a flat rate and get an on-demand design service.",
} as const;

/** Live "We Design Just About Everything" (<h2>). Live prints an unrendered [ess_grid] shortcode
 *  where the gallery should be; the audience pages' portfolio images stand in for it. Intro typo ("more!s") is live. */
export const TEAM_WORK = {
  ...AUDIENCE_WORK,
  intro: "Branding, social media designs, banner ads, print designs, custom illustrations, and more!s",
} as const;

/** Live team-feature icons (4 rows, each title an <h2>). */
export const TEAM_FEATURE_ICONS = {
  requests: `${DIR}/make-manage-unlimited-request.svg`,
  projects: `${DIR}/manage-multiple-client-project.svg`,
  collaborate: `${DIR}/collaborate-with-your-team.svg`,
  comms: `${DIR}/streamlined-communications.jpg`,
} as const;

export const REQUESTS_FEATURE = {
  icon: TEAM_FEATURE_ICONS.requests,
  title: "Make and manage unlimited requests",
  body: "Make and manage unlimited design requests, in the sequence you want them designed.",
} as const;

export const COMMS_FEATURE = {
  icon: TEAM_FEATURE_ICONS.comms,
  title: "Streamlined communications",
  body: "Connect directly with your dedicated design team to submit your requests and discuss your design needs.",
} as const;

/** Live "We’ve got a design for that" (<h2>) cards, each title an <h2>. */
export const DESIGN_FOR_THAT_TITLE = "We’ve got a design for that";
export const DESIGN_FOR_THAT_CARDS = [
  {
    kind: "print",
    title: "Print Graphics",
    body: "From branding, to signage, to marketing campaigns - whatever you’re promoting, we’ve got a design for that.",
  },
  {
    kind: "digital",
    title: "Digital Graphics",
    body: "Whether you need creatives for awareness, engagement, consideration, or conversion – we’ve got a design for that.",
  },
  {
    kind: "illustration",
    title: "Custom Illustrations",
    body: "Need custom creatives and illustrations for your brand, or for a unique campaign? We’ve got an illustration for that.",
  },
] as const;

/** Live Google reviews: company <h4>, person <h6>, five stars, quote; "View More" opens the Google Maps listing. */
export const TEAM_REVIEWS = {
  items: [
    {
      avatar: `${DIR}/3_Seth-Evans_2x.jpg`,
      company: "Big Fish Local",
      person: "Seth Evans",
      quote: "I have been very pleased with the quality of work we've received from Kimp. I would definitely recommend their services for anyone with ongoing design needs.",
    },
    {
      avatar: `${DIR}/4_Liana-Foai_2x.jpg`,
      company: "Nasyana Business Services",
      person: "Liana Foai",
      quote: "These guys are absolutely amazing!! I highly recommend them. Its so great to work with competent people who are incredibly good and super fast at what they do.",
    },
  ],
  cta: { label: "View More", href: "https://maps.google.com/?cid=367679572429924962" },
} as const;

/** Live "Book A Call With Us" (an <h2> on these templates). Same copy as AUDIENCE_CALL; live link has no trailing slash. */
export const TEAM_CALL = {
  ...AUDIENCE_CALL,
  cta: { label: "Book a Call", href: "/book-a-call" },
} as const;

/** Live hero buttons (same on all three). */
export const TEAM_HERO_CTAS = {
  primaryCta: { label: "Get Started", href: "/register-now/" },
  secondaryCta: { label: "Schedule a demo", href: "/book-a-call" },
} as const;
