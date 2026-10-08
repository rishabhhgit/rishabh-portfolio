"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { RevealText } from "@/components/ui/RevealText";

const featuredProjects = projects.filter((p) => p.featured);
const secondaryProjects = projects.filter((p) => !p.featured);

export function SelectedWork() {
  return (
    <section id="work" className="py-32 md:py-48 section-container">
      {/* Section header */}
      <div className="mb-20 md:mb-28 space-y-8">
        <RevealText>
          <div className="eyebrow">Selected Work</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-ink tracking-[-0.03em] leading-[1.1] max-w-[20ch]">
            Case studies in turning complexity into clarity.
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-[52ch]">
            AI editors, flight telemetry, workflow engines, productivity
            platforms — products where the interface <em>is</em> the hard part.
          </p>
        </RevealText>
      </div>

      {/* Featured projects — editorial stack with unique layouts */}
      <div className="space-y-40 md:space-y-56">
        {featuredProjects.map((project, index) => (
          <div key={project.id} id={`project-${project.id}`} className="scroll-mt-28">
            <ProjectShowcase project={project} index={index} />
          </div>
        ))}
      </div>

      {/* Secondary projects — asymmetric grid */}
      <div className="mt-40 md:mt-56 pt-20 border-t border-rule">
        <RevealText>
          <div className="mb-16 space-y-4">
            <div className="eyebrow">Additional Work</div>
            <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
              More product explorations
            </h3>
          </div>
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {secondaryProjects.map((project, i) => (
            <RevealText key={project.id} delay={i * 100} className="h-full">
              <Link
                href={`/work/${project.id}`}
                className="group flex h-full flex-col rounded-xl border border-rule bg-surface overflow-hidden hover:border-rule-strong transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-1 flex-col gap-3">
                  <div className="text-[10px] font-mono text-ink-dim uppercase tracking-[0.15em]">
                    {project.category}
                  </div>

                  <h4 className="text-xl font-bold text-ink group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h4>

                  <p className="text-xs text-ink-soft leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="pt-3 mt-auto border-t border-raised flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technology.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-ink-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
