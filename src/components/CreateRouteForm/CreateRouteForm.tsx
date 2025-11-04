"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Navigation, Clock, Users, DollarSign, Calendar, Repeat, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RouteFormData, routeSchema, weekDaysOptions } from "./CreateRouteForm.interform";

export default function CreateRouteForm() {
  const { toast } = useToast();
  const [scheduleType, setScheduleType] = useState<"one-time" | "recurring">("one-time");
  const [recurringType, setRecurringType] = useState<"daily" | "weekly" | "monthly" | "custom">("weekly");
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const [selectedMonthDays, setSelectedMonthDays] = useState<string[]>([]);
  const [stops, setStops] = useState<string[]>([]);
  const [currentStop, setCurrentStop] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      scheduleType: "one-time",
      recurringType: "weekly",
      weekDays: [],
      monthDays: [],
    },
  });

  const onSubmit = (data: RouteFormData) => {
    console.log("Route data:", { ...data, stops });
    toast({
      title: "Route Created!",
      description: "Your route has been successfully added and is now available for booking.",
    });
  };

  const toggleWeekDay = (day: string) => {
    const updated = selectedWeekDays.includes(day)
      ? selectedWeekDays.filter((d) => d !== day)
      : [...selectedWeekDays, day];
    setSelectedWeekDays(updated);
    setValue("weekDays", updated);
  };

  const toggleMonthDay = (day: string) => {
    const updated = selectedMonthDays.includes(day)
      ? selectedMonthDays.filter((d) => d !== day)
      : [...selectedMonthDays, day];
    setSelectedMonthDays(updated);
    setValue("monthDays", updated);
  };

  const addStop = () => {
    if (currentStop.trim()) {
      setStops([...stops, currentStop.trim()]);
      setCurrentStop("");
    }
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Route Details */}
      <Card>
        <CardHeader>
          <CardTitle>Route Details</CardTitle>
          <CardDescription>Enter your route information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                From
              </Label>
              <Input
                id="from"
                placeholder="Starting location"
                {...register("from")}
                className={errors.from ? "border-destructive" : ""}
              />
              {errors.from && <p className="text-sm text-destructive">{errors.from.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="to" className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-secondary" />
                To
              </Label>
              <Input
                id="to"
                placeholder="Destination"
                {...register("to")}
                className={errors.to ? "border-destructive" : ""}
              />
              {errors.to && <p className="text-sm text-destructive">{errors.to.message}</p>}
            </div>
          </div>

          {/* Stops */}
          <div className="space-y-2">
            <Label>Stops (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a stop along the way"
                value={currentStop}
                onChange={(e) => setCurrentStop(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addStop())}
              />
              <Button type="button" onClick={addStop} size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {stops.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {stops.map((stop, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {stop}
                    <button type="button" onClick={() => removeStop(index)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availableSeats" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Available Seats
              </Label>
              <Input
                id="availableSeats"
                type="number"
                min="1"
                max="7"
                placeholder="1-7"
                {...register("availableSeats")}
                className={errors.availableSeats ? "border-destructive" : ""}
              />
              {errors.availableSeats && <p className="text-sm text-destructive">{errors.availableSeats.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerSeat" className="flex items-center gap-2">
                Price per Seat (₱)
              </Label>
              <Input
                id="pricePerSeat"
                type="number"
                min="1"
                placeholder="100"
                {...register("pricePerSeat")}
                className={errors.pricePerSeat ? "border-destructive" : ""}
              />
              {errors.pricePerSeat && <p className="text-sm text-destructive">{errors.pricePerSeat.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any additional information about your route..."
              {...register("description")}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule
          </CardTitle>
          <CardDescription>Set when this route will be available</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Schedule Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="one-time"
                  checked={scheduleType === "one-time"}
                  onChange={(e) => {
                    setScheduleType("one-time");
                    setValue("scheduleType", "one-time");
                  }}
                  className="h-4 w-4"
                />
                <span>One-time</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="recurring"
                  checked={scheduleType === "recurring"}
                  onChange={(e) => {
                    setScheduleType("recurring");
                    setValue("scheduleType", "recurring");
                  }}
                  className="h-4 w-4"
                />
                <span className="flex items-center gap-1">
                  <Repeat className="h-4 w-4" />
                  Recurring
                </span>
              </label>
            </div>
          </div>

          {scheduleType === "one-time" && (
            <div className="space-y-2">
              <Label htmlFor="oneTimeDate">Date</Label>
              <Input id="oneTimeDate" type="date" {...register("oneTimeDate")} />
            </div>
          )}

          {scheduleType === "recurring" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="recurringType">Repeat</Label>
                <Select
                  value={recurringType}
                  onValueChange={(value: any) => {
                    setRecurringType(value);
                    setValue("recurringType", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {recurringType === "weekly" && (
                <div className="space-y-2">
                  <Label>Select Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {weekDaysOptions.map((day) => (
                      <Button
                        key={day.value}
                        type="button"
                        variant={selectedWeekDays.includes(day.value) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleWeekDay(day.value)}
                        className={cn(selectedWeekDays.includes(day.value) && "bg-primary hover:bg-primary/90")}
                      >
                        {day.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {recurringType === "monthly" && (
                <div className="space-y-2">
                  <Label>Select Days of Month</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={selectedMonthDays.includes(day.toString()) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleMonthDay(day.toString())}
                        className={cn(
                          "h-10 w-10 p-0",
                          selectedMonthDays.includes(day.toString()) && "bg-primary hover:bg-primary/90",
                        )}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departureTime" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Departure Time
                  </Label>
                  <Input
                    id="departureTime"
                    type="time"
                    {...register("departureTime")}
                    className={errors.departureTime ? "border-destructive" : ""}
                  />
                  {errors.departureTime && <p className="text-sm text-destructive">{errors.departureTime.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" {...register("startDate")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input id="endDate" type="date" {...register("endDate")} />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" size="lg" className="flex-1 bg-primary hover:bg-primary/90">
          Create Route
        </Button>
        <Button type="button" size="lg" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
