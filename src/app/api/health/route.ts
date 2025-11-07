import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const result = await prisma.$queryRaw`SELECT PostGIS_Version();`;
  return NextResponse.json(result);
}
