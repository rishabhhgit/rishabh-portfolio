"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element = Element>(options?: IntersectionObserverInit): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  const root = options?.root;
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(element);
      }
    }, { root, rootMargin, threshold });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [root, rootMargin, threshold]);

  return [ref, inView];
}
