import { headers } from "next/headers";
import Link from "next/link";
import Logo from "@/components/Logo";
import { User } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import HeaderClient from "./HeaderClient";
import HeaderDropdownAuth from "./HeaderDropdownAuth";
import HeaderGuestLinks from "./HeaderGuestLinks";

export default async function Header() {
  let profile;
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    profile =
      (await prisma.user.findFirst({
        where: {
          id: session?.user.id,
        },
      })) ?? undefined;
  }

  return <HeaderClient profile={profile} />;
}
