import React from 'react';

type ScrollIndicatorProps = {
  className?: string;
};

export const ScrollIndicator = ({ className = '' }: ScrollIndicatorProps) => {
  return (
    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 ${className}`}>
      <span className="uppercase tracking-widest text-[10px] font-medium text-[#6b6b6b] [writing-mode:vertical-lr]">
        Scroll
      </span>
      <div className="w-[1px] h-12 bg-[#6b6b6b]/30 relative overflow-hidden">
        <div className="w-full h-1/2 bg-emerald-400 absolute top-0 left-0 animate-[scroll-down_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};
