"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCE_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeTo = (query: string) => (onChange: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

const subscribeFine = subscribeTo(FINE_POINTER);
const subscribeReduce = subscribeTo(REDUCE_MOTION);
const readFine = () => window.matchMedia(FINE_POINTER).matches;
const readReduce = () => window.matchMedia(REDUCE_MOTION).matches;
const serverFalse = () => false;

/**
 * Desktop-only dot + ring cursor. The ring trails the pointer and swells
 * with a mono label over elements carrying `data-cursor="VIEW"`.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  const fine = useSyncExternalStore(subscribeFine, readFine, serverFalse);
  const reduce = useSyncExternalStore(subscribeReduce, readReduce, serverFalse);
  const active = fine && !reduce;

  useEffect(() => {
    if (!active) return;

    document.body.classList.add("cursor-hidden");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button"
      ) as HTMLElement | null;
      if (target) {
        setLabel(target.getAttribute("data-cursor") ?? "");
        setHovering(true);
      } else {
        setLabel(null);
        setHovering(false);
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("cursor-hidden");
    };
  }, [active]);

  if (!active) return null;

  const showLabel = label !== null && label !== "";
  const size = showLabel ? 86 : hovering ? 48 : 34;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[10001] pointer-events-none w-1.5 h-1.5 rounded-full bg-accent"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[10001] pointer-events-none flex items-center justify-center rounded-full border border-accent/70 backdrop-blur-sm transition-[width,height,background-color] duration-300 ease-out"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          width: size,
          height: size,
          backgroundColor: showLabel
            ? "rgba(242,236,221,0.94)"
            : hovering
              ? "rgba(201,162,39,0.12)"
              : "transparent",
        }}
      >
        {showLabel ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent text-center leading-tight px-2">
            {label}
          </span>
        ) : null}
      </div>
    </>
  );
}
