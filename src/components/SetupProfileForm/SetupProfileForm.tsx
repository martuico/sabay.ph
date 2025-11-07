"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SetupProfileFormData, setupProfileSchema } from "./SetupProfileForm.interface";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

//const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function SetupProfileForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [wantToBeDriver, setWantToBeDriver] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const totalSteps = wantToBeDriver ? 3 : 2;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SetupProfileFormData>({
    resolver: zodResolver(setupProfileSchema),
    defaultValues: {
      wantToBeDriver: false,
    },
  });

  const onSubmit = async (data: SetupProfileFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual profile setup logic
      console.log("Profile setup data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Profile setup complete!",
        description: "Welcome to Sabay.ph! Your profile has been created successfully.",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch {
      toast({
        title: "Setup failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof SetupProfileFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["profilePhoto", "governmentId", "profession"];
    } else if (currentStep === 2) {
      if (wantToBeDriver) {
        fieldsToValidate = ["driversLicense"];
      }
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <StepOne register={register as unknown as UseFormRegister<FieldValues>} isLoading={isLoading} errors={errors} />
      )}

      {/* Step 2: Driver Information */}
      {currentStep === 2 && (
        <StepTwo
          register={register as unknown as UseFormRegister<FieldValues>}
          isLoading={isLoading}
          errors={errors}
          wantToBeDriver={wantToBeDriver}
          setWantToBeDriver={setWantToBeDriver}
        />
      )}

      {/* Step 3: Car Information (only if driver) */}
      {currentStep === 3 && wantToBeDriver && (
        <StepThree
          register={register as unknown as UseFormRegister<FieldValues>}
          isLoading={isLoading}
          errors={errors}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1 || isLoading}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {currentStep < totalSteps ? (
          <Button type="button" onClick={handleNext} disabled={isLoading}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Complete Setup
          </Button>
        )}
      </div>
    </form>
  );
}
