"use client";

import { Button } from "@radix-ui/themes";
import { Calendar, Car, CheckCircle2, Clock, MapPin, Navigation, Plus, Star, Users, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { rideHistory, upcomingRides } from "./UpcomingHistoryRidesTabs.mocks";

export default function UpcomingHistoryRidesTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
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
                          <Button size="1">
                            <Navigation className="h-4 w-4 mr-2" />
                            Start Trip
                          </Button>
                        </Link>
                      )}
                      {ride.type === "passenger" && (
                        <Button size="1" variant="outline">
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
                      <Button size="1" variant="outline">
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
  );
}
