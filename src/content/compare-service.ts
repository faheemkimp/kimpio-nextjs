/**
 * /compare-service/ ("Kimp vs. Others") copy, extracted verbatim from the live
 * page (WordPress template "template-compare"). Generated from the live HTML,
 * then kept by hand; edit text here, not in components.
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, description, robots,
 * canonical, OG and schema come from Yoast for this exact URL. Headings mirror
 * live: <h1> hero; <h2> ratings, quick comparison, testimonials, alternatives,
 * quiz, FAQs and closing panel; <h3> "Why smart businesses choose KIMP" per
 * rival, quiz results and "Still have some questions?"; <h4> FAQ questions;
 * <h6> rating figures and "GET STARTED".
 */

import type { FaqItem } from "@/content/graphic-design-services";

export const PATH = "/compare-service/";

export const CS_HERO = {
  ...{
  "title": "Find the right unlimited design service for your business",
  "intro": "Choosing an unlimited design service isn’t just about price. Turnaround time, design quality, active requests, free trial, dedicated design support and integrations can make a much bigger difference over time.",
  "buttons": [
    {
      "label": "Take the 60-second quiz",
      "href": "#design-workflow-quiz"
    },
    {
      "label": "See the full comparison",
      "href": "#full-comparison"
    }
  ],
  "meta": [
    "Sign up in 2 minutes",
    "7-day free trial",
    "Cancel any time",
    "No contracts"
  ],
  "trust": "Kimp.io is trusted by over 5,000 businesses of all sizes every day.",
  "logos": [
    {
      "alt": "Abbott",
      "src": "/images/clients/abboott.svg",
      "width": 168,
      "height": 45
    },
    {
      "alt": "Aldi",
      "src": "/images/clients/aldi.svg",
      "width": 169,
      "height": 67
    },
    {
      "alt": "Londonreal",
      "src": "/images/clients/client_logo3.svg",
      "width": 130,
      "height": 24
    },
    {
      "alt": "Decathlon",
      "src": "/images/clients/client_logo4.svg",
      "width": 130,
      "height": 28
    },
    {
      "alt": "Harley Davidson",
      "src": "/images/clients/client_logo5.svg",
      "width": 71,
      "height": 56
    },
    {
      "alt": "Youk",
      "src": "/images/clients/client_logo6.svg",
      "width": 125,
      "height": 40
    },
    {
      "alt": "Single Grain",
      "src": "/images/clients/client_logo8.svg",
      "width": 118,
      "height": 56
    },
    {
      "alt": "Universal",
      "src": "/images/clients/client_logo7.svg",
      "width": 88,
      "height": 56
    },
    {
      "alt": "One and One",
      "src": "/images/clients/client_logo9.svg",
      "width": 63,
      "height": 40
    },
    {
      "alt": "Targus",
      "src": "/images/clients/targus.svg",
      "width": 158,
      "height": 41
    }
  ]
},
  eyebrow: "Kimp vs. Others",
  /* Rendered with a line break before "for your business": same text as the live <h1>. */
  titleParts: { lead: "Find the right unlimited design service", highlight: "for your business" },
  marquee: ["Kimp vs. Others", "Design Pickle", "Penji", "ManyPixels", "Flocksy"],
  /** Master flying pose holding a balance scale tipped toward a star (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/compare.webp", width: 1448, height: 1086 },
} as const;

export type Rival = {
  id: string;
  name: string;
  caption: string;
  kimpTagline: string;
  rivalTagline: string;
  rows: { criteria: string; kimp: string[]; rival: string[] }[];
  why: { title: string; points: { title: string; body: string | null }[]; actions: { label: string; href: string }[] };
};

export const CS_COMPARE = {
  "id": "full-comparison",
  "eyebrow": "The Quick Comparison",
  "title": "Less than 10 things decide whether a subscription actually works",
  "intro": "Most services look identical on the pricing page. The difference shows up in what’s locked behind a higher tier. Here’s where every option stands.",
  "rivals": [
    {
      "id": "design-pickle",
      "name": "Design Pickle",
      "caption": "KIMP compared with Design Pickle",
      "kimpTagline": "Flat rate · dedicated team · parallel requests",
      "rivalTagline": "Custom hourly pricing · queue-based delivery",
      "rows": [
        {
          "criteria": "Plan Structure",
          "kimp": [
            "Straightforward, clearly tiered pricing based on your need (graphic design, motion graphics, or both).",
            "Core benefits stay consistent across all tiers. No feature gatekeeping by plan.",
            "No upfront guesswork required to pick a plan."
          ],
          "rival": [
            "Custom pricing based on individual requirements.",
            "Requires predicting daily hourly needs and monthly output volume upfront for an accurate quote.",
            "Scaling up design volume later often means purchasing more creative hours to keep pace."
          ]
        },
        {
          "criteria": "Team Structure",
          "kimp": [
            "Every plan includes a dedicated design team of 3 specialists covering different design types.",
            "A dedicated Project Manager is included at no extra cost on every plan, not just higher tiers."
          ],
          "rival": [
            "Production Coordinator only included starting at the 4-hour plan tier.",
            "Art Director access reserved exclusively for the 8+ hour tier.",
            "Entry-level plans (2–3 hours) come with no management support, unless paid for as a premium upgrade."
          ]
        },
        {
          "criteria": "Active Requests",
          "kimp": [
            "3 active requests with KIMP Graphics, 2 with KIMP Video, and 5 with KIMP Graphics + Video (3 graphic design + 2 video).",
            "The Graphics + Video plan runs separate workflows and turnaround times for graphics vs. video, so neither design type delays the other."
          ],
          "rival": [
            "Requests follow a queue model, handled one at a time based on priority.",
            "There are no parallel workflows for different request types."
          ]
        },
        {
          "criteria": "Video-only Plans",
          "kimp": [
            "Yes — KIMP Video is one of the most affordable motion graphics plans in the segment.",
            "Covers both motion graphics (3 min/request) and video editing (up to 1 hour/video)."
          ],
          "rival": [
            "No video-only option. Plans are priced for both graphic design and motion graphics combined.",
            "Motion graphics capped at 5 minutes; video editing capped at 30 minutes."
          ]
        },
        {
          "criteria": "Turnaround Time",
          "kimp": [
            "24 hours for most graphic design requests.",
            "2–4 business days for most motion graphics requests."
          ],
          "rival": [
            "Varies based on daily hours chosen and design complexity. No fixed turnaround times."
          ]
        },
        {
          "criteria": "Free Trial",
          "kimp": [
            "Yes, a 7-day free trial.",
            "Upgrade to a full subscription or cancel anytime during the trial."
          ],
          "rival": [
            "No free trial.",
            "Requires upfront payment based on an estimate before experiencing the process."
          ]
        },
        {
          "criteria": "Live Customer Support, 24/7",
          "kimp": [
            "Yes, accessible via live chat or email (info@kimp.io), 7 days a week."
          ],
          "rival": [
            "No 24/7 support — support is available 24/5 only."
          ]
        }
      ],
      "why": {
        "title": "Why smart businesses choose KIMP",
        "points": [
          {
            "title": "Parallel workflows mean zero bottlenecks.",
            "body": "With KIMP’s multiple active requests and parallel workflows, your marketing assets move forward independently of one another."
          },
          {
            "title": "You don’t have to upgrade your subscription or pay extra to bring in a project manager.",
            "body": "Every single plan includes a dedicated Project Manager and three specialized designers, giving you a full creative department without hidden fees."
          },
          {
            "title": "Full platform access with zero software fees.",
            "body": "All plans include full access to KIMP360 and the option to explore our AI-powered dashboard features that speed up your workflow. You do not pay extra to unlock exclusive platform features."
          },
          {
            "title": "What you see is exactly what you pay.",
            "body": "KIMP completely eliminates billing confusion with straightforward, predictable plans. You choose your plan, pay the flat rate and get to work — no hidden components, no confusion."
          }
        ],
        "actions": [
          {
            "label": "Start your free trial",
            "href": "/register-now/"
          },
          {
            "label": "See other options",
            "href": "#beyond-subscriptions"
          }
        ]
      }
    },
    {
      "id": "penji",
      "name": "Penji",
      "caption": "KIMP compared with Penji",
      "kimpTagline": "Flat rate · dedicated team · parallel requests",
      "rivalTagline": "Tiered plans · features gated by tier",
      "rows": [
        {
          "criteria": "Plan Structure",
          "kimp": [
            "Straightforward, clearly tiered pricing based on your need (graphic design, motion graphics, or both).",
            "Core benefits stay consistent across all tiers. No feature gatekeeping by plan.",
            "No upfront guesswork required to pick a plan."
          ],
          "rival": [
            "Tiered pricing across three plans: Business, Marketing & Ads, and Agency.",
            "Essential features like presentations, web design, and motion graphics are restricted to higher-priced tiers.",
            "Quality-controlled delivery is restricted to the highest tier."
          ]
        },
        {
          "criteria": "Team Structure",
          "kimp": [
            "Every plan includes a dedicated design team of 3 specialists covering different design types.",
            "A dedicated Project Manager is included at no extra cost on every plan, not just higher tiers."
          ],
          "rival": [
            "Dedicated design team only available with the highest tier.",
            "Art Director oversight also reserved exclusively for the highest tier."
          ]
        },
        {
          "criteria": "Active Requests",
          "kimp": [
            "3 active requests with KIMP Graphics, 2 with KIMP Video, and 5 with KIMP Graphics + Video (3 graphic design + 2 video).",
            "The Graphics + Video plan runs separate workflows and turnaround times for graphics vs. video, so neither design type delays the other."
          ],
          "rival": [
            "Just 1 active request on the Business plan.",
            "2 active requests on the Marketing & Ads plan.",
            "3 active requests on the Agency plan, the highest tier."
          ]
        },
        {
          "criteria": "Video-only Plans",
          "kimp": [
            "Yes — KIMP Video is one of the most affordable motion graphics plans in the segment.",
            "Covers both motion graphics (3 min/request) and video editing (up to 1 hour/video)."
          ],
          "rival": [
            "No video-only option. Motion graphics and short-form video editing are locked behind the highest tier only."
          ]
        },
        {
          "criteria": "Turnaround Time",
          "kimp": [
            "24 hours for most graphic design requests.",
            "2–4 business days for most motion graphics requests."
          ],
          "rival": [
            "Most simple requests take 1 day.",
            "Priority delivery only available with the highest tier."
          ]
        },
        {
          "criteria": "Free Trial",
          "kimp": [
            "Yes, a 7-day free trial.",
            "Upgrade to a full subscription or cancel anytime during the trial."
          ],
          "rival": [
            "No free trial.",
            "Requires upfront payment before experiencing the service."
          ]
        },
        {
          "criteria": "Live Customer Support, 24/7",
          "kimp": [
            "Yes, accessible via live chat or email (info@kimp.io), 7 days a week."
          ],
          "rival": [
            "No 24/7 support. Support is available via chat or email but hours are not specified."
          ]
        },
        {
          "criteria": "Brand Management",
          "kimp": [
            "Add unlimited brands with every plan. No restrictions."
          ],
          "rival": [
            "Unlimited brand support only available with the highest tier."
          ]
        }
      ],
      "why": {
        "title": "Why smart businesses choose KIMP",
        "points": [
          {
            "title": "KIMP’s plans are simple and confusion-free.",
            "body": "You don’t have to worry about upgrading your plan just to cover a few additional design types like presentations and illustrations."
          },
          {
            "title": "You don’t pay extra or move to a higher tier merely to unlock a dedicated design team or PM oversight.",
            "body": "Every single plan includes a dedicated design team and a project manager to keep your design workflow running smoothly."
          },
          {
            "title": "Manage as many brands as you need without upgrading.",
            "body": "Whether you are an agency juggling multiple clients or a business with several sub-brands, KIMP lets you add unlimited brand profiles across every single plan we offer."
          }
        ],
        "actions": [
          {
            "label": "Start your free trial",
            "href": "/register-now/"
          },
          {
            "label": "See other options",
            "href": "#beyond-subscriptions"
          }
        ]
      }
    },
    {
      "id": "manypixels",
      "name": "ManyPixels",
      "caption": "KIMP compared with ManyPixels",
      "kimpTagline": "Flat rate · dedicated team · parallel requests",
      "rivalTagline": "Output-based tiers · assigned designer or team",
      "rows": [
        {
          "criteria": "Plan Structure",
          "kimp": [
            "Straightforward, clearly tiered pricing based on your need (graphic design, motion graphics, or both).",
            "Core benefits stay consistent across all tiers. No feature gatekeeping by plan.",
            "No upfront guesswork required to pick a plan."
          ],
          "rival": [
            "4 tiered plans, with pricing varying based on desired daily output volume and whether you want an assigned designer or a full team.",
            "Essential features like Slack integration and real-time communication are reserved for higher tiers only."
          ]
        },
        {
          "criteria": "Team Structure",
          "kimp": [
            "Every plan includes a dedicated design team of 3 specialists covering different design types.",
            "A dedicated Project Manager is included at no extra cost on every plan, not just higher tiers."
          ],
          "rival": [
            "All plans include a Project Manager.",
            "Dedicated designers are only available on higher tiers."
          ]
        },
        {
          "criteria": "Active Requests",
          "kimp": [
            "3 active requests with KIMP Graphics, 2 with KIMP Video, and 5 with KIMP Graphics + Video (3 graphic design + 2 video).",
            "The Graphics + Video plan runs separate workflows and turnaround times for graphics vs. video, so neither design type delays the other."
          ],
          "rival": [
            "Just 1 active request on the Advanced plan.",
            "2 active requests on the Business plan (capped even at the higher tier)."
          ]
        },
        {
          "criteria": "Video-only Plans",
          "kimp": [
            "Yes — KIMP Video is one of the most affordable motion graphics plans in the segment.",
            "Covers both motion graphics (3 min/request) and video editing (up to 1 hour/video)."
          ],
          "rival": [
            "No standalone video plan.",
            "Video editing and motion graphics are excluded entirely from the entry-level tier, requiring an upgrade to access."
          ]
        },
        {
          "criteria": "Turnaround Time",
          "kimp": [
            "24 hours for most graphic design requests.",
            "2–4 business days for most motion graphics requests."
          ],
          "rival": [
            "Same-day delivery is reserved for the higher tiers."
          ]
        },
        {
          "criteria": "Free Trial",
          "kimp": [
            "Yes, a 7-day free trial.",
            "Upgrade to a full subscription or cancel anytime during the trial."
          ],
          "rival": [
            "No free trial.",
            "Requires choosing a plan and paying upfront before experiencing the service."
          ]
        },
        {
          "criteria": "Live Customer Support, 24/7",
          "kimp": [
            "Yes, accessible via live chat or email (info@kimp.io), 7 days a week."
          ],
          "rival": [
            "No 24/7 support. Support is available via chat or email but hours are not specified."
          ]
        }
      ],
      "why": {
        "title": "Why smart businesses choose KIMP",
        "points": [
          {
            "title": "With KIMP, you don’t pay extra for the essential components that ensure brand consistency, like a dedicated design team.",
            "body": "Every single plan includes dedicated creative support."
          },
          {
            "title": "Communicating with the team is easy.",
            "body": "All communication happens within KIMP360 with the additional option to create tasks and get real-time updates on Slack. You don’t have to upgrade to a higher tier to unlock these integrations."
          },
          {
            "title": "KIMP assigns you not just one designer but a whole team of designers who can work on multiple active requests simultaneously.",
            "body": "By running these workflows in parallel rather than one after another, you drastically increase your overall design output every single month."
          }
        ],
        "actions": [
          {
            "label": "Start your free trial",
            "href": "/register-now/"
          },
          {
            "label": "See other options",
            "href": "#beyond-subscriptions"
          }
        ]
      }
    },
    {
      "id": "flocksy",
      "name": "Flocksy",
      "caption": "KIMP compared with Flocksy",
      "kimpTagline": "Flat rate · dedicated team · parallel requests",
      "rivalTagline": "Hour-based pricing · queue-based delivery",
      "rows": [
        {
          "criteria": "Plan Structure",
          "kimp": [
            "Straightforward, clearly tiered pricing based on your need (graphic design, motion graphics, or both).",
            "Core benefits stay consistent across all tiers. No feature gatekeeping by plan.",
            "No upfront guesswork required to pick a plan."
          ],
          "rival": [
            "Hour-based pricing model. Monthly cost depends entirely on the number of daily creative hours purchased.",
            "The more daily hours needed, the higher the price."
          ]
        },
        {
          "criteria": "Team Structure",
          "kimp": [
            "Every plan includes a dedicated design team of 3 specialists covering different design types.",
            "A dedicated Project Manager is included at no extra cost on every plan, not just higher tiers."
          ],
          "rival": [
            "A dedicated team of designers is included.",
            "An Art Director is limited to 4+ daily hours.",
            "A Production Coordinator is only assigned at 6+ daily hours."
          ]
        },
        {
          "criteria": "Active Requests",
          "kimp": [
            "3 active requests with KIMP Graphics, 2 with KIMP Video, and 5 with KIMP Graphics + Video (3 graphic design + 2 video).",
            "The Graphics + Video plan runs separate workflows and turnaround times for graphics vs. video, so neither design type delays the other."
          ],
          "rival": [
            "Designs are handled one at a time in a queue, based on the priorities you set.",
            "No fixed number of active requests."
          ]
        },
        {
          "criteria": "Video-only Plans",
          "kimp": [
            "Yes — KIMP Video is one of the most affordable motion graphics plans in the segment.",
            "Covers both motion graphics (3 min/request) and video editing (up to 1 hour/video)."
          ],
          "rival": [
            "No standalone video plans for those times you need motion graphics support."
          ]
        },
        {
          "criteria": "Free Trial",
          "kimp": [
            "Yes, a 7-day free trial.",
            "Upgrade to a full subscription or cancel anytime during the trial."
          ],
          "rival": [
            "No free trial.",
            "Requires choosing daily creative hours and paying upfront before accessing the platform."
          ]
        },
        {
          "criteria": "Live Customer Support, 24/7",
          "kimp": [
            "Yes, accessible via live chat or email (info@kimp.io), 7 days a week."
          ],
          "rival": [
            "No 24/7 support. Support is available via chat or email but hours are not specified."
          ]
        }
      ],
      "why": {
        "title": "Why smart businesses choose KIMP",
        "points": [
          {
            "title": "KIMP completely eliminates daily hourly caps and offers a straightforward, predictable flat rate.",
            "body": null
          },
          {
            "title": "Professional project oversight shouldn’t be treated as an add-on.",
            "body": "KIMP automatically includes a dedicated Project Manager and a specialized three-person design team on every single plan at no extra cost."
          },
          {
            "title": "KIMP’s parallel workflow allows you to run multiple requests simultaneously.",
            "body": "So a revision request is not going to slow down your campaign assets."
          }
        ],
        "actions": [
          {
            "label": "Start your free trial",
            "href": "/register-now/"
          },
          {
            "label": "See other options",
            "href": "#beyond-subscriptions"
          }
        ]
      }
    }
  ]
} as { id: string; eyebrow: string; title: string; intro: string; rivals: Rival[] };

export type Testimonial = { name: string; initials: string; quote: string };

export const CS_TESTIMONIALS = {
  "id": "why-customers-prefer-kimp",
  "eyebrow": "Why customers prefer KIMP",
  "title": "They tried the others first",
  "intro": "Discover why teams switch to KIMP and learn how other services compare.",
  "rows": [
    [
      {
        "name": "Wealth Lab",
        "initials": "WL",
        "quote": "“I have worked with some other services like this and quite frankly. Kimp wins!...They're smart and able to work autonomously, which is great when you have big projects and need someone you can trust.”"
      },
      {
        "name": "Maddie",
        "initials": "M",
        "quote": "“They are creative, fast and efficient. I have worked with other companies similar to Kimp and Kimp is significantly better.”"
      },
      {
        "name": "Sarah",
        "initials": "S",
        "quote": "“After researching many \"unlimited graphic design\" subscription companies, I settled on trying out Kimp. Long story short, I was so happy with my first free trial design that I switched to a paid membership immediately, and haven't looked back.”"
      },
      {
        "name": "Jaz Zaruso",
        "initials": "JZ",
        "quote": "“AWESOME!! Unlimited revision is great! Our project manager really have great customer services! Compared to other services I have used. I don't think i would change to any other companies”"
      },
      {
        "name": "Gaia Lustina",
        "initials": "GL",
        "quote": "“The best design service we've tried so far. Editable source files and mockups are always provided in addition to the design piece, they have quality control in place, which was not the case for other design services we used.”"
      },
      {
        "name": "Mason Sterr",
        "initials": "MS",
        "quote": "“I'm a freelance marketing consultant that offers content strategies that also include deliveries of content with those strategies. I use Kimp to assist with backlog as well as developing the content for our strategies. The customer service is excellent. The designers and editors also stand-out amongst other \"unlimited\" service providers I've used in the past as well.”"
      },
      {
        "name": "Zach Roberson",
        "initials": "ZR",
        "quote": "“Best graphics company I've worked with. Kimp creates great designs, they are always extremely professional, quick, and even handle some requests that were a little much. If you're thinking about working with them…just do it. I've worked with 4 other major companies similar to Kimp - I can promise you the best quality, designers, and experience will be with Kimp!”"
      }
    ],
    [
      {
        "name": "Oliver",
        "initials": "O",
        "quote": "“We've tried several other unlimited design services in the past, but they often slow everything down—poor communication and long turnaround times mean you barely get anything done. Kimp, on the other hand, is the complete opposite. They're on it every single day, consistently delivering projects and responding to feedback efficiently.”"
      },
      {
        "name": "Meghan Han",
        "initials": "MH",
        "quote": "“I decided to try Kimp to offload the design burden I've had to handle myself. I’ve been impressed with their EXTREMELY quick turnaround times. It’s great that their designers work on x2 active requests at once, and they don’t have to wait for you to ‘approve’ a design before starting on the next. I highly doubt other companies offer this.”"
      },
      {
        "name": "Shaun Ganguly",
        "initials": "SG",
        "quote": "“Kimp have been absolutely amazing. I came to them after using another graphic design service and there is absolutely no comparison. All of my documents, logos and branding are consistent and look very professional. I will continue to use their services and recommend to other businesses also.”"
      },
      {
        "name": "Savi Marketing",
        "initials": "SM",
        "quote": "“Great call with punctual and relevant follow up, much better than other firms.”"
      },
      {
        "name": "Sarah Turner",
        "initials": "ST",
        "quote": "“I've been working with Kimp for over a year now and they are INCREDIBLE! Seriously, cannot thank them enough. The process, the end product, the communication along the way - it's all so so smooth. I wish other services I worked with were as good as Kimp.”"
      },
      {
        "name": "JC Lab",
        "initials": "JL",
        "quote": "“Excellent service. They turn around quality promo material for my agency. I will likely cancel a few other services since KIMP can handle the load.”"
      }
    ]
  ]
} as { id: string; eyebrow: string; title: string; intro: string; rows: Testimonial[][] };

export const CS_ALTERNATIVES = {
  "id": "beyond-subscriptions",
  "eyebrow": "Beyond subscriptions",
  "titleLines": [
    "KIMP vs Freelancers vs",
    "Traditional agencies vs AI tools"
  ],
  "intro": "Here’s how four design service models really compare once you account for the cost, ownership and ability to scale.",
  "caption": "KIMP compared with freelancers, traditional agencies and AI tools",
  "columns": [
    "Criteria",
    "KIMP",
    "Freelancers",
    "Traditional design agencies",
    "AI tools"
  ],
  "rows": [
    {
      "criteria": "Pricing",
      "cells": [
        {
          "text": "Flat monthly rate",
          "span": 1
        },
        {
          "text": "Hourly or project-based",
          "span": 1
        },
        {
          "text": "Hourly/project-based, and monthly retainers in some cases",
          "span": 1
        },
        {
          "text": "Per-seat subscription",
          "span": 1
        }
      ]
    },
    {
      "criteria": "Turnaround",
      "cells": [
        {
          "text": "24–48 hours",
          "span": 1
        },
        {
          "text": "Variable, based on the freelancer’s bandwidth",
          "span": 1
        },
        {
          "text": "Variable",
          "span": 1
        },
        {
          "text": "The first draft is instant. Refinement varies.",
          "span": 1
        }
      ]
    },
    {
      "criteria": "Revisions",
      "cells": [
        {
          "text": "Unlimited",
          "span": 1
        },
        {
          "text": "Limited",
          "span": 1
        },
        {
          "text": "Contract-bound",
          "span": 1
        },
        {
          "text": "Unlimited prompting, but no human guidance",
          "span": 1
        }
      ]
    },
    {
      "criteria": "Scope",
      "cells": [
        {
          "text": "Broad — graphic design and motion graphics",
          "span": 1
        },
        {
          "text": "Limited",
          "span": 1
        },
        {
          "text": "Limited",
          "span": 1
        },
        {
          "text": "Limited to what the tool can generate",
          "span": 1
        }
      ]
    },
    {
      "criteria": "Contract",
      "cells": [
        {
          "text": "None",
          "span": 1
        },
        {
          "text": "Yes",
          "span": 1
        },
        {
          "text": "Yes",
          "span": 1
        },
        {
          "text": "None",
          "span": 1
        }
      ]
    },
    {
      "criteria": "Workflow",
      "cells": [
        {
          "text": "Central dashboard (KIMP360)",
          "span": 1
        },
        {
          "text": "Scattered",
          "span": 1
        },
        {
          "text": "Often scattered, or through a client portal and email",
          "span": 1
        },
        {
          "text": "Self-managed prompting",
          "span": 1
        }
      ]
    },
    {
      "criteria": "Design Ownership",
      "cells": [
        {
          "text": "Full — source files included",
          "span": 1
        },
        {
          "text": "Available at extra cost in some cases",
          "span": 1
        },
        {
          "text": "Available at extra cost in some cases",
          "span": 1
        },
        {
          "text": "Files are yours, but often can’t be edited; usage rights vary by tool",
          "span": 1
        }
      ]
    },
    {
      "criteria": "Scaling Flexibility",
      "cells": [
        {
          "text": "Easy",
          "span": 1
        },
        {
          "text": "Difficult",
          "span": 1
        },
        {
          "text": "Expensive",
          "span": 1
        },
        {
          "text": "Depends on your own design skill and availability",
          "span": 1
        }
      ]
    }
  ]
} as const;

export type QuizScore = { freelancer: number; kimp: number; agency: number };
export type QuizResultKey = keyof QuizScore;

export const CS_QUIZ = {
  "id": "design-workflow-quiz",
  "eyebrow": "Still weighing it up?",
  "title": "Let’s find your ideal design workflow",
  "intro": "Five quick questions. We’ll tell you honestly whether a subscription, a freelancer or an agency fits you best — even if the answer isn’t KIMP.",
  "scoring": {
    "q1": {
      "rarely": {
        "freelancer": 3,
        "kimp": 0,
        "agency": 0
      },
      "fewTimesMonth": {
        "freelancer": 1,
        "kimp": 3,
        "agency": 0
      },
      "weekly": {
        "freelancer": 0,
        "kimp": 3,
        "agency": 1
      },
      "daily": {
        "freelancer": 0,
        "kimp": 3,
        "agency": 2
      }
    },
    "q2": {
      "oneType": {
        "freelancer": 3,
        "kimp": 0,
        "agency": 0
      },
      "aFew": {
        "freelancer": 1,
        "kimp": 3,
        "agency": 0
      },
      "lots": {
        "freelancer": 0,
        "kimp": 3,
        "agency": 2
      }
    },
    "q3": {
      "under500": {
        "freelancer": 3,
        "kimp": 0,
        "agency": 0
      },
      "from500to1000": {
        "freelancer": 1,
        "kimp": 3,
        "agency": 0
      },
      "from1000to3000": {
        "freelancer": 0,
        "kimp": 2,
        "agency": 3
      }
    },
    "q4": {
      "lowCost": {
        "freelancer": 3,
        "kimp": 0,
        "agency": 0
      },
      "consistentBrand": {
        "freelancer": 0,
        "kimp": 3,
        "agency": 1
      },
      "predictableFlow": {
        "freelancer": 0,
        "kimp": 3,
        "agency": 0
      },
      "creativeStrategy": {
        "freelancer": 0,
        "kimp": 0,
        "agency": 3
      }
    },
    "q5": {
      "manageSelf": {
        "freelancer": 3,
        "kimp": 0,
        "agency": 0
      },
      "teamManagesAll": {
        "freelancer": 0,
        "kimp": 0,
        "agency": 3
      },
      "submitRequests": {
        "freelancer": 0,
        "kimp": 3,
        "agency": 0
      }
    }
  },
  "questions": [
    {
      "id": "q1",
      "legend": "1. How often do you actually need new design work?",
      "options": [
        {
          "value": "rarely",
          "label": "Rarely",
          "note": "Just occasional, one-off projects"
        },
        {
          "value": "fewTimesMonth",
          "label": "A few times a month",
          "note": null
        },
        {
          "value": "weekly",
          "label": "Consistently every week",
          "note": null
        },
        {
          "value": "daily",
          "label": "Almost every day",
          "note": null
        }
      ]
    },
    {
      "id": "q2",
      "legend": "2. How many different design tasks do you typically need?",
      "options": [
        {
          "value": "oneType",
          "label": "Just one type",
          "note": "Logos only"
        },
        {
          "value": "aFew",
          "label": "A few",
          "note": "Social posts + ads"
        },
        {
          "value": "lots",
          "label": "Lots of different marketing assets and brand designs",
          "note": null
        }
      ]
    },
    {
      "id": "q3",
      "legend": "3. What’s your approximate monthly budget for design?",
      "options": [
        {
          "value": "under500",
          "label": "Under $500",
          "note": null
        },
        {
          "value": "from500to1000",
          "label": "$500–1,000",
          "note": null
        },
        {
          "value": "from1000to3000",
          "label": "$1,000–3,000",
          "note": null
        }
      ]
    },
    {
      "id": "q4",
      "legend": "4. Which of these is most important to you?",
      "options": [
        {
          "value": "lowCost",
          "label": "Keeping costs as low as possible",
          "note": null
        },
        {
          "value": "consistentBrand",
          "label": "Consistent branding across every design",
          "note": null
        },
        {
          "value": "predictableFlow",
          "label": "A predictable, hassle-free workflow",
          "note": null
        },
        {
          "value": "creativeStrategy",
          "label": "Creative strategy, campaign planning and branding guidance",
          "note": null
        }
      ]
    },
    {
      "id": "q5",
      "legend": "5. How do you prefer to work with designers?",
      "options": [
        {
          "value": "manageSelf",
          "label": "I don’t mind finding and managing individual designers myself",
          "note": null
        },
        {
          "value": "teamManagesAll",
          "label": "I’d rather have a creative team manage the entire process for me",
          "note": null
        },
        {
          "value": "submitRequests",
          "label": "I want a simple system where I can submit requests and streamline my workflow",
          "note": null
        }
      ]
    }
  ],
  "results": [
    {
      "key": "freelancer",
      "kicker": "Your best fit",
      "title": "A freelancer",
      "body": "A freelancer is likely the best fit. You have occasional design needs, a straightforward workload, and prefer the affordability of working directly with an individual designer.",
      "cta": {
        "label": "Explore Freelancers vs KIMP",
        "href": "#beyond-subscriptions"
      },
      "restart": "Retake the quiz"
    },
    {
      "key": "kimp",
      "kicker": "Your best fit",
      "title": "KIMP",
      "body": "With your ongoing design needs and focus on brand consistency, KIMP’s flexible plans and flat monthly rates are what you need.",
      "cta": {
        "label": "Start your free trial",
        "href": "/register-now/"
      },
      "restart": "Retake the quiz"
    },
    {
      "key": "agency",
      "kicker": "Your best fit",
      "title": "A design agency",
      "body": "A design agency is likely the best fit. Your priorities extend beyond producing design assets — you need strategic brand development, complex creative direction, and a fully managed creative partnership.",
      "cta": {
        "label": "Explore Design Agencies vs KIMP",
        "href": "#beyond-subscriptions"
      },
      "restart": "Retake the quiz"
    }
  ],
  "hint": "Pick an answer — we’ll move you to the next question",
  "back": "Back"
} as {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Points per answer, exactly as the live data-scoring attribute. */
  scoring: Record<string, Record<string, QuizScore>>;
  questions: { id: string; legend: string; options: { value: string; label: string; note: string | null }[] }[];
  results: { key: QuizResultKey; kicker: string; title: string; body: string; cta: { label: string; href: string }; restart: string }[];
  hint: string;
  back: string;
};

export const CS_FAQ = {
  eyebrow: "Questions, answered",
  title: "FAQs",
  intro: "How KIMP compares with freelancers, agencies and other unlimited design subscriptions.",
  items: [
  {
    "q": "How is KIMP different from hiring a freelancer?",
    "a": [
      "Freelancers usually mean hourly or project based pricing, limited revisions, and scaling that gets harder as your needs grow. KIMP gives you a dedicated team of 3 design specialists plus a Project Manager on every plan, unlimited revisions, and a flat monthly rate with no contract required."
    ]
  },
  {
    "q": "How is KIMP different from a traditional design agency?",
    "a": [
      "Traditional agencies often come with retainers, contract terms, and workflows split across email and client portals. KIMP runs everything through one central dashboard (KIMP360), includes full design ownership with source files, and lets you scale up or down without renegotiating anything."
    ]
  },
  {
    "q": "What makes KIMP different from other unlimited design subscriptions, like Design Pickle, Penji, or ManyPixels?",
    "a": [
      "The biggest differences show up in what’s included by default. With KIMP, every plan, not just the highest tier, includes a dedicated 3 person design team, a Project Manager, unlimited brands, and full platform access. Many competitors reserve things like dedicated designers, Art Director oversight, or brand management for their top tier plans only."
    ]
  },
  {
    "q": "Does KIMP offer a free trial?",
    "a": [
      "Yes, a 7 day free trial with no obligation to continue. You can upgrade to a full subscription or cancel anytime during the trial. Several competitors require upfront payment before you experience the service at all."
    ]
  },
  {
    "q": "How fast is KIMP’s turnaround time?",
    "a": [
      "Most graphic design requests are completed within 24 hours, and most motion graphics requests take 2 to 4 business days. Because KIMP runs graphics and video as separate workflows, one doesn’t hold up the other."
    ]
  },
  {
    "q": "How many requests can I have going at once?",
    "a": [
      "Depends on your plan: 3 active requests with KIMP Graphics, 2 with KIMP Video, and 5 with KIMP Graphics + Video (3 graphic design and 2 video). These run in parallel, so your requests move forward independently instead of sitting in a single queue."
    ]
  },
  {
    "q": "What happens if I don’t like a design KIMP delivers?",
    "a": [
      "Revisions are unlimited on every plan. There’s no cap on rounds and no extra charge to get it right."
    ]
  },
  {
    "q": "Do I need a contract to use KIMP?",
    "a": [
      "No. KIMP runs on flat monthly pricing with no contract, so you can cancel or change your plan without being locked in."
    ]
  },
  {
    "q": "Can I manage multiple brands under one KIMP plan?",
    "a": [
      "Yes. Every plan includes unlimited brand profiles at no extra cost, whether you’re an agency handling multiple clients or a business with several sub-brands."
    ]
  },
  {
    "q": "Do I get to keep the source files for my designs?",
    "a": [
      "Yes. KIMP includes full design ownership with source files on every request. Some freelancers and agencies only offer this at an additional cost."
    ]
  },
  {
    "q": "Is support available outside of business hours?",
    "a": [
      "Yes. KIMP offers live chat and email support (info@kimp.io) 7 days a week. This goes beyond what most competitors offer, since many cap support at 24/5 or don’t specify hours at all."
    ]
  },
  {
    "q": "Does KIMP use AI in its process?",
    "a": [
      "Yes, KIMP360 uses AI to help speed up parts of the internal workflow. But every request is still shaped and finalized by KIMP’s human design team, so you get a finished, on-brand asset rather than a raw AI output you need to fix yourself."
    ]
  }
] as FaqItem[],
};

/** Live contact card under the FAQ. Live links to /contact/, which 301s to /contact-us/. */
export const CS_CONTACT = {
  "title": "Still have some questions?",
  "body": "If you can’t find the answer to your questions in our FAQ section, you can always contact us. We’ll get back to you promptly!",
  "cta": {
    "href": "/contact-us/",
    "label": "Contact us"
  }
} as const;

/** Live closing panel: <h6>GET STARTED</h6> + <h2>. Live has no body text or second button. */
export const CS_FINAL: {
  eyebrow: string;
  eyebrowAs: "h6";
  title: string;
  primary: { label: string; href: string };
} = {
  eyebrowAs: "h6",
  primary: { label: "Start your Free 7-Day Trial", href: "/register-now/" },
  "eyebrow": "GET STARTED",
  "title": "Experience Seamless Design with Kimp",
};
