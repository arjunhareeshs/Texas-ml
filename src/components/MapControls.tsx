import React, { useState, useRef, useEffect } from 'react';
import { Layers, Plus, Minus, Compass, Maximize, Minimize } from 'lucide-react';
import { BasemapStyle } from '../types';

interface MapControlsProps {
  currentStyle: BasemapStyle;
  onChangeStyle: (style: BasemapStyle) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetBearing: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  currentStyle,
  onChangeStyle,
  onZoomIn,
  onZoomOut,
  onResetBearing,
}) => {
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const styleOptions: { id: BasemapStyle; label: string }[] = [
    { id: 'streets', label: 'Streets' },
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'satellite', label: 'Satellite' },
    { id: 'satellite-streets', label: 'Satellite Streets' },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLayersOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5 select-none" ref={dropdownRef}>
      {/* Control Buttons Vertical Stack */}
      <div className="bg-white rounded-md shadow-md border border-slate-200 overflow-hidden flex flex-col w-[32px] divide-y divide-slate-200">
        {/* Map style dropdown selector button */}
        <button
          onClick={() => setIsLayersOpen(!isLayersOpen)}
          title="Basemap Layer Styles"
          className={`h-8 w-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors ${
            isLayersOpen ? 'bg-slate-100 text-slate-900' : ''
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Zoom In */}
        <button
          onClick={onZoomIn}
          title="Zoom In"
          className="h-8 w-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors active:bg-slate-200"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={onZoomOut}
          title="Zoom Out"
          className="h-8 w-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors active:bg-slate-200"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Compass / Reset Bearing */}
        <button
          onClick={onResetBearing}
          title="Reset Bearing to North"
          className="h-8 w-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors active:bg-slate-200"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          className="h-8 w-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors active:bg-slate-200"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>

      {/* Layer selector dropdown menu matching screenshot 145005.png */}
      {isLayersOpen && (
        <div className="absolute top-0 right-10 w-44 bg-white rounded-md shadow-xl border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
          <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
            Basemap Styles
          </div>
          {styleOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onChangeStyle(opt.id);
                setIsLayersOpen(false);
              }}
              className={`w-full text-left px-3.5 py-1.5 text-[13px] hover:bg-slate-100 transition-colors flex items-center justify-between ${
                currentStyle === opt.id ? 'font-bold text-slate-900 bg-slate-50' : 'font-normal text-slate-700'
              }`}
            >
              <span>{opt.label}</span>
              {currentStyle === opt.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C3E50]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
