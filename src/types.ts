export type ActiveTab = 'weather' | 'hazard' | 'impact' | 'infrastructure';

export type BasemapStyle = 'streets' | 'light' | 'dark' | 'satellite' | 'satellite-streets';

export interface CountyOutage {
  name: string;
  fips: string;
  customersOut: number;
  totalCustomers: number;
  lat: number;
  lng: number;
  utility: string;
  restorationEstimate?: string;
}

export interface ImpactCounty {
  name: string;
  fips: string;
  severity: 4 | 5;
  severityLabel: 'Potentially High' | 'Potentially Very High';
  classification: string;
  lat: number;
  lng: number;
  buildingsAffected: number;
  threatDescription: string;
}

export interface HexCellData {
  id: string;
  lat: number;
  lng: number;
  hsiValue: number;
  severityLevel: 'Minimal' | 'Elevated' | 'Significant' | 'Major' | 'Extreme';
  color: string;
  county: string;
}

export interface WeatherWarning {
  id: string;
  type: 'Flash Flood Warning' | 'Severe Thunderstorm Warning' | 'Tornado Watch';
  severity: 'Warning' | 'Watch' | 'Advisory';
  headline: string;
  area: string;
  expires: string;
  coordinates: [number, number][];
}
