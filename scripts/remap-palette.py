#!/usr/bin/env python3
"""Remap the light portfolio palette to the dark-first semantic token set.

Utility-aware: `text-[#111827]` -> `text-ink` but `bg-[#111827]` -> `bg-ink`
and `text-[#FDFDFC]` -> `text-canvas`, so inverse (button) pairs invert too.
"""
import re
import sys
from pathlib import Path

ROOT = Path("src")

# hex (lowercase, no #) -> default token
DEFAULT = {
    "fdfdfc": "canvas",
    "ffffff": "surface",
    "f3f4f6": "raised",
    "e5e7eb": "rule",
    "d1d5db": "rule-strong",
    "111827": "ink",
    "4b5563": "ink-soft",
    "9ca3af": "ink-dim",
    "2563eb": "accent",
    "1d4ed8": "accent-soft",
    "10b981": "success",
    "22c55e": "success",
    "f59e0b": "warning",
    "ef4444": "danger",
}

# (hex, utility) -> token  — overrides for utility-specific meaning
OVERRIDE = {
    ("ffffff", "bg"): "surface",
    ("ffffff", "text"): "ink",
    ("ffffff", "from"): "surface",
    ("ffffff", "via"): "surface",
    ("ffffff", "to"): "surface",
    ("ffffff", "border"): "rule",
    ("fdfdfc", "bg"): "canvas",
    ("fdfdfc", "text"): "canvas",
    ("fdfdfc", "from"): "canvas",
    ("fdfdfc", "via"): "canvas",
    ("fdfdfc", "to"): "canvas",
    ("d1d5db", "text"): "ink-dim",
    ("d1d5db", "border"): "rule-strong",
    ("d1d5db", "bg"): "raised",
    ("e5e7eb", "bg"): "raised",
    ("e5e7eb", "text"): "ink-dim",
    ("e5e7eb", "border"): "rule",
    ("e5e7eb", "from"): "rule",
    ("e5e7eb", "via"): "rule",
    ("e5e7eb", "to"): "rule",
    ("111827", "bg"): "ink",
    ("111827", "text"): "ink",
    ("111827", "border"): "ink",
}

# utility-prefix segments Tailwind may use (incl. variants handled separately)
UTILS = (
    "text|bg|border|from|via|to|decoration|outline|fill|stroke|ring|divide|"
    "shadow|accent|caret|placeholder"
)

CLASS_RE = re.compile(
    r"(?P<head>(?:[a-zA-Z][\w-]*:)*(?P<util>" + UTILS + r")-)"
    r"\[#(?P<hex>[0-9A-Fa-f]{6})\]"
    r"(?P<op>/\d{1,3})?"
)

# remaining raw hexes (inline styles / fallbacks)
RAW_RE = re.compile(r"#(?P<hex>" + "|".join(DEFAULT) + r")\b", re.IGNORECASE)

RGBA_REPLACEMENTS = {
    "rgba(37, 99, 235": "rgba(123, 140, 255",
    "rgba(37,99,235": "rgba(123,140,255",
}

# special compound class replacements (before generic pass)
SPECIAL = [
    ("shadow-[0_0_12px_rgba(37,99,235,0.6)]", "shadow-[0_0_16px_rgba(123,140,255,0.45)]"),
    ("shadow-[0_0_12px_rgba(37,99,235,0.5)]", "shadow-[0_0_16px_rgba(123,140,255,0.4)]"),
]


def remap_class(m: re.Match) -> str:
    hexkey = m.group("hex").lower()
    if hexkey not in DEFAULT:
        return m.group(0)
    util = m.group("util")
    token = OVERRIDE.get((hexkey, util), DEFAULT[hexkey])
    op = m.group("op") or ""
    return f"{m.group('head')}{token}{op}"


def process(text: str) -> str:
    for old, new in SPECIAL:
        text = text.replace(old, new)
    for old, new in RGBA_REPLACEMENTS.items():
        text = text.replace(old, new)
    text = CLASS_RE.sub(remap_class, text)
    # raw hexes left in inline styles / strings
    text = RAW_RE.sub(lambda m: "#" + DEFAULT[m.group("hex").lower()], text)
    return text


def main() -> int:
    changed = 0
    for path in sorted(ROOT.rglob("*")):
        if path.suffix not in {".tsx", ".ts"}:
            continue
        original = path.read_text(encoding="utf-8")
        updated = process(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"  {path}")
    print(f"{changed} files updated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
