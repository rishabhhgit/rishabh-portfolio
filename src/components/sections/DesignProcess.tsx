"use client";

import React, { useState } from "react";
import { RevealText } from "@/components/ui/RevealText";

const steps = [
  {
    number: "01",
    name: "Understand",
    desc: "Frame the problem — who it is for, the constraints, and what success looks like.",
    artifact: "Problem framing",
  },
  {
    number: "02",
    name: "Structure",
    desc: "Define information architecture and the flows that carry the core jobs.",
    artifact: "User flow",
  },
  {
    number: "03",
    name: "Explore",
    desc: "Sketch layouts, interactions, and visual directions before committing.",
    artifact: "Wireframes",
  },
  {
    number: "04",
    name: "Design",
    desc: "Build high-fidelity interfaces on a reusable component foundation.",
    artifact: "High fidelity",
  },
  {
    number: "05",
    name: "Prototype",
    desc: "Move the risky interactions into a prototype and test the edge cases.",
    artifact: "Interactions",
  },
  {
    number: "06",
    name: "Build",
    desc: "Ship it as production UI — accessible, responsive, and performant.",
    artifact: "Production UI",
  },
];

export function DesignProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="py-32 md:py-48 border-t border-rule section-container"
    >
      <div className="max-w-3xl mb-16 md:mb-24 space-y-8">
        <RevealText>
          <div className="eyebrow">Methodology</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-[-0.03em] leading-tight">
            Design Process
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-ink-soft text-base leading-relaxed">
            A repeatable path from ambiguity to a shipped interface.
          </p>
        </RevealText>
      </div>

      <RevealText delay={120}>
        <div className="relative">
          {/* Connecting rail — desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[7px] left-0 w-full h-[1px] bg-raised"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[7px] left-0 h-[1px] bg-accent transition-all duration-700 ease-out"
            style={{
              width: activeStep === null ? "0%" : `${((activeStep + 1) / 6) * 100}%`,
              opacity: activeStep === null ? 0 : 0.55,
            }}
          />

          <ol className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-5 relative z-10">
            {steps.map((step, index) => {
              const on = activeStep === index;
              return (
                <li
                  key={step.number}
                  className="group relative flex flex-row lg:flex-col items-start gap-5 lg:gap-0 lg:text-center"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  onFocus={() => setActiveStep(index)}
                  onBlur={() => setActiveStep(null)}
                >
                  {/* Mobile connector */}
                  {index !== steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="lg:hidden absolute left-[5px] top-4 bottom-[-32px] w-[1px] bg-raised"
                    />
                  )}

                  <div className="relative shrink-0 lg:w-full lg:flex lg:justify-center">
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute left-1/2 top-[7px] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-canvas border border-rule z-0 transition-colors duration-300"
                      style={{ borderColor: on ? "rgba(168,127,22,0.4)" : undefined }}
                    />
                    <span
                      aria-hidden="true"
                      className={`relative z-10 mt-1.5 lg:mt-0 block w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                        on
                          ? "border-accent bg-accent scale-125"
                          : "border-ink-dim bg-surface group-hover:border-accent"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 lg:w-full space-y-2.5">
                    <div
                      className={`font-mono text-[11px] tabular-nums transition-colors duration-300 ${
                        on ? "text-accent" : "text-ink-dim group-hover:text-ink-soft"
                      }`}
                    >
                      {step.number}
                    </div>

                    <h3
                      className={`text-[17px] font-bold tracking-tight transition-colors duration-300 ${
                        on ? "text-ink" : "text-ink group-hover:text-accent"
                      }`}
                    >
                      {step.name}
                    </h3>

                    <p className="text-[12.5px] leading-[1.6] text-ink-dim max-w-[26ch] lg:max-w-none">
                      {step.desc}
                    </p>

                    {/* Artifact — revealed on hover/focus on desktop, always shown below */}
                    <div className="pt-1">
                      <span
                        className={`inline-block px-2.5 py-1 rounded border border-rule bg-raised font-mono text-[9.5px] uppercase tracking-[0.16em] transition-all duration-300 motion-reduce:opacity-100 lg:opacity-0 lg:translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-focus-within:opacity-100 lg:group-focus-within:translate-y-0 ${
                          on ? "text-accent border-accent/30" : "text-ink-soft"
                        }`}
                      >
                        {step.artifact}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </RevealText>
    </section>
  );
}
