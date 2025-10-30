import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="border-b p-4 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between mx-auto">
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

        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Share your Ride</Button>
      </div>
    </header>
  );
}
