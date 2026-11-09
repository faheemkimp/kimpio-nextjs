/**
 * /enterprise-clients/ copy, taken verbatim from the live page (WordPress
 * template "template-enterprise-new"). Everything here is hardcoded in the PHP
 * template; the FAQ answers are WordPress content and are fetched at render
 * (src/lib/wp/enterprise-faqs.ts).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live, in order: <h1> hero; <h2>
 * "Every day KIMP is trusted by over 500 Enterprise clients."; <h6> "Your Brand
 * Deserves The Best" + <h2> "Everything You Need to Create High Quality
 * Designs" + three <h3> cards; <h2> "A Smarter, Faster Way to Manage Your
 * Creative Work" + five <h3>; <h6> "At KIMP, We Design It All" + <h2>
 * "Everything You Need to Create High Quality Designs" (again) + six <h3>
 * services; <h6> "Enjoy Premium Designs" + <h2> case studies + twelve <h3>
 * clients; <h2> "Effortlessly Elevate How You Manage Design Projects" + per plan
 * an <h3> name (with the struck-through price inside) and an <h2> price; <h2>
 * "Get Unlimited Graphics, Videos & Development Work Done"; <h6> "Testimonials"
 * + <h2> "What Clients Say" + three <h3> names; <h6> "Integrations" + <h2>; <h2>
 * "FAQs" + <h4> questions; <h3> "Still have questions?"; closing <h6> "GET
 * STARTED" + <h2> "Experience Seamless Design with Kimp".
 */

export const PATH = "/enterprise-clients/";
const DIR = "/images/enterprise";
const DEMO = "/enterprise-schedule-demo/";

export const ENT_HERO = {
  eyebrow: "KIMP Enterprise",
  /* Same text as the live <h1>, split over two lines. */
  title: { lead: "Design at Scale. Supercharged with AI.", highlight: "Tailored for Your Team" },
  intro: "KIMP Enterprise is built for fast-growing businesses, creative agencies, and marketing teams. You expect more from your design team. And we deliver.",
  primaryCta: { label: "Schedule Demo", href: DEMO },
  learnMore: { label: "Learn More", href: "#pricing" },
  marquee: ["Enterprise", "Design at Scale", "AI", "Your Team"],
  /* Live logo row (<h2>), in live order. Live has no alt text; names added. */
  band: {
    title: "Every day KIMP is trusted by over 500 Enterprise clients.",
    logos: [
      { src: `${DIR}/beamlogosvg.png`, alt: "Beam Minerals", width: 207, height: 96 },
      { src: `${DIR}/bse.png`, alt: "BSE", width: 128, height: 128 },
      { src: `${DIR}/emerald.png`, alt: "Emerald", width: 518, height: 128 },
      { src: `${DIR}/igloo-new.png`, alt: "Igloo", width: 244, height: 128 },
      { src: `${DIR}/jdr.png`, alt: "JDR Group", width: 290, height: 100 },
      { src: `${DIR}/laci.png`, alt: "LACI", width: 128, height: 128 },
      { src: `${DIR}/laufer.png`, alt: "Laufer", width: 352, height: 109 },
      { src: `${DIR}/sealedair.png`, alt: "Sealed Air", width: 640, height: 132 },
      { src: `${DIR}/targus.png`, alt: "Targus", width: 474, height: 91 },
      { src: `${DIR}/tbdc.png`, alt: "TBDC", width: 594, height: 128 },
      { src: `${DIR}/tokia-marine.png`, alt: "Tokio Marine", width: 158, height: 132 },
      { src: `${DIR}/yspace.png`, alt: "YSpace", width: 314, height: 110 },
    ],
  },
} as const;

/** Live banner marquee of design samples (decorative, alt="" on live). */
export const ENT_SAMPLES = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `${DIR}/marquee${n}.webp`);

export const ENT_BRAND = {
  eyebrow: "Your Brand Deserves The Best",
  title: "Everything You Need to Create High Quality Designs",
  items: [
    {
      image: { src: `${DIR}/RequestsImg.png`, width: 603, height: 464, alt: "Unlimited Design Requests" },
      title: "Unlimited Design Requests",
      body: "Submit unlimited design and video requests with fast turnarounds, unlimited revisions, and consistent quality every time.",
    },
    {
      image: { src: `${DIR}/dedicatedTeam.png`, width: 786, height: 476, alt: "Dedicated Design Team" },
      title: "A Dedicated Design Team",
      body: "Work closely with a creative team that gets to know your brand, so that they can deliver the creatives you need, when you need them.",
    },
    {
      image: { src: `${DIR}/CollaborationImg.png`, width: 707, height: 679, alt: "Seamless Collaboration" },
      title: "Seamless Collaboration",
      body: "Manage tasks, leave feedback, track revisions, and organize projects effortlessly through the easy-to-use KIMP360 platform.",
    },
  ],
} as const;

export const ENT_SMARTER = {
  /* Live: "<span>A Smarter, Faster</span> Way to <br/>Manage Your Creative Work" */
  titleAccent: "A Smarter, Faster",
  titleRest: "Way to Manage Your Creative Work",
  first: {
    video: `${DIR}/Kanban-animation.mp4`,
    title: "Perfect for Brands Growing Fast and Needing Nonstop Creative Support.",
    body: "From daily design tasks to full-scale campaigns, KIMP scales with you. Get a dedicated creative team, unlimited requests, and seamless collaboration—all tailored to match your brand’s pace and ambitions.",
    points: ["Scales with Your Growth", "Unlimited Design Requests", "Dedicated Creative Team", "Dedicated Customer Support"],
  },
  second: {
    video: `${DIR}/Revision.mp4`,
    label: "Unlimited Design, Zero Hassle",
    title: "Stress-Free Design Support for Busy Teams and Growing Enterprise Brands Everywhere",
    body: "KIMP takes the pressure off your team with unlimited design help, a dedicated creative squad, and a simple way to manage it all—so you can move faster without the stress.",
    cta: { label: "Schedule Demo", href: DEMO },
  },
  items: [
    {
      icon: "hub",
      title: "Centralized Project Hub",
      body: "Manage your design requests easily, track revisions, and view project updates in one organized platform built for teams.",
    },
    {
      icon: "progress",
      title: "Track Progress Easily",
      body: "Say goodbye to endless updates and confusing email. See every project’s status from “Requests” to “In Progress” to “Complete” in a clear Kanban view with KIMP360.",
    },
    {
      icon: "team",
      title: "Effortless Team Collaboration",
      body: "Assign roles, share feedback, and collaborate in real-time, making design projects smooth, simple, and always in sync.",
    },
  ],
} as const;

export const ENT_SERVICES = {
  eyebrow: "At KIMP, We Design It All",
  title: "Everything You Need to Create High Quality Designs",
  items: [
    {
      title: "Graphic Design",
      body: "We create graphics for branding and ad campaigns to amplify marketing efforts.",
      images: [{ src: `${DIR}/gdimg.png`, width: 373, height: 417, alt: "Graphics Designs" }],
    },
    {
      title: "Get custom illustrations",
      body: "Get custom illustrations from logos to experimental marketing concepts.",
      images: [{ src: `${DIR}/Illustrationimg.png`, width: 422, height: 378, alt: "Graphics Designs" }],
    },
    {
      title: "Visual Identity",
      body: "Don't have a visual identity? Let us know what you'd like and we'll create one for you.",
      images: [{ src: `${DIR}/branding.png`, width: 424, height: 404, alt: "Branding Identity" }],
    },
    {
      title: "Presentations",
      body: "We create engaging designs for everything from pitch decks to corporate presentations.",
      /* Live scrolls the same strip twice ("List One" / "List Two"). */
      strip: { src: `${DIR}/marqee1.png`, width: 1550, height: 163, alts: ["Presentations List One", "Presentations List Two"] },
    },
    {
      title: "Videos & Motion Graphics",
      body: "Get scroll-stopping videos that engage, convince, and convert customers effectively.",
      images: [{ src: `${DIR}/videoService.png`, width: 762, height: 670, alt: "Video & Motion Design" }],
    },
    {
      title: "Web & App Designs",
      /* Verbatim from live (an editing note left in the template). */
      body: "stunning designs and user-friendly\" to \"stunning designs for user-friendly",
      images: [
        { src: `${DIR}/Landing-Page-showcasa.png`, width: 374, height: 1694, alt: "Web & App Designs" },
        { src: `${DIR}/landing-showcasa-mobile.png`, width: 287, height: 614, alt: "Web & App Designs" },
      ],
    },
  ],
} as const;

const CASE = "/enterprise-case";
export const ENT_CASES = {
  eyebrow: "Enjoy Premium Designs",
  title: "Enterprise Clients Get Exceptional Designs and a Seamless Workflow with KIMP",
  items: [
    {
      href: `${CASE}/how-valynt-digital-expands-their-brand-presence-with-fast-flexible-design-support-from-kimp/`,
      name: "Valynt Digital",
      body: "Faster execution and consistent visuals help maximize the impact of each campaign, driving higher returns.",
      tags: ["Graphic Design", "Web Designs", "Social Media Creative", "Package Design"],
      cover: `${DIR}/valynt-digital-cover-new.webp`,
    },
    {
      href: `${CASE}/how-sealedair-meets-diverse-design-demands-with-kimp/`,
      name: "Sealed Air",
      body: "Maintaining a unified visual identity across campaigns has led to up to 4x increases in engagement.",
      tags: ["Graphic Design", "Video Design", "App Design"],
      cover: `${DIR}/sealed-air-cover-new.webp`,
    },
    {
      href: `${CASE}/how-toronto-business-development-centre-scales-faster-with-a-dedicated-kimp-design-team/`,
      name: "TBDC",
      body: "Working with KIMP has freed up their time so they can focus on what really moves the needle.",
      tags: ["Graphic Design", "Video Design", "Package Design", "Social Media Creative"],
      cover: `${DIR}/tbdc-cover-new.webp`,
    },
    {
      href: `${CASE}/how-jdr-group-scales-creative-production-seamlessly-with-kimp/`,
      name: "JDR Group",
      body: "JDR Group has increased the production of their creatives manifold by working with KIMP to scale.",
      tags: ["Graphic Design", "Video Design", "App Design", "Illustraions"],
      cover: `${DIR}/jdr-group-cover.webp`,
    },
    {
      href: `${CASE}/how-the-u-s-army-scales-faster-with-a-dedicated-kimp-design-team/`,
      name: "U.S. Army",
      body: "KIMP takes care of The U.S. Army’s design needs so they can take care of the big picture.",
      tags: ["Graphic Design", "Web Designs", "Social Media Creative", "Package Design"],
      cover: `${DIR}/us-army-cover-new.webp`,
    },
    {
      href: `${CASE}/how-igloo-meets-diverse-design-demands-with-kimp/`,
      name: "Igloo Insurance",
      body: "Igloo saves a ton of time outsourcing design to KIMP. This gives their team more bandwidth to focus on strategy.",
      tags: ["Motion Design", "Graphic Design", "Illustraions"],
      cover: `${DIR}/igloo-insurance-cover.webp`,
    },
    {
      href: `${CASE}/how-megabus-meets-tight-deadlines-and-high-expectations-with-kimp/`,
      name: "Mega Bus",
      body: "With a dedicated design team always on standby, tasks are completed in days instead of weeks.",
      tags: ["Graphic Design", "Video Design", "App Design", "Illustraions"],
      cover: `${DIR}/mega-bus-cover-new.webp`,
    },
    {
      href: `${CASE}/how-yspace-northern-hub-scales-faster-with-a-dedicated-kimp-design-team/`,
      name: "YSpace Georgina",
      body: "KIMP takes care of YSpace Northern Hub’s design needs so they can take care of the big picture.",
      tags: ["Graphic Design", "Video Design", "App Design", "Illustraions"],
      cover: `${DIR}/yspace-georgina-cover-new.webp`,
    },
    {
      href: `${CASE}/how-emerald-reduces-creative-overhead-while-increasing-output-with-kimp/`,
      name: "Emerald",
      body: "With a dedicated KIMP design team always on standby, tasks are completed in days instead of weeks.",
      tags: ["Graphic Design", "Video Design", "App Design", "Illustraions"],
      cover: `${DIR}/emerald-cover-new.webp`,
    },
    {
      href: `${CASE}/how-tokio-marine-insurance-group-supports-multi-channel-marketing-efforts-through-kimp/`,
      name: "Tokio Marine Insurance",
      body: "Maintaining a unified visual identity across campaigns has led to up to 4x increases in brand recognition.",
      tags: ["Motion Design", "Graphic Design", "Illustraions"],
      cover: `${DIR}/tokio-cover.webp`,
    },
    {
      href: `${CASE}/how-beam-minerals-scales-faster-with-a-dedicated-kimp-design-team/`,
      name: "Beam Minerals",
      body: "KIMP takes care of Beam Minerals design needs so they can be freed up to take care of the big picture.",
      /* Live lists "Graphic Design" twice on this card. */
      tags: ["Graphic Design", "Video Design", "Graphic Design", "Illustraions"],
      cover: `${DIR}/beam-minerals-covernew.webp`,
    },
    {
      href: `${CASE}/how-global-access-uses-kimp-to-eliminate-bottlenecks-and-drive-visual-consistency/`,
      name: "Global Access",
      body: "Faster execution and consistent visuals help maximize the impact of each campaign, driving higher returns.",
      tags: ["Graphic Design", "Web Designs", "Social Media Creative", "Package Design"],
      cover: `${DIR}/global-access-cover-new.webp`,
    },
  ],
} as const;

const CONCIERGE_TIP =
  "Hands-off creative execution - your dedicated concierge handles brief creation, posting requests, prioritization, and coordination with the design team";
const SHARED_FEATURES = [
  "Dedicated Creative Director",
  "AI-Savvy Designers",
  "Priority delivery (12–24 hrs)",
  "API + Zapier Access",
  "Monthly Strategy Check-ins",
  "Tailored Onboarding",
  "Slack support",
] as const;
const TAIL = [{ label: "Concierge service included", tip: CONCIERGE_TIP }, { label: "6 hours creative consultation/month" }, { label: "Kimp360 platform access" }];

export const ENT_PRICING = {
  /* Live: "<span>Effortlessly Elevate</span> How You <br/> Manage Design Projects" */
  titleAccent: "Effortlessly Elevate",
  titleRest: "How You Manage Design Projects",
  cta: { label: "Schedule your Demo Now", href: DEMO },
  plans: [
    {
      name: "Enterprise Graphics",
      was: "$4,000",
      price: "$2,000",
      per: "/ Month",
      save: "SAVE 2000 USD First Month!",
      features: [
        ...["100 creative hours/month", "Up to 5 design tasks in progress at a time", "Dedicated creative team", ...SHARED_FEATURES].map((label) => ({ label })),
        ...TAIL,
      ],
    },
    {
      name: "Enterprise Graphics + Video",
      was: "$6,500",
      price: "$3,250",
      per: "/ Month",
      save: "SAVE 3250 USD First Month!",
      featured: true,
      features: [
        ...["200 creative hours/month", "Up to 5 graphic and 3 video tasks at a time", "Dedicated graphics + video teams", ...SHARED_FEATURES].map((label) => ({ label })),
        ...TAIL,
      ],
    },
    {
      name: "Enterprise Video",
      was: "$4,000",
      price: "$2,000",
      per: "/ Month",
      save: "SAVE 2000 USD First Month!",
      features: [
        ...["100 creative hours/month", "Up to 3 design tasks in progress at a time", "Dedicated video team", ...SHARED_FEATURES].map((label) => ({ label })),
        ...TAIL,
      ],
    },
  ],
} as const;

export const ENT_WHAT_WE_DO = {
  title: "Get Unlimited Graphics, Videos & Development Work Done",
  intro: "We can help you with almost everything you might need in the graphic, video, and web development departments.",
  tabs: [
    {
      id: "graphics",
      label: "Graphics",
      items: [
        { label: "Amazon Graphics" }, { label: "Advanced Infographics" }, { label: "App Designs" }, { label: "Background Removal" },
        { label: "Basic GIFs", tip: "Basic GIFs are simple animations, 2-3 seconds long, which are created in Photoshop and include text animations, flashing buttons, etc." },
        { label: "Billboards" }, { label: "Blog Images" }, { label: "Book Covers" }, { label: "Book Layouts" }, { label: "Booklets" },
        { label: "Brochures" }, { label: "Business Cards" }, { label: "Business Reports" }, { label: "Characters & Mascots" },
        { label: "Company Profiles" }, { label: "Corporate Folders" }, { label: "Custom Illustrations" }, { label: "Display Ads" },
        { label: "Ebook Covers" }, { label: "Ebook Layouts" }, { label: "Ecommerce Graphics" }, { label: "EDM (Email Direct Mail)" },
        { label: "Email Signatures" }, { label: "Event Invitations" }, { label: "Flyers & Posters" }, { label: "Icons" },
        { label: "Landing Pages" }, { label: "Logos" }, { label: "Magazine & Newspaper Ads" }, { label: "Newsletters" },
        { label: "NFT Designs" }, { label: "Packaging & Labels" }, { label: "Podcast Covers" }, { label: "Point Of Sale Materials" },
        { label: "PowerPoint Templates" }, { label: "Presentation Decks" }, { label: "Print Ads" }, { label: "Product Mock-ups" },
        { label: "Promotional Materials" }, { label: "Restaurant Menus" }, { label: "Signage" }, { label: "Simple Infographic" },
        { label: "Social Media Posts & Ads" }, { label: "Stationery Sets" }, { label: "T-shirt Design" }, { label: "Tradeshow Banners" },
        { label: "UI Designs" }, { label: "Vehicle Wraps" }, { label: "Website Designs" }, { label: "Web Ads" },
      ],
      note: "And just about anything that can be designed in PS, AI, or INDD.",
    },
    {
      id: "dev",
      label: "Dev",
      items: [
        "Blog Pages", "Code Snippets", "CRM Integrations", "Email Templates", "Form Integrations", "Landing Pages", "Lead Capture Forms",
        "Popups", "WordPress Customization", "Responsive Fixes", "SEO Tweaks", "UI Animations", "WordPress Setup",
      ].map((label) => ({ label })),
    },
    {
      id: "videos",
      label: "Videos",
      items: [
        "Adding Thumbnails", "Animating Static Designs", "Basic & Advanced GIFs", "Cinemagraphs", "Combining/Editing Raw Footage",
        "Company Culture Videos", "Demo Videos", "Educational Videos", "FAQ Videos", "Logo Animations", "Product Highlight Videos",
        "Social Media Videos", "Testimonial Videos", "Text Overlays", "And More!",
      ].map((label) => ({ label })),
    },
  ],
} as const;

export const ENT_TESTIMONIALS = {
  eyebrow: "Testimonials",
  title: "What Clients Say",
  intro: "Find out what KIMP's Enterprise clients have to say about our services. From ideation to execution and customer service, we go above and beyond to get results.",
  items: [
    {
      quote: "“We need a mix of graphic design and video editing works, so Kimp’s affordable pricing allows us to produce designs based on our brand guidelines at scale for our various markets.”",
      logo: { src: `${DIR}/Igloo.png`, alt: "Igloo" },
      name: "Vance Wong,",
      role: "Regional Growth & Brand Marketing Manager, Igloo Insurance",
    },
    {
      quote: "“In the last 12 months, Kimp has created 500+ digital assets for WGAN (including for our clients/prospective clients). By creating a professional “look” to all WGAN brand assets has enabled us to attract more and larger clients.”",
      logo: { src: `${DIR}/aroundnetwork.png`, alt: "Around Network" },
      name: "Dan Smigrod",
      role: "Founder & CEO, We Get Around Network",
    },
    {
      quote: "“Working with my KIMP team has been a delight. They usually get the designs right on the first attempt, which eliminates the need for a lot of back-and-forth revisions. This efficiency makes the entire process very easy for us and significantly streamlines our workflow.”",
      logo: { src: `${DIR}/Wizards.png`, alt: "Wizards" },
      name: "Petteri Pucilowski",
      role: "CEO of Search Engine Wizards",
    },
  ],
} as const;

export const ENT_INTEGRATIONS = {
  eyebrow: "Integrations",
  title: "Easily centralize the platforms, people, and processes your team uses",
  body: "KIMP integrates with your favorite tools to streamline your workflow and keep your team connected. From project management to design collaboration, we've got you covered.",
  /* Live logos have alt="" (decorative). */
  logos: ["integrations1", "Integrations2", "Integrations3", "Integrations4", "Integrations5", "Integrations6", "Integrations7", "Integrations8", "Integrations9", "Integrations10"].map(
    (n) => `${DIR}/${n}.svg`,
  ),
} as const;

export const ENT_FAQ = {
  title: "FAQs",
  cta: { label: "Read All FAQs", href: "/faq/" },
  help: {
    title: "Still have questions?",
    body: "If you can’t find the answer to your question in our FAQ, drop us a line. We'll get back to you shortly!",
    /* Live link, as on the page (not /contact-us/). */
    cta: { label: "Contact us", href: "/contact/" },
  },
} as const;

/** Live closing section: <h6> "GET STARTED" + <h2>. */
export const ENT_CTA = {
  eyebrow: "GET STARTED",
  eyebrowAs: "h6",
  title: "Experience Seamless Design with Kimp",
  primary: { label: "Schedule Demo", href: DEMO },
} as const;
