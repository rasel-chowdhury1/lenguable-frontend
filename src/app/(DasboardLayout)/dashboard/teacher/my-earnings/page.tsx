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
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Hours This Week",
    value: "8",
    icon: Calendar,
    iconClass: "text-blue-500",
  },
  {
    title: "This Week",
    value: "$80",
    icon: DollarSign,
    iconClass: "text-green-500",
  },
  {
    title: "Total Hours",
    value: "54",
    icon: Calendar,
    iconClass: "text-purple-500",
  },
  {
    title: "Total Earnings",
    value: "$540",
    icon: TrendingUp,
    iconClass: "text-green-500",
  },
];

const payoutHistory = [
  {
    week: "Jan 26 - Feb 1, 2026",
    hours: "8 hours",
    amount: "$80",
    status: "Pending",
  },
  {
    week: "Jan 19 - Jan 25, 2026",
    hours: "12 hours",
    amount: "$120",
    status: "Paid",
  },
  {
    week: "Jan 12 - Jan 18, 2026",
    hours: "10 hours",
    amount: "$100",
    status: "Paid",
  },
  {
    week: "Jan 5 - Jan 11, 2026",
    hours: "15 hours",
    amount: "$150",
    status: "Paid",
  },
  {
    week: "Dec 29 - Jan 4, 2026",
    hours: "9 hours",
    amount: "$90",
    status: "Paid",
  },
];

export default function MyEarningsPage() {
  return (
    <div className="max-w-7xl mx-auto p-5 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">My Earnings</h1>
        <Link href="/dashboard/teacher/stripe/connect">
          <Button className="bg-[#A9F877] shadow-2xl hover:bg-[#C1FF72] text-black">
            Connect Account With Stripe
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="text-xl font-semibold">{item.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${item.iconClass}`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Next payout banner */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center text-sm font-medium text-blue-600">
        💰 Next Payout: Sunday
      </div>

      {/* Payout History */}
      <Card className="rounded-xl">
        <CardContent className="space-y-4 pt-5">
          <h2 className="font-semibold">Payout History</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week Of</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.week}</TableCell>
                    <TableCell>{row.hours}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          row.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
