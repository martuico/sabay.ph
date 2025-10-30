"use client";

import { useState } from "react";

export default function NewRoutePage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [seats, setSeats] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ start, end, seats });
    alert("Route created!");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create New Route</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow max-w-md">
        <label className="block mb-2 font-medium">Start Location</label>
        <input className="w-full border p-2 rounded mb-4" value={start} onChange={(e) => setStart(e.target.value)} />

        <label className="block mb-2 font-medium">End Location</label>
        <input className="w-full border p-2 rounded mb-4" value={end} onChange={(e) => setEnd(e.target.value)} />

        <label className="block mb-2 font-medium">Seats</label>
        <input
          type="number"
          min="1"
          className="w-full border p-2 rounded mb-6"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl w-full">
          Save Route
        </button>
      </form>
    </div>
  );
}
