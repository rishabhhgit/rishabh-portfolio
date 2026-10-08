"use client";

import React from "react";
import { motion } from "framer-motion";

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export const RevealText = ({
  children,
  className = "",
  delay = 0,
}: RevealTextProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    transition={{
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: delay / 1000,
    }}
  >
    {children}
  </motion.div>
);
