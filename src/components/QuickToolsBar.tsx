import React, { useState } from 'react';
import { Flame, ClipboardCheck, Trees, Waves, ExternalLink } from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  hoverBg: string;
  activeBg: string;
  activeRing: string;
}

export const QuickToolsBar: React.FC = () => {
  const [hoveredTool, setHoveredTool] = useState<ToolItem | null>(null);

  const tools: ToolItem[] = [
    {
      id: 'wildfire',
      name: 'Wildfire',
      subtitle: 'Texas Wildfire Risk Assessment Portal (TxWRAP)',
      url: 'https://texaswildfirerisk.com/',
      icon: Flame,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
      hoverBg: 'hover:bg-orange-100',
      activeBg: 'bg-orange-100',
      activeRing: 'ring-2 ring-orange-400/40',
    },
    {
      id: 'damage',
      name: 'Damage Assessment',
      subtitle: 'National Risk Index & Disaster Damage Assessment',
      url: 'https://hazards.fema.gov/nri/map',
      icon: ClipboardCheck,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100',
      activeBg: 'bg-blue-100',
      activeRing: 'ring-2 ring-blue-400/40',
    },
    {
      id: 'trees',
      name: 'Trees Classification',
      subtitle: 'Texas Forest Information & Tree Canopy Map',
      url: 'https://texasforestinfo.tamu.edu/',
      icon: Trees,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      hoverBg: 'hover:bg-emerald-100',
      activeBg: 'bg-emerald-100',
      activeRing: 'ring-2 ring-emerald-400/40',
    },
    {
      id: 'drainage',
      name: 'Drainage Management',
      subtitle: 'Texas Flood & Watershed Drainage Viewer',
      url: 'https://texasflood.org/',
      icon: Waves,
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      hoverBg: 'hover:bg-cyan-100',
      activeBg: 'bg-cyan-100',
      activeRing: 'ring-2 ring-cyan-400/40',
    },
  ];

  return (
    <div className="absolute top-14 left-3 z-30 select-none pointer-events-auto">
      {/* 
        Fixed-width, rigid vertical container.
        Eliminated any dynamic width or scale transforms that could trigger jitter/shaking.
      */}
      <div className="w-[52px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-1.5 flex flex-col items-center gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isHovered = hoveredTool?.id === tool.id;

          return (
            <div
              key={tool.id}
              className="relative w-10 h-10 flex items-center justify-center"
              onMouseEnter={() => setHoveredTool(tool)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              {/* Tooltip on top of the hovered tool, aligned to the left edge to never get clipped by the sidebar */}
              {isHovered && (
                <div
                  className="absolute bottom-full mb-2 left-0 pointer-events-none z-50 whitespace-nowrap"
                  style={{ willChange: 'opacity' }}
                >
                  <div className="bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xl flex items-center gap-1.5 border border-slate-700 animate-in fade-in duration-100">
                    <span>{tool.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                    {/* Downward triangle arrow aligned above the icon */}
                    <div className="absolute -bottom-1 left-4 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                  </div>
                </div>
              )}

              {/* Stable Interactive Anchor (no layout-shifting scales) */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                  tool.bgColor
                } ${tool.hoverBg} ${isHovered ? `${tool.activeBg} ${tool.activeRing}` : ''}`}
                title={`${tool.name} (Opens map in new tab)`}
                aria-label={tool.name}
              >
                <Icon className={`w-5 h-5 ${tool.iconColor}`} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
