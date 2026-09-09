import React, { useState, useMemo } from 'react';
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Search,
  RotateCw,
  MapPin,
  AlertCircle,
  Building,
} from 'lucide-react';
import { ActiveTab, CountyOutage, ImpactCounty } from '../types';
import { TEXAS_COUNTIES_OUTAGES, IMPACT_COUNTIES, TOTAL_CUSTOMERS_OUT } from '../data/texasData';

interface LeftOverlayCardProps {
  activeTab: ActiveTab;
  onSelectCounty: (lat: number, lng: number, zoom?: number) => void;
}

export const LeftOverlayCard: React.FC<LeftOverlayCardProps> = ({
  activeTab,
  onSelectCounty,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'county' | 'zip' | 'utility'>('county');

  // Filter counties for infrastructure tab
  const filteredCounties = useMemo(() => {
    if (!searchQuery.trim()) return TEXAS_COUNTIES_OUTAGES;
    const q = searchQuery.toLowerCase();
    return TEXAS_COUNTIES_OUTAGES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.fips.includes(q) || c.utility.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filter impact counties
  const filteredImpact = useMemo(() => {
    if (!searchQuery.trim()) return IMPACT_COUNTIES;
    const q = searchQuery.toLowerCase();
    return IMPACT_COUNTIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.fips.includes(q)
    );
  }, [searchQuery]);

  // Only show on impact and infrastructure views (as shown in screenshots 144934 & 144946/145005)
  if (activeTab === 'hazard' || activeTab === 'weather') {
    return null;
  }

  return (
    <div className="absolute bottom-10 left-3 z-20 w-[290px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden select-none transition-all duration-200">
      {/* ============================================================ */}
      {/* 1. INFRASTRUCTURE STATUS VIEW */}
      {/* ============================================================ */}
      {activeTab === 'infrastructure' && (
        <>
          {/* Card Header */}
          <div className="px-3 py-2.5 flex items-center justify-between border-b border-slate-100 bg-white">
            <div className="flex items-center gap-1.5">
              <GripVertical className="w-3.5 h-3.5 text-slate-400 cursor-grab" />
              <span className="text-xs font-bold text-slate-900">Summary Statistics</span>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center text-orange-500 transition-colors"
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {!isCollapsed && (
            <div className="p-3 space-y-2.5 text-xs">
              {/* Total Customers Out Banner matching screenshot 145005 */}
              <div className="bg-red-50/70 border border-red-200/80 rounded-lg p-2.5 flex items-center justify-between">
                <span className="font-semibold text-slate-700 text-xs">Total Customers Out:</span>
                <span className="font-bold text-base text-red-600 tracking-tight">
                  {TOTAL_CUSTOMERS_OUT.toLocaleString()}
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search counties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-400 text-slate-800"
                />
              </div>

              {/* Counties Count Header */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                <span className="font-semibold text-slate-700">
                  Counties ({filteredCounties.length})
                </span>
                <span className="italic text-[10px]">Scroll for more</span>
              </div>

              {/* Scrollable County Outage List */}
              <div className="max-h-[220px] overflow-y-auto divide-y divide-slate-100 pr-1 border-t border-b border-slate-100">
                {filteredCounties.length === 0 ? (
                  <div className="py-4 text-center text-slate-400 text-xs">
                    No matching counties found
                  </div>
                ) : (
                  filteredCounties.map((county) => (
                    <button
                      key={county.fips}
                      onClick={() => onSelectCounty(county.lat, county.lng, 8.5)}
                      className="w-full py-1.5 px-1.5 flex items-center justify-between hover:bg-slate-50 rounded transition-colors text-left group"
                    >
                      <div>
                        <span className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                          {county.name}
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          {county.utility}
                        </span>
                      </div>
                      <span className="font-bold text-red-600 group-hover:scale-105 transition-transform">
                        {county.customersOut.toLocaleString()}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* View Mode Footer Segmented Buttons */}
              <div className="pt-1">
                <span className="text-[10px] font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">
                  View Mode
                </span>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-lg text-center text-xs">
                  <button
                    onClick={() => setViewMode('county')}
                    className={`py-1 rounded font-semibold transition-all flex items-center justify-center gap-1 ${
                      viewMode === 'county'
                        ? 'bg-[#2C3E50] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>County</span>
                  </button>
                  <button
                    onClick={() => setViewMode('zip')}
                    className={`py-1 rounded font-semibold transition-all ${
                      viewMode === 'zip'
                        ? 'bg-[#2C3E50] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Zip
                  </button>
                  <button
                    onClick={() => setViewMode('utility')}
                    className={`py-1 rounded font-semibold transition-all ${
                      viewMode === 'utility'
                        ? 'bg-[#2C3E50] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Utility
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* 2. IMPACT FORECAST VIEW (Matching Screenshot 144934) */}
      {/* ============================================================ */}
      {activeTab === 'impact' && (
        <>
          {/* Card Header */}
          <div className="px-3 py-2.5 flex items-center justify-between border-b border-slate-100 bg-white">
            <div className="flex items-center gap-1.5">
              <GripVertical className="w-3.5 h-3.5 text-slate-400 cursor-grab" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 leading-tight">TIF by county</span>
                <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[190px]">
                  Potentially High &amp; Potentially Very High · latest r...
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center text-blue-500 transition-colors"
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {!isCollapsed && (
            <div className="p-3 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Run: 2026-09-08 · 5 counties</span>
                <button className="text-blue-500 hover:text-blue-700" title="Refresh list">
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>

              {/* Informational Callout */}
              <div className="text-[11px] text-slate-600 leading-snug bg-slate-50 p-2 rounded-lg border border-slate-200">
                List shows severity <strong>4 (Potentially High)</strong> and <strong>5 (Potentially Very High)</strong> only.
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search county or FIPS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-400 text-slate-800"
                />
              </div>

              <div className="text-[11px] text-slate-500 font-semibold px-0.5">
                Showing {filteredImpact.length} of {IMPACT_COUNTIES.length}
              </div>

              {/* Impact Counties List */}
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-0.5">
                {filteredImpact.map((county) => (
                  <button
                    key={county.fips}
                    onClick={() => onSelectCounty(county.lat, county.lng, 9)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg hover:border-amber-400 hover:shadow-xs transition-all text-left flex items-center justify-between group"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 block">
                          {county.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          FIPS {county.fips} · {county.classification}
                        </span>
                      </div>
                    </div>
                    {/* Badge 4 with orange border/background matching screenshot */}
                    <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-300 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {county.severity}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
