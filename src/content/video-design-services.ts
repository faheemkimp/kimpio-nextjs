/**
 * /video-design-services/ ("Kimp Video") copy, links and media, taken verbatim
 * from the live page (content-audit/video-design-services.txt).
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4):
 * - Heading text and levels mirror the live page, which has no <h1>: the hero
 *   title is an <h2>, service cards and perks are <h3>, the review title and
 *   FAQ questions are <h4>, the rating figures are <h6>.
 * - Link destinations keep their live form (decision D4), e.g. "/pricing/".
 * - Sections the live page shares with /graphic-design-services/ (review,
 *   perks, team copy, ratings, call/support, FAQ, closing CTA) are word-for-word
 *   identical there, so those components and their content are reused as-is.
 *
 * Eyebrows, stage art and other decorative UI are new; they are not headings.
 */

export const PATH = "/video-design-services/";

export const VDS_HERO = {
  eyebrow: "Kimp Video · Dedicated video team",
  /* Rendered "Unlimited" + line break + "Video Design Services": same text as the live <h2>. */
  title: { lead: "Unlimited", highlight: "Video Design Services" },
  intro:
    "Get engaging promo videos from a dedicated design team. We edit and enhance your footage or design and animate from scratch!",
  primaryCta: { label: "See Pricing", href: "/pricing/" },
  secondaryCta: { label: "Schedule Demo", href: "/book-a-call/" },
  features: ["Sign up in 2 minutes", "Cancel any time", "Absolutely no contracts"],
  marquee: ["Unlimited Video", "Kimp Video", "Motion Graphics", "Video Editing"],
  mascot: { src: "/images/mascot/fly-video-camera.webp", width: 1440, height: 960 },
} as const;

/** Live "brand_section": same title, same logo set as the homepage strip. */
export const VDS_LOGOS_TITLE = "They’ve Scaled With Kimp. You Can Too!";

/**
 * Live "service_video_sec": 16 service cards (<h3>), each a muted looping
 * clip with its poster. Clips are re-encoded copies of the live S3 files;
 * posters are the live theme images (kimp-video/*.png).
 * (Two more cards exist on live only inside an HTML comment, so they are not shown.)
 */
export const VDS_SERVICES = {
  eyebrow: "16 video types",
  title: "Here's What You Can Request With Kimp Video",
  intro: "Video marketing is unbeatable. Get all the marketing videos you need to grow your brand with Kimp.",
  showMore: "Show More Services",
  /** Cards visible before "Show More Services" (the rest stay in the DOM, collapsed). */
  initial: 6,
  items: [
    {
      slug: "animated-typography",
      title: "Animated Typography",
      body: "Animated typography combines text and motion to grab attention and express ideas. Use it everywhere, from social media to landing pages",
    },
    {
      slug: "animated-video-ads",
      title: "Animated Video Ads",
      body: "Need engaging videos for social media and digital ad campaigns? Think animated ads with 2D animations guaranteed to hook your audience.",
    },
    {
      slug: "audiograms",
      title: "Audiograms",
      body: "Drive 5X the traffic to podcasts. Audiograms combine audio, animations of sound waves, captions, and images to create shareable content.",
    },
    {
      slug: "cinemagraphs",
      title: "Cinemagraphs",
      body: "Add emphasis with cinemagraphs. They blend videography and photography with subtle animations, played on a loop, within a still image.",
    },
    {
      slug: "demo-videos",
      title: "Demo Videos",
      body: "Show potential customers how your product or service can solve a problem they’re facing. Demo videos are a must to convince and convert.",
    },
    {
      slug: "digital-display-loops",
      title: "Digital Display Loops",
      body: "Increase brand awareness at events or on landing pages with display loops. They include simple, impactful graphics, animated in a loop.",
    },
    {
      slug: "faq-videos",
      title: "FAQ Videos",
      body: "The best way to close a sale? Anticipate and answer your customers’ questions. Add FAQ videos to your website and social media profiles.",
    },
    {
      slug: "gifs",
      title: "GIFs",
      body: "GIFs quickly convey messages and make content stand out. Use them to explain a process, promote a product, highlight an offer, and more!",
    },
    {
      slug: "logo-animations",
      title: "Logo Animations",
      body: "Want your logo to make a bigger impact? Get a logo animation! It will bring your brand to life in ways that resonate with your audience.",
    },
    {
      slug: "motion-posters",
      title: "Motion Posters",
      body: "Animated designs generate higher ROIs than other formats. Increase engagement, clicks and even conversions with motion poster designs.",
    },
    {
      slug: "social-media-videos",
      title: "Social Media Videos",
      body: "Keep content calendars full, and ads looking fresh, with videos. Plus, increase brand awareness, drive traffic, clicks, and conversions.",
    },
    {
      slug: "template-customization",
      title: "Template Customization",
      body: "Have a motion graphics template you love but need to edit? We customize templates to reflect your branding and help achieve your goals.",
    },
    {
      slug: "testimonial-videos",
      title: "Testimonial Videos",
      body: "Nothing sells like a good review. So get your customer testimonials animated, edited and ready to share on your website and social media.",
    },
    {
      slug: "text-overlays",
      title: "Text Overlays",
      body: "Want to highlight a special offer or promote key features in your videos? Try text overlays to guide your audience to informed decisions.",
    },
    {
      slug: "ui-ux-animations",
      title: "UI/UX Animations",
      body: "Want to make a website or app more interactive? UI/UX animations can attract attention, help guide users, influence decisions, and more.",
    },
    {
      slug: "video-editing",
      title: "Video Editing",
      body: "Have really great footage of an event, product or service? We’ve got the design team to edit and enhance it for your upcoming campaigns.",
    },
  ].map((s) => ({
    ...s,
    poster: `/images/video/services/${s.slug}.webp`,
    clip: `/images/video/clips/${s.slug}.mp4`,
  })),
};

export type VideoService = (typeof VDS_SERVICES.items)[number];

/** Live "service_sec vedio_service_sec": accordion labels are links on live, not headings. */
export const VDS_TABS = {
  eyebrow: "Why Kimp Video",
  title: "Up Your Content Game. Engaging Video Design, That Scales With You.",
  intro: "Get videos for every one of your marketing campaigns, optimized and resized for every platform and placement.",
  tabs: [
    {
      id: "team",
      label: "Get A Dedicated Video Design Team",
      body: "We set you up with a Dedicated Video Design Team. They’ll get to know your brand and audience.",
    },
    {
      id: "request",
      label: "Request All The Video Designs You Need",
      body: "Get engaging videos that are up to 120 seconds long + video editing that combines footage for up to 15 minutes & audiograms that are up to 1 hour in length.",
    },
    {
      id: "stock",
      label: "Enjoy stock footage and design elements",
      body: "We’ll source the stock footage, images and elements needed to create the videos you request.",
    },
    {
      id: "collaborate",
      label: "Invite Team Members To Collaborate",
      body: "Invite team members to your KIMP360 board and choose whether they will be admins, associates, or simply have viewer access.",
    },
    {
      id: "live",
      label: "Collaborate LIVE With Your Team",
      body: "Your Kimp team is available Monday through Friday to design and discuss your requests with you. And our customer service team is available 7 days a week.",
    },
  ],
} as const;

export type VideoTabId = (typeof VDS_TABS.tabs)[number]["id"];

/** Decorative org chart roles for the shared team section (not headings). */
export const VDS_TEAM_MEMBERS = [
  { role: "Project Manager", note: "Your main point of contact", initials: "PM", color: "#f1731e" },
  { role: "Designer", note: "Motion & animation", initials: "D1", color: "#00806c" },
  { role: "Designer", note: "Editing & audio", initials: "D2", color: "#7c69e8" },
  { role: "Designer", note: "Social & ads", initials: "D3", color: "#4da3ff" },
] as const;

export const VDS_TEAM_JOBS = ["Logo animation", "Reel edit", "Audiogram"] as const;

export const VDS_PLAN = {
  eyebrow: "One plan, everything included",
  title: "The All-In-One Video Plan",
  name: "KIMP VIDEO",
  /* Live fills the price with JS; same figures as the homepage Video plan card (src/content/home-sections.ts). */
  price: "$1,397",
  period: "/month",
  blurb: "Video designs and motion graphics to ramp up your content marketing.",
  features: [
    "Unlimited Designs", "Unlimited Revisions", "Unlimited Brands", "2 Active Projects", "No Contract",
    "2-4 Day Turnaround", "Dedicated Video Team", "Dedicated Project Manager", "Free Stock Images",
    "Free Stock Audio", "Source Files", "Stock Assets Provided", "KIMP360 Project Management",
    "No contracts, no hourly billing, no hidden fees",
  ],
  cta: { label: "Start Free Trial", href: "/register-now/" },
  currencyNote: "All prices are in USD",
} as const;
