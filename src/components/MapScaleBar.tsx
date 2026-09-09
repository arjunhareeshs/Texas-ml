import React from 'react';

interface MapScaleBarProps {
  isOverlayVisible?: boolean;
}

export const MapScaleBar: React.FC<MapScaleBarProps> = ({ isOverlayVisible = false }) => {
  return (
    <div
      className={`absolute bottom-8 z-10 bg-white/90 backdrop-blur-xs border border-slate-300 px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 select-none shadow-2xs transition-all duration-200 ${
        isOverlayVisible ? 'left-[302px]' : 'left-3'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-12 h-1 bg-slate-700 border-x-2 border-slate-700 relative">
          <div className="absolute -top-1 left-0 w-0.5 h-3 bg-slate-700" />
          <div className="absolute -top-1 right-0 w-0.5 h-3 bg-slate-700" />
        </div>
        <span className="font-semibold">100 mi</span>
      </div>
    </div>
  );
};
