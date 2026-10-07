'use client';

import React from 'react';
import { RevealText } from '@/components/ui/RevealText';

const principles = [
  {
    number: "01",
    title: "Clarity over complexity",
    description: "Complex software doesn't need to be overwhelming. Strict typographic hierarchy and disciplined whitespace transform dense telemetry and multi-panel tools into immediate visual clarity."
  },
  {
    number: "02",
    title: "Design with systems",
    description: "Components, spacing, and typography derive from a single source of truth — so interfaces scale gracefully instead of fracturing into one-off screens."
  },
  {
    number: "03",
    title: "Data should be understandable",
    description: "Dashboards, maps, and real-time feeds should answer questions at a glance. Hierarchy and color encode meaning — never decoration."
  },
  {
    number: "04",
    title: "Motion with purpose",
    description: "Animation explains causality: what opened, what changed, where attention belongs. If a transition doesn't clarify, it's removed."
  },
  {
    number: "05",
    title: "Design meets engineering",
    description: "Understanding React render cycles, CSS grid constraints, DOM state management, and browser performance keeps design decisions technically realistic and performant."
  }
];

export function DesignPhilosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 border-t border-[#18181b] section-container">
      <div className="max-w-3xl mb-12 md:mb-16 space-y-4">
        <RevealText>
          <div className="eyebrow">Design Principles</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.025em]">
            Design Philosophy
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-[#a1a1aa] text-base leading-relaxed">
            Five principles that hold across every product I work on.
          </p>
        </RevealText>
      </div>

      <div className="border-t border-[#18181b]">
        {principles.map((item, index) => (
          <RevealText key={item.number} delay={index * 70}>
            <div className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7 md:py-9 border-b border-[#18181b] transition-colors duration-300 hover:border-[#27272a]">
              <div className="md:col-span-1 font-mono text-sm text-[#52525b] group-hover:text-emerald-400 transition-colors duration-300">
                {item.number}
              </div>
              <h3 className="md:col-span-4 text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="md:col-span-7 text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          </RevealText>
        ))}
      </div>
    </section>
  );
}
