#!/usr/bin/env python3
"""
Cut a render off its white studio background, losslessly.

Only the white that is connected to the image border is removed, so enclosed whites
(e.g. the face of a review card) stay solid. Removed pixels use "colour to alpha"
against white: anti-aliased edges keep their true colour and light-grey floor shadows
become soft dark transparent shadows, so the cutout works on dark backgrounds too.

  python scripts/cutout-white-bg.py <in.png> <out.webp|out.png> [--threshold 200]
"""
import sys

import numpy as np
from PIL import Image, ImageDraw


def cutout(src, threshold=200):
    rgb = src.convert("RGB")
    arr = np.asarray(rgb).astype(np.float32)
    w, h = rgb.size

    # Near-white map, then flood it from every border pixel: 128 = background-connected.
    # .copy(): an image made by fromarray shares numpy's read-only buffer, so floodfill would silently do nothing.
    near = Image.fromarray(np.where(arr.min(axis=2) > threshold, 255, 0).astype(np.uint8), "L").copy()
    seeds = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    seeds += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    for s in seeds:
        if near.getpixel(s) == 255:
            ImageDraw.floodfill(near, s, 128)
    bg = np.asarray(near) == 128

    # Colour to alpha against white, only inside the background region.
    inv = (255.0 - arr) / 255.0
    a = inv.max(axis=2)
    safe = np.maximum(a, 1e-6)[..., None]
    unmixed = 255.0 - (255.0 - arr) / safe
    out_rgb = np.where(bg[..., None], unmixed, arr)
    alpha = np.where(bg, a, 1.0)
    out = np.dstack([np.clip(out_rgb, 0, 255), np.clip(alpha * 255.0, 0, 255)]).round().astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    # Trim to visible content (ignore near-invisible haze).
    box = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    return img.crop(box)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 2:
        sys.exit(__doc__)
    threshold = 200
    if "--threshold" in sys.argv:
        threshold = int(sys.argv[sys.argv.index("--threshold") + 1])
        args = [a for a in args if a != str(threshold)]
    img = cutout(Image.open(args[0]), threshold)
    if args[1].endswith(".webp"):
        img.save(args[1], "WEBP", lossless=True, quality=100, method=6)
    else:
        img.save(args[1])
    print(f"saved {args[1]} {img.size}")


if __name__ == "__main__":
    main()
