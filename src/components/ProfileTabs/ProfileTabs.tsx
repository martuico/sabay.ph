"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  User as UserIcon,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Car,
  Upload,
  CheckCircle2,
  Edit2,
  Save,
  X,
  FileText,
  Shield,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import z from "zod";
import { User } from "@/generated/prisma";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  profession: z.string().min(2, "Profession is required"),
  companyName: z.string().optional(),
});

const carInfoSchema = z.object({
  carMake: z.string().min(2, "Car make is required"),
  carModel: z.string().min(2, "Car model is required"),
  carYear: z.string().min(4, "Car year is required"),
  carPlate: z.string().min(2, "Plate number is required"),
  carColor: z.string().min(2, "Car color is required"),
  fuelType: z.string().min(2, "Fuel type is required"),
  seatingCapacity: z.string().min(1, "Seating capacity is required"),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
type CarInfoFormData = z.infer<typeof carInfoSchema>;

export default function ProfileTabs({ user }: { user: User }) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingCar, setIsEditingCar] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();

  const personalForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      profession: user.profession,
      companyName: user.companyName,
    },
  });

  const carForm = useForm<CarInfoFormData>({
    resolver: zodResolver(carInfoSchema),
    defaultValues: {
      carMake: user.car.make,
      carModel: user.car.model,
      carYear: user.car.year,
      carPlate: user.car.plate,
      carColor: user.car.color,
      fuelType: user.car.fuelType,
      seatingCapacity: user.car.seatingCapacity,
    },
  });

  const onSubmitPersonal = async (data: PersonalInfoFormData) => {
    try {
      // TODO: Implement actual update logic
      console.log("Updating personal info:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully.",
      });
      setIsEditingPersonal(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmitCar = async (data: CarInfoFormData) => {
    try {
      // TODO: Implement actual update logic
      console.log("Updating car info:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Car information updated",
        description: "Your car details have been updated successfully.",
      });
      setIsEditingCar(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        {user.isDriver && <TabsTrigger value="car">Car Information</TabsTrigger>}
      </TabsList>

      {/* Personal Information Tab */}
      <TabsContent value="personal" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details and contact information</CardDescription>
              </div>
              {!isEditingPersonal ? (
                <Button onClick={() => setIsEditingPersonal(true)} variant="outline" size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsEditingPersonal(false);
                    personalForm.reset();
                  }}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={personalForm.handleSubmit(onSubmitPersonal)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      {...personalForm.register("firstName")}
                      disabled={!isEditingPersonal}
                      className={!isEditingPersonal ? "bg-muted" : ""}
                    />
                  </div>
                  {personalForm.formState.errors.firstName && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      {...personalForm.register("lastName")}
                      disabled={!isEditingPersonal}
                      className={!isEditingPersonal ? "bg-muted" : ""}
                    />
                  </div>
                  {personalForm.formState.errors.lastName && (
                    <p className="text-sm text-destructive">{personalForm.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...personalForm.register("email")}
                    disabled={!isEditingPersonal}
                    className={!isEditingPersonal ? "bg-muted" : ""}
                  />
                </div>
                {personalForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{personalForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    {...personalForm.register("phone")}
                    disabled={!isEditingPersonal}
                    className={!isEditingPersonal ? "bg-muted" : ""}
                  />
                </div>
                {personalForm.formState.errors.phone && (
                  <p className="text-sm text-destructive">{personalForm.formState.errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profession"
                    {...personalForm.register("profession")}
                    disabled={!isEditingPersonal}
                    className={!isEditingPersonal ? "bg-muted" : ""}
                  />
                </div>
                {personalForm.formState.errors.profession && (
                  <p className="text-sm text-destructive">{personalForm.formState.errors.profession.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="companyName"
                    {...personalForm.register("companyName")}
                    disabled={!isEditingPersonal}
                    className={!isEditingPersonal ? "bg-muted" : ""}
                  />
                </div>
              </div>

              {isEditingPersonal && (
                <Button type="submit" className="w-full md:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Documents Tab */}
      <TabsContent value="documents" className="mt-6">
        <div className="space-y-4">
          {/* Government ID */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Government Valid ID
              </CardTitle>
              <CardDescription>Your government-issued identification document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="w-full md:w-48 h-32 border-2 border-dashed rounded-lg overflow-hidden bg-muted">
                  <img
                    src={user.governmentIdUrl || "/placeholder.svg"}
                    alt="Government ID"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Your government ID has been verified and approved.</p>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Update Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company ID */}
          {user.companyIdUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-secondary" />
                  Company ID
                </CardTitle>
                <CardDescription>Your company identification card</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="w-full md:w-48 h-32 border-2 border-dashed rounded-lg overflow-hidden bg-muted">
                    <img
                      src={user.companyIdUrl || "/placeholder.svg"}
                      alt="Company ID"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Your company ID has been verified.</p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Update Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Driver's License */}
          {user.isDriver && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Driver's License
                </CardTitle>
                <CardDescription>Your valid driver's license</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="w-full md:w-48 h-32 border-2 border-dashed rounded-lg overflow-hidden bg-muted">
                    <img
                      src={user.driversLicenseUrl || "/placeholder.svg"}
                      alt="Driver's License"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your driver's license has been verified and approved.
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Update Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      {/* Car Information Tab */}
      {user.isDriver && (
        <TabsContent value="car" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Car Information</CardTitle>
                  <CardDescription>Manage your vehicle details and documents</CardDescription>
                </div>
                {!isEditingCar ? (
                  <Button onClick={() => setIsEditingCar(true)} variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsEditingCar(false);
                      carForm.reset();
                    }}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={carForm.handleSubmit(onSubmitCar)} className="space-y-6">
                {/* Car Photos */}
                <div className="space-y-2">
                  <Label>Car Photos</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {user.car.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-video border-2 border-dashed rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Car photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {isEditingCar && (
                    <Button variant="outline" size="sm" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Update Photos
                    </Button>
                  )}
                </div>

                {/* Car Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carMake">Make</Label>
                    <Input
                      id="carMake"
                      {...carForm.register("carMake")}
                      disabled={!isEditingCar}
                      className={!isEditingCar ? "bg-muted" : ""}
                    />
                    {carForm.formState.errors.carMake && (
                      <p className="text-sm text-destructive">{carForm.formState.errors.carMake.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carModel">Model</Label>
                    <Input
                      id="carModel"
                      {...carForm.register("carModel")}
                      disabled={!isEditingCar}
                      className={!isEditingCar ? "bg-muted" : ""}
                    />
                    {carForm.formState.errors.carModel && (
                      <p className="text-sm text-destructive">{carForm.formState.errors.carModel.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carYear">Year</Label>
                    <Input
                      id="carYear"
                      {...carForm.register("carYear")}
                      disabled={!isEditingCar}
                      className={!isEditingCar ? "bg-muted" : ""}
                    />
                    {carForm.formState.errors.carYear && (
                      <p className="text-sm text-destructive">{carForm.formState.errors.carYear.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carPlate">Plate Number</Label>
                    <Input
                      id="carPlate"
                      {...carForm.register("carPlate")}
                      disabled={!isEditingCar}
                      className={!isEditingCar ? "bg-muted" : ""}
                    />
                    {carForm.formState.errors.carPlate && (
                      <p className="text-sm text-destructive">{carForm.formState.errors.carPlate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carColor">Color</Label>
                    <Input
                      id="carColor"
                      {...carForm.register("carColor")}
                      disabled={!isEditingCar}
                      className={!isEditingCar ? "bg-muted" : ""}
                    />
                    {carForm.formState.errors.carColor && (
                      <p className="text-sm text-destructive">{carForm.formState.errors.carColor.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    {isEditingCar ? (
                      <Select defaultValue={user.car.fuelType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gasoline">Gasoline</SelectItem>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input value={user.car.fuelType} disabled className="bg-muted" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seatingCapacity">Seating Capacity</Label>
                    {isEditingCar ? (
                      <Select defaultValue={user.car.seatingCapacity}>
                        <SelectTrigger>
                          <SelectValue />
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
                    ) : (
                      <Input value={`${user.car.seatingCapacity} passengers`} disabled className="bg-muted" />
                    )}
                  </div>
                </div>

                {/* Car Documents */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Vehicle Documents
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Car Registration (OR/CR)</Label>
                      <div className="aspect-video border-2 border-dashed rounded-lg overflow-hidden bg-muted">
                        <img
                          src={user.car.registrationUrl || "/placeholder.svg"}
                          alt="Car Registration"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isEditingCar && (
                        <Button variant="outline" size="sm" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Car Insurance</Label>
                      <div className="aspect-video border-2 border-dashed rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={user.car.insuranceUrl || "/placeholder.svg"}
                          alt="Car Insurance"
                          className="w-full h-full object-cover"
                          width={400}
                          height={600}
                        />
                      </div>
                      {isEditingCar && (
                        <Button variant="outline" size="sm" type="button">
                          <Upload className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {isEditingCar && (
                  <Button type="submit" className="w-full md:w-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
}
