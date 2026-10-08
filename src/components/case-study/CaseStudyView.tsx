"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { CaseStudy } from "@/data/case-studies";
import { RevealText } from "@/components/ui/RevealText";
import { InterfaceMap } from "@/components/case-study/InterfaceMap";
import { StateStrip } from "@/components/case-study/StateStrip";
import { DetailCrops } from "@/components/case-study/DetailCrops";

const SECTIONS = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "problem", number: "02", title: "The Problem" },
  { id: "context", number: "03", title: "Context" },
  { id: "approach", number: "04", title: "Design Approach" },
  { id: "architecture", number: "05", title: "Information Architecture" },
  { id: "interface", number: "06", title: "Interface" },
  { id: "system", number: "07", title: "Design System" },
  { id: "decisions", number: "08", title: "Interface Decisions" },
  { id: "interaction", number: "09", title: "Interaction Design" },
  { id: "visual-design", number: "10", title: "Visual Design" },
  { id: "rationale", number: "11", title: "Design Rationale" },
  { id: "experience", number: "12", title: "Final Experience" },
  { id: "implementation", number: "13", title: "Technical Implementation" },
];

interface CaseStudyViewProps {
  project: Project;
  study: CaseStudy;
  nextProject: Project | null;
}

function Section({
  id,
  number,
  title,
  accent,
  children,
}: {
  id: string;
  number: string;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 pt-12 border-t border-rule">
      <RevealText>
        <div className="flex items-baseline gap-4 mb-8">
          <span
            className="font-mono text-[11px] tabular-nums"
            style={{ color: accent }}
          >
            {number}
          </span>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
            {title}
          </h2>
        </div>
      </RevealText>
      {children}
    </section>
  );
}

export function CaseStudyView({ project, study, nextProject }: CaseStudyViewProps) {
  const accent = project.accent || "#8a6410";
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 200) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const meta = [
    { label: "Role", value: study.role },
    { label: "Category", value: project.category },
    { label: "AI-Assisted", value: project.aiTools?.join(" · ") || "—" },
    { label: "Source", value: "GitHub" },
  ];

  return (
    <article className="pb-32">
      {/* ── Hero ───────────────────────────────────────────── */}
      <header className="section-container pt-28 md:pt-36 pb-12">
        <RevealText>
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim hover:text-ink transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Selected work
            </Link>
          </nav>
        </RevealText>

        <div className="space-y-7 max-w-4xl">
          <RevealText>
            <div className="inline-flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.16em]">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span style={{ color: accent }}>{project.category}</span>
            </div>
          </RevealText>

          <RevealText delay={60}>
            <h1 className="display text-[clamp(2.5rem,6vw,4.75rem)] text-ink">
              {project.title}
            </h1>
          </RevealText>

          <RevealText delay={120}>
            <p className="text-lg sm:text-xl text-ink-soft leading-[1.7] max-w-[58ch]">
              {project.subtitle}
            </p>
          </RevealText>
        </div>

        {/* Meta strip */}
        <RevealText delay={180}>
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule rounded-xl overflow-hidden">
            {meta.map((m) => (
              <div key={m.label} className="bg-surface px-5 py-5 space-y-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                  {m.label}
                </dt>
                <dd className="text-[13px] text-ink-soft leading-snug break-words">
                  {m.label === "Source" ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline hover:text-ink transition-colors"
                    >
                      {m.value}
                    </a>
                  ) : (
                    m.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </RevealText>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-xl border border-rule overflow-hidden bg-surface"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </header>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="section-container grid grid-cols-1 lg:grid-cols-[190px_minmax(0,1fr)] gap-x-16 gap-y-9">
        {/* Sticky index */}
        <aside className="hidden lg:block">
          <nav
            aria-label="Case study sections"
            className="sticky top-28 border-l border-rule pl-5"
          >
            <ol className="space-y-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`group flex items-baseline gap-3 text-[12px] leading-snug transition-colors duration-300 ${
                      active === s.id ? "text-ink" : "text-ink-dim hover:text-ink-soft"
                    }`}
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums shrink-0 transition-colors"
                      style={{ color: active === s.id ? accent : undefined }}
                    >
                      {s.number}
                    </span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0 space-y-16 md:space-y-20">
          {/* 01 Overview */}
          <Section id="overview" number="01" title="Overview" accent={accent}>
            <RevealText>
              <p className="text-base sm:text-lg text-ink-soft leading-[1.75] max-w-[64ch]">
                {project.description}
              </p>
            </RevealText>
            <RevealText delay={80}>
              <div className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">
                {project.technology.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </RevealText>
          </Section>

          {/* 02 The Problem */}
          <Section id="problem" number="02" title="The Problem" accent={accent}>
            <RevealText>
              <p className="text-base text-ink-soft leading-[1.8] max-w-[64ch]">
                {project.designChallenge}
              </p>
            </RevealText>
          </Section>

          {/* 03 Context */}
          <Section id="context" number="03" title="Context" accent={accent}>
            <RevealText>
              <blockquote
                className="border-l-2 pl-6 py-1 text-base sm:text-lg text-ink leading-[1.75] max-w-[62ch]"
                style={{ borderColor: accent }}
              >
                {study.context}
              </blockquote>
            </RevealText>
          </Section>

          {/* 04 Design Approach */}
          <Section id="approach" number="04" title="Design Approach" accent={accent}>
            <RevealText>
              <p className="text-base text-ink-soft leading-[1.8] max-w-[64ch]">
                {project.designApproach}
              </p>
            </RevealText>

            {/* User flow */}
            <RevealText delay={80}>
              <div className="mt-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim mb-5">
                  Primary flow
                </div>
                <ol className="space-y-0">
                  {study.userFlow.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 py-3.5 border-b border-rule last:border-b-0"
                    >
                      <span
                        className="font-mono text-[10px] tabular-nums mt-1 shrink-0 w-5"
                        style={{ color: accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-ink-soft leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </RevealText>
          </Section>

          {/* 05 Information Architecture */}
          <Section
            id="architecture"
            number="05"
            title="Information Architecture"
            accent={accent}
          >
            {project.informationArchitecture &&
              project.informationArchitecture.length > 0 && (
                <RevealText>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.informationArchitecture.map((flow, i) => (
                      <li
                        key={i}
                        className="p-4 rounded-lg bg-surface border border-rule font-mono text-[11px] text-ink-soft leading-relaxed"
                      >
                        <span className="mr-2 tabular-nums" style={{ color: accent }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {flow}
                      </li>
                    ))}
                  </ul>
                </RevealText>
              )}
          </Section>

          {/* 06 Interface */}
          <Section id="interface" number="06" title="Interface" accent={accent}>
            <RevealText>
              <p className="text-base text-ink-soft leading-[1.8] max-w-[64ch] mb-8">
                The working surface of the product. Each marker names a zone
                that carries a specific responsibility — hover or focus to
                trace how the screen is divided.
              </p>
            </RevealText>
            <RevealText delay={80}>
              <InterfaceMap
                src={project.image}
                alt={`${project.title} interface with annotated regions`}
                callouts={study.callouts}
                accent={accent}
              />
            </RevealText>
          </Section>

          {/* 07 Design System */}
          <Section id="system" number="07" title="Design System" accent={accent}>
            <RevealText>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
                {study.system.map((group) => (
                  <div key={group.label} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-[2px] rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                        {group.label}
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {group.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-[13px] text-ink-soft leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </RevealText>
          </Section>

          {/* 08 Interface Decisions */}
          <Section id="decisions" number="08" title="Interface Decisions" accent={accent}>
            <RevealText>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.interfaceDecisions.map((decision, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-lg bg-surface border border-rule"
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums mt-1 shrink-0"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-ink-soft leading-relaxed">
                      {decision}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealText>
          </Section>

          {/* 09 Interaction Design */}
          <Section id="interaction" number="09" title="Interaction Design" accent={accent}>
            <RevealText>
              <ul className="space-y-4 max-w-[64ch]">
                {project.interactionDetails.map((detail, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="mt-2.5 w-4 h-[1px] shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="text-base text-ink-soft leading-relaxed">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealText>

            <RevealText delay={80}>
              <div className="mt-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim mb-5">
                  Interface states
                </div>
                <StateStrip states={study.states} accent={accent} />
              </div>
            </RevealText>
          </Section>

          {/* 10 Visual Design */}
          <Section id="visual-design" number="10" title="Visual Design" accent={accent}>
            <RevealText>
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
                {study.visualDesign.map((note, i) => (
                  <li key={i} className="space-y-3">
                    <span
                      className="font-mono text-[10px] tabular-nums"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-ink-soft leading-[1.7]">{note}</p>
                  </li>
                ))}
              </ol>
            </RevealText>
          </Section>

          {/* 11 Design Rationale */}
          <Section id="rationale" number="11" title="Design Rationale" accent={accent}>
            {project.designRationale && project.designRationale.length > 0 && (
              <RevealText>
                <ul className="space-y-5 max-w-[64ch]">
                  {project.designRationale.map((rationale, i) => (
                    <li key={i} className="flex items-start gap-5">
                      <span className="mt-3 w-6 h-[1px] shrink-0" style={{ backgroundColor: accent }} />
                      <p className="text-base text-ink-soft leading-[1.75]">
                        {rationale}
                      </p>
                    </li>
                  ))}
                </ul>
              </RevealText>
            )}
          </Section>

          {/* 12 Final Experience */}
          <Section id="experience" number="12" title="Final Experience" accent={accent}>
            <RevealText>
              <p className="text-base text-ink-soft leading-[1.8] max-w-[64ch] mb-8">
                Three moments from the shipped interface, shown at the scale
                they are actually used at.
              </p>
            </RevealText>
            <DetailCrops details={study.details} accent={accent} />
          </Section>

          {/* 13 Technical Implementation */}
          <Section
            id="implementation"
            number="13"
            title="Technical Implementation"
            accent={accent}
          >
            <RevealText>
              <div className="rounded-xl border border-rule bg-surface divide-y divide-rule">
                <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim sm:w-24 shrink-0">
                    Stack
                  </span>
                  <span className="text-sm text-ink-soft">
                    {project.technology.join(" · ")}
                  </span>
                </div>
                {project.aiTools && project.aiTools.length > 0 && (
                  <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim sm:w-24 shrink-0">
                      AI tools
                    </span>
                    <span className="text-sm text-ink-soft">
                      {project.aiTools.join(" · ")}
                    </span>
                  </div>
                )}
                <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim sm:w-24 shrink-0">
                    Source
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink link-underline hover:text-accent transition-colors"
                  >
                    View the repository →
                  </a>
                </div>
              </div>
            </RevealText>
          </Section>

          {/* Next project */}
          {nextProject && (
            <RevealText>
              <Link
                href={`/work/${nextProject.id}`}
                className="group mt-8 block rounded-xl border border-rule bg-surface overflow-hidden hover:border-rule-strong transition-colors duration-500"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={nextProject.image}
                    alt={`${nextProject.title} interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/75 to-canvas/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim mb-2">
                      Next project
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-ink tracking-tight group-hover:text-accent transition-colors duration-300">
                      {nextProject.title}
                      <span className="inline-block ml-3 transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealText>
          )}
        </div>
      </div>
    </article>
  );
}
