/**
 * /graphic-design-services/ ("Kimp Graphics") copy, links and images, taken
 * verbatim from the live page (content-audit/graphic-design-services.txt).
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4):
 * - Heading text and levels mirror the live page, which has no <h1>: the hero
 *   title is an <h2>, perks are <h3>, the review title and FAQ questions are
 *   <h4>, the rating figures are <h6>. Changing that needs decision D2.
 * - Link destinations keep their live form (decision D4), e.g. "/pricing".
 * - Live body images carry no alt text, so the work samples stay decorative.
 *
 * Eyebrows, tab art and other decorative UI are new; they are not headings.
 */
import FAQ_ITEMS from "./graphic-design-services-faq.json";

export const PATH = "/graphic-design-services/";

export const GDS_HERO = {
  eyebrow: "Kimp Graphics · Dedicated design team",
  title: { lead: "Unlimited Graphic Design Services:", highlight: "Kimp Graphics" },
  intro:
    "Launch, build or scale your business. You’ve got what it takes. You just need a dependable design solution. We’ve got you covered.",
  primaryCta: { label: "See Pricing", href: "/pricing" },
  secondaryCta: { label: "Schedule Demo", href: "/book-a-call" },
  features: ["Sign up in 2 minutes", "Cancel any time", "Absolutely no contracts"],
  marquee: ["Unlimited Design", "Kimp Graphics", "Print & Digital", "Unlimited Revisions"],
} as const;

/** Live "brand_section": same title, same logo set as the homepage strip. */
export const GDS_LOGOS_TITLE = "They’ve Scaled With Kimp. You Can Too!";

export const GDS_SERVICE = {
  eyebrow: "Why Kimp Graphics",
  title: "Leave The Graphics To Us. Dependable Graphic Design That Scales With You.",
  intro:
    "Stop wondering if you can get all the designs you need. Get Kimp Graphics and get a dedicated design team that delivers.",
  tabs: [
    {
      id: "team",
      label: "Get Your Very Own Dedicated Kimp Team",
      body: "We set you up with a dedicated team that will get to know your brand(s) and deliver you the high-quality designs you want.",
    },
    {
      id: "collaborate",
      label: "Invite Team Members To Collaborate",
      body: "Invite team members to your KIMP360 board and choose whether they will be admins, associates, or simply have viewer access.",
    },
    {
      id: "advanced",
      label: "Request All The Advanced Graphics You Need",
      body: "Yes, ALL of the print, digital, custom illustration, GIF and landing page requests you need! Make unlimited requests and get unlimited revisions.",
    },
    {
      id: "help",
      label: "Get Help Whenever You Need It",
      body: "Your Kimp team is available Monday through Friday to design and discuss your requests with you. And our customer service team is available 7 days a week.",
    },
  ],
} as const;

export type ServiceTabId = (typeof GDS_SERVICE.tabs)[number]["id"];

/** Live "trustpilot_section": one featured review, title is an <h4>. */
export const GDS_REVIEW = {
  title: "Amazing service!!",
  quote:
    "Amazing service! I really wish that I knew about this kind of service long ago. I was referred to Kimp by a friend so decided to give them a try. I have blown away by how much I was able to get done and free up my time. Great designs from the getgo. My project manager is very responsive and friendly to work with. Overall, I really enjoy working with the Kimp team and I can see this being a very long working relationship.",
  author: "Phenom Marketing, US",
  /* Live: tristpilot_white_logo.svg, alt "Trustpilot" (wordmark above five star boxes). */
  source: { name: "Trustpilot", logo: "/images/graphics/trustpilot-white.svg", width: 199, height: 98 },
} as const;

export const GDS_PERKS = {
  eyebrow: "What you get",
  title: "Kimp Perks",
  intro:
    "It's time to stop chasing after designers that are unreliable and expensive. Get your very own design team for a fraction of the cost.",
  items: [
    { icon: "infinity", title: "Unlimited Design", body: "Get unlimited requests and unlimited revisions. We work through them, in the order you need them!" },
    { icon: "layout", title: "Access To KIMP360", body: "Make and manage design requests for all your brands and clients in one place - KIMP360!" },
    { icon: "timer", title: "24 Hour Turnarounds", body: "Get turnaround times as fast as 24 hours for simple tasks and 2-4 days for more complex designs." },
    { icon: "users", title: "Fee-Free Collaboration", body: "Invite an unlimited number of collaborators to help make and manage your design projects at no extra cost." },
    { icon: "badge", title: "Own 100% Of Your Designs", body: "You own the designs created during your subscription. And you get the source files for each one." },
    { icon: "grid", title: "100+ Design Categories", body: "Choose from over 100 types of graphic or video designs with a single Kimp design subscription." },
    { icon: "image", title: "Premium Stock Assets", body: "Need great stock assets for your design projects? We source and design with them for you!" },
    { icon: "headset", title: "24/7 Customer Support", body: "Need help? Kimp’s Customer Support Team is available, via live chat, to answer your questions around the clock." },
    { icon: "star", title: "Top-Tier Designers", body: "Kimp recruits and hires the best graphic and motion graphics designers to work on your projects." },
  ],
} as const;

export type PerkIcon = (typeof GDS_PERKS.items)[number]["icon"];

export const GDS_TEAM = {
  eyebrow: "Your team",
  title: "Kimp’s Experienced Designers Help You Design Better And Scale Faster",
  body: "Your team includes 1 Project Manager and 3 Designers. They specialize in different areas, so they can fulfill a variety of requests! Over time, they’ll become pros with your brand(s).",
  /* Decorative org chart; roles are illustrative, not headings. */
  members: [
    { role: "Project Manager", note: "Your main point of contact", initials: "PM", color: "#f1731e" },
    { role: "Designer", note: "Print & branding", initials: "D1", color: "#00806c" },
    { role: "Designer", note: "Digital & social", initials: "D2", color: "#7c69e8" },
    { role: "Designer", note: "Illustration & UI", initials: "D3", color: "#4da3ff" },
  ],
} as const;

export const GDS_WHAT_WE_DO = {
  eyebrow: "100+ design categories",
  title: "The Graphic Designs We Create For Our Clients",
  intro: "Whether you’re an entrepreneur or an established business we’ll save you time and money.",
  doTitle: "What We Do",
  doItems: [
    "Amazon Graphics", "App Designs", "Infographics", "Background Removal", "Basic GIFs", "Billboards",
    "Blog Images", "Book Covers", "Book Layouts", "Booklets", "Brochures", "Business Cards", "Business Reports",
    "Characters & Mascots", "Company Profiles", "Corporate Folders", "Custom Illustrations", "Display Ads",
    "Ebook Covers", "Ebook Layouts", "Ecommerce Graphics", "EDM (Email Direct Mail)", "Email Signatures",
    "Event Invitations", "Flyers & Posters", "Icons", "Landing Pages", "Logos", "Magazine & Newspaper Ads",
    "Newsletters", "Packaging & Labels", "Podcast Covers", "Point Of Sale Materials", "PowerPoint Templates",
    "Presentation Decks", "Print Ads", "Product Mock-ups", "Promotional Materials", "Restaurant Menus", "Signage",
    "Simple Infographic", "Social Media Posts & Ads", "Stationery Sets", "T-shirt Design", "Tradeshow Banners",
    "UI Designs", "Vehicle Wraps", "Web Ads", "Website Designs",
  ],
  /** Presentation-only grouping of doItems (every item appears exactly once). */
  groups: [
    {
      key: "brand",
      label: "Brand & Identity",
      items: ["Logos", "Business Cards", "Stationery Sets", "Email Signatures", "Icons", "Characters & Mascots", "Custom Illustrations", "Corporate Folders", "Company Profiles"],
    },
    {
      key: "social",
      label: "Social & Digital",
      items: ["Social Media Posts & Ads", "Display Ads", "Web Ads", "Blog Images", "Basic GIFs", "Podcast Covers", "EDM (Email Direct Mail)", "Newsletters"],
    },
    {
      key: "print",
      label: "Print & Events",
      items: ["Flyers & Posters", "Brochures", "Billboards", "Signage", "Tradeshow Banners", "Vehicle Wraps", "Print Ads", "Magazine & Newspaper Ads", "Point Of Sale Materials", "Promotional Materials", "Restaurant Menus", "Event Invitations"],
    },
    {
      key: "publishing",
      label: "Publishing & Decks",
      items: ["Book Covers", "Book Layouts", "Booklets", "Ebook Covers", "Ebook Layouts", "Business Reports", "PowerPoint Templates", "Presentation Decks", "Infographics", "Simple Infographic"],
    },
    {
      key: "ecommerce",
      label: "Ecommerce & Product",
      items: ["Amazon Graphics", "Ecommerce Graphics", "Product Mock-ups", "Packaging & Labels", "Background Removal", "T-shirt Design"],
    },
    {
      key: "web",
      label: "Web, App & UI",
      items: ["Website Designs", "Landing Pages", "App Designs", "UI Designs"],
    },
  ],
  /** Live tooltip on "Basic GIFs". */
  tooltips: {
    "Basic GIFs":
      "Basic GIFs are simple animations, 2-3 seconds long, which are created in Photoshop and include text animations, flashing buttons, etc.",
  } as Record<string, string>,
  doMore: "And just about anything that can be designed in PS, AI, or INDD.",
  /** "click here" opens the live chat on WordPress (href="#"). */
  note: {
    before: "If you need a design type not included on this list, just ",
    link: { label: "click here", href: "#" },
    after: " to connect with us on the live chat to find out if we can work on it for you!",
  },
  samplesCta: { label: "View All Graphics Samples", href: "/our-work" },
  dontTitle: "What We Don’t Do:",
  dontItems: ["Ad development", "3D / CAD", "Marketing Strategy", "HTML5 Ads", "Coding & Development"],
} as const;

export const GDS_PLAN = {
  eyebrow: "One plan, everything included",
  title: "The All-In-One Graphics Plan",
  name: "KIMP GRAPHICS",
  /* Same figures the homepage plan cards show (src/content/home-sections.ts). */
  price: "$1,397",
  period: "/month",
  blurb: "Graphic designs for day-to-day marketing needs and big campaigns.",
  features: [
    "Unlimited Requests", "Unlimited Revisions", "Unlimited Brands", "No Contract", "24 Hour Turnaround",
    "Add Unlimited Team Members", "Dedicated Design Team", "Dedicated Project Manager", "Free Stock Images",
    "Source Files", "Stock Assets Provided", "Includes Print & Digital Designs", "Also Includes Custom Illustrations",
    "Also Includes Basic GIFs", "Also Includes Landing Page Designs", "Also Includes Website, App and UI Designs",
    "KIMP360 Design Management",
  ],
  cta: { label: "Start Free Trial", href: "/register-now" },
  currencyNote: "All prices are in USD",
} as const;

/** Live order: Google, Clutch, Trustpilot. Figures are <h6>s on the live page. */
export const GDS_RATINGS = {
  eyebrow: "Rated by real clients",
  title: "Kimp Is Highly Recommended By Companies Like Yours",
  items: [
    { name: "Google", logo: "/images/home/google_logo.svg", alt: "Google-logo", reviews: "150+", score: "4.7" },
    { name: "Clutch", logo: "/images/home/clutchco_logo.svg", alt: "clutcho-logo", reviews: "20+", score: "4.9" },
    { name: "Trustpilot", logo: "/images/home/trust_stars.svg", alt: "Trustpilot-logo", reviews: "230+", score: "4.9" },
  ],
} as const;

export const GDS_WORK = {
  eyebrow: "Our work",
  title: "We Offer An Unlimited Design Service For Businesses Of Every Size",
  intro: "Whether you’re an entrepreneur, or an established business, we’ll help you save time and money.",
  cta: { label: "View all Graphics Samples", href: "/our-work/" },
  /* Samples from the live portfolio strip (theme works/frontpage), width x height. */
  samples: [
    [1, 740, 740], [2, 1540, 746], [3, 740, 740], [4, 740, 740], [5, 740, 740], [6, 740, 494],
    [7, 740, 740], [8, 555, 744], [9, 1540, 750], [10, 740, 739], [11, 740, 740], [12, 740, 740],
    [13, 740, 740], [14, 740, 740], [15, 740, 740], [16, 740, 740],
  ].map(([n, w, h]) => ({ src: `/images/graphics/works/${String(n).padStart(2, "0")}.jpg`, width: w, height: h })),
} as const;

export const GDS_CALL = {
  title: "Book A Call With Us",
  body: "Ready to learn more about how Kimp can help you save time, and money on your designs? Book a 1:1 call with a Kimp Team member today! You'll be designing better and scaling faster, in no time.",
  cta: { label: "Book a Call", href: "/book-a-call/" },
} as const;

export const GDS_SUPPORT = {
  title: "World-Class Support Team",
  /** "here" opens the live chat on WordPress (href="#"). */
  body: { before: "Our dedicated account team is ready to help. Book a call, send an email or connect on the live chat ", link: { label: "here", href: "#" }, after: "!" },
} as const;

/**
 * FAQ answers: a string is a paragraph, `p` a paragraph with inline links (as on
 * live), `list` a bullet list, `video` the KIMP360 guide embed.
 */
export type FaqInline = string | { label: string; href: string };
export type FaqBlock = string | { p: FaqInline[] } | { list: string[] } | { video: string };
export type FaqItem = { q: string; a: FaqBlock[] };

export const GDS_FAQ = {
  eyebrow: "Questions, answered",
  title: "FAQs",
  intro: "Everything about how Kimp Graphics works, from trials and turnarounds to who designs for you.",
  cta: { label: "Read All FAQs", href: "/faq/" },
  items: FAQ_ITEMS as FaqItem[],
} as const;

export const GDS_FINAL_CTA = {
  eyebrow: "Start your 7-day free trial",
  title: "Whether you’re an entrepreneur, or an established business, we’ll help you save time and money.",
  /** Live: <form action="register-now"> with an email field, GET. */
  form: { action: "/register-now/", placeholder: "Enter Your Email", button: "Start Free Trial" },
  features: ["Sign up in 2 minutes", "Cancel any time", "Absolutely no contracts"],
} as const;
