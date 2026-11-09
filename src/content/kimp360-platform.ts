/**
 * /kimp360-platform/ copy, links and media, taken verbatim from the live page.
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): heading text and levels mirror the
 * live page, which has no <h1>. Hero and section titles are <h2>; each feature
 * has an <h3> label followed by an <h2> title; review titles and reviewer
 * names are <h4>; rating figures <h6>; the five subscriptions are <h2>; the
 * closing demo card is an <h3>. The live hero has no client-logo strip.
 *
 * The "New Features & Updates" cards are the 3 latest WordPress posts in the
 * "Kimp 360 Product" category (id 2217), fetched at render time, so new
 * updates appear without a deploy, as on live.
 */

export const PATH = "/kimp360-platform/";

export const K360_HERO = {
  eyebrow: "KIMP360 · Your design HQ",
  /* Rendered "KIMP360 -" + line break + "Design Made Easy": same text as the live <h2>. */
  title: { lead: "KIMP360 -", highlight: "Design Made Easy" },
  intro:
    "KIMP has built a platform to help you make, manage, and collaborate on, design requests, quickly and easily. Get access to KIMP360 with every unlimited design subscription from KIMP.",
  primaryCta: { label: "Schedule Demo", href: "/book-a-call" },
  video: { label: "How it works", src: "https://www.youtube.com/embed/Sa20jGoBSnI" },
  marquee: ["KIMP360", "Design Made Easy", "Requests", "Feedback", "Brands"],
  strip: ["Kanban boards", "AI-powered requests", "Point & click feedback", "Unlimited brands", "All your files"],
  mascot: { src: "/images/mascot/inner/kimp360.webp", width: 1448, height: 1086 },
} as const;

export type FeatureId = "kanban" | "collaboration" | "requests" | "feedback" | "brands" | "files";

export const K360_HUB = {
  eyebrow: "Inside KIMP360",
  title: "Your One-Stop Creativity Hub",
  intro:
    "Use KIMP360 to stay on top of your design projects. From collaboration, to feedback and AI-powered tools, we’ve got you covered.",
  features: [
    {
      id: "kanban",
      label: "The Kanban View",
      title: "Stay on top of it all",
      body: [
        "Easily monitor the status of your design projects with this bird’s eye view. You’ll see tasks move from “Requests” to “In Progress” to “In Review” and then “Completed”.",
        "And you can create drafts, custom lists or tags to organize your design projects - all in one place!",
      ],
      image: { src: "/images/kimp360/360screenshort-new.webp", width: 1919, height: 987 },
    },
    {
      id: "collaboration",
      label: "Collaboration",
      title: "Collaborate with ease",
      body: [
        "Invite team members to your KIMP360 board and choose whether they will be admins, associates, or simply have viewer access.",
        "Connect with your Kimp Team via your KIMP360 board 5 days a week, and the Customer Support Team 24/7 via live chat.",
      ],
      image: { src: "/images/kimp360/invite-img-new.webp", width: 1919, height: 987 },
    },
    {
      id: "requests",
      label: "AI-Powered Requests",
      title: "Make requests easily",
      body: [
        "Use Kimp’s AI-powered design request form to make design requests with ease. Just start entering the type of design you need and watch the magic happen",
        "The form will generate recommended sizes, as well software and output formats. Choose what you need. Fill in a few fields. And hit submit.",
      ],
      image: { src: "/images/kimp360/design-request-new.webp", width: 1919, height: 1016 },
    },
    {
      id: "feedback",
      label: "Custom Feedback Tool",
      title: "Share precise feedback",
      body: [
        "With KIMP360’s custom feedback tool you’ll be able to point, click and share feedback. This means you can show your designer exactly what needs to be changed in a graphic or video. And you’ll get your revisions done much more efficiently.",
      ],
      image: { src: "/images/kimp360/feedback-tool-img.webp", width: 1604, height: 902 },
    },
    {
      id: "brands",
      label: "Unlimited Brands",
      title: "Support more brands",
      body: [
        "Create brand profiles, and upload their assets (fonts, logos, imagery, etc.), just once. You can then simply refer to them in your design requests.",
        "And your team will deliver on-brand creatives for as many different brands as you need.",
      ],
      image: { src: "/images/kimp360/brand-screenshort-new.webp", width: 1919, height: 987 },
    },
    {
      id: "files",
      label: "File Management",
      title: "Easily access ALL your files",
      body: [
        "Want you design files at your fingertips? You’ve got it. With KIMP360 you can easily find all of your design project files in one place. From the different versions your team works on, to the final iterations and source files.",
        "Everything you need is in KIMP360.",
      ],
      image: { src: "/images/kimp360/file-management-new.webp", width: 1919, height: 988 },
    },
  ] satisfies {
    id: FeatureId;
    label: string;
    title: string;
    body: string[];
    image: { src: string; width: number; height: number };
  }[],
  video: { label: "Watch KIMP360 101", src: "https://www.youtube.com/embed/PmpG5qzka80" },
};

/** Live "trustpilot_section user_experiance_sec": title and reviewer are both <h4>. */
export const K360_REVIEWS = {
  source: { name: "Trustpilot", logo: "/images/graphics/trustpilot-white.svg", width: 199, height: 98 },
  items: [
    {
      title: "Beyond thrilled with Kimp!",
      quote:
        "Beyond thrilled with Kimp! I came to the service hoping it would be good to help with some design needs and challenges I have, and I have been blown away ever since. My expectations have been exceeded, and the process they have for submitting and working through designs with the team is so intuitive. At first, I thought it would be another thing to have to manage, but Kimp makes everything so easy. I'm so glad to be using them, and I have a feeling we'll be working together for a long time. I'm hooked on the service!",
      author: "Melissa MacPherson",
    },
    {
      title: "Great experience!",
      quote:
        "Great experience! Donna is fantastic, the software utilized is clear and concise, making the back and forth revisions as easy as possible. Size and dimension work is great, same with the types of graphics you can receive! There is also no limit to the format your graphics take place, or your preferred software! From Canva to Adobe they got you covered.",
      author: "Evan Hatmaker",
    },
    {
      title: "Very happy with the service!",
      quote:
        "Communication with the team is fast and easy. We've been working with them for about two years and are very pleased with the results of their work. They always keep track of instructions and have no trouble making amendments when needed.",
      author: "Marta Cano",
    },
    {
      title: "10/10",
      quote:
        "Kimp is the best unlimited design service. The team is friendly, helpful, and delivers excellent work on schedule. The designs are phenomenal and 100% worth the monthly subscription cost. Strongly recommend!",
      author: "Osman Husain",
    },
  ],
} as const;

export const K360_UPDATES = {
  eyebrow: "Shipped weekly",
  title: "New Features & Updates Added Weekly!",
  intro:
    "When we built and launched KIMP360 we were just getting started. We’re constantly optimizing the platform and adding new features regularly too.",
  /** WordPress category "Kimp 360 Product". */
  categoryId: 2217,
  count: 3,
  more: "Learn More",
  cta: { label: "View All KIMP360 Updates", href: "/kimp360-product-updates" },
} as const;

export const K360_SUBSCRIPTIONS = {
  eyebrow: "Included with every plan",
  title: "Every one of KIMP’s unlimited design subscriptions includes access to KIMP360!",
  items: [
    { name: "Kimp Graphics", body: "Graphic designs for day-to-day marketing needs and big campaigns.", kind: "graphics" },
    { name: "Kimp Video", body: "Video designs and motion graphics to ramp up your content marketing.", kind: "video" },
    { name: "Kimp Graphics + Video", body: "Get everything from Kimp Graphics + Kimp Video for a discounted flat monthly fee.", kind: "video" },
    { name: "Canva Graphics", body: "Canva graphic design + editing in Canva for all of your brand's marketing needs.", kind: "canva" },
    { name: "Canva Plus", body: "Get everything from Canva Graphics + Video animations in Canva for a discounted flat monthly fee.", kind: "canva" },
  ],
} as const;

export const K360_DEMO = {
  title: "Experience KIMP360 In Action!",
  body: "Want to see how KIMP360 works? Schedule a live demo to get a full overview of our one-stop creativity hub.",
  cta: { label: "Book a Call", href: "/book-a-call/" },
  image: { src: "/images/kimp360/kimp360-bookacall.webp", width: 2250, height: 1588 },
} as const;
