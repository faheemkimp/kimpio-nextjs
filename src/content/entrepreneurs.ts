/**
 * /entrepreneurs/ (Kimp For: Entrepreneurs) copy, taken verbatim from the live
 * page (WordPress template "template-entrepreneurs").
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: no <h1>; <h2> hero, logo
 * row, "Entrepreneurs Love Kimp", case-study title, "Kimp Perks", "How
 * Entrepreneurs Scale With Kimp", the two service titles, ratings and "We
 * Design Just About Everything"; <h3> perks, video-testimonial names, trial
 * band and "Book A Call With Us"; <h4> case-study name and the review title;
 * <h6> testimonial roles and rating figures.
 */

import { AUDIENCE_BAND, AUDIENCE_CALL, AUDIENCE_FEATURES, AUDIENCE_WORK, GRAPHICS_LIST, VIDEO_BODY, VIDEO_LIST, serviceMedia, trialBand } from "./audience-shared";

export const PATH = "/entrepreneurs/";
const DIR = "/images/audience";

export const EN_HERO = {
  eyebrow: "Kimp for entrepreneurs",
  /* Same text as the live <h2>, split over two lines. */
  title: { lead: "Unlimited graphic design & videos", highlight: "for Entrepreneurs." },
  intro: "Outsource your designs to a dedicated design team. Scale your business like never before.",
  primaryCta: { label: "Learn More", href: "#entrepreneurs-love-kimp" },
  secondaryCta: { label: "Schedule Demo", href: "/book-a-call/" },
  features: AUDIENCE_FEATURES,
  marquee: ["Entrepreneurs", "Launch", "Scale", "Graphic Design", "Videos"],
  mascot: { src: "/images/mascot/inner/entrepreneurs.webp", width: 1448, height: 1086 },
  band: AUDIENCE_BAND,
} as const;

export const EN_CASE = {
  id: "entrepreneurs-love-kimp",
  eyebrow: "Case study",
  title: "Entrepreneurs Love Kimp",
  intro: "Entrepreneurs around the world, looking to launch or scale, choose Kimp for their designs.",
  image: { src: `${DIR}/home_cs_imgsmile.jpg`, width: 824, height: 822 },
  logo: { src: `${DIR}/smile_fred_logo.svg`, alt: "Smile Fred", width: 25, height: 30 },
  storyTitle: "How Smile Fred Is Growing A Small Business With A Kimp Design Team",
  quote: "“If you want good quality graphic design with amazing turnaround times for delivery, please give the Kimp service a try, you won't be disappointed.”",
  name: "Wayne Hamlet",
  role: "Owner, Smile Fred",
  cta: { label: "View Case Study", href: "/case-study/smile-fred/" },
} as const;

/** Live "How Entrepreneurs Scale <br>With Kimp" (<h2>): names <h3>, roles <h6>. */
export const EN_VIDEOS = {
  titleLines: ["How Entrepreneurs Scale", "With Kimp"],
  items: [
    {
      video: "https://www.youtube.com/embed/hwAGouLoZS4",
      thumb: { src: `${DIR}/andrew-mackenzie-testmo.webp`, width: 1272, height: 720 },
      quote:
        "\"Whatever the request I've put into Kimp is, they've always delivered 110% on brand exactly what I'm looking for. It’s sort of eased my mind in terms of starting up a business and not having to worry about what perception my customers are going to have of my brand. I think absolutely take a trial, give it a shot.\"",
      name: "Andrew Mackenzie",
      role: "Founder, Industry Currency",
    },
    {
      video: "https://www.youtube.com/embed/ZA_FDQ_VlFg",
      thumb: { src: `${DIR}/nicole-murray-testmo.webp`, width: 1272, height: 720 },
      quote:
        "\"They have been very seamless in executing on everything we have asked for, from the creative vision, to the project management, to communication, to turnaround time. I have been beyond thrilled. It’s been a few months. And I definitely see Kimp as being part of our internal team as we grow and expand.\"",
      name: "Nicole Murray",
      role: "Director, LNM Creative",
    },
  ],
} as const;

const media = serviceMedia(DIR, "entrepreneurs");
export const EN_SERVICES = {
  graphics: {
    title: "Graphic Design Services",
    body: "You can't scale your business if you can't scale your graphic design team. Get a dedicated design team from Kimp, and get unlimited graphic design for unlimited projects!",
    list: GRAPHICS_LIST,
    cta: { label: "Get Unlimited Graphic Design", href: "/graphic-design-services/" },
    images: media.images,
  },
  video: {
    title: "Marketing Video Services",
    body: VIDEO_BODY,
    list: VIDEO_LIST,
    cta: { label: "Get Unlimited Marketing Videos", href: "/video-design-services/" },
    videos: media.videos,
  },
} as const;

/** Live single Trustpilot review (title <h4>) with the mascot-and-stars artwork. */
export const EN_REVIEW = {
  title: "Amazing service!!",
  body: "Amazing service! I really wish that I knew about this kind of service long ago. I was referred to Kimp by a friend so decided to give them a try. I have blown away by how much I was able to get done and free up my time. Great designs from the getgo. My project manager is very responsive and friendly to work with. Overall, I really enjoy working with the Kimp team and I can see this being a very long working relationship.",
  image: { src: `${DIR}/kimpwith_stars.png`, width: 566, height: 748 },
} as const;

export const EN_TRIAL = trialBand("Entrepreneurs");
export const EN_WORK = AUDIENCE_WORK;
export const EN_CALL = AUDIENCE_CALL;
