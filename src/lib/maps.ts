const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export async function getPolyline(start, end) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=${GOOGLE_KEY}`,
  );
  const data = await res.json();
  const polyline = require("@mapbox/polyline");
  const points = polyline.decode(data.routes[0].overview_polyline.points);
  const distance = data.routes[0].legs[0].distance.value / 1000;
  return { polyline: points, distance };
}

export async function getDistance(pickup: { lat: number; lng: number }, dropoff: { lat: number; lng: number }) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickup.lat},${pickup.lng}&destinations=${dropoff.lat},${dropoff.lng}&key=${GOOGLE_KEY}`,
  );
  const data = await res.json();
  return data.rows[0].elements[0].distance.value / 1000;
}
