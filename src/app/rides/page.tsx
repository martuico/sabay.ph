"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import DateCarousel from "@/components/DateCarousel";
import RidesList from "@/components/RidesList";
import RideDetailPanel from "@/components/RideDetailPanel";
import SearchRouteForm from "@/components/SearchRouteForm";

function RidesContent() {
  const searchParams = useSearchParams();
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    searchParams.get("date") || new Date().toISOString().split("T")[0],
  );

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  return (
    <>
      {/* Hero Section with Search Form */}
      <section className="relative py-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-background overflow-hidden border-b">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ride-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path
                  d="M10 50 Q 30 30, 50 50 T 90 50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-primary"
                />
                <circle cx="10" cy="50" r="3" fill="currentColor" className="text-secondary" />
                <circle cx="90" cy="50" r="3" fill="currentColor" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ride-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <SearchRouteForm variant="inline" defaultValues={{ from, to, date: selectedDate }} />
          </div>
        </div>
      </section>

      {/* Date Carousel */}
      <section className="py-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <DateCarousel selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
      </section>

      {/* Rides Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[400px_1fr] gap-6">
            {/* Left: Rides List */}
            <div>
              <RidesList
                selectedDate={selectedDate}
                from={from}
                to={to}
                selectedRideId={selectedRide}
                onRideSelect={setSelectedRide}
              />
            </div>

            {/* Right: Detail Panel */}
            <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-8rem)]">
              <RideDetailPanel rideId={selectedRide} />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}

export default function RidesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RidesContent />
    </Suspense>
  );
}
