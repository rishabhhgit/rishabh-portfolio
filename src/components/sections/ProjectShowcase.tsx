"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { RevealText } from "@/components/ui/RevealText";

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
  const isEven = index % 2 === 0;

  return (
    <article className="space-y-16">
      {/* Project number + category */}
      <RevealText>
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF]">
          <span
            className="text-[#2563EB] font-semibold text-sm"
            style={{ color: project.accent }}
          >
            0{index + 1}
          </span>
          <span className="w-8 h-[1px] bg-[#E5E7EB]" />
          <span>{project.category}</span>
        </div>
      </RevealText>

      {/* Visual — full-width immersive frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
        className="group relative rounded-2xl overflow-hidden cursor-pointer border border-[#E5E7EB] bg-[#FFFFFF]"
      >
        {/* Browser-style header bar */}
        <div className="h-9 bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/60" />
          </div>
          <div className="text-[10px] font-mono text-[#D1D5DB] hidden sm:block">
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
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
            priority={index === 0}
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFC]/80 via-[#FDFDFC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* "View Case Study" overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <motion.span 
              initial={{ y: 20 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-full bg-[#111827]/95 text-[#FDFDFC] font-bold text-sm backdrop-blur-md shadow-2xl transition-transform duration-300"
            >
              View Case Study →
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Project info grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start pt-6 ${
          isEven ? "" : "md:direction-rtl"
        }`}
      >
        {/* Main info */}
        <RevealText
          className={`${
            isEven ? "md:col-span-7" : "md:col-span-7 md:col-start-1"
          } space-y-8`}
        >
          <h3
            onClick={onOpenModal}
            className="text-3xl md:text-5xl font-bold text-[#111827] tracking-[-0.03em] hover:text-[#2563EB] transition-colors duration-300 cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="text-base sm:text-lg text-[#4B5563] leading-[1.7] max-w-xl">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 pt-2" aria-label="Technology stack">
            {project.technology.map((tech) => (
              <span key={tech} className="tech-tag px-2 py-1 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563] font-mono text-[11px] uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </div>

          {/* AI tools used */}
          {project.aiTools && project.aiTools.length > 0 && (
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-[0.15em]">
                AI-Assisted
              </span>
              <div className="flex flex-wrap gap-2">
                {project.aiTools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-2 py-1 rounded border border-[#2563EB]/15 bg-[#2563EB]/5 text-[#2563EB]/90 tracking-wide"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6">
            <button
              onClick={onOpenModal}
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#111827] text-[#FDFDFC] font-semibold text-sm hover:bg-[#2563EB] transition-all duration-300"
            >
              View Case Study
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                →
              </span>
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E5E7EB] text-[#4B5563] font-medium text-sm hover:text-[#111827] hover:border-[#D1D5DB] transition-all duration-300"
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

        <RevealText
          delay={150}
          className={`${
            isEven
              ? "md:col-span-4 md:col-start-9"
              : "md:col-span-4 md:col-start-9"
          } space-y-8 pt-2`}
        >
          <div
            className="h-[2px] w-12 rounded-full"
            style={{ backgroundColor: project.accent || "#2563EB" }}
          />

          <div className="space-y-2">
            <div
              className="text-[11px] font-mono uppercase tracking-[0.2em]"
              style={{ color: project.accent || "#2563EB" }}
            >
              Design Decisions
            </div>
            <p className="text-[13px] text-[#9CA3AF] leading-relaxed">
              {project.designChallenge.split(".")[0]}.
            </p>
          </div>

          <ul className="space-y-4 pt-2 border-t border-[#E5E7EB]">
            {project.interfaceDecisions.slice(0, 3).map((decision, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-sm text-[#4B5563] leading-relaxed group-hover:text-[#111827] transition-colors duration-300"
              >
                <span
                  className="font-mono text-xs mt-1 shrink-0 opacity-70"
                  style={{ color: project.accent || "#2563EB" }}
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
