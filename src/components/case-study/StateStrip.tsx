"use client";

import React from "react";
import { CaseStudyState } from "@/data/case-studies";

const TONE: Record<CaseStudyState["tone"], { dot: string; ring: string }> = {
  idle: { dot: "#797c85", ring: "rgba(121,124,133,0.28)" },
  active: { dot: "#7b8cff", ring: "rgba(123,140,255,0.32)" },
  success: { dot: "#34d399", ring: "rgba(52,211,153,0.28)" },
  error: { dot: "#f87171", ring: "rgba(248,113,113,0.28)" },
};

interface StateStripProps {
  states: CaseStudyState[];
  accent: string;
}

/**
 * Named interface states, presented as designed chips rather than prose.
 * These describe the design of each state — not observed product metrics.
 */
export function StateStrip({ states, accent }: StateStripProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {states.map((s) => {
        const tone = TONE[s.tone];
        return (
          <div
            key={s.label}
            className="group flex flex-col gap-3 rounded-lg border border-rule bg-surface p-4 transition-colors duration-300 hover:border-rule-strong"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: tone.dot }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                {s.label}
              </span>
              <span
                aria-hidden="true"
                className="ml-auto h-[18px] w-[34px] rounded-full border transition-colors duration-300"
                style={{ borderColor: tone.ring }}
              >
                <span
                  className="m-[3px] block h-[10px] w-[10px] rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: tone.dot,
                    transform:
                      s.tone === "idle" ? "translateX(0)" : "translateX(14px)",
                  }}
                />
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-dim">
              {s.note}
            </p>
          </div>
        );
      })}
      <div
        aria-hidden="true"
        className="hidden rounded-lg border border-dashed border-rule p-4 lg:block"
        style={{ borderColor: `${accent}33` }}
      />
    </div>
  );
}
