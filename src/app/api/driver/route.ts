import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getPolyline } from "@/lib/maps";

export async function POST(req: Request) {
  const { driverId, start, end } = await req.json();

  const routeData = await getPolyline(start, end);

  const route = await prisma.route.create({
    data: {
      driverId,
      startLat: start.lat,
      startLng: start.lng,
      endLat: end.lat,
      endLng: end.lng,
      polyline: routeData.polyline,
      distanceKm: routeData.distance,
    },
  });

  return NextResponse.json(route);
}
