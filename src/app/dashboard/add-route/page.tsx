import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CreateRouteForm from "@/components/CreateRouteForm";
import { Button } from "@/components/ui/button";

export default function AddRoutePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Add New Route</h1>
          <p className="text-muted-foreground">Create a route and share your ride with others</p>
        </div>

        <Link href="/dashboard">
          <Button variant="outline" className="cursor-pointer ">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <CreateRouteForm />
    </div>
  );
}
