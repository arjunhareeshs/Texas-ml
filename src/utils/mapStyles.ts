import { BasemapStyle } from '../types';
import { tileLayers } from '../data/tdisViews';

/**
 * Builds a MapLibre / Mapbox style specification JSON object
 * based on the tileLayers configured in src/data/tdisViews.ts.
 */
export function getBasemapStyleSpec(style: BasemapStyle): any {
  const layerConfig = tileLayers[style] || tileLayers.streets;
  let tiles: string[] = [];

  if (layerConfig.subdomains && layerConfig.subdomains.length > 0) {
    tiles = layerConfig.subdomains.map((sub) =>
      layerConfig.url.replace('{s}', sub).replace('https://a.', `https://${sub}.`)
    );
  } else {
    tiles = [layerConfig.url];
  }

  const baseStyle: any = {
    version: 8,
    sources: {
      'base-tiles': {
        type: 'raster',
        tiles,
        tileSize: 256,
        attribution: layerConfig.attribution,
        maxzoom: layerConfig.maxZoom || 19,
      },
    },
    layers: [
      {
        id: 'base-tiles-layer',
        type: 'raster',
        source: 'base-tiles',
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  };

  // If overlayUrl exists (e.g. Satellite Streets boundary and label reference layer)
  if (layerConfig.overlayUrl) {
    baseStyle.sources['overlay-labels'] = {
      type: 'raster',
      tiles: [layerConfig.overlayUrl],
      tileSize: 256,
    };
    baseStyle.layers.push({
      id: 'overlay-labels-layer',
      type: 'raster',
      source: 'overlay-labels',
      minzoom: 0,
      maxzoom: 22,
    });
  }

  return baseStyle;
}
