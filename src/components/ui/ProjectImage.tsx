import React from 'react';
import Image from 'next/image';

type ProjectImageProps = {
  src: string;
  alt: string;
  /** Title shown in the window chrome, like a tab label */
  label?: string;
  /** When false, renders flush (no own border) — for use inside bordered cards */
  framed?: boolean;
  type?: 'browser' | 'desktop' | 'mobile';
  className?: string;
};

export const ProjectImage = ({
  src,
  alt,
  label,
  framed = true,
  type = 'browser',
  className = '',
}: ProjectImageProps) => {
  return (
    <div
      className={`group/img relative overflow-hidden bg-[#121214] transition-colors duration-500 ${
        framed ? 'rounded-xl border border-white/10' : 'rounded-t-xl'
      } ${className}`}
    >
      {/* Window Chrome */}
      {type === 'browser' && (
        <div className="flex h-9 items-center gap-2 border-b border-white/[0.08] bg-[#1a1a1c] px-4">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/85" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/85" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/85" />
          </div>
          {label ? (
            <div className="mx-auto flex max-w-[60%] items-center rounded-md bg-white/[0.05] px-3 py-0.5">
              <span className="truncate font-mono text-[10px] tracking-wide text-[#71717a]">
                {label}
              </span>
            </div>
          ) : (
            <div className="mx-auto h-4 w-1/3 rounded bg-white/5" />
          )}
        </div>
      )}

      {type === 'desktop' && (
        <div className="flex h-8 items-center border-b border-white/10 bg-[#1a1a1c] px-4">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          {label && (
            <span className="mx-auto truncate font-mono text-[10px] text-[#52525b]">
              {label}
            </span>
          )}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
        />
        {/* Depth scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
        />
      </div>
    </div>
  );
};
