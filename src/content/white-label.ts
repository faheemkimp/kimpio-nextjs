/**
 * /white-label-graphic-design/ (Kimp For: Agencies) copy, taken verbatim from
 * the live page (WordPress template "template-agency").
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, description, robots,
 * canonical, OG and schema come from Yoast for this exact URL. Headings mirror
 * live: no <h1>; <h2> hero, "Brands That Trust Our Designers", "Agencies Love
 * Kimp", the case-study title, "Kimp Perks", "Agencies Love Designing With
 * Kimp", "Graphic Design Services", "Marketing Video Services", ratings and
 * "We Design Just About Everything"; <h3> perks and "Why Pay Upfront? Try Kimp
 * 100% Free!"; <h4> case-study name and review titles; <h6> reviewer names and
 * rating figures. Kimp Perks and the ratings are word-for-word the
 * /graphic-design-services/ sections, so those components are reused.
 */

import { AUDIENCE_BAND, AUDIENCE_FEATURES, AUDIENCE_WORK } from "./audience-shared";

export const PATH = "/white-label-graphic-design/";

export const WL_HERO = {
  eyebrow: "Kimp for agencies",
  /* Rendered "White Label Graphic Design" + line break + "& Videos for Agencies": same text as the live <h2>. */
  title: { lead: "White Label Graphic Design", highlight: "& Videos for Agencies" },
  intro:
    "Launch, build or scale your business. You’ve got what it takes. You just need a dependable design solution. We’ve got you covered.",
  /* Live "Learn More" scrolls to the next section. */
  primaryCta: { label: "Learn More", href: "#agencies-love-kimp" },
  secondaryCta: { label: "Schedule Demo", href: "/book-a-call/" },
  features: AUDIENCE_FEATURES,
  marquee: ["White Label", "Agencies", "Graphic Design", "Videos", "Kimp"],
  mascot: { src: "/images/mascot/inner/white-label-graphic-design.webp", width: 1448, height: 1086 },
  band: AUDIENCE_BAND,
} as const;

export const WL_CASE = {
  id: "agencies-love-kimp",
  eyebrow: "Case study",
  title: "Agencies Love Kimp",
  intro: "Agencies of all sizes, around the world, design better and scale faster with Kimp.",
  image: { src: "/images/agencies/home-cs-img6.webp", width: 824, height: 822 },
  logo: { src: "/images/agencies/sv_logo.svg", alt: "Social Vizion Media", width: 100, height: 30 },
  storyTitle: "How Social Vizion Media Found A 5 Star Solution To Scale Their Business",
  quote:
    "“I’ve received several five-star reviews after collaborating with Kimp.io on a project. My clients are usually very happy with their first design and they don’t need to revise anything.”",
  name: "Frank Anthony",
  role: "Owner, Social Vizion Media",
  cta: { label: "View Case Study", href: "/case-study/social-vizion-media/" },
} as const;

/** Live Trustpilot pair: title <h4>, reviewer <h6> ("Name," + country). */
export const WL_REVIEWS = [
  {
    title: "Kimp is great!",
    body: "Kimp has been great! Our team is professional, responsive, and does great work with designs. Irfan, our project manager, is so easy to work with, super responsive, and takes all details into account when working on designs. Kimp has been able to help our agency get back on track with design. Thank you so much!",
    name: "Paola Baker,",
    country: "US",
  },
  {
    title: "Excellent Design Team",
    body: "This design team is a superb bunch! I wish I could buy them a pizza. They have become an integral part of the success of our marketing agency. 2022 is looking much brighter thanks to you all!",
    name: "Joshua Williams,",
    country: "US",
  },
] as const;

export const WL_SERVICES = {
  eyebrow: "Graphics + video",
  title: "Agencies Love Designing With Kimp",
  intro:
    "Marketing and Design Agencies around the world love designing with Kimp. We help them quickly increase their design capacity to keep up with existing clients and onboard new ones.",
  graphics: {
    title: "Graphic Design Services",
    body: "You can't scale your agency if you can't scale your graphic design team. Get a dedicated design team from Kimp, and get unlimited graphic design for unlimited brands!",
    list: ["Landing page designs", "Logos and brand assets", "Email graphics", "Social media graphics", "Custom illustrations", "And so much more!"],
    cta: { label: "Get Unlimited Graphic Design", href: "/graphic-design-services/" },
    images: [1, 2, 3, 4].map((n) => ({ src: `/images/agencies/agencies_grphic_serv${n}.png`, width: 336, height: 334 })),
  },
  video: {
    title: "Marketing Video Services",
    body: "Nothing engages and converts like video marketing. Get engaging promo videos and motion graphics. We edit & enhance footage, or animate from scratch!",
    list: ["Logo animations", "Product demo videos", "Social media videos", "GIF animations", "Testimonial videos", "And so much more!"],
    cta: { label: "Get Unlimited Marketing Videos", href: "/video-design-services/" },
    videos: [
      { video: "https://www.youtube.com/watch?v=Z8zY5w5jkgo&feature=youtu.be", n: 1 },
      { video: "https://www.youtube.com/watch?v=Onkkj7JzUqA&feature=youtu.be", n: 2 },
      { video: "https://www.youtube.com/watch?v=yP3rNR4Mqj8&feature=youtu.be", n: 3 },
      { video: "https://www.youtube.com/watch?v=bNOt4qL4Gps&feature=youtu.be", n: 4 },
    ].map(({ video, n }) => ({ video, thumb: { src: `/images/agencies/agencies_video_serv${n}.png`, width: 354, height: 334 } })),
  },
} as const;

export const WL_TRIAL = {
  title: "Why Pay Upfront? Try Kimp 100% Free!",
  body: "Agencies around the world use Kimp to design better & scale faster. Sign up for a free 7 day trial. Don't pay unless you subscribe. Cancel anytime.",
  cta: { label: "Start Free Trial", href: "/register-now/" },
} as const;

/** Live portfolio strip (shared by the audience pages). */
export const WL_WORK = AUDIENCE_WORK;
