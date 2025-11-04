"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import LoginDialog from "@/components/LoginDialog";
import SignupDialog from "@/components/SignupDialog";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const [showRegistration, setShowRegistration] = useState(false);
  const { data: session } = authClient.useSession();

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
          {session ? (
            <Link href="/dashboard">
              <Button variant="outline" className="cursor-pointer">
                My account
              </Button>
            </Link>
          ) : (
            <>
              <LoginDialog onOpenRegistration={() => setShowRegistration(true)}>
                <Button variant="outline">Login</Button>
              </LoginDialog>

              <SignupDialog open={showRegistration} onOpenChange={setShowRegistration}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Share your Ride</Button>
              </SignupDialog>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
