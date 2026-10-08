"use client";

import React, { useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";

const SECTIONS = [
  { id: "home", number: "00", label: "Index" },
  { id: "work", number: "01", label: "Selected Work" },
  { id: "best", number: "02", label: "Best Work" },
  { id: "approach", number: "03", label: "Approach" },
  { id: "system", number: "04", label: "Design Systems" },
  { id: "about", number: "05", label: "About" },
  { id: "contact", number: "06", label: "Contact" },
];

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

const readVisible = () => window.scrollY > 140;

const readActiveId = () => {
  let current = SECTIONS[0].id;
  for (const section of SECTIONS) {
    const el = document.getElementById(section.id);
    if (el && el.getBoundingClientRect().top <= 180) current = section.id;
  }
  return current;
};

export default function SectionRail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  const visible = useSyncExternalStore(subscribe, readVisible, () => false);
  const activeId = useSyncExternalStore(
    subscribe,
    readActiveId,
    () => SECTIONS[0].id
  );

  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPercent(Math.round(v * 100))
  );

  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-accent via-gold to-gold-bright"
      />

      {/* Bottom section pill */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] hidden md:block transition-all duration-500 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Section progress"
          className="flex items-center gap-4 rounded-full border border-rule-strong bg-canvas/90 backdrop-blur-xl pl-5 pr-4 py-2.5 shadow-[0_12px_40px_-16px_rgba(60,45,20,0.35)]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim whitespace-nowrap tabular-nums">
            <span className="text-accent">{active.number}</span>
            <span className="mx-1.5 text-rule-strong">—</span>
            {active.label}
          </span>

          <span className="flex items-end gap-[5px] h-5" aria-hidden="true">
            {SECTIONS.map((section) => {
              const isActive = section.id === activeId;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => goTo(section.id)}
                  aria-label={`Go to ${section.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`w-[2px] rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-5 bg-accent"
                      : "h-2.5 bg-rule-strong hover:bg-ink-soft hover:h-4"
                  }`}
                />
              );
            })}
          </span>

          <span className="font-mono text-[10px] tabular-nums text-ink-dim border-l border-rule pl-4">
            {String(percent).padStart(3, "0")}%
          </span>
        </nav>
      </div>
    </>
  );
}
