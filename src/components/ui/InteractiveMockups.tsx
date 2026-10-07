'use client';

import React, { useState } from 'react';

export function GammaCodeMockup() {
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal'>('editor');

  return (
    <div className="w-full rounded-xl border border-[#27272a] bg-[#0c0c0e] overflow-hidden shadow-2xl font-sans text-xs">
      {/* Title Bar */}
      <div className="h-9 bg-[#141417] border-b border-[#27272a] px-3.5 flex items-center justify-between text-[#a1a1aa]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
          <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
          <span className="w-3 h-3 rounded-full bg-[#10b981]/80" />
          <span className="ml-2 font-mono text-[11px] text-[#71717a]">Gamma Code v2.4 — Workspace</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#1e1e24] text-[10px] font-mono text-[#818cf8]">AI Model: Sonnet 3.5</span>
        </div>
      </div>

      {/* Editor Main Layout */}
      <div className="grid grid-cols-12 min-h-[320px]">
        {/* Left Sidebar */}
        <div className="col-span-3 bg-[#F3F4F6] border-r border-[#27272a] p-3 space-y-3 font-mono text-[11px] hidden sm:block">
          <div className="text-[#71717a] font-bold uppercase tracking-wider text-[10px]">Explorer</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#f4f4f5]">
              <span aria-hidden="true" className="inline-block w-2 h-2 rounded-[2px] bg-indigo-400/80" /> src/components
            </div>
            <div className="pl-4 space-y-1 text-[#a1a1aa]">
              <div className="flex items-center gap-1.5 text-emerald-400 bg-[#1a1a20] px-2 py-1 rounded">
                <span aria-hidden="true" className="inline-block w-1.5 h-2.5 rounded-[1px] bg-emerald-400/70" /> EditorCanvas.tsx
              </div>
              <div className="flex items-center gap-1.5 hover:text-[#f4f4f5] cursor-pointer">
                <span aria-hidden="true" className="inline-block w-1.5 h-2.5 rounded-[1px] bg-[#52525b]" /> TerminalSession.ts
              </div>
              <div className="flex items-center gap-1.5 hover:text-[#f4f4f5] cursor-pointer">
                <span aria-hidden="true" className="inline-block w-1.5 h-2.5 rounded-[1px] bg-[#52525b]" /> AIModelRouter.rs
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="col-span-12 sm:col-span-9 bg-[#09090b] flex flex-col justify-between p-4 font-mono text-[11px] leading-relaxed">
          {/* Tabs */}
          <div className="flex items-center gap-2 pb-3 border-b border-[#1f1f23]">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === 'editor' ? 'bg-[#1e1e24] text-[#f4f4f5]' : 'text-[#71717a]'
              }`}
            >
              EditorCanvas.tsx
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === 'terminal' ? 'bg-[#1e1e24] text-[#f4f4f5]' : 'text-[#71717a]'
              }`}
            >
              Terminal (~/gamma)
            </button>
          </div>

          {/* Code Lines */}
          {activeTab === 'editor' ? (
            <div className="space-y-1 py-2 font-mono text-[#a1a1aa]">
              <div className="flex gap-4">
                <span className="text-[#44444a] w-4 select-none">1</span>
                <span><span className="text-[#818cf8]">import</span> &#123; MonacoEditor, useAIAssistant &#125; <span className="text-[#818cf8]">from</span> <span className="text-emerald-300">&apos;@gamma/ide-core&apos;</span>;</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#44444a] w-4 select-none">2</span>
                <span><span className="text-[#818cf8]">export function</span> <span className="text-amber-300">EditorWorkspace</span>() &#123;</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#44444a] w-4 select-none">3</span>
                <span className="pl-4"><span className="text-[#818cf8]">const</span> &#123; state, streamCompletion &#125; = <span className="text-indigo-300">useAIAssistant</span>();</span>
              </div>

              {/* AI Inline Prompt Box */}
              <div className="my-3 p-3 rounded-lg border border-indigo-500/30 bg-indigo-950/20 backdrop-blur-sm space-y-2">
                <div className="flex items-center justify-between text-[11px] text-indigo-300 font-sans font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    Gamma AI Copilot — Refactoring AST stream parser
                  </span>
                  <span className="text-[10px] text-indigo-400/70">Press ⌘Enter to accept</span>
                </div>
                <div className="text-emerald-400 font-mono text-[11px] bg-[#0c0c0e] p-2 rounded border border-emerald-500/20">
                  + const parsedAST = await streamCompletion(buffer, &#123; optimizeMemory: true &#125;);
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-[#44444a] w-4 select-none">4</span>
                <span className="pl-4"><span className="text-[#818cf8]">return</span> &lt;<span className="text-indigo-300">MonacoEditor</span> session=&#123;state.activeSession&#125; /&gt;;</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#44444a] w-4 select-none">5</span>
                <span>&#125;</span>
              </div>
            </div>
          ) : (
            <div className="py-3 font-mono space-y-2 text-[#a1a1aa]">
              <div className="text-emerald-400">➜ gamma-desktop git:(main) $ npm run build:electron</div>
              <div className="text-[#71717a]">✓ Bundling main process with Turbopack (240ms)</div>
              <div className="text-[#71717a]">✓ Pre-compiling Rust WebSockets binary bindings</div>
              <div className="text-indigo-400">✓ Electron window initialized with zero IPC latency.</div>
            </div>
          )}

          {/* Status Bar */}
          <div className="pt-3 border-t border-[#1f1f23] flex items-center justify-between text-[10px] text-[#71717a]">
            <span>UTF-8 · TypeScript React · Monaco 0.44</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live AST Parser Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AeroTrackMockup() {
  return (
    <div className="w-full rounded-xl border border-[#27272a] bg-[#07090e] overflow-hidden shadow-2xl font-sans">
      {/* Telemetry Header */}
      <div className="h-10 bg-[#0d111a] border-b border-[#1f2937] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>LIVE TELEMETRY: 6,542 AIRCRAFT</span>
          </div>
          <span className="text-xs text-[#6b7280] hidden sm:inline">| 32 COUNTRIES CONNECTED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#1e293b] text-[10px] font-mono text-sky-400">MapLibre GL Vector</span>
        </div>
      </div>

      {/* Radar Map Canvas */}
      <div className="relative aspect-[16/9] w-full bg-[#05070a] flex items-center justify-center p-6 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        {/* Circular Radar Sweep visual */}
        <div className="absolute w-72 h-72 rounded-full border border-sky-500/20 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-sky-500/30" />
          <div className="w-24 h-24 rounded-full border border-sky-500/40" />
        </div>

        {/* Aircraft Telemetry Pin Cards */}
        <div className="relative z-10 w-full max-w-md space-y-3">
          <div className="p-3 rounded-lg border border-sky-500/40 bg-[#0d1424]/90 backdrop-blur-md flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 text-sm">
                ✈
              </div>
              <div>
                <div className="font-mono font-bold text-sky-200 text-xs">FLIGHT AI-204 · BOEING 787</div>
                <div className="text-[11px] text-[#94a3b8]">DEL (Delhi) ➔ LHR (London)</div>
              </div>
            </div>
            <div className="text-right font-mono text-[11px]">
              <div className="text-emerald-400">38,000 FT</div>
              <div className="text-[#64748b]">485 KTS</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg border border-[#1e293b] bg-[#0b0f19]/80 backdrop-blur-md flex items-center justify-between text-xs opacity-75">
            <div className="flex items-center gap-2.5">
              <span className="text-amber-400">✈</span>
              <span className="font-mono text-slate-300">BA-117 · 34,000 FT</span>
            </div>
            <span className="font-mono text-slate-500 text-[10px]">SPEED: 460 KTS</span>
          </div>
        </div>

        {/* Map Layer Filter Pills overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 rounded bg-[#1e293b] text-sky-300">Commercial Only</span>
            <span className="px-2 py-0.5 rounded bg-[#1e293b]/50">High Altitude (&gt;30k)</span>
          </div>
          <span className="hidden sm:inline text-slate-500">Refresh: 1,000ms via OpenSky</span>
        </div>
      </div>
    </div>
  );
}

export function WorkflowBuilderMockup() {
  return (
    <div className="w-full rounded-xl border border-[#27272a] bg-[#0a0a0c] overflow-hidden shadow-2xl font-sans text-xs">
      {/* Canvas Header */}
      <div className="h-10 bg-[#121215] border-b border-[#27272a] px-4 flex items-center justify-between text-[#a1a1aa]">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-[#f4f4f5] font-medium">Pipeline: AI Content Summarizer & Publisher</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
            ✓ DAG VALIDATED
          </span>
        </div>
      </div>

      {/* DAG Visual Node Canvas */}
      <div className="relative aspect-[16/9] w-full bg-[#070709] p-6 flex flex-col md:flex-row items-center justify-around gap-4 overflow-hidden">
        {/* Node 1 */}
        <div className="w-full max-w-[200px] p-3.5 rounded-xl border border-indigo-500/40 bg-[#141419] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-indigo-400 font-semibold">01 · Trigger</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">Webhook</span>
          </div>
          <div className="font-medium text-[#f4f4f5]">Incoming Document</div>
          <div className="text-[10px] text-[#71717a] font-mono">Payload: JSON / PDF</div>
        </div>

        {/* Connector Line 1 */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 relative hidden md:block">
          <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Node 2 */}
        <div className="w-full max-w-[200px] p-3.5 rounded-xl border border-amber-500/40 bg-[#141419] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-amber-400 font-semibold">02 · AI Processor</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">Gemini 1.5</span>
          </div>
          <div className="font-medium text-[#f4f4f5]">Summarize & Tag</div>
          <div className="text-[10px] text-[#71717a] font-mono">Tokens: 1,420 parsed</div>
        </div>

        {/* Connector Line 2 */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-500 relative hidden md:block" />

        {/* Node 3 */}
        <div className="w-full max-w-[200px] p-3.5 rounded-xl border border-emerald-500/40 bg-[#141419] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-emerald-400 font-semibold">03 · Output</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">PostgreSQL</span>
          </div>
          <div className="font-medium text-[#f4f4f5]">Store Result</div>
          <div className="text-[10px] text-[#71717a] font-mono">Latency: 180ms</div>
        </div>
      </div>
    </div>
  );
}
