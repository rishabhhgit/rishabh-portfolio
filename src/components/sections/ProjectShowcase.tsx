"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { RevealText } from "@/components/ui/RevealText";
import { useInView } from "@/hooks/useInView";

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  onOpenModal: () => void;
}

export function ProjectShowcase({
  project,
  index,
  onOpenModal,
}: ProjectShowcaseProps) {
  const [visualRef, visualInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
  });

  const isEven = index % 2 === 0;

  return (
    <article className="space-y-8">
      {/* Project number + category */}
      <RevealText>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#4a4a56]">
          <span
            className="text-[#c8a2ff] font-semibold text-sm"
            style={{ color: project.accent }}
          >
            0{index + 1}
          </span>
          <span className="w-8 h-[1px] bg-[#1a1a1f]" />
          <span>{project.category}</span>
        </div>
      </RevealText>

      {/* Visual — full-width immersive frame */}
      <div
        ref={visualRef}
        onClick={onOpenModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenModal();
          }
        }}
        aria-label={`Open ${project.title} case study`}
        className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#1a1a1f] bg-[#0c0c0f]"
        style={{
          transform: visualInView ? "scale(1)" : "scale(0.97)",
          opacity: visualInView ? 1 : 0,
          transition:
            "transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Browser-style header bar */}
        <div className="h-9 bg-[#0c0c0f] border-b border-[#1a1a1f] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/60" />
          </div>
          <div className="text-[10px] font-mono text-[#2a2a34] hidden sm:block">
            {project.id}.rishabhjain.design
          </div>
          <div className="w-16" />
        </div>

        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} interface preview`}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            priority={index === 0}
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* "View Case Study" overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="px-5 py-2.5 rounded-lg bg-[#f0f0f2]/95 text-[#060608] font-semibold text-sm backdrop-blur-sm">
              View Case Study →
            </span>
          </div>
        </div>
      </div>

      {/* Project info grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start ${
          isEven ? "" : "md:direction-rtl"
        }`}
      >
        {/* Main info */}
        <RevealText
          className={`${
            isEven ? "md:col-span-7" : "md:col-span-7 md:col-start-1"
          } space-y-4`}
        >
          <h3
            onClick={onOpenModal}
            className="text-3xl md:text-4xl font-bold text-[#f0f0f2] tracking-[-0.025em] hover:text-[#c8a2ff] transition-colors duration-300 cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="text-[15px] text-[#8a8a96] leading-[1.7] max-w-xl">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-1" aria-label="Technology stack">
            {project.technology.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>

          {/* AI tools used */}
          {project.aiTools && project.aiTools.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-mono text-[#4a4a56] uppercase tracking-[0.15em]">
                AI-Assisted
              </span>
              <div className="flex gap-1.5">
                {project.aiTools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#c8a2ff]/15 bg-[#c8a2ff]/5 text-[#c8a2ff]/80"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3">
            <button
              onClick={onOpenModal}
              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f0f0f2] text-[#060608] font-semibold text-xs hover:bg-[#c8a2ff] transition-all duration-300"
            >
              View Case Study
              <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                →
              </span>
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1a1a1f] text-[#8a8a96] font-medium text-xs hover:text-[#f0f0f2] hover:border-[#2a2a30] transition-all duration-300"
            >
              GitHub
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
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

        {/* Design decisions sidebar */}
        <RevealText
          delay={120}
          className={`${
            isEven
              ? "md:col-span-4 md:col-start-9"
              : "md:col-span-4 md:col-start-9"
          } space-y-5`}
        >
          <div
            className="h-[2px] w-8 rounded-full"
            style={{ backgroundColor: project.accent || "#c8a2ff" }}
          />

          <div className="space-y-1">
            <div
              className="text-[11px] font-mono uppercase tracking-[0.15em]"
              style={{ color: project.accent || "#c8a2ff" }}
            >
              Design Decisions
            </div>
            <p className="text-xs text-[#4a4a56] leading-relaxed">
              {project.designChallenge.split(".")[0]}.
            </p>
          </div>

          <ul className="space-y-3.5">
            {project.interfaceDecisions.slice(0, 3).map((decision, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[13px] text-[#8a8a96] leading-relaxed"
              >
                <span
                  className="font-mono text-xs mt-0.5 shrink-0"
                  style={{ color: project.accent || "#c8a2ff" }}
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
