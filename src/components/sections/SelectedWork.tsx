"use client";

import React, { useState } from "react";
import { projects, Project } from "@/data/projects";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { RevealText } from "@/components/ui/RevealText";
import Image from "next/image";

const featuredProjects = projects.filter((p) => p.featured);
const secondaryProjects = projects.filter((p) => !p.featured);

export function SelectedWork() {
  const [activeModalProject, setActiveModalProject] =
    useState<Project | null>(null);

  return (
    <section
      id="work"
      className="py-32 md:py-48 section-container"
    >
      {/* Section header */}
      <div className="mb-20 md:mb-28 space-y-8">
        <RevealText>
          <div className="eyebrow">Selected Work</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-[#111827] tracking-[-0.03em] leading-[1.1] max-w-[20ch]">
            Case studies in turning complexity into clarity.
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-[52ch]">
            AI editors, flight telemetry, workflow engines, productivity platforms — products where the interface <em>is</em> the hard part.
          </p>
        </RevealText>
      </div>

      {/* Featured projects — editorial stack with unique layouts */}
      <div className="space-y-40 md:space-y-56">
        {featuredProjects.map((project, index) => (
          <div key={project.id} id={`project-${project.id}`} className="scroll-mt-28">
            <ProjectShowcase
              project={project}
              index={index}
              onOpenModal={() => setActiveModalProject(project)}
            />
          </div>
        ))}
      </div>

      {/* Secondary projects — asymmetric grid */}
      <div className="mt-40 md:mt-56 pt-20 border-t border-[#E5E7EB]">
        <RevealText>
          <div className="mb-16 space-y-4">
            <div className="eyebrow">Additional Work</div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">
              More product explorations
            </h3>
          </div>
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {secondaryProjects.map((project, i) => (
            <RevealText key={project.id} delay={i * 100} className="h-full">
              <button
                type="button"
                onClick={() => setActiveModalProject(project)}
                className="group w-full h-full text-left rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] overflow-hidden hover:border-[#D1D5DB] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col gap-3">
                  <div className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-[0.15em]">
                    {project.category}
                  </div>

                  <h4 className="text-xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors duration-300">
                    {project.title}
                  </h4>

                  <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="pt-3 mt-auto border-t border-[#F3F4F6] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technology.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-[#9CA3AF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-[#2563EB] opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
                      View →
                    </span>
                  </div>
                </div>
              </button>
            </RevealText>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
