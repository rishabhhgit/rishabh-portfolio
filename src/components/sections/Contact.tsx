'use client';

import React, { useEffect, useRef } from 'react';

const links = [
  { name: "Email", url: "mailto:rishabh.jain9936@gmail.com", display: "rishabh.jain9936@gmail.com" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rishabhh-dev/", display: "linkedin.com/in/rishabhh-dev" },
  { name: "GitHub", url: "https://github.com/rishabhhgit", display: "github.com/rishabhhgit" }
];

export function Contact() {
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-[#18181b] section-container flex flex-col justify-between min-h-[50vh]">
      <div className="max-w-4xl space-y-10">
        <div className="eyebrow">Contact</div>

        <div className="space-y-5">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-[-0.025em] leading-tight">
            Let&apos;s build something thoughtful.
          </h2>

          <p className="text-lg text-[#a1a1aa] leading-relaxed max-w-2xl">
            Have a complex product that needs a clearer interface? The inbox is open.
          </p>
        </div>

        <div>
          <a
            href="mailto:rishabh.jain9936@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-semibold text-base hover:bg-[#e4e4e7] transition-all"
          >
            Get in touch →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#18181b]">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.url.startsWith('mailto') ? undefined : '_blank'}
              rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="p-4 rounded-lg border border-[#1e1e22] bg-[#0f0f11] hover:border-[#3f3f46] hover:bg-[#161619] transition-all group"
            >
              <div className="text-[11px] font-mono text-[#52525b] uppercase">{link.name}</div>
              <div className="text-xs font-mono text-[#a1a1aa] group-hover:text-white transition-colors truncate pt-1">
                {link.display} ↗
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="pt-16 mt-16 border-t border-[#18181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[#52525b]">
        <span suppressHydrationWarning>
          © <span ref={yearRef}>2026</span> Rishabh Jain. All rights reserved.
        </span>
        <span>Designed &amp; built by Rishabh Jain</span>
      </div>
    </section>
  );
}
