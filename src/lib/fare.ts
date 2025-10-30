import { getDistance } from "./maps";

export async function calcFare(pickup: number, dropoff: number) {
  const distanceKm = await getDistance(pickup, dropoff);
  const baseFare = 20;
  const perKm = 8;
  return Math.round((baseFare + distanceKm * perKm) * 1.1);
}
