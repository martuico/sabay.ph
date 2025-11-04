export const GRID_SIZE_KM = 1; // 1 km grid

export function latLngToGrid(lat: number, lng: number, gridSizeKm: number) {
  const latGrid = Math.floor((lat * 111) / gridSizeKm);
  const lngGrid = Math.floor((lng * 111 * Math.cos((lat * Math.PI) / 180)) / gridSizeKm);
  return `${latGrid}:${lngGrid}`;
}

// Compute all grids covering a radius
export function getGridsInRadius(lat: number, lng: number, radiusKm: number) {
  const delta = Math.ceil(radiusKm / GRID_SIZE_KM);
  const centerLatGrid = Math.floor((lat * 111) / GRID_SIZE_KM);
  const centerLngGrid = Math.floor((lng * 111 * Math.cos((lat * Math.PI) / 180)) / GRID_SIZE_KM);
  const grids: string[] = [];

  for (let i = -delta; i <= delta; i++) {
    for (let j = -delta; j <= delta; j++) {
      grids.push(`${centerLatGrid + i}:${centerLngGrid + j}`);
    }
  }
  return grids;
}

// Haversine distance in km
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
