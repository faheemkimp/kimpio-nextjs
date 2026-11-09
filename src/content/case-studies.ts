/**
 * Case studies: /case-study/ (list) and the 12 /case-study/{slug}/ pages.
 *
 * On live these are hardcoded PHP templates (template-casestudy_*.php; the
 * `casestudy` post type is not exposed over REST), so the copy below is the
 * live template text, verbatim (typos included). Generated from the live HTML
 * on 2026-11-08; images were copied to /public/images/case-study/.
 *
 * Heading markup: `*text*` = the live <span> highlight, "\n" = the live <br>.
 * Paragraph and list text: "\n" = a live <br><br> paragraph break.
 * SEO (title, robots, OG) comes from Yoast per URL (getPageSeo).
 */

export const LIST_PATH = "/case-study/";

type Img = { src: string; width: number; height: number; alt: string };

export type CaseCard = {
  path: string;
  /** Live <h3>. */
  title: string;
  image: Img;
  logo: Img;
};

export type CaseStudy = {
  slug: string;
  path: string;
  /** Live title <h2>, the quote, the client name <h2> and role <h6>. */
  hero: { title: string; image: Img; quote: string; name: string; role: string };
  about: { title: string; paragraphs: readonly string[]; image: Img };
  problem: { title: string; paragraphs: readonly string[]; image: Img };
  /** Live <h2>, lead <h5>, the list and the before/after gallery. */
  solution: { title: string; lead: string; items: readonly string[]; gallery: readonly Img[] };
  /** `quote` = the live `p.says` client quote. */
  impact: { title: string; paragraphs: readonly { text: string; quote: boolean }[]; image: Img };
  tips?: { title: string; paragraphs: readonly string[] };
  /** Live "Previous Post" / "Next Post" links (WordPress post order). */
  prev: string | null;
  next: string | null;
};

/** List hero: live <h2>Case Studies</h2> and its intro. */
export const CS_HERO = {
  eyebrow: "Kimp Case Studies",
  title: { lead: "Case", highlight: "Studies" },
  intro: "We design for a wide range of clients. Check out these samples of our work to see what we can do for you!",
  marquee: ["Case Studies", "Branding", "Scale", "Agencies", "Startups"],
  strip: ["Businesses of all sizes", "Nonprofits", "Agencies", "Entrepreneurs"],
  mascot: { src: "/images/mascot/inner/case-study.webp", width: 1448, height: 1086 },
} as const;

/** Live list intro: <h2> with a <br>, and its <p>. */
export const CS_LIST = {
  title: "The most innovative brands around the\nworld choose Kimp for their designs.",
  intro: "From businesses, of all sizes, to nonprofits, and agencies, teams around the world design better and scale faster with Kimp.",
  cta: "View Case study",
} as const;

/** Detail pages: live post navigation labels and section eyebrows (decorative, not headings). */
export const CS_DETAIL = {
  back: { label: "All case studies", href: LIST_PATH },
  prev: "Previous Post",
  next: "Next Post",
  eyebrows: { about: "The client", problem: "The challenge", solution: "The solution", impact: "The impact", tips: "Tips" },
} as const;

/** Live closing newsletter box (<h2>) on the list and every case study. */
export const CS_FINAL = {
  eyebrow: "Start your 7-day free trial",
  title: "Whether you’re an entrepreneur, or an established business, we’ll help you save time and money.",
  primary: { label: "Start Free Trial", href: "/register-now/" },
};

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export const CASE_CARDS: readonly CaseCard[] = [
  {
    "path": "/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/",
    "title": "How Nomos Found An Experienced and Reliable Design Solution With KIMP",
    "image": {
      "src": "/images/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/nomos-small-features.webp",
      "width": 840,
      "height": 592,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/nomos-logo-one.webp",
      "width": 550,
      "height": 142,
      "alt": ""
    }
  },
  {
    "path": "/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/",
    "title": "How Igloo Met All of Its Design Requirements With A Single Subscription",
    "image": {
      "src": "/images/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/banner.webp",
      "width": 1808,
      "height": 938,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/igloo-logo-one.webp",
      "width": 580,
      "height": 322,
      "alt": ""
    }
  },
  {
    "path": "/case-study/wgan/",
    "title": "How Dan Smigrod Upgraded the WGAN brand’s Visual Identity With Kimp",
    "image": {
      "src": "/images/case-study/wgan/smigrod-thump.webp",
      "width": 840,
      "height": 592,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/wgan/Smigrod.svg",
      "width": 79,
      "height": 49,
      "alt": ""
    }
  },
  {
    "path": "/case-study/garry-robinson/",
    "title": "How Garry Robinson Produces High Quality Designs More Efficiently",
    "image": {
      "src": "/images/case-study/garry-robinson/casestudy_garry_img.png",
      "width": 420,
      "height": 296,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/garry-robinson/garry_logo.svg",
      "width": 100,
      "height": 30,
      "alt": ""
    }
  },
  {
    "path": "/case-study/smile-fred/",
    "title": "How Smile Fred Is Growing A Small Business With A Kimp Design Team",
    "image": {
      "src": "/images/case-study/smile-fred/casestudy_smiledfed_img.png",
      "width": 420,
      "height": 296,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/smile-fred/smile_fred_logo.svg",
      "width": 25,
      "height": 30,
      "alt": ""
    }
  },
  {
    "path": "/case-study/rzone-fitness/",
    "title": "How RZone Fitness Has Increased Brand Awareness With Enticing Designs",
    "image": {
      "src": "/images/case-study/rzone-fitness/casestudy_rzone_img.png",
      "width": 428,
      "height": 296,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/rzone-fitness/rzone_logo.svg",
      "width": 100,
      "height": 30,
      "alt": ""
    }
  },
  {
    "path": "/case-study/social-vizion-media/",
    "title": "How Social Vizion Media Found A 5 Star Solution To Scale Their Business",
    "image": {
      "src": "/images/case-study/social-vizion-media/casestudy_sv_img.png",
      "width": 420,
      "height": 296,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/social-vizion-media/sv_logo.svg",
      "width": 100,
      "height": 30,
      "alt": ""
    }
  },
  {
    "path": "/case-study/bdyc/",
    "title": "How BDYC Scaled & Secured Clients With Unique Branding & Web Design",
    "image": {
      "src": "/images/case-study/bdyc/casestudy_bdyc_img.png",
      "width": 420,
      "height": 296,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/bdyc/bdyc_logo.svg",
      "width": 100,
      "height": 30,
      "alt": ""
    }
  },
  {
    "path": "/case-study/paragon-well-being/",
    "title": "How Paragon Well-Being Is Elevating Their Branding With A Dedicated Design Team",
    "image": {
      "src": "/images/case-study/paragon-well-being/paragon-thump.webp",
      "width": 840,
      "height": 592,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/paragon-well-being/paragon_logo.svg",
      "width": 100,
      "height": 30,
      "alt": ""
    }
  },
  {
    "path": "/case-study/big-results/",
    "title": "How Big Results Launched A Unique Real Estate Brand With Custom Designs",
    "image": {
      "src": "/images/case-study/big-results/casestudy_big_results_img.png",
      "width": 420,
      "height": 296,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/big-results/jlen_logo.svg",
      "width": 100,
      "height": 30,
      "alt": ""
    }
  },
  {
    "path": "/case-study/nava-wilson/",
    "title": "How Nava Wilson Expanded Its Marketing With A Dedicated Design Team",
    "image": {
      "src": "/images/case-study/nava-wilson/nava-wilson-thump.webp",
      "width": 840,
      "height": 592,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/nava-wilson/nava_logo.svg",
      "width": 504,
      "height": 64,
      "alt": ""
    }
  },
  {
    "path": "/case-study/search-engine-wizards/",
    "title": "How Petteri Pucilowski Meets Diverse Design Demands With KIMP",
    "image": {
      "src": "/images/case-study/search-engine-wizards/pat-thump.webp",
      "width": 856,
      "height": 592,
      "alt": ""
    },
    "logo": {
      "src": "/images/case-study/search-engine-wizards/pat_thump_logo.png",
      "width": 110,
      "height": 60,
      "alt": ""
    }
  }
];

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    "slug": "bdyc",
    "path": "/case-study/bdyc/",
    "hero": {
      "title": "Case Study: How *BDYC* Scaled & Secured Clients With\nUnique Branding & Web Design",
      "image": {
        "src": "/images/case-study/bdyc/bdyc-main-thump.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“I exhaustively searched the unlimited graphic design sector and decided to go with Kimp because of their reputation online. I was so happy with the outcome.”",
      "name": "Ben Yarbrough,",
      "role": "Chief Strategist, BDYC"
    },
    "about": {
      "title": "What type of business is\n*BDYC?*",
      "paragraphs": [
        "BDYC is a boutique digital marketing firm that offers fully customized, story-driven, brand development and digital marketing services. This includes brand development, web development, digital marketing, new brand packages, strategic rebranding, and social media marketing.",
        "Through this suite of creative services BDYC helps its clients identify, elevate and align their brand stories. They serve businesses that range from those who have’t started digital marketing, to those who are struggling to build a strong virtual presence. And they do so while leveraging their own strengths to reveal their clients’ strengths."
      ],
      "image": {
        "src": "/images/case-study/bdyc/bdyc-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*BDYC* need help solving?",
      "paragraphs": [
        "BDYC needed help filling in the gaps that existed in their creative team quickly, so that they could have the capacity to scale."
      ],
      "image": {
        "src": "/images/case-study/bdyc/bdyc-client-logo.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address BDYC’s problem?",
      "lead": "Kimp helped BDYC address the gaps they were facing through the following:",
      "items": [
        "A quick and efficient onboarding process so that BDYC could scale up their capacity to create designs and move forward with other areas of business development.",
        "Professional design services at a fraction of the cost to hire an in-house graphic design team.",
        "A wide range of design services completed by one dedicated team, as part of the flat monthly fee. This includes business card designs, brochure designs, and illustrations.",
        "Prompt turnarounds allowing BDYC to provide clients with timely updates, and secure client bids.",
        "Easy collaboration that allows BDYC to stay connected, and on the same page, with their dedicated design team through the KIMP360 design project management software.",
        "A high degree of value for the flat monthly fee, including friendly, responsive customer service."
      ],
      "gallery": [
        {
          "src": "/images/case-study/bdyc/bdyc-slider1.webp",
          "width": 1264,
          "height": 670,
          "alt": ""
        },
        {
          "src": "/images/case-study/bdyc/bdyc-slider2.webp",
          "width": 1264,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp for* *BDYC?*",
      "paragraphs": [
        {
          "text": "Social Vizion Media’s Owner Frank Anthony shared that working with Kimp has made his life easier. While his dedicated design team focused on the designs he needed done, he was able to focus on his other responsibilities and devote more time to them.",
          "quote": false
        },
        {
          "text": "“In the past, I’ve spent too much time and money trying to find a partner that provided the quality of work I needed. They’d offer a reasonable price, but then their quality declined.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/rzone-fitness/",
    "next": "/case-study/social-vizion-media/"
  },
  {
    "slug": "big-results",
    "path": "/case-study/big-results/",
    "hero": {
      "title": "Case Study: How *Big Results* Launched A Unique\nReal Estate Brand With Custom Designs",
      "image": {
        "src": "/images/case-study/big-results/br-main-thump.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“As a Real Estate Agent, I’m part of a brokerage, but I wanted a brand of my own that clients could connect with. Kimp came through in a big way for me, from my logo to my custom illustrations.”",
      "name": "Jelan Nathan",
      "role": "Real Estate Agent, Big Results"
    },
    "about": {
      "title": "What type of business is\n*Big Results?*",
      "paragraphs": [
        "Big Results is Toronto-based Real Estate Agent, Jelan Nathan’s personal brand. Through his brand, Jelan aims to communicate to his clients his promise to get them big results. Jelan offers services to those looking to buy or sell their homes, including helping with financing, optimizing pricing, negotiations, digital and print marketing, hosting open houses, and finding creative ways to engage buyers and sellers.",
        "Jelan’s goal is to support his clients from end to end, regardless of where each person may be on their unique homeowner journeys."
      ],
      "image": {
        "src": "/images/case-study/big-results/bigresult-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*Big Results* need help solving?",
      "paragraphs": [
        "With the real estate market being highly competitive in Toronto, Jelan wanted to launch a memorable brand, but didn’t have the capacity to design all the components he would need."
      ],
      "image": {
        "src": "/images/case-study/big-results/bigresult-client-logo.webp",
        "width": 1028,
        "height": 1008,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to solve Big Results' problem?",
      "lead": "Kimp was able to help Jelan with launching his brand in a memorable way by:",
      "items": [
        "Developing all of the Big Results branding, through a variety of design services, including custom illustrations, logo design, social media designs, website element designs, outdoor signage, business cards, letterhead, and more.",
        "Presenting creative designs even with limited or vague briefs, and helping with the development of brand guidelines",
        "Providing a dedicated design team and a streamlined project management platform (KIMP360) to make it easier to manage all of his design requests in one place.",
        "Offering competitive pricing and a flat monthly fee for all of the designs that Jelan needed for Big Results to be launched.",
        "Being flexible through month-to-month commitments, allowing Jelan to activate or deactivate subscriptions as needed to help with busy times of the year for real estate.",
        "Helping with sharing the Big Results brand story through multiple iterations of a custom branded character and preparing designs for different platforms using the illustrations, so that the brand could be consistently represented."
      ],
      "gallery": [
        {
          "src": "/images/case-study/big-results/bigresult-banner-1.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        },
        {
          "src": "/images/case-study/big-results/bigresult-banner-2.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Big Results?",
      "paragraphs": [
        {
          "text": "Big Results has been able to launch its brand and create brand awareness amongst its target audience, in the competitive Toronto real estate industry, with the support of a dedicated Kimp Team. With Kimp focusing on the designs, Jelan was able to focus on closing deals.",
          "quote": false
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/paragon-well-being/",
    "next": "/case-study/nava-wilson/"
  },
  {
    "slug": "garry-robinson",
    "path": "/case-study/garry-robinson/",
    "hero": {
      "title": "Case Study: How *Garry Robinson* Produces\nHigh Quality Designs More Efficiently",
      "image": {
        "src": "/images/case-study/garry-robinson/gr-main-thump.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“I’m thrilled with the design service from Kimp. For me, using KIMP360 to manage design jobs and having an overlap in time zone for working hours makes the process far more productive. Well done Kimp! I’m a huge fan. Highly recommend it.”",
      "name": "Garry Robinson",
      "role": "Facebook Advertising Expert & Copywriter"
    },
    "about": {
      "title": "What has been the impact of working with *Kimp* for Garry Robinson’s Advertising Agency?",
      "paragraphs": [
        "Garry Robinson is a Facebook Advertising Expert and Copywriter based in Sydney, Australia. His Social Media Advertising Agency focuses on fixing 3 of the biggest pain points that coaches and online course creators alike face when advertising on social media: the high costs of getting started, the complexity of targeting the right audience, and the confusion around what kind of messaging to include in ads.",
        "To help address these challenges, and make a positive return on their marketing investment, Garry creates advertising campaigns that help his clients grow their mailing list, increase registrations for webinars or live events, sell books or online courses, launch a new product or coaching program, generate sales or consulting appointments, and/or add new subscribers to membership sites."
      ],
      "image": {
        "src": "/images/case-study/garry-robinson/gr-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*Garry Robinson* need help solving?",
      "paragraphs": [
        "Garry was looking for a professional and reliable design team that could quickly scale up or down in response to his workload. He needed a responsive team with a workflow that could seamlessly integrate into his own."
      ],
      "image": {
        "src": "/images/case-study/garry-robinson/grnew-client-logo.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to solve Garry Robinson’s problem?",
      "lead": "Kimp was able to help Garry Robinson complete design projects more efficiently by:",
      "items": [
        "Providing high quality designs that take into account his preferences, reducing the need for revisions: “The quality of design is very good and the longer we work together, the more they understand what I like and what I don’t. This means less time wasted on revisions. It is reassuring to know that when the time comes, Kimp can handle the extra workload.”",
        "Helping Garry take the ongoing recruitment of designers off his to-do list and matching him with a Dedicated Design Team that provides him with ongoing support: “I don’t have to waste time hiring and managing my own team of designers. Kimp takes care of all that for me. My dedicated team manager is cheeky and cheerful which makes the process enjoyable for me.”",
        "Completing a wide range of design projects within a single month-to-month design subscription: “Kimp redesigned my company website and continues to produce attractive social media collateral for both my agency and my clients. They’ve also designed flyers, infographics and illustrations.”"
      ],
      "gallery": [
        {
          "src": "/images/case-study/garry-robinson/gr-banner-1.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        },
        {
          "src": "/images/case-study/garry-robinson/gr-banner-2.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Garry Robinson’s Advertising Agency?",
      "paragraphs": [
        {
          "text": "Garry’s found that working with Kimp has allowed him to produce high quality designs more efficiently than managing an in-house design team. And asked if he has any advice for potential clients he said:",
          "quote": false
        },
        {
          "text": "“Designers are not mind-readers. Take a little time up front to explain exactly what you want and it will save hours or even days in revisions later. Using a basic image capture and editing tool to visually markup and edit designs saves even more time.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/nava-wilson/",
    "next": "/case-study/smile-fred/"
  },
  {
    "slug": "how-igloo-met-all-of-its-design-requirements-with-a-single-subscription",
    "path": "/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/",
    "hero": {
      "title": "Case Study: How *Igloo* Met All of Its Design Requirements With\nA Single Subscription",
      "image": {
        "src": "/images/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/banner.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“We need a mix of graphic design and video editing works, so Kimp’s affordable pricing allows us to produce designs based on our brand guidelines at scale for our various markets.”",
      "name": "Vance Wong",
      "role": "Regional Growth & Brand Marketing Manager"
    },
    "about": {
      "title": "What type of business is *Igloo?*",
      "paragraphs": [
        "Igloo is a Singapore-headquartered, regional full-stack insurtech that focuses on providing affordable and accessible insurance to everyone regardless of their socio-economic status. Igloo currently operates in Singapore, Indonesia, Malaysia, Thailand, Vietnam and the Philippines.",
        "Igloo is a credible business backed by global investors, a proven track record through strategic partnerships, and supported by a leadership team with both regional and local experience from various industries.",
        "Understanding their customers’ pain points in the insurance space, and providing relevant solutions through Igloo’s partners has been key to our success."
      ],
      "image": {
        "src": "/images/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/igloo-logo-one.webp",
        "width": 580,
        "height": 322,
        "alt": ""
      }
    },
    "problem": {
      "title": "What challenge did\n*Igloo* need help solving?",
      "paragraphs": [
        "“We used to work with freelance designers but their turnaround time is usually dependent on their pipeline and schedule. KIMP offers design support every business day, so resources are predictable and we can plan our marketing activities effectively.",
        "I learned about Kimp through a search on Google and did some research about the background, went through a demo, and trial before deciding. The important factors were resource predictability, quality, price, and adherence to brand guidelines. Kimp checks all those boxes.”"
      ],
      "image": {
        "src": "/images/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/solving.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* help Igloo address their challenges?",
      "lead": "KIMP was able to meet Igloo’s design needs effectively by:",
      "items": [
        "Matching the Igloo team with a dedicated project manager and design team so that there was continuity in the workflow, and pertinent information about briefs and design requests did not need to be repeated.",
        "Creating value and efficiences which have led to savings in time and money.",
        "Providing a design team of graphic designers and video editors, ensuring that all design requirements can be met, at an affordable price.",
        "Allowing for a wide range of design projects to be completed for a flat fee including: slide decks, motion graphic videos (lottie animations), brochures, and social media graphics."
      ],
      "gallery": [
        {
          "src": "/images/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/lgloo-banner-1.webp",
          "width": 640,
          "height": 676,
          "alt": ""
        },
        {
          "src": "/images/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/lgloo-banner-2.webp",
          "width": 640,
          "height": 676,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *KIMP* for Igloo?",
      "paragraphs": [
        {
          "text": "“Higher output of good quality designs compared to all our previous freelance designers is the single most powerful impact. Others include time saved writing briefs to different designers, saving money on hiring multiple freelancers, and engaging video editors.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "tips": {
      "title": "Tips from *Igloo* for New Clients",
      "paragraphs": [
        "“Don’t spend time researching too much. Just get on a call and go through the demo and trial with KIMP at no risk.”"
      ]
    },
    "prev": "/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/",
    "next": null
  },
  {
    "slug": "how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp",
    "path": "/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/",
    "hero": {
      "title": "Case Study: How *Nomos* Found An Experienced and Reliable\nDesign Solution With KIMP",
      "image": {
        "src": "/images/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/nomos-banner.webp",
        "width": 3616,
        "height": 1876,
        "alt": ""
      },
      "quote": "“I think the value of a service like KIMP is really a function of how clients use it. If a client has clarity about what they need, and are able to put together clear and specific briefs based on a solid creative direction, the service works excellently well.”",
      "name": "Namit Oberoy",
      "role": "Nomos"
    },
    "about": {
      "title": "What type of business is\n*Nomos?*",
      "paragraphs": [
        "\"We are a brand communications and storytelling agency that works with innovators and changemakers who have a bold vision for their field, but whose ideas struggle to find the right expression. We give voice to their ideas by crafting overarching narratives that give context to individual stories, creating messaging strategies and frameworks, and then acting as facilitators throughout the process to make sure their ideas are conveyed with clarity, consistency, and heart.\""
      ],
      "image": {
        "src": "/images/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/nomos-logo-one.webp",
        "width": 550,
        "height": 142,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*Nomos* need help solving?",
      "paragraphs": [
        "\"We approached KIMP for our visual identity and website development. We had a pretty good idea of the creative direction, and needed an experienced, reliable, professionally managed design team to bring our vision to life.",
        "As a two-person team at the time, we were not ready to take design execution in-house. We wanted to keep things lean and nimble so that we could focus our time and attention towards client development and execution. Being able to outsource discrete design needs to Kimp on as-needed basis helped us find that crucial balance.\""
      ],
      "image": {
        "src": "/images/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/solving.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address Nomos’ problem?",
      "lead": "KIMP was able to help Nomos by:",
      "items": [
        "Offering the design-as-a-subscription service model in a manner that strikes the perfect middle path between hiring in-house vs. outsourcing to an agency or contractors.",
        "Matching Nomos up with a reliable and trustworthy Project Manager. “We have come to have a high level of trust in KIMP. A huge part of that trust is coming from how Sandra, our project manager, addresses our requests. She always acknowledges our comments with immediacy, clarity and precision, comes back and summarises what she has understood which gives us the confidence that we are being understood at every step.”",
        "Ensuring Nomos had an experienced, dependable design team to work with:\n“We also really appreciate having a friendly team and a consistent designer to work on our brand.”",
        "Providing KIMP360, a critical tool to help increase trust and collaboration.\n“The platform Kimp360 also plays a critical role in increasing that level of trust and collaboration. We’ve found it to be flawless for our use cases while working collaboratively as a team — a platform like this is very liberating for clients because we are not always dependent on others and can self-serve our needs. They’ve thought through every single need and detail of the client and we are so very grateful for it.”",
        "Helping in creating stylescapes and moodboards that visualised the Nomos brand in unique, distinctive ways, while still being true to the brief at every step.\n“These were put together beautifully, and gave us a lot of clarity about the visual language we wanted to go ahead with. We then took KIMP’s help in creating our brand’s identity based on the finalised stylescape which has been a highly satisfying experience so far.”"
      ],
      "gallery": [
        {
          "src": "/images/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/nomos-banner-1.webp",
          "width": 919,
          "height": 582,
          "alt": ""
        },
        {
          "src": "/images/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/nomos-banner-2.webp",
          "width": 918,
          "height": 582,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Nomos?",
      "paragraphs": [
        {
          "text": "“We have saved a ton of time. Outsourcing design to KIMP has given us more time to focus on strategic aspects that deserve a lot of our personal attention. The quality of designs that Kimp delivers is also top-notch, professionally done, and done with consistency. This has also led to fewer revisions that we initially expected.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "tips": {
      "title": "Tips from *Nomos* for new KIMP clients",
      "paragraphs": [
        "“I’d suggest having a dedicated person inside your organisation who understands your brand well and confidently holds the vision, so that there is consistency in the briefs and therefore the design output. I suppose it also makes the Kimp team’s life easier.",
        "We also find value in planning our requests in batches, and then going on to line them up in the “Drafts” queue in one go. This way we can move on with other work without dependencies being created for us or for the Kimp team.”"
      ]
    },
    "prev": "/case-study/search-engine-wizards/",
    "next": "/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/"
  },
  {
    "slug": "nava-wilson",
    "path": "/case-study/nava-wilson/",
    "hero": {
      "title": "Case Study: How *Nava Wilson* Expanded Its Marketing\nWith A Dedicated Design Team",
      "image": {
        "src": "/images/case-study/nava-wilson/nava-wilson-big.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“Kimp is very quick to ensure that we get all of our marketing needs served on time, to the quality that we need, and in a very effective manner.”",
      "name": "Kubes Nava",
      "role": "Managing Partner, Nava Wilson LLP"
    },
    "about": {
      "title": "What type of business is\n*Nava Wilson LLP?*",
      "paragraphs": [
        "Nava Wilson LLP is a law firm in Toronto, Ontario, providing services in Real Estate, Corporate Law, and Litigation. The firm is committed to increasing access to, and awareness of, the justice system. And it does this by increasing its clients’ and communities’ knowledge of their legal rights and responsibilities.",
        "Legal processes are constantly evolving and are often a part of particularly significant and/or challenging circumstances. Recognizing this, Nava Willson LLP strives to make them transparent and accessible, while advocating on behalf of those they represent."
      ],
      "image": {
        "src": "/images/case-study/nava-wilson/navawilson-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*Nava Wilson LLP* need help solving?",
      "paragraphs": [
        "Nava Wilson LLP needed a graphic design service that could support its team with launching new marketing initiatives. They needed a service that could produce on brand marketing creatives."
      ],
      "image": {
        "src": "/images/case-study/nava-wilson/avawilson-client-logo.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to solve Nava Wilson LLP’s problem?",
      "lead": "Kimp was able to help Nava Wilson LLP with launching their brand in a memorable way by:",
      "items": [
        "Providing a dedicated design team and a streamlined project management platform (KIMP360) through which their staff could all make and manage design requests.",
        "Offering design services through a consistent workflow and at a flat monthly fee, to allow the Nava Wilson LLP team to be able to plan ahead and effectively collaborate in the design process.",
        "Providing multiple concepts for designs as needed so that the Nava Wilson LLP team could A/B test their campaigns on an ongoing basis.",
        "Supporting the development and expansion of Nava Wilson LLP’s branding collateral, so that they could consistently brand all of the touchpoints their clients had.",
        "Ensuring responsive customer service so that the Nava Wilson LLP team could scale up or down their subscriptions as they needed through different marketing campaigns."
      ],
      "gallery": [
        {
          "src": "/images/case-study/nava-wilson/navawilson-banner-1.webp",
          "width": 1264,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Nava Wilson LLP?",
      "paragraphs": [
        {
          "text": "Nava Wilson LLP has been able to launch new marketing campaigns and consistently do so with the support of their dedicated design team. They’ve also been able to expand their marketing efforts for each of their portfolios (i.e. legal services in corporate law, real estate law, and litigation).",
          "quote": false
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/big-results/",
    "next": "/case-study/garry-robinson/"
  },
  {
    "slug": "paragon-well-being",
    "path": "/case-study/paragon-well-being/",
    "hero": {
      "title": "Case Study: How *Paragon Well-Being* Is Elevating\nTheir Branding With A Dedicated Design Team",
      "image": {
        "src": "/images/case-study/paragon-well-being/paragon-big.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“I can say that the quality of their work is spot-on. They always hit the nail on the head by delivering our design needs.”",
      "name": "Joe Villegas",
      "role": "CEO, Paragon Well-Being"
    },
    "about": {
      "title": "What type of business is\n*Paragon Well-Being*?",
      "paragraphs": [
        "Paragon Well-Being is a corporate wellness company providing software and other services to companies that are interested in improving their overall employee experience.",
        "87% of employees are disengaged. These employees are suffering from poor workplace culture, work-related stress, and overall health issues. Paragon Well-Being provides a platform with content and resources that promote employee health, well-being, company involvement, and engagement. Use of their platform results in engaged employees, high quality culture, healthier employees, and reduced employee stress."
      ],
      "image": {
        "src": "/images/case-study/paragon-well-being/paragon-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*Paragon Well-Being* need help solving?",
      "paragraphs": [
        "The Paragon Well-Being team had a clear vision of how they wanted their customers to perceive their brand. But they needed help bringing their branding vision to life. They sought out Kimp to get the graphic design support they needed to create their marketing materials."
      ],
      "image": {
        "src": "/images/case-study/paragon-well-being/paragon-client-logo.webp",
        "width": 1114,
        "height": 920,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address Paragon Well-Being’s problem?",
      "lead": "Kimp helped Paragon Well-Being address the problem they were facing by:",
      "items": [
        "Saving time with the help of a dedicated design team that completes tasks (e.g. PDF documents, Ebooks, social media posts and photos) for the Paragon Well-Being team.",
        "Offering a low-maintenance team that works independently. This allows the Paragon Well-Being team to delegate and then shift focus to other priority tasks.",
        "Offering effective communication and project management, as well as prompt updates.",
        "Employing effective branding and marketing solutions to bring the Paragon Well-Being brand to life.",
        "Making it easy to request designs and track the status of design requests through KIMP360, Kimp’s design project management software.",
        "Providing quick turnaround times and quality designs, as well as promptly addressing edit requests with appropriate and creative modifications."
      ],
      "gallery": [
        {
          "src": "/images/case-study/paragon-well-being/paragon-banner1.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        },
        {
          "src": "/images/case-study/paragon-well-being/paragon-banner2.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* For Paragon Well-Being?",
      "paragraphs": [
        {
          "text": "Paragon Well-Being has been able to complete projects that meet their design needs and bring their brand to life with the support of Kimp. Working with a dedicated design team has allowed them to get quality designs completed within their project timelines, without having to spend a great deal of time managing their design requests. Paragon Well-Being’s CEO shared that:",
          "quote": false
        },
        {
          "text": "“Kimp.io’s workflow has always been commendable. There’s never been a time when they haven’t addressed our requests for edits or information — they’re just really easy to work with.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/social-vizion-media/",
    "next": "/case-study/big-results/"
  },
  {
    "slug": "rzone-fitness",
    "path": "/case-study/rzone-fitness/",
    "hero": {
      "title": "Case Study: How *RZone Fitness* Has Increased Brand Awareness\nWith Enticing Designs",
      "image": {
        "src": "/images/case-study/rzone-fitness/rzone-main-thump.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“What stands out is their design and the speed that they could return the design. They responded to feedback and made edits quickly, typically within a few hours. Additionally, their costs offer a lot of value for your money.”",
      "name": "Glenn Greer",
      "role": "Co-Owner RZone Fitness"
    },
    "about": {
      "title": "What type of business is\n*RZone Fitness?*",
      "paragraphs": [
        "RZone Fitness offers “The Ultimate Workout For Women”. It’s a women’s only fitness club, created to empower women who are seeking a more fit life. They serve clients ranging from age 14 and up, and offer group training that integrates cardio and strength training.",
        "With 4 locations in Florida, at Coral Gables, Pinecrest, Doral and Miami, RZone offers the support to be successful that women don’t always find in traditional, mainstream membership clubs. Their inclusive environment is open to beginner, intermediate, and advanced exercisers. And their studio spaces create a community-like atmosphere."
      ],
      "image": {
        "src": "/images/case-study/rzone-fitness/rzone-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*RZone Fitness* need help solving?",
      "paragraphs": [
        "RZone Fitness needed help to increase brand awareness and promote their new RZone location through graphic design."
      ],
      "image": {
        "src": "/images/case-study/rzone-fitness/rzone-client-logo.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address RZone Fitness’ problem?",
      "lead": "Kimp helped RZone fitness gear up their graphic design production through:",
      "items": [
        "A cost-effective design solution that provided a lot of value for the work the projects they needed to have completed.",
        "A quick and easy onboarding process and easy to use project management platform, KIMP360.",
        "Reliable support from a dedicated design team, including RZone Fitness’ Project Manager who was their main point of contact.",
        "Seamless communication via KIMP360 and email, as well as occasional calls to discuss projects.",
        "A variety of graphic design services to meet RZone Fitness’ marketing and promotional goals. These included designs for email and print communications.",
        "Designs that supported marketing campaigns by expressing RZone Fitness’ company mission and enticing people to become members."
      ],
      "gallery": [
        {
          "src": "/images/case-study/rzone-fitness/rzone-banner-1.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        },
        {
          "src": "/images/case-study/rzone-fitness/rzone-banner-2.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* For RZone Fitness?",
      "paragraphs": [
        {
          "text": "RZone Fitness was able to effectively run their marketing campaigns and attract new clients by working with Kimp to get their designs done. By working with Kimp RZone Fitness was able to give their target audience a good understanding of what they do and what sets them apart from other fitness studios.",
          "quote": false
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/bdyc/",
    "next": "/case-study/bdyc/"
  },
  {
    "slug": "search-engine-wizards",
    "path": "/case-study/search-engine-wizards/",
    "hero": {
      "title": "Case Study: How *Petteri Pucilowski* Meets Diverse\nDesign Demands With KIMP",
      "image": {
        "src": "/images/case-study/search-engine-wizards/pat-big.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“Working with my KIMP team has been a delight. They usually get the designs right on the first attempt, which eliminates the need for a lot of back-and-forth revisions. This efficiency makes the entire process very easy for us and significantly streamlines our workflow.”",
      "name": "Petteri Pucilowski",
      "role": "CEO of Search Engine Wizards and HerSecret.fi"
    },
    "about": {
      "title": "What type of business is\n*Search Engine Wizards?*",
      "paragraphs": [
        "Search Engine Wizards is an SEO agency dedicated to helping businesses improve their online visibility and search engine rankings. Their target audience includes small to medium-sized enterprises (SMEs) looking to enhance their digital presence. They offer a range of services, including keyword research, on-page and off-page SEO, content creation, and performance analytics. Their goal is to drive organic traffic and increase conversions for their clients",
        "Search Engine Wizards differentiates themselves through a data and AI-driven approach to SEO. They leverage the latest tools and techniques to provide customized solutions for their clients. Their unique selling proposition lies in their ability to deliver measurable results, helping businesses achieve their digital marketing goals. Search Engine Wizards focuses on building long-term relationships with their clients by providing transparent and effective SEO strategies"
      ],
      "image": {
        "src": "/images/case-study/search-engine-wizards/type-of-biz-pat.webp",
        "width": 904,
        "height": 886,
        "alt": ""
      }
    },
    "problem": {
      "title": "What challenge did\n*Petteri* need help addressing for Search Engine Wizards?",
      "paragraphs": [
        "The challenge Petteri was trying to address with KIMP was the constant need for graphic design across his two businesses (Search Engine Wizards and HerSecret.fi) and for his agency's clients. With multiple projects requiring design work simultaneously, he needed a reliable and efficient solution to meet these diverse design demands without compromising on quality or timeliness."
      ],
      "image": {
        "src": "/images/case-study/search-engine-wizards/pat-solve.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address Search Engine Wizards’ challenge?",
      "lead": "Working with KIMP has created significant value for Search Engine Wizards in several ways:",
      "items": [
        "Increased Design Capacity: KIMP has provided them with an abundance of graphics they can use in their online publications and social media channels. This has greatly expanded their design capacity without the need to hire additional in-house designers.",
        "Time Savings: With KIMP handling their design needs, Search Engine Wizards can focus on other critical aspects of the business, saving considerable time that would otherwise be spent on design tasks.",
        "Cost-Effectiveness: The flat-rate subscription model has proven to be more cost-effective than hiring freelancers or full-time designers, especially given the volume of designs they require.",
        "Consistent Quality: Having a dedicated design team ensures that they maintain a consistent brand image across all their materials, which is crucial for building brand recognition.",
        "A Variety of Design Services: Search Engine Wizards has focused on creating social media templates and designs but recently also started to get into website design and other more comprehensive design tasks."
      ],
      "gallery": [
        {
          "src": "/images/case-study/search-engine-wizards/pat-banner-1.webp",
          "width": 919,
          "height": 582,
          "alt": ""
        },
        {
          "src": "/images/case-study/search-engine-wizards/pat-banner-2.webp",
          "width": 918,
          "height": 582,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Petteri and Search Engine Wizards?",
      "paragraphs": [
        {
          "text": "“We've seen a tangible impact from working with KIMP in terms of our publication efficiency. By always having designs ready for all of our publications, we're now able to publish them approximately a day earlier than before. This improvement in our workflow has allowed us to be more responsive to current events and trends.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "tips": {
      "title": "Tips from *Petteri* for new KIMP clients KIMP",
      "paragraphs": [
        "“It helps to have a few tasks waiting in the requests pipeline - so that there is always something for the Kimp team to work on. This approach maximizes the value of your subscription and ensures a constant flow of design work.”"
      ]
    },
    "prev": "/case-study/wgan/",
    "next": "/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/"
  },
  {
    "slug": "smile-fred",
    "path": "/case-study/smile-fred/",
    "hero": {
      "title": "Case Study: How *Smile Fred* Is Growing A Small\nBusiness With A Kimp Design Team",
      "image": {
        "src": "/images/case-study/smile-fred/sf-main-thump.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“If you want good quality graphic design with amazing turnaround times for delivery, please give the Kimp service a try, you won't be disappointed.”",
      "name": "Wayne Hamlet",
      "role": "Owner, Smile Fred"
    },
    "about": {
      "title": "What type of business is\n*Smile Fred?*",
      "paragraphs": [
        "Smile Fred offers the ability to select a greeting card, type in your personal message and then have the card delivered in the mail to anywhere in the world. The company makes standard cards for consumers for all occasions as well as custom designed corporate cards for businesses wanting to send clients thank you cards, staff birthday cards, etc.",
        "In a business world growing more and more impersonal, Smile Fred believes that it’s never been more important to bring a personal touch to your relationship with clients. And they provide a creative and personalized way to do this."
      ],
      "image": {
        "src": "/images/case-study/smile-fred/sf-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*Smile Fred* need help solving?",
      "paragraphs": [
        "As a start up business Smile Fred has very limited funds for bulk graphic design. But that’s exactly what they need to create custom designed greeting cards for consumers and corporate clients. In addition to needing a cost-effective solution, Smile Fred also needed an efficient way in which to get their designs done so that they could keep up with their existing clients and engage new clients as well."
      ],
      "image": {
        "src": "/images/case-study/smile-fred/sfnew-client-logo.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address Smile Fred’s problem?",
      "lead": "Kimp was able to help the Smile Fred team scale up their design capacity by:",
      "items": [
        "Providing custom designs for a new set of cards on a daily basis for a flat fee, as part of a flexible month-to-month subscription.",
        "“I love the way I can have a new set of cards designed everyday with Kimp for the cost of 1 normal job with a standard graphic design company. This allows me to receive around 20 Graphic Design jobs a month which is perfect for our style of business.”",
        "Matching Smile Fred up with a Dedicated Design Team that has gotten to know their brand and vision, leading to fewer revisions and more design projects being completed, on scope and on brand.",
        "“Working together with our account manager Sheina, we have struck up a good working partnership, where she now delivers the style of graphics we need each day. Very little has to be redone and the system has been working well.”",
        "Offering a wide range of design services within a single, flat-rate subscription, making all of the designs needed to launch and scale a small business more accessible.",
        "“We started designing all our Smile Fred graphics to complete our shopify store at Smilefred.com. Once completed, we then moved onto creating graphics for our customers, who have been delighted with the corporate card designs.”"
      ],
      "gallery": [
        {
          "src": "/images/case-study/smile-fred/sf-banner-1.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        },
        {
          "src": "/images/case-study/smile-fred/sf-banner-2.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Smile Fred?",
      "paragraphs": [
        {
          "text": "The Smile Fred team has been able to grow their business more efficiently with their Kimp design subscription:",
          "quote": false
        },
        {
          "text": "“Our customers think we are bigger than we actually are because of our fast turnaround time. When a new customer requests a set of card designs, we can provide their graphics in 1 to 2 days. This is really helping us grow our small business simply because of the fast turnaround time compared to normal graphic design companies.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/garry-robinson/",
    "next": "/case-study/wgan/"
  },
  {
    "slug": "social-vizion-media",
    "path": "/case-study/social-vizion-media/",
    "hero": {
      "title": "Case Study: How *Social Vizion Media* Found A\n5-Star\nSolution To Scale Their Business",
      "image": {
        "src": "/images/case-study/social-vizion-media/sv-main-thump.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“I’ve received several five-star reviews after collaborating with Kimp.io on a project. My clients are usually very happy with their first design and they don’t need to revise anything.”",
      "name": "Frank Anthony,",
      "role": "Owner, Social Vizion Media"
    },
    "about": {
      "title": "What type of business is\n*Social Vizion Media?*",
      "paragraphs": [
        "Social Vizion Media is a digital marketing and branding agency based out of Philadelphia, Pennsylvania. The agency’s services focus on helping its clients grow their digital presence. And “offers digital solutions for entrepreneurs, by entrepreneurs”.",
        "Social Vizion Media’s suite of digital solutions includes web design and maintenance, social media marketing and ad campaigns, social media content, and bespoke marketing plans. The agency also offers its clients a wide range of print and digital graphic design services, with flexible packages that can be selected based on their needs."
      ],
      "image": {
        "src": "/images/case-study/social-vizion-media/sv-type-of-biz.webp",
        "width": 1114,
        "height": 1092,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\n*Social Vizion Media* need help solving?",
      "paragraphs": [
        "Social Vizion Media was looking for a partner to work with to build the capacity to scale their operations. They were interested in outsourcing designs but in a quality controlled environment."
      ],
      "image": {
        "src": "/images/case-study/social-vizion-media/sv-client-logo.webp",
        "width": 1114,
        "height": 920,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address Social Vizion Media’s problem?",
      "lead": "Kimp was able to help Social Vizion Media scale their operations by:",
      "items": [
        "Offering a free trial which allowed Social Vizion Media to test out the capabilities of the service in terms of collaboration and design styles.",
        "Matching up Social Vizion Media with a design team that worked on a shift that overlapped with their business hours, allowing for more collaboration.",
        "Providing efficient project management and communication through a streamlined workflow in the KIMP360 design project management software.",
        "Taking brand guidelines from one of Social Vizion Media’s clients and helping to replicate and streamline processes for 15 additional clients within the same niche.",
        "Providing print and digital design services that helped Social Vizion Media scale their ability to serve their clients. These services included simple social media designs for Facebook, Instagram, and LinkedIn, more complex brochures and business signage, as well as billboards, logo designs, and full branding kits for clients.",
        "Ensuring effective communication and project management through a dedicated design team, with a responsive Project Manager."
      ],
      "gallery": [
        {
          "src": "/images/case-study/social-vizion-media/sv-banner-1.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        },
        {
          "src": "/images/case-study/social-vizion-media/sv-banner-2.webp",
          "width": 632,
          "height": 670,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Social Vizion Media?",
      "paragraphs": [
        {
          "text": "Social Vizion Media’s Owner Frank Anthony shared that working with Kimp has made his life easier. While his dedicated design team focused on the designs he needed done, he was able to focus on his other responsibilities and devote more time to them.",
          "quote": false
        },
        {
          "text": "“In the past, I’ve spent too much time and money trying to find a partner that provided the quality of work I needed. They’d offer a reasonable price, but then their quality declined.”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/bdyc/",
    "next": "/case-study/paragon-well-being/"
  },
  {
    "slug": "wgan",
    "path": "/case-study/wgan/",
    "hero": {
      "title": "Case Study: How *Dan Smigrod* Upgraded the\nWGAN brand’s Visual Identity With Kimp",
      "image": {
        "src": "/images/case-study/wgan/smigrod-big.webp",
        "width": 1808,
        "height": 938,
        "alt": ""
      },
      "quote": "“In the last 12 months, Kimp has created 500+ digital assets for WGAN (including for our clients/prospective clients). By creating a professional “look” to all WGAN brand assets has enabled us to attract more and larger clients.”",
      "name": "Dan Smigrod",
      "role": "Founder & CEO, We Get Around Network"
    },
    "about": {
      "title": "What type of business is the\n*We Get Around Network (WGAN)?*",
      "paragraphs": [
        "WGAN connects virtual tour buyers to real estate photographers powered by the most in-depth, relevant and up-to-date content and training for the virtual tour community.",
        "Founded in 2014, the We Get Around Network Forum is the world’s largest knowledge base of its kind (90,000 posts among 15,000 topics). Each month, the WGAN Forum is viewed by 19,000 WGAN members and guests in 140+ countries."
      ],
      "image": {
        "src": "/images/case-study/wgan/an-type-of-biz.webp",
        "width": 601,
        "height": 635,
        "alt": ""
      }
    },
    "problem": {
      "title": "What problem did\nDan need help solving for *WGAN?*",
      "paragraphs": [
        "For around 10 years Dan had been working on growing WGAN through text-based content, and DIY design, alone. But he was limited to his knowledge of, and experience with, design.\n“Before I engaged Kimp in April 2022, WGAN members, visitors, friends and family unanimously agreed that\n“my baby” was ugly. And, I thought so too.” While the forum grew at an impressive pace, Dan knew that to tap into new business opportunities and to\ngrow further, he’d need to enlist the support of a design service."
      ],
      "image": {
        "src": "/images/case-study/wgan/an-new-client-logo.webp",
        "width": 354,
        "height": 347,
        "alt": ""
      }
    },
    "solution": {
      "title": "How was *Kimp* able to address Dan’s problem?",
      "lead": "Kimp was able to help Dan upgrade the WGAN’s visual identity by:",
      "items": [
        "Matching him up with a Dedicated Design Team, with a Project Manager as a single point of contact, making it easier to make and manage design requests.",
        "Providing access to KIMP360, an easy to manage dashboard, to make design requests (i.e. providing Kimp with graphic design art direction and feedback and collaborate with his Dedicated Design Team.",
        "Redesigning the WGAN icon and logotype and optimizing it for different placements, including various social media such as Facebook, Twitter, YouTube, Vimeo and many others.",
        "Creating a brand style guide based on the branding designed by Kimp to ensure consistency across future projects and easier, more efficient communication with the Project Manager.",
        "Creating branding for WGAN’s various content categories, such as the WGAN podcast, WGAN ebooks, WGAN Training Academy, and ensuring they were consistent with the overall WGAN brand.",
        "Developing efficient workflows tailored to Dan’s needs, to deliver designs consistently needed on a weekly and/or monthly basis, such as video thumbnail designs and ebook designs."
      ],
      "gallery": [
        {
          "src": "/images/case-study/wgan/an-banner-1.webp",
          "width": 548,
          "height": 436,
          "alt": ""
        },
        {
          "src": "/images/case-study/wgan/an-banner-2.webp",
          "width": 548,
          "height": 436,
          "alt": ""
        }
      ]
    },
    "impact": {
      "title": "What has been the impact of working with *Kimp* for Dan and WGAN?",
      "paragraphs": [
        {
          "text": "Dan has been able to revamp WGAN’s visual identity and branding with his Kimp design subscription:",
          "quote": false
        },
        {
          "text": "“I have been so happy with Kimp for all our graphic designs needs that I reached out to the Kimp Founder to ask how I could help Kimp (which resulted in this case study).”",
          "quote": true
        }
      ],
      "image": {
        "src": "/images/case-study/cs-illustration1.webp",
        "width": 1180,
        "height": 1030,
        "alt": ""
      }
    },
    "prev": "/case-study/smile-fred/",
    "next": "/case-study/search-engine-wizards/"
  }
];
