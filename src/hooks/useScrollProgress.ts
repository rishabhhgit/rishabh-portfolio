"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      if (documentHeight === windowHeight) {
        setProgress(0);
        return;
      }
      
      const currentProgress = scrollY / (documentHeight - windowHeight);
      setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return progress;
}
