'use client';

import React from 'react';

const capabilities = [
  {
    title: "Product Design",
    items: ["Product Interfaces", "SaaS Dashboards", "Developer Tools UX", "AI Interaction Models", "Productivity Software"]
  },
  {
    title: "UI Design",
    items: ["Visual Hierarchy", "Typography & Layout", "Design Systems", "Component Libraries", "Responsive Systems"]
  },
  {
    title: "UX Design",
    items: ["User Flows", "Information Architecture", "Node Canvas Workflows", "State Visibility", "Usability Optimization"]
  },
  {
    title: "Data & Visualization",
    items: ["Real-Time Telemetry", "Geospatial Maps", "Data Visualization", "High-Density Views", "Filter & Search UX"]
  },
  {
    title: "Design + Development",
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Electron & Desktop UI", "Interactive Frontend Architecture"]
  }
];

export function Capabilities() {
  return (
    <section className="py-24 md:py-32 border-t border-[#18181b] section-container">
      <div className="max-w-3xl mb-12 md:mb-16 space-y-4">
        <div className="eyebrow">Core Competencies</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.025em]">
          UI/UX Capabilities
        </h2>
        <p className="text-[#a1a1aa] text-base leading-relaxed">
          A practice built around product craft — interaction models, visual systems, and the
          frontend code that ships them.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
        {capabilities.map((cap, index) => (
          <div key={index} className="space-y-4 lg:border-l lg:border-[#1a1a1e] lg:pl-6">
            <h3 className="text-[13px] font-mono text-white font-semibold uppercase tracking-[0.12em] pb-3 border-b border-[#18181b]">
              {cap.title}
            </h3>

            <ul className="space-y-2.5">
              {cap.items.map((item, i) => (
                <li
                  key={i}
                  className="group text-xs text-[#a1a1aa] font-normal flex items-center gap-2 transition-colors duration-200 hover:text-white"
                >
                  <span className="text-[#52525b] text-[10px] group-hover:text-emerald-400 transition-colors duration-200">↳</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
