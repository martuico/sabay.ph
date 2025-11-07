"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { Profile } from "@/context/AuthUserContext";
import { User } from "@/generated/prisma";
import HeaderDropdownAuth from "./HeaderDropdownAuth";
import HeaderGuestLinks from "./HeaderGuestLinks";

export default function HeaderClient({ profile }: { profile?: Profile }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (profile) setIsLoggedIn(true);
  }, [profile]);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto  flex h-16 items-center justify-between px-4 md:px-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 text-primary group-hover:scale-110 transition-transform">
            <Logo className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl leading-none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sabay.ph
            </span>
            <span className="text-[10px] text-muted-foreground leading-none mt-0.5">Sabay na, tipid pa!</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <HeaderDropdownAuth profile={profile as unknown as User} setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <HeaderGuestLinks />
          )}
        </div>
      </div>
    </header>
  );
}
