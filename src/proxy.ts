import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import prisma from "./lib/prisma";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = getSessionCookie(request);

  if (sessionCookie && pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/setup-profile")) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) return NextResponse.redirect(new URL("/", request.url));

    const userDB = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!userDB?.governmentId || !userDB?.govermentPhotoUrl) {
      return NextResponse.redirect(new URL("/dashboard/setup-profile", request.url));
    }
  }
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
