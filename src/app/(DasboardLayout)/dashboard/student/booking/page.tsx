"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BookingCard } from "./_components/BookingCard";
import { CancelModal } from "./_components/CancelModal";

export type BookingStatus = "scheduled" | "completed" | "cancelled";

export interface Booking {
  id: string;
  tutorName: string;
  date: string;
  time: string;
  status: BookingStatus;
  reviewed?: boolean;
  isUpcoming: boolean;
}

const initialBookings: Booking[] = [
  {
    id: "1",
    tutorName: "John Smith",
    date: "Feb 6, 2026",
    time: "10:00 AM",
    status: "scheduled",
    isUpcoming: true,
  },
  {
    id: "2",
    tutorName: "Sarah Johnson",
    date: "Feb 8, 2026",
    time: "2:00 PM",
    status: "scheduled",
    isUpcoming: true,
  },
  {
    id: "3",
    tutorName: "Michael Brown",
    date: "Jan 28, 2026",
    time: "11:00 AM",
    status: "completed",
    reviewed: false,
    isUpcoming: false,
  },
  {
    id: "4",
    tutorName: "John Smith",
    date: "Jan 25, 2026",
    time: "3:00 PM",
    status: "completed",
    reviewed: true,
    isUpcoming: false,
  },
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const upcomingBookings = bookings.filter((b) => b.isUpcoming);
  const pastBookings = bookings.filter((b) => !b.isUpcoming);

  const handleConfirmCancel = () => {
    if (!cancelId) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === cancelId
          ? { ...b, status: "cancelled" as const, isUpcoming: false }
          : b,
      ),
    );
    setCancelId(null);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

      <Tabs defaultValue="upcoming">
        <TabsList className="bg-transparent p-0 gap-2 mb-6 h-auto">
          <TabsTrigger
            value="upcoming"
            className={cn(
              "text-sm font-medium rounded-md shadow-none!",
              "data-[state=active]:bg-[#A9F877] data-[state=active]:text-gray-900",
              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700",
            )}
          >
            Upcoming Class
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className={cn(
              "text-sm font-medium rounded-md shadow-none!",
              "data-[state=active]:bg-[#A9F877] data-[state=active]:text-gray-900",
              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700",
            )}
          >
            Past Class
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0 space-y-3">
          {upcomingBookings.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center text-sm text-gray-400">
              No upcoming classes booked.
            </div>
          ) : (
            upcomingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={(id) => setCancelId(id)}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-0 space-y-3">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Past Classes
          </h2>
          {pastBookings.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center text-sm text-gray-400">
              No past classes yet.
            </div>
          ) : (
            pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>
      </Tabs>

      <CancelModal
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
