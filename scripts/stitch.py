#!/usr/bin/env python3
"""Stitch viewport tiles produced by scripts/shot.mjs into one full-page PNG.

Usage: python3 scripts/stitch.py <tileDir> [outPng] [targetWidth]
"""
import json
import os
import sys
from PIL import Image

tile_dir = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else None
target_w = int(sys.argv[3]) if len(sys.argv) > 3 else 0

with open(os.path.join(tile_dir, "manifest.json")) as f:
    manifest = json.load(f)

width = manifest["width"]
height = manifest["height"]
scale_w = target_w or width

canvas = Image.new("RGB", (scale_w, height), (8, 9, 11))
first_h = None

for i, tile in enumerate(manifest["tiles"]):
    im = Image.open(tile["file"]).convert("RGB")
    if im.width != scale_w:
        im = im.resize(
            (scale_w, round(im.height * scale_w / im.width)), Image.LANCZOS
        )
    if first_h is None:
        first_h = im.height
    y = tile["y"]
    # Overlap by one pixel so no seam line survives the resample.
    box = (0, y, scale_w, min(y + im.height, height))
    canvas.paste(im.crop((0, 0, box[2], box[3] - y)), (0, y))

if out is None:
    out = os.path.join(tile_dir, "full.png")
canvas.save(out)
print(f"{out}  {canvas.width}x{canvas.height}")
