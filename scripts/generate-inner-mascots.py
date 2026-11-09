#!/usr/bin/env python3
"""
Page-themed Kimp Hero mascots for inner pages, with the character LOCKED.

The character is NEVER sent to the image model (any edit, masked or not,
redraws his face and body). Instead (see brand/mascot/README.md):
  1. OpenAI generates only the page's prop, alone, on a transparent background.
  2. The prop is trimmed, scaled, tilted and composited over his free left fist
     (brand/mascot/character.json -> "propAnchor"), so he appears to hold it.
Every pixel of the character is copied from the master render, so face, head,
body and build are identical on every page.

  python scripts/generate-inner-mascots.py              (all pages)
  python scripts/generate-inner-mascots.py pricing      (just some)
  python scripts/generate-inner-mascots.py --reuse      (re-composite cached props, no API call)
    -> public/images/mascot/inner/<page>.webp
       brand/mascot/props/<page>.png  (the raw prop, cached; not shipped)

Reads OPENAI_API_KEY from the environment, .env.local or .env.
Optional: OPENAI_IMAGE_MODEL (default gpt-image-1.5).
"""
import base64
import colorsys
import io
import json
import os
import sys
from pathlib import Path

import requests
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
BRAND = json.loads((ROOT / "brand/mascot/character.json").read_text(encoding="utf-8"))
OUT = ROOT / "public/images/mascot/inner"
PROPS = ROOT / "brand/mascot/props"
MODEL = os.environ.get("OPENAI_IMAGE_MODEL", "gpt-image-1.5")

# One page-themed prop per inner page. width = prop width in master pixels,
# angle = counter-clockwise tilt in degrees, dx/dy = nudge from the anchor.
ITEMS = {
    "graphic-design": {
        "prop": "a chunky white artist's paint palette with a thumb hole, glossy blobs of orange, teal-green, "
        "red and yellow paint, and one paintbrush with an orange-dipped tip lying across it",
        "width": 330, "angle": 12, "dx": -20, "dy": 10,
    },
    "video": {
        "prop": "an open black-and-white film clapperboard, diagonal black and white stripes on the clapper, "
        "plain blank black slate with no writing",
        "width": 330, "angle": 10, "dx": -10, "dy": 0,
    },
    "pricing": {
        "prop": "a large round golden coin seen from the front, thick gold rim, raised teal-green centre with one "
        "golden '$' symbol",
        "width": 270, "angle": 0, "dx": -10, "dy": 0,
    },
    "kimp360": {
        "prop": "a slim silver tablet in landscape, screen facing the viewer, showing a clean project dashboard in "
        "dark teal-green and white: three columns of small white cards with orange and green status dots, "
        "abstract UI shapes only, no readable words",
        "width": 360, "angle": 8, "dx": -10, "dy": 10,
    },
    # /graphic-design-services/ featured client review (proof.tsx)
    "review": {
        "prop": "a glossy golden trophy cup with two curved handles on a short teal-green base, a row of five "
        "small raised golden stars across the front of the cup",
        "width": 360, "angle": 8, "dx": -20, "dy": -50,
    },
    # /compare-service/ (Us vs. Them)
    "compare": {
        "prop": "a glossy golden balance scale held up by its top ring, the beam clearly tipped: the lower pan holds "
        "one glowing orange star, the higher pan holds a small dull grey pebble, teal-green accents on the "
        "central pillar, no text",
        # grip: the pole passes through his fist, fingers drawn back on top (fist_mask).
        "width": 420, "angle": 0, "dx": -8, "dy": -49, "grip": True,
    },
    # ---- Pages rebuilt 2026-11: one prop each, matching the page's content. ----
    # rest: object stands on his fist (fingers drawn over its base). grip: a pole/handle passes through the fist.
    "about-us": {"prop": "a glossy globe on a short golden stand, orange continents on a teal-green ocean", "width": 300, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "contact-us": {"prop": "a glossy orange envelope, slightly open, with a white letter peeking out and a teal-green heart seal, no text", "width": 320, "angle": 8, "dx": -10, "dy": 0, "rest": True},
    "affiliates": {"prop": "a plump teal-green money sack tied at the top with gold rope, a few golden coins tumbling out of the top, no symbols", "width": 300, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "careers": {"prop": "a glossy orange leather briefcase with gold clasps and a gold handle, seen from the front", "width": 320, "angle": 0, "dx": -5, "dy": 70, "rest": True},
    "careers-graphic-designer": {"reuse": "graphic-design", "width": 330, "angle": 12, "dx": -20, "dy": 10},
    "careers-project-manager": {"prop": "a teal-green clipboard with a gold clip holding a white checklist sheet with three orange check marks and grey lines, no text", "width": 300, "angle": 8, "dx": -10, "dy": 0, "rest": True},
    "careers-content-writer": {"prop": "one large glossy fountain pen standing upright, tip pointing down, teal-green barrel with gold bands and a gold nib", "width": 150, "angle": 0, "dx": 0, "dy": -40, "grip": True},
    "careers-motion-graphics-artist": {"prop": "a glossy golden film reel with an orange film strip curling out of it in a smooth loop", "width": 320, "angle": 0, "dx": -10, "dy": 0, "rest": True},
    "careers-illustrator": {"prop": "one large chunky orange wooden pencil standing upright, sharpened tip pointing down, pink eraser on top with a gold band", "width": 120, "angle": 0, "dx": 0, "dy": -40, "grip": True},
    "small-business": {"prop": "a small cute storefront shop model with an orange and white striped awning, teal-green door and a big front window", "width": 320, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "startups": {"prop": "a glossy cartoon rocket ship pointing up and slightly right, white body, orange fins, a round teal-green window, small flame at the base", "width": 220, "angle": -20, "dx": -10, "dy": 0, "rest": True},
    "marketing": {"prop": "a glossy orange megaphone with a teal-green handle underneath, bell pointing to the upper left", "width": 330, "angle": 0, "dx": 0, "dy": -60, "grip": True},
    "enterprise-clients": {"prop": "a small glossy model of three modern office skyscrapers on a round gold base, teal-green glass windows with orange accents", "width": 280, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "yspace": {"prop": "a small terracotta pot with a bright green sprouting plant with three fresh leaves, a tiny gold star on the pot", "width": 260, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "canva-designers": {"prop": "a slim silver tablet in landscape showing a colourful drag-and-drop design canvas: an orange poster layout, a teal-green photo block and colour swatches, abstract shapes only, no readable words, no logos", "width": 360, "angle": 8, "dx": -10, "dy": 10},
    "design-categories": {"prop": "a fanned-out deck of rounded design cards, each a different style: an orange poster, a teal-green logo tile, a yellow social post, a red banner, abstract shapes, no text", "width": 340, "angle": 6, "dx": -10, "dy": 0, "rest": True},
    "brand-assets": {"prop": "a teal-green press kit folder with orange tabs, a few colour swatch cards and a small logo card peeking out of the top, no text, no letters", "width": 320, "angle": 6, "dx": -10, "dy": 0, "rest": True},
    "privacy-policy": {"prop": "a glossy teal-green shield with a golden padlock in the centre", "width": 280, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "terms-of-services": {"prop": "a rolled parchment scroll, partly unrolled, with faint grey lines and a red wax seal at the bottom, no text", "width": 300, "angle": 10, "dx": -10, "dy": 0, "rest": True},
    "cookie-policy-eu": {"prop": "a big golden chocolate chip cookie with one bite taken out of the edge", "width": 270, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "llm-information-guidance": {"prop": "a friendly glossy white robot head with a teal-green visor screen showing two simple orange eyes and a small antenna", "width": 260, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    # Already-built pages that still used the generic hero (2026-11).
    "our-work": {"reuse": "graphic-design", "width": 330, "angle": 12, "dx": -20, "dy": 10},
    "salary-cost-calculator": {"prop": "a chunky orange pocket calculator with teal-green and white buttons and a blank green screen", "width": 240, "angle": 6, "dx": -5, "dy": 0, "rest": True},
    "white-label-graphic-design": {"prop": "a plain white blank shipping box with a blank gold label tag on a string, no text, no logos", "width": 300, "angle": 6, "dx": -5, "dy": 0, "rest": True},
    "entrepreneurs": {"prop": "a big glossy glowing light bulb with a gold screw base", "width": 210, "angle": 0, "dx": -5, "dy": 0, "rest": True},
    "fitness-health-brands": {"prop": "one teal-green dumbbell standing upright, heavy round weights at the top and bottom, a gold grip bar in the middle", "width": 170, "angle": 0, "dx": 0, "dy": 0, "grip": True},
    "professional-services": {"prop": "a navy-blue leather briefcase with gold clasps and a gold handle, seen from the front", "width": 320, "angle": 0, "dx": -5, "dy": 70, "rest": True},
    "faq": {"prop": "a big glossy orange 3D question mark with a rounded teal-green dot", "width": 220, "angle": 6, "dx": -5, "dy": 0, "rest": True},
    "case-study": {"prop": "a big glossy magnifying glass with a gold rim and a dark teal-green handle, through its lens a small rising orange bar chart with an upward arrow, no text", "width": 260, "angle": 8, "dx": -5, "dy": 0, "rest": True},
}


def load_key():
    if os.environ.get("OPENAI_API_KEY"):
        return os.environ["OPENAI_API_KEY"].strip()
    for name in (".env.local", ".env"):
        env = ROOT / name
        if not env.exists():
            continue
        for line in env.read_text(encoding="utf-8").splitlines():
            if line.startswith("OPENAI_API_KEY="):
                return line.split("=", 1)[1].strip().strip("\"'")
    return None


def generate_prop(key, description):
    res = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={"Authorization": f"Bearer {key}"},
        json={
            "model": MODEL,
            "prompt": f"{description}.\n\n{BRAND['propPrompt']}",
            "size": "1024x1024",
            "background": "transparent",
            "output_format": "png",
            "quality": "high",
        },
        timeout=600,
    )
    body = res.json()
    if not res.ok:
        raise RuntimeError(f"{res.status_code}: {body.get('error', {}).get('message', body)}")
    return Image.open(io.BytesIO(base64.b64decode(body["data"][0]["b64_json"]))).convert("RGBA")


def composite(master, prop, spec):
    """Place the prop over the free fist. The master is only ever pasted, never altered."""
    # Premultiplied alpha while resampling: no dark/jagged fringe on the prop's edges.
    prop = prop.crop(prop.getbbox()).convert("RGBa")
    h = round(prop.height * spec["width"] / prop.width)
    prop = prop.resize((spec["width"], h), Image.LANCZOS, reducing_gap=3.0)
    if spec["angle"]:
        prop = prop.rotate(spec["angle"], resample=Image.BICUBIC, expand=True)
    prop = prop.convert("RGBA")
    a = BRAND["propAnchor"]
    x = a["x"] + spec["dx"] - prop.width // 2
    if spec.get("rest"):
        # The object stands on his fist: its bottom edge sits just inside the fist, fingers drawn over it.
        y = a["y"] + 30 + spec["dy"] - prop.height
    else:
        y = a["y"] + spec["dy"] - prop.height // 2
    out = master.copy()
    out.alpha_composite(prop, (x, y))
    if spec.get("grip") or spec.get("rest"):
        # Handle props (a pole): lay his own fingers back over the prop so the fist wraps it.
        out.paste(master, (0, 0), fist_mask(master))
    return out


def fist_mask(master):
    """Soft mask of the free fist's fingers and palm (skin only: no gold cuff, cape or backdrop)."""
    x0, y0, x1, y1 = BRAND["fistBox"]
    skin = Image.new("L", master.size, 0)
    allow = Image.new("L", master.size, 0)
    px, sk, al = master.load(), skin.load(), allow.load()
    for yy in range(y0, y1):
        for xx in range(x0, x1):
            r, g, b, a = px[xx, yy]
            if a < 200:
                continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if (h < 0.075 or h > 0.97) and 0.12 < s < 0.62 and v > 0.45:
                sk[xx, yy] = 255
            if not (0.075 <= h <= 0.2 and s > 0.25) and not (s > 0.68 or v < 0.28):
                al[xx, yy] = 255
    # Close the shadowed creases between fingers, keep only skin-coloured areas, then fill any holes.
    closed = skin.filter(ImageFilter.MaxFilter(15)).filter(ImageFilter.MinFilter(13))
    mask = ImageChops.multiply(closed, allow).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    holes = mask.copy()
    ImageDraw.floodfill(holes, (x0, y0), 128)
    mask = holes.point(lambda v: 0 if v == 128 else 255)
    return mask.filter(ImageFilter.GaussianBlur(1.0))


def main():
    args = sys.argv[1:]
    reuse = "--reuse" in args
    names = [a for a in args if not a.startswith("--")] or list(ITEMS)
    key = None if reuse else load_key()
    if not reuse and not key:
        sys.exit("OPENAI_API_KEY is not set (env, .env.local or .env).")

    # Lossless original when available; the shipped .webp is already compressed once.
    src = ROOT / BRAND.get("masterSource", BRAND["master"])
    master = Image.open(src if src.exists() else ROOT / BRAND["master"]).convert("RGBA")
    PROPS.mkdir(parents=True, exist_ok=True)
    for name in names:
        spec = ITEMS.get(name)
        if not spec:
            print(f'Unknown page "{name}". Options: {", ".join(ITEMS)}')
            continue
        print(f'"{name}"... ', end="", flush=True)
        try:
            cached = PROPS / f"{spec.get('reuse', name)}.png"
            if reuse or spec.get("reuse"):
                prop = Image.open(cached).convert("RGBA")
            else:
                prop = generate_prop(key, spec["prop"])
                prop.save(cached)
            # Lossless: next/image does the one and only compression when it serves it.
            composite(master, prop, spec).save(OUT / f"{name}.webp", "WEBP", lossless=True, quality=100, method=6)
            print(f"saved public/images/mascot/inner/{name}.webp")
        except Exception as err:  # keep going with the other pages
            print(f"failed ({err})")


if __name__ == "__main__":
    main()
