"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CaseStudyCallout } from "@/data/case-studies";

interface InterfaceMapProps {
  src: string;
  alt: string;
  callouts: CaseStudyCallout[];
  accent: string;
}

/**
 * The project image with numbered hotspots. Hovering or focusing either a
 * hotspot or its legend entry reveals the label — the legend doubles as the
 * accessible description for every marker.
 */
export function InterfaceMap({ src, alt, callouts, accent }: InterfaceMapProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-xl border border-rule bg-canvas">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />

          {/* Dimming veil so markers read against busy interfaces */}
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: active === null ? 0 : 1,
              backgroundColor: "rgba(8, 9, 11, 0.55)",
            }}
          />

          {callouts.map((c) => {
            const on = active === c.n;
            return (
              <button
                key={c.n}
                type="button"
                aria-label={`${c.n}. ${c.label}`}
                aria-pressed={on}
                onMouseEnter={() => setActive(c.n)}
                onMouseLeave={() => setActive((n) => (n === c.n ? null : n))}
                onFocus={() => setActive(c.n)}
                onBlur={() => setActive((n) => (n === c.n ? null : n))}
                onClick={() => setActive((n) => (n === c.n ? null : c.n))}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] tabular-nums backdrop-blur-md transition-all duration-300"
                  style={{
                    borderColor: on ? accent : "rgba(242,242,240,0.45)",
                    backgroundColor: on ? accent : "rgba(8,9,11,0.72)",
                    color: "#f2ecdd",
                    transform: on ? "scale(1.18)" : "scale(1)",
                    boxShadow: on ? `0 0 0 6px ${accent}26` : "none",
                  }}
                >
                  {c.n}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend — also the accessible text for the markers above */}
      <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-2">
        {callouts.map((c) => {
          const on = active === c.n;
          return (
            <li key={c.n}>
              <button
                type="button"
                onMouseEnter={() => setActive(c.n)}
                onMouseLeave={() => setActive((n) => (n === c.n ? null : n))}
                onFocus={() => setActive(c.n)}
                onBlur={() => setActive((n) => (n === c.n ? null : n))}
                onClick={() => setActive((n) => (n === c.n ? null : c.n))}
                className="group flex w-full items-center gap-3 border-b border-rule-soft py-2.5 text-left transition-colors duration-300 hover:border-rule"
              >
                <span
                  className="font-mono text-[10px] tabular-nums transition-colors duration-300"
                  style={{ color: on ? accent : undefined }}
                >
                  {String(c.n).padStart(2, "0")}
                </span>
                <span
                  className={`text-[13px] transition-colors duration-300 ${
                    on ? "text-ink" : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {c.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
