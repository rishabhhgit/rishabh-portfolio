"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { RevealText } from "@/components/ui/RevealText";

const project = projects.find((p) => p.id === "gamma-code") ?? projects[0];

/**
 * Full-bleed set piece — a poster for the flagship case study, breaking the
 * cream rhythm with an espresso band before the page returns to paper.
 */
export function Spotlight() {
  return (
    <section
      id="best"
      className="relative bg-ink text-canvas overflow-hidden border-y border-ink"
    >
      {/* Faint gold rule grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,162,39,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,162,39,0.22) 1px, transparent 1px)",
          backgroundSize: "112px 112px",
        }}
      />

      {/* Soft gold wash */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[720px] h-[440px] rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.22),transparent)] pointer-events-none"
      />

      <div className="section-container relative pt-14 md:pt-20">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/30 pb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em]">
          <span className="text-gold-bright">
            <span className="text-gold">02</span>
            <span className="mx-2 text-canvas/40">—</span>
            Best Work
          </span>
          <span className="text-canvas/45">Flagship case study · 01 / 06</span>
        </div>

        {/* Poster title */}
        <div className="pt-7 md:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <RevealText className="lg:col-span-8">
            <h2 className="display text-[clamp(3rem,11vw,8.5rem)] text-canvas uppercase tracking-[-0.04em]">
              Gamma <span className="gold-foil">Code</span>
            </h2>
          </RevealText>

          <RevealText delay={120} className="lg:col-span-4">
            <p className="text-canvas/70 text-sm sm:text-base leading-relaxed max-w-[38ch] lg:pb-4">
              {project.subtitle}. An AI development environment where the
              interface is the product — editor, terminal, and copilot as one
              continuous surface.
            </p>
          </RevealText>
        </div>

        {/* Screenshot */}
        <RevealText delay={80} className="mt-10 md:mt-14">
          <Link
            href={`/work/${project.id}`}
            className="group block relative w-full overflow-hidden rounded-lg border border-gold/30 bg-black/40"
          >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] w-full">
              <Image
                src={project.image}
                alt={`${project.title} interface overview`}
                fill
                sizes="100vw"
                priority={false}
                className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
            </div>

            {/* Overlay meta */}
            <div className="absolute left-0 right-0 bottom-0 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas/70">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-bright">
                Enter case study
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </RevealText>

        {/* Meta strip */}
        <div className="mt-7 md:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-10 md:pb-14">
          <ul className="flex flex-wrap gap-2">
            {project.technology.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-canvas/60 border border-canvas/15 rounded px-2.5 py-1"
              >
                {tech}
              </li>
            ))}
          </ul>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas/40 max-w-[46ch] sm:text-right">
            caution: keyboard-first — the mouse is optional from here on
          </p>
        </div>
      </div>
    </section>
  );
}
