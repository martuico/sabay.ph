export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-medium">Active Routes</h3>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-medium">Pending Requests</h3>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <h3 className="font-medium">Earnings</h3>
          <p className="text-2xl font-bold mt-2">₱1,250</p>
        </div>
      </div>
    </div>
  );
}
