#!/usr/bin/env python3
"""
A non-flying Kimp Hero pose for the /graphic-design-services/ review panel.

Unlike generate-inner-mascots.py, this one DOES send the master render to the image
model (owner asked for a regenerated pose on 2026-11-06). The result can drift from
the master, so review every candidate before shipping one.

  python scripts/generate-review-pose.py [pose ...]     (default: all poses)
    -> brand/mascot/poses/review-<pose>.png  (candidates, not shipped)
"""
import base64
import io
import sys
from importlib import import_module
from pathlib import Path

import requests
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
gim = import_module("generate-inner-mascots")

ROOT = gim.ROOT
OUT = ROOT / "brand/mascot/poses"
MASTER = ROOT / gim.BRAND["masterSource"]

BASE = (
    "Redraw the attached character in a new pose. Keep him IDENTICAL to the reference: same face, same "
    "head size and adult proportions, same calm closed-mouth smile, same yellow visor with red rim, same brown "
    "swept-up hair and short beard, same muscular build, same golden-yellow suit with fine panel lines, cream "
    "'K' chest badge, cream centre stripe, gold collar ring, gold cuffs, gold belt with 'K' buckle, cream knee "
    "pads, golden boots and deep-red cape. Same glossy 3D render style and soft studio lighting from the upper "
    "right. Full body visible, nothing cropped, centred. Transparent background, no ground shadow, no text."
)

POSES = {
    "thumbs": "Pose: standing upright and proud on the ground, feet apart, facing the viewer in three-quarter "
    "view, right hand giving a big thumbs-up at chest height, left hand on his hip, cape hanging and gently "
    "swaying behind him.",
    "trophy": "Pose: standing upright and proud on the ground, feet apart, facing the viewer in three-quarter "
    "view, holding a shiny golden trophy cup high above his head with his right hand in celebration, left "
    "hand on his hip, cape hanging and gently swaying behind him.",
}


def main():
    key = gim.load_key()
    if not key:
        sys.exit("OPENAI_API_KEY is not set (env, .env.local or .env).")
    OUT.mkdir(parents=True, exist_ok=True)
    ref = MASTER.read_bytes()
    for name in sys.argv[1:] or list(POSES):
        print(f'"{name}"... ', end="", flush=True)
        res = requests.post(
            "https://api.openai.com/v1/images/edits",
            headers={"Authorization": f"Bearer {key}"},
            files={"image[]": ("master.png", ref, "image/png")},
            data={
                "model": gim.MODEL,
                "prompt": f"{BASE}\n\n{POSES[name]}",
                "size": "1024x1536",
                "background": "transparent",
                "output_format": "png",
                "quality": "high",
                "input_fidelity": "high",
            },
            timeout=600,
        )
        body = res.json()
        if not res.ok:
            print(f"failed ({res.status_code}): {body.get('error', {}).get('message', body)}")
            continue
        img = Image.open(io.BytesIO(base64.b64decode(body["data"][0]["b64_json"]))).convert("RGBA")
        img.save(OUT / f"review-{name}.png")
        print(f"saved brand/mascot/poses/review-{name}.png")


if __name__ == "__main__":
    main()
