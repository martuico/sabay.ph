import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Upload } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { type FieldErrors, type FieldValues, type UseFormRegister } from "react-hook-form";

export default function StepTwo({
  register,
  isLoading,
  errors,
  wantToBeDriver,
  setWantToBeDriver,
}: {
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
  errors: FieldErrors;
  wantToBeDriver: boolean;
  setWantToBeDriver: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
          2
        </div>
        <h3 className="text-lg font-semibold">Driver Information</h3>
      </div>

      <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="wantToBeDriver"
            checked={wantToBeDriver}
            onCheckedChange={(checked) => {
              setWantToBeDriver(checked as boolean);
            }}
            disabled={isLoading}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="wantToBeDriver" className="font-semibold cursor-pointer text-base">
              I want to become a driver
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Share rides and earn money by driving others to their destinations
            </p>
          </div>
        </div>
      </div>

      {wantToBeDriver && (
        <div className="space-y-4 pl-6 border-l-2 border-primary/20 animate-in fade-in-50 duration-300">
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
              <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
            <p className="text-xs text-muted-foreground">Upload a clear photo of both sides of your driver's license</p>
            {errors.driversLicense && (
              <p className="text-sm text-destructive">{errors.driversLicense.message as string}</p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Next step:</strong> You'll need to provide your car information to complete your driver profile.
            </p>
          </div>
        </div>
      )}

      {!wantToBeDriver && (
        <div className="bg-muted/50 border rounded-lg p-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            You can always become a driver later from your dashboard settings.
          </p>
        </div>
      )}
    </div>
  );
}
