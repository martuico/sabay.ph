"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface RidesListProps {
  selectedDate: string;
  from: string;
  to: string;
  selectedRideId: string | null;
  onRideSelect: (rideId: string) => void;
}

// Mock ride data
const generateMockRides = (count: number) => {
  const rides = [];
  for (let i = 1; i <= count; i++) {
    rides.push({
      id: `ride-${i}`,
      driverName: `Driver ${i}`,
      driverAvatar: `/placeholder.svg?height=40&width=40&query=driver${i}`,
      from: "Manila",
      to: "Quezon City",
      departureTime: `${7 + (i % 12)}:${(i * 15) % 60}0 AM`,
      availableSeats: Math.floor(Math.random() * 3) + 1,
      price: Math.floor(Math.random() * 100) + 50,
      rating: (4 + Math.random()).toFixed(1),
      verified: i % 3 === 0,
    });
  }
  return rides;
};

export default function RidesList({ selectedDate, from, to, selectedRideId, onRideSelect }: RidesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 4;
  const allRides = generateMockRides(15);
  const totalPages = Math.ceil(allRides.length / ridesPerPage);

  const startIndex = (currentPage - 1) * ridesPerPage;
  const currentRides = allRides.slice(startIndex, startIndex + ridesPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Available Rides <span className="text-muted-foreground text-base">({allRides.length})</span>
        </h2>
      </div>

      <div className="space-y-3">
        {currentRides.map((ride) => (
          <Card
            key={ride.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedRideId === ride.id && "ring-2 ring-primary shadow-lg",
            )}
            onClick={() => onRideSelect(ride.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={ride.driverAvatar || "/placeholder.svg"} alt={ride.driverName} />
                  <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{ride.driverName}</h3>
                    {ride.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground ml-auto">★ {ride.rating}</span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{ride.departureTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {ride.from} → {ride.to}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{ride.availableSeats} seats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        Gas:
                        <span className="font-semibold text-primary">₱{ride.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
