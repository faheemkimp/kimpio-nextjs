/**
 * /fitness-health-brands/ (Kimp For: Fitness/Health Brands) copy, taken
 * verbatim from the live page (WordPress template "template-fitnessbrand").
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: no <h1>; <h2> hero, logo
 * row, "Fitness & Health Brands Love Kimp", case-study title, "What Our Clients
 * Have To Say", "Kimp Perks", the two service titles, ratings and "We Design
 * Just About Everything"; <h3> client company names, perks, trial band and
 * "Book A Call With Us"; <h4> case-study name; <h6> rating figures.
 */

import { AUDIENCE_BAND, AUDIENCE_CALL, AUDIENCE_WORK, GRAPHICS_LIST, VIDEO_BODY, VIDEO_LIST, serviceMedia, trialBand } from "./audience-shared";

export const PATH = "/fitness-health-brands/";
const DIR = "/images/audience";

export const FH_HERO = {
  eyebrow: "Kimp for fitness & health brands",
  /* Same text as the live <h2>, split over two lines. */
  title: { lead: "Unlimited graphic design & videos", highlight: "for Fitness/Health Brands." },
  intro: "Outsource your designs to a dedicated design team. Scale your Fitness/Health Brand like never before.",
  primaryCta: { label: "Learn More", href: "#fitness-health-brands-love-kimp" },
  secondaryCta: { label: "Schedule Demo", href: "/book-a-call/" },
  marquee: ["Fitness", "Health", "Wellness", "Graphic Design", "Videos"],
  mascot: { src: "/images/mascot/inner/fitness-health-brands.webp", width: 1448, height: 1086 },
  band: AUDIENCE_BAND,
} as const;

export const FH_CASE = {
  id: "fitness-health-brands-love-kimp",
  eyebrow: "Case study",
  title: "Fitness & Health Brands Love Kimp",
  intro: "Fitness & Health Brands, around the world, get their brands in shape by designing with Kimp.",
  image: { src: `${DIR}/home-cs-img1.webp`, width: 824, height: 822 },
  logo: { src: `${DIR}/rzone_logo.svg`, alt: "RZone Fitness", width: 100, height: 30 },
  storyTitle: "How RZone Fitness Has Increased Brand Awareness With Enticing Designs",
  quote:
    "“What stands out is their design and the speed that they could return the design. They responded to feedback and made edits quickly, typically within a few hours. Additionally, their costs offer a lot of value for your money.”",
  name: "Glenn Greer,",
  role: "Co-Owner RZone Fitness",
  cta: { label: "View Case Study", href: "/case-study/rzone-fitness/" },
} as const;

/** Live "What Our Clients Have To Say": company <h3>, person, 5 stars, quote. */
export const FH_CLIENTS = {
  eyebrow: "Client reviews",
  title: "What Our Clients Have To Say",
  intro: "Get it all with Kimp. They do.",
  cta: { label: "View All Reviews", href: "/reviews/" },
  items: [
    {
      avatar: `${DIR}/client_pic1.svg`,
      company: "Social Media Revenue",
      person: "Jacob Lopez",
      quote: "I have been using Kimp for a few months now and I am very happy with the service! They are quick about changes and adapting to your needs and wants which turns it into a easily flowing process. Highly recommend.",
    },
    {
      avatar: `${DIR}/client_pic2.svg`,
      company: "Industry Currency",
      person: "Andrew Mackenzie",
      quote: "My initial thought about unlimited graphic design with one low fee has been quashed. The design produced for my various brands and clients have been second to none. The service is brilliant and the response to requests is quite speedy.",
    },
    {
      avatar: `${DIR}/client_pic3.svg`,
      company: "Big Fish Local",
      person: "Seth Evans",
      quote: "I have been very pleased with the quality of work we've received from Kimp. I would definitely recommend their services for anyone with ongoing design needs.",
    },
    {
      avatar: `${DIR}/client_pic4.svg`,
      company: "Nasyana Business Services",
      person: "Liana Foai",
      quote: "These guys are absolutely amazing!! I highly recommend them. Its so great to work with competent people who are incredibly good and super fast at what they do.",
    },
  ],
} as const;

const media = serviceMedia(DIR, "fitness");
export const FH_SERVICES = {
  graphics: {
    title: "Graphic Design Services",
    body: "You can't scale your Fitness/Health Brand if you can't scale your graphic design team.",
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

export const FH_TRIAL = trialBand("Fitness/Health Brands");
export const FH_WORK = AUDIENCE_WORK;
export const FH_CALL = AUDIENCE_CALL;
