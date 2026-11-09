#!/usr/bin/env python3
"""
Review-panel scene for /graphic-design-services/ (proof.tsx).

Kimp Hero standing on a big teal 5-star review bubble, giving a thumbs-up, with a chat
bubble and gold stars around him. The standing pose is a regenerated candidate from
scripts/generate-review-pose.py (brand/mascot/poses/review-<pose>.png); the props come
from brand/mascot/props/ (generated on their own, no character).

  python scripts/generate-review-scene.py [pose]   (default pose: thumbs; generates missing props)
  python scripts/generate-review-scene.py --reuse  (cached props only, no API call)
    -> public/images/mascot/inner/review-scene.webp
"""
import sys
from importlib import import_module
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
gim = import_module("generate-inner-mascots")

ROOT = gim.ROOT
PROPS = gim.PROPS
POSES = ROOT / "brand/mascot/poses"
OUT = ROOT / "public/images/mascot/inner/review-scene.webp"

PROP_PROMPTS = {
    "review-bubble": "a chunky glossy 3D chat speech bubble with a tail at the bottom right, golden-yellow fading "
    "to bright teal-cyan on the right side, three short soft-yellow horizontal lines on its face like blurred text",
    "review-bar": "a long chunky glossy 3D teal-green rounded rectangle speech-bubble outline frame with a small "
    "pointed tail at the bottom, lying in slight perspective, with five glossy golden stars standing in a row inside it",
    "review-star": "one chunky glossy golden five-pointed star with soft bevelled edges",
}

CANVAS = (1800, 1700)
MASCOT_H = 980  # mascot height in canvas px
MASCOT_CX = 980
BAR_W = 1080
BAR_CX = 860
BAR_TOP = 1040  # top edge of the review bubble; his boots rest on its top rim
FOOT_SINK = 45  # boots overlap the rim a little so he stands on it, not above it

# (name, width, angle, centre x, centre y); BACK is drawn behind the mascot, FRONT over everything.
BACK = [("review-bubble", 420, 6, 470, 420)]
FRONT = [("review-star", 210, 14, 1500, 880), ("review-star", 110, -12, 1380, 360)]


def solid_bbox(img):
    """Bounding box of the clearly visible pixels (ignores faint haze the model leaves around objects)."""
    return img.getchannel("A").point(lambda a: 255 if a > 40 else 0).getbbox()


def prep(img, width=None, height=None, angle=0):
    img = img.crop(solid_bbox(img)).convert("RGBa")
    if width:
        size = (width, round(img.height * width / img.width))
    else:
        size = (round(img.width * height / img.height), height)
    img = img.resize(size, Image.LANCZOS, reducing_gap=3.0)
    if angle:
        img = img.rotate(angle, resample=Image.BICUBIC, expand=True)
    return img.convert("RGBA")


def put(canvas, img, cx, cy):
    canvas.alpha_composite(img, (cx - img.width // 2, cy - img.height // 2))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    reuse = "--reuse" in sys.argv
    pose = args[0] if args else "thumbs"
    key = None
    for name, prompt in PROP_PROMPTS.items():
        path = PROPS / f"{name}.png"
        if path.exists() or reuse:
            continue
        key = key or gim.load_key()
        if not key:
            sys.exit("OPENAI_API_KEY is not set (env, .env.local or .env).")
        print(f'generating "{name}"...', flush=True)
        gim.generate_prop(key, prompt).save(path)

    load = lambda n: Image.open(PROPS / f"{n}.png").convert("RGBA")
    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))

    for name, w, ang, cx, cy in BACK:
        put(canvas, prep(load(name), width=w, angle=ang), cx, cy)

    bar = prep(load("review-bar"), width=BAR_W)
    mascot = prep(Image.open(POSES / f"review-{pose}.png").convert("RGBA"), height=MASCOT_H)
    canvas.alpha_composite(mascot, (MASCOT_CX - mascot.width // 2, BAR_TOP + FOOT_SINK - mascot.height))
    canvas.alpha_composite(bar, (BAR_CX - bar.width // 2, BAR_TOP))

    for name, w, ang, cx, cy in FRONT:
        put(canvas, prep(load(name), width=w, angle=ang), cx, cy)

    canvas = canvas.crop(canvas.getbbox())
    canvas.save(OUT, "WEBP", lossless=True, quality=100, method=6)
    print(f"saved {OUT.relative_to(ROOT)} {canvas.size}")


if __name__ == "__main__":
    main()
