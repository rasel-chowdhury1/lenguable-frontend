"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { User, Calendar, Clock, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useMyBookingQuery,
  useCancelBookingMutation,
  useMarkTeacherJoinedMutation,
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
  teacherJoined: boolean;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  teacherId: string;
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
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const isUpcoming = (date: string, startTime: string) => {
  let bookingDateTime: Date;

  if (startTime.includes("T")) {
    bookingDateTime = new Date(startTime);
  } else {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = startTime.split(":").map(Number);
    bookingDateTime = new Date(year, month - 1, day, hour, minute, 0, 0);
  }

  // Show until class ends (start + 60 min)
  const classEnd = new Date(bookingDateTime.getTime() + 60 * 60 * 1000);
  return classEnd >= new Date();
};

export default function Schedule() {
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const { data, isLoading } = useMyBookingQuery(undefined);
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();
  const [markTeacherJoined] = useMarkTeacherJoinedMutation();

  const allBookings: IBooking[] = data?.data || [];

  // const upcomingBookings = allBookings.filter(
  //   (b) => isUpcoming(b.date, b.startTime) && b.status !== "cancelled",
  // );

  const upcomingBookings = allBookings
    .filter((b) => isUpcoming(b.date, b.startTime) && b.status !== "cancelled")
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date); // earliest date first
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime); // earliest time first
    });

  const handleJoinClass = async (cls: IBooking) => {
    setJoiningId(cls._id);
    try {
      if (!cls.teacherJoined) {
        await markTeacherJoined(cls._id).unwrap();
      }
    } catch (err) {
      console.error("Failed to mark teacher as joined:", err);
    } finally {
      setJoiningId(null);
      window.open(cls.meetLink, "_blank");
    }
  };

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
          disabled={joiningId === cls._id}
          onClick={() => handleJoinClass(cls)}
        >
          <Video className="h-3.5 w-3.5" />
          {joiningId === cls._id ? "Joining..." : "Join Class"}
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
