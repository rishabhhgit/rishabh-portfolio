'use client';

import React from 'react';
import { RevealText } from '@/components/ui/RevealText';
import { Button } from '@/components/ui/Button';

const featuredRepos = [
  { name: 'GammaCode', url: 'https://github.com/rishabhhgit/GammaCode' },
  { name: 'AeroTrack', url: 'https://github.com/rishabhhgit/AeroTrack' },
  { name: 'Virtual-Workflow-Builder', url: 'https://github.com/rishabhhgit/Virtual-Workflow-Builder' },
];

export function GitHubSection() {
  return (
    <section id="github" className="py-24 md:py-32 border-t border-[#18181b] section-container">
      <div className="max-w-3xl space-y-6">
        <RevealText>
          <div className="eyebrow">Open Source</div>
        </RevealText>

        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.025em] leading-[1.1]">
            Explore the work behind the interfaces.
          </h2>
        </RevealText>

        <RevealText delay={160}>
          <p className="text-[#a1a1aa] text-base leading-relaxed max-w-xl">
            Source for the featured case studies — designed, prototyped and built end to end.
          </p>
        </RevealText>

        <RevealText delay={240}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
            <Button
              variant="secondary"
              size="md"
              href="https://github.com/rishabhhgit"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub ↗
            </Button>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {featuredRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#71717a] hover:text-emerald-400 transition-colors duration-300"
                >
                  {repo.name} ↗
                </a>
              ))}
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}
