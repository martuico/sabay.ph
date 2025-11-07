import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calcFare } from "@/lib/fare";

export async function POST(req: Request) {
  const { passengerId, pickup, dropoff, numberOfSeats, pickupLocation, dropoffLocation } = await req.json();

  const fare = await calcFare(pickup, dropoff);

  const ride = await prisma.rideRequest.create({
    data: {
      passengerId,
      pickupLat: pickup.lat,
      pickupLng: pickup.lng,
      dropLat: dropoff.lat,
      dropLng: dropoff.lng,
      estimatedFare: fare,
      numberOfSeats,
      pickupLocation,
      dropoffLocation,
    },
  });

  return NextResponse.json(ride);
}
