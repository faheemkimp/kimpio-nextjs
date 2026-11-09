/**
 * /careers/ copy, taken verbatim from the live page (WordPress template
 * "template-career_landing"). Everything here is hardcoded in the PHP template
 * (no WordPress-managed content on this page).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live, in order: no <h1>;
 * hero <h2> "Ready to take your graphic design career to new heights?";
 * <h2> "What is Kimp" + three <h3> facts; <h2> "Ready For More Perks?";
 * <h2> "The Kimp Factor" + three <h3>; <h2> "Positions Available";
 * closing <h2> "Apply today, to join the incredible Kimp Team!".
 *
 * The "Positions Available" links and the hero/closing "Apply Now" buttons go to
 * kimp.me exactly as on live (no form on this page).
 */

export const PATH = "/careers/";

export const CR_HERO = {
  eyebrow: "Careers at Kimp",
  title: { lead: "Ready to take your graphic design career", highlight: "to new heights?" },
  intro: "Kimp connects people around the world through the power of design. Join our creative team and be inspired every day!",
  marquee: ["Careers", "Remote Work", "Kimp Team", "Design", "Grow With Us"],
  /* Perks named on the live page ("Ready For More Perks?"). */
  strip: ["Flexible Work Environment", "Competitive Pay", "Free Training Opportunities", "Annual Performance Bonus"],
  /** Master flying pose holding a briefcase (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/careers.webp", width: 1448, height: 1086 },
} as const;

/** Live notice under the hero banner. */
export const CR_NOTICE = {
  text: "Please be aware of employment scams impersonating KIMP. We are not hiring now. For more details",
  link: { label: "click here", href: "/employment-scams/" },
} as const;

export type FactIcon = "users" | "flag" | "briefcase" | "globe" | "target" | "heart";

export const CR_ABOUT = {
  eyebrow: "About Kimp",
  title: "What is Kimp",
  items: [
    {
      icon: "users",
      title: "250+ Team Members",
      body: "The Kimp Team is made up of 250+ people, working together from our different bases, to help support clients around the world.",
    },
    {
      icon: "flag",
      title: "Founded in 2019",
      body: "Kimp was founded to provide more affordable, flexible, and dependable graphic design for businesses needing marketing content.",
    },
    {
      icon: "briefcase",
      title: "2200+ Clients",
      body: "Kimp Designers get to work on a wide range of projects every day. So far, we’ve worked on over 160,000 design projects for our clients!",
    },
  ],
} as const satisfies { eyebrow: string; title: string; items: readonly { icon: FactIcon; title: string; body: string }[] };

export const CR_PERKS = {
  eyebrow: "Job perks",
  title: "Ready For More Perks?",
  intro: "We’ve got them! At Kimp you’ll join a supportive, creative team. And job perks include:",
  items: [
    "Flexible Work Environment",
    "Competitive Pay",
    "Career Opportunities Beyond Graphic Design",
    "Free Training Opportunities",
    "Personal & Professional Development",
    "Local Work Schedule",
    "Consistent Payout Schedule",
    "Annual Performance Bonus",
  ],
  /* Live image (no alt on live): the mascot relaxing in a deck chair. */
  image: { src: "/images/careers/kimprelax.png", width: 1630, height: 1286 },
} as const;

export const CR_FACTOR = {
  eyebrow: "Why Kimp",
  title: "The Kimp Factor",
  intro: "We’re a unique design service that provides a great customer experience",
  items: [
    {
      icon: "globe",
      title: "Global Scale",
      body: "We serve unique clients around the world. They range from entrepreneurs, to startups, to SMBs, to marketing agencies, and non-profit organizations.",
    },
    {
      icon: "target",
      title: "Goal Oriented",
      body: "The team that grows together, goes together. Join Kimp and you’ll grow with us, going on a mission to help businesses design better, and scale faster.",
    },
    {
      icon: "heart",
      title: "Inclusive Roles",
      body: "We love making careers in graphic design accessible to talented designers. We take every opportunity to support, train, and inspire our team members.",
    },
  ],
} as const satisfies { eyebrow: string; title: string; intro: string; items: readonly { icon: FactIcon; title: string; body: string }[] };

export const CR_POSITIONS = {
  eyebrow: "Open roles",
  title: "Positions Available",
  /* Live paragraph, with its two line breaks. */
  introLines: [
    "We are currently recruiting Graphic Designers to work remotely! If you are interested,",
    "please review the role requirements, and make sure that you meet them, before applying.",
    "Only qualified candidates will be contacted.",
  ],
  /* Live links (target="_blank"), in the live order. */
  roles: [
    { label: "Graphic Designer", href: "https://kimp.me/career/graphic-designer/" },
    { label: "Motion Graphics Artist", href: "https://kimp.me/career/motion-graphics-artist/" },
    { label: "Illustrator", href: "https://kimp.me/career/illustrator/" },
    { label: "UI Designer", href: "https://kimp.me/career/ui-designer/" },
    { label: "Project Manager", href: "https://kimp.me/career/project-manager/" },
    { label: "Content Writer", href: "https://kimp.me/career/content-writer/" },
  ],
  /* Live image from the closing "Apply today" section (no alt on live). */
  image: { src: "/images/careers/experienced-designer-ch.webp", width: 1887, height: 896 },
} as const;

/**
 * Live closing section: the <h2> (with line breaks after "today," and
 * "incredible") and an "Apply Now" button. Live's button href is "#"; here it
 * jumps to the open roles above (see the page report).
 */
export const CR_CTA = {
  eyebrow: "Join the Kimp Team",
  title: "Apply today, to join the incredible Kimp Team!",
  primary: { label: "Apply Now", href: "#positions" },
} as const;
