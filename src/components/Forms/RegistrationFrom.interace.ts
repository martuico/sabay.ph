import * as z from "zod";

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export interface RegistrationDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const registrationSchema = z
  .object({
    // Basic info
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),

    // Profile photo
    photo: z.any().refine((files) => files?.length > 0, "Profile photo is required"),

    // Government ID
    governmentId: z.any().refine((files) => files?.length > 0, "Government ID is required"),

    // Driver fields (conditional)
    wantToShareRide: z.boolean().default(false),
    driversLicense: z.any().optional(),

    // Car information (conditional)
    carMake: z.string().optional(),
    carModel: z.string().optional(),
    carYear: z.string().optional(),
    carPlate: z.string().optional(),
    carColor: z.string().optional(),
    carSignup: z.any().optional(),
    carInsurance: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.wantToShareRide) {
        return data.driversLicense && data.driversLicense.length > 0;
      }
      return true;
    },
    {
      message: "Driver's license is required to share rides",
      path: ["driversLicense"],
    },
  )
  .refine(
    (data) => {
      if (data.wantToShareRide) {
        return data.carMake && data.carModel && data.carYear && data.carPlate && data.carColor;
      }
      return true;
    },
    {
      message: "All car information is required to share rides",
      path: ["carMake"],
    },
  );
