/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { User, Calendar, Clock, Video, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CancelModal } from "./_components/CancelModal";
import { AvailabilityModal } from "./_components/AvailabilityModal";
import { useGetMyAvailabilityQuery } from "@/redux/features/availabilityApi";
import {
  useMyBookingQuery,
  useCancelBookingMutation,
} from "@/redux/features/bookingApi";
import { toast } from "sonner";

interface IBooking {
  _id: string;
  day: string;
  startTime: string;
  date: string; // "YYYY-MM-DD"
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

interface ISlot {
  startTime: string;
  endTime: string;
  date: string;
  isBooked: boolean;
}

interface IAvailabilityItem {
  _id: string;
  teacherId: string;
  day: string;
  slots: ISlot[];
  createdAt: string;
  updatedAt: string;
}

interface IAvailabilityResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IAvailabilityItem[];
}

interface IDayAvailability {
  day: string;
  slots: { time: string; date: string }[];
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

// Format "YYYY-MM-DD" -> "Mar 15"
const formatShortDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Format time like "10:00" -> "10:00 AM"
const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// Check if a slot (date + startTime) is in the future
const isUpcoming = (
  date: string,
  startTime: string,
  now: Date,
  todayISO: string,
) => {
  if (date > todayISO) return true;
  if (date === todayISO) {
    const [hour, minute] = startTime.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);
    return slotTime > now;
  }
  return false;
};

export default function MySchedulePage() {
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [availOpen, setAvailOpen] = useState(false);

  const { data: availabilityData, isLoading: availLoading } =
    useGetMyAvailabilityQuery(undefined);
  const { data, isLoading } = useMyBookingQuery(undefined);
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const now = new Date();
  const todayISO = now.toISOString().split("T")[0];

  const typedData = availabilityData as IAvailabilityResponse | undefined;

  // Only upcoming, non-cancelled bookings
  const allBookings: IBooking[] = data?.data || [];
  const upcomingBookings = allBookings.filter(
    (b) =>
      isUpcoming(b.date, b.startTime, now, todayISO) &&
      b.status !== "cancelled",
  );

  // Only upcoming availability slots
  const upcomingAvailability: IDayAvailability[] = [];
  typedData?.data?.forEach((item) => {
    const upcomingSlots = item.slots
      .filter((s) => isUpcoming(s.date, s.startTime, now, todayISO))
      .map((s) => ({ time: s.startTime, date: s.date }));

    if (upcomingSlots.length > 0)
      upcomingAvailability.push({ day: item.day, slots: upcomingSlots });
  });

  const handleCancelSubmit = async (reason: string) => {
    if (!cancelId) return;
    try {
      const res = await cancelBooking({ bookingId: cancelId, reason }).unwrap();
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
    <div className="max-w-7xl mx-auto p-5 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <Button
          size="sm"
          onClick={() => setAvailOpen(true)}
          className="gap-1.5 bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold shadow-none border-0 rounded-md"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Availability</span>
        </Button>
      </div>

      {/* Upcoming Classes */}
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

      {/* My Availability */}
      <section>
        <h2 className="text-base font-bold text-gray-900 mb-3">
          My Availability
        </h2>

        {availLoading ? (
          <div className="text-sm text-gray-400">Loading availability...</div>
        ) : upcomingAvailability.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white px-5 py-8 text-center text-sm text-gray-400">
            No availability set yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingAvailability.map(({ day, slots }) => (
              <div
                key={day}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  {day}
                </p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => (
                    <span
                      key={`${slot.date}-${slot.time}`}
                      className="flex items-center gap-1 text-xs font-medium bg-[#A9F877] text-gray-900 px-2.5 py-1 rounded-lg"
                    >
                      <Clock className="h-3 w-3 shrink-0" />
                      {slot.time}
                      <span className="text-gray-900 ml-1">
                        {formatShortDate(slot.date)}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      <CancelModal
        open={!!cancelId}
        onClose={() => setCancelId(null)}
        onSubmit={handleCancelSubmit}
        isLoading={isCancelling}
      />
      <AvailabilityModal open={availOpen} onClose={() => setAvailOpen(false)} />
    </div>
  );
}
