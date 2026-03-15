/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BookingCard } from "./_components/BookingCard";
import { CancelModal } from "./_components/CancelModal";
import { useMyBookingQuery } from "@/redux/features/bookingApi";

export type BookingStatus = "scheduled" | "completed" | "cancelled";

export interface Booking {
  id: string;
  tutorName: string;
  date: string;
  time: string;
  status: BookingStatus;
  reviewed?: boolean;
  isUpcoming: boolean;
  meetLink?: string;
}

export default function MyBookingsPage() {
  const { data, isLoading, isError } = useMyBookingQuery(undefined);

  const apiBookings = data?.data || [];

  const bookings: Booking[] = apiBookings.map((b: any) => {
    const bookingDate = new Date(b.createdAt);

    // Combine createdAt date with startTime for accurate comparison
    const [hour, minute] = b.startTime.split(":").map(Number);
    const classDateTime = new Date(bookingDate);
    classDateTime.setHours(hour, minute, 0, 0);

    const isUpcoming = classDateTime >= new Date(); // ✅ current datetime onwards

    return {
      id: b._id,
      tutorName: b.teacherId?.name || "Teacher",
      date: bookingDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: b.startTime,
      status: isUpcoming ? "scheduled" : "completed",
      isUpcoming,
      meetLink: b.meetLink,
    };
  });

  const upcomingBookings = bookings.filter((b) => b.isUpcoming);
  const pastBookings = bookings.filter((b) => !b.isUpcoming);

  if (isLoading) {
    return <div className="p-5">Loading bookings...</div>;
  }

  if (isError) {
    return <div className="p-5 text-red-500">Failed to load bookings</div>;
  }

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
              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500",
            )}
          >
            Upcoming Class
          </TabsTrigger>

          <TabsTrigger
            value="past"
            className={cn(
              "text-sm font-medium rounded-md shadow-none!",
              "data-[state=active]:bg-[#A9F877] data-[state=active]:text-gray-900",
              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500",
            )}
          >
            Past Class
          </TabsTrigger>
        </TabsList>

        {/* Upcoming */}
        <TabsContent value="upcoming" className="mt-0 space-y-3">
          {upcomingBookings.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center text-sm text-gray-400">
              No upcoming classes booked.
            </div>
          ) : (
            upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        {/* Past */}
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

      <CancelModal open={false} onClose={() => {}} onConfirm={() => {}} />
    </div>
  );
}
