/**
 * /professional-services/ (Kimp For: Professional Services) copy, taken
 * verbatim from the live page (WordPress template "template-professional-services").
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: no <h1>; <h2> hero, logo
 * row, "Professional Services Love Kimp" (twice, as live), both case-study
 * titles, "Kimp Perks", "How Nava Wilson LLP Scaled With Kimp", the two service
 * titles and "We Design Just About Everything"; <h3> perks, the video
 * testimonial name, trial band and "Book A Call With Us"; <h4> case-study names
 * and review titles; <h6> reviewer names and the testimonial role. Live has no
 * ratings section on this page.
 */

import { AUDIENCE_BAND, AUDIENCE_CALL, AUDIENCE_WORK, GRAPHICS_LIST, VIDEO_LIST, serviceMedia, trialBand } from "./audience-shared";

export const PATH = "/professional-services/";
const DIR = "/images/audience";

export const PS_HERO = {
  eyebrow: "Kimp for professional services",
  /* Same text as the live <h2>, split over two lines. */
  title: { lead: "Unlimited graphic design & videos", highlight: "for Professional Services." },
  intro: "Outsource your designs to a dedicated design team. Scale your Professional Service like never before.",
  primaryCta: { label: "Learn More", href: "#professional-services-love-kimp" },
  secondaryCta: { label: "Schedule Demo", href: "/book-a-call/" },
  marquee: ["Professional Services", "Real Estate", "Legal", "Graphic Design", "Videos"],
  mascot: { src: "/images/mascot/inner/professional-services.webp", width: 1448, height: 1086 },
  band: AUDIENCE_BAND,
} as const;

export const PS_CASE = {
  id: "professional-services-love-kimp",
  eyebrow: "Case study",
  title: "Professional Services Love Kimp",
  intro: "Professional Services, around the world, easily scale their marketing with Kimp.",
  image: { src: `${DIR}/home-cs-img3.webp`, width: 824, height: 822 },
  logo: { src: `${DIR}/jlen_logo.svg`, alt: "Big Results", width: 100, height: 30 },
  storyTitle: "How Big Results Launched A Unique Real Estate Brand With Custom Designs",
  quote:
    "“As a Real Estate Agent, I’m part of a brokerage, but I wanted a brand of my own that clients could connect with. Kimp came through in a big way for me, from my logo to my custom illustrations.”",
  name: "Jelan Nathan",
  role: "Real Estate Agent, Big Results",
  cta: { label: "View Case Study", href: "/case-study/big-results/" },
} as const;

/** Live Trustpilot pair: title <h4>, reviewer <h6>. */
export const PS_REVIEWS = [
  {
    title: "Very professional and good brand interpretation",
    body: "The team at Kimp has been doing great work for us. Very professional, and in line with the branding we need for our client work. It's been a lifesaver to have our overflow work taken care of like this. It helps us manage the ups and downs of capacity management within our own team.",
    name: "Joanna,",
    country: "NZ",
  },
  {
    title: "One of the best decisions I've made in my business.",
    body: "I've been working with Kimp for over a year now and they are INCREDIBLE! Seriously, cannot thank them enough. The process, the end product, the communication along the way - it's all so so smooth. I wish other services I worked with were as good as Kimp.",
    name: "Sarah Turner,",
    country: "US",
  },
] as const;

/** Live video testimonial: kicker <h2> "Professional Services Love Kimp", title <h2>, name <h3>, role <h6>. */
export const PS_VIDEO = {
  kicker: "Professional Services Love Kimp",
  intro: "Professional Services love designing with Kimp. We help their teams develop and maintain consistently professional branding and marketing.",
  titleLines: ["How Nava Wilson LLP Scaled With Kimp"],
  items: [
    {
      video: "https://www.youtube.com/embed/2K_UquzERiY",
      thumb: { src: `${DIR}/kubesh-nava-testmo.webp`, width: 1272, height: 720 },
      quote:
        "\"We have a team dedicated to us for a few hundred dollars, to ensure our marketing content and assets are very consistent and to the quality we need. Kimp is very quick to ensure that we get all of our marketing needs served on time, to the quality that we need, and in a very effective manner. We’re very happy working with Kimp.”",
      name: "Kubes Nava",
      role: "Managing Partner, Nava Wilson LLP",
    },
  ],
} as const;

const media = serviceMedia(DIR, "professional", [
  "https://www.youtube.com/watch?v=L0zYKEwsuRg&feature=youtu.be",
  "https://www.youtube.com/watch?v=tFTwTt9hwWo&feature=youtu.be",
  "https://www.youtube.com/watch?v=9Iw4tkl6ncY&feature=youtu.be",
  "https://www.youtube.com/watch?v=bNOt4qL4Gps&feature=youtu.be",
]);
export const PS_SERVICES = {
  graphics: {
    title: "Graphic Design Services",
    body: "You can't scale your business if you can't scale your graphic design team. Get a dedicated design team from Kimp, and get unlimited graphic design for unlimited projects!",
    list: GRAPHICS_LIST,
    cta: { label: "Get Unlimited Graphic Design", href: "/graphic-design-services/" },
    images: media.images,
  },
  video: {
    title: "Marketing Video Services",
    /* Live copy as published (it repeats the graphics wording). */
    body: "You can't scale your Professional Service if you can't scale your graphic design team. Get a dedicated design team from Kimp, and get unlimited graphic design for unlimited projects!",
    list: VIDEO_LIST,
    cta: { label: "Get Unlimited Marketing Videos", href: "/video-design-services/" },
    videos: media.videos,
  },
} as const;

export const PS_TRIAL = trialBand("Professional Services");
export const PS_WORK = AUDIENCE_WORK;

/** Second case study near the end of the live page (no section heading above it). */
export const PS_CASE_2 = {
  id: "nava-wilson-case-study",
  image: { src: `${DIR}/nava-home-casestudy.webp`, width: 824, height: 822 },
  logo: { src: `${DIR}/nava_logo.svg`, alt: "Nava Wilson LLP", width: 504, height: 64 },
  storyTitle: "How Nava Wilson Expanded Its Marketing With A Dedicated Design Team",
  quote: "“Kimp is very quick to ensure that we get all of our marketing needs served on time, to the quality that we need, and in a very effective manner.”",
  name: "Kubes Nava",
  role: "Managing Partner, Nava Wilson LLP",
  cta: { label: "View Case Study", href: "/case-study/nava-wilson/" },
} as const;

export const PS_CALL = AUDIENCE_CALL;
