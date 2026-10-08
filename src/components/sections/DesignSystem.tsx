"use client";

import React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Briefcase,
  Wallet,
  Search,
  Bell,
} from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";

/* ── Artboard shell — names sit outside the frame, like a design file ── */
function Artboard({
  n,
  name,
  span,
  active = false,
  children,
}: {
  n: string;
  name: string;
  span: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={span}>
      <div className="mb-2 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-dim">
        <span className={active ? "text-accent" : undefined}>{n}</span>
        <span>{name}</span>
      </div>
      <div
        className={`relative rounded-lg border bg-canvas p-5 transition-colors duration-500 ${
          active ? "border-accent/45" : "border-rule"
        }`}
      >
        {active &&
          [
            "-left-[3px] -top-[3px]",
            "-right-[3px] -top-[3px]",
            "-left-[3px] -bottom-[3px]",
            "-right-[3px] -bottom-[3px]",
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden="true"
              className={`absolute ${pos} h-1.5 w-1.5 rounded-[1px] border border-accent bg-canvas`}
            />
          ))}
        {children}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
      {children}
    </div>
  );
}

const RAMP = [
  { hex: "#f2ecdd", name: "canvas" },
  { hex: "#f9f4e8", name: "surface" },
  { hex: "#fdfbf4", name: "raised" },
  { hex: "#e0d6c1", name: "rule" },
  { hex: "#5d5342", name: "ink-dim" },
  { hex: "#241d12", name: "ink" },
  { hex: "#8a6410", name: "accent" },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Briefcase, label: "Tracking" },
  { icon: Wallet, label: "Finance" },
];

export function DesignSystem() {
  return (
    <section className="py-32 md:py-48 border-t border-rule section-container">
      <div className="max-w-3xl mb-16 md:mb-20 space-y-8">
        <RevealText>
          <div className="eyebrow">Design Systems</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-[-0.03em] leading-tight max-w-[18ch]">
            Systems behind the interfaces.
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-[52ch]">
            The primitives every product here is assembled from — type, color,
            controls, and data, specified once and reused everywhere.
          </p>
        </RevealText>
      </div>

      <RevealText delay={200}>
        <div className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl">
          {/* ── File chrome ─────────────────────────────────────── */}
          <div className="flex items-center justify-between gap-4 border-b border-rule bg-raised/60 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-ink-dim">
                rishabh-ui / foundations
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-ink-dim">
              <span className="rounded border border-rule bg-canvas px-2 py-0.5">
                100%
              </span>
              <span className="hidden sm:inline">8pt grid</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[168px_minmax(0,1fr)]">
            {/* ── Outline rail ──────────────────────────────────── */}
            <aside className="hidden lg:block border-r border-rule p-4">
              <Label>Layers</Label>
              <ul className="space-y-1">
                {[
                  "Foundations",
                  "Controls",
                  "Feedback",
                  "Navigation",
                  "Data",
                ].map((item, i) => (
                  <li key={item}>
                    <div
                      className={`flex items-center gap-2 rounded px-2 py-1.5 font-mono text-[11px] transition-colors ${
                        i === 0
                          ? "bg-accent/10 text-accent"
                          : "text-ink-dim hover:text-ink-soft"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-[1px] border ${
                          i === 0 ? "border-accent bg-accent/40" : "border-rule-strong"
                        }`}
                      />
                      {item}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Spacing ruler */}
              <div className="mt-8">
                <Label>Spacing</Label>
                <div className="flex items-end gap-1.5">
                  {[4, 8, 16, 24, 32].map((v) => (
                    <div key={v} className="text-center">
                      <div
                        className="w-2 rounded-[1px] bg-accent/35"
                        style={{ height: v }}
                      />
                      <div className="mt-1 font-mono text-[8px] text-ink-faint">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Canvas ────────────────────────────────────────── */}
            <div className="dot-pattern p-5 sm:p-7">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                {/* Type */}
                <Artboard n="01" name="Type scale" span="sm:col-span-7" active>
                  <div className="space-y-3.5">
                    {[
                      { s: "Display", px: "64", cls: "text-[40px] leading-none font-semibold tracking-[-0.03em]" },
                      { s: "Title", px: "32", cls: "text-[26px] leading-none font-semibold tracking-[-0.02em]" },
                      { s: "Body", px: "16", cls: "text-[15px] leading-tight" },
                      { s: "Caption", px: "14", cls: "text-[13px] leading-tight text-ink-soft" },
                      { s: "Label", px: "11", cls: "text-[10px] font-mono uppercase tracking-[0.18em] text-ink-dim" },
                    ].map((row) => (
                      <div
                        key={row.s}
                        className="flex items-baseline gap-4 border-b border-rule-soft pb-3 last:border-0 last:pb-0"
                      >
                        <span className="w-14 shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                          {row.s}
                        </span>
                        <span className={`flex-1 truncate text-ink ${row.cls}`}>
                          Designing interfaces
                        </span>
                        <span className="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-faint">
                          {row.px}
                        </span>
                      </div>
                    ))}
                  </div>
                </Artboard>

                {/* Color */}
                <Artboard n="02" name="Color" span="sm:col-span-5">
                  <Label>Ramp</Label>
                  <div className="space-y-1.5">
                    {RAMP.map((c) => (
                      <div key={c.name} className="flex items-center gap-3">
                        <span
                          className="h-6 w-6 shrink-0 rounded border border-rule"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-mono text-[10px] text-ink-soft">
                          {c.name}
                        </span>
                        <span className="ml-auto font-mono text-[9.5px] uppercase tabular-nums text-ink-faint">
                          {c.hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </Artboard>

                {/* Controls */}
                <Artboard n="03" name="Controls" span="sm:col-span-4">
                  <Label>Actions</Label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <span className="flex-1 rounded-md bg-ink px-3 py-2 text-center text-[12px] font-semibold text-canvas">
                        Primary
                      </span>
                      <span className="flex-1 rounded-md border border-rule px-3 py-2 text-center text-[12px] font-medium text-ink-soft">
                        Secondary
                      </span>
                    </div>

                    <div className="flex bg-raised p-0.5 rounded-md">
                      {["Design", "Prototype", "Code"].map((t, i) => (
                        <span
                          key={t}
                          className={`flex-1 rounded py-1.5 text-center text-[11px] ${
                            i === 0
                              ? "bg-canvas text-ink shadow-sm"
                              : "text-ink-dim"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-ink-soft">
                        Auto-layout
                      </span>
                      <span className="flex h-5 w-9 items-center rounded-full bg-accent px-0.5">
                        <span className="ml-auto h-4 w-4 rounded-full bg-white" />
                      </span>
                    </div>

                    {/* Static tooltip specimen */}
                    <div className="relative pt-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-raised px-2.5 py-1.5 text-[11px] text-ink-soft">
                        Export
                        <span className="font-mono text-[9px] text-ink-faint">
                          ⌘E
                        </span>
                      </span>
                      <span className="absolute left-0 top-0 rounded bg-ink px-2 py-1 text-[10px] font-medium text-canvas">
                        Export frame as PNG
                        <span className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 bg-ink" />
                      </span>
                    </div>
                  </div>
                </Artboard>

                {/* Inputs & menus */}
                <Artboard n="04" name="Inputs & menus" span="sm:col-span-4">
                  <Label>Fields</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 rounded-md border border-accent/50 bg-canvas px-3 py-2">
                      <Search className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      <span className="text-[12px] text-ink">workspace</span>
                      <span className="ml-auto h-3.5 w-[1px] animate-pulse-subtle bg-accent" />
                    </div>

                    <div className="flex items-center justify-between rounded-md border border-rule bg-canvas px-3 py-2">
                      <span className="text-[12px] text-ink-dim">
                        Select option
                      </span>
                      <svg
                        className="h-3.5 w-3.5 text-ink-dim"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-ink-dim">
                      <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                      Notifications
                      <span className="ml-auto rounded-full bg-accent px-1.5 text-[9px] font-semibold text-canvas">
                        3
                      </span>
                    </div>

                    {/* Mini dialog */}
                    <div className="rounded-md border border-rule bg-surface p-3 shadow-xl">
                      <div className="text-[12px] font-semibold text-ink">
                        Publish changes?
                      </div>
                      <p className="mt-1 text-[10.5px] leading-snug text-ink-dim">
                        This updates the live workspace.
                      </p>
                      <div className="mt-2.5 flex justify-end gap-2">
                        <span className="rounded px-2 py-1 text-[10.5px] text-ink-dim">
                          Cancel
                        </span>
                        <span className="rounded bg-accent px-2 py-1 text-[10.5px] font-semibold text-canvas">
                          Publish
                        </span>
                      </div>
                    </div>
                  </div>
                </Artboard>

                {/* Status */}
                <Artboard n="05" name="Status" span="sm:col-span-4">
                  <Label>Indicators</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { t: "Ready", c: "#1a7a4a" },
                      { t: "Running", c: "#8a6410" },
                      { t: "Queued", c: "#9a5b00" },
                      { t: "Failed", c: "#b3261e" },
                    ].map((s) => (
                      <span
                        key={s.t}
                        className="inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[10px]"
                        style={{
                          color: s.c,
                          borderColor: `${s.c}3d`,
                          backgroundColor: `${s.c}14`,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: s.c }}
                        />
                        {s.t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 rounded-lg border border-rule bg-surface p-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-md bg-raised" />
                      <div className="flex-1">
                        <div className="h-2 w-2/3 rounded-full bg-raised" />
                        <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-rule" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[9.5px] text-ink-dim">
                      <span>Progress</span>
                      <span className="tabular-nums text-ink-soft">64%</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-raised">
                      <div className="h-full w-[64%] rounded-full bg-accent" />
                    </div>
                  </div>
                </Artboard>

                {/* Navigation */}
                <Artboard n="06" name="Navigation" span="sm:col-span-4">
                  <Label>Sidebar</Label>
                  <ul className="space-y-0.5">
                    {NAV_ITEMS.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.label}>
                          <div
                            className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[12px] transition-colors ${
                              i === 1
                                ? "bg-accent/10 text-accent"
                                : "text-ink-dim"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                            {item.label}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Artboard>

                {/* Data visualization */}
                <Artboard n="07" name="Data" span="sm:col-span-8">
                  <Label>Series</Label>
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <div className="flex h-24 items-end gap-1.5">
                        {[38, 62, 45, 78, 55, 88, 70].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-[2px] transition-all duration-500"
                            style={{
                              height: `${h}%`,
                              backgroundColor:
                                i === 5 ? "#8a6410" : "rgba(138,100,16,0.28)",
                            }}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between font-mono text-[8.5px] text-ink-faint">
                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                          <span key={i} className="flex-1 text-center">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-40 shrink-0">
                      <svg viewBox="0 0 120 44" className="h-11 w-full" aria-hidden="true">
                        <polyline
                          fill="none"
                          stroke="#8a6410"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                          points="0,36 17,30 34,32 51,20 68,24 85,10 102,14 120,4"
                        />
                        <polyline
                          fill="none"
                          stroke="rgba(138,100,16,0.22)"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                          points="0,40 17,38 34,34 51,36 68,28 85,30 102,24 120,22"
                        />
                      </svg>
                      <div className="mt-1.5 flex items-center gap-3 font-mono text-[8.5px] text-ink-faint">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          primary
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent/30" />
                          baseline
                        </span>
                      </div>
                    </div>
                  </div>
                </Artboard>
              </div>
            </div>
          </div>
        </div>
      </RevealText>
    </section>
  );
}
