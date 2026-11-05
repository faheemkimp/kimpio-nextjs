/**
 * Homepage sections below the hero. Copy and section order follow the
 * "KIMP Creative Department Homepage" design (Nov 2026). Link destinations
 * keep the live relative form (decision D4), e.g. "/book-a-call".
 */

export const HYBRID = {
  eyebrow: "Why AI + human",
  title: "AI Alone Isn't Enough. Humans Alone Aren't Fast Enough.",
  intro:
    "You've seen what AI design tools can do, and where they fall apart. Generic layouts. Mangled text. Logos that drift off-brand. Six fingers. Meanwhile, traditional design services can't match AI's speed.",
  answer:
    "KIMP's answer is not to compete with AI on design labour. It is to be your creative department: human designers equipped with AI, working from your brand guidelines, with a Creative Project Manager accountable for every deliverable.",
  options: [
    {
      title: "AI-Only Tools",
      verdict: "Fast, not finished",
      points: ["Fast, but generic and off-brand", "You do all the prompting and fixing", "No one accountable for the result"],
    },
    {
      title: "Traditional Design Services",
      verdict: "Finished, not fast",
      points: ["On-brand, but slow and costly", "Endless back-and-forth revisions", "Limited by human hours"],
    },
  ],
  kimp: {
    title: "KIMP Creative Department",
    verdict: "Fast and finished",
    points: [
      "Fast and on-brand",
      "Designers who get it right, faster",
      "AI-assisted or 100% human-made, your call",
      "One accountable Creative PM",
    ],
  },
  outro:
    "The result: designs that used to take days now take hours, and designs that AI can't do at all still get done, by the top 1% of designers.",
} as const;

export const MODES = {
  eyebrow: "One subscription, you choose how we work",
  title: "You Choose How Your Designs Get Made.",
  cta: { label: "Start Free Trial", href: "/register-now/" },
  items: [
    {
      key: "assisted",
      title: "AI-Assisted",
      tagline: "Your designers, equipped with AI.",
      body: "Opt in and your dedicated designers use KIMP's in-house AI assistant to research, concept and produce faster. Every design is still built on your brand guidelines and finished by a human designer. The classic KIMP experience, at hybrid speed.",
      steps: ["Your brief", "AI-assisted concepts", "Designer refines", "On-brand delivery"],
    },
    {
      key: "human",
      title: "100% Human-Made",
      tagline: "No AI. Not even a little.",
      body: "Don't want AI anywhere near your brand? Say so, and your team won't touch it. Every piece is concepted, designed and finished by hand, fully custom. Allow a little extra time per request.",
      steps: ["Your brief", "Hand-sketched concepts", "Designer crafts", "Hand-finished delivery"],
    },
    {
      key: "finish",
      title: "Finish What You Started",
      tagline: "Bring your AI drafts. We'll take them the last mile.",
      body: "Made something in ChatGPT, Gemini, Grok, Claude or another AI tool that's 80% right but you can't get it the rest of the way? Upload it. Your KIMP designers will fix the type, restore your brand, sharpen the layout, and deliver print- and campaign-ready files.",
      steps: ["Upload your draft", "Fix type & brand", "Sharpen the layout", "Print- & campaign-ready"],
    },
  ],
} as const;

export const HOW_IT_WORKS = {
  eyebrow: "How a KIMP subscription works",
  title: "From brief to campaign, without the queue.",
  intro:
    "Human involvement where it creates the most value, AI where it saves you time, and a Creative Project Manager keeping everything moving.",
  steps: [
    {
      title: "Brief it",
      body: "Submit a request through KIMP360's AI-guided brief, or just tell your Creative Project Manager what you need. Set your AI preference once per brand: AI-assisted, or 100% human-made.",
    },
    {
      title: "See directions",
      body: "Your designer shows you on-brand directions to choose from. With AI assistance that happens in hours; AI-free, your designer concepts by hand and takes a little longer.",
    },
    {
      title: "We produce it",
      body: "Pick a direction and your dedicated team produces every asset the campaign needs: social, ads, email, banners, video, print. Designers apply brand judgment and polish every detail.",
    },
    {
      title: "Review, approve, repeat",
      body: "Give feedback with comments, annotations or screen recordings in KIMP360. Approve, download production-ready files, and keep the requests coming. They're unlimited.",
    },
  ],
  stats: [
    { value: "875K+", label: "Designs Delivered", body: "Human-crafted creatives for brands worldwide." },
    { value: "275+", label: "Designers & Illustrators", body: "Full-time, in-house, AI-empowered. Never outsourced." },
    { value: "60+", label: "Countries Served", body: "We design for ambitious brands around the world." },
    { value: "1 to 2", label: "Days to Onboard", body: "Set up your brand once and start producing." },
  ],
} as const;

export const BUILD_VS_BUY = {
  eyebrow: "Cost to build this in-house",
  title: "The math, made simple.",
  intro: "To recreate KIMP internally, you'd need to hire an entire creative department. Here's what it actually costs.",
  inhouse: {
    kicker: "Build it in-house",
    title: "Hire the full creative team",
    note: "Plus payroll taxes, benefits, equipment, software, and management overhead.",
    rows: [
      { role: "Senior Designer", cost: "$5,000/mo" },
      { role: "Video & Motion Designer", cost: "$4,000/mo" },
      { role: "Art Director", cost: "$8,500/mo" },
      { role: "Front-End Designer", cost: "$6,000/mo" },
      { role: "Project Manager", cost: "$4,500/mo" },
    ],
    totalLabel: "Estimated total",
    total: "$20K to 30K+",
    fine: "Doesn't include 3 to 6 months of recruiting, onboarding delay, equipment, software licenses, or management overhead.",
  },
  kimp: {
    kicker: "Get it all with a single subscription",
    title: "Your creative department, included",
    note: "Creative PM + senior crew + KIMP360 platform for one flat fee.",
    rows: [
      { role: "Creative Project Manager", cost: "Included" },
      { role: "Multi-discipline design crew", cost: "Included" },
      { role: "Video & motion production", cost: "Included" },
      { role: "AI-assisted workflows, if you want them", cost: "Included" },
      { role: "KIMP360 platform", cost: "Included" },
      { role: "No payroll, no benefits, no extras", cost: "$0" },
    ],
    totalLabel: "Starting at",
    total: "$1,397",
    fine: "No hiring. No payroll. No long-term commitment. Cancel anytime in 2 clicks.",
  },
  cta: { label: "Start Your Free 7-Day Trial", href: "/register-now/" },
} as const;

export const SERVICES = {
  eyebrow: "The services that KIMP provides",
  title: "Unlock Unlimited Design Potential for Your Business",
  intro:
    "One subscription, every creative format, delivered the same way: on-brand and finished by your team.",
  cta: { label: "View All 100+ Design Types", href: "/design-categories" },
  items: [
    {
      title: "Graphic Design",
      body: "We create graphics for branding and ad campaigns to amplify marketing efforts.",
      scene: "graphic",
      tint: "#fff1e7",
    },
    {
      title: "Custom Illustrations",
      body: "Get custom illustrations from logos to experimental marketing concepts.",
      scene: "illustration",
      tint: "#f1eeff",
    },
    {
      title: "Visual Identity",
      body: "Don't have a visual identity? Let us know what you'd like and we'll create one for you.",
      scene: "identity",
      tint: "#e6f4f1",
    },
    {
      title: "Presentations",
      body: "We create engaging designs for everything from pitch decks to corporate presentations.",
      scene: "presentation",
      tint: "#fff8df",
    },
    {
      title: "Videos & Motion Graphics",
      body: "Get scroll-stopping videos that engage, convince, and convert customers effectively.",
      scene: "video",
      tint: "#ffeef3",
    },
    {
      title: "Web & App Designs",
      body: "We create visually stunning designs for user-friendly app and web experiences.",
      scene: "web",
      tint: "#eaf3ff",
    },
  ],
} as const;

export const KIMP360 = {
  eyebrow: "Introducing KIMP360",
  title: "Your Design Command Center.",
  intro:
    "Make, manage and collaborate on design requests, set your AI preference per brand, and keep everything KIMP knows about your brand in one place. Included with every subscription.",
  preference: {
    title: "Your AI preference, per brand",
    body: "Tell us once, per brand, whether your designers may use KIMP's in-house AI assistant. Change it any time; your Creative PM applies it to every request.",
    brand: "Northwind",
    options: [
      {
        key: "assisted",
        label: "AI-assisted",
        tag: "Faster turnaround",
        body: "Designers may use KIMP's in-house AI assistant. Every design is still built on your brand and finished by a human.",
      },
      {
        key: "human",
        label: "100% human-made",
        tag: "No AI at any step",
        body: "Fully custom, concepted and finished by hand. Allow a little extra time per request.",
      },
    ],
    footer: "Applies to every new request for this brand",
    change: "Change anytime",
    save: "Save preference",
    caption: "Illustrative interface. Example brand.",
  },
  memory: {
    title: "Brand memory",
    body: "The longer you use KIMP, the better it knows your brand. Set it up once; every request after that starts on-brand, with no re-briefing.",
    columns: { what: "What KIMP remembers", why: "Why it matters" },
    items: [
      { what: "Brand guidelines", why: "Logos, colours, fonts and tone applied on every request, without repeated briefing." },
      { what: "Approved assets", why: "Less searching, fewer mistakes. Attach them to any request in a few clicks." },
      { what: "Past requests", why: "Your team knows what you asked for before and what you approved." },
      { what: "Audience and channels", why: "Platform-specific creative by default, from Instagram to print." },
      { what: "Creative preferences", why: "Output gets more personalised the longer you work with your team." },
    ],
  },
  workflow: {
    title: "Streamlined Workflow",
    body: "Requests move from draft to in progress, review and completed on one board. Get a 360° view, organized your way.",
    columns: [
      { label: "Drafts", color: "#677c99", cards: ["Spring sale banner", "Pitch deck refresh"] },
      { label: "In progress", color: "#f1731e", cards: ["Instagram carousel", "Explainer video"] },
      { label: "In review", color: "#7c69e8", cards: ["Email header"] },
      { label: "Completed", color: "#00806c", cards: ["Booth graphics", "Logo refresh"] },
    ],
  },
  team: {
    title: "Design Better, As a Team",
    body: "Invite unlimited collaborators to request and review alongside your dedicated design team, at no extra cost. Comments, annotations and screen recordings keep feedback precise.",
  },
} as const;

export const TEAMS = {
  eyebrow: "Who it's for",
  title: "Built for the way your team works.",
  intro:
    "From agencies managing multiple client retainers to in-house growth teams running daily experiments, KIMP plugs into your existing workflow as your always-on creative production layer.",
  audiences: [
    {
      kicker: "Agencies",
      title: "Scale delivery without scaling headcount",
      body: "A reliable production department behind the scenes: unlimited brands on every plan, white-label delivery under your agency's branding, and a Creative PM who runs the queue so your account managers don't. Deliver more client work and protect margins without hiring more designers.",
      chips: ["White-label design", "Motion graphics", "Presentation design", "Brand collateral", "Multi-brand workflow"],
      cta: { label: "See white-label design for agencies", href: "/white-label-graphic-design/" },
      color: "#f1731e",
    },
    {
      kicker: "Marketing teams",
      title: "Keep every campaign moving",
      body: "When campaigns stack up, in-house teams get buried in design requests, video edits, landing pages and last-minute changes. KIMP becomes the production team that keeps everything moving.",
      chips: ["Ad creatives", "Landing pages", "Campaign assets", "Email design", "Shorts & reels", "Social content"],
      cta: { label: "See marketing use cases", href: "/our-work/" },
      color: "#7c69e8",
    },
    {
      kicker: "Growth teams",
      title: "Ship more experiments, faster",
      body: "Creative is usually the bottleneck. KIMP produces the assets you need for experiments, launches, paid campaigns, funnels and conversion updates without slowing momentum.",
      chips: ["Paid social creatives", "Funnel & landing assets", "A/B test variations", "Lifecycle email creative", "Launch visuals"],
      cta: { label: "Start a free trial", href: "/register-now/" },
      color: "#00a88e",
    },
  ],
} as const;

export const PRICING = {
  eyebrow: "Subscription plans",
  title: "Design Without Boundaries.",
  intro:
    "Simple, flat monthly pricing in USD. Every plan includes your dedicated team and KIMP360. Taxes and fees included, no hidden costs.",
  cta: { label: "Start Free Trial", href: "/register-now/" },
  plans: [
    {
      name: "Graphics",
      price: "$1,397",
      blurb: "Graphic designs for day-to-day marketing needs and big campaigns.",
      badge: null,
      features: [
        "Unlimited requests, revisions and brands",
        "3 active requests",
        "24-hour turnaround on simple tasks",
        "Dedicated design team and Project Manager",
        "Print and digital, illustrations, landing page and UI designs",
        "Free stock images and source files",
        "AI-assisted or 100% human-made, your choice",
      ],
    },
    {
      name: "Graphics + Video",
      price: "$1,697",
      blurb: "Everything from Kimp Graphics and Kimp Video for a discounted flat monthly fee.",
      badge: "Best value · save $1,097/mo",
      features: [
        "Unlimited requests, revisions and brands",
        "5 active requests",
        "24-hour turnaround on simple tasks",
        "Dedicated design and video team, plus Project Manager",
        "Everything in Graphics, plus video editing, animation and motion graphics",
        "Free stock images, videos and audio, plus source files",
        "AI-assisted or 100% human-made, your choice",
      ],
    },
    {
      name: "Video",
      price: "$1,397",
      blurb: "Video designs and motion graphics to ramp up your content marketing.",
      badge: null,
      features: [
        "Unlimited requests, revisions and brands",
        "2 active requests",
        "24-hour turnaround on simple tasks",
        "Dedicated video team and Project Manager",
        "Video editing, animation, video design and motion graphics",
        "Free stock videos and audio, plus source files",
        "AI-assisted or 100% human-made, your choice",
      ],
    },
  ],
  enterprise: {
    name: "Enterprise",
    price: "Custom",
    blurb:
      "For companies that need a custom solution tailored to their design needs and workflow: multiple teams, creative direction, strategy and integrations.",
    cta: { label: "Book a Call", href: "/book-a-call" },
    features: [
      "Multiple subscriptions and dedicated teams",
      "Creative direction and brand strategy",
      "White-label and multi-brand workflows",
      "Custom onboarding and reporting",
    ],
  },
  footnote:
    "Add on more subscriptions for more active requests and faster throughput. Pause anytime for a flat $19.95 a month. 7-day free trial on every plan.",
} as const;

export const REVIEWS = {
  eyebrow: "The design team brands prefer",
  title: "Top brands around the world trust KIMP with their designs.",
  ratings: [
    { score: "4.7", source: "Google", detail: "150+ reviews" },
    { score: "4.9", source: "Trustpilot", detail: null },
    { score: "4.9", source: "Clutch", detail: "250+ reviews" },
  ],
  cta: { label: "See all reviews", href: "/testimonials/" },
  items: [
    {
      quote: "They usually get the designs right on the first attempt, which eliminates the need for a lot of back-and-forth revisions. This efficiency makes the entire process very easy for us.",
      name: "Petteri Pucilowski",
      company: "KIMP client",
    },
    {
      quote: "These guys are absolutely amazing!! I highly recommend them. It's so great to work with competent people who are incredibly good and super fast at what they do.",
      name: "Liana Foai",
      company: "Nasyana Business Services",
    },
    {
      quote: "They have been very seamless in executing on everything we have asked for, from the creative vision to the project management, to the communication and turnaround time.",
      name: "Nicole Murray",
      company: "KIMP client",
    },
  ],
} as const;

export const FAQ = {
  eyebrow: "Questions, answered",
  title: "FAQs",
  intro: "Have questions about how we work and what you get? We've got all the answers you need.",
  cta: { label: "Read All FAQs", href: "/faq/" },
  items: [
    {
      q: "Do you use AI in your designs?",
      a: "Only if you want us to. Our designers are equipped with KIMP's in-house AI assistant and use it as a creative assistant, never a replacement: for research, concept exploration, variations and repetitive production steps. Every design is still guided by a human designer's creative vision and built on your brand guidelines, which is why it doesn't look like the generic output you get from ChatGPT, Gemini, Grok or Claude. If you'd rather we didn't use AI at all, set that preference for your brand and your team won't touch it. Your work is then 100% human-made; allow a little extra time per request.",
    },
    {
      q: "Can I use KIMP's AI tool myself?",
      a: "No. KIMP's AI design assistant is an internal tool for our designers, not a self-serve product for clients. You get the benefit, faster turnaround on AI-assisted work, without prompting anything yourself. Everything you receive is produced and finished by your dedicated designers.",
    },
    {
      q: "I made a design with another AI tool. Can you finish it for me?",
      a: "Absolutely. Upload your AI-generated draft (from ChatGPT, Gemini, Grok, Claude or any other tool) with your request in KIMP360, tell us what's not working, and your design team will fix the typography, restore brand consistency, refine the layout, and deliver production-ready files for print or digital. It counts as a regular design request, so with your subscription, it's unlimited.",
    },
    {
      q: "What does “unlimited graphic design” and “unlimited video design” mean?",
      a: "KIMP's unlimited graphic design and unlimited video design service includes unlimited requests and unlimited revisions. Make as many requests as you'd like, and we'll work through them as quickly as possible. Your dedicated Project Manager reviews each request, then assigns it to your design team. Each plan has a set number of active requests in progress at any one time (3 for Graphics, 2 for Video, 5 for Graphics + Video), and you can add subscriptions for more throughput.",
    },
    {
      q: "How fast is turnaround?",
      a: "On average you'll receive designs or revisions in 24 hours for simple tasks like social media posts, web banners and single-sided print designs, and 2 to 4 days for complex designs. AI-assisted work is typically at the faster end of those ranges. If you've chosen 100% human-made work, allow a little extra time. If you've got a more complex task, let us know and we'll provide an estimate.",
    },
    {
      q: "Do you offer white-label design for agencies?",
      a: "Yes. Agencies use KIMP as their behind-the-scenes production department. Every plan includes unlimited brands, so each client gets its own brand profile and assets in KIMP360, and deliverables carry your agency's branding, not ours. You keep the client relationship and the strategy; we produce the work.",
    },
    {
      q: "Is there an enterprise or custom plan?",
      a: "Yes. If your company needs a custom solution tailored to your design needs and workflow, such as multiple dedicated teams, creative direction and strategy, or custom onboarding and reporting, book a call and we'll put together a plan for you.",
    },
    {
      q: "How does the trial work?",
      a: "You sign up, you try us out for 7 days, and you cancel if you decide it's not the right fit. You are not billed during the trial period. You get billed only after day 7 and you don't have to sign any contracts to continue with KIMP.",
    },
  ],
} as const;

export const FINAL_CTA = {
  eyebrow: "Get started",
  title: "Your creative department is ready when you are.",
  body: "AI speed. Human craft. Unlimited requests. One flat fee.",
  primary: { label: "Start Your Free 7-Day Trial", href: "/register-now/" },
  secondary: { label: "Book a Demo Call", href: "/book-a-call" },
} as const;

export const FOOTER = {
  blurb:
    "KIMP is a subscription-based graphic and video design service, delivered for a flat monthly fee by a dedicated design team: your AI-powered creative department. Try KIMP now!",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/getkimp/" },
    { label: "Instagram", href: "https://www.instagram.com/getkimp/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/getkimp/" },
  ],
  columns: [
    {
      title: "Service",
      links: [
        { label: "Pricing", href: "/pricing/" },
        { label: "Our Work", href: "/our-work/" },
        { label: "KIMP360", href: "/kimp360-platform/" },
        { label: "White-Label for Agencies", href: "/white-label-graphic-design/" },
        { label: "FAQ", href: "/faq/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us/" },
        { label: "Book A Call", href: "/book-a-call" },
        { label: "Brand Assets", href: "/brand-assets/" },
        { label: "Blog", href: "/blog/" },
      ],
    },
    {
      title: "Others",
      links: [
        { label: "Contact Us", href: "/contact-us/" },
        { label: "Affiliates", href: "/affiliates/" },
        { label: "Careers", href: "/careers/" },
        { label: "Design Categories", href: "/design-categories/" },
      ],
    },
  ],
  copyright: "Kimp.io © 2026. All rights reserved.",
  address: "7030 Woodbine Avenue, Suite 500, Markham ON, L3R 6G2, Canada",
} as const;
