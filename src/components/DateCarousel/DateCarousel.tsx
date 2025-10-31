"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateCarouselProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

// Mock data for ride counts per date
const generateDateData = (startDate: Date) => {
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push({
      date: date.toISOString().split("T")[0],
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
      rideCount: Math.floor(Math.random() * 50) + 5,
    });
  }
  return dates;
};

export default function DateCarousel({ selectedDate, onDateChange }: DateCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const dates = generateDateData(new Date());
  const visibleCount = 7;

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const handleNext = () => {
    setStartIndex(Math.min(dates.length - visibleCount, startIndex + 1));
  };

  const visibleDates = dates.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="flex items-center gap-2 max-w-4xl mx-auto">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={startIndex === 0}
        className="shrink-0 bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-2 overflow-hidden flex-1">
        {visibleDates.map((dateData) => (
          <button
            key={dateData.date}
            onClick={() => onDateChange(dateData.date)}
            className={cn(
              "flex-1 min-w-[80px] p-3 rounded-lg border-2 transition-all hover:border-primary/50",
              "flex flex-col items-center gap-1",
              selectedDate === dateData.date
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card hover:bg-accent",
            )}
          >
            <div className="text-xs font-medium opacity-80">{dateData.month}</div>
            <div className="text-2xl font-bold">{dateData.day.toString().padStart(2, "0")}</div>
            <div className="text-xs opacity-80">{dateData.rideCount} Rides</div>
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={startIndex >= dates.length - visibleCount}
        className="shrink-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
