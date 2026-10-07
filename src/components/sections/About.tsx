'use client';

import React from 'react';
import { RevealText } from '@/components/ui/RevealText';

const focusAreas = [
  'AI products & copilots',
  'Developer tools',
  'Real-time data visualization',
  'Geospatial interfaces',
  'Design systems & workflows',
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-[#18181b] section-container">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
        {/* Statement */}
        <div className="md:col-span-7 space-y-6">
          <RevealText>
            <div className="eyebrow">About</div>
          </RevealText>

          <RevealText delay={80}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white leading-snug tracking-tight">
              Rishabh Jain is a UI/UX and product designer who builds what he designs — shaping
              complex, data-heavy software into interfaces that feel calm, precise and considered.
            </h2>
          </RevealText>

          <RevealText delay={160}>
            <p className="text-[#a1a1aa] text-base leading-relaxed max-w-xl">
              The work sits where product thinking meets engineering: AI-assisted tools, developer
              environments, real-time dashboards, geospatial views and workflow systems — products
              where clarity is the hard part.
            </p>
          </RevealText>
        </div>

        {/* Meta column */}
        <div className="md:col-span-4 md:col-start-9 space-y-8">
          <RevealText delay={240} className="space-y-4">
            <div className="eyebrow">Focus</div>
            <ul className="border-t border-[#18181b]">
              {focusAreas.map((area, i) => (
                <li
                  key={area}
                  className="flex items-center justify-between gap-4 py-2.5 border-b border-[#141417] text-sm text-[#a1a1aa] hover:text-white transition-colors duration-200"
                >
                  <span>{area}</span>
                  <span className="font-mono text-[10px] text-[#3f3f46]">
                    0{i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </RevealText>

          <RevealText delay={320} className="pt-2 space-y-2">
            <div className="eyebrow">Education</div>
            <div className="text-base font-medium text-white leading-snug">
              Netaji Subhas University of Technology
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
