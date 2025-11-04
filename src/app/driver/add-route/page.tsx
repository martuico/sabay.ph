import CreateRouteForm from "@/components/CreateRouteForm";

export default function AddRoutePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Route</h1>
        <p className="text-muted-foreground">Create a route and share your ride with others</p>
      </div>
      <CreateRouteForm />
    </div>
  );
}
