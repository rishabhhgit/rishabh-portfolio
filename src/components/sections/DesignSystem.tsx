"use client";

import React from "react";
import { RevealText } from "@/components/ui/RevealText";

export function DesignSystem() {
  return (
    <section className="py-32 md:py-48 border-t border-rule section-container overflow-hidden">
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
          <p className="text-ink-soft text-base sm:text-lg leading-relaxed max-w-[50ch]">
            A glimpse into the visual primitives that power the products. Typography, color scales, components, and interaction patterns designed for scale.
          </p>
        </RevealText>
      </div>

      <RevealText delay={200}>
        <div className="w-full rounded-2xl border border-rule bg-surface p-6 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#accent 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Typography & Colors */}
            <div className="lg:col-span-5 space-y-12">
              {/* Typography */}
              <div className="space-y-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim border-b border-rule pb-2">Typography</div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                    <span className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-none">
                      Instrument Sans
                    </span>
                    <span className="text-xs font-mono text-ink-dim">Sans-serif</span>
                  </div>
                  <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                    <span className="text-2xl sm:text-3xl font-mono text-ink leading-none">
                      JetBrains Mono
                    </span>
                    <span className="text-xs font-mono text-ink-dim">Monospace</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="text-5xl font-semibold text-ink tracking-tight leading-none">
                    Display 48px
                  </div>
                  <div className="text-[32px] font-semibold text-ink leading-tight">
                    Heading 32px
                  </div>
                  <div className="text-base text-ink">Body 16px</div>
                  <div className="text-sm text-ink-soft">Caption 14px</div>
                  <div className="text-xs font-mono text-ink-dim uppercase tracking-wider">Label 12px</div>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim border-b border-rule pb-2">Color Palette</div>
                <div className="flex gap-3">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-canvas border border-rule" />
                    <div className="text-[10px] font-mono text-ink-dim text-center">Bg</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-surface border border-rule" />
                    <div className="text-[10px] font-mono text-ink-dim text-center">Elev</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-raised" />
                    <div className="text-[10px] font-mono text-ink-dim text-center">Bord</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-ink" />
                    <div className="text-[10px] font-mono text-ink-dim text-center">Text</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-accent" />
                    <div className="text-[10px] font-mono text-accent text-center">Acc</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Components */}
            <div className="lg:col-span-7 space-y-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim border-b border-rule pb-2">Component Library</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Buttons & Inputs */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2.5 rounded-lg bg-ink text-canvas font-semibold text-sm hover:bg-accent transition-colors">
                      Primary Button
                    </button>
                    <button className="w-full px-4 py-2.5 rounded-lg border border-rule bg-transparent text-ink-soft font-medium text-sm hover:text-ink hover:border-rule-strong transition-colors">
                      Secondary Button
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Input field..." 
                        className="w-full px-4 py-2.5 rounded-lg border border-rule bg-canvas text-sm text-ink placeholder:text-ink-dim focus:outline-none focus:border-accent"
                        disabled
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-rule bg-canvas">
                      <span className="text-sm text-ink">Dropdown Select</span>
                      <svg className="w-4 h-4 text-ink-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {/* Status & Cards */}
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 border border-success/20 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      <span className="text-[11px] font-mono text-success">Success Status</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-warning/10 border border-warning/20 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                      <span className="text-[11px] font-mono text-warning">Warning State</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-danger/10 border border-danger/20 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                      <span className="text-[11px] font-mono text-danger">Error Critical</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-rule bg-canvas space-y-2">
                    <div className="w-8 h-8 rounded-full bg-raised" />
                    <div className="h-2 w-3/4 bg-raised rounded" />
                    <div className="h-2 w-1/2 bg-raised rounded" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </RevealText>
    </section>
  );
}
