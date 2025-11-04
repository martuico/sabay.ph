import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  DollarSign,
  Car,
  TrendingUp,
  Star,
  CheckCircle2,
  Navigation,
  Settings,
  File,
  MapPinPlus,
  MapPinCheckInside,
  LocationEditIcon,
  SearchSlashIcon,
  SearchCode,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { mockUser } from "@/components/UpcomingHistoryRidesTabs/UpcomingHistoryRidesTabs.mocks";
import { headers } from "next/headers";
import UpcomingHistoryRidesTabs from "@/components/UpcomingHistoryRidesTabs";

export default async function DashboardPage() {
  const { user } = await auth.api.getSession({ headers: await headers() });
  console.log(user);

  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  {user.emailVerified && (
                    <Badge className="bg-primary">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {mockUser.role === "DRIVER" && (
                    <Badge variant="secondary">
                      <Car className="h-3 w-3 mr-1" />
                      Driver
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-1">{mockUser.email}</p>
                <p className="text-sm text-muted-foreground">{mockUser.phone}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{mockUser.rating}</span>
                  </div>
                  <div className="text-muted-foreground">{mockUser.totalRides} rides</div>
                  <div className="text-muted-foreground">Joined {mockUser.joinedDate}</div>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Rides</p>
                  <p className="text-2xl font-bold">{mockUser.totalRides}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Navigation className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{mockUser.rating}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                  <p className="text-2xl font-bold">₱3,450</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/rides">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-primary/20 hover:border-primary">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <SearchIcon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Find a Ride</h3>
                    <p className="text-sm text-muted-foreground">Search for available rides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/driver/add-route">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-primary/20 hover:border-primary">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <LocationEditIcon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Create your route</h3>
                    <p className="text-sm text-muted-foreground">Start adding your route</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {mockUser.role === "DRIVER" && (
            <Link href="/driver/active-ride">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-secondary/20 hover:border-secondary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Car className="h-7 w-7 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Start Driving</h3>
                      <p className="text-sm text-muted-foreground">Begin your ride session</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
        <UpcomingHistoryRidesTabs />
      </div>
    </>
  );
}
