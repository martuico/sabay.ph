import z from "zod";

export const routeSchema = z.object({
  from: z.string().min(2, "Starting location is required"),
  to: z.string().min(2, "Destination is required"),
  departureTime: z.string().min(1, "Departure time is required"),
  availableSeats: z.string().min(1, "Number of seats is required"),
  pricePerSeat: z.string().min(1, "Price per seat is required"),
  description: z.string().optional(),
  scheduleType: z.enum(["one-time", "recurring"]),
  oneTimeDate: z.string().optional(),
  recurringType: z.enum(["daily", "weekly", "monthly", "custom"]).optional(),
  weekDays: z.array(z.string()).optional(),
  monthDays: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type RouteFormData = z.infer<typeof routeSchema>;

export const weekDaysOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];
