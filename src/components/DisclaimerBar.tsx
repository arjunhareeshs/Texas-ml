import React from 'react';

interface DisclaimerBarProps {
  onOpenDisclaimer: () => void;
}

export const DisclaimerBar: React.FC<DisclaimerBarProps> = ({ onOpenDisclaimer }) => {
  return (
    <footer aria-label="Disclaimer" className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-xs border-t border-slate-200/90 py-1 px-4 flex items-center justify-center text-[11px] text-slate-700 select-none shadow-2xs">
      <div className="flex items-center gap-1.5 truncate text-center">
        <span className="font-bold text-slate-900">Disclaimer:</span>
        <span className="text-slate-600 truncate">
          Data presented on this map is for situational awareness only and may include delays or incomplete reporting. By using this site, you agree to the TDIS terms.
        </span>
        <button
          onClick={onOpenDisclaimer}
          className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 ml-1 cursor-pointer shrink-0 transition-colors"
        >
          View full disclaimer &rarr;
        </button>
      </div>
    </footer>
  );
};

