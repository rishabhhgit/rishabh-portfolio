"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  const accentColor = project.accent || "#c8a2ff";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto bg-[#060608]/90 backdrop-blur-xl animate-modal-backdrop"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative w-full max-w-5xl bg-[#0c0c0f] border border-[#1a1a1f] rounded-2xl shadow-2xl animate-modal-content my-8 md:my-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-[#111114] border border-[#1a1a1f] flex items-center justify-center text-[#8a8a96] hover:text-[#f0f0f2] hover:border-[#2a2a30] transition-all duration-200"
          aria-label="Close case study"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="rounded-t-2xl overflow-hidden border-b border-[#1a1a1f]">
          {/* Browser bar */}
          <div className="h-9 bg-[#111114] px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/60" />
            </div>
            <div className="text-[10px] font-mono text-[#2a2a34]">
              case-study://{project.id}
            </div>
            <div className="w-12" />
          </div>
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider"
              style={{
                backgroundColor: `${accentColor}08`,
                border: `1px solid ${accentColor}25`,
                color: accentColor,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              {project.category}
            </div>

            <h2
              id="case-study-title"
              className="text-3xl md:text-5xl font-bold text-[#f0f0f2] tracking-[-0.03em] leading-tight"
            >
              {project.title}
            </h2>

            <p className="text-lg text-[#8a8a96] font-normal max-w-2xl">
              {project.subtitle}
            </p>
          </div>

          {/* Case study sections */}
          <div className="space-y-10 text-sm md:text-base">
            {/* 01 — Overview */}
            <CaseStudySection number="01" title="Overview">
              <p className="text-[#8a8a96] leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technology.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              {project.aiTools && project.aiTools.length > 0 && (
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-[10px] font-mono text-[#4a4a56] uppercase tracking-wider">
                    AI-Assisted Development
                  </span>
                  <div className="flex gap-1.5">
                    {project.aiTools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border text-[#c8a2ff]/70"
                        style={{
                          borderColor: `${accentColor}20`,
                          backgroundColor: `${accentColor}08`,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CaseStudySection>

            {/* 02 — The Challenge */}
            <CaseStudySection number="02" title="The Challenge">
              <p className="text-[#8a8a96] leading-relaxed">
                {project.designChallenge}
              </p>
            </CaseStudySection>

            {/* 03 — Design Approach */}
            <CaseStudySection number="03" title="Design Approach">
              <p className="text-[#8a8a96] leading-relaxed">
                {project.designApproach}
              </p>
            </CaseStudySection>

            {/* 04 — Information Architecture */}
            {project.informationArchitecture &&
              project.informationArchitecture.length > 0 && (
                <CaseStudySection number="04" title="Information Architecture">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.informationArchitecture.map((flow, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#111114] border border-[#1a1a1f] font-mono text-xs text-[#8a8a96] leading-relaxed"
                      >
                        <span
                          className="text-[10px] mr-2"
                          style={{ color: accentColor }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {flow}
                      </div>
                    ))}
                  </div>
                </CaseStudySection>
              )}

            {/* 05 — Interface Decisions */}
            <CaseStudySection number="05" title="Key Interface Decisions">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.interfaceDecisions.map((decision, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg bg-[#111114]/60 border border-[#1a1a1f]/60 text-[#8a8a96]"
                  >
                    <span
                      className="text-xs font-mono mt-0.5 shrink-0"
                      style={{ color: accentColor }}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed">{decision}</span>
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            {/* 06 — Interaction */}
            <CaseStudySection number="06" title="Interaction & System Behavior">
              <ul className="space-y-3">
                {project.interactionDetails.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#8a8a96]"
                  >
                    <span className="text-[#4a4a56] mt-1 text-xs">↳</span>
                    <span className="text-sm leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            {/* 07 — Design Rationale */}
            {project.designRationale &&
              project.designRationale.length > 0 && (
                <CaseStudySection number="07" title="Design Rationale">
                  <div className="space-y-4">
                    {project.designRationale.map((rationale, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 text-sm text-[#8a8a96] leading-relaxed"
                      >
                        <div
                          className="w-5 h-[1px] mt-3 shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        <p>{rationale}</p>
                      </div>
                    ))}
                  </div>
                </CaseStudySection>
              )}

            {/* CTA */}
            <div className="pt-6 border-t border-[#1a1a1f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-[#4a4a56] font-mono">
                Explore the implementation →
              </p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#f0f0f2] text-[#060608] font-semibold text-sm hover:bg-[#c8a2ff] transition-all duration-300"
              >
                View on GitHub
                <svg
                  className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 11L11 1M11 1H4M11 1v7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 pt-6 border-t border-[#1a1a1f]/60">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-[#4a4a56]">{number}</span>
        <h3 className="text-xs uppercase tracking-[0.15em] font-mono text-[#4a4a56]">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
