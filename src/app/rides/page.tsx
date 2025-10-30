export default function RidesPage() {
  const rides = [
    { id: 1, from: "QC", to: "Makati", time: "8:00 AM" },
    { id: 2, from: "Pasig", to: "Taguig", time: "9:30 AM" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ride Requests</h2>
      <div className="space-y-4">
        {rides.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-xl shadow flex justify-between">
            <div>
              <p className="font-semibold">
                {r.from} → {r.to}
              </p>
              <p className="text-sm text-gray-500">{r.time}</p>
            </div>
            <button className="text-green-700 font-medium">Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
}
