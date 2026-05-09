/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetTeacherQuery } from "@/redux/features/teacherApi";
import { useCreateBookingMutation } from "@/redux/features/bookingApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarDays,
  Clock,
  Star,
  BookOpen,
  CheckCircle2,
  Loader2,
  Search,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Types
interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface Availability {
  _id: string;
  teacherId: string;
  day: string;
  date: string;
  slots: Slot[];
}

interface Teacher {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  aboutMe?: string;
  experience?: number;
  nationality?: string;
  languages?: string[];
  interests?: string[];
  totalClasses?: number;
  averageRating?: number;
  totalReviews?: number;
  status?: string;
  availabilities?: Availability[];
}

function formatTime(time: string): string {
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
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function isSlotInFuture(date: string, startTime: string): boolean {
  const slotDateTime = startTime.includes("T")
    ? new Date(startTime)
    : new Date(`${date}T${startTime}:00`);
  return slotDateTime > new Date();
}

// Slot Modal
function SlotModal({
  teacher,
  open,
  onClose,
}: {
  teacher: Teacher | null;
  open: boolean;
  onClose: () => void;
}) {
  const [createBooking] = useCreateBookingMutation();
  const [loadingSlot, setLoadingSlot] = useState<string | null>(null);
  const [justBookedKey, setJustBookedKey] = useState<string | null>(null);
  const router = useRouter();

  if (!teacher) return null;

  const todayStr = new Date().toLocaleDateString("en-CA");

  const availabilities = (teacher.availabilities ?? [])
    .filter((avail) => avail.date >= todayStr)
    .map((avail) => ({
      ...avail,
      slots: avail.slots.filter(
        (s) => !s.isBooked && isSlotInFuture(avail.date, s.startTime),
      ),
    }))
    .filter((avail) => avail.slots.length > 0)
    .sort((a, b) => a.date.localeCompare(b.date));

  const slotKey = (date: string, startTime: string) => `${date}__${startTime}`;

  const handleBook = async (date: string, startTime: string) => {
    const key = slotKey(date, startTime);
    setLoadingSlot(key);

    let bookingDate = date;
    let bookingTime = startTime;

    if (startTime.includes("T")) {
      const dt = new Date(startTime);
      bookingDate = dt.toLocaleDateString("en-CA");
      bookingTime = `${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`;
    }

    try {
      await createBooking({
        teacherId: teacher._id,
        date: bookingDate,
        startTime: bookingTime,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).unwrap();

      setJustBookedKey(key);
      toast.success("Slot booked! Redirecting to your bookings…");

      setTimeout(() => {
        setJustBookedKey(null);
        setLoadingSlot(null);
        onClose();
      }, 1200);
      router.push("/dashboard/student/booking");
    } catch (err: any) {
      toast.error(err?.data?.message || "Booking failed. Please try again!");
      setLoadingSlot(null);
    }
  };

  const handleClose = () => {
    setJustBookedKey(null);
    setLoadingSlot(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-white border-gray-100 text-gray-900 p-0 overflow-hidden rounded-2xl shadow-2xl">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 ring-2 ring-[#A9F877]/30">
                <AvatarImage src={teacher.profilePicture} alt={teacher.name} />
                <AvatarFallback className="bg-[#A9F877] text-gray-900 font-bold text-sm">
                  {getInitials(teacher.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-gray-900 font-semibold text-base leading-tight">
                  {teacher.name}&apos;s Available Slots
                </DialogTitle>
                <p className="text-gray-400 text-xs mt-0.5">
                  Click &quot;Book Slot&quot; to reserve your session
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[58vh]">
          <div className="px-6 py-5 space-y-6">
            {availabilities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-3">
                <CalendarDays className="w-10 h-10 opacity-30" />
                <p className="text-sm font-medium">
                  No available slots right now
                </p>
                <p className="text-xs text-gray-300">Check back later</p>
              </div>
            ) : (
              availabilities.map((avail) => (
                <div key={avail._id}>
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      {avail.day}
                    </span>
                    <span className="text-xs text-gray-400">
                      · {formatDate(avail.date)}
                    </span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    {avail.slots.map((slot) => {
                      const key = slotKey(avail.date, slot.startTime);
                      const isThisBooked = justBookedKey === key;
                      const isThisLoading = loadingSlot === key;
                      const anyLoading = !!loadingSlot;

                      return (
                        <div
                          key={slot._id}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 ${
                            isThisBooked
                              ? "bg-[#A9F877]/15 border-[#A9F877]/50"
                              : "bg-gray-50 border-gray-100 hover:border-[#A9F877]/60 hover:bg-[#A9F877]/5"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock
                              className={`w-3.5 h-3.5 ${
                                isThisBooked
                                  ? "text-green-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {formatTime(slot.startTime)} –{" "}
                              {formatTime(slot.endTime)}
                            </span>
                          </div>

                          {isThisBooked ? (
                            <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                              <CheckCircle2 className="w-4 h-4" />
                              Booked!
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              disabled={anyLoading}
                              onClick={() =>
                                handleBook(avail.date, slot.startTime)
                              }
                              className="h-8 px-4 text-xs font-semibold bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 rounded-md shadow-none border-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {isThisLoading ? (
                                <>
                                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                                  Booking…
                                </>
                              ) : (
                                "Book Slot"
                              )}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// Teacher Card
function TeacherCard({
  teacher,
  onViewSlots,
}: {
  teacher: Teacher;
  onViewSlots: () => void;
}) {
  const todayStr = new Date().toLocaleDateString("en-CA");

  const freeSlots =
    teacher.availabilities
      ?.filter((a) => a.date >= todayStr)
      .reduce(
        (acc, a) =>
          acc +
          a.slots.filter(
            (s) => !s.isBooked && isSlotInFuture(a.date, s.startTime),
          ).length,
        0,
      ) ?? 0;

  return (
    <Card className="bg-white border border-gray-100 text-gray-900 rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/80 hover:border-[#A9F877]/40">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 px-5 pt-5 pb-4">
          <Avatar className="h-17 w-17 shrink-0 ring-2 ring-gray-100 group-hover:ring-[#A9F877]/50 transition-all">
            <AvatarImage src={teacher.profilePicture} alt={teacher.name} />
            <AvatarFallback className="bg-[#A9F877] text-gray-900 font-bold text-xl">
              {getInitials(teacher.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 text-base leading-tight truncate">
              {teacher.name}
            </h2>
            <p className="text-gray-400 text-xs mt-0.5 truncate">
              {teacher.email}
            </p>
            {teacher.status === "ACTIVE" && (
              <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-5 pb-4">
          {[
            {
              icon: <BookOpen className="w-3.5 h-3.5" />,
              val: teacher.totalClasses ?? 0,
              label: "Classes",
            },
            {
              icon: <Star className="w-3.5 h-3.5" />,
              val:
                teacher.averageRating && teacher.averageRating > 0
                  ? teacher.averageRating.toFixed(1)
                  : "—",
              label: "Rating",
            },
            {
              icon: <CalendarDays className="w-3.5 h-3.5" />,
              val: freeSlots,
              label: "Free Slots",
            },
          ].map(({ icon, val, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-0.5 bg-gray-50 border border-gray-100 rounded-xl py-2.5"
            >
              <span className="text-gray-300">{icon}</span>
              <span className="text-base font-semibold text-gray-800">
                {val}
              </span>
              <span className="text-[10px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        <div className="px-5 pb-5">
          <Button
            onClick={onViewSlots}
            disabled={freeSlots === 0}
            className="w-full bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold text-sm rounded-lg h-10 shadow-none border-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            {freeSlots === 0 ? "No Slots Available" : "View Available Slots"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Page
const Page = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { data, isLoading, isError } = useGetTeacherQuery(timezone);
  const teachers: Teacher[] = data?.data || [];
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // 👈 search state

  // 👇 filter teachers by name, nationality, or language
  const filteredTeachers = teachers.filter((teacher) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      teacher.name.toLowerCase().includes(q) ||
      teacher.nationality?.toLowerCase().includes(q) ||
      teacher.languages?.some((lang) => lang.toLowerCase().includes(q))
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#A9F877]" />
          <p className="text-sm">Loading teachers…</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400 font-semibold">
          Failed to load teachers. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      {/* Header */}
      <header className="text-center mb-8 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Find Your Teacher
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Browse profiles and book an available time slot
        </p>
      </header>

      {/* 👇 Search bar */}
      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, nationality, or language..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Grid */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center text-gray-400 mt-16">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No teachers found for &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher._id}
              teacher={teacher}
              onViewSlots={() => setSelectedTeacher(teacher)}
            />
          ))}
        </div>
      )}

      {/* Slot Modal */}
      <SlotModal
        teacher={selectedTeacher}
        open={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </div>
  );
};

export default Page;
