/**
 * /about-us/ copy, taken verbatim from the live page (WordPress template
 * "template-about_us"). Nothing here is managed in the WordPress editor: it is
 * all hardcoded in the PHP template.
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live, in order: no <h1>; <h2> hero
 * "About Us", "Making A Global Impact" with four <h3> counters ("100+",
 * "5000+", "874000+", "50+": the server-rendered values; on live a script then
 * counts them up to 275, 6000, 875000 and 60, and so do we); <h2> "Our Story";
 * <h2> "Client-Centred Design" with <h3> "4.8 star_purple500" (the Material Icons
 * ligature text, kept as hidden text), "24/7", "300+"; the country slider as
 * nine <h3> twice (desktop slider, then the mobile slider, with live's
 * "Columbia" / "Srilanka" spellings and Canada's missing full stop); six team
 * quotes as <h2> titles with <h4> names; <h2> "Kimp Cares" with three <h3>;
 * <h2> "Our Values" with six <h3>; closing <h6> "GET STARTED" +
 * <h2> "Experience Seamless Design with Kimp".
 */

export const PATH = "/about-us/";
const DIR = "/images/company";

export const AB_HERO = {
  eyebrow: "About Kimp",
  /* The live <h2> is just "About Us"; shown on its own in brand orange. */
  title: { lead: "", highlight: "About Us" },
  intro:
    "At Kimp, we believe that design has the power to transform lives. And we use that power to help clients amplify their messages and create meaningful jobs for designers.",
  marquee: ["About Us", "Our Story", "Kimp Cares", "Our Values", "Global Team"],
  strip: ["Designing since 2003", "Kimp launched in 2019", "24/7 Customer Support", "4.8 stars from 400+ reviews"],
  /** Master flying pose holding a globe (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/about-us.webp", width: 1448, height: 1086 },
} as const;

/** Counters: `from` is the server-rendered value (live HTML), `to` the value live's script counts up to. */
export const AB_IMPACT = {
  eyebrow: "Kimp around the world",
  title: "Making A Global Impact",
  intro: "Our clients and team members span the globe.",
  stats: [
    { from: 100, to: 275, label: "Designers & Developers" },
    { from: 5000, to: 6000, label: "Clients Served" },
    { from: 874000, to: 875000, label: "Graphics & Videos" },
    { from: 50, to: 60, label: "Countries Served" },
  ],
} as const;

export const AB_STORY = {
  eyebrow: "Since 2003",
  title: "Our Story",
  paragraphs: [
    "The Kimp Team first started offering graphic design services in 2003. Over the years we’ve had different business models and served many niches. The culmination of all of this experience is Kimp!",
    "Launched in early 2019, Kimp began with a single unlimited graphic design subscription. And the goal of creating a better design workflow for our clients while creating awesome jobs for designers.",
  ],
  image: { src: `${DIR}/kimp-meditation.webp`, width: 848, height: 624 },
  milestones: [
    { year: "2003", label: "Graphic design services" },
    { year: "2019", label: "Kimp launched" },
  ],
} as const;

export const AB_CLIENT = {
  eyebrow: "Why clients stay",
  title: "Client-Centred Design",
  intro: "We vet and train top-tier designers to deliver the best results for our clients.",
  rating: { value: "4.8", icon: "star_purple500", label: "400+ Reviews" },
  support: { value: "24/7", label: "Customer Support" },
  designs: {
    value: "300",
    label: "300+ avg. designs per client/year",
    tip: "Get an average of 300 designs per year (including revisions) with KIMP Graphics. Or get an average of 120 designs with KIMP Video!",
  },
} as const;

type Country = { key: string; name: string; mobileName: string; body: string; mobileBody?: string };

/** Live slider order. `mobileName` / `mobileBody` keep the live mobile slider's own spelling. */
export const AB_COUNTRIES: { eyebrow: string; label: string; items: readonly Country[] } = {
  eyebrow: "Where we work",
  label: "Our team around the world",
  items: [
    {
      key: "canada",
      name: "Canada",
      mobileName: "Canada",
      body: "At York University’s startup hub, Kimp came to life. From Vancouver to Markham to Port Perry, we’ve built a network of team members and clients.",
      mobileBody:
        "At York University’s startup hub, Kimp came to life. From Vancouver to Markham to Port Perry, we’ve built a network of team members and clients",
    },
    {
      key: "indonesia",
      name: "Indonesia",
      mobileName: "Indonesia",
      body: "From Indonesia’s beautiful islands & cultural heritage, our team members draw inspiration that they bring to their designs, illustrations and videos.",
    },
    {
      key: "india",
      name: "India",
      mobileName: "India",
      body: "From Delhi, to Bangalore, to Madurai, and more - India is home to some of our very first team members. And holds a special place in the Kimp story.",
    },
    {
      key: "columbia",
      name: "Colombia",
      mobileName: "Columbia",
      body: "Colombia’s modern & vibrant cities are home to many of our design team members. Their dynamic energy and creativity keeps our clients looking fresh.",
    },
    {
      key: "srilanka",
      name: "Sri Lanka",
      mobileName: "Srilanka",
      body: "The kindness, warmth and resilience that Sri Lankans are known for comes through in the shining examples of our Project Managers & Designers.",
    },
    {
      key: "nigeria",
      name: "Nigeria",
      mobileName: "Nigeria",
      body: "A dynamic creative hub, Nigeria is home to many of our Design Team members. And they bring their unique perspectives, and influences, to their designs.",
    },
    {
      key: "philippines",
      name: "Philippines",
      mobileName: "Philippines",
      body: "With a vibrant culture and beautiful landscape, the Philippines is home to many of Kimp’s friendly Project Managers and Design Team members.",
    },
    {
      key: "ukraine",
      name: "Ukraine",
      mobileName: "Ukraine",
      body: "Our Ukrainian team members bring their dynamic, creative and innovative ideas to everything they tackle - from Kimp’s design & dev to client designs.",
    },
    {
      key: "bangladesh",
      name: "Bangladesh",
      mobileName: "Bangladesh",
      body: "Known for its renowned archeology, a rich culture and beautiful landscapes, Bangladesh is also home to many of our Design Team members.",
    },
  ],
};

export const countryImage = (key: string, mobile = false) =>
  mobile
    ? { src: `${DIR}/country-${key}-mob.webp`, width: 674, height: 344 }
    : { src: `${DIR}/country-${key}.webp`, width: 3840, height: 900 };

/** Team quotes: title <h2>, name <h4> (with live's trailing comma), role <p>. */
export const AB_TEAM = {
  eyebrow: "Life at Kimp",
  label: "What our team says about working at Kimp",
  items: [
    {
      title: "Supportive Environment",
      body: "It is such a pleasure to grow, learn, and flourish under such a company. Thank you so much for this incredible opportunity. I have learned so much from the KIMP Family. And I look forward to your continued guidance and help as I develop.",
      name: "Balaji,",
      role: "Creative Operations Manager",
    },
    {
      title: "Fun On The Job",
      body: "We work together virtually for the most part, but we always find ways to have fun on the job. Whether it’s making and sharing memes or sharing jokes and stories in our team meetings. Working at Kimp means fun on the job.",
      name: "Jenni,",
      role: "Motion Graphics Designer",
    },
    {
      title: "Competitive Wages",
      body: "As a designer there are a lot of ways to work with clients. But it can be hard to anticipate how much you can make. As a Kimp team member I don’t worry about that anymore. I make a competitive salary and there’s opportunities for increases based on performance too.",
      name: "Mark,",
      role: "Designer",
    },
    {
      title: "Room To Grow",
      body: "One of the best things about working at Kimp for me has been the opportunity to grow. Whatever role you’re in, the Managers and Team Leads take notice of the effort you put in and provide the support and guidance you need to take on new positions.",
      name: "Pras,",
      role: "Project Manager",
    },
    {
      title: "A Global Experience",
      body: "Every day we share wins and client feedback. It helps to see how our work impacts clients’ goals. And to learn about different industries from so many countries. As a designer, you can get stuck working on the same kinds of designs. But we get so much variety at Kimp.",
      name: "Priya,",
      role: "Illustrator",
    },
    {
      title: "An Open-Door Policy",
      body: "No matter what role you have at Kimp you can always chime in to share ideas, make suggestions, or point out what could be better. Whether in meetings or 1:1 chats it helps to know that if there’s an issue, there’s always someone to help get it sorted.",
      name: "Nikita,",
      role: "Project Manager",
    },
  ],
} as const;

export const AB_CARES = {
  eyebrow: "Giving back",
  title: "Kimp Cares",
  /* Live typo "ofcharities" kept. */
  intro:
    "Design has transformed our lives. And we want to keep paying that forward. Kimp Cares is a series of initiatives we’ve launched to amplify the missions ofcharities and nonprofits. These initiatives include:",
  items: [
    { title: "Ongoing Discounts", body: "Promotional pricing for registered nonprofits and charities.", image: `${DIR}/cares_img_1.jpg` },
    { title: "Skills Training", body: "Workshops to support those in under-resourced communities.", image: `${DIR}/cares_img_2.jpg` },
    { title: "Educational Initiatives", body: "Donations to support educational programming and initiatives.", image: `${DIR}/cares_img_3.jpg` },
  ],
} as const;

export const AB_VALUES = {
  eyebrow: "What we stand for",
  title: "Our Values",
  intro: "We work remotely but our shared values help us stay connected.",
  items: [
    { title: "Delight Our Clients", body: "Aim to exceed client expectations in everything we do.", icon: `${DIR}/value_icon1.svg` },
    { title: "Grow Together", body: "Lift each other up by sharing ideas and encouragement.", icon: `${DIR}/value_icon2.svg` },
    { title: "Celebrate Differences", body: "Seek out, and learn from, new perspectives every day.", icon: `${DIR}/value_icon3.svg` },
    { title: "Deliver Results", body: "Create awesome designs that deliver results for clients.", icon: `${DIR}/value_icon4.svg` },
    { title: "Innovate Everyday", body: "Find creative, efficient, solutions to design problems.", icon: `${DIR}/value_icon5.svg` },
    { title: "Support Our Communities", body: "Find ways to uplift the communities we work in and serve.", icon: `${DIR}/value_icon6.svg` },
  ],
  cta: { label: "Start Free Trial", href: "/register-now/" },
} as const;

/** Live closing panel (shared with /contact-us/): "GET STARTED" <h6> + <h2>. */
export const COMPANY_FINAL: {
  eyebrow: string;
  eyebrowAs: "h6";
  title: string;
  primary: { label: string; href: string };
} = {
  eyebrow: "GET STARTED",
  eyebrowAs: "h6",
  title: "Experience Seamless Design with Kimp",
  primary: { label: "Schedule Demo", href: "/enterprise-schedule-demo/" },
};
