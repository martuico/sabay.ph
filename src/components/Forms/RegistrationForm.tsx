import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { RegistrationFormData, registrationSchema } from "./RegistrationFrom.interace";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function RegistrationForm({ children, open: controlledOpen, onOpenChange }: RegistrationDialogProps) {
  const { toast } = useToast();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wantToShareRide, setWantToShareRide] = useState(false);

  const setOpen = onOpenChange || setInternalOpen;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      wantToShareRide: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration logic
      console.log("Signup data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Signup successful",
        description: "Welcome to Sabay.ph! You can now login.",
      });
      setOpen(false);
      reset();
      setWantToShareRide(false);
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Basic Information</h3>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" placeholder="Juan Dela Cruz" {...register("fullName")} disabled={isLoading} />
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" placeholder="juan@example.com" {...register("email")} disabled={isLoading} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" type="tel" placeholder="+63 912 345 6789" {...register("phone")} disabled={isLoading} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>
        </div>
      </div>

      {/* Document Uploads */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Required Documents</h3>

        <div className="space-y-2">
          <Label htmlFor="photo">Profile Photo *</Label>
          <div className="flex items-center gap-2">
            <Input
              id="photo"
              type="file"
              accept="image/*"
              {...register("photo")}
              disabled={isLoading}
              className="cursor-pointer"
            />
            <Upload className="h-4 w-4 text-muted-foreground" />
          </div>
          {errors.photo && <p className="text-sm text-destructive">{errors.photo.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="governmentId">Government Valid ID *</Label>
          <div className="flex items-center gap-2">
            <Input
              id="governmentId"
              type="file"
              accept="image/*"
              {...register("governmentId")}
              disabled={isLoading}
              className="cursor-pointer"
            />
            <Upload className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">Driver's License, Passport, or National ID</p>
          {errors.governmentId && <p className="text-sm text-destructive">{errors.governmentId.message as string}</p>}
        </div>
      </div>

      {/* Driver Option */}
      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="wantToShareRide"
            checked={wantToShareRide}
            onCheckedChange={(checked) => {
              setWantToShareRide(checked as boolean);
            }}
            disabled={isLoading}
          />
          <Label htmlFor="wantToShareRide" className="font-semibold cursor-pointer">
            I want to share rides (Become a driver)
          </Label>
        </div>

        {wantToShareRide && (
          <div className="space-y-4 pl-6 border-l-2 border-primary/20">
            <div className="space-y-2">
              <Label htmlFor="driversLicense">Driver's License *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="driversLicense"
                  type="file"
                  accept="image/*"
                  {...register("driversLicense")}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {errors.driversLicense && (
                <p className="text-sm text-destructive">{errors.driversLicense.message as string}</p>
              )}
            </div>

            <h4 className="font-semibold text-sm">Car Information</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carMake">Car Make *</Label>
                <Input id="carMake" placeholder="Toyota" {...register("carMake")} disabled={isLoading} />
                {errors.carMake && <p className="text-sm text-destructive">{errors.carMake.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carModel">Car Model *</Label>
                <Input id="carModel" placeholder="Vios" {...register("carModel")} disabled={isLoading} />
                {errors.carModel && <p className="text-sm text-destructive">{errors.carModel.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carYear">Year *</Label>
                <Input id="carYear" placeholder="2020" {...register("carYear")} disabled={isLoading} />
                {errors.carYear && <p className="text-sm text-destructive">{errors.carYear.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carPlate">Plate Number *</Label>
                <Input id="carPlate" placeholder="ABC 1234" {...register("carPlate")} disabled={isLoading} />
                {errors.carPlate && <p className="text-sm text-destructive">{errors.carPlate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="carColor">Color *</Label>
                <Input id="carColor" placeholder="White" {...register("carColor")} disabled={isLoading} />
                {errors.carColor && <p className="text-sm text-destructive">{errors.carColor.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carSignup">Car Registration (OR/CR)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="carSignup"
                  type="file"
                  accept="image/*"
                  {...register("carSignup")}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carInsurance">Car Insurance</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="carInsurance"
                  type="file"
                  accept="image/*"
                  {...register("carInsurance")}
                  disabled={isLoading}
                  className="cursor-pointer"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
}
