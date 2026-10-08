"use client";

import React from "react";
import { RevealText } from "@/components/ui/RevealText";

const principles = [
  {
    number: "01",
    title: "Make complexity feel simple.",
    description: "Complex software doesn't need to be overwhelming. Strict typographic hierarchy and disciplined whitespace transform dense telemetry and multi-panel tools into immediate visual clarity."
  },
  {
    number: "02",
    title: "Design the system, not just the screen.",
    description: "Components, spacing, and typography derive from a single source of truth — so interfaces scale gracefully instead of fracturing into one-off screens."
  },
  {
    number: "03",
    title: "Use data to improve decisions.",
    description: "Dashboards, maps, and real-time feeds should answer questions at a glance. Hierarchy and color encode meaning — never decoration."
  },
  {
    number: "04",
    title: "Build what you design.",
    description: "Understanding React render cycles, CSS grid constraints, DOM state management, and browser performance keeps design decisions technically realistic and performant."
  }
];

export function HowIThink() {
  return (
    <section id="thinking" className="py-32 md:py-48 border-t border-rule section-container">
      <div className="max-w-3xl mb-16 md:mb-24 space-y-8">
        <RevealText>
          <div className="eyebrow">Product Thinking</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-[-0.03em] leading-tight max-w-[20ch]">
            How I approach complex interfaces.
          </h2>
        </RevealText>
      </div>

      <div className="border-t border-rule">
        {principles.map((item, index) => (
          <RevealText key={item.number} delay={index * 70}>
            <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b border-rule transition-colors duration-500 hover:bg-surface">
              <div className="md:col-span-1 font-mono text-sm text-ink-dim group-hover:text-accent transition-colors duration-300 md:pl-4">
                {item.number}
              </div>
              <h3 className="md:col-span-4 text-xl md:text-2xl font-bold text-ink tracking-tight group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="md:col-span-7 text-[15px] text-ink-soft leading-[1.7] max-w-2xl md:pr-4">
                {item.description}
              </p>
            </div>
          </RevealText>
        ))}
      </div>
    </section>
  );
}
