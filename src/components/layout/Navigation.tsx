"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);

    let current = "";
    for (const link of navLinks) {
      const id = link.href.slice(1);
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) {
        current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#060608]/85 backdrop-blur-2xl border-b border-[#1a1a1f]/60"
            : "bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="relative font-semibold text-base tracking-[-0.02em] text-[#f0f0f2] hover:text-[#c8a2ff] transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMobileOpen(false);
            }}
          >
            <span className="hidden sm:inline">Rishabh Jain</span>
            <span className="sm:hidden">RJ</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-active={activeSection === link.href.slice(1)}
                className={`text-[13px] tracking-[0.02em] link-underline transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-[#f0f0f2]"
                    : "text-[#8a8a96] hover:text-[#f0f0f2]"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Availability indicator */}
            <div className="flex items-center gap-2 pl-6 border-l border-[#1a1a1f]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a2ff] animate-pulse-subtle" />
              <span className="text-[11px] font-mono text-[#4a4a56] tracking-wider">
                Available
              </span>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-[1.5px] bg-[#f0f0f2] transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[#f0f0f2] transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#060608]/98 backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col items-start justify-center h-full section-container">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="text-4xl sm:text-5xl font-semibold text-[#f0f0f2] hover:text-[#c8a2ff] transition-colors duration-300 py-4 tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#c8a2ff]" />
                <span className="text-sm font-mono text-[#4a4a56]">
                  Available for opportunities
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
