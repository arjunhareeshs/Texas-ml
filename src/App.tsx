import React, { useState, useRef } from 'react';
import type { Map as MapLibreMap } from 'maplibre-gl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActiveTab, BasemapStyle } from './types';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { MapControls } from './components/MapControls';
import { RightControlCard } from './components/RightControlCard';
import { LeftOverlayCard } from './components/LeftOverlayCard';
import { DisclaimerBar } from './components/DisclaimerBar';
import { MapScaleBar } from './components/MapScaleBar';
import { Modals } from './components/Modals';
import { MapView } from './components/MapView';
import { QuickToolsBar } from './components/QuickToolsBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('hazard');
  const [currentStyle, setCurrentStyle] = useState<BasemapStyle>('streets');
  const [timeWindow, setTimeWindow] = useState<'3h' | '6h' | '12h' | '24h'>('3h');
  const [hazardSublayer, setHazardSublayer] = useState<'precipitation' | 'floodhub'>('precipitation');
  const [infraSublayer, setInfraSublayer] = useState<'county' | 'zip' | 'roads'>('county');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);

  // Map control callbacks
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetBearing = () => {
    mapInstanceRef.current?.resetNorthPitch({ duration: 800 });
  };

  const handleSelectCounty = (lat: number, lng: number, zoom: number = 8.5) => {
    setSelectedCoords({ lat, lng, zoom });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 relative font-sans">
      {/* 1. Left Sidebar (Fixed 300px width) */}
      <Sidebar
        activeTab={activeTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      {/* 2. Map View Area (Flex fill 100% height) */}
      <main className="flex-1 h-full relative overflow-hidden">
        {/* Full-screen GIS Canvas */}
        <MapView
          activeTab={activeTab}
          currentStyle={currentStyle}
          timeWindow={timeWindow}
          hazardSublayer={hazardSublayer}
          infraSublayer={infraSublayer}
          selectedCoords={selectedCoords}
          onMapReady={(map) => {
            mapInstanceRef.current = map;
          }}
        />

        {/* Sidebar Collapse/Expand Toggle Button (Top-left of map canvas, matching Screenshot) */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className="absolute top-3 left-3 z-30 w-8 h-8 bg-white rounded-md shadow-xs border border-slate-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-700" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Top Center Pill Navigation */}
        <TopNav activeTab={activeTab} onChangeTab={setActiveTab} />

        {/* Left Quick GIS Tools Bar (Wildfire, Damage Assessment, Trees Classification, Drainage Management) */}
        <QuickToolsBar />

        {/* Top Right Custom Map Controls (Style switcher, Zoom, Compass, Fullscreen) */}
        <MapControls
          currentStyle={currentStyle}
          onChangeStyle={setCurrentStyle}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetBearing={handleResetBearing}
        />

        {/* Right Floating Control Card (Active layer details, Info badge, Time window, Legend) */}
        <RightControlCard
          activeTab={activeTab}
          timeWindow={timeWindow}
          onChangeTimeWindow={setTimeWindow}
          hazardSublayer={hazardSublayer}
          onChangeHazardSublayer={setHazardSublayer}
          infraSublayer={infraSublayer}
          onChangeInfraSublayer={setInfraSublayer}
          onOpenInfoModal={() => setActiveModal('info')}
        />

        {/* Left Floating Overlay Card (Contextual statistics, Customer outages count, County search) */}
        <LeftOverlayCard
          activeTab={activeTab}
          onSelectCounty={handleSelectCounty}
        />

        {/* 100 mi Map Scale Bar */}
        <MapScaleBar isOverlayVisible={activeTab === 'impact' || activeTab === 'infrastructure'} />

        {/* Bottom Disclaimer Bar */}
        <DisclaimerBar onOpenDisclaimer={() => setActiveModal('disclaimer')} />
      </main>

      {/* Modal Dialogs for TDIS info, About, Intake, Contact, and Disclaimer */}
      <Modals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        infoTab={activeTab}
      />
    </div>
  );
}
