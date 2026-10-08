"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { RevealText } from "@/components/ui/RevealText";

interface ProjectShowcaseProps {
  project: Project;
  index: number;
}

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const href = `/work/${project.id}`;

  return (
    <article className="space-y-16">
      {/* Project number + category */}
      <RevealText>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-dim">
          <span
            className="font-semibold text-sm"
            style={{ color: project.accent || undefined }}
          >
            0{index + 1}
          </span>
          <span className="w-8 h-[1px] bg-raised" />
          <span>{project.category}</span>
        </div>
      </RevealText>

      {/* Visual — full-width editorial frame */}
      <Link
        href={href}
        aria-label={`Open ${project.title} case study`}
        className="group relative block rounded-xl overflow-hidden border border-rule bg-surface"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} interface preview`}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
            priority={index === 0}
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/85 via-canvas/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* "View case study" overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="px-6 py-3 rounded-full bg-ink/95 text-canvas font-semibold text-sm shadow-2xl transition-transform duration-300 group-hover:scale-105">
              View case study
            </span>
          </div>
        </div>
      </Link>

      {/* Project info grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start pt-6">
        {/* Main info */}
        <RevealText className="md:col-span-7 space-y-8">
          <h3 className="text-3xl md:text-5xl font-bold text-ink tracking-[-0.03em]">
            <Link href={href} className="hover:text-accent transition-colors duration-300">
              {project.title}
            </Link>
          </h3>

          <p className="text-base sm:text-lg text-ink-soft leading-[1.7] max-w-xl">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 pt-2" aria-label="Technology stack">
            {project.technology.map((tech) => (
              <span
                key={tech}
                className="tech-tag px-2 py-1 rounded-md bg-raised border border-rule text-ink-soft font-mono text-[11px] uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* AI tools used */}
          {project.aiTools && project.aiTools.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-mono text-ink-dim uppercase tracking-[0.15em]">
                AI-Assisted
              </span>
              <div className="flex flex-wrap gap-2">
                {project.aiTools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-2 py-1 rounded border border-accent/15 bg-accent/5 text-accent/90 tracking-wide"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6">
            <Link
              href={href}
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ink text-canvas font-semibold text-sm hover:bg-accent transition-all duration-300"
            >
              View case study
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                →
              </span>
            </Link>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-rule text-ink-soft font-medium text-sm hover:text-ink hover:border-rule-strong transition-all duration-300"
            >
              GitHub
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                fill="none"
                viewBox="0 0 12 12"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 11L11 1M11 1H4M11 1v7" />
              </svg>
            </a>
          </div>
        </RevealText>

        <RevealText delay={150} className="md:col-span-4 md:col-start-9 space-y-8 pt-2">
          <div
            className="h-[2px] w-12 rounded-full"
            style={{ backgroundColor: project.accent || "#7b8cff" }}
          />

          <div className="space-y-2">
            <div
              className="text-[11px] font-mono uppercase tracking-[0.2em]"
              style={{ color: project.accent || "#7b8cff" }}
            >
              Design Decisions
            </div>
            <p className="text-[13px] text-ink-dim leading-relaxed">
              {project.designChallenge.split(".")[0]}.
            </p>
          </div>

          <ul className="space-y-4 pt-2 border-t border-rule">
            {project.interfaceDecisions.slice(0, 3).map((decision, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-sm text-ink-soft leading-relaxed"
              >
                <span
                  className="font-mono text-xs mt-1 shrink-0 opacity-70"
                  style={{ color: project.accent || "#7b8cff" }}
                >
                  0{i + 1}
                </span>
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </RevealText>
      </div>
    </article>
  );
}
