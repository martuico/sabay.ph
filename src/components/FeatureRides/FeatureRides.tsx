import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import RideCard from "./RideCar";
import { weekdayRides, weekendRides } from "./RideCar.mock";

export default function FeaturedRides() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-balance">Featured Scheduled Rides Near Me</h2>
        <p className="text-muted-foreground">Join these upcoming rides and save on travel costs</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Weekdays Rides</h3>
            <div className="space-y-3">
              {weekdayRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Weekends Rides</h3>
            <div className="space-y-3">
              {weekendRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center min-h-[500px] border-primary/20">
          <div className="text-center space-y-4 p-8">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <MapPin className="h-12 w-12 text-white" />
            </div>
            <p className="text-xl font-semibold text-foreground">Interactive Map View</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Map integration would display ride locations and routes here
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
