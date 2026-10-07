"use client";

import React from "react";
import { RevealText } from "@/components/ui/RevealText";

const featuredRepos = [
  { name: "GammaCode", url: "https://github.com/rishabhhgit/GammaCode" },
  { name: "AeroTrack", url: "https://github.com/rishabhhgit/AeroTrack" },
  { name: "Virtual-Workflow-Builder", url: "https://github.com/rishabhhgit/Virtual-Workflow-Builder" },
];

export function GitHubSection() {
  return (
    <section id="github" className="py-32 md:py-48 border-t border-[#E5E7EB] section-container">
      <div className="max-w-3xl space-y-10">
        <RevealText>
          <div className="eyebrow">Implementation</div>
        </RevealText>

        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-[-0.03em] leading-tight">
            Explore the systems behind the interfaces.
          </h2>
        </RevealText>

        <RevealText delay={160}>
          <p className="text-[#4B5563] text-lg leading-relaxed max-w-2xl">
            The interfaces presented here aren't just Figma prototypes. They are fully implemented systems built with modern frontend architectures.
          </p>
        </RevealText>

        <RevealText delay={240}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
            <a
              href="https://github.com/rishabhhgit"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#111827] text-[#FDFDFC] font-semibold text-sm hover:bg-[#2563EB] transition-all duration-300"
            >
              Visit GitHub
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 12 12"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 11L11 1M11 1H4M11 1v7" />
              </svg>
            </a>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-xs text-[#9CA3AF] font-mono">Featured Repositories:</span>
              {featuredRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#4B5563] hover:text-[#2563EB] hover:underline underline-offset-4 decoration-[#2563EB]/30 transition-all duration-300"
                >
                  {repo.name}
                </a>
              ))}
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
