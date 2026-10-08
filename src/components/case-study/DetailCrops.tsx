"use client";

import React from "react";
import Image from "next/image";
import { CaseStudyDetail } from "@/data/case-studies";
import { RevealText } from "@/components/ui/RevealText";

interface DetailCropsProps {
  details: CaseStudyDetail[];
  accent: string;
}

/**
 * Three pre-cropped detail zooms. Each tile is a real crop of the product
 * image, so the presentation stays faithful to what actually exists.
 */
export function DetailCrops({ details, accent }: DetailCropsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {details.map((d, i) => (
        <RevealText key={d.src} delay={i * 110} className="h-full">
          <figure className="group h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-rule bg-canvas">
              <Image
                src={d.src}
                alt={d.title}
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to top, ${accent}22, transparent 60%)`,
                }}
              />
            </div>

            <figcaption className="mt-4 space-y-1.5">
              <div className="flex items-baseline gap-2.5">
                <span
                  className="font-mono text-[10px] tabular-nums"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-sm font-semibold text-ink tracking-tight">
                  {d.title}
                </h4>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-dim">
                {d.note}
              </p>
            </figcaption>
          </figure>
        </RevealText>
      ))}
    </div>
  );
}
