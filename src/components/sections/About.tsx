"use client";

import React from "react";
import { RevealText } from "@/components/ui/RevealText";

const focusAreas = [
  "AI products & copilots",
  "Developer tools & IDEs",
  "Real-time data visualization",
  "Geospatial interfaces",
  "Workflow automation",
];

export function About() {
  return (
    <section id="about" className="py-32 md:py-48 border-t border-[#E5E7EB] section-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Main statement */}
        <div className="lg:col-span-7 space-y-12">
          <RevealText>
            <div className="eyebrow">About</div>
          </RevealText>

          <RevealText delay={80}>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] tracking-[-0.03em] leading-[1.15]">
              I'm Rishabh — a UI/UX-focused designer and developer interested in turning complex technical systems into clear, intuitive digital experiences.
            </h2>
          </RevealText>

          <RevealText delay={160}>
            <p className="text-[#4B5563] text-lg leading-[1.7] max-w-2xl">
              I operate at the intersection of product thinking and engineering. My work focuses on environments where clarity is difficult to achieve — AI-assisted tools, dense real-time dashboards, and multi-layered geospatial views.
            </p>
          </RevealText>
        </div>

        {/* Metadata columns */}
        <div className="lg:col-span-4 lg:col-start-9 space-y-12">
          <RevealText delay={200} className="space-y-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] border-b border-[#E5E7EB] pb-3">Focus Areas</div>
            <ul className="space-y-3">
              {focusAreas.map((area, i) => (
                <li
                  key={area}
                  className="flex items-center gap-3 text-sm text-[#4B5563] hover:text-[#111827] transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] text-[#9CA3AF]">0{i + 1}</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </RevealText>

          <RevealText delay={280} className="space-y-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] border-b border-[#E5E7EB] pb-3">Education</div>
            <div className="text-[15px] font-medium text-[#111827] leading-snug">
              Netaji Subhas University of Technology
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
