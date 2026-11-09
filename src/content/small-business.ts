/**
 * /small-business/ copy, taken verbatim from the live page (WordPress template
 * "template-small_business", hardcoded in the PHP template: nothing here is
 * WordPress-managed).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: <h1> hero; <h2> "Grow Your
 * Small Business With Kimp", "We Design Just About Everything", "Your
 * Dedicated Design Team" and its four feature titles, "We’ve got a design for
 * that" and its three card titles, "Book A Call With Us"; <h4> the six perks
 * and the two review companies; <h6> the reviewers.
 */

import {
  COMMS_FEATURE,
  DESIGN_FOR_THAT_CARDS,
  DESIGN_FOR_THAT_TITLE,
  FEE_PERK,
  OWNERSHIP_PERK,
  REQUESTS_FEATURE,
  SKIP_PERK,
  TEAM_CALL,
  TEAM_FEATURE_ICONS,
  TEAM_HERO_CTAS,
  TEAM_ICONS,
  TEAM_REVIEWS,
  TEAM_WORK,
} from "./audience-teams";

export const PATH = "/small-business/";

export const SB_HERO = {
  eyebrow: "Kimp for small businesses",
  /* Same text as the live <h1>, split over two lines. */
  title: { lead: "Unlimited Graphic Design & Video Design", highlight: "for Small Businesses" },
  intro: "You need a team that can adapt and scale at the pace of your Small Business. Kimp does that.",
  ...TEAM_HERO_CTAS,
  marquee: ["Small Business", "Print", "Digital", "Illustrations", "Grow"],
  /* Live hero has no logo row: short promises from the perks below, as pills (not headings). */
  strip: ["Skip The Interviews", "100% Ownership", "Year-Round Support", "Flat Monthly Fee"],
} as const;

export const SB_PERKS = {
  id: "sb-perks",
  eyebrow: "Why Kimp",
  title: "Grow Your Small Business With Kimp",
  intro: "Get all the designs you need to promote your products or services.",
  items: [
    SKIP_PERK,
    OWNERSHIP_PERK,
    {
      icon: TEAM_ICONS.experienced,
      title: "Experienced Designers",
      body: "We’re experienced in a wide range of print and digital creatives that your startup needs to launch and scale.",
    },
    {
      icon: TEAM_ICONS.support,
      title: "Year-Round Support",
      body: "Your dedicated team works on your requests to deliver you an average of 2-3 designs per business day.",
    },
    {
      icon: TEAM_ICONS.team,
      title: "Team Collaboration",
      body: "Invite your Small Business team to help you make and manage all of your designs with Kimp, at no extra cost.",
    },
    FEE_PERK,
  ],
} as const;

export const SB_WORK = TEAM_WORK;

export const SB_TEAM = {
  eyebrow: "Collaborate",
  title: "Your Dedicated Design Team",
  intro: "No matter what your small business needs designed, Kimp allows you to collaborate on your design projects.",
  items: [
    REQUESTS_FEATURE,
    {
      icon: TEAM_FEATURE_ICONS.projects,
      title: "Manage multiple projects",
      body: "Does your Small Business have more than one brand? Simply provide the brand guidelines for each and refer to them when making requests.",
    },
    {
      icon: TEAM_FEATURE_ICONS.collaborate,
      title: "Collaborate with your startup team",
      body: "Eliminate extra steps and invite your team members to collaborate on making and managing your design requests.",
    },
    COMMS_FEATURE,
  ],
} as const;

export const SB_DESIGNS = {
  eyebrow: "Print or digital",
  title: DESIGN_FOR_THAT_TITLE,
  intro: "Print or digital, whatever your Small Business needs, we can help you with.",
  cards: DESIGN_FOR_THAT_CARDS,
} as const;

export const SB_REVIEWS = TEAM_REVIEWS;
export const SB_CALL = TEAM_CALL;
