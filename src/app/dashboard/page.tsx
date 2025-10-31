"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Car,
  TrendingUp,
  Star,
  CheckCircle2,
  XCircle,
  Navigation,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";

// Mock user data
const mockUser = {
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  phone: "+63 912 345 6789",
  avatar: "/abstract-geometric-shapes.png",
  role: "DRIVER", // or "PASSENGER"
  verified: true,
  rating: 4.8,
  totalRides: 127,
  joinedDate: "January 2024",
};

// Mock upcoming rides
const upcomingRides = [
  {
    id: "1",
    type: "passenger",
    from: "Manila",
    to: "Quezon City",
    date: "Nov 10, 2025",
    time: "8:00 AM",
    driverName: "Maria Santos",
    seats: 1,
    price: 150,
    status: "confirmed",
  },
  {
    id: "2",
    type: "driver",
    from: "Makati",
    to: "BGC",
    date: "Nov 12, 2025",
    time: "6:30 PM",
    passengers: 3,
    price: 450,
    status: "confirmed",
  },
];

// Mock ride history
const rideHistory = [
  {
    id: "h1",
    type: "passenger",
    from: "Manila",
    to: "Cavite",
    date: "Nov 3, 2025",
    driverName: "Pedro Garcia",
    price: 200,
    status: "completed",
    rating: 5,
  },
  {
    id: "h2",
    type: "driver",
    from: "Quezon City",
    to: "Manila",
    date: "Nov 1, 2025",
    passengers: 2,
    price: 300,
    status: "completed",
    rating: 4.5,
  },
  {
    id: "h3",
    type: "passenger",
    from: "BGC",
    to: "Makati",
    date: "Oct 28, 2025",
    driverName: "Ana Reyes",
    price: 100,
    status: "cancelled",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                  {mockUser.verified && (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/rides">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-primary/20 hover:border-primary">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Find a Ride</h3>
                    <p className="text-sm text-muted-foreground">Search for available rides</p>
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

        {/* Tabs for Rides */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Upcoming Rides</TabsTrigger>
            <TabsTrigger value="history">Ride History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-4">
              {upcomingRides.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No upcoming rides</h3>
                    <p className="text-muted-foreground mb-4">Book a ride to get started</p>
                    <Link href="/rides">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Find a Ride
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                upcomingRides.map((ride) => (
                  <Card key={ride.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant={ride.type === "driver" ? "default" : "secondary"}>
                              {ride.type === "driver" ? (
                                <>
                                  <Car className="h-3 w-3 mr-1" />
                                  Driving
                                </>
                              ) : (
                                <>
                                  <Users className="h-3 w-3 mr-1" />
                                  Passenger
                                </>
                              )}
                            </Badge>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {ride.status}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                              <MapPin className="h-5 w-5 text-primary" />
                              <span>
                                {ride.from} → {ride.to}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{ride.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{ride.time}</span>
                              </div>
                            </div>

                            {ride.type === "passenger" && (
                              <p className="text-sm text-muted-foreground">Driver: {ride.driverName}</p>
                            )}
                            {ride.type === "driver" && (
                              <p className="text-sm text-muted-foreground">{ride.passengers} passengers booked</p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">₱{ride.price}</p>
                            {ride.type === "passenger" && <p className="text-xs text-muted-foreground">per seat</p>}
                          </div>
                          {ride.type === "driver" && (
                            <Link href="/driver/active-ride">
                              <Button size="sm">
                                <Navigation className="h-4 w-4 mr-2" />
                                Start Trip
                              </Button>
                            </Link>
                          )}
                          {ride.type === "passenger" && (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {rideHistory.map((ride) => (
                <Card key={ride.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant={ride.type === "driver" ? "default" : "secondary"}>
                            {ride.type === "driver" ? (
                              <>
                                <Car className="h-3 w-3 mr-1" />
                                Driving
                              </>
                            ) : (
                              <>
                                <Users className="h-3 w-3 mr-1" />
                                Passenger
                              </>
                            )}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              ride.status === "completed"
                                ? "text-green-600 border-green-600"
                                : "text-red-600 border-red-600"
                            }
                          >
                            {ride.status === "completed" ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {ride.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 font-semibold">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>
                              {ride.from} → {ride.to}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{ride.date}</span>
                            </div>
                            {ride.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{ride.rating}</span>
                              </div>
                            )}
                          </div>

                          {ride.type === "passenger" && ride.driverName && (
                            <p className="text-sm text-muted-foreground">Driver: {ride.driverName}</p>
                          )}
                          {ride.type === "driver" && ride.passengers && (
                            <p className="text-sm text-muted-foreground">{ride.passengers} passengers</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="text-xl font-bold">₱{ride.price}</p>
                        {ride.status === "completed" && !ride.rating && (
                          <Button size="sm" variant="outline">
                            Rate Ride
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
