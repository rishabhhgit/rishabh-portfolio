"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Abstract representation of interface layers — hairline planes with a
 * fragment of real UI structure. Static by design; the grid behind it
 * is the only thing that moves.
 */
function InterfaceLayers() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden lg:block w-full max-w-[440px] aspect-[5/4] select-none"
    >
      {/* Back plane */}
      <div className="absolute right-0 top-0 h-[68%] w-[86%] rounded-lg border border-rule bg-surface/70" />

      {/* Middle plane */}
      <div className="absolute right-4 top-8 h-[68%] w-[86%] rounded-lg border border-rule-strong bg-raised/80" />

      {/* Front plane — carries a wireframe fragment */}
      <div className="absolute left-0 bottom-0 h-[72%] w-[92%] rounded-lg border border-rule-strong bg-surface shadow-[0_24px_60px_-20px_rgba(60,45,20,0.22)] overflow-hidden">
        {/* window chrome */}
        <div className="h-7 border-b border-rule flex items-center gap-1.5 px-3">
          <span className="w-[7px] h-[7px] rounded-full bg-rule-strong" />
          <span className="w-[7px] h-[7px] rounded-full bg-rule-strong" />
          <span className="w-[7px] h-[7px] rounded-full bg-rule-strong" />
          <span className="ml-3 h-[3px] w-16 rounded-full bg-rule" />
        </div>

        <div className="flex h-[calc(100%-1.75rem)]">
          {/* rail */}
          <div className="w-[26%] border-r border-rule p-3 space-y-2.5">
            <div className="h-[5px] w-10 rounded-full bg-accent/70" />
            <div className="h-[5px] w-14 rounded-full bg-rule-strong" />
            <div className="h-[5px] w-9 rounded-full bg-rule" />
            <div className="h-[5px] w-12 rounded-full bg-rule" />
            <div className="h-[5px] w-10 rounded-full bg-rule" />
          </div>

          {/* content */}
          <div className="flex-1 p-3 space-y-3">
            <div className="h-[7px] w-2/5 rounded-full bg-ink-faint" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-9 rounded border border-rule bg-raised" />
              <div className="h-9 rounded border border-rule bg-raised" />
              <div className="h-9 rounded border border-accent/50 bg-accent-surface" />
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="h-[4px] w-full rounded-full bg-rule" />
              <div className="h-[4px] w-[88%] rounded-full bg-rule" />
              <div className="h-[4px] w-[72%] rounded-full bg-rule" />
            </div>
            <div className="flex gap-2 pt-1">
              <div className="h-5 w-16 rounded border border-rule-strong bg-raised" />
              <div className="h-5 w-12 rounded border border-rule bg-raised" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle animated grid background
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.0016;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const spacing = 88;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(36, 29, 18, 0.055)";
      ctx.beginPath();
      for (let i = 1; i < cols; i++) {
        const x = i * spacing + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let j = 1; j < rows; j++) {
        const y = j * spacing + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // A single travelling accent node on the grid intersections
      const col = Math.floor((time * 6) % cols);
      const row = Math.floor((Math.sin(time * 0.7) * 0.5 + 0.5) * rows);
      const pulse = (Math.sin(time * 4) * 0.5 + 0.5) * 0.4 + 0.08;
      ctx.fillStyle = `rgba(168, 127, 22, ${pulse})`;
      ctx.beginPath();
      ctx.arc(col * spacing, row * spacing, 2, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    if (reduce.matches) {
      draw();
      cancelAnimationFrame(animationId);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[86vh] flex flex-col justify-center pt-28 pb-16 section-container overflow-hidden"
    >
      {/* Animated grid canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Very soft accent wash */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/3 w-[900px] h-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.13),transparent)] pointer-events-none"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          className="lg:col-span-7 space-y-9"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Small positioning label */}
          <motion.div variants={childVariants}>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.16em] text-ink-dim">
              <span className="uppercase">
                UI/UX
                <span className="text-ink-faint mx-1.5">·</span>
                Product Design
                <span className="text-ink-faint mx-1.5">·</span>
                Interaction Design
                <span className="text-ink-faint mx-1.5">·</span>
                Backend
                <span className="text-ink-faint mx-1.5">·</span>
                AI / LLM
              </span>
            </div>
          </motion.div>

          {/* Main statement */}
          <motion.h1
            variants={childVariants}
            className="display text-[clamp(2.75rem,6.6vw,5.75rem)] text-ink max-w-[15ch]"
          >
            Designing <span className="gold-foil">interfaces</span>
            <br className="hidden sm:block" /> for complex digital products.
          </motion.h1>

          {/* Supporting narrative */}
          <motion.p
            variants={childVariants}
            className="text-base sm:text-lg text-ink-soft font-normal leading-[1.75] max-w-[54ch]"
          >
            UI/UX and product designer working full-stack. I shape interfaces
            for complex software — developer tools, real-time systems, data
            platforms — then build them through the backend and AI/LLM layer,
            so the design survives the build.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={childVariants}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-ink text-canvas font-semibold text-sm tracking-[0.01em] hover:bg-accent transition-colors duration-300"
            >
              Explore selected work
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 14 14"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M7 1v12M1 7l6 6 6-6" />
              </svg>
            </a>

            <a
              href="https://github.com/rishabhhgit"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg border border-rule text-ink-soft font-medium text-sm hover:text-ink hover:border-rule-strong transition-all duration-300"
            >
              GitHub
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M1 11L11 1M11 1H4M11 1v7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Interface layers composition */}
        <motion.div
          className="lg:col-span-5 flex lg:justify-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <InterfaceLayers />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-rule-strong to-transparent relative overflow-hidden">
          <div className="absolute w-full h-3 bg-accent/60 animate-[drift_2.6s_ease-in-out_infinite]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
          Go on, scroll down
        </span>
      </motion.div>
    </section>
  );
}
