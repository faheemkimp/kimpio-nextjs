/**
 * /design-categories/ copy, taken verbatim from the live page (WordPress
 * template "template-design_category"; typos kept, e.g. the Basic GIFs tip).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live, in order: no <h1>; hero
 * <h2> "Design categories"; <h3> "What do you need designed?"; <h2> "GRAPHICS"
 * with <h4> "What Kimp Graphics Doesn't Include"; <h2> "VIDEOS" with <h4> "What
 * Kimp Video Doesn't Include"; <h2> "If you need a design type not included on
 * this list". The A–Z lists are hardcoded in the template (no WordPress data).
 */

export const PATH = "/design-categories/";

export const DC_HERO = {
  eyebrow: "Graphics & video",
  /* Live <h2> is "Design categories " (one line); "categories" is the orange half. */
  title: { lead: "Design", highlight: "categories" },
  intro: "We cover all of the following design categories and more.",
  marquee: ["Graphics", "Videos", "Logos", "Packaging", "Social media"],
  strip: ["App Designs", "Brochures", "Logos", "Pitch decks", "Video Editing", "GIFs"],
  /** Master flying pose holding a fan of design cards (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/design-categories.webp", width: 1448, height: 1086 },
} as const;

/** An entry with `tip` shows the live info tooltip. */
export type DcItem = string | { label: string; tip: string };
export type DcGroup = { letter: string; items: readonly DcItem[] };

export const DC_BROWSER = {
  search: { title: "What do you need designed?", label: "Search design categories", placeholder: "Enter keywords to search...", button: "Search" },
  noResults: "No design categories match your search.",
  graphics: {
    title: "GRAPHICS",
    groups: [
      { letter: "a", items: ["App Designs", "Adroll banners", "Album covers", "Amazon graphics", "Annual reports", "Awards"] },
      {
        letter: "b",
        items: [
          "Background removal",
          {
            label: "Basic GIFs",
            tip: "Basic GIFs are si3 seconds long, which are created in Photoshop and include text animations, flashing buttons, etc.mple animations, 2-",
          },
          "Beer label", "Beverage label", "Billboards", "Blog images", "Book covers", "Book illustration", "Book layouts", "Booklets",
          "Boxes", "Brand style guides", "Brochures", "Business cards",
        ],
      },
      {
        letter: "c",
        items: ["Car wraps", "Caricatures", "Catalogs", "Certificates", "Characters & Mascots", "Complex custom illustrations", "Cosmetic packaging", "Coupons"],
      },
      { letter: "e", items: ["Email signatures", "Email graphics", "EBooks", "Enewsletters"] },
      { letter: "f", items: ["Facebook ads", "Facebook cover", "Facebook newsfeed images", "Facebook story", "Flyers"] },
      { letter: "g", items: ["Google ads", "Greeting cards"] },
      { letter: "h", items: ["Hats", "Hero images", "Hoodies"] },
      { letter: "i", items: ["Icons", "Infographics", "Instagram post", "Invitations"] },
      { letter: "l", items: ["Landing pages", "Leggings", "Letterheads", "LinkedIn Posts", "Logos"] },
      { letter: "m", items: ["Magazine covers", "Magazine layouts", "Mascots", "Mugs"] },
      { letter: "n", items: ["NFT Designs"] },
      { letter: "o", items: ["Outdoor Graphics"] },
      {
        letter: "p",
        items: ["Packaging & labels", "Patterns", "Photo edits", "Pitch decks", "Podcast covers", "Postcards", "Posters", "Presentations", "Print ads"],
      },
      { letter: "r", items: ["Restaurant menus", "Retail bags", "Rollup banners"] },
      { letter: "s", items: ["Social media images", "Simple custom illustrations", "Stationery", "Sticker labels", "Stickers"] },
      { letter: "t", items: ["T-shirts design", "T-shirt illustration", "Tattoos", "Tradeshow graphics", "Twitter header", "Twitter post"] },
      { letter: "U", items: ["UI Designs"] },
      { letter: "v", items: ["Vehicle wraps"] },
      { letter: "w", items: ["Web Banners", "Websites", "Website illustration", "Website sliders & hero images"] },
      { letter: "y", items: ["YouTube headers", "YouTube thumbnails"] },
    ] satisfies DcGroup[],
    excluded: {
      /* Live: "What Kimp Graphics <span>Doesn't</span> Include" */
      title: { before: "What Kimp Graphics ", em: "Doesn't", after: " Include" },
      items: ["3D/CAD", "Ad Development", "Coding & Development", "Copywriting", "HTML5 Ads", "Marketing Strategy", "Motion Graphics", "Photography", "Videos"],
    },
  },
  videos: {
    title: "VIDEOS",
    groups: [
      { letter: "a", items: ["Animated Static Designs", "Animated Typography", "Animated Video Ads", "Audiograms"] },
      { letter: "c", items: ["Cinemagraphs"] },
      { letter: "d", items: ["Demo Videos", "Digital Display Loops"] },
      { letter: "f", items: ["FAQ Videos"] },
      { letter: "g", items: ["GIFs"] },
      { letter: "l", items: ["Logo Animations"] },
      { letter: "n", items: ["NFT Designs"] },
      { letter: "s", items: ["Social Media Videos"] },
      { letter: "t", items: ["Template Customization", "Testimonial Videos", "Text Overlays"] },
      { letter: "u", items: ["UI/UX Animations"] },
      { letter: "v", items: ["Video Editing"] },
    ] satisfies DcGroup[],
    excluded: {
      /* Live: "What Kimp Video <span>Doesn't </span> Include" */
      title: { before: "What Kimp Video ", em: "Doesn't", after: " Include" },
      items: [
        "Ad Development", "Advanced Animations", "Brand Strategy", "Copywriting", "Explainer Videos", "Graphic Design", "Marketing Strategy",
        "Video Shoots", "Storyboards", "Transcribing Videos", "Whiteboard Videos",
      ],
    },
  },
} as const;

export const DC_SUPPORT = {
  /* Live: line break after "not". */
  titleLines: ["If you need a design type not", "included on this list"],
  bodyLines: ["Just click to connect with us on the live chat to find", "out if we can work on it for you!"],
  /** Opens the live chat on WordPress (href="#"), as live. */
  cta: { label: "Let’s Connect", href: "#" },
} as const;
