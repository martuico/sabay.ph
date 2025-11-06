"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function createAndSignInUser({
  email,
  password,
  firstName,
  lastName,
  phone,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}) {
  const betterAuthSignup = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: `${firstName} ${lastName}`,
    },
  });

  const user = await prisma.user.update({
    where: { id: betterAuthSignup.user.id },
    data: { firstName, lastName, phone },
  });

  return { token: betterAuthSignup.token, user };
}
