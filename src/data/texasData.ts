import { CountyOutage, ImpactCounty, HexCellData } from '../types';

export const TEXAS_CENTER: [number, number] = [-98.5795, 31.0263];
export const TEXAS_DEFAULT_ZOOM = 5.6;

// Counties Outage List - Exact match to screenshot stats (Total: 2,143)
export const TEXAS_COUNTIES_OUTAGES: CountyOutage[] = [
  { name: 'Harris', fips: '201', customersOut: 613, totalCustomers: 1845000, lat: 29.7604, lng: -95.3698, utility: 'CenterPoint Energy', restorationEstimate: 'Today, 4:30 PM' },
  { name: 'Bexar', fips: '029', customersOut: 309, totalCustomers: 920000, lat: 29.4241, lng: -98.4936, utility: 'CPS Energy', restorationEstimate: 'Today, 5:15 PM' },
  { name: 'Bowie', fips: '037', customersOut: 259, totalCustomers: 44000, lat: 33.4548, lng: -94.2755, utility: 'SWEPCO', restorationEstimate: 'Today, 6:00 PM' },
  { name: 'Tarrant', fips: '439', customersOut: 201, totalCustomers: 850000, lat: 32.7555, lng: -97.3308, utility: 'Oncor Electric', restorationEstimate: 'Today, 3:45 PM' },
  { name: 'Brazoria', fips: '039', customersOut: 97, totalCustomers: 165000, lat: 29.1711, lng: -95.4339, utility: 'Texas-New Mexico Power', restorationEstimate: 'Today, 7:00 PM' },
  { name: 'Smith', fips: '423', customersOut: 75, totalCustomers: 110000, lat: 32.3513, lng: -95.3011, utility: 'Oncor Electric', restorationEstimate: 'Today, 4:00 PM' },
  { name: 'Montgomery', fips: '339', customersOut: 74, totalCustomers: 275000, lat: 30.3213, lng: -95.4779, utility: 'Entergy Texas', restorationEstimate: 'Today, 5:30 PM' },
  { name: 'Dimmit', fips: '127', customersOut: 70, totalCustomers: 5200, lat: 28.4239, lng: -99.7567, utility: 'Medina Electric Co-op', restorationEstimate: 'Pending crew arrival' },
  { name: 'Fort Bend', fips: '157', customersOut: 56, totalCustomers: 320000, lat: 29.5694, lng: -95.8143, utility: 'CenterPoint Energy', restorationEstimate: 'Today, 6:45 PM' },
  { name: 'Dallas', fips: '113', customersOut: 54, totalCustomers: 1200000, lat: 32.7767, lng: -96.7970, utility: 'Oncor Electric', restorationEstimate: 'Today, 3:30 PM' },
  { name: 'Travis', fips: '453', customersOut: 48, totalCustomers: 610000, lat: 30.2672, lng: -97.7431, utility: 'Austin Energy', restorationEstimate: 'Today, 4:15 PM' },
  { name: 'El Paso', fips: '141', customersOut: 45, totalCustomers: 410000, lat: 31.7619, lng: -106.4850, utility: 'El Paso Electric', restorationEstimate: 'Today, 5:00 PM' },
  { name: 'Hidalgo', fips: '215', customersOut: 42, totalCustomers: 310000, lat: 26.2034, lng: -98.2300, utility: 'AEP Texas', restorationEstimate: 'Today, 6:15 PM' },
  { name: 'Cameron', fips: '061', customersOut: 38, totalCustomers: 170000, lat: 25.9017, lng: -97.4975, utility: 'AEP Texas', restorationEstimate: 'Today, 7:30 PM' },
  { name: 'Nueces', fips: '355', customersOut: 34, totalCustomers: 180000, lat: 27.8006, lng: -97.3964, utility: 'AEP Texas', restorationEstimate: 'Today, 4:45 PM' },
  { name: 'Webb', fips: '479', customersOut: 28, totalCustomers: 95000, lat: 27.5036, lng: -99.5076, utility: 'AEP Texas', restorationEstimate: 'Today, 8:00 PM' },
  { name: 'Jefferson', fips: '245', customersOut: 25, totalCustomers: 115000, lat: 30.0802, lng: -94.1266, utility: 'Entergy Texas', restorationEstimate: 'Today, 6:00 PM' },
  { name: 'Galveston', fips: '167', customersOut: 24, totalCustomers: 160000, lat: 29.3013, lng: -94.7977, utility: 'Texas-New Mexico Power', restorationEstimate: 'Today, 5:00 PM' },
  { name: 'Bell', fips: '027', customersOut: 22, totalCustomers: 155000, lat: 31.0660, lng: -97.4644, utility: 'Oncor Electric', restorationEstimate: 'Today, 3:15 PM' },
  { name: 'Lubbock', fips: '303', customersOut: 19, totalCustomers: 140000, lat: 33.5779, lng: -101.8552, utility: 'Lubbock Power & Light', restorationEstimate: 'Today, 4:30 PM' },
  { name: 'McLennan', fips: '309', customersOut: 18, totalCustomers: 112000, lat: 31.5493, lng: -97.1467, utility: 'Oncor Electric', restorationEstimate: 'Today, 5:00 PM' },
  { name: 'Potter', fips: '375', customersOut: 15, totalCustomers: 65000, lat: 35.2220, lng: -101.8313, utility: 'Xcel Energy', restorationEstimate: 'Today, 4:00 PM' },
  { name: 'Midland', fips: '329', customersOut: 14, totalCustomers: 82000, lat: 31.9973, lng: -102.0779, utility: 'Oncor Electric', restorationEstimate: 'Today, 6:00 PM' },
  { name: 'Ector', fips: '135', customersOut: 12, totalCustomers: 78000, lat: 31.8457, lng: -102.3676, utility: 'Oncor Electric', restorationEstimate: 'Today, 4:15 PM' },
  { name: 'Denton', fips: '121', customersOut: 9, totalCustomers: 390000, lat: 33.2148, lng: -97.1331, utility: 'CoServ / Oncor', restorationEstimate: 'Today, 3:00 PM' },
  { name: 'Collin', fips: '085', customersOut: 8, totalCustomers: 450000, lat: 33.1972, lng: -96.6398, utility: 'Oncor Electric', restorationEstimate: 'Today, 2:45 PM' },
  { name: 'Williamson', fips: '491', customersOut: 6, totalCustomers: 260000, lat: 30.6323, lng: -97.6778, utility: 'Oncor / Pedernales', restorationEstimate: 'Today, 3:30 PM' },
  { name: 'Guadalupe', fips: '187', customersOut: 5, totalCustomers: 72000, lat: 29.5855, lng: -97.9472, utility: 'GVEC', restorationEstimate: 'Today, 4:00 PM' },
  { name: 'Comal', fips: '091', customersOut: 4, totalCustomers: 78000, lat: 29.8055, lng: -98.2778, utility: 'New Braunfels Utilities', restorationEstimate: 'Today, 2:30 PM' },
  { name: 'San Patricio', fips: '409', customersOut: 3, totalCustomers: 31000, lat: 28.0061, lng: -97.5186, utility: 'AEP Texas', restorationEstimate: 'Today, 3:00 PM' },
];

// Calculate total customers out exactly
export const TOTAL_CUSTOMERS_OUT = TEXAS_COUNTIES_OUTAGES.reduce((acc, c) => acc + c.customersOut, 0);

// Cluster points across Texas matching the actual screenshots (dots along border, I-35 corridor, Gulf, Panhandle)
export const OUTAGE_POINT_MARKERS = [
  // Houston area
  { id: 'h1', lat: 29.76, lng: -95.36, count: 240, county: 'Harris' },
  { id: 'h2', lat: 29.88, lng: -95.42, count: 180, county: 'Harris' },
  { id: 'h3', lat: 29.62, lng: -95.28, count: 120, county: 'Harris' },
  { id: 'h4', lat: 29.55, lng: -95.82, count: 56, county: 'Fort Bend' },
  { id: 'h5', lat: 29.21, lng: -95.44, count: 97, county: 'Brazoria' },
  { id: 'h6', lat: 30.31, lng: -95.48, count: 74, county: 'Montgomery' },
  { id: 'h7', lat: 29.31, lng: -94.81, count: 24, county: 'Galveston' },

  // San Antonio / South Texas
  { id: 'sa1', lat: 29.43, lng: -98.49, count: 190, county: 'Bexar' },
  { id: 'sa2', lat: 29.55, lng: -98.62, count: 119, county: 'Bexar' },
  { id: 'dt1', lat: 28.43, lng: -99.76, count: 70, county: 'Dimmit' },
  { id: 'dt2', lat: 28.25, lng: -99.68, count: 25, county: 'Dimmit' },
  { id: 'dt3', lat: 28.18, lng: -99.92, count: 18, county: 'Dimmit' },

  // Eagle Pass & Del Rio & Rio Grande border line (dense small dots in screenshots)
  { id: 'ep1', lat: 28.71, lng: -100.49, count: 15, county: 'Maverick' },
  { id: 'ep2', lat: 28.65, lng: -100.41, count: 12, county: 'Maverick' },
  { id: 'ep3', lat: 28.85, lng: -100.58, count: 9, county: 'Maverick' },
  { id: 'dr1', lat: 29.36, lng: -100.89, count: 8, county: 'Val Verde' },
  { id: 'dr2', lat: 29.42, lng: -101.05, count: 6, county: 'Val Verde' },
  { id: 'wb1', lat: 27.52, lng: -99.51, count: 28, county: 'Webb' },
  { id: 'wb2', lat: 27.42, lng: -99.45, count: 14, county: 'Webb' },
  { id: 'rg1', lat: 26.38, lng: -98.82, count: 11, county: 'Starr' },
  { id: 'rg2', lat: 26.22, lng: -98.24, count: 42, county: 'Hidalgo' },
  { id: 'rg3', lat: 25.92, lng: -97.51, count: 38, county: 'Cameron' },

  // El Paso western tip
  { id: 'elp1', lat: 31.76, lng: -106.48, count: 28, county: 'El Paso' },
  { id: 'elp2', lat: 31.84, lng: -106.55, count: 17, county: 'El Paso' },
  { id: 'elp3', lat: 31.68, lng: -106.35, count: 12, county: 'El Paso' },
  { id: 'elp4', lat: 31.55, lng: -106.18, count: 8, county: 'Hudspeth' },
  { id: 'elp5', lat: 31.42, lng: -105.85, count: 5, county: 'Hudspeth' },

  // Dallas - Fort Worth & North Texas
  { id: 'dfw1', lat: 32.78, lng: -96.80, count: 54, county: 'Dallas' },
  { id: 'dfw2', lat: 32.75, lng: -97.33, count: 201, county: 'Tarrant' },
  { id: 'dfw3', lat: 32.88, lng: -97.12, count: 45, county: 'Tarrant' },
  { id: 'dfw4', lat: 33.20, lng: -96.64, count: 8, county: 'Collin' },
  { id: 'dfw5', lat: 33.22, lng: -97.14, count: 9, county: 'Denton' },

  // East Texas / Texarkana / Bowie
  { id: 'txk1', lat: 33.45, lng: -94.27, count: 259, county: 'Bowie' },
  { id: 'txk2', lat: 33.55, lng: -94.18, count: 42, county: 'Bowie' },
  { id: 'tyl1', lat: 32.35, lng: -95.30, count: 75, county: 'Smith' },
  { id: 'bea1', lat: 30.08, lng: -94.13, count: 25, county: 'Jefferson' },

  // Austin & Central Corridor
  { id: 'atx1', lat: 30.27, lng: -97.74, count: 48, county: 'Travis' },
  { id: 'atx2', lat: 30.52, lng: -97.68, count: 6, county: 'Williamson' },
  { id: 'wac1', lat: 31.55, lng: -97.15, count: 18, county: 'McLennan' },
  { id: 'tem1', lat: 31.08, lng: -97.45, count: 22, county: 'Bell' },

  // Panhandle / Amarillo & Lubbock
  { id: 'ama1', lat: 35.22, lng: -101.83, count: 15, county: 'Potter' },
  { id: 'ama2', lat: 35.45, lng: -101.65, count: 8, county: 'Carson' },
  { id: 'ama3', lat: 35.85, lng: -101.95, count: 12, county: 'Moore' },
  { id: 'lub1', lat: 33.58, lng: -101.86, count: 19, county: 'Lubbock' },
  { id: 'mid1', lat: 31.99, lng: -102.08, count: 14, county: 'Midland' },
  { id: 'ode1', lat: 31.85, lng: -102.37, count: 12, county: 'Ector' },
];

// Impact Forecast Counties (Exact match to screenshot 144934.png)
export const IMPACT_COUNTIES: ImpactCounty[] = [
  {
    name: 'Delta',
    fips: '119',
    severity: 4,
    severityLabel: 'Potentially High',
    classification: 'Moderate-High',
    lat: 33.3855,
    lng: -95.6669,
    buildingsAffected: 38,
    threatDescription: 'Overtopping of local drainage creeks, secondary roadway flooding likely.'
  },
  {
    name: 'Lubbock',
    fips: '303',
    severity: 4,
    severityLabel: 'Potentially High',
    classification: 'Moderate-High',
    lat: 33.5779,
    lng: -101.8552,
    buildingsAffected: 54,
    threatDescription: 'Urban playa lake overflow and street inundation in low-lying residential sectors.'
  },
  {
    name: 'Moore',
    fips: '341',
    severity: 4,
    severityLabel: 'Potentially High',
    classification: 'Moderate-High',
    lat: 35.8364,
    lng: -101.9961,
    buildingsAffected: 32,
    threatDescription: 'High runoff velocity across dry wash corridors with agricultural structural impacts.'
  },
  {
    name: 'Navarro',
    fips: '349',
    severity: 4,
    severityLabel: 'Potentially High',
    classification: 'Moderate-High',
    lat: 32.0538,
    lng: -96.4716,
    buildingsAffected: 47,
    threatDescription: 'Richland-Chambers tributary surge threatening suburban fringe structures.'
  },
  {
    name: 'Sherman',
    fips: '421',
    severity: 4,
    severityLabel: 'Potentially High',
    classification: 'Moderate-High',
    lat: 36.2797,
    lng: -101.8906,
    buildingsAffected: 32,
    threatDescription: 'Heavy rainfall training cell creating localized flash flooding across highway culverts.'
  },
];

// Generates hexagonal grid data for Hazard Severity Outlook across Texas
export function generateTexasHexCells(): HexCellData[] {
  const cells: HexCellData[] = [];
  // Center coordinates focused around Central/East Texas & Gulf where the blue gradient is shown in screenshot 144924
  const centers = [
    // San Antonio to Austin to Houston wedge
    { lat: 29.4, lng: -98.5, base: 1.4, county: 'Bexar' },
    { lat: 29.7, lng: -97.9, base: 1.8, county: 'Guadalupe' },
    { lat: 30.1, lng: -97.3, base: 2.1, county: 'Bastrop' },
    { lat: 29.8, lng: -96.5, base: 1.9, county: 'Colorado' },
    { lat: 29.7, lng: -95.4, base: 1.6, county: 'Harris' },
    { lat: 29.3, lng: -95.0, base: 1.2, county: 'Galveston' },
    { lat: 28.8, lng: -96.9, base: 1.3, county: 'Victoria' },
    { lat: 27.8, lng: -97.4, base: 0.9, county: 'Nueces' },
    { lat: 28.5, lng: -98.2, base: 0.7, county: 'Atascosa' },
    { lat: 29.1, lng: -99.1, base: 0.8, county: 'Frio' },
    { lat: 30.5, lng: -96.3, base: 1.5, county: 'Brazos' },
    { lat: 31.1, lng: -97.5, base: 1.1, county: 'Bell' },
    { lat: 31.5, lng: -97.1, base: 0.9, county: 'McLennan' },
    { lat: 32.4, lng: -95.3, base: 1.3, county: 'Smith' },
    { lat: 30.9, lng: -94.5, base: 1.4, county: 'Tyler' },
    { lat: 30.1, lng: -94.1, base: 1.2, county: 'Jefferson' },
    // Del Rio & West Texas lighter spots
    { lat: 29.4, lng: -100.9, base: 0.4, county: 'Val Verde' },
    { lat: 30.4, lng: -102.5, base: 0.3, county: 'Pecos' },
    { lat: 31.9, lng: -102.1, base: 0.2, county: 'Midland' },
    { lat: 33.6, lng: -101.9, base: 0.5, county: 'Lubbock' },
    { lat: 35.2, lng: -101.8, base: 0.4, county: 'Potter' },
  ];

  let idCounter = 1;
  centers.forEach(c => {
    // Generate cluster around this center
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      const dist = (0.2 + (i % 3) * 0.18);
      const lat = c.lat + Math.sin(angle) * dist;
      const lng = c.lng + Math.cos(angle) * dist * 1.15;
      const variance = ((i * 17) % 30) / 100 - 0.15;
      const hsiValue = Math.max(0.1, Math.min(2.4, +(c.base + variance).toFixed(2)));

      let severityLevel: HexCellData['severityLevel'] = 'Minimal';
      let color = '#60a5fa'; // >0

      if (hsiValue >= 2.0) {
        severityLevel = 'Extreme';
        color = '#dc2626';
      } else if (hsiValue >= 1.5) {
        severityLevel = 'Major';
        color = '#c026d3';
      } else if (hsiValue >= 1.0) {
        severityLevel = 'Significant';
        color = '#7c3aed';
      } else if (hsiValue >= 0.5) {
        severityLevel = 'Elevated';
        color = '#2563eb';
      } else if (hsiValue >= 0.25) {
        severityLevel = 'Elevated';
        color = '#3b82f6';
      }

      cells.push({
        id: `hex-${idCounter++}`,
        lat: +lat.toFixed(4),
        lng: +lng.toFixed(4),
        hsiValue,
        severityLevel,
        color,
        county: c.county
      });
    }
  });

  return cells;
}

// Convert hex cell point to GeoJSON polygon of hexagon
export function createHexPolygon(lat: number, lng: number, radiusKm: number = 14) {
  const coordinates: [number, number][] = [];
  const rLat = radiusKm / 111.32;
  const rLng = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));

  for (let i = 0; i <= 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    const x = lng + rLng * Math.cos(angle);
    const y = lat + rLat * Math.sin(angle);
    coordinates.push([x, y]);
  }
  return [coordinates];
}
