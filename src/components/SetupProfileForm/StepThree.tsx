import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { type FieldErrors, type FieldValues, type UseFormRegister } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function StepThree({
  register,
  isLoading,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
  errors: FieldErrors;
}) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
          3
        </div>
        <h3 className="text-lg font-semibold">Car Information</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="carMake">Car Make *</Label>
          <Input id="carMake" placeholder="e.g., Toyota" {...register("carMake")} disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carModel">Car Model *</Label>
          <Input id="carModel" placeholder="e.g., Vios" {...register("carModel")} disabled={isLoading} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="carYear">Year *</Label>
          <Input id="carYear" placeholder="2020" {...register("carYear")} disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carPlate">Plate Number *</Label>
          <Input id="carPlate" placeholder="ABC 1234" {...register("carPlate")} disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carColor">Color *</Label>
          <Input id="carColor" placeholder="White" {...register("carColor")} disabled={isLoading} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fuelType">Fuel Type *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatingCapacity">Seating Capacity *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 passengers</SelectItem>
              <SelectItem value="3">3 passengers</SelectItem>
              <SelectItem value="4">4 passengers</SelectItem>
              <SelectItem value="5">5 passengers</SelectItem>
              <SelectItem value="6">6 passengers</SelectItem>
              <SelectItem value="7">7+ passengers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="carPhotos">Car Photos *</Label>
        <div className="flex items-center gap-2">
          <Input
            id="carPhotos"
            type="file"
            accept="image/*"
            multiple
            {...register("carPhotos")}
            disabled={isLoading}
            className="cursor-pointer"
          />
          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">Upload at least 3 photos: front, side, and interior views</p>
        {errors.carPhotos && <p className="text-sm text-destructive">{errors.carPhotos.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="carRegistration">Car Registration (OR/CR) *</Label>
        <div className="flex items-center gap-2">
          <Input
            id="carRegistration"
            type="file"
            accept="image/*"
            {...register("carRegistration")}
            disabled={isLoading}
            className="cursor-pointer"
          />
          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">Official Receipt and Certificate of Registration</p>
        {errors.carRegistration && (
          <p className="text-sm text-destructive">{errors.carRegistration.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="carInsurance">Car Insurance *</Label>
        <div className="flex items-center gap-2">
          <Input
            id="carInsurance"
            type="file"
            accept="image/*"
            {...register("carInsurance")}
            disabled={isLoading}
            className="cursor-pointer"
          />
          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">Valid car insurance certificate</p>
        {errors.carInsurance && <p className="text-sm text-destructive">{errors.carInsurance.message as string}</p>}
      </div>
    </div>
  );
}
