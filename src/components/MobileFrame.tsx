import React from 'react';
import { cn } from '../lib/utils';
import { Battery, Wifi, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, className, title }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">{title}</span>
      <div className={cn("mobile-mockup bg-white", className)}>
        {/* Status Bar */}
        <div className="absolute top-0 w-full h-12 flex items-center justify-between px-8 z-50 pointer-events-none">
          <span className="text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50" />

        {/* Content */}
        <div className="h-full pt-12">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50" />
      </div>
    </div>
  );
};
