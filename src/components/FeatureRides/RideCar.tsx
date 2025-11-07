import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { weekdayRides } from "./RideCar.mock";

export default function RideCard({ ride }: { ride: (typeof weekdayRides)[0] }) {
  return (
    <Card className="hover:shadow-md transition-shadow hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {ride.from} → {ride.to}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {ride.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {ride.time}
              </span>
            </CardDescription>
          </div>
          <Badge className="font-bold bg-primary text-primary-foreground">{ride.price}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Users className="h-4 w-4" />
            {ride.seats} seats left
          </span>
          <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground bg-transparent">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
