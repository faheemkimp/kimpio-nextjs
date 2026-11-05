#!/usr/bin/env node
/**
 * Generates the "Why Kimp" bento illustrations with the OpenAI Images API.
 *
 *   node scripts/generate-why-kimp.mjs             # only missing images
 *   node scripts/generate-why-kimp.mjs --force     # regenerate all
 *   node scripts/generate-why-kimp.mjs revisions   # just these
 *
 * Reads OPENAI_API_KEY from the environment, .env.local, .env or src/app/.env.
 * Writes 512px transparent WebPs to public/images/home/why-kimp/<name>.webp.
 * The API returns raster images, so these are flat "vector-style" art, not SVG.
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [path.dirname(require.resolve("next/package.json"))] }));
const OUT = path.join(ROOT, "public/images/home/why-kimp");
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
  "A flat vector illustration in a modern playful SaaS style: bold clean shapes, smooth geometric curves, " +
  "subtle flat shading and a few soft gradients, thin charcoal #1B1E23 outlines on key shapes, small sparkles " +
  "and confetti dots around it. Vibrant colorful palette: Kimp orange #F1731E, violet #7C69E8, teal #00A88E, " +
  "sunny yellow #FFC93C, hot pink #FF5C8A, sky blue #4DA3FF, cream white. " +
  "Centered, fills about 80% of the frame, isolated on a fully transparent background, no ground shadow, " +
  "no text, no letters, no numbers, no logos, no people's faces. Part of one consistent illustration set.";

const ART = {
  requests:
    "a cheerful stack of floating design request cards (a social post, a video thumbnail, a banner) " +
    "shooting out of a glowing open inbox tray, with plus signs bursting around them",
  revisions:
    "a design artboard with a curved circular refresh arrow looping around it, a pen tool cursor and " +
    "colorful before/after swatches, suggesting endless iterations",
  turnaround:
    "a bold round stopwatch with a lightning bolt on its face and speed lines, a small rocket zooming past it",
  designers:
    "a shining golden trophy cup with a paintbrush and a bezier pen crossed in front of it, " +
    "with a large sparkle star on top",
  agency:
    "a stack of colorful brand folders and client portfolio cards fanned out of an open briefcase, " +
    "each folder a different bright color, with a small star badge on top",
  support:
    "a friendly round headset with a speech bubble and a small round clock beside it, " +
    "a little moon and sun orbiting to suggest help at any hour",
  categories:
    "a playful cluster of many different design items floating together: a logo badge, a t-shirt, " +
    "a product box, a video play window, a business card, a phone with a social post, a poster",
};

const key = readKey();
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
fs.mkdirSync(OUT, { recursive: true });

const todo = Object.entries(ART).filter(([name]) => {
  if (only.length) return only.includes(name);
  return force || !fs.existsSync(path.join(OUT, `${name}.webp`));
});

async function generate([name, subject]) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt: `${STYLE}\n\nSubject: ${subject}.`,
      size: "1024x1024",
      quality: "medium",
      background: "transparent",
      output_format: "png",
      n: 1,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${name}: ${res.status} ${json.error?.message}`);
  await sharp(Buffer.from(json.data[0].b64_json, "base64"))
    .resize(512, 512)
    .webp({ quality: 86 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(`✓ ${name}`);
}

console.log(`Generating ${todo.length} illustration(s) with ${MODEL}…`);
const failures = [];
await Promise.all(todo.map((job) => generate(job).catch((e) => failures.push(e.message))));
if (failures.length) {
  console.error(`\n${failures.length} failed:\n${failures.join("\n")}`);
  process.exit(1);
}
