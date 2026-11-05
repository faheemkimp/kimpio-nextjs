#!/usr/bin/env node
/**
 * Generates the mega-menu icon set with the OpenAI Images API.
 *
 *   node scripts/generate-nav-icons.mjs            # only missing icons
 *   node scripts/generate-nav-icons.mjs --force    # regenerate all
 *   node scripts/generate-nav-icons.mjs video blog # just these
 *
 * Reads OPENAI_API_KEY from the environment, .env.local, .env or src/app/.env.
 * Writes WebP files to public/images/nav/<name>.webp (icons 192px transparent,
 * promos 1200px wide).
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
// sharp ships with Next.js; resolve it through next so no extra dependency is needed.
const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [path.dirname(require.resolve("next/package.json"))] }));
const OUT = path.join(ROOT, "public/images/nav");
const MODEL = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1.5";

function readKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY.trim();
  for (const f of [".env.local", ".env", "src/app/.env"]) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, "utf8").match(/^OPENAI_API_KEY=["']?([^"'\r\n]+)/m);
    if (m) return m[1].trim();
  }
  throw new Error("OPENAI_API_KEY not found");
}

const STYLE =
  "A single glossy 3D icon in a soft clay render style, rounded friendly shapes, matte plastic material, " +
  "soft studio lighting from top-left. Color palette strictly: warm orange #F1731E as the main color, " +
  "deep charcoal #1B1E23, cream white #FFF1E7, with a small teal #00806C accent. " +
  "Centered, three-quarter front view, fills about 80% of the frame, isolated on a fully transparent background, " +
  "no ground shadow, no text, no letters, no numbers, no logos. Part of a consistent premium SaaS icon set.";

const ICONS = {
  graphics: "a paintbrush resting across a stack of colorful design cards with a bezier pen curve",
  video: "a rounded video player window with a large play button and a small film strip",
  calculator: "a chunky desktop calculator next to a small stack of coins",
  platform: "a floating dashboard window with cards, a chat bubble and a checkmark, representing a design project platform",
  updates: "a rocket launching upward from a small sparkle burst",
  "graphics-samples": "a framed picture gallery of three overlapping artwork cards",
  "video-samples": "a movie clapperboard with a small play triangle",
  compare: "a balance scale with one side higher, a star on the winning side",
  testimonials: "two speech bubbles, one with a heart and one with a five-point star",
  "case-studies": "an open book with a rising bar chart popping out of the pages",
  about: "a friendly group of three abstract rounded people figures standing together",
  contact: "an envelope with a speech bubble coming out of it",
  blog: "an open notebook with a fountain pen writing on it",
  "book-call": "a calendar page with a phone handset and a checkmark",
  affiliates: "two hands doing a handshake with a small coin above",
  "design-categories": "a grid of four rounded tiles each showing a different shape: circle, triangle, square, star",
  "brand-assets": "a color swatch fan with a small font specimen card",
  "media-kit": "a folder with a document, an image card and a megaphone peeking out",
  careers: "a briefcase with a small sparkle and an upward arrow",
};

/** Wide promo illustrations for the featured cards (opaque, 3:2). */
const PROMO_STYLE =
  "A wide 3D clay-render illustration, soft rounded shapes, matte materials, soft studio lighting. " +
  "Background: smooth gradient from cream #FFF1E7 to light blue-grey #F2F5F8. Palette: warm orange #F1731E, " +
  "deep charcoal #1B1E23, cream white, small teal #00806C accents. Clean composition with empty space on the left, " +
  "no text, no letters, no logos, no people's faces.";

const PROMOS = {
  "promo-services":
    "floating design deliverables on the right: a social media post card, a video player window with play button, " +
    "a color palette, a paintbrush and a pen tool, arranged playfully as if being produced on a conveyor of creativity",
  "promo-kimp360":
    "a large floating laptop on the right showing a project board with design cards in columns, chat bubbles " +
    "and checkmarks floating around it, a small rocket in the corner",
  "promo-blog":
    "an open magazine on the right with colorful layout pages, a coffee cup, a pencil and a few sticky notes, " +
    "small sparkles above it",
  "promo-call":
    "a friendly video call window on the right with a headset, a calendar card with a checkmark and a speech bubble, " +
    "floating playfully",
};

/** Hero objects for the dark intro column of each panel (transparent, square). */
const INTROS = {
  "intro-services": "a stack of a paintbrush, a video play button and a color palette balanced like a sculpture",
  "intro-kimp360": "a floating orange cube made of small app windows with a glowing checkmark on top",
  "intro-our-work": "a trophy cup with a small star and a picture frame leaning against it",
  "intro-kimp-for": "a small storefront building with an awning next to a rising bar chart",
  "intro-more": "a friendly waving hand coming out of a chat bubble with a small heart",
};

const key = readKey();
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
fs.mkdirSync(OUT, { recursive: true });

const jobs = [
  ...Object.entries(ICONS).map(([name, subject]) => ({
    name,
    prompt: `${STYLE}\n\nSubject: ${subject}.`,
    size: "1024x1024",
    background: "transparent",
  })),
  ...Object.entries(PROMOS).map(([name, subject]) => ({
    name,
    prompt: `${PROMO_STYLE}\n\nScene: ${subject}.`,
    size: "1536x1024",
    background: "opaque",
  })),
  ...Object.entries(INTROS).map(([name, subject]) => ({
    name,
    prompt: `${STYLE}\n\nSubject: ${subject}.`,
    size: "1024x1024",
    background: "transparent",
  })),
];

const todo = jobs.filter(({ name }) => {
  if (only.length) return only.includes(name);
  return force || !fs.existsSync(path.join(OUT, `${name}.webp`));
});

async function generate({ name, prompt, size, background }) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, prompt, size, quality: "medium", background, output_format: "png", n: 1 }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${name}: ${res.status} ${json.error?.message}`);
  await save(name, Buffer.from(json.data[0].b64_json, "base64"));
  console.log(`✓ ${name}`);
}

/** Store a small WebP instead of the 1-2 MB source PNG. Size depends on the image's role. */
async function save(name, png) {
  const img = sharp(png);
  const out = name.startsWith("promo-")
    ? img.resize({ width: 1200 }).webp({ quality: 82 })
    : name.startsWith("intro-")
      ? img.resize(480, 480).webp({ quality: 86 })
      : img.resize(192, 192).webp({ quality: 88 });
  await out.toFile(path.join(OUT, `${name}.webp`));
}

// --optimize: convert PNGs already on disk (e.g. from an older run) and delete them.
if (args.includes("--optimize")) {
  for (const f of fs.readdirSync(OUT).filter((f) => f.endsWith(".png"))) {
    const p = path.join(OUT, f);
    await save(f.replace(/\.png$/, ""), fs.readFileSync(p));
    fs.unlinkSync(p);
    console.log(`✓ optimized ${f}`);
  }
  process.exit(0);
}

console.log(`Generating ${todo.length} icon(s) with ${MODEL}…`);
const queue = [...todo];
const failures = [];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const job = queue.shift();
      await generate(job).catch((e) => failures.push(e.message));
    }
  }),
);
if (failures.length) {
  console.error(`\n${failures.length} failed:\n${failures.join("\n")}`);
  process.exit(1);
}
