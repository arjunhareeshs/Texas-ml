import React, { useState } from 'react';
import {
  GripVertical,
  Droplets,
  CloudRain,
  Zap,
  CloudLightning,
  Info,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Waves,
  Building,
  AlertTriangle,
  MapPin,
  Play,
  Pause,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';

interface RightControlCardProps {
  activeTab: ActiveTab;
  timeWindow: '3h' | '6h' | '12h' | '24h';
  onChangeTimeWindow: (w: '3h' | '6h' | '12h' | '24h') => void;
  hazardSublayer: 'precipitation' | 'floodhub';
  onChangeHazardSublayer: (layer: 'precipitation' | 'floodhub') => void;
  infraSublayer: 'county' | 'zip' | 'roads';
  onChangeInfraSublayer: (layer: 'county' | 'zip' | 'roads') => void;
  onOpenInfoModal: (type: ActiveTab) => void;
}

export const RightControlCard: React.FC<RightControlCardProps> = ({
  activeTab,
  timeWindow,
  onChangeTimeWindow,
  hazardSublayer,
  onChangeHazardSublayer,
  infraSublayer,
  onChangeInfraSublayer,
  onOpenInfoModal,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [impactFilter, setImpactFilter] = useState<'high' | 'very-high'>('high');
  const [isPlayingRadar, setIsPlayingRadar] = useState(true);
  const [radarTimeStep, setRadarTimeStep] = useState(4); // 0 to 4 (Now)

  return (
    <div className="absolute bottom-10 right-3 z-20 w-[320px] bg-white rounded-xl shadow-xl border border-slate-200/90 overflow-hidden select-none transition-all duration-200">
      {/* Card Header matching screenshot */}
      <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 bg-white">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
          {activeTab === 'hazard' && <Droplets className="w-4 h-4 text-blue-600" />}
          {activeTab === 'impact' && <CloudRain className="w-4 h-4 text-blue-600" />}
          {activeTab === 'infrastructure' && <Zap className="w-4 h-4 text-amber-500" />}
          {activeTab === 'weather' && <CloudLightning className="w-4 h-4 text-indigo-600" />}

          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {activeTab === 'hazard' && 'Precipitation HSI'}
              {activeTab === 'impact' && 'Impact Forecast'}
              {activeTab === 'infrastructure' && 'Power Outages'}
              {activeTab === 'weather' && 'Live Radar Mosaic'}
            </span>
            <span className="text-[10.5px] text-slate-400 font-normal leading-tight">
              {activeTab === 'hazard' && `${timeWindow} window`}
              {activeTab === 'impact' && '24-hour flash flood outlook'}
              {activeTab === 'infrastructure' && 'Infrastructure Status'}
              {activeTab === 'weather' && 'NEXRAD Doppler Radar'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Blue Info Pill Button matching screenshot */}
          <button
            onClick={() => onOpenInfoModal(activeTab)}
            className="flex items-center gap-1 bg-[#1D70B8] hover:bg-[#005ea5] text-white px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors shadow-xs cursor-pointer"
            title="Layer Methodology & Information"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Info</span>
          </button>

          {/* Light Blue Collapse Chevron Button matching screenshot */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 rounded-md bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand panel' : 'Collapse panel'}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-3.5 space-y-4 max-h-[calc(100vh-170px)] overflow-y-auto text-slate-800 text-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* ============================================================ */}
              {/* 1. HAZARD SEVERITY OUTLOOK CONTENT */}
              {/* ============================================================ */}
              {activeTab === 'hazard' && (
                <>
                  {/* Hazard Layer Selection */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-900 block mb-2">
                      Hazard Layer
                    </label>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => onChangeHazardSublayer('precipitation')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          hazardSublayer === 'precipitation'
                            ? 'bg-[#2C3E50] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Droplets className={`w-3.5 h-3.5 ${hazardSublayer === 'precipitation' ? 'text-blue-300' : 'text-blue-500'}`} />
                          <span>Precipitation</span>
                        </div>
                        {hazardSublayer === 'precipitation' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>

                      <button
                        onClick={() => onChangeHazardSublayer('floodhub')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          hazardSublayer === 'floodhub'
                            ? 'bg-[#2C3E50] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Waves className={`w-3.5 h-3.5 ${hazardSublayer === 'floodhub' ? 'text-white' : 'text-sky-600'}`} />
                          <span>Flood Hub</span>
                        </div>
                        {hazardSublayer === 'floodhub' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>
                    </div>
                  </div>

                  {/* Time Window Selection */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-900 block mb-2">
                      Time Window
                    </label>
                    <div className="grid grid-cols-4 gap-1 bg-slate-50 border border-slate-200/70 p-1 rounded-lg">
                      {(['3h', '6h', '12h', '24h'] as const).map((tw) => (
                        <button
                          key={tw}
                          onClick={() => onChangeTimeWindow(tw)}
                          className={`py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                            timeWindow === tw
                              ? 'bg-[#2C3E50] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {tw === '3h' && <Clock className="w-3 h-3 mr-1 text-slate-300" />}
                          <span>{tw}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Intensity Scale */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-2">
                      <span className="font-bold text-slate-900">Intensity Scale</span>
                      <span className="text-[10px] text-slate-400 font-normal">Low → High</span>
                    </div>

                    {/* Color blocks bar */}
                    <div className="grid grid-cols-6 gap-0.5 rounded overflow-hidden mb-3 text-center text-[10.5px] font-bold text-white shadow-2xs">
                      <div className="bg-[#1d4ed8] py-0.5">&gt;0</div>
                      <div className="bg-[#2563eb] py-0.5">0.25</div>
                      <div className="bg-[#4338ca] py-0.5">0.50</div>
                      <div className="bg-[#7e22ce] py-0.5">1.00</div>
                      <div className="bg-[#a21caf] py-0.5">1.50</div>
                      <div className="bg-[#b91c1c] py-0.5">2.0+</div>
                    </div>

                    {/* Categorical labels with soft tinted cards matching screenshot */}
                    <div className="grid grid-cols-2 gap-2 text-[11.5px] text-slate-700">
                      <div className="bg-[#eff6ff] rounded-lg px-2.5 py-1.5 flex items-center gap-2 border border-blue-100/50">
                        <span className="w-2 h-2 rounded-full bg-[#3b82f6] shrink-0" />
                        <span className="font-medium text-slate-800">Minimal</span>
                      </div>
                      <div className="bg-[#eff6ff] rounded-lg px-2.5 py-1.5 flex items-center gap-2 border border-blue-100/50">
                        <span className="w-2 h-2 rounded-full bg-[#1d4ed8] shrink-0" />
                        <span className="font-medium text-slate-800">Elevated</span>
                      </div>
                      <div className="bg-[#f5f3ff] rounded-lg px-2.5 py-1.5 flex items-center gap-2 border border-purple-100/50">
                        <span className="w-2 h-2 rounded-full bg-[#7c3aed] shrink-0" />
                        <span className="font-medium text-slate-800">Significant</span>
                      </div>
                      <div className="bg-[#fdf2f8] rounded-lg px-2.5 py-1.5 flex items-center gap-2 border border-pink-100/50">
                        <span className="w-2 h-2 rounded-full bg-[#c026d3] shrink-0" />
                        <span className="font-medium text-slate-800">Major</span>
                      </div>
                      <div className="bg-[#fef2f2] rounded-lg px-2.5 py-1.5 flex items-center gap-2 col-span-2 border border-red-100/50">
                        <span className="w-2 h-2 rounded-full bg-[#dc2626] shrink-0" />
                        <span className="font-medium text-slate-800">Extreme</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[10.5px] text-slate-400 pt-1 border-t border-slate-100">
                    Click hex for details
                  </div>
                </>
              )}

          {/* ============================================================ */}
          {/* 2. IMPACT FORECAST CONTENT */}
          {/* ============================================================ */}
          {activeTab === 'impact' && (
            <>
              {/* Informational Callout Box */}
              <div className="bg-[#FFFBEB] border border-[#FDE68A] p-2.5 rounded-lg text-[11px] leading-relaxed text-[#92400E]">
                <strong>Anticipatory planning.</strong> LTS shows forecasted flash-flood threat over the next 24 hours—not observed flooding or damage. Use for early situational awareness and preparatory action. Does not replace official NWS flood warnings.
              </div>

              {/* Threat Severity Gradient */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 mb-1.5">
                  <span>Threat severity</span>
                  <span className="text-slate-400 font-normal">4 → 5</span>
                </div>
                <div className="h-4 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] relative mb-2.5 shadow-2xs flex items-center justify-between px-2 text-[10px] font-bold text-white">
                  <span>4</span>
                  <span>5</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="font-semibold">4</span>
                    <span>Potentially High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="font-semibold">5</span>
                    <span>Potentially Very High</span>
                  </div>
                </div>
              </div>

              {/* Potential Impact Estimates */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                    Potential Impact (Estimates)
                  </span>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors" title="Refresh modeled run">
                    <RotateCw className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug mb-2.5">
                  Counties at or above the selected LTS level on the latest run (24-hour forecast outlook). Figures are modeled potential impact—anticipatory planning only; not observed damage or ground truth.
                </p>

                {/* Filter Pills */}
                <div className="flex gap-1.5 mb-2.5">
                  <button
                    onClick={() => setImpactFilter('high')}
                    className={`flex-1 py-1 rounded text-[11px] font-semibold transition-all ${
                      impactFilter === 'high'
                        ? 'bg-[#F59E0B] text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ≥ Potentially High
                  </button>
                  <button
                    onClick={() => setImpactFilter('very-high')}
                    className={`flex-1 py-1 rounded text-[11px] font-semibold transition-all ${
                      impactFilter === 'very-high'
                        ? 'bg-[#EF4444] text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    ≥ Potentially Very High
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 mb-2">
                  Run: 2026-09-08 · {impactFilter === 'high' ? '5 counties in scope' : '0 counties in scope'}
                </div>

                {/* Buildings count card */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold text-slate-700 text-xs">Buildings (structures)</span>
                  </div>
                  <span className="font-bold text-base text-slate-900">
                    {impactFilter === 'high' ? '203' : '0'}
                  </span>
                </div>

                {/* Critical Facilities card */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Critical facilities</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div className="bg-white rounded py-1 border border-slate-100">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Hospitals</span>
                      <span className="font-bold text-sm text-slate-800">0</span>
                    </div>
                    <div className="bg-white rounded py-1 border border-slate-100">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Grocery</span>
                      <span className="font-bold text-sm text-slate-800">0</span>
                    </div>
                    <div className="bg-white rounded py-1 border border-slate-100">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Emergency</span>
                      <span className="font-bold text-sm text-slate-800">0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                Click hex for forecast details (24-hour outlook)
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 3. INFRASTRUCTURE STATUS CONTENT */}
          {/* ============================================================ */}
          {activeTab === 'infrastructure' && (
            <>
              {/* Data Layer Buttons */}
              <div>
                <label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Data Layer
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => onChangeInfraSublayer('county')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      infraSublayer === 'county'
                        ? 'bg-[#2C3E50] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className={`w-3.5 h-3.5 ${infraSublayer === 'county' ? 'text-white' : 'text-amber-500'}`} />
                      <span>Power Outages</span>
                    </div>
                    {infraSublayer === 'county' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>

                  <button
                    onClick={() => onChangeInfraSublayer('zip')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      infraSublayer === 'zip'
                        ? 'bg-[#2C3E50] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-3.5 h-3.5 ${infraSublayer === 'zip' ? 'text-white' : 'text-orange-500'}`} />
                      <span>Power Outages by Zip</span>
                    </div>
                    {infraSublayer === 'zip' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>

                  <button
                    onClick={() => onChangeInfraSublayer('roads')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      infraSublayer === 'roads'
                        ? 'bg-[#2C3E50] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-3.5 h-3.5 ${infraSublayer === 'roads' ? 'text-white' : 'text-red-500'}`} />
                      <span>Road Weather Hazard Alerts</span>
                    </div>
                    {infraSublayer === 'roads' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                </div>
              </div>

              {/* Customers Out Legend */}
              <div>
                <label className="text-[11px] font-bold text-slate-900 block mb-2">
                  Customers Out
                </label>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa]" />
                    <span>1 - 50</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
                    <span>51 - 100</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
                    <span>101 - 250</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                    <span>251 - 500</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16]" />
                    <span>501 - 1,000</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                    <span>1,001 - 1,500</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                    <span>1,501 - 2,000</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b45309]" />
                    <span>2,001 - 3,000</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
                    <span>3,001+</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>Data source:</span>
                  <span className="font-semibold text-slate-600">Poweroutage.com</span>
                </div>
                <div className="text-center">Click areas for outage details</div>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 4. LIVE WEATHER CONTENT */}
          {/* ============================================================ */}
          {activeTab === 'weather' && (
            <>
              <div>
                <label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Radar Playback
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setIsPlayingRadar(!isPlayingRadar)}
                    className="w-8 h-8 rounded-lg bg-[#2C3E50] text-white flex items-center justify-center hover:bg-slate-700 transition-colors shrink-0"
                  >
                    {isPlayingRadar ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-1">
                      <span>-60m</span>
                      <span>-30m</span>
                      <span className="text-emerald-600 font-bold">Now</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4"
                      value={radarTimeStep}
                      onChange={(e) => setRadarTimeStep(+e.target.value)}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2C3E50]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-900 block mb-1.5">
                  Reflectivity Scale (dBZ)
                </label>
                <div className="h-3 rounded bg-gradient-to-r from-emerald-300 via-yellow-400 via-orange-500 to-purple-600 mb-1" />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>10 Light</span>
                  <span>30 Moderate</span>
                  <span>50 Heavy</span>
                  <span>65+ Severe</span>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700 text-[11px] block mb-1">
                  Active Regional Advisories
                </span>
                <span className="text-[10px] text-slate-500 leading-snug">
                  High precipitation cells traversing Southeast Texas &amp; Upper Gulf coastal waters.
                </span>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                Data source: National Weather Service (NWS) NEXRAD
              </div>
            </>
          )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
