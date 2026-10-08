#!/usr/bin/env python3
"""Polish project imagery: trim letterbox padding, reframe, tone-match to the
portfolio family, apply a light gold/cream grade, sharpen, and re-encode.

PIL-only (no numpy) so it runs anywhere the site builds.

Usage: python3 scripts/enhance_images.py [--dry-run]
"""
import sys
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps, ImageStat

ROOT = Path("public/projects")

COVERS = ["ecommerce.jpg", "banking.jpg", "eazeworkflow.jpg"]

DETAILS = [
    "scalable-ecommerce-detail-1.jpg",
    "scalable-ecommerce-detail-2.jpg",
    "scalable-ecommerce-detail-3.jpg",
    "distributed-banking-detail-1.jpg",
    "distributed-banking-detail-2.jpg",
    "distributed-banking-detail-3.jpg",
    "eazeworkflow-detail-1.jpg",
    "eazeworkflow-detail-2.jpg",
    "eazeworkflow-detail-3.jpg",
]

DETAIL_SIZE = (640, 480)

# family targets (gamma-code / aerotrack / workflow-builder sit here)
TARGET_MEAN = 42.0
TARGET_STD = 33.0

WARM_R = lambda i: min(255, int(i * 1.05 + 1))   # noqa: E731
WARM_G = lambda i: min(255, int(i * 1.005))      # noqa: E731
WARM_B = lambda i: int(i * 0.93)                 # noqa: E731


def gamma_lut(hist, total, target, gmin=0.85, gmax=1.15):
    """Gamma that nudges the mean toward `target`, clamped so the image keeps
    its character (a bright product shot must not be crushed to a dark one)."""
    lo, hi = 0.3, 3.0
    g = 1.0
    for _ in range(24):
        g = (lo + hi) / 2
        lut = [255.0 * ((i / 255.0) ** g) for i in range(256)]
        mean = sum(hist[i] * lut[i] for i in range(256)) / total
        if mean < target:
            hi = g  # too dark -> need a smaller exponent
        else:
            lo = g
    g = max(gmin, min(gmax, g))
    return [int(round(255.0 * ((i / 255.0) ** g))) for i in range(256)]


def trim_letterbox(im, tol=4.0, gap=28.0, max_trim=0.06):
    """Crop uniform edge bars that differ strongly from their neighbour strip."""
    w, h = im.size
    box = [0, 0, w, h]
    changed = True
    while changed:
        changed = False
        x0, y0, x1, y1 = box
        w0, h0 = x1 - x0, y1 - y0
        limit = int(max(w0, h0) * max_trim)
        if limit < 4:
            break
        strips = {
            "top": (x0, y0, x1, min(y0 + 3, y1)),
            "bottom": (x0, max(y1 - 3, y0), x1, y1),
            "left": (x0, y0, min(x0 + 3, x1), y1),
            "right": (max(x1 - 3, x0), y0, x1, y1),
        }
        inner = {
            "top": (x0, min(y0 + 6, y1), x1, min(y0 + 12, y1)),
            "bottom": (x0, max(y1 - 12, y0), x1, max(y1 - 6, y0)),
            "left": (min(x0 + 6, x1), y0, min(x0 + 12, x1), y1),
            "right": (max(x1 - 12, x0), y0, max(x1 - 6, x0), y1),
        }
        for side in ("top", "bottom", "left", "right"):
            edge = im.crop(strips[side]).convert("L")
            near = im.crop(inner[side]).convert("L")
            es, ns = ImageStat.Stat(edge), ImageStat.Stat(near)
            if es.stddev[0] < tol and abs(es.mean[0] - ns.mean[0]) > gap:
                if side == "top":
                    box[1] += 3
                elif side == "bottom":
                    box[3] -= 3
                elif side == "left":
                    box[0] += 3
                else:
                    box[2] -= 3
                changed = True
                break
        if box[0] + 12 > box[2] or box[1] + 12 > box[3]:
            break
    if tuple(box) != (0, 0, w, h):
        return im.crop(tuple(box))
    return im


def apply_band_lut(im, lut):
    r, g, b = im.split()
    return Image.merge("RGB", (r.point(lut), g.point(lut), b.point(lut)))


def fit_aspect(im, aspect):
    """Center-crop (top-weighted for covers) so a resize never stretches."""
    w, h = im.size
    cur = w / h
    if abs(cur - aspect) < 0.01:
        return im
    if cur > aspect:
        nw = int(round(h * aspect))
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = int(round(w / aspect))
    return im.crop((0, 0, w, nh))


def tone(im, target_mean, target_std):
    """Contrast only when the image is flat (scaled about its own mean so dark
    UI backgrounds stay dark), then a clamped gamma nudge toward the family
    brightness. Bright product shots are pulled gently, never crushed."""
    gray = im.convert("L")
    st = ImageStat.Stat(gray)
    mean, std = st.mean[0], st.stddev[0]

    if std < 31:
        factor = max(1.0, min(1.3, target_std / max(std, 1)))
        m = int(round(mean))
        lut = [max(0, min(255, int(round(m + (v - m) * factor)))) for v in range(256)]
        im = apply_band_lut(im, lut)
        st = ImageStat.Stat(im.convert("L"))
        mean = st.mean[0]

    goal = target_mean if mean < 55 else max(target_mean, 60)
    if abs(mean - goal) > 3:
        hist = im.convert("L").histogram()
        im = apply_band_lut(im, gamma_lut(hist, sum(hist), goal))
    return im


def warm(im):
    r, g, b = im.split()
    r = r.point(WARM_R)
    g = g.point(WARM_G)
    b = b.point(WARM_B)
    return Image.merge("RGB", (r, g, b))


def sharpen(im, radius, percent, threshold=3):
    return im.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=threshold))


def stats(im):
    st = ImageStat.Stat(im.convert("L"))
    g = im.convert("L").filter(
        ImageFilter.Kernel((3, 3), [-1, -1, -1, -1, 8, -1, -1, -1, -1], scale=1, offset=128)
    )
    return st.mean[0], st.stddev[0], ImageStat.Stat(g).stddev[0]


def process(path: Path, kind: str, dry: bool):
    src = Image.open(path).convert("RGB")
    before = stats(src)
    b0 = path.stat().st_size

    im = trim_letterbox(src)
    trimmed = src.size != im.size

    if kind == "detail":
        im = fit_aspect(im, DETAIL_SIZE[0] / DETAIL_SIZE[1])
        if im.size != DETAIL_SIZE:
            im = im.resize(DETAIL_SIZE, Image.LANCZOS)
        im = tone(im, TARGET_MEAN, TARGET_STD)
        im = warm(im)
        im = sharpen(im, 1.1, 150, threshold=2)
    else:
        im = fit_aspect(im, 16 / 9)
        im = tone(im, TARGET_MEAN, TARGET_STD)
        im = warm(im)
        im = sharpen(im, 1.5, 110, threshold=2)

    after = stats(im)
    print(
        f"{path.name:36} {src.size}{' -> ' + str(im.size) if im.size != src.size else '':12} "
        f"trim={'y' if trimmed else 'n'} "
        f"mean {before[0]:5.1f}->{after[0]:5.1f}  "
        f"std {before[1]:5.1f}->{after[1]:5.1f}  "
        f"sharp {before[2]:5.1f}->{after[2]:5.1f}  "
        f"{b0 // 1024}KB"
    )
    if not dry:
        im.save(path, "JPEG", quality=86, optimize=True, progressive=True, subsampling=0)
        print(f"{'':36} saved {path.stat().st_size // 1024}KB")


def main():
    dry = "--dry-run" in sys.argv
    for name in COVERS:
        process(ROOT / name, "cover", dry)
    for name in DETAILS:
        process(ROOT / name, "detail", dry)


if __name__ == "__main__":
    main()
