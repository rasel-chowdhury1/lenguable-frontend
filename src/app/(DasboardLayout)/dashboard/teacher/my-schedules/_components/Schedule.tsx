"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { User, Calendar, Clock, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useMyBookingQuery,
  useCancelBookingMutation,
} from "@/redux/features/bookingApi";
import { toast } from "sonner";
import { CancelModal } from "./CancelModal";

interface IBooking {
  _id: string;
  day: string;
  startTime: string;
  date: string;
  meetLink: string;
  createdAt: string;
  status: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  teacherId: string;
}

// Format "YYYY-MM-DD" -> "Mar 15, 2026"
const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Handles both HH:MM and ISO strings
const formatTime = (time: string) => {
  if (!time) return "";
  if (time.includes("T")) {
    return new Date(time).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// Handles both HH:MM and ISO strings
const isUpcoming = (
  date: string,
  startTime: string,
  now: Date,
  todayISO: string,
) => {
  if (startTime.includes("T")) {
    return new Date(startTime) > now;
  }
  if (date > todayISO) return true;
  if (date === todayISO) {
    const [hour, minute] = startTime.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);
    return slotTime > now;
  }
  return false;
};

export default function Schedule() {
  const [cancelId, setCancelId] = useState<string | null>(null);

  const { data, isLoading } = useMyBookingQuery(undefined);
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const now = new Date();
  const todayISO = now.toISOString().split("T")[0];

  const allBookings: IBooking[] = data?.data || [];

  const upcomingBookings = allBookings.filter(
    (b) =>
      isUpcoming(b.date, b.startTime, now, todayISO) &&
      b.status !== "cancelled",
  );

  const handleCancelSubmit = async (reason: string) => {
    if (!cancelId) return;
    try {
      const res = await cancelBooking({
        bookingId: cancelId,
        reason,
      }).unwrap();

      toast.success(res?.message || "Booking cancelled.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel booking.");
    } finally {
      setCancelId(null);
    }
  };

  const BookingCard = ({ cls }: { cls: IBooking }) => (
    <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400 shrink-0" />
          <span className="text-sm font-bold text-gray-900">
            {cls.studentId.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-600">
            {cls.day}, {formatDate(cls.date)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-600">
            {formatTime(cls.startTime)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 sm:shrink-0">
        <Button
          size="sm"
          className="gap-1.5 bg-[#A9F877] hover:bg-[#C1FF72] text-black"
          onClick={() => window.open(cls.meetLink, "_blank")}
        >
          <Video className="h-3.5 w-3.5" />
          Join Class
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => setCancelId(cls._id)}
        >
          <X className="h-3.5 w-3.5 sm:hidden" />
          <span className="hidden sm:inline">✕</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="mt-10">
      <section className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          Upcoming Classes
        </h2>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-sm text-gray-400">Loading bookings...</div>
          ) : upcomingBookings.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white px-5 py-8 text-center text-sm text-gray-400">
              No upcoming classes.
            </div>
          ) : (
            upcomingBookings.map((cls) => (
              <BookingCard key={cls._id} cls={cls} />
            ))
          )}
        </div>
      </section>

      <CancelModal
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        onSubmit={handleCancelSubmit}
        isLoading={isCancelling}
      />
    </div>
  );
}
