import React from 'react';
import { Layers, Info, ExternalLink, Mail, FileText, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenModal: (modalName: 'about' | 'projects' | 'intake' | 'contact') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  isCollapsed,
  onToggleCollapse,
  onOpenModal,
}) => {
  // Content dynamic per tab matching screenshots
  const getTabContent = () => {
    switch (activeTab) {
      case 'hazard':
        return {
          title: 'Hazard Severity Outlook',
          subtitle: 'HSI hazard severity layers',
          body: (
            <>
              HSI layers provide short term, predictive metrics of expected hazard severity. Values are dimensionless and scaled so that{' '}
              <strong className="font-semibold text-slate-900">~1.0 ≈ a significant planning threshold</strong> for that hazard; higher values indicate greater severity.
            </>
          ),
        };
      case 'impact':
        return {
          title: 'Impact Forecast',
          subtitle: 'Flash flood outlook (LTS)',
          body: (
            <>
              This view shows where an approaching storm is most likely to produce severe flash flood impacts, using an ordinal severity scale on H3 hex cells. Use alongside—not in place of—official National Weather Service flood warnings.
            </>
          ),
        };
      case 'infrastructure':
        return {
          title: 'Infrastructure Status',
          subtitle: 'Grid & Lifeline Critical Facilities',
          body: (
            <>
              <strong className="font-semibold text-slate-900">Infrastructure Status</strong> provides comprehensive situational awareness for disaster response operations, lifeline asset monitoring, and utility resilience.
            </>
          ),
        };
      case 'weather':
      default:
        return {
          title: 'Live Weather',
          subtitle: 'Real-time radar & meteorological observations',
          body: (
            <>
              Live Doppler radar reflectivity, precipitation accumulation, and severe weather warnings across Texas and adjacent regions for immediate tactical response.
            </>
          ),
        };
    }
  };

  const content = getTabContent();

  if (isCollapsed) {
    return null;
  }

  return (
    <aside className="w-[300px] h-screen bg-white flex flex-col shrink-0 border-r border-slate-200 z-20 select-none relative shadow-sm">
      {/* Dark Navy Header (#2C3E50) */}
      <div className="h-[60px] bg-[#2C3E50] px-4 flex items-center text-white shrink-0 shadow-sm border-b border-slate-700/50">
        <div className="flex items-center gap-2.5">
          {/* TDIS Hexagon Logo */}
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 40 40" className="w-7 h-7 text-white" fill="none">
              <polygon
                points="20,3 36,12 36,28 20,37 4,28 4,12"
                stroke="white"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M13 20 L19 25 L27 15"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[19px] tracking-wider text-white leading-tight">TDIS</span>
            <span className="text-[7.5px] uppercase tracking-wider text-slate-300 font-semibold leading-none">
              TEXAS DISASTER INFORMATION SYSTEM
            </span>
          </div>
        </div>
      </div>

      {/* Main Dynamic Content Area with Smooth Transitions */}
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <h1
              className="text-2xl font-extrabold text-[#1E293B] tracking-tight mb-2"
              style={{ letterSpacing: '-0.02em', fontSize: '22px' }}
            >
              {content.title}
            </h1>

            {content.subtitle && (
              <h2 className="text-sm text-[#64748B] font-normal leading-relaxed mb-3">
                {content.subtitle}
              </h2>
            )}

            <div className="text-sm text-[#64748B] font-normal leading-[1.55]">
              {content.body}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Menu Navigation Links at the Bottom */}
      <div className="px-4 py-3 space-y-1.5 border-t border-slate-100 bg-white shrink-0">
        <button
          onClick={() => onOpenModal('projects')}
          className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] font-semibold text-xs text-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
        >
          <span>Projects/Tools List</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
        </button>

        <button
          onClick={() => onOpenModal('about')}
          className="w-full text-left px-3.5 py-2 rounded-lg hover:bg-slate-50 font-medium text-xs text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
        >
          <span>About TDIS</span>
          <Info className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => onOpenModal('intake')}
          className="w-full text-left px-3.5 py-2 rounded-lg hover:bg-slate-50 font-medium text-xs text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
        >
          <span>Application Intake</span>
          <FileText className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={() => onOpenModal('contact')}
          className="w-full text-left px-3.5 py-2 rounded-lg hover:bg-slate-50 font-medium text-xs text-slate-700 transition-colors flex items-center justify-between cursor-pointer"
        >
          <span>Contact Us</span>
          <Mail className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Texas A&M Footer Banner (Dark Navy Slate matching screenshot with user badge) */}
      <div className="h-[48px] bg-[#1E293B] px-3.5 flex items-center justify-between text-white shrink-0 select-none border-t border-slate-700/50">
        {/* User avatar circle with star badge */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-[#0F172A] border border-slate-600 flex items-center justify-center text-white text-xs font-bold font-sans">
              N
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-slate-700 rounded-full border border-slate-900 flex items-center justify-center">
              <Star className="w-2 h-2 text-white fill-white" />
            </div>
          </div>

          <div className="w-[1px] h-5 bg-slate-700 mx-0.5" />

          {/* Texas A&M Logo */}
          <div className="flex items-center gap-2">
            <div className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-serif font-black tracking-tight text-white border border-white/20">
              ATM
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[11px] tracking-wide text-white leading-tight">
                TEXAS A&amp;M
              </span>
              <span className="text-[7.5px] uppercase tracking-wider text-slate-300 leading-none">
                UNIVERSITY
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
