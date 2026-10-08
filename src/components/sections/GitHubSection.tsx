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
    <section id="github" className="py-32 md:py-48 border-t border-rule section-container">
      <div className="max-w-3xl space-y-10">
        <RevealText>
          <div className="eyebrow">Implementation</div>
        </RevealText>

        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-[-0.03em] leading-tight">
            Designed, built, and shipped.
          </h2>
        </RevealText>

        <RevealText delay={160}>
          <p className="text-ink-soft text-lg leading-relaxed max-w-2xl">
            Not Figma mocks — production systems. UI, backend, and AI integration in one codebase.
          </p>
        </RevealText>

        <RevealText delay={240}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
            <a
              href="https://github.com/rishabhhgit"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-ink text-canvas font-semibold text-sm hover:bg-accent transition-all duration-300"
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
              <span className="text-xs text-ink-dim font-mono">Featured Repositories:</span>
              {featuredRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-ink-soft hover:text-accent hover:underline underline-offset-4 decoration-accent/30 transition-all duration-300"
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
