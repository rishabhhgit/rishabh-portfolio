"use client";

import React from "react";
import { RevealText } from "@/components/ui/RevealText";

const focusAreas = [
  "Interface & interaction design",
  "Design systems & tokens",
  "Backend & API architecture",
  "AI products & LLM workflows",
  "Real-time dashboards",
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-rule section-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Main statement */}
        <div className="lg:col-span-7 space-y-8">
          <RevealText>
            <div className="eyebrow">
              <span className="text-accent">05</span>
              <span className="mx-2 text-rule-strong">—</span>
              About
            </div>
          </RevealText>

          <RevealText delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-ink tracking-[-0.03em] leading-[1.15]">
              I&apos;m Rishabh — a UI/UX and product designer who builds what I design.
            </h2>
          </RevealText>

          <RevealText delay={160}>
            <p className="text-ink-soft text-lg leading-[1.7] max-w-2xl">
              I start in the interface and finish in production — designing screens, shaping the structure behind them, and shipping the result. Most of the effort goes into decisions, not decoration.
            </p>
          </RevealText>

          <RevealText delay={240}>
            <span className="aside-note">Still figuring it out</span>
          </RevealText>
        </div>

        {/* Metadata columns */}
        <div className="lg:col-span-4 lg:col-start-9 space-y-8">
          <RevealText delay={200} className="space-y-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim border-b border-rule pb-3">Focus Areas</div>
            <ul className="space-y-3">
              {focusAreas.map((area, i) => (
                <li
                  key={area}
                  className="flex items-center gap-3 text-sm text-ink-soft hover:text-ink transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] text-ink-dim">0{i + 1}</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </RevealText>

          <RevealText delay={280} className="space-y-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim border-b border-rule pb-3">Education</div>
            <div className="text-[15px] font-medium text-ink leading-snug">
              Netaji Subhas University of Technology
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
