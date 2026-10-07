"use client";

import React from "react";
import { RevealText } from "@/components/ui/RevealText";

export function DesignSystem() {
  return (
    <section className="py-32 md:py-48 border-t border-[#E5E7EB] section-container overflow-hidden">
      <div className="max-w-3xl mb-16 md:mb-20 space-y-8">
        <RevealText>
          <div className="eyebrow">Design Systems</div>
        </RevealText>
        <RevealText delay={80}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-[-0.03em] leading-tight max-w-[18ch]">
            Systems behind the interfaces.
          </h2>
        </RevealText>
        <RevealText delay={160}>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-[50ch]">
            A glimpse into the visual primitives that power the products. Typography, color scales, components, and interaction patterns designed for scale.
          </p>
        </RevealText>
      </div>

      <RevealText delay={200}>
        <div className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Typography & Colors */}
            <div className="lg:col-span-5 space-y-12">
              {/* Typography */}
              <div className="space-y-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] border-b border-[#E5E7EB] pb-2">Typography</div>
                <div className="space-y-4">
                  <div className="flex items-end gap-4">
                    <span className="text-4xl font-bold text-[#111827] tracking-tight leading-none">Inter</span>
                    <span className="text-xs font-mono text-[#9CA3AF]">Sans-serif</span>
                  </div>
                  <div className="flex items-end gap-4">
                    <span className="text-3xl font-mono text-[#111827] leading-none">JetBrains</span>
                    <span className="text-xs font-mono text-[#9CA3AF]">Monospace</span>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <div className="text-2xl font-bold text-[#111827]">H1 Display Bold 32px</div>
                  <div className="text-xl font-semibold text-[#111827]">H2 Section Semibold 24px</div>
                  <div className="text-base text-[#111827]">Body Regular 16px</div>
                  <div className="text-sm text-[#4B5563]">Caption Regular 14px</div>
                  <div className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">Label Mono 12px</div>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] border-b border-[#E5E7EB] pb-2">Color Palette</div>
                <div className="flex gap-3">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#FDFDFC] border border-[#E5E7EB]" />
                    <div className="text-[10px] font-mono text-[#9CA3AF] text-center">Bg</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#E5E7EB]" />
                    <div className="text-[10px] font-mono text-[#9CA3AF] text-center">Elev</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#E5E7EB]" />
                    <div className="text-[10px] font-mono text-[#9CA3AF] text-center">Bord</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#111827]" />
                    <div className="text-[10px] font-mono text-[#9CA3AF] text-center">Text</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#2563EB]" />
                    <div className="text-[10px] font-mono text-[#2563EB] text-center">Acc</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Components */}
            <div className="lg:col-span-7 space-y-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF] border-b border-[#E5E7EB] pb-2">Component Library</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Buttons & Inputs */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2.5 rounded-lg bg-[#111827] text-[#FDFDFC] font-semibold text-sm hover:bg-[#2563EB] transition-colors">
                      Primary Button
                    </button>
                    <button className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-transparent text-[#4B5563] font-medium text-sm hover:text-[#111827] hover:border-[#D1D5DB] transition-colors">
                      Secondary Button
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Input field..." 
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#FDFDFC] text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563EB]"
                        disabled
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#FDFDFC]">
                      <span className="text-sm text-[#111827]">Dropdown Select</span>
                      <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {/* Status & Cards */}
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#10b981]/10 border border-[#10b981]/20 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      <span className="text-[11px] font-mono text-[#10b981]">Success Status</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f59e0b]/10 border border-[#f59e0b]/20 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                      <span className="text-[11px] font-mono text-[#f59e0b]">Warning State</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#ef4444]/10 border border-[#ef4444]/20 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                      <span className="text-[11px] font-mono text-[#ef4444]">Error Critical</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#FDFDFC] space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#E5E7EB]" />
                    <div className="h-2 w-3/4 bg-[#E5E7EB] rounded" />
                    <div className="h-2 w-1/2 bg-[#E5E7EB] rounded" />
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
