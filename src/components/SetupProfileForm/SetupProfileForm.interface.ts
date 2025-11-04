import z from "zod";

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  profilePhoto: z.any().refine((files) => files?.length > 0, "Profile photo is required"),
  governmentId: z.any().refine((files) => files?.length > 0, "Government ID is required"),
  profession: z.string().min(2, "Profession is required"),
  companyName: z.string().optional(),
  companyId: z.any().optional(),
});

// Step 2: Driver Information (conditional)
export const driverInfoSchema = z.object({
  wantToBeDriver: z.boolean(),
  driversLicense: z.string(),
});

// Step 3: Car Information (conditional)
export const carInfoSchema = z.object({
  carMake: z.string().optional(),
  carModel: z.string().optional(),
  carYear: z.string().optional(),
  carPlate: z.string().optional(),
  carColor: z.string().optional(),
  fuelType: z.string().optional(),
  seatingCapacity: z.string().optional(),
  carPhotos: z.any().optional(),
  carRegistration: z.any().optional(),
  carInsurance: z.any().optional(),
});

export const setupProfileSchema = personalInfoSchema.and(driverInfoSchema).and(carInfoSchema);

export type SetupProfileFormData = z.infer<typeof setupProfileSchema>;
