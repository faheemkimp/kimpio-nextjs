#!/usr/bin/env node
/**
 * Generates the artwork used by the redesigned homepage sections with the
 * OpenAI Images API.
 *
 *   node scripts/generate-home-redesign.mjs            # only missing images
 *   node scripts/generate-home-redesign.mjs --force    # regenerate all
 *   node scripts/generate-home-redesign.mjs ribbon     # just these
 *
 * Reads OPENAI_API_KEY from the environment, .env.local, .env or src/app/.env.
 * Writes WebPs to public/images/home/redesign/<name>.webp.
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [path.dirname(require.resolve("next/package.json"))] }));
const OUT = path.join(ROOT, "public/images/home/redesign");
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

const NO_TEXT = "Absolutely no text, no letters, no numbers, no logos, no watermarks.";

/** Campaign creatives for the fictional brand "Northwind" (a September promo for Canada). */
const CAMPAIGN =
  "A premium, art-directed advertising photograph for a fictional Canadian outdoor coffee brand's autumn " +
  "September promotion. Studio product photography, soft directional light, rich warm palette led by " +
  "vivid orange #F1731E with cream and charcoal accents, a few red maple leaves, generous clean negative " +
  "space for a headline. " + NO_TEXT;

/** [prompt, size, background, output width, output height] */
const ART = {
  ribbon: [
    "An abstract glossy 3D ribbon: one smooth, thick, flowing band twisting in a graceful S-curve, " +
      "glass-and-satin material with a vivid orange #F1731E to warm amber #FFB27A gradient, crisp " +
      "specular highlights, subtle violet #7C69E8 rim light. Isolated on a fully transparent background, " +
      "no shadow on the ground. " + NO_TEXT,
    "1536x1024", "transparent", 1200, 800,
  ],
  presentations: [
    "A polished product mockup of a modern pitch-deck: three presentation slides fanned out and floating " +
      "at slight angles, each with bold geometric layouts, bar and donut charts, colour blocks in orange " +
      "#F1731E, violet #7C69E8 and teal #00A88E on white, soft realistic drop shadows. Text areas are only " +
      "abstract grey bars. Isolated on a fully transparent background. " + NO_TEXT,
    "1024x1024", "transparent", 640, 640,
  ],
  "campaign-hero": [
    CAMPAIGN + " Subject: a matte orange coffee bag and a steaming enamel mug on a warm orange backdrop.",
    "1024x1024", "opaque", 640, 640,
  ],
  "campaign-story": [
    CAMPAIGN + " Subject: a person's hand holding a takeaway coffee cup against a blurred autumn forest, " +
      "vertical framing, face not visible.",
    "1024x1536", "opaque", 512, 768,
  ],
  "campaign-flatlay": [
    CAMPAIGN + " Subject: an overhead flat lay of coffee beans, a wool scarf, a cabin mug and maple leaves on " +
      "a cream surface.",
    "1024x1024", "opaque", 640, 640,
  ],
  "campaign-outdoor": [
    CAMPAIGN + " Subject: a thermos and two cups on a wooden dock by a misty Canadian lake at golden hour, " +
      "wide composition.",
    "1536x1024", "opaque", 900, 600,
  ],
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

async function generate([name, [prompt, size, background, w, h]]) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, prompt, size, quality: "medium", background, output_format: "png", n: 1 }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${name}: ${res.status} ${json.error?.message}`);
  await sharp(Buffer.from(json.data[0].b64_json, "base64"))
    .resize(w, h, { fit: "cover" })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(`✓ ${name}`);
}

console.log(`Generating ${todo.length} image(s) with ${MODEL}…`);
const failures = [];
await Promise.all(todo.map((job) => generate(job).catch((e) => failures.push(e.message))));
if (failures.length) {
  console.error(`\n${failures.length} failed:\n${failures.join("\n")}`);
  process.exit(1);
}
