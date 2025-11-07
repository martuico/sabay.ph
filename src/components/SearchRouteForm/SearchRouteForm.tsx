"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Navigation, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  from: z.string().min(2, "Please enter a starting location"),
  to: z.string().min(2, "Please enter a destination"),
  date: z.string().min(1, "Please select a date"),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchRouteFormProps {
  defaultValues?: Partial<SearchFormData>;
  variant?: "default" | "inline";
}

export default function SearchRouteForm({ defaultValues, variant = "default" }: SearchRouteFormProps = {}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues,
  });

  const onSubmit = (data: SearchFormData) => {
    console.log("Search data:", data);
    const params = new URLSearchParams({
      from: data.from,
      to: data.to,
      date: data.date,
    });
    router.push(`/rides?${params.toString()}`);
  };

  if (variant === "inline") {
    return (
      <Card className="shadow-md border-primary/20 w-full">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="from-inline" className="text-xs flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-primary" />
                From
              </Label>
              <Input
                id="from-inline"
                placeholder="Starting location"
                {...register("from")}
                className={cn("h-9", errors.from ? "border-destructive" : "")}
              />
              {errors.from && <p className="text-xs text-destructive">{errors.from.message}</p>}
            </div>

            <div className="flex-1 space-y-1.5">
              <Label htmlFor="to-inline" className="text-xs flex items-center gap-1.5">
                <Navigation className="h-3 w-3 text-secondary" />
                To
              </Label>
              <Input
                id="to-inline"
                placeholder="Destination"
                {...register("to")}
                className={cn("h-9", errors.to ? "border-destructive" : "")}
              />
              {errors.to && <p className="text-xs text-destructive">{errors.to.message}</p>}
            </div>

            <div className="w-full md:w-40 space-y-1.5">
              <Label htmlFor="date-inline" className="text-xs">
                Date
              </Label>
              <Input
                id="date-inline"
                type="date"
                {...register("date")}
                className={cn("h-9", errors.date ? "border-destructive" : "")}
              />
              {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90 h-9 md:w-auto w-full" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

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
