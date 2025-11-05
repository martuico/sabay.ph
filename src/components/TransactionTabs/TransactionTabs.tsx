"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Calendar1, MapPin, Users } from "lucide-react";

export enum StatusTransaction {
  completed = "Completed",
  inprogress = "In Progress",
  void = "Void",
}

export interface Transactions {
  id: string | number;
  date: string;
  time: string;
  route: string;
  passengers: number;
  amount: number;
  status: StatusTransaction;
}
export enum Months {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December",
}

export interface MonthlyBreakdown {
  month: Months;
  earnings: number;
  rides: number;
}

export interface TransactionTabsProps {
  defaultActiveTab: "overview" | "monthly";
  recentTransactions: Transactions[];
  monthlyBreakdown: MonthlyBreakdown[];
}

export default function TransactionTabs({
  defaultActiveTab,
  recentTransactions,
  monthlyBreakdown,
}: TransactionTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "monthly">(defaultActiveTab || "overview");
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "overview" | "monthly")}>
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="overview">Recent Transactions</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest completed rides and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {transaction.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {transaction.date} • {transaction.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold mb-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{transaction.route}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{transaction.passengers} passengers</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₱{transaction.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monthly" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
            <CardDescription>Your earnings history by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyBreakdown.map((month, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar1 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{month.month}</p>
                      <p className="text-sm text-muted-foreground">{month.rides} rides completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₱{month.earnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">₱{Math.round(month.earnings / month.rides)} avg</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
