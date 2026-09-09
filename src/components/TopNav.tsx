import React from 'react';
import { CloudLightning, Droplets, CloudRain, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveTab } from '../types';

interface TopNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'weather' as ActiveTab, label: 'Live Weather', icon: CloudLightning, color: 'text-blue-500' },
    { id: 'hazard' as ActiveTab, label: 'Hazard Severity Outlook', icon: Droplets, color: 'text-sky-600' },
    { id: 'impact' as ActiveTab, label: 'Impact Forecast', icon: CloudRain, color: 'text-emerald-600' },
    { id: 'infrastructure' as ActiveTab, label: 'Infrastructure Status', icon: Zap, color: 'text-amber-500' },
  ];

  return (
    <nav
      aria-label="Main Map Views"
      className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 z-20 select-none"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <motion.button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-2 px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors duration-200 ${
              isActive
                ? 'bg-[#2A3B4D] text-white font-semibold shadow-inner border border-transparent'
                : 'bg-white text-slate-700 font-medium border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {/* Smooth animated sliding background pill for active tab transition */}
            {isActive && (
              <motion.div
                layoutId="topNavPillIndicator"
                className="absolute inset-0 bg-[#2A3B4D] rounded-lg shadow-inner pointer-events-none"
                transition={{ type: 'spring', stiffness: 450, damping: 34 }}
              />
            )}

            {/* Icon & Label positioned above the animated pill */}
            <div className="relative z-10 flex items-center gap-2">
              <Icon
                className={`w-4 h-4 transition-colors duration-200 ${
                  isActive ? 'text-white' : tab.color
                }`}
              />
              <span
                className={`text-sm tracking-tight transition-colors duration-200 ${
                  isActive ? 'text-white font-semibold' : 'text-slate-700 font-medium'
                }`}
              >
                {tab.label}
              </span>
            </div>
          </motion.button>
        );
      })}
    </nav>
  );
};

