/**
 * TDIS Map Style Tile Layers configuration.
 *
 * Each style has a url (and overlayUrl for Satellite Streets) pointing to free tile providers:
 * - Satellite → Esri World Imagery
 * - Satellite Streets → Esri World Imagery + reference overlay for boundaries/places
 * - Streets → OpenStreetMap
 * - Light / Dark → CartoDB Positron / Dark Matter
 *
 * If you want to swap to actual Mapbox satellite tiles, replace the url values
 * with Mapbox tile URLs (which require a Mapbox access token, e.g. import.meta.env.VITE_MAPBOX_TOKEN).
 */

export interface TileLayerConfig {
  name: string;
  url: string;
  overlayUrl?: string;
  attribution: string;
  maxZoom?: number;
  subdomains?: string[];
}

export const tileLayers: Record<string, TileLayerConfig> = {
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics, USDA, USGS',
    maxZoom: 18,
  },
  'satellite-streets': {
    name: 'Satellite Streets',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics, USDA, USGS',
    maxZoom: 18,
  },
  streets: {
    name: 'Streets',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  light: {
    name: 'Light',
    url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c', 'd'],
  },
  dark: {
    name: 'Dark',
    url: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c', 'd'],
  },
};

export const tdisViewConfigs = {
  weather: {
    title: 'Live Weather',
    subtitle: 'High-Resolution Doppler Radar & Active Warnings',
    description:
      'Provides real-time NEXRAD dual-pol radar reflectivity composite feeds, severe thunderstorm tracks, and National Weather Service flash flood watches/warnings across Texas.',
  },
  hazard: {
    title: 'Hazard Severity Outlook',
    subtitle: 'Hazard Severity Index (HSI) & Hydrological Stress',
    description:
      'The Hazard Severity Index (HSI) provides a synthesized metric indicating potential rainfall and flash flooding hazards over chosen time horizons.',
  },
  impact: {
    title: 'Texas Impact Forecast (TIF)',
    subtitle: 'Local Threat Severity (LTS) & Infrastructure Exposure',
    description:
      'Quantifies projected building exposures, roadway inundations, and critical facility risks mapped to discrete H3 spatial hexagonal index units.',
  },
  infrastructure: {
    title: 'Infrastructure Status',
    subtitle: 'Electric Grid & Multi-Utility Outage Situational Awareness',
    description:
      'Automated situational awareness feeds tracking customer power outages, substation vulnerability, and critical facility backup generation status.',
  },
};
