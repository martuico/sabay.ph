"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MapPin } from "lucide-react";

const requestBookingSchema = z.object({
  pickupLocation: z.string().min(3, "Pickup location is required"),
  pickupLat: z.number().min(-90).max(90),
  pickupLng: z.number().min(-180).max(180),
  dropoffLocation: z.string().min(3, "Drop-off location is required"),
  dropLat: z.number().min(-90).max(90),
  dropLng: z.number().min(-180).max(180),
  numberOfSeats: z.number().min(1, "At least 1 seat required").max(4, "Maximum 4 seats"),
  notes: z.string().optional(),
});

type RequestBookingFormData = z.infer<typeof requestBookingSchema>;

interface RequestBookingDialogProps {
  children?: React.ReactNode;
  rideId?: string;
  defaultPickup?: string;
  defaultDropoff?: string;
}

export default function RequestBookingDialog({
  children,
  rideId,
  defaultPickup,
  defaultDropoff,
}: RequestBookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RequestBookingFormData>({
    resolver: zodResolver(requestBookingSchema),
    defaultValues: {
      pickupLocation: defaultPickup || "",
      dropoffLocation: defaultDropoff || "",
      numberOfSeats: 1,
      // Mock coordinates - in production, these would come from geocoding
      pickupLat: 14.5995,
      pickupLng: 120.9842,
      dropLat: 14.676,
      dropLng: 121.0437,
    },
  });

  const onSubmit = async (data: RequestBookingFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual booking request logic
      const bookingData = {
        ...data,
        rideId,
        status: "PENDING",
        estimatedFare: 75, // This would be calculated based on distance
      };

      console.log("Booking request data:", bookingData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Booking request sent",
        description: "The driver will be notified. You'll receive a confirmation soon.",
      });
      setOpen(false);
      reset();
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children || <Button>Request Booking</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request a Ride</DialogTitle>
          <DialogDescription>Fill in your trip details to request this ride</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickupLocation">Pickup Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="pickupLocation"
                placeholder="Enter pickup address"
                className="pl-9"
                {...register("pickupLocation")}
                disabled={isLoading}
              />
            </div>
            {errors.pickupLocation && <p className="text-sm text-destructive">{errors.pickupLocation.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoffLocation">Drop-off Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="dropoffLocation"
                placeholder="Enter drop-off address"
                className="pl-9"
                {...register("dropoffLocation")}
                disabled={isLoading}
              />
            </div>
            {errors.dropoffLocation && <p className="text-sm text-destructive">{errors.dropoffLocation.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfSeats">Number of Seats *</Label>
            <Input
              id="numberOfSeats"
              type="number"
              min="1"
              max="4"
              defaultValue="1"
              {...register("numberOfSeats", { valueAsNumber: true })}
              disabled={isLoading}
            />
            {errors.numberOfSeats && <p className="text-sm text-destructive">{errors.numberOfSeats.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or information for the driver..."
              rows={3}
              {...register("notes")}
              disabled={isLoading}
            />
          </div>

          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated Fare</span>
              <span className="text-xl font-bold text-primary">₱75</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Final fare may vary based on actual route</p>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Booking Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
