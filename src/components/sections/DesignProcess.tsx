"use client";

import React, { useState } from "react";
import { RevealText } from "@/components/ui/RevealText";

const steps = [
  { number: "01", name: "Understand", desc: "Frame the problem — users, constraints, and what success looks like.", artifact: "Problem framing" },
  { number: "02", name: "Structure", desc: "Define information architecture and core user flows.", artifact: "User flow" },
  { number: "03", name: "Explore", desc: "Explore layouts, interactions, and visual directions.", artifact: "Wireframes" },
  { number: "04", name: "Design", desc: "Build high-fidelity interfaces and reusable components.", artifact: "High fidelity" },
  { number: "05", name: "Prototype", desc: "Validate interactions and edge-case behavior.", artifact: "Interactions" },
  { number: "06", name: "Build", desc: "Ship performant, production-ready interfaces.", artifact: "Production UI" }
];

export function DesignProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="process" className="py-32 md:py-48 border-t border-rule section-container">
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
          {/* Connecting line background */}
          <div className="hidden lg:block absolute top-[6px] left-0 w-full h-[1px] bg-raised" />
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative flex flex-row lg:flex-col items-start gap-6 lg:gap-6 group"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {index !== steps.length - 1 && (
                  <div className="block lg:hidden absolute left-1.5 top-[14px] bottom-[-46px] w-[1px] bg-raised" />
                )}

                <div className="relative shrink-0 lg:self-center">
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-canvas border border-rule z-0" />
                  <div className={`relative z-10 w-3 h-3 rounded-full border border-ink-dim bg-surface transition-all duration-300 lg:mx-auto mt-2 lg:mt-0 ${
                    activeStep === index ? 'border-accent bg-accent shadow-[0_0_16px_rgba(168,127,22,0.45)] scale-125' : 'group-hover:border-accent'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 lg:w-full lg:text-center">
                  <div className={`font-mono text-xs transition-colors duration-300 ${activeStep === index ? 'text-accent' : 'text-ink-dim group-hover:text-ink-soft'}`}>
                    {step.number}
                  </div>
                  <h3 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${activeStep === index ? 'text-ink' : 'text-ink-soft group-hover:text-ink'}`}>
                    {step.name}
                  </h3>
                  
                  <div className="overflow-hidden max-h-24 opacity-100 mt-3">
                    <div className="inline-block px-3 py-1.5 rounded bg-raised border border-rule text-[10px] font-mono text-accent uppercase tracking-widest">
                      {step.artifact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealText>
    </section>
  );
}
