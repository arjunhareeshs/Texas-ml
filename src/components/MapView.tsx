import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { Map as MapLibreMap, Popup } from 'maplibre-gl';
import { ActiveTab, BasemapStyle } from '../types';
import { getBasemapStyleSpec } from '../utils/mapStyles';
import {
  TEXAS_CENTER,
  TEXAS_DEFAULT_ZOOM,
  generateTexasHexCells,
  createHexPolygon,
  OUTAGE_POINT_MARKERS,
  IMPACT_COUNTIES,
  TEXAS_COUNTIES_OUTAGES,
} from '../data/texasData';

interface MapViewProps {
  activeTab: ActiveTab;
  currentStyle: BasemapStyle;
  timeWindow: '3h' | '6h' | '12h' | '24h';
  hazardSublayer: 'precipitation' | 'floodhub';
  infraSublayer: 'county' | 'zip' | 'roads';
  selectedCoords?: { lat: number; lng: number; zoom?: number } | null;
  onMapReady?: (map: MapLibreMap) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  activeTab,
  currentStyle,
  timeWindow,
  hazardSublayer,
  infraSublayer,
  selectedCoords,
  onMapReady,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const popupRef = useRef<Popup | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialStyle = getBasemapStyleSpec(currentStyle);

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: TEXAS_CENTER,
      zoom: TEXAS_DEFAULT_ZOOM,
      minZoom: 4,
      maxZoom: 18,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      setIsMapLoaded(true);
      if (onMapReady) onMapReady(map);
      attachDataLayers(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Handle flyTo when user selects a county in the left overlay
  useEffect(() => {
    if (!mapRef.current || !selectedCoords) return;
    mapRef.current.flyTo({
      center: [selectedCoords.lng, selectedCoords.lat],
      zoom: selectedCoords.zoom || 8.5,
      essential: true,
      duration: 1200,
    });
  }, [selectedCoords]);

  // Handle Basemap Style Switcher (map.setStyle)
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;

    const map = mapRef.current;
    const newStyle = getBasemapStyleSpec(currentStyle);

    // When style changes, reattach our vector/geojson layers after style is loaded
    map.setStyle(newStyle);

    map.once('style.load', () => {
      attachDataLayers(map);
    });
  }, [currentStyle]);

  // Update visibility and filters when activeTab or sublayers change
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;
    updateLayerVisibilities();
  }, [activeTab, isMapLoaded, hazardSublayer, infraSublayer, timeWindow]);

  // Function to attach all custom GIS data layers
  const attachDataLayers = useCallback((map: MapLibreMap) => {
    // 1. Add Texas County Outline Grids (simulated county polygons for visual fidelity)
    if (!map.getSource('texas-counties-source')) {
      const countyFeatures = TEXAS_COUNTIES_OUTAGES.map((c) => {
        // approximate small boundary polygon around county center
        const size = 0.28;
        return {
          type: 'Feature',
          properties: {
            name: c.name,
            fips: c.fips,
            outages: c.customersOut,
            utility: c.utility,
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [c.lng - size, c.lat - size],
                [c.lng + size, c.lat - size],
                [c.lng + size, c.lat + size],
                [c.lng - size, c.lat + size],
                [c.lng - size, c.lat - size],
              ],
            ],
          },
        };
      });

      map.addSource('texas-counties-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: countyFeatures as any,
        },
      });

      map.addLayer({
        id: 'texas-counties-fill',
        type: 'fill',
        source: 'texas-counties-source',
        paint: {
          'fill-color': '#3b82f6',
          'fill-opacity': 0.04,
        },
      });

      map.addLayer({
        id: 'texas-counties-line',
        type: 'line',
        source: 'texas-counties-source',
        paint: {
          'line-color': '#64748b',
          'line-width': 0.8,
          'line-opacity': 0.45,
        },
      });
    }

    // 2. Add HSI Hexagon Grid Layer for Hazard Severity Outlook
    if (!map.getSource('hsi-hex-source')) {
      const hexCells = generateTexasHexCells();
      const hexFeatures = hexCells.map((hex) => ({
        type: 'Feature',
        properties: {
          id: hex.id,
          hsi: hex.hsiValue,
          severity: hex.severityLevel,
          color: hex.color,
          county: hex.county,
        },
        geometry: {
          type: 'Polygon',
          coordinates: createHexPolygon(hex.lat, hex.lng, 13),
        },
      }));

      map.addSource('hsi-hex-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: hexFeatures as any,
        },
      });

      map.addLayer({
        id: 'hsi-hex-fill',
        type: 'fill',
        source: 'hsi-hex-source',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.65,
        },
      });

      map.addLayer({
        id: 'hsi-hex-outline',
        type: 'line',
        source: 'hsi-hex-source',
        paint: {
          'line-color': '#ffffff',
          'line-width': 0.8,
          'line-opacity': 0.6,
        },
      });

      // Hover and click interactions for HSI
      map.on('click', 'hsi-hex-fill', (e) => {
        if (!e.features || !e.features[0]) return;
        const p = e.features[0].properties;
        new maplibregl.Popup({ closeButton: true, className: 'tdis-popup' })
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="p-2 select-none text-slate-800 text-xs">
              <div class="font-bold text-sm text-[#1E293B] mb-1">${p.county} County HSI</div>
              <div class="flex items-center gap-2 mb-1">
                <span class="w-3 h-3 rounded-full" style="background-color: ${p.color}"></span>
                <span class="font-bold text-slate-900">Severity: ${p.severity}</span>
              </div>
              <div class="text-slate-600">HSI Metric: <strong class="text-slate-900">${p.hsi}</strong></div>
              <div class="text-slate-500 text-[10px] mt-1 border-t border-slate-100 pt-1">
                3-Hour Rainfall Risk Envelope: Active
              </div>
            </div>`
          )
          .addTo(map);
      });
    }

    // 3. Add Impact Forecast Hexagon Layer
    if (!map.getSource('impact-threat-source')) {
      const impactFeatures = IMPACT_COUNTIES.map((c) => ({
        type: 'Feature',
        properties: {
          name: c.name,
          fips: c.fips,
          severity: c.severity,
          severityLabel: c.severityLabel,
          desc: c.threatDescription,
          buildings: c.buildingsAffected,
        },
        geometry: {
          type: 'Polygon',
          coordinates: createHexPolygon(c.lat, c.lng, 24),
        },
      }));

      map.addSource('impact-threat-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: impactFeatures as any,
        },
      });

      map.addLayer({
        id: 'impact-threat-fill',
        type: 'fill',
        source: 'impact-threat-source',
        paint: {
          'fill-color': '#f59e0b',
          'fill-opacity': 0.6,
        },
      });

      map.addLayer({
        id: 'impact-threat-outline',
        type: 'line',
        source: 'impact-threat-source',
        paint: {
          'line-color': '#d97706',
          'line-width': 2,
          'line-opacity': 0.9,
        },
      });

      map.on('click', 'impact-threat-fill', (e) => {
        if (!e.features || !e.features[0]) return;
        const p = e.features[0].properties;
        new maplibregl.Popup({ closeButton: true })
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="p-2 select-none text-slate-800 text-xs">
              <div class="font-bold text-sm text-slate-900 mb-1">${p.name} County</div>
              <div class="inline-block bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] mb-1">
                LTS Severity: ${p.severity} (${p.severityLabel})
              </div>
              <div class="text-slate-600 mb-1 leading-snug">${p.desc}</div>
              <div class="font-semibold text-slate-700">Estimated Buildings in Threat Zone: ${p.buildings}</div>
            </div>`
          )
          .addTo(map);
      });
    }

    // 4. Add Infrastructure Outages Points Layer
    if (!map.getSource('infra-outages-source')) {
      const outageFeatures = OUTAGE_POINT_MARKERS.map((pt) => {
        let color = '#60a5fa'; // 1 - 50
        let radius = 5;

        if (pt.count > 250) {
          color = '#22c55e';
          radius = 8;
        } else if (pt.count > 100) {
          color = '#34d399';
          radius = 7;
        } else if (pt.count > 50) {
          color = '#3b82f6';
          radius = 6;
        }

        return {
          type: 'Feature',
          properties: {
            id: pt.id,
            county: pt.county,
            count: pt.count,
            color,
            radius,
          },
          geometry: {
            type: 'Point',
            coordinates: [pt.lng, pt.lat],
          },
        };
      });

      map.addSource('infra-outages-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: outageFeatures as any,
        },
      });

      // Halo/glow
      map.addLayer({
        id: 'infra-outages-glow',
        type: 'circle',
        source: 'infra-outages-source',
        paint: {
          'circle-radius': ['*', ['get', 'radius'], 1.7],
          'circle-color': ['get', 'color'],
          'circle-opacity': 0.35,
        },
      });

      // Point circle
      map.addLayer({
        id: 'infra-outages-circle',
        type: 'circle',
        source: 'infra-outages-source',
        paint: {
          'circle-radius': ['get', 'radius'],
          'circle-color': ['get', 'color'],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 1.5,
          'circle-opacity': 0.95,
        },
      });

      map.on('click', 'infra-outages-circle', (e) => {
        if (!e.features || !e.features[0]) return;
        const p = e.features[0].properties;
        const countyData = TEXAS_COUNTIES_OUTAGES.find((c) => c.name === p.county);

        new maplibregl.Popup({ closeButton: true })
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="p-2 select-none text-slate-800 text-xs">
              <div class="font-bold text-sm text-slate-900 mb-0.5">${p.county} County</div>
              <div class="text-red-600 font-bold text-sm mb-1">${p.count} Customers Out</div>
              <div class="text-slate-600 text-[11px]">Primary Utility: <strong>${countyData?.utility || 'ERCOT Grid Utility'}</strong></div>
              <div class="text-slate-600 text-[11px]">Est. Restoration: <strong>${countyData?.restorationEstimate || 'Assessing damage'}</strong></div>
            </div>`
          )
          .addTo(map);
      });
    }

    // 5. Add Live Weather Radar Layer
    if (!map.getSource('weather-radar-source')) {
      // Simulating a cluster of precipitation cells over East Texas / Houston coast
      const weatherCells = [
        { lat: 29.8, lng: -95.2, dbz: 55, radiusKm: 40, color: '#dc2626' },
        { lat: 30.2, lng: -94.8, dbz: 45, radiusKm: 35, color: '#ea580c' },
        { lat: 29.4, lng: -95.6, dbz: 35, radiusKm: 30, color: '#eab308' },
        { lat: 30.5, lng: -96.0, dbz: 25, radiusKm: 28, color: '#22c55e' },
        { lat: 29.0, lng: -96.2, dbz: 20, radiusKm: 25, color: '#38bdf8' },
      ];

      const radarFeatures = weatherCells.map((cell, idx) => ({
        type: 'Feature',
        properties: {
          id: `radar-${idx}`,
          dbz: cell.dbz,
          color: cell.color,
        },
        geometry: {
          type: 'Polygon',
          coordinates: createHexPolygon(cell.lat, cell.lng, cell.radiusKm),
        },
      }));

      map.addSource('weather-radar-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: radarFeatures as any,
        },
      });

      map.addLayer({
        id: 'weather-radar-fill',
        type: 'fill',
        source: 'weather-radar-source',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.65,
        },
      });
    }

    updateLayerVisibilities();
  }, [activeTab]);

  // Adjust visibility of GIS layers according to activeTab
  const updateLayerVisibilities = () => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const setVisibility = (layerId: string, visible: boolean) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
      }
    };

    // Hazard Severity layers
    const isHazard = activeTab === 'hazard';
    setVisibility('hsi-hex-fill', isHazard);
    setVisibility('hsi-hex-outline', isHazard);

    // Impact Forecast layers
    const isImpact = activeTab === 'impact';
    setVisibility('impact-threat-fill', isImpact);
    setVisibility('impact-threat-outline', isImpact);

    // Infrastructure Outage layers
    const isInfra = activeTab === 'infrastructure';
    setVisibility('infra-outages-glow', isInfra);
    setVisibility('infra-outages-circle', isInfra);

    // Live Weather layers
    const isWeather = activeTab === 'weather';
    setVisibility('weather-radar-fill', isWeather);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full bg-[#e2e8f0]" />
    </div>
  );
};
