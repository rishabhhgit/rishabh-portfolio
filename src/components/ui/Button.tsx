'use client';

import React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  children,
  className = '',
  onClick,
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer';
  
  const variants: Record<string, string> = {
    primary: 'bg-white text-black hover:bg-[#e4e4e7] rounded-lg',
    secondary: 'border border-[#27272a] bg-[#0f0f11] text-white hover:bg-[#161619] hover:border-[#3f3f46] rounded-lg',
    ghost: 'text-[#a1a1aa] hover:text-white bg-transparent group',
  };
  
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm tracking-wide',
    md: 'px-6 py-3 text-sm tracking-wide',
    lg: 'px-8 py-4 text-base tracking-wide',
  };

  const ghostSizes: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-sm tracking-wide',
    lg: 'text-base',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${variant === 'ghost' ? ghostSizes[size] : sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {variant === 'ghost' && (
        <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClassName} target={target} rel={rel} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClassName} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}>
      {content}
    </button>
  );
};
