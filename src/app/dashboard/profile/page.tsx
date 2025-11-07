import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import { User } from "@/generated/prisma";

// Mock user data
const mockUserData = {
  firstName: "Juan",
  lastName: "Dela Cruz",
  email: "juan@example.com",
  phone: "+63 912 345 6789",
  avatar: "/abstract-geometric-shapes.png",
  profession: "Software Engineer",
  companyName: "Tech Corp",
  verified: true,
  isDriver: true,
  governmentIdUrl: "/placeholder.svg",
  companyIdUrl: "/placeholder.svg",
  driversLicenseUrl: "/placeholder.svg",
  car: {
    make: "Toyota",
    model: "Vios",
    year: "2020",
    plate: "ABC 1234",
    color: "White",
    fuelType: "Gasoline",
    seatingCapacity: "4",
    photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    registrationUrl: "/placeholder.svg",
    insuranceUrl: "/placeholder.svg",
  },
};
export default function Profile() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <ProfileHeader user={mockUserData as unknown as User} />
      {/* Tabs */}
      <ProfileTabs user={mockUserData as unknown as User} />
    </div>
  );
}
