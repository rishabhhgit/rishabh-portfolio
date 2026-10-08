"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

const readScrolled = () => window.scrollY > 60;

const readActiveSection = () => {
  let current = "";
  for (const link of navLinks) {
    const id = link.href.slice(2);
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 160) current = id;
  }
  return current;
};

export default function Navigation() {
  const scrolled = useSyncExternalStore(subscribe, readScrolled, () => false);
  const activeSection = useSyncExternalStore(
    subscribe,
    readActiveSection,
    () => ""
  );
  const [mobileOpen, setMobileOpen] = useState(false);

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
            ? "bg-canvas/85 backdrop-blur-2xl border-b border-rule/70"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`section-container flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative font-semibold text-[15px] tracking-[-0.01em] text-ink hover:text-accent transition-colors duration-300"
            onClick={() => setMobileOpen(false)}
          >
            <span className="hidden sm:inline">Rishabh Jain</span>
            <span className="sm:hidden">RJ</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={activeSection === link.href.slice(2)}
                className={`text-[13px] tracking-[0.02em] link-underline transition-colors duration-300 ${
                  activeSection === link.href.slice(2)
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Availability indicator */}
            <div className="flex items-center gap-2 pl-6 border-l border-rule">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
              <span className="text-[11px] font-mono text-ink-dim tracking-wider">
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
              className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 origin-center ${
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
            className="fixed inset-0 z-40 bg-canvas/98 backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col items-start justify-center h-full section-container">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-4xl sm:text-5xl font-semibold text-ink hover:text-accent transition-colors duration-300 py-4 tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm font-mono text-ink-dim">
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
