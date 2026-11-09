/**
 * Copy of the five role pages under /careers/, taken verbatim from live (typos
 * included). Each page has its own WordPress template (template-career_details,
 * template-career_mgd_details, ...), but all five share one structure, so they
 * share one component (src/components/careers/role-page.tsx) and differ only here.
 * Nothing on these pages is WordPress-managed: the copy is hardcoded in the PHP.
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for each exact URL. Headings mirror live, in order: <h1> role title,
 * then <h4> for each block: "What makes working at Kimp unique?",
 * "Responsibilities:", "Professional Requirements:", "Equipment Requirements:",
 * "Benefits", the role's "What kind of ..." list, "Check out some samples of
 * our work on our website: <url>" (the link sits inside the <h4>, as on live)
 * and "A few final housekeeping items:". The hero subtitle
 * "Remote Work - Full-Time Roles" is not a heading on live.
 *
 * "Apply to Position" links to the role's kimp.me application page, as on live
 * (no form on these pages).
 */

type Block = { title: string; items: readonly string[] };

export type CareerRole = {
  slug: "graphic-designer" | "project-manager" | "content-writer" | "motion-graphics-artist" | "illustrator";
  path: string;
  /** Giant drifting words / pill row in the hero panel (decorative, from the page's own content). */
  marquee: readonly string[];
  strip: readonly string[];
  /** Master flying pose holding the role's prop (composited; see brand/mascot/README.md). */
  mascot: { src: string; width: number; height: number };
  /** Live <h1>. */
  title: string;
  /** Live first paragraph (hero intro) and second paragraph. */
  intro: string;
  lead: string;
  unique: { title: string; body: readonly string[] };
  /** Responsibilities, Professional Requirements, Equipment Requirements, Benefits. */
  details: readonly [Block, Block, Block, Block];
  kinds: Block;
  /** `url` is the live link text (shown inside the <h4>); `href` the same page on this site. */
  samples: { title: string; url: string; href: string };
  housekeeping: Block;
  apply: { label: string; href: string };
};

/** Live hero subtitle under every role title (two spans with a dash between). */
export const ROLE_SUBTITLE = ["Remote Work", "Full-Time Roles"] as const;

/* The 30-item list the Graphic Designer, Project Manager and Illustrator pages all show. */
const SERVICE_KINDS = [
  "Display ads",
  "Print or digital brochures",
  "T-shirt graphics",
  "Tradeshow marketing materials",
  "Facebook ad graphics",
  "Instagram graphics",
  "Google display ads",
  "Social media quotes",
  "Promotional items",
  "Outdoor graphics",
  "Stickers",
  "Sales sheets",
  "Event flyers",
  "Email header graphics",
  "Blog header graphics",
  "Website \"hero\" images",
  "Basic photo edits & manipulation",
  "Knocking out backgrounds",
  "E-commerce graphics",
  "Update/refresh existing logo",
  "Presentation graphics",
  "Revising webpage mockup",
  "Basic wireframe template (no coding)",
  "Animated GIFs",
  "Original logos and branding",
  "illustrations",
  "Original infographics",
  "InDesign projects",
  "Large copy-heavy layout projects (8 or more pages)",
  "And many, many more types of requests.",
] as const;

const GRAPHIC_DESIGNER: CareerRole = {
  slug: "graphic-designer",
  path: "/careers/graphic-designer/",
  marquee: ["Graphic Designer", "Remote Work", "Full-Time", "Print & Digital", "Adobe CC"],
  strip: ["Work from anywhere", "Biweekly pay", "Free training", "Career growth"],
  mascot: { src: "/images/mascot/inner/careers-graphic-designer.webp", width: 1448, height: 1086 },
  title: "Graphic Designer",
  intro: "Tired of navigating through traffic to get to the office? Don’t want to spend another minute finding clients and negotiating freelance contracts? Say hello to Kimp!",
  lead: "As a Kimp Designer you’ll get the flexibility of working from home. But wait, there’s more! You’ll also get peace of mind knowing that you’ll have a steady stream of projects, and a consistent pay schedule. All of this while supporting Kimp clients from around the world, on their unique projects!",
  unique: {
    title: "What makes working at Kimp unique?",
    body: [
      "We’re glad you asked! So far, Kimp’s incredible design team is based in Thailand, Malaysia, India, Indonesia, and Sri Lanka. The role combines the flexibility of remote work with the connectedness of our team culture.",
      "Through team chats and video calls, we stay connected, sharing updates, success stories, and inspiration. All this while you get to enjoy a great work-life balance, by cutting out commute times and other hassles.",
    ],
  },
  details: [
    {
      title: "Responsibilities:",
      items: [
        "Review client creative briefs, and pose questions to your Project Manager if clarification is required. Provide feedback and recommendations if a modification to the brief could improve the design.",
        "Execute graphic design requests efficiently, based on each client’s requirements, and within the scheduled project timeline. Keeping tasks in scope and on time, is key!",
        "Follow internal processes and ask for clarification as needed. Remain in constant contact with team members to ensure that tasks are executed as required.",
        "Troubleshoot any issues that arise, by looking into resolutions or contacting team members for support. We encourage you to anticipate and be prepared for common issues that might arise, but to also be ready and willing to take initiative should anything unpredictable arise.",
        "Make sure that projects are completed accurately, per the client’s brief. Review all files before submitting them to your Project Manager to share with your Team’s clients.",
        "Be available to work full-time, during your scheduled shift, responding promptly to communications from team members.",
      ],
    },
    {
      title: "Professional Requirements:",
      items: [
        "A friendly, positive, solution-oriented attitude.",
        "Graphic design experience, working on print and digital creatives.",
        "Being a team player, and giving and receiving constructive feedback and support.",
        "Strong attention to detail, and the ability to review and assess creative briefs.",
        "Strong communication skills in English.",
        "Strong proficiency in Adobe Photoshop, Illustration, and InDesign.",
      ],
    },
    {
      title: "Equipment Requirements:",
      items: [
        "A fully functional computer or laptop that can handle working on a lot of projects!",
        "The most recent versions of Adobe CC, AI, PSD, and INDD should be installed on your computer or laptop.",
        "A web camera for meetings, training, and professional development sessions.",
        "Daily and unlimited access to a fast internet connection (minimum of 5 Mbps)",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Work from anywhere you'd like as long as you meet the equipment requirements!",
        "Competitive pay and a consistent, biweekly pay schedule.",
        "Internal career/promotion opportunities, including roles beyond graphic design.",
        "Free training, personal, and professional development opportunities.",
      ],
    },
  ],
  kinds: {
    title: "What kind of graphics do Kimp Designers create?",
    items: SERVICE_KINDS,
  },
  samples: { title: "Check out some samples of our work on our website:", url: "https://www.kimp.io/our-work/", href: "/our-work/" },
  housekeeping: {
    title: "A few final housekeeping items:",
    items: [
      "This role requires a full-time commitment. At the moment we are not accepting applications for part-time staff, freelance designers, or students.",
      "This role is specifically for graphic designers. We do not currently accept applications that are focused on animation, 3D artwork, photography, and/or video editing.",
      "Please do keep an eye on your spam folder in case your response is forwarded there.",
    ],
  },
  apply: { label: "Apply to Position", href: "https://kimp.me/career/graphic-designer-application/" },
};

const PROJECT_MANAGER: CareerRole = {
  slug: "project-manager",
  path: "/careers/project-manager/",
  marquee: ["Project Manager", "Remote Work", "Full-Time", "Client Success", "Briefs"],
  strip: ["Work from anywhere", "Biweekly pay", "Free training", "Career growth"],
  mascot: { src: "/images/mascot/inner/careers-project-manager.webp", width: 1448, height: 1086 },
  title: "Project Manager",
  intro: "Tired of navigating through traffic to get to the office? Don’t want to spend another minute filling out job applications to work in another office? Say hello to Kimp!",
  lead: "As a Kimp Project Manager you’ll get the flexibility of working from home. But wait, there’s more! You’ll also get peace of mind knowing that you’ll have a steady stream of projects to manage, and a consistent pay schedule. All of this while supporting Kimp clients from around the world, on their unique projects!",
  unique: {
    title: "What makes working at Kimp unique?",
    body: [
      "We’re glad you asked! So far, Kimp’s incredible team is based in Thailand, Malaysia, India, Indonesia, and Sri Lanka. The role combines the flexibility of remote work with the connectedness of our team culture.",
      "Through team chats and video calls, we stay connected, sharing updates, success stories, and inspiration. All this while you get to enjoy a great work-life balance, by cutting out commute times and other hassles.",
    ],
  },
  details: [
    {
      title: "Responsibilities:",
      items: [
        "Project Managers are the main point of contact for Kimp clients and represent the company to each of the clients that they serve.",
        "Project Managers receive client briefs and assist designers by converting them into a condensed, easy to understand format. They also clear any doubts with clients on behalf of designers while working on their tasks.",
        "Make sure graphic design requests are executed efficiently, based on each client’s requirements, and within the scheduled project timeline. Keeping tasks in scope and on time, is key!",
        "Follow internal processes and ask for clarification as needed. Remain in constant contact with team members to ensure that tasks are executed as required.",
        "Troubleshoot any issues that arise, by looking into resolutions or contacting team members for support. We encourage you to anticipate and be prepared for common issues that might arise, but to also be ready and willing to take initiative should anything unpredictable arise.",
        "Make sure that projects are completed accurately, per the client’s brief. Review all files before submitting to your Team’s clients.",
        "Account assessment and request management to ensure that our customers use Kimp regularly.",
        "Work with your client base to ensure each customer adds more subscriptions as needed.",
        "Retain customers for a minimum of 3 months and work towards achieving your clients' design goals and deliver service that warrants 4-5 star reviews.",
        "Be available to work full-time, during your scheduled shift, responding promptly to communications from team members.",
      ],
    },
    {
      title: "Professional Requirements:",
      items: [
        "This role is suitable for anyone with Project Management experience, or a Fresher who is eager to learn Project Management and demonstrates the skills listed below. Graphic design or agency experience is a plus!",
        "You should have the skills to communicate effectively, understanding customer needs, and turning a customer need into action with a solution.",
        "Strong attention to detail, and the ability to review and assess creative briefs.",
        "You come to the table with a customer-focused mindset and are excited to help customers succeed using Kimp services.",
        "You are passionate about testing new processes and workflows to ensure the user experience for our customers remains streamlined and simple.",
        "You're persistent and extremely goal-oriented. Being organized is something you pride yourself on and you are proficient at utilizing multiple technology platforms.",
      ],
    },
    {
      title: "Equipment Requirements:",
      items: [
        "A fully functional computer or laptop that can handle working on a lot of projects!",
        "A web camera for meetings, training, and professional development sessions.",
        "Daily and unlimited access to a fast internet connection (minimum of 5 Mbps)",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Work from anywhere you'd like as long as you meet the equipment requirements!",
        "Competitive pay and a consistent, biweekly pay schedule.",
        "Internal career/promotion opportunities.",
        "Free training, personal, and professional development opportunities.",
      ],
    },
  ],
  kinds: {
    title: "What kind of graphic design services does Kimp offer to clients?",
    items: SERVICE_KINDS,
  },
  samples: { title: "Check out some samples of our work on our website:", url: "https://www.kimp.io/our-work/", href: "/our-work/" },
  housekeeping: {
    title: "A few final housekeeping items:",
    items: [
      "This role requires a full-time commitment. At the moment we are not accepting applications for part-time staff, freelance designers, or students.",
      "This role is specifically for Project Managers.",
      "Please do keep an eye on your spam folder in case your response is forwarded there.",
    ],
  },
  apply: { label: "Apply to Position", href: "https://kimp.me/career/project-manager-application/" },
};

const CONTENT_WRITER: CareerRole = {
  slug: "content-writer",
  path: "/careers/content-writer/",
  marquee: ["Content Writer", "Remote Work", "Full-Time", "Blogs", "Marketing Copy"],
  strip: ["Work from anywhere", "Biweekly pay", "Free training", "Career growth"],
  mascot: { src: "/images/mascot/inner/careers-content-writer.webp", width: 1448, height: 1086 },
  title: "Content Writer",
  intro: "Tired of navigating through traffic to get to the office? Don’t want to spend another minute finding clients and negotiating freelance contracts? Say hello to Kimp!",
  lead: "As a Kimp Content Writer you’ll get the flexibility of working from home. But wait, there’s more! You’ll also get peace of mind knowing that you’ll have a steady stream of projects, and a consistent pay schedule. All of this while supporting the Kimp Team to reach clients around the world!",
  unique: {
    title: "What makes working at Kimp unique?",
    body: [
      "We’re glad you asked! So far, Kimp’s incredible Team is based in Thailand, Malaysia, India, Indonesia, and Sri Lanka. The role combines the flexibility of remote work with the connectedness of our team culture.",
      "Through team chats and video calls, we stay connected, sharing updates, success stories, and inspiration. All this while you get to enjoy a great work-life balance, by cutting out commute times and other hassles.",
    ],
  },
  details: [
    {
      title: "Responsibilities:",
      items: [
        "The successful candidate will enrich our websites, social media profiles and marketing campaigns with new blog posts, guides and marketing copy.",
        "Researching industry-related topics and writing clear marketing copy to promote our services with a consistent tone.",
        "Identify customers’ needs and gaps in our content and recommend new topics and types of content.",
        "Follow internal processes and ask for clarification as needed. Remain in constant contact with team members to ensure that tasks are executed as required.",
        "Troubleshoot any issues that arise, by looking into resolutions or contacting team members for support. We encourage you to anticipate and be prepared for common issues that might arise, but to also be ready and willing to take initiative should anything unpredictable arise.",
        "Make sure that tasks are completed accurately, per the assigned requirements.",
        "Be available to work full-time, during your scheduled shift, responding promptly to communications from team members.",
      ],
    },
    {
      title: "Professional Requirements:",
      items: [
        "A friendly, positive, solution-oriented attitude.",
        "Content writing experience, in a wide range of formats.",
        "Being a team player, and giving and receiving constructive feedback and support.",
        "Strong attention to detail and ability to multi-task projects and deliverables.",
        "Proven experience working under pressure to deliver high quality output in a short span of time.",
        "Excellent verbal and written communication skills.",
      ],
    },
    {
      title: "Equipment Requirements:",
      items: [
        "A fully functional computer or laptop that can handle working on a lot of projects!",
        "A web camera for meetings, training, and professional development sessions.",
        "Daily and unlimited access to a fast internet connection (minimum of 5 Mbps)",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Work from anywhere you'd like as long as you meet the equipment requirements!",
        "Competitive pay and a consistent, biweekly pay schedule.",
        "Internal career/promotion opportunities.",
        "Free training, personal, and professional development opportunities.",
      ],
    },
  ],
  kinds: {
    title: "What kind of content do Kimp Content Writers work on?",
    items: [
      "Blogs",
      "Reviews",
      "Case studies",
      "Ebooks",
      "Newsletters",
      "Social media design copy",
      "Ad copy",
      "Email campaigns",
      "Landing page copy",
      "And more!",
    ],
  },
  samples: { title: "Check out some samples of our work on our website:", url: "https://www.kimp.io/blog/", href: "/blog/" },
  housekeeping: {
    title: "A few final housekeeping items:",
    items: [
      "This role requires a full-time commitment. At the moment we are not accepting applications for part-time staff, freelance writers, or students.",
      "This role is specifically for Content Writers.",
      "Please do keep an eye on your spam folder in case your response is forwarded there.",
    ],
  },
  apply: { label: "Apply to Position", href: "https://kimp.me/career/content-witer-application/" },
};

const MOTION_GRAPHICS_ARTIST: CareerRole = {
  slug: "motion-graphics-artist",
  path: "/careers/motion-graphics-artist/",
  marquee: ["Motion Graphics", "Remote Work", "Full-Time", "Animation", "Video Editing"],
  strip: ["Work from anywhere", "Biweekly pay", "Free training", "Career growth"],
  mascot: { src: "/images/mascot/inner/careers-motion-graphics-artist.webp", width: 1448, height: 1086 },
  title: "Motion Graphics Artist",
  intro: "Tired of navigating through traffic to get to the office? Don’t want to spend another minute finding clients and negotiating freelance contracts? Say hello to Kimp!",
  lead: "As a Kimp Motion Graphics Artist you’ll get the flexibility of working from home. But wait, there’s more! You’ll also get peace of mind knowing that you’ll have a steady stream of projects, and a consistent pay schedule. All of this while supporting Kimp clients from around the world, on their unique projects!",
  unique: {
    title: "What makes working at Kimp unique?",
    body: [
      "We’re glad you asked! So far, Kimp’s incredible team is based in Thailand, Malaysia, India, Indonesia, and Sri Lanka. The role combines the flexibility of remote work with the connectedness of our team culture.",
      "Through team chats and video calls, we stay connected, sharing updates, success stories, and inspiration. All this while you get to enjoy a great work-life balance, by cutting out commute times and other hassles.",
    ],
  },
  details: [
    {
      title: "Responsibilities:",
      items: [
        "Review client creative briefs, and pose questions to your Project Manager if clarification is required. Provide feedback and recommendations if a modification to the brief could improve the design.",
        "Execute motion graphics design requests efficiently, based on each client’s requirements, and within the scheduled project timeline. Keeping tasks in scope and on time, is key!",
        "Follow internal processes and ask for clarification as needed. Remain in constant contact with team members to ensure that tasks are executed as required.",
        "Troubleshoot any issues that arise, by looking into resolutions or contacting team members for support. We encourage you to anticipate and be prepared for common issues that might arise, but to also be ready and willing to take initiative should anything unpredictable arise.",
        "Make sure that projects are completed accurately, per the client’s brief. Review all files before submitting them to your Project Manager to share with your Team’s clients.",
        "Be available to work full-time, during your scheduled shift, responding promptly to communications from team members.",
      ],
    },
    {
      title: "Professional Requirements:",
      items: [
        "A friendly, positive, solution-oriented attitude.",
        "Motion graphics experience, working on a wide range of motion graphics, audio-video editing and animation projects.",
        "Being a team player, and giving and receiving constructive feedback and support.",
        "Strong attention to detail, and the ability to review and assess creative briefs.",
        "Strong communication skills in English.",
        "Strong proficiency in Adobe After Effects, Premiere Pro, Photoshop, and sound editing software. Cinema 4D experience is a plus!",
      ],
    },
    {
      title: "Equipment Requirements:",
      items: [
        "A fully functional computer or laptop that can handle working on a lot of projects!",
        "The most recent versions of Adobe After Effects, Premiere Pro, Photoshop, and sound editing software should be installed on your computer or laptop.",
        "A web camera for meetings, training, and professional development sessions.",
        "Daily and unlimited access to a fast internet connection (minimum of 5 Mbps)",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Work from anywhere you'd like as long as you meet the equipment requirements!",
        "Competitive pay and a consistent, biweekly pay schedule.",
        "Internal career/promotion opportunities, including roles beyond motion graphics.",
        "Free training, personal, and professional development opportunities.",
      ],
    },
  ],
  kinds: {
    title: "What kind of projects do Kimp Motion Graphics Artist work on?",
    items: [
      "Social Media Video Ads",
      "Feed & Story Videos",
      "Combine/Edit Raw Footage",
      "Add SRT Captions",
      "Cinemagraphs",
      "Basic & Advanced GIFs",
      "Simple Character Animation",
      "Adding Thumbnails",
      "Event Promo/Recap",
      "Openers/Titles",
      "Meme Style",
      "Text Overlays",
      "Animated Logos/Openers",
      "Animate Static Designs",
      "And many, many more types of requests.",
    ],
  },
  samples: { title: "Check out some samples of our work on our website:", url: "https://www.kimp.io/video-pre-registration/", href: "/video-pre-registration/" },
  housekeeping: {
    title: "A few final housekeeping items:",
    items: [
      "This role requires a full-time commitment. At the moment we are not accepting applications for part-time staff, freelance designers, or students.",
      "This role is specifically for Motion Graphics Artists.",
      "Please do keep an eye on your spam folder in case your response is forwarded there.",
    ],
  },
  apply: { label: "Apply to Position", href: "https://kimp.me/career/motion-graphics-artist-application/" },
};

const ILLUSTRATOR: CareerRole = {
  slug: "illustrator",
  path: "/careers/illustrator/",
  marquee: ["Illustrator", "Remote Work", "Full-Time", "Custom Illustrations", "Print & Digital"],
  strip: ["Work from anywhere", "Biweekly pay", "Free training", "Career growth"],
  mascot: { src: "/images/mascot/inner/careers-illustrator.webp", width: 1448, height: 1086 },
  title: "Illustrator",
  intro: "Tired of navigating through traffic to get to the office? Don’t want to spend another minute finding clients and negotiating freelance contracts? Say hello to Kimp!",
  lead: "As a Kimp Illustrator you’ll get the flexibility of working from home. But wait, there’s more! You’ll also get peace of mind knowing that you’ll have a steady stream of projects, and a consistent pay schedule. All of this while supporting Kimp clients from around the world, on their unique projects!",
  unique: {
    title: "What makes working at Kimp unique?",
    body: [
      "We’re glad you asked! So far, Kimp’s incredible design and illustration team is based in Thailand, Malaysia, India, Indonesia, and Sri Lanka. The role combines the flexibility of remote work with the connectedness of our team culture.",
      "Through team chats and video calls, we stay connected, sharing updates, success stories, and inspiration. All this while you get to enjoy a great work-life balance, by cutting out commute times and other hassles.",
    ],
  },
  details: [
    {
      title: "Responsibilities:",
      items: [
        "Review client creative briefs, and pose questions to your Project Manager if clarification is required. Provide feedback and recommendations if a modification to the brief could improve the illustration.",
        "Execute illustration requests efficiently, based on each client’s requirements, and within the scheduled project timeline. Keeping tasks in scope and on time, is key!",
        "Follow internal processes and ask for clarification as needed. Remain in constant contact with team members to ensure that tasks are executed as required.",
        "Troubleshoot any issues that arise, by looking into resolutions or contacting team members for support. We encourage you to anticipate and be prepared for common issues that might arise, but to also be ready and willing to take initiative should anything unpredictable arise.",
        "Make sure that projects are completed accurately, per the client’s brief. Review all files before submitting them to your Project Manager to share with your Team’s clients.",
        "Be available to work full-time, during your scheduled shift, responding promptly to communications from team members.",
      ],
    },
    {
      title: "Professional Requirements:",
      items: [
        "A friendly, positive, solution-oriented attitude.",
        "Experience creating custom illustrations for a wide range of applications, including print and digital creatives",
        "Being a team player, and giving and receiving constructive feedback and support.",
        "Strong attention to detail, and the ability to review and assess creative briefs.",
        "Strong communication skills in English.",
        "Strong proficiency in Adobe Photoshop and Illustrator.",
      ],
    },
    {
      title: "Equipment Requirements:",
      items: [
        "A fully functional computer or laptop that can handle working on a lot of projects!",
        "The most recent versions of Adobe CC, AI, and PSD, should be installed on your computer or laptop.",
        "A web camera for meetings, training, and professional development sessions.",
        "Daily and unlimited access to a fast internet connection (minimum of 5 Mbps)",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Work from anywhere you'd like as long as you meet the equipment requirements!",
        "Competitive pay and a consistent, biweekly pay schedule.",
        "Internal career/promotion opportunities, including roles beyond illustration.",
        "Free training, personal, and professional development opportunities.",
      ],
    },
  ],
  kinds: {
    title: "What kind of projects do Kimp Illustrators illustrate for?",
    items: SERVICE_KINDS,
  },
  samples: { title: "Check out some samples of our work on our website:", url: "https://www.kimp.io/our-work/", href: "/our-work/" },
  housekeeping: {
    title: "A few final housekeeping items:",
    items: [
      "This role requires a full-time commitment. At the moment we are not accepting applications for part-time staff, freelance designers, or students.",
      "This role is specifically for Illustrators. We do not currently accept applications that are focused on animation, 3D artwork, photography, and/or video editing.",
      "Please do keep an eye on your spam folder in case your response is forwarded there.",
    ],
  },
  apply: { label: "Apply to Position", href: "https://kimp.me/career/illustrator-application/" },
};

export const CAREER_ROLES = {
  "graphic-designer": GRAPHIC_DESIGNER,
  "project-manager": PROJECT_MANAGER,
  "content-writer": CONTENT_WRITER,
  "motion-graphics-artist": MOTION_GRAPHICS_ARTIST,
  illustrator: ILLUSTRATOR,
} as const satisfies Record<CareerRole["slug"], CareerRole>;
