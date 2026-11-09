/**
 * /canva-designers/ copy, taken verbatim from the live page (WordPress template
 * "template-canva", title "canva - Kimp"; typos kept).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live, in order: no <h1>; hero <h2>
 * "Unlimited Design: Get KIMP for Canva!"; <h2> "Why Choose KIMP…" with four
 * <h3>; <h2> "Testimonials" with four <h3> names; <h2> "KIMP Perks" with six
 * <h3>; <h2> "KIMP’s Canva Designers…" with an <h4> in each tab; <h2> "Need
 * custom designs for Canva?"; <h2> "Custom Canva Design Subscriptions from
 * KIMP" with two <h3> plans; <h2> "Need An Enterprise Solution?"; <h2> "Need
 * designs created using Adobe…"; <h2> "Canva Video Animation & Editing
 * Samples"; <h2> "Kimp Is Highly Recommended…" (<h6> figures); <h2> "Canva
 * Graphic Design Samples"; <h3> "Ready to find out more about KIMP for Canva?";
 * <h2> "FAQs" with one <h4> per question.
 *
 * The FAQ questions and answers are NOT kept here: WordPress manages them
 * (lib/wp/canva-faqs.ts reads them from the WordPress-rendered page).
 */

export const PATH = "/canva-designers/";

export const CV_HERO = {
  eyebrow: "KIMP for Canva",
  /* Live: "Unlimited Design: Get <br>KIMP for Canva!" */
  title: { lead: "Unlimited Design: Get", highlight: "KIMP for Canva!" },
  intro: "Get an experienced design team to create custom designs in Canva with KIMP’s unlimited design subscriptions.",
  primaryCta: { label: "See Pricing", href: "#plans-pricing" },
  /** Opens in a new tab, as live. */
  secondaryCta: { label: "Schedule Demo", href: "https://www.kimp.io/canva-demo-call/" },
  features: ["Sign up in 2 minutes", "Cancel any time", "Absolutely no contracts"],
  marquee: ["Canva", "Graphics", "Video", "Templates", "Unlimited"],
  strip: ["Expert Canva Design Team", "Unlimited Revisions", "Fast Turnaround", "Affordable Pricing"],
  /** Master flying pose holding a tablet with a design canvas (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/canva-designers.webp", width: 1448, height: 1086 },
} as const;

export const CV_WHY = {
  eyebrow: "Why KIMP",
  title: "Why Choose KIMP to Create Custom Designs For You in Canva?",
  items: [
    { icon: "users", title: "Expert Canva Design Team", body: "Our team of Canva design specialists are ready to design for you! We custom design AI-powered graphics and videos in Canva." },
    { icon: "revisions", title: "Unlimited Revisions", body: "Get unlimited design revisions from your Kimp Team, and easily make your own edits, on all of your custom design projects in Canva." },
    { icon: "timer", title: "Fast Turnaround", body: "Our efficient design process ensures that you receive top-quality custom Canva designs within quick turnaround times." },
    { icon: "tag", title: "Affordable Pricing", body: "Design services shouldn't break the bank. Our competitive pricing structure means you get more custom Canva designs for less." },
  ],
} as const;

export const CV_TESTIMONIALS = {
  eyebrow: "Client stories",
  title: "Testimonials",
  intro: "Check out what our clients have to say about KIMP's custom design services for Canva.",
  cta: { label: "View All Reviews", href: "/reviews" },
  items: [
    {
      avatar: "/images/company-2/mr.png",
      name: "Matthew Reynolds,",
      company: "English-Please.com",
      quote:
        "\"Our experiences with Kimp.io have all been very positive. They are a highly professional organisation who produce great designs in fast turnaround times. They listen to feedback and are capable of taking revision requests onboard to give you exactly what you're looking for. I would highly recommend using them if you are in the market for some custom images. Will definitely work with them again the next time we need design work done!\"",
    },
    {
      avatar: "/images/company-2/cr.png",
      name: "Courtney Rieger,",
      company: "KIMP Client, Lighthouse Digital Marketing",
      quote:
        "\"I don't know how I lived before Kimp, it is absolutely the most bang for your buck delivering excellent quality assets with very little back and forth. My project manager Sandra is amazing, interprets my briefs perfectly and the turnaround time is always very fast. Loving my experience so far and growing my agency with this tool. When my clients are happy, I'm happy!\"",
    },
    {
      avatar: "/images/company-2/jw.png",
      name: "Jay Wiggs,",
      company: "KIMP Client, Small Business Owner.",
      quote:
        "\"The experience with the Kimp team has been nothing short of amazing!! The turn around times are great and even when revisions are need they handle them in a timely manner. The design and video work has been great. I wish I had know about the Kimp Team years ago\"",
    },
    {
      avatar: "/images/company-2/sk.png",
      name: "Saru Kana,",
      company: "Co-Founder, Boring People Inc.",
      quote:
        "\"Using KIMP's design service for Canva has been a great decision for our brand. We're able to rely on the creativity of our KIMP design team, to make the most of all the different options in Canva, including the new AI features they're rolling out. And since all the designs are done in Canva, we can easily make minor edits when we need to as well.\"",
    },
  ],
} as const;

export const CV_PERKS = {
  eyebrow: "What you get",
  title: "KIMP Perks",
  /* Live: two lines (<br> after "expensive."). */
  introLines: ["Stop chasing after designers that are unreliable and expensive.", "Get your very own custom design team for Canva at a fraction of the cost."],
  items: [
    { icon: "pen", title: "Unlimited Design", body: "Get unlimited requests and unlimited revisions. We work through your custom designs, in the order you need them!" },
    { icon: "layout", title: "Access To KIMP360", body: "Make and manage custom design requests for all your brands and clients in one place - KIMP360!" },
    { icon: "timer", title: "24 Hour Turnarounds", body: "Get turnaround times as fast as 24 hours for simple custom Canva graphics or video editing or animations tasks." },
    { icon: "grid", title: "100+ Design Categories", body: "Choose from over 100 types of custom graphic or video designs with a single KIMP design subscription for Canva." },
    { icon: "headset", title: "24/7 Customer Support", body: "Need help? Kimp’s Customer Support Team is available, via live chat, to answer your questions around the clock." },
    { icon: "star", title: "Top-Tier Designers", body: "Kimp recruits and hires the best graphic and motion graphics designers to work on your projects." },
  ],
} as const;

export type CanvaIcon = (typeof CV_WHY.items)[number]["icon"] | (typeof CV_PERKS.items)[number]["icon"];

/** Both tab panels carry the same live <h4> (line break after "anything"). */
const TAB_HEADING = ["Our experienced designers can custom design and edit anything", "in Canva for you."] as const;

export const CV_TEAM = {
  eyebrow: "Your Canva team",
  title: "KIMP’s Canva Designers Help You Design Better And Scale Faster",
  /* Live: line break after "types of". */
  introLines: [
    "Your team includes 1 Project Manager and 3 Designers. They specialize in different types of",
    "Canva designs. And they can fulfill a variety of custom design requests in Canva!",
  ],
  tabs: [
    {
      id: "graphics",
      label: "The Graphics We Design In Canva",
      heading: TAB_HEADING,
      items: [
        "A4 Document", "Announcement", "Birthday Card", "Birthday Invitation", "Blog Banner", "Book Cover", "Bookmark", "Brochure",
        "Business Card", "Calendar", "Card", "Certificate", "Desktop Wallpaper", "Email Header", "Etsy Shop Cover", "Etsy Shop Icon",
        "Facebook Ad", "Facebook App Ad", "Facebook Cover", "Facebook Event Cover", "Facebook Post", "Flyer", "Gift Certificate", "Infographic",
        "Instagram Post", "Instagram Story", "Invitation", "Invoice", "Label", "Landing Pages", "Large Rectangle Ad", "Leaderboard Ad",
        "Lesson Plan", "Letter", "LinkedIn Banner", "Logo", "Magazine Cover", "Medium Rectangle Ad", "Menu", "Mind Map",
        "Newsletter", "Photo Collage", "Pinterest Graphic", "Podcast Cover", "Postcard", "Poster", "Presentation", "Product Label",
        "Recipe Card", "Resume", "Snapchat Geofilter", "Ticket", "Tumblr Graphic", "Twitter Header", "Twitter Post", "Wattpad Book Cover",
        "Wedding Invitation", "Wide Skyscraper Ad", "Worksheet", "Yearbook", "YouTube Channel Art", "YouTube Thumbnail", "And More!",
      ],
    },
    {
      id: "videos",
      label: "The Videos We Design In Canva",
      heading: TAB_HEADING,
      items: [
        "Adding animations", "Adding audio tracks", "Adjust the speed of a video", "Autoplay or loop a video", "Carousel Video Ads",
        "Facebook Videos", "GIFs", "In-Feed Video Ads", "Instagram Video Ads", "Instagram Videos", "InstagramReels", "LinkedIn Videos",
        "Mobile Videos", "Photo Videos", "Promo Videos", "Slideshow Videos", "Stories", "Stories Ads", "Template Customization",
        "TikTok Videos", "Trimming video", "Twitch Backgrounds", "Twitch Screens", "Twitter Videos", "Video Collages", "Video Intros",
        "Video Messages", "YouTube clip maker", "YouTube Video Ads", "And More!",
      ],
    },
  ],
} as const;

export const CV_CALL_BANNER = {
  title: "Need custom designs for Canva?",
  /* Live: line break after "KIMP’s". */
  bodyLines: ["Find out how Canva’s AI-powered design & KIMP’s", "Canva designers can help."],
  /** Opens in a new tab, as live. */
  cta: { label: "Book A Call", href: "https://www.kimp.io/canva-demo-call/" },
} as const;

const STOCK_TIP = "Your dedicated design team will source stock assets to create your designs with, as needed.";

export const CV_PLANS = {
  eyebrow: "Plans",
  title: "Custom Canva Design Subscriptions from KIMP",
  /* Live: "Choose the <b>unlimited</b> Canva design subscription that’s right for you!" */
  intro: { before: "Choose the ", bold: "unlimited", after: " Canva design subscription that’s right for you!" },
  plans: [
    {
      name: "Canva Graphics",
      body: "Canva graphic design + editing in Canva for all of your brand's marketing needs.",
      features: [
        "Unlimited Requests", "Unlimited Revisions", "Unlimited Brands", "No Contract", "3 Active Canva Graphics Requests",
        "24 Hour Turnaround, On Average", "Editable Canva Links (Source Files) Provided", "Dedicated Design Team", "Dedicated Project Manager",
        { label: "Free Stock Images", tip: STOCK_TIP },
        "Includes Print & Digital Designs, Presentation Designs, Landing Page Designs and all Canva graphic design categories",
        "Also Includes Template Customization", "KIMP360 Project Management",
      ],
      cta: { label: "Start Free Trial", href: "/register-now?plan=canva" },
    },
    {
      name: "Canva Plus",
      badge: "Best Value",
      body: "Get everything from Canva Graphics AND Video animations + editing in Canva for a discounted flat monthly fee.",
      features: [
        "Unlimited Requests", "Unlimited Revisions", "Unlimited Brands", "No Contract", "3 Active Canva Graphics Requests & 2 Active Canva Video Requests",
        "24 Hour Turnaround For Graphics, On Average", "1-2 Day Turnaround For Video, On Average", "Editable Canva Links (Source Files) Provided",
        "Dedicated Design & Video Team", "Dedicated Project Manager",
        { label: "Free Stock Images, Videos & Audio", tip: STOCK_TIP },
        "Also Includes Template Customization", "Includes all Canva graphic design and video design categories", "KIMP360 Project Management",
      ],
      cta: { label: "Start Free Trial", href: "/register-now?plan=canva" },
    },
  ],
  enterprise: {
    title: "Need An Enterprise Solution?",
    body: "If your company needs a custom solution, tailored to your unique design needs and workflow, KIMP can help. Book a call to get started.",
    /** Opens in a new tab, as live. */
    cta: { label: "Book A Demo", href: "https://www.kimp.io/know-about-enterprise-solution/" },
  },
} as const;

export const CV_OTHER = {
  title: "Need designs created using Adobe Photoshop, Illustrator, InDesign or Figma? How about Adobe After Effects or Premiere Pro?",
  cta: { label: "Check Out KIMP's Other Subscriptions", href: "/pricing/" },
} as const;

export const CV_VIDEOS = {
  eyebrow: "Video samples",
  title: "Canva Video Animation & Editing Samples",
  intro: "We can create a wide range of videos in Canva. Check out these samples to see what we can do for you!",
  /** Muted looping clips, as live (videos on Kimp's S3 bucket, posters from the theme). */
  items: [
    ["prideCover.png", 1], ["fishCover.png", 2], ["powerfullCover.png", 3], ["enjoyCover.png", 4], ["holidayCover.png", 5],
    ["novalogoCover.png", 6], ["shopmytiaraCover.png", 7], ["outroCover.png", 8], ["infographiCover.png", 9],
  ].map(([poster, n]) => ({
    poster: `/images/company-2/${poster}`,
    src: `https://kimpmedia.s3.eu-west-2.amazonaws.com/KIMP_VIDEO/canva/Canvavideo${n}.mp4`,
  })),
} as const;

export const CV_RATINGS = { eyebrow: "Rated by real clients", title: "Kimp Is Highly Recommended By Companies Like Yours" } as const;

export const CV_SAMPLES = {
  eyebrow: "Graphic samples",
  title: "Canva Graphic Design Samples",
  /* Live: line break after "samples of". */
  introLines: ["We design for a wide range of clients. Check out these samples of", "our work to see what we can do for you!"],
  /** The live slider's 44 WordPress uploads (hardcoded in the template). */
  images: Array.from({ length: 44 }, (_, i) => `https://www.kimp.io/wp-content/uploads/2023/06/canvaSample${i + 1}.png`),
} as const;

export const CV_CALL = {
  title: "Ready to find out more about KIMP for Canva?",
  body: "Book a call with the KIMP Team to find out all about our custom design subscriptions for Canva. We cover topics including workflow, turnaround times, and more! Plus you’ll find out about exclusive discounts for new clients.",
  cta: { label: "Book A Call", href: "https://www.kimp.io/canva-demo-call/" },
  image: { src: "/images/audience/cat-monky-with-calander.webp", width: 1610, height: 1350 },
} as const;

export const CV_FAQ = {
  eyebrow: "Questions",
  title: "FAQs",
  cta: { label: "Read All FAQs", href: "https://www.kimp.io/faq/" },
  unavailable: "The FAQs couldn’t be loaded right now.",
} as const;
