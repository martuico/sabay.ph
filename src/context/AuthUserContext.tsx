"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Role, User, User as UserPrisma } from "@/generated/prisma";
import { authClient } from "@/lib/auth-client";

export interface Profile extends UserPrisma, User {}

export interface UserContextType {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
}

export const UserContext = createContext<UserContextType>({
  profile: {
    id: "",
    name: "",
    email: "",
    role: Role.PASSENGER,
    ratingScore: 0 as unknown as bigint,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "",
    firstName: "",
    lastName: "",
    phone: "",
    verifiedProfile: false,
    emailVerified: false,
    profilePhotoUrl: "",
    governmentId: "",
    govermentPhotoUrl: "",
    profession: "",
    companyName: "",
    companyId: "",
    wantToBeDriver: false,
    hasAccessToBeDriver: false,
    driversLicense: "",
    driversLicensePhotoUrl: "",
    carId: "",
  },
  setProfile: () => {},
}); // Provide a default value

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({} as Profile);

  useEffect(() => {
    let ignore = false;

    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      if (!ignore) {
        setProfile((prev) => prev ?? (data?.user as unknown as Profile));
      }
    };

    fetchSession();

    return () => {
      ignore = true;
    };
  }, []);

  return <UserContext.Provider value={{ profile, setProfile }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a UserProvider");
  }
  return context;
};
