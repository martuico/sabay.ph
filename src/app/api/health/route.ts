import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await prisma.$queryRaw`SELECT PostGIS_Version();`;
  return NextResponse.json(result);
}
