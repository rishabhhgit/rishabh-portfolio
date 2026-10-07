"use client";

import React from "react";
import { motion } from "framer-motion";

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: any;
};

export const RevealText = ({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealTextProps) => {
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a smooth, premium feel
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionComponent>
  );
};
