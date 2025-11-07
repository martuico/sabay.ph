"use client";

import { Car, Clock, MapPin, MessageCircle, Phone, Shield, Star, Users } from "lucide-react";
import RequestBookingDialog from "@/components/RequestBookingDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface RideDetailPanelProps {
  rideId: string | null;
}

export default function RideDetailPanel({ rideId }: RideDetailPanelProps) {
  if (!rideId) {
    return (
      <Card className="h-full flex items-center justify-center min-h-[500px]">
        <CardContent className="text-center py-12">
          <div className="mb-4 text-muted-foreground">
            <MapPin className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">Select a ride to view details</p>
            <p className="text-sm mt-2">Click on any ride card on the left to see the route map and ride information</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mock ride details
  const rideDetails = {
    id: rideId,
    driverName: "Juan Dela Cruz",
    driverAvatar: "/professional-driver.png",
    rating: 4.8,
    totalRides: 127,
    verified: true,
    from: "Manila City Hall",
    to: "Quezon City Hall",
    departureTime: "8:30 AM",
    arrivalTime: "9:15 AM",
    date: "Nov 05, 2025",
    availableSeats: 2,
    totalSeats: 4,
    price: 75,
    carModel: "Toyota Vios 2020",
    carPlate: "ABC 1234",
    amenities: ["Air Conditioning", "Music", "Pet Friendly"],
    pickupPoints: ["Manila City Hall", "Taft Avenue", "EDSA Crossing"],
    dropoffPoints: ["Quezon Avenue", "Elliptical Road", "Quezon City Hall"],
  };

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Ride Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Map Placeholder */}
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p className="font-medium">MAP HERE</p>
            <p className="text-sm">Route visualization</p>
          </div>
        </div>

        {/* Driver Info */}
        <div>
          <h3 className="font-semibold mb-3">Driver Information</h3>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={rideDetails.driverAvatar || "/placeholder.svg"} alt={rideDetails.driverName} />
              <AvatarFallback>{rideDetails.driverName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{rideDetails.driverName}</h4>
                {rideDetails.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {rideDetails.rating}
                </span>
                <span>{rideDetails.totalRides} rides</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Trip Details */}
        <div>
          <h3 className="font-semibold mb-3">Trip Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{rideDetails.from}</p>
                <p className="text-sm text-muted-foreground">Pickup location</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-secondary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{rideDetails.to}</p>
                <p className="text-sm text-muted-foreground">Drop-off location</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">
                  {rideDetails.departureTime} - {rideDetails.arrivalTime}
                </p>
                <p className="text-sm text-muted-foreground">{rideDetails.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">
                  {rideDetails.availableSeats} of {rideDetails.totalSeats} seats available
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">{rideDetails.carModel}</p>
                <p className="text-sm text-muted-foreground">{rideDetails.carPlate}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Amenities */}
        <div>
          <h3 className="font-semibold mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {rideDetails.amenities.map((amenity) => (
              <Badge key={amenity} variant="outline">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price and Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <span className="font-medium">Price per seat</span>
            <span className="text-2xl font-bold text-primary">₱{rideDetails.price}</span>
          </div>

          <RequestBookingDialog rideId={rideId} defaultPickup={rideDetails.from} defaultDropoff={rideDetails.to}>
            <Button className="w-full" size="lg">
              Book This Ride
            </Button>
          </RequestBookingDialog>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
