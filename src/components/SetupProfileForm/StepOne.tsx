import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { type FieldErrors, type FieldValues, type UseFormRegister } from "react-hook-form";

export default function StepOne({
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
          1
        </div>
        <h3 className="text-lg font-semibold">Personal Information</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profilePhoto">Profile Photo *</Label>
        <div className="flex items-center gap-2">
          <Input
            id="profilePhoto"
            type="file"
            accept="image/*"
            {...register("profilePhoto")}
            disabled={isLoading}
            className="cursor-pointer"
          />
          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">Clear photo of your face for verification</p>
        {errors.profilePhoto && <p className="text-sm text-destructive">{errors.profilePhoto.message as string}</p>}
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
          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">
          National ID, Passport, Driver's License, or any government-issued ID
        </p>
        {errors.governmentId && <p className="text-sm text-destructive">{errors.governmentId.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Profession *</Label>
        <Input
          id="profession"
          placeholder="e.g., Software Engineer, Teacher, Student"
          {...register("profession")}
          disabled={isLoading}
        />
        {errors.profession && <p className="text-sm text-destructive">{errors.profession.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name (Optional)</Label>
        <Input
          id="companyName"
          placeholder="e.g., Acme Corporation"
          {...register("companyName")}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyId">Company ID (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="companyId"
            type="file"
            accept="image/*"
            {...register("companyId")}
            disabled={isLoading}
            className="cursor-pointer"
          />
          <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">Helps build trust with other users in your company</p>
      </div>
    </div>
  );
}
