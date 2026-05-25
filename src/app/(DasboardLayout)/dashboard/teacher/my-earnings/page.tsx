/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useGetMyPayoutsQuery } from "@/redux/features/payoutApi";
import { useMyBookingQuery } from "@/redux/features/bookingApi";

// Format "YYYY-MM-DD" → "Mar 17, 2026"
const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Get last 7 days date range
const getLastWeekRange = () => {
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(now.getDate() - 7);
  return {
    start: weekAgo.toISOString().split("T")[0],
    end: now.toISOString().split("T")[0],
  };
};

export default function MyEarningsPage() {
  const { data: meData, isLoading: meLoading } = useGetMeQuery(undefined);
  const { data: payoutsData, isLoading: payoutsLoading } =
    useGetMyPayoutsQuery(undefined);
  const { data: bookingsData, isLoading: bookingsLoading } =
    useMyBookingQuery(undefined);

  const teacher = meData?.data?.teacher;
  // console.log(teacher, "from teacher ==>");
  const payouts = payoutsData?.data || [];
  const bookings = bookingsData?.data || [];

  // Calculate last week's classes (last 7 days, excluding cancelled)
  const { start, end } = getLastWeekRange();
  const lastWeekClasses = bookings.filter((b: any) => {
    return b.date >= start && b.date <= end && b.status !== "cancelled";
  }).length;

  const lastWeekEarnings = lastWeekClasses * 10; // $10 per class

  // Stats
  const stats = [
    {
      title: "Classes This Week",
      value: lastWeekClasses,
      icon: Calendar,
      iconClass: "text-blue-500",
    },
    {
      title: "This Week Earnings",
      value: `$${lastWeekEarnings}`,
      icon: DollarSign,
      iconClass: "text-green-500",
    },
    {
      title: "Total Classes",
      value: teacher?.totalClasses ?? 0,
      icon: Calendar,
      iconClass: "text-purple-500",
    },
    {
      title: "Total Earnings",
      value: `$${teacher?.totalEarnings ?? 0}`,
      icon: TrendingUp,
      iconClass: "text-green-500",
    },
  ];

  if (meLoading || payoutsLoading || bookingsLoading) {
    return <div className="p-5">Loading earnings...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-5 space-y-6 mt-10">
      <h1 className="text-2xl font-semibold">My Earnings</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">{item.title}</p>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${item.iconClass}`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Next payout banner */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center text-sm font-medium text-blue-600">
        💰 Next Payout: Every Sunday at 8:00 AM
        {teacher?.unpaidEarnings > 0 && (
          <span className="ml-2 font-bold">
            (${teacher?.unpaidEarnings} pending)
          </span>
        )}
      </div>

      {/* Payout History */}
      <Card className="rounded-xl">
        <CardContent className="space-y-4 pt-5">
          <h2 className="font-semibold">Payout History</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total Classes</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-sm text-gray-400 py-8"
                    >
                      No payout history yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  payouts.map((row: any) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        {row.paidAt
                          ? formatDate(row.paidAt.split("T")[0])
                          : formatDate(row.createdAt.split("T")[0])}
                      </TableCell>
                      <TableCell>${row.amount}</TableCell>
                      <TableCell>{row.amount / 10} classes</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            row.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : row.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {row.status.charAt(0).toUpperCase() +
                            row.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
