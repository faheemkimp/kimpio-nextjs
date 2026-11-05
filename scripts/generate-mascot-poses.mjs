#!/usr/bin/env node
/**
 * Generates extra poses of the Kimp superhero mascot for the Kimp360 journey
 * (src/components/home/journey) with the OpenAI Images API, using the existing
 * character art as the reference so the design stays on-model.
 *
 *   OPENAI_API_KEY=sk-... node scripts/generate-mascot-poses.mjs [pose ...]
 *
 * Poses: fly, cheer (default: both). Output: public/images/journey/mascot-<pose>.png
 * Then point JOURNEY.mascot.poses in src/content/home.ts at the new files.
 * Optional: OPENAI_IMAGE_MODEL (default gpt-image-1).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("OPENAI_API_KEY is not set.");
  process.exit(1);
}
const MODEL = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1";
const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "public/images/home/kimpch.webp");
const OUT = path.join(ROOT, "public/images/journey");

const BASE =
  "Use the attached character exactly: the Kimp superhero chimp mascot with brown fur, short beard, " +
  "red-rimmed orange-yellow visor mask, golden-yellow muscular suit with cream collar, cream 'K' chest badge, " +
  "cream 'K' belt buckle, cream wrist cuffs and a long deep-red cape. Same polished 3D illustration style, " +
  "same proportions and colours. Full body visible including legs and boots. Transparent background, " +
  "no text, no shadow on the ground, centred, nothing cropped.";

const POSES = {
  fly:
    "Pose: flying horizontally to the RIGHT like a superhero, body leaning forward, one fist punched " +
    "forward, the other arm holding a small glowing purple document card against his chest, legs " +
    "stretched back, cape streaming dramatically behind him to the left. Determined expression.",
  cheer:
    "Pose: hovering upright and celebrating, both fists raised in victory, big happy grin, cape " +
    "billowing, small sparkles around him. Facing the viewer, three-quarter view.",
};

const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(POSES);
await mkdir(OUT, { recursive: true });
const ref = new Blob([await readFile(SOURCE)], { type: "image/webp" });

for (const pose of wanted) {
  if (!POSES[pose]) {
    console.error(`Unknown pose "${pose}". Options: ${Object.keys(POSES).join(", ")}`);
    continue;
  }
  const form = new FormData();
  form.append("model", MODEL);
  form.append("image[]", ref, "kimpch.webp");
  form.append("prompt", `${BASE}\n\n${POSES[pose]}`);
  form.append("size", "1536x1024");
  form.append("background", "transparent");
  form.append("output_format", "png");
  form.append("quality", "high");

  process.stdout.write(`Generating "${pose}"... `);
  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}` },
    body: form,
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`failed (${res.status}): ${json.error?.message ?? JSON.stringify(json)}`);
    continue;
  }
  const file = path.join(OUT, `mascot-${pose}.png`);
  await writeFile(file, Buffer.from(json.data[0].b64_json, "base64"));
  console.log(`saved ${path.relative(ROOT, file)}`);
}
console.log('\nNext: set JOURNEY.mascot.poses.{fly,cheer} in src/content/home.ts to "/images/journey/mascot-<pose>.png".');
