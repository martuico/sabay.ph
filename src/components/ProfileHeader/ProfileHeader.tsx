import { Camera, Car, CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/generated/prisma";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name || ""} />
                <AvatarFallback className="text-3xl">{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-10 w-10 rounded-full shadow-lg"
                variant="default"
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {user.emailVerified && (
                  <Badge className="bg-primary w-fit mx-auto md:mx-0">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {true && (
                  <Badge variant="secondary" className="w-fit mx-auto md:mx-0">
                    <Car className="h-3 w-3 mr-1" />
                    Driver
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-1">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user?.phone}</p>
            </div>
          </div>

          <Link href="/dashboard">
            <Button variant="outline" className="cursor-pointer ">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
