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
    <section id="process" className="py-32 md:py-48 border-t border-[#E5E7EB] section-container">
      <div className="max-w-3xl mb-16 md:mb-24 space-y-8">
        <RevealText>
          <div className="eyebrow">Methodology</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-[-0.03em] leading-tight">
            Design Process
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-[#4B5563] text-base leading-relaxed">
            A repeatable path from ambiguity to a shipped interface.
          </p>
        </RevealText>
      </div>

      <RevealText delay={120}>
        <div className="relative">
          {/* Connecting line background */}
          <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[1px] bg-[#E5E7EB]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative flex flex-row lg:flex-col items-start gap-6 lg:gap-6 group"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Node */}
                <div className="relative shrink-0">
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FDFDFC] border border-[#E5E7EB] z-0" />
                  <div className={`relative z-10 w-3 h-3 rounded-full border border-[#9CA3AF] bg-[#FFFFFF] transition-all duration-300 lg:mx-auto mt-2 lg:mt-0 ${
                    activeStep === index ? 'border-[#2563EB] bg-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.6)] scale-125' : 'group-hover:border-[#2563EB]'
                  }`} />
                  {/* Mobile connecting line */}
                  {index !== steps.length - 1 && (
                    <div className="absolute top-6 left-1.5 bottom-[-32px] w-[1px] bg-[#E5E7EB] lg:hidden" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 lg:text-center">
                  <div className={`font-mono text-xs transition-colors duration-300 ${activeStep === index ? 'text-[#2563EB]' : 'text-[#9CA3AF] group-hover:text-[#4B5563]'}`}>
                    {step.number}
                  </div>
                  <h3 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${activeStep === index ? 'text-[#111827]' : 'text-[#4B5563] group-hover:text-[#111827]'}`}>
                    {step.name}
                  </h3>
                  
                  {/* Artifact reveal on hover */}
                  <div className={`overflow-hidden transition-all duration-300 ${activeStep === index ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0 lg:max-h-24 lg:opacity-100 lg:mt-3'}`}>
                    <div className="inline-block px-3 py-1.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] text-[10px] font-mono text-[#2563EB] uppercase tracking-widest">
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
