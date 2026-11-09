/**
 * /marketing/ copy, taken verbatim from the live page (WordPress template
 * "template-marketing", hardcoded in the PHP template: nothing here is
 * WordPress-managed).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: <h1> hero; <h2> "Why
 * Marketing Teams Choose Kimp", "We Design Just About Everything", "Your
 * One-Stop-Design-Shop" and its four feature titles, "We’ve got a design for
 * that" and its three card titles, "Book A Call With Us"; <h4> the six perks
 * and the two review companies; <h6> the reviewers.
 */

import {
  COMMS_FEATURE,
  DESIGN_FOR_THAT_CARDS,
  DESIGN_FOR_THAT_TITLE,
  FEE_PERK,
  REQUESTS_FEATURE,
  SKIP_PERK,
  TEAM_CALL,
  TEAM_FEATURE_ICONS,
  TEAM_HERO_CTAS,
  TEAM_ICONS,
  TEAM_REVIEWS,
  TEAM_WORK,
} from "./audience-teams";

export const PATH = "/marketing/";

export const MK_HERO = {
  eyebrow: "Kimp for marketing teams",
  /* Same text as the live <h1>, split over two lines. */
  title: { lead: "The design solution", highlight: "Marketing Teams trust" },
  intro: "Focus on launching and scaling your campaigns, while Kimp takes care of your designs.",
  ...TEAM_HERO_CTAS,
  marquee: ["Marketing Teams", "Campaigns", "Launch", "Scale", "Design"],
  /* Live hero has no logo row: short promises from the perks below, as pills (not headings). */
  strip: ["Skip The Interviews", "Get Scalable Design", "Team Collaboration", "Flat Monthly Fee"],
} as const;

export const MK_PERKS = {
  id: "mk-perks",
  eyebrow: "Why Kimp",
  title: "Why Marketing Teams Choose Kimp",
  intro: "Design better, and scale your campaigns faster, with Kimp.",
  items: [
    SKIP_PERK,
    {
      icon: TEAM_ICONS.scalable,
      title: "Get Scalable Design",
      body: "Need to double, triple, or quadruple your outputs? Go right ahead. We can scale up to meet your Marketing Team’s needs.",
    },
    {
      icon: TEAM_ICONS.experienced,
      title: "Experienced Designers",
      body: "We’re experienced in print and digital creatives. So you can be sure we’ll keep your Marketing Team looking good.",
    },
    {
      icon: TEAM_ICONS.support,
      title: "Year-Round Support",
      body: "Your dedicated design team works on your requests to deliver you an average of 2-3 designs per business day.",
    },
    {
      icon: TEAM_ICONS.team,
      title: "Team Collaboration",
      body: "Invite your Marketing Team members to help you make and manage all of your designs with Kimp, at no extra cost.",
    },
    FEE_PERK,
  ],
} as const;

export const MK_WORK = TEAM_WORK;

export const MK_TEAM = {
  eyebrow: "One team, every campaign",
  title: "Your One-Stop-Design-Shop",
  intro: "From lean teams to large multi-national teams, we help you stay connected, while you save time and money.",
  items: [
    REQUESTS_FEATURE,
    {
      icon: TEAM_FEATURE_ICONS.projects,
      title: "Manage multiple projects",
      body: "Submit requests for as many brands as you’d like. Simply provide the brand guidelines and refer to them when making requests.",
    },
    {
      icon: TEAM_FEATURE_ICONS.collaborate,
      title: "Collaborate with your Marketing Team",
      body: "Eliminate extra steps and invite your Marketing Team members to collaborate on making and managing your design requests.",
    },
    COMMS_FEATURE,
  ],
} as const;

export const MK_DESIGNS = {
  eyebrow: "Print or digital",
  title: DESIGN_FOR_THAT_TITLE,
  intro: "Print or digital, whatever your Marketing Team needs, we can help you with.",
  cards: DESIGN_FOR_THAT_CARDS,
} as const;

export const MK_REVIEWS = TEAM_REVIEWS;
export const MK_CALL = TEAM_CALL;
