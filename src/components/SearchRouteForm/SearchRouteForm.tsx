"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

const searchSchema = z.object({
  from: z.string().min(2, "Please enter a starting location"),
  to: z.string().min(2, "Please enter a destination"),
  date: z.string().min(1, "Please select a date"),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchRouteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    console.log("Search data:", data);
    // Handle search logic here
  };

  return (
    <Card className="shadow-lg border-primary/20 w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl md:text-4xl font-bold text-balance">Find Your Perfect Ride</CardTitle>
        <CardDescription className="text-base">
          Search for available routes and connect with fellow travelers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              From
            </Label>
            <Input
              id="from"
              placeholder="Enter starting location"
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
              placeholder="Enter destination"
              {...register("to")}
              className={errors.to ? "border-destructive" : ""}
            />
            {errors.to && <p className="text-sm text-destructive">{errors.to.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" {...register("date")} className={errors.date ? "border-destructive" : ""} />
            {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
            Search Routes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
