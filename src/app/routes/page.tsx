import Link from "next/link";

export default function RoutesPage() {
  const routes = [
    { id: 1, start: "Quezon City", end: "Makati", seats: 3 },
    { id: 2, start: "Taguig", end: "Pasig", seats: 2 },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Your Routes</h2>
        <Link href="/routes/new" className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm">
          + New Route
        </Link>
      </div>
      <div className="space-y-4">
        {routes.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">
                {r.start} → {r.end}
              </p>
              <p className="text-sm text-gray-500">Seats: {r.seats}</p>
            </div>
            <button className="text-green-700 font-medium">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}
