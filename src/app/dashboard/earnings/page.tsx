import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Calendar, Download, ArrowUpRight, ArrowDownRight, ChevronLeft } from "lucide-react";
import WidgetCard from "@/components/WidgetCard";
import TransactionTabs from "@/components/TransactionTabs";
import { MonthlyBreakdown, Months, StatusTransaction } from "@/components/TransactionTabs/TransactionTabs";
import Link from "next/link";

// Mock earnings data
const earningsStats = {
  totalEarnings: 45750,
  thisMonth: 8950,
  lastMonth: 7200,
  averagePerRide: 285,
  totalRides: 160,
  thisMonthRides: 31,
};

const recentTransactions = [
  {
    id: "1",
    date: "Nov 8, 2025",
    time: "8:30 AM",
    route: "Manila → Quezon City",
    passengers: 3,
    amount: 300,
    status: "completed" as StatusTransaction.completed,
  },
  {
    id: "2",
    date: "Nov 7, 2025",
    time: "6:00 PM",
    route: "Makati → BGC",
    passengers: 2,
    amount: 200,
    status: "completed" as StatusTransaction.completed,
  },
  {
    id: "3",
    date: "Nov 6, 2025",
    time: "7:15 AM",
    route: "Quezon City → Manila",
    passengers: 4,
    amount: 542,
    status: "completed" as StatusTransaction.completed,
  },
  {
    id: "4",
    date: "Nov 5, 2025",
    time: "5:30 PM",
    route: "BGC → Makati",
    passengers: 1,
    amount: 150,
    status: "inprogress" as StatusTransaction.inprogress,
  },
  {
    id: "5",
    date: "Nov 4, 2025",
    time: "8:00 AM",
    route: "Manila → Cavite",
    passengers: 3,
    amount: 900,
    status: "inprogress" as StatusTransaction.inprogress,
  },
];

const monthlyBreakdown: MonthlyBreakdown[] = [
  { month: "November" as unknown as Months, earnings: 8950, rides: 31 },
  { month: "October" as unknown as Months, earnings: 7200, rides: 28 },
  { month: "September" as unknown as Months, earnings: 6800, rides: 25 },
  { month: "August" as unknown as Months, earnings: 7500, rides: 29 },
  { month: "July" as unknown as Months, earnings: 6200, rides: 22 },
  { month: "June" as unknown as Months, earnings: 9100, rides: 35 },
];

export default function EarningsPage() {
  const percentageChange = ((earningsStats.thisMonth - earningsStats.lastMonth) / earningsStats.lastMonth) * 100;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earnings</h1>
          <p className="text-muted-foreground">Track your ride-sharing income and transactions</p>
        </div>

        <div className="flex flex-row gap-4">
          <Link href="/dashboard">
            <Button variant="outline">
              <ChevronLeft className="cursor-pointer h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button variant="outline" className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <WidgetCard
          {...{
            subtitle: "Total Earnings",
            icon: <DollarSign className="h-5 w-5 text-primary" />,
            title: `₱${earningsStats.totalEarnings.toLocaleString()}`,
            helperText: "160 total rides",
          }}
        />

        <WidgetCard
          {...{
            subtitle: "This Month",
            icon: <TrendingUp className="h-5 w-5 text-green-500" />,
            title: `₱${earningsStats.thisMonth.toLocaleString()}`,
            helperText: (
              <div className="flex items-center gap-1 mt-1">
                {percentageChange > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <p className={`text-xs ${percentageChange > 0 ? "text-green-500" : "text-red-500"}`}>
                  {Math.abs(percentageChange).toFixed(1)}% from last month
                </p>
              </div>
            ),
          }}
        />

        <WidgetCard
          {...{
            subtitle: "Avg per Ride",
            icon: <DollarSign className="h-5 w-5 text-secondary" />,
            title: `₱${earningsStats.averagePerRide.toLocaleString()}`,
            helperText: "Average ernings",
          }}
        />

        <WidgetCard
          {...{
            subtitle: "Rides This Month",
            icon: <Calendar className="h-5 w-5 text-primary" />,
            title: `${earningsStats.thisMonthRides}`,
            helperText: "Completed rides",
          }}
        />
      </div>

      <TransactionTabs
        defaultActiveTab="overview"
        recentTransactions={recentTransactions}
        monthlyBreakdown={monthlyBreakdown}
      />
    </div>
  );
}
