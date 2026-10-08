"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STATUS_LINES = [
  "LOCATING INTERFACE…",
  "ALIGNING TYPE SYSTEM…",
  "WARMING GOLD VALUES…",
  "COMPOSITING GRID…",
  "READY.",
];

const DURATION = 2200;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setProgress(100);
    window.setTimeout(() => setDone(true), 260);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = window.setTimeout(() => setDone(true), 0);
      return () => window.clearTimeout(id);
    }

    document.body.style.overflow = "hidden";

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const t = Math.min((now - startRef.current) / DURATION, 1);
      setProgress(Math.round(easeOut(t) * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  const status =
    STATUS_LINES[
      Math.min(
        Math.floor((progress / 100) * STATUS_LINES.length),
        STATUS_LINES.length - 1
      )
    ];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio: ${progress} percent`}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] bg-canvas flex flex-col justify-between px-5 py-6 sm:px-8 md:px-12 md:py-10"
        >
          {/* Top ribbon */}
          <div className="flex items-start justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink-dim">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
              Sys.track — active
            </span>
            <span className="hidden sm:inline">Portfolio · Vol.2026</span>
          </div>

          {/* Counter */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-end gap-4 sm:gap-6">
              <span className="gold-foil font-semibold tabular-nums tracking-[-0.05em] leading-[0.8] text-[clamp(4.5rem,18vw,13rem)]">
                {String(progress).padStart(3, "0")}
              </span>
              <span className="font-mono text-lg sm:text-2xl text-accent pb-2 sm:pb-4">
                %
              </span>
            </div>

            <div className="space-y-3">
              <div className="relative h-px w-full bg-rule overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-150 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink-dim">
                <span>{status}</span>
                <span className="text-ink-faint">Loading — {progress}%</span>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
            <button
              type="button"
              onClick={finish}
              className="group flex items-center gap-2 text-ink-dim hover:text-accent transition-colors duration-300"
            >
              Skip animation
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <span className="text-ink-faint text-right">
              Rishabh Jain — UI/UX Design
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
