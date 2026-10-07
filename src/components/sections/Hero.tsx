"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle animated grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 80;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      // Vertical lines
      for (let i = 0; i < cols; i++) {
        const x = i * spacing;
        const opacity = 0.02 + Math.sin(time + i * 0.3) * 0.008;
        ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let j = 0; j < rows; j++) {
        const y = j * spacing;
        const opacity = 0.02 + Math.sin(time + j * 0.3) * 0.008;
        ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Intersection dots
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          const dist = Math.sqrt(
            Math.pow(x - canvas.width * 0.3, 2) +
            Math.pow(y - canvas.height * 0.4, 2)
          );
          const pulse = Math.sin(time * 2 - dist * 0.003) * 0.5 + 0.5;
          const dotOpacity = 0.03 + pulse * 0.04;
          ctx.fillStyle = `rgba(37, 99, 235, ${dotOpacity})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center pt-32 pb-24 section-container overflow-hidden">
      {/* Animated grid canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-[800px] h-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.04),transparent)] pointer-events-none"
      />

      <motion.div
        className="relative z-10 max-w-4xl space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Small positioning label */}
        <motion.div variants={childVariants}>
          <div className="inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.14em] text-[#9CA3AF]">
            <span className="uppercase">
              UI/UX
              <span className="text-[#D1D5DB] mx-1.5">·</span>
              Product Design
              <span className="text-[#D1D5DB] mx-1.5">·</span>
              Interaction Design
              <span className="text-[#D1D5DB] mx-1.5">·</span>
              Creative Development
            </span>
          </div>
        </motion.div>

        {/* Main statement */}
        <motion.h1
          variants={childVariants}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-[#111827] tracking-[-0.035em] leading-[1.05] max-w-[18ch]"
        >
          Designing interfaces{" "}
          <br className="hidden sm:block" />
          for complex{" "}
          <span className="text-[#2563EB]">digital products.</span>
        </motion.h1>

        {/* Supporting narrative */}
        <motion.p
          variants={childVariants}
          className="text-base sm:text-lg text-[#4B5563] font-normal leading-[1.7] max-w-[52ch]"
        >
          I design and build interfaces for AI products, developer tools, real-time systems, and data-driven platforms — turning complex technology into clear, considered experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={childVariants}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#111827] text-[#FDFDFC] font-semibold text-sm hover:bg-[#2563EB] transition-all duration-300"
          >
            Explore selected work
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 14 14"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 1v12M1 7l6 6 6-6" />
            </svg>
          </a>

          <a
            href="https://github.com/rishabhhgit"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E5E7EB] bg-transparent text-[#4B5563] font-medium text-sm hover:text-[#111827] hover:border-[#D1D5DB] transition-all duration-300"
          >
            GitHub
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 12 12"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 11L11 1M11 1H4M11 1v7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-[#D1D5DB] to-transparent relative overflow-hidden">
          <div className="absolute w-full h-3 bg-[#2563EB]/40 animate-[float_2.5s_ease-in-out_infinite]" />
        </div>
      </motion.div>
    </section>
  );
}
