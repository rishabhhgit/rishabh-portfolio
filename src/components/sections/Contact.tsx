"use client";

import React, { useEffect, useState } from "react";
import { RevealText } from "@/components/ui/RevealText";

const links = [
  { name: "Email", url: "mailto:rishabh.jain9936@gmail.com", display: "rishabh.jain9936@gmail.com" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rishabhh-dev/", display: "linkedin.com/in/rishabhh-dev" },
  { name: "GitHub", url: "https://github.com/rishabhhgit", display: "github.com/rishabhhgit" }
];

export function Contact() {
  const [timeString, setTimeString] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    // Update local time
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          timeZoneName: "short",
        })
      );
    };
    
    updateTime();
    const interval = setInterval(updateTime, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-32 md:py-48 border-t border-[#E5E7EB] section-container flex flex-col justify-between min-h-[70vh]">
      <div className="max-w-4xl space-y-12">
        <RevealText>
          <div className="eyebrow">Contact</div>
        </RevealText>

        <RevealText delay={80} className="space-y-6">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[#111827] tracking-[-0.03em] leading-tight">
            Have a product worth designing?
          </h2>

          <p className="text-lg text-[#4B5563] leading-relaxed max-w-2xl">
            Let's make complex things feel simple. Available for new opportunities in product design and creative development.
          </p>
        </RevealText>

        <RevealText delay={160}>
          <a
            href="mailto:rishabh.jain9936@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#2563EB] text-[#FDFDFC] font-bold text-base hover:bg-[#1D4ED8] transition-colors duration-300"
          >
            Get in touch
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 14 14"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 1v12M1 7l6 6 6-6" />
            </svg>
          </a>
        </RevealText>

        <RevealText delay={240}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("mailto") ? undefined : "_blank"}
                rel={link.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group p-5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#2563EB]/40 hover:bg-[#F3F4F6] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-widest">{link.name}</div>
                  <svg
                    className="w-3 h-3 text-[#9CA3AF] group-hover:text-[#2563EB] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1 11L11 1M11 1H4M11 1v7" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-[#4B5563] group-hover:text-[#111827] transition-colors truncate">
                  {link.display}
                </div>
              </a>
            ))}
          </div>
        </RevealText>
      </div>

      <RevealText delay={320}>
        <div className="pt-20 mt-20 border-t border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium text-[#111827]">
              Rishabh Jain
            </span>
            <span className="text-[11px] font-mono text-[#9CA3AF]">
              © {currentYear || "2024"} — All Rights Reserved
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-[11px] font-mono text-[#9CA3AF]">
            {timeString && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-subtle" />
                Local time: {timeString}
              </div>
            )}
            <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4B5563] transition-colors">
              LeetCode
            </a>
          </div>
        </div>
      </RevealText>
    </section>
  );
}
