export const upcomingRides = [
  {
    id: "1",
    type: "passenger",
    from: "Manila",
    to: "Quezon City",
    date: "Nov 10, 2025",
    time: "8:00 AM",
    driverName: "Maria Santos",
    seats: 1,
    price: 150,
    status: "confirmed",
  },
  {
    id: "2",
    type: "driver",
    from: "Makati",
    to: "BGC",
    date: "Nov 12, 2025",
    time: "6:30 PM",
    passengers: 3,
    price: 450,
    status: "confirmed",
  },
];

export const rideHistory = [
  {
    id: "h1",
    type: "passenger",
    from: "Manila",
    to: "Cavite",
    date: "Nov 3, 2025",
    driverName: "Pedro Garcia",
    price: 200,
    status: "completed",
    rating: 5,
  },
  {
    id: "h2",
    type: "driver",
    from: "Quezon City",
    to: "Manila",
    date: "Nov 1, 2025",
    passengers: 2,
    price: 300,
    status: "completed",
    rating: 4.5,
  },
  {
    id: "h3",
    type: "passenger",
    from: "BGC",
    to: "Makati",
    date: "Oct 28, 2025",
    driverName: "Ana Reyes",
    price: 100,
    status: "cancelled",
  },
];

export const mockUser = {
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  phone: "+63 912 345 6789",
  avatar: "/abstract-geometric-shapes.png",
  role: "DRIVER", // or "PASSENGER"
  verified: true,
  rating: 4.8,
  totalRides: 127,
  joinedDate: "January 2024",
};
