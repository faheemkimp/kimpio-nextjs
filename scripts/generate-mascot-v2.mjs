#!/usr/bin/env node
/**
 * Redesigned Kimp mascot ("v2"): the same brand hero, but reads as a man in his
 * early thirties, with a simpler face and body. Every pose is generated from one
 * approved base render, so face, body and suit stay identical and only the pose
 * and expression change.
 *
 *   1. node scripts/generate-mascot-v2.mjs base
 *        -> public/images/mascot/v2/base.png   (review it; re-run until you like it)
 *   2. node scripts/generate-mascot-v2.mjs            (all poses)
 *      node scripts/generate-mascot-v2.mjs fly sit    (just some)
 *        -> public/images/mascot/v2/<pose>.png
 *
 * Reads OPENAI_API_KEY from the environment, .env.local or .env.
 * Optional: OPENAI_IMAGE_MODEL (default gpt-image-1.5).
 * Nothing on the site changes until the new files are wired in.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/images/mascot/v2");
const BASE_FILE = path.join(OUT, "base.png");

async function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  for (const name of [".env.local", ".env"]) {
    const env = path.join(ROOT, name);
    if (!existsSync(env)) continue;
    const line = (await readFile(env, "utf8")).split(/\r?\n/).find((l) => l.startsWith("OPENAI_API_KEY="));
    if (line) return line.slice("OPENAI_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  }
  return undefined;
}

const KEY = await loadKey();
if (!KEY) {
  console.error("OPENAI_API_KEY is not set (env, .env.local or .env).");
  process.exit(1);
}
const MODEL = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1.5";

/** The character bible. Shared by the base render and every pose. */
const CHARACTER =
  "The Kimp superhero chimp mascot, redesigned. " +
  "AGE & FEEL: a confident, friendly man in his early thirties: youthful energy, but grown-up, not a kid " +
  "and not an old bodybuilder. Adult proportions (head about 1/7 of body height, never a big cartoon head); " +
  "mature, composed features: no chubby cheeks, no baby face, no big toothy kid grin. " +
  "FACE (simpler): unmistakably a CHIMPANZEE, not a human: chimp skull shape, protruding rounded chimp muzzle, " +
  "wide chimp mouth, flat chimp nose, prominent brow under the visor. Clean, smooth face with few wrinkles " +
  "or folds; neat, short, evenly trimmed beard along the jaw; tidy short brown hair with one soft swoosh, " +
  "not spiky; light-peach muzzle; small rounded ears. The red-rimmed orange-yellow visor mask stays, but " +
  "slimmer and sleeker. " +
  "BODY (simpler): fit, athletic and slightly lean, natural proportions, NOT bulky or veiny. The suit is " +
  "SMOOTH like a soft vinyl toy: NO six-pack, NO abdominal lines, NO pec or muscle definition drawn on it, " +
  "only gentle broad shading; very few seams or folds. " +
  "SUIT: golden-yellow one-piece suit, cream collar band, small round cream 'K' chest badge, slim cream belt " +
  "with a round 'K' buckle, simple cream wrist cuffs, golden boots, one long deep-red cape. " +
  "STYLE: polished, clean 3D brand-mascot illustration with soft studio lighting and simple shading; " +
  "consistent colours: fur #7a3f22, suit #f6b51e, cream #f3e3c3, cape #c8202b, visor rim #e5484d.";

const RENDER =
  "Full body visible including boots, centred, nothing cropped. The cape is a SOLID, fully opaque deep-red " +
  "fabric, never translucent or glowing. No glow, halo or rim light around the character. Transparent " +
  "background, no ground shadow, " +
  "no text, no props unless stated.";

const BASE_PROMPT =
  `Redesign the attached character as described. ${CHARACTER}\n\n` +
  "Pose: standing heroically in three-quarter view, hands on hips, cape flowing behind. " +
  "Expression: calm, confident half-smile.\n\n" +
  RENDER;

/**
 * Each pose: what the body does and the expression. Optional `guide` = an image used only for framing;
 * the old v1 poses are NOT used, because they pulled the old childish face and muscle lines back in.
 */
const POSES = {
  rise: {
    pose:
      "taking off and flying straight UP, front three-quarter view: RIGHT arm raised straight overhead with " +
      "a clenched fist at the very top of the image, LEFT arm bent out to his side with a loose fist, " +
      "right knee bent up, left leg hanging straight down, the cape hangs and billows DOWN behind him toward " +
      "the bottom-left, clearly separated from his legs",
    face: "focused, determined, mouth closed",
    size: "1024x1536",
  },
  fly: {
    pose: "flying horizontally toward the RIGHT edge of the image: his HEAD and forward fist are on the RIGHT side, his boots on the LEFT side, one fist forward, other arm tucked, legs stretched back, cape streaming left",
    face: "focused and determined, slight smile",
    size: "1536x1024",
  },
  burst: {
    pose: "bursting straight toward the viewer, both fists forward, cape flaring out to both sides",
    face: "confident, energised smile with a few teeth showing, eyes focused",
    size: "1024x1024",
  },
  sit: {
    pose: "sitting on an invisible ledge, legs dangling, one hand resting beside him, other hand waving",
    face: "warm, relaxed closed-mouth smile",
    size: "1024x1536",
  },
  lie: {
    pose: "lying on his side, head propped on one hand, other hand giving a thumbs up, cape draped under him",
    face: "easy-going, self-assured half smile",
    size: "1536x1024",
  },
  wave: {
    pose: "standing, three-quarter view, waving hello with one hand, other hand on hip",
    face: "friendly smile, mouth mostly closed",
    size: "1024x1536",
  },
  point: {
    pose: "standing, pointing to the RIGHT with one arm extended as if presenting something, other hand on hip",
    face: "confident, pleased smile",
    size: "1024x1536",
  },
  think: {
    pose: "standing, one hand on chin, other arm crossed under it, head tilted slightly",
    face: "curious, thoughtful, one eyebrow raised above the visor",
    size: "1024x1536",
  },
  cheer: {
    pose: "hovering upright, both fists raised in victory, cape billowing",
    face: "proud, satisfied smile, mouth slightly open",
    size: "1024x1536",
  },
};

async function asBlob(file) {
  const type = file.endsWith(".webp") ? "image/webp" : "image/png";
  return new Blob([await readFile(path.join(ROOT, file))], { type });
}

async function generate({ images, prompt, size, out }) {
  const form = new FormData();
  form.append("model", MODEL);
  for (const [blob, name] of images) form.append("image[]", blob, name);
  form.append("prompt", prompt);
  form.append("size", size);
  form.append("background", "transparent");
  form.append("output_format", "png");
  form.append("quality", "high");
  form.append("input_fidelity", "high");

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}` },
    body: form,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${json.error?.message ?? JSON.stringify(json)}`);
  await writeFile(out, Buffer.from(json.data[0].b64_json, "base64"));
  return path.relative(ROOT, out);
}

await mkdir(OUT, { recursive: true });
const args = process.argv.slice(2);

if (args[0] === "base") {
  process.stdout.write("Generating base character... ");
  const saved = await generate({
    images: [[await asBlob("public/images/home/kimpch.webp"), "kimpch.webp"]],
    prompt: BASE_PROMPT,
    size: "1024x1536",
    out: BASE_FILE,
  });
  console.log(`saved ${saved}\nReview it. Happy? Run again without "base" to make the poses.`);
  process.exit(0);
}

if (!existsSync(BASE_FILE)) {
  console.error('No base character yet. Run "node scripts/generate-mascot-v2.mjs base" first.');
  process.exit(1);
}

const base = await asBlob(path.relative(ROOT, BASE_FILE));
const wanted = args.length ? args : Object.keys(POSES);

for (const name of wanted) {
  const p = POSES[name];
  if (!p) {
    console.error(`Unknown pose "${name}". Options: base, ${Object.keys(POSES).join(", ")}`);
    continue;
  }
  const images = [[base, "character.png"]];
  if (p.guide) images.push([await asBlob(p.guide), path.basename(p.guide)]);
  const prompt =
    "The FIRST image is the character model sheet: copy this exact character (same face, head shape, hair, " +
    "beard, visor, body proportions, suit details, colours and rendering style). Do not redesign him.\n" +
    (p.guide
      ? "The SECOND image is only a pose and composition guide: match its pose, framing and silhouette, " +
        "but ignore its character design entirely.\n"
      : "") +
    `\nPose: ${p.pose}.\nExpression: ${p.face}.\n\n${RENDER}`;

  process.stdout.write(`Generating "${name}"... `);
  try {
    console.log(`saved ${await generate({ images, prompt, size: p.size, out: path.join(OUT, `${name}.png`) })}`);
  } catch (err) {
    console.error(`failed (${err.message})`);
  }
}
