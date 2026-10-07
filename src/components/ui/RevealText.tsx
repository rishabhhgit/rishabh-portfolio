'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
};

export const RevealText = ({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}: RevealTextProps) => {
  const [ref, inView] = useInView({ threshold: 0.15 });

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealed = inView || prefersReducedMotion;

  const style: React.CSSProperties = {
    transitionDuration: '800ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionProperty: 'transform, opacity',
    transitionDelay: `${delay}ms`,
    transform: revealed ? 'translateY(0)' : 'translateY(30px)',
    opacity: revealed ? 1 : 0,
  };

  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
};
