/**
 * /startups/ copy, taken verbatim from the live page (WordPress template
 * "template-startup", hardcoded in the PHP template: nothing here is
 * WordPress-managed).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: <h1> hero; <h2> "How
 * Startups Scale Faster", "We Design Just About Everything", "Your Remote
 * Design Solution" and its four feature titles, "We’ve got a design for that"
 * and its three card titles, "Book A Call With Us"; <h4> the six perks and the
 * two review companies; <h6> the reviewers.
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

export const PATH = "/startups/";

export const ST_HERO = {
  eyebrow: "Kimp for startups",
  /* Same text as the live <h1>, split over two lines. */
  title: { lead: "Unlimited Graphic Design & Video Design", highlight: "for Startups" },
  intro: "Let us take graphic design off your to-do list while you build, launch, and scale.",
  ...TEAM_HERO_CTAS,
  marquee: ["Startups", "Build", "Launch", "Scale", "Design"],
  /* Live hero has no logo row: short promises from the perks below, as pills (not headings). */
  strip: ["Skip The Interviews", "100% Ownership", "Team Collaboration", "Flat Monthly Fee"],
} as const;

export const ST_PERKS = {
  id: "st-perks",
  eyebrow: "Why Kimp",
  title: "How Startups Scale Faster",
  intro: "Get all the designs you need to get your product or service off the ground and into new markets.",
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
      body: "Invite your startup team to help you make and manage all of your designs with Kimp, at no extra cost.",
    },
    FEE_PERK,
  ],
} as const;

export const ST_WORK = TEAM_WORK;

export const ST_TEAM = {
  eyebrow: "Collaborate remotely",
  title: "Your Remote Design Solution",
  intro: "No matter where your Startup team is located, Kimp allows you to collaborate on your design projects.",
  items: [
    REQUESTS_FEATURE,
    {
      icon: TEAM_FEATURE_ICONS.projects,
      title: "Manage multiple projects",
      body: "Does your startup have more than one brand? Simply provide the brand guidelines for each and refer to them when making requests.",
    },
    {
      icon: TEAM_FEATURE_ICONS.collaborate,
      title: "Collaborate with your startup team",
      body: "Eliminate extra steps and invite your team members to collaborate on making and managing your design requests.",
    },
    COMMS_FEATURE,
  ],
} as const;

export const ST_DESIGNS = {
  eyebrow: "Print or digital",
  title: DESIGN_FOR_THAT_TITLE,
  intro: "Print or digital, whatever your startup needs, we can help you with.",
  cards: DESIGN_FOR_THAT_CARDS,
} as const;

export const ST_REVIEWS = TEAM_REVIEWS;
export const ST_CALL = TEAM_CALL;
