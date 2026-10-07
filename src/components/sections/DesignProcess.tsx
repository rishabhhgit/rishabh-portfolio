'use client';

import React from 'react';
import { RevealText } from '@/components/ui/RevealText';

const steps = [
  { number: "01", name: "Understand", desc: "Frame the problem — users, constraints, and what success looks like.", artifact: "Problem framing" },
  { number: "02", name: "Structure", desc: "Define information architecture and core user flows.", artifact: "User flow" },
  { number: "03", name: "Explore", desc: "Explore layouts, interactions, and visual directions.", artifact: "Wireframes" },
  { number: "04", name: "Design", desc: "Build high-fidelity interfaces and reusable components.", artifact: "High fidelity" },
  { number: "05", name: "Prototype", desc: "Validate interactions and edge-case behavior.", artifact: "Interactions" },
  { number: "06", name: "Build", desc: "Ship performant, production-ready interfaces.", artifact: "Production UI" }
];

export function DesignProcess() {
  return (
    <section id="process" className="py-24 md:py-32 border-t border-[#18181b] section-container">
      <div className="max-w-3xl mb-12 md:mb-16 space-y-4">
        <RevealText>
          <div className="eyebrow">Methodology</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.025em]">
            Design Process
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-[#a1a1aa] text-base leading-relaxed">
            A repeatable path from ambiguity to a shipped interface.
          </p>
        </RevealText>
      </div>

      <RevealText delay={120}>
        <ol className="relative space-y-8 lg:space-y-0 lg:grid lg:grid-cols-6 lg:gap-6">
          {/* Vertical connector (mobile / tablet) */}
          <div
            aria-hidden="true"
            className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[#27272a] via-[#1e1e22] to-transparent lg:hidden"
          />
          {/* Horizontal connector (desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-0 right-0 top-[5px] h-px bg-gradient-to-r from-[#27272a] via-[#1e1e22] to-transparent"
          />

          {steps.map((step, index) => (
            <li
              key={step.number}
              className="group relative pl-10 lg:pl-0 lg:pt-8"
              style={{ '--step-index': index } as React.CSSProperties}
            >
              {/* Step dot */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 lg:top-0 w-[11px] h-[11px] rounded-full border border-[#3f3f46] bg-[#0f0f11] transition-all duration-300 group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              />

              <div className="flex items-baseline gap-3 lg:block">
                <span className="font-mono text-xs text-emerald-400">{step.number}</span>
                <h3 className="text-lg font-bold text-white tracking-tight lg:mt-2 lg:mb-2">
                  {step.name}
                </h3>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed max-w-[26ch]">
                {step.desc}
              </p>
              <p className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-[#52525b] border border-[#1e1e22] bg-[#0f0f11] rounded px-2 py-0.5 transition-colors duration-300 group-hover:text-emerald-400 group-hover:border-emerald-500/40">
                {step.artifact}
              </p>
            </li>
          ))}
        </ol>
      </RevealText>
    </section>
  );
}
