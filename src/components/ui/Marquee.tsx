import React from "react";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  /** `surface` = cream band, `ink` = espresso band, `gold` = metallic band */
  tone?: "surface" | "ink" | "gold";
  speed?: number;
  className?: string;
};

const tones = {
  surface: "bg-surface text-ink-dim border-y border-rule",
  ink: "bg-ink text-canvas/80 border-y border-ink",
  gold: "bg-accent-surface text-accent-soft border-y border-accent/40",
};

const separators = {
  surface: "text-gold",
  ink: "text-gold-bright",
  gold: "text-accent",
};

/**
 * Endless horizontal ticker. Decorative — hidden from screen readers and
 * paused on hover so it never competes with the copy around it.
 */
export function Marquee({
  items,
  reverse = false,
  tone = "surface",
  speed = 46,
  className = "",
}: MarqueeProps) {
  const strip = (key: number) => (
    <span key={key} className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex shrink-0 items-center">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] whitespace-nowrap px-1">
            {item}
          </span>
          <span
            className={`px-4 sm:px-6 font-mono text-[10px] ${separators[tone]}`}
            aria-hidden="true"
          >
            {"///"}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className={`marquee-band select-none py-3.5 ${tones[tone]} ${className}`}
    >
      <div
        className="marquee-track"
        style={{
          ["--marquee-speed" as string]: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {strip(0)}
        {strip(1)}
      </div>
    </div>
  );
}
