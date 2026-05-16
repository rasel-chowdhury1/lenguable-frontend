"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BookingCard } from "./_components/BookingCard";
import { CancelModal } from "./_components/CancelModal";
import { LeaveReviewModal } from "./_components/LeaveReviewModal";
import {
  useMyBookingQuery,
  useCancelBookingMutation,
} from "@/redux/features/bookingApi";
import { useGetMyReviewsQuery } from "@/redux/features/reviewApi";
import { toast } from "sonner";

export type BookingStatus = "scheduled" | "completed" | "cancelled";

export interface Booking {
  id: string;
  tutorName: string;
  teacherId: string;
  date: string;
  time: string;
  status: BookingStatus;
  reviewed?: boolean;
  isUpcoming: boolean;
  meetLink?: string;
}

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (time: string) => {
  if (!time) return "";
  if (time.includes("T")) {
    return new Date(time).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const [hourStr, minute] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${minute} ${ampm}`;
};

export default function MyBookingsPage() {
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [reviewTeacherId, setReviewTeacherId] = useState<string | null>(null);

  const { data, isLoading, isError } = useMyBookingQuery(undefined);
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const { data: myReviewsData } = useGetMyReviewsQuery(undefined);
  const myReviews = myReviewsData?.data || [];

  const reviewedTeacherIds = new Set<string>(
    myReviews.map((r: any) => r.teacherId?._id || r.teacherId),
  );

  // Sort by date desc, then time desc BEFORE formatting
  const apiBookings = [...(data?.data || [])].sort((a: any, b: any) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.startTime.localeCompare(b.startTime);
  });

  const bookings: Booking[] = apiBookings.map((b: any) => ({
    id: b._id,
    tutorName: b.teacherId?.name || "Teacher",
    teacherId: b.teacherId?._id || b.teacherId,
    date: formatDate(b.date),
    time: formatTime(b.startTime),
    status: b.status as BookingStatus,
    reviewed: reviewedTeacherIds.has(b.teacherId?._id || b.teacherId),
    isUpcoming: b.status === "scheduled",
    meetLink: b.meetLink,
  }));

  const upcomingBookings = bookings.filter((b) => b.isUpcoming);
  const pastBookings = bookings.filter(
    (b) => !b.isUpcoming && b.status !== "scheduled",
  );

  const handleConfirmCancel = async () => {
    if (!cancelId) return;
    try {
      const res = await cancelBooking({
        bookingId: cancelId,
        reason: "Cancelled by student",
      }).unwrap();
      toast.success(res?.message || "Booking cancelled.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel booking.");
    } finally {
      setCancelId(null);
    }
  };

  if (isLoading) return <div className="p-5">Loading bookings...</div>;
  if (isError)
    return <div className="p-5 text-red-500">Failed to load bookings</div>;

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
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={() => setCancelId(booking.id)}
              />
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
              <BookingCard
                key={booking.id}
                booking={booking}
                onLeaveReview={
                  booking.status === "completed" && !booking.reviewed
                    ? () => setReviewTeacherId(booking.teacherId)
                    : undefined
                }
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      <CancelModal
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />

      <LeaveReviewModal
        open={!!reviewTeacherId}
        onClose={() => setReviewTeacherId(null)}
        teacherId={reviewTeacherId || ""}
      />
    </div>
  );
}
