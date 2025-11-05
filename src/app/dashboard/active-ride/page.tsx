"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  Phone,
  CheckCircle2,
  Circle,
  DollarSign,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock data for the ride
const rideData = {
  id: "RIDE-001",
  from: "Makati City",
  to: "Quezon City",
  departureTime: "8:00 AM",
  estimatedArrival: "9:30 AM",
  totalPassengers: 3,
  totalFare: 450,
  stops: [
    {
      id: 1,
      location: "Ayala Avenue, Makati",
      type: "pickup",
      passenger: {
        name: "Juan Dela Cruz",
        phone: "+63 912 345 6789",
        seats: 1,
        fare: 150,
      },
      completed: false,
    },
    {
      id: 2,
      location: "EDSA Guadalupe Station",
      type: "pickup",
      passenger: {
        name: "Maria Santos",
        phone: "+63 923 456 7890",
        seats: 1,
        fare: 150,
      },
      completed: false,
    },
    {
      id: 3,
      location: "Ortigas Center, Pasig",
      type: "pickup",
      passenger: {
        name: "Pedro Reyes",
        phone: "+63 934 567 8901",
        seats: 1,
        fare: 150,
      },
      completed: false,
    },
    {
      id: 4,
      location: "Quezon Avenue, Quezon City",
      type: "dropoff",
      passenger: {
        name: "Juan Dela Cruz",
        phone: "+63 912 345 6789",
        seats: 1,
        fare: 150,
      },
      completed: false,
    },
    {
      id: 5,
      location: "Commonwealth Avenue, Quezon City",
      type: "dropoff",
      passenger: {
        name: "Maria Santos & Pedro Reyes",
        phone: "+63 923 456 7890",
        seats: 2,
        fare: 300,
      },
      completed: false,
    },
  ],
};

export default function DriverActiveRidePage() {
  const [isStarted, setIsStarted] = useState(false);
  const [stops, setStops] = useState(rideData.stops);
  const [isStopsExpanded, setIsStopsExpanded] = useState(false);

  const handleStartDriving = () => {
    setIsStarted(true);
  };

  const handleCompleteStop = (stopId: number) => {
    setStops((prev) => prev.map((stop) => (stop.id === stopId ? { ...stop, completed: true } : stop)));
  };

  const completedStops = stops.filter((s) => s.completed).length;
  const totalStops = stops.length;

  if (!isStarted) {
    return (
      <>
        <div className="container max-w-2xl py-12 mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Ready to Start Your Ride?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-semibold">{rideData.from}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Navigation className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">To</p>
                      <p className="font-semibold">{rideData.to}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Departure</p>
                    <p className="font-semibold">{rideData.departureTime}</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-secondary mb-2" />
                    <p className="text-xs text-muted-foreground">Passengers</p>
                    <p className="font-semibold">{rideData.totalPassengers}</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Total Gas</p>
                    <p className="font-semibold">₱{rideData.totalFare}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Stops ({totalStops})</p>
                  <ScrollArea className="h-48 rounded-lg border p-4">
                    <div className="space-y-3">
                      {rideData.stops.map((stop, index) => (
                        <div key={stop.id} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`h-3 w-3 rounded-full ${stop.type === "pickup" ? "bg-primary" : "bg-secondary"
                                }`}
                            />
                            {index < rideData.stops.length - 1 && <div className="w-0.5 h-8 bg-border" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{stop.location}</p>
                            <p className="text-xs text-muted-foreground">
                              {stop.type === "pickup" ? "Pick up" : "Drop off"} - {stop.passenger.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <Button onClick={handleStartDriving} className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                <Play className="mr-2 h-5 w-5" />
                Start Driving
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 relative bg-gradient-to-br from-muted/30 to-muted/10">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-primary mx-auto" />
              <p className="text-2xl font-semibold text-muted-foreground">MAP HERE</p>
              <p className="text-sm text-muted-foreground">
                Route from {rideData.from} to {rideData.to}
              </p>
            </div>
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur px-4 py-2 rounded-full shadow-lg border">
            <p className="text-sm font-medium">
              Stop {completedStops + 1} of {totalStops}
            </p>
          </div>

          <div className="hidden md:block absolute right-4 top-4 w-80 lg:w-96 max-h-[calc(100vh-20rem)]">
            <Card className="h-full shadow-2xl border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Stops & Passengers</span>
                  <Badge variant="secondary">
                    {completedStops}/{totalStops}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-24rem)]">
                  <div className="space-y-1 p-4">
                    {stops.map((stop, index) => (
                      <Card
                        key={stop.id}
                        className={`transition-all ${stop.completed ? "bg-muted/50 opacity-60" : "bg-background hover:shadow-md"
                          }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center pt-1">
                              {stop.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-secondary" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                              {index < stops.length - 1 && <div className="w-0.5 h-12 bg-border mt-2" />}
                            </div>

                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <Badge variant={stop.type === "pickup" ? "default" : "secondary"} className="mb-1">
                                    {stop.type === "pickup" ? "Pick Up" : "Drop Off"}
                                  </Badge>
                                  <p className="font-semibold text-sm leading-tight">{stop.location}</p>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <p className="text-sm font-medium">{stop.passenger.name}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {stop.passenger.seats} seat{stop.passenger.seats > 1 ? "s" : ""}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />₱{stop.passenger.fare}
                                  </span>
                                </div>
                                <a
                                  href={`tel:${stop.passenger.phone}`}
                                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                                >
                                  <Phone className="h-3 w-3" />
                                  {stop.passenger.phone}
                                </a>
                              </div>

                              {!stop.completed && (
                                <Button
                                  size="sm"
                                  onClick={() => handleCompleteStop(stop.id)}
                                  className="w-full mt-2 bg-secondary hover:bg-secondary/90"
                                >
                                  <CheckCircle2 className="mr-1 h-4 w-4" />
                                  Complete Stop
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-background border-t shadow-2xl">
          <div className="container max-w-7xl">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Active Ride - {rideData.id}</h2>
                  <p className="text-sm text-muted-foreground">
                    {rideData.from} → {rideData.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Est. Arrival</p>
                  <p className="font-semibold">{rideData.estimatedArrival}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Passengers</p>
                    <p className="font-semibold">{rideData.totalPassengers}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="font-semibold">
                      {completedStops}/{totalStops}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Fare</p>
                    <p className="font-semibold">₱{rideData.totalFare}</p>
                  </div>
                </div>
              </div>

              <div className="md:hidden border-t pt-4">
                <Button
                  variant="outline"
                  className="w-full justify-between bg-transparent"
                  onClick={() => setIsStopsExpanded(!isStopsExpanded)}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Stops & Passengers</span>
                    <Badge variant="secondary">
                      {completedStops}/{totalStops}
                    </Badge>
                  </span>
                  {isStopsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </Button>

                {isStopsExpanded && (
                  <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                    {stops.map((stop, index) => (
                      <Card
                        key={stop.id}
                        className={`transition-all ${stop.completed ? "bg-muted/50 opacity-60" : "bg-background"}`}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center pt-1">
                              {stop.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-secondary" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                              {index < stops.length - 1 && <div className="w-0.5 h-10 bg-border mt-1" />}
                            </div>

                            <div className="flex-1 space-y-2">
                              <div>
                                <Badge
                                  variant={stop.type === "pickup" ? "default" : "secondary"}
                                  className="mb-1 text-xs"
                                >
                                  {stop.type === "pickup" ? "Pick Up" : "Drop Off"}
                                </Badge>
                                <p className="font-semibold text-sm leading-tight">{stop.location}</p>
                              </div>

                              <div className="space-y-1">
                                <p className="text-xs font-medium">{stop.passenger.name}</p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {stop.passenger.seats}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />₱{stop.passenger.fare}
                                  </span>
                                </div>
                                <a
                                  href={`tel:${stop.passenger.phone}`}
                                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                                >
                                  <Phone className="h-3 w-3" />
                                  {stop.passenger.phone}
                                </a>
                              </div>

                              {!stop.completed && (
                                <Button
                                  size="sm"
                                  onClick={() => handleCompleteStop(stop.id)}
                                  className="w-full mt-2 h-8 text-xs bg-secondary hover:bg-secondary/90"
                                >
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  Complete Stop
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
