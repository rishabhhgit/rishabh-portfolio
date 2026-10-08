"use client";

import React from "react";
import { RevealText } from "@/components/ui/RevealText";

const principles = [
  {
    number: "01",
    title: "Make complexity feel simple.",
    description:
      "Typographic hierarchy and disciplined whitespace turn dense, multi-panel tools into something readable at a glance.",
  },
  {
    number: "02",
    title: "Design the system, not the screen.",
    description:
      "Type, colour, and components derive from one source of truth, so interfaces scale instead of fracturing into one-offs.",
  },
  {
    number: "03",
    title: "Let data carry the meaning.",
    description:
      "Dashboards and real-time feeds answer questions instantly — hierarchy and colour encode state, never decoration.",
  },
  {
    number: "04",
    title: "Build what you design.",
    description:
      "Shipping to production — React, Node, and the APIs between them — keeps every design decision technically realistic. LLMs clear the boilerplate; the judgment stays mine.",
  },
];

const steps = [
  { number: "01", name: "Understand", desc: "Frame the problem and success criteria." },
  { number: "02", name: "Structure", desc: "Information architecture and core flows." },
  { number: "03", name: "Explore", desc: "Wireframes and visual directions." },
  { number: "04", name: "Design", desc: "High-fidelity UI on a component foundation." },
  { number: "05", name: "Prototype", desc: "Test the risky interactions." },
  { number: "06", name: "Ship", desc: "Accessible, responsive, performant." },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="py-20 md:py-28 border-t border-rule section-container"
    >
      <div className="max-w-3xl mb-9 md:mb-12 space-y-4">
        <RevealText>
          <div className="eyebrow">
            <span className="text-accent">03</span>
            <span className="mx-2 text-rule-strong">—</span>
            Approach
          </div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-[-0.03em] leading-tight">
            How I design complex interfaces.
          </h2>
        </RevealText>
      </div>

      {/* Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 border-t border-rule pt-7">
        {principles.map((item, index) => (
          <RevealText key={item.number} delay={index * 70}>
            <div className="group">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tabular-nums text-ink-dim transition-colors duration-300 group-hover:text-accent">
                  {item.number}
                </span>
                <h3 className="text-lg font-bold text-ink tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {item.title}
                </h3>
              </div>
              <p className="mt-1.5 text-[14.5px] leading-[1.65] text-ink-soft max-w-[46ch] sm:pl-[calc(11px+0.75rem+0.5ch)]">
                {item.description}
              </p>
            </div>
          </RevealText>
        ))}
      </div>

      {/* Process */}
      <div className="mt-9 md:mt-12 border-t border-rule pt-7">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
          Process
        </div>
        <ol className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-7">
          {steps.map((step) => (
            <li key={step.number} className="border-t border-rule-soft pt-3">
              <div className="font-mono text-[10px] tabular-nums text-accent">
                {step.number}
              </div>
              <h3 className="mt-1.5 text-[15px] font-bold text-ink tracking-tight">
                {step.name}
              </h3>
              <p className="mt-1 text-[12.5px] leading-[1.55] text-ink-dim">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
