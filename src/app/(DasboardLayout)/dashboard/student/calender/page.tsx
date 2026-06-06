/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TeacherProfileModal from "./_components/TeacherProfileModal";
import { useGetAllAvailabilityQuery } from "@/redux/features/availabilityApi";
import { useCreateBookingMutation } from "@/redux/features/bookingApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ISlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface ITeacher {
  _id: string;
  name: string;
  email: string;
  nationality?: string;
  experience?: number;
  aboutMe?: string;
  interests?: string[];
  languages?: string[];
  profilePicture?: string;
}

interface IAvailability {
  _id: string;
  teacherId: ITeacher;
  day: string;
  date: string;
  slots: ISlot[];
}

const getInitials = (name: string) =>
  name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.toUpperCase();

const formatShortDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

const formatTime = (timeString: string) => {
  if (!timeString) return "";
  const date = timeString.includes("T")
    ? new Date(timeString)
    : (() => {
        const [h, m] = timeString.split(":").map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
      })();
  return date
    .toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
};

// ✅ Use local hours for comparison — works correctly for all timezones
const normalizeTime = (t: string) => {
  if (!t) return "";
  if (t.includes("T")) {
    const dt = new Date(t);
    return `${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`;
  }
  return t;
};

export default function Calendar() {
  const router = useRouter();
  const teachersRef = useRef<HTMLDivElement>(null);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [bookingTeacherId, setBookingTeacherId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllAvailabilityQuery(undefined);
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const availability: IAvailability[] = data?.data || [];

  const now = new Date();

  // ✅ ISO strings use new Date() directly; plain HH:mm treated as LOCAL (no Z)
  const isSlotInFuture = (slotStartTime: string, slotDate: string) => {
    if (!slotStartTime) return false;
    const slotDateTime = slotStartTime.includes("T")
      ? new Date(slotStartTime)
      : new Date(`${slotDate}T${slotStartTime}:00`); // ✅ no Z — local time
    const cutoff = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return slotDateTime >= cutoff;
  };

  const scheduleMap: Record<
    string,
    { times: Set<string>; date: string; day: string }
  > = {};

  // availability.forEach((item) => {
  //   item.slots
  //     .filter((s) => !s.isBooked && isSlotInFuture(s.startTime, item.date))
  //     .forEach((s) => {
  //       if (!scheduleMap[item.date]) {
  //         scheduleMap[item.date] = {
  //           times: new Set(),
  //           date: item.date,
  //           day: item.day,
  //         };
  //       }
  //       scheduleMap[item.date].times.add(s.startTime);
  //     });
  // });

  // Commented: 05-06-2026
  // availability.forEach((item) => {
  //   item.slots
  //     .filter((s) => !s.isBooked && isSlotInFuture(s.startTime, item.date))
  //     .forEach((s) => {
  //       // Derive local date from ISO startTime if available
  //       const localDate = s.startTime.includes("T")
  //         ? new Date(s.startTime).toLocaleDateString("en-CA") // local YYYY-MM-DD
  //         : item.date;

  //       const localDay = s.startTime.includes("T")
  //         ? new Date(s.startTime).toLocaleDateString("en-US", {
  //             weekday: "long",
  //           })
  //         : item.day;

  //       if (!scheduleMap[localDate]) {
  //         scheduleMap[localDate] = {
  //           times: new Set(),
  //           date: localDate,
  //           day: localDay,
  //         };
  //       }
  //       scheduleMap[localDate].times.add(s.startTime);
  //     });
  // });


  // Updated: 05-06-2026
  // ✅ Always use item.date and item.day — they're set by the teacher intentionally
  availability.forEach((item) => {
    item.slots
      .filter((s) => !s.isBooked && isSlotInFuture(s.startTime, item.date))
      .forEach((s) => {
        if (!scheduleMap[item.date]) {
          scheduleMap[item.date] = {
            times: new Set(),
            date: item.date,
            day: item.day,
          };
        }
        scheduleMap[item.date].times.add(s.startTime);
      });
  });

  const schedule = Object.entries(scheduleMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, { times, date, day }]) => ({
      day,
      date,
      times: Array.from(times).sort((a, b) => {
        const toMinutes = (t: string) => {
          if (t.includes("T")) {
            const d = new Date(t);
            return d.getHours() * 60 + d.getMinutes(); // ✅ local hours, not UTC
          }
          const [h, m] = t.split(":").map(Number);
          return h * 60 + m;
        };
        return toMinutes(a) - toMinutes(b);
      }),
    }))
    .filter((item) => item.times.length > 0);

  // const availableTeachers = availability.filter(
  //   (item) =>
  //     item.day === selectedDay &&
  //     item.date === selectedDate &&
  //     item.slots.some(
  //       (s) =>
  //         normalizeTime(s.startTime) === normalizeTime(selectedTime!) && // ✅ local-normalized comparison
  //         !s.isBooked &&
  //         isSlotInFuture(s.startTime, item.date),
  //     ),
  // );

  // Commented: 05-06-2026
  // const availableTeachers = availability.filter((item) =>
  //   item.slots.some((s) => {
  //     const localDate = s.startTime.includes("T")
  //       ? new Date(s.startTime).toLocaleDateString("en-CA")
  //       : item.date;

  //     const localDay = s.startTime.includes("T")
  //       ? new Date(s.startTime).toLocaleDateString("en-US", { weekday: "long" })
  //       : item.day;

  //     return (
  //       localDay === selectedDay &&
  //       localDate === selectedDate &&
  //       normalizeTime(s.startTime) === normalizeTime(selectedTime!) &&
  //       !s.isBooked &&
  //       isSlotInFuture(s.startTime, item.date)
  //     );
  //   }),
  // );

  // Updated: 05-06-2026
  const availableTeachers = availability.filter((item) =>
    item.slots.some(
      (s) =>
        item.day === selectedDay &&
        item.date === selectedDate &&
        normalizeTime(s.startTime) === normalizeTime(selectedTime!) &&
        !s.isBooked &&
        isSlotInFuture(s.startTime, item.date),
    ),
  );

  const handleBookClass = async (teacherId: string) => {
    try {
      setBookingTeacherId(teacherId);

      let bookingDate = selectedDate!;
      let bookingTime = selectedTime!;

      // ✅ Extract UTC values if ISO string
      // if (selectedTime?.includes("T")) {
      //   const dt = new Date(selectedTime);
      //   bookingDate = dt.toLocaleDateString("en-CA", { timeZone: "UTC" });
      //   bookingTime = `${dt.getUTCHours().toString().padStart(2, "0")}:${dt.getUTCMinutes().toString().padStart(2, "0")}`;
      // }

      if (selectedTime?.includes("T")) {
        const dt = new Date(selectedTime);
        bookingDate = dt.toLocaleDateString("en-CA"); // ← remove { timeZone: "UTC" }
        bookingTime = `${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`; // ← getHours not getUTCHours
      }

      await createBooking({
        teacherId,
        date: bookingDate,
        startTime: bookingTime,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).unwrap();

      toast.success("Class booked successfully!");
      router.push("/dashboard/student/booking");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to book class.");
    } finally {
      setBookingTeacherId(null);
    }
  };

  return (
    <div className="w-full p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Book a Class</h1>
        <p className="text-sm text-muted-foreground">
          Select a time slot to see available teachers
        </p>
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading schedule...</div>
      ) : schedule.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No availability found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {schedule.map((item) => (
            <Card key={item.date} className="min-w-45">
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-medium">{item.day}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatShortDate(item.date)}
                  </p>
                </div>

                <div className="space-y-2">
                  {item.times.map((time) => (
                    <Button
                      key={time}
                      className={`w-full justify-start gap-2 text-sm ${
                        selectedTime === time && selectedDay === item.day
                          ? "bg-[#A9F877] hover:bg-[#C1FF72] text-black"
                          : "bg-white text-black border hover:bg-[#C1FF72]"
                      }`}
                      onClick={() => {
                        setSelectedTime(time);
                        setSelectedDay(item.day);
                        setSelectedDate(item.date);
                        requestAnimationFrame(() => {
                          teachersRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        });
                      }}
                    >
                      <Clock className="h-4 w-4" />
                      {formatTime(time)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTime && (
        <div ref={teachersRef} className="mt-10">
          <h2 className="text-lg font-semibold mb-6">
            Available Teachers – {selectedDay} at {formatTime(selectedTime)}
          </h2>

          {availableTeachers.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No teachers available for this slot.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {availableTeachers.map(({ teacherId }, index) => (
                <Card key={teacherId?._id || index}>
                  <CardContent className="text-center space-y-4">
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarImage
                        src={teacherId?.profilePicture}
                        alt={teacherId?.name}
                      />
                      <AvatarFallback>
                        {getInitials(teacherId?.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-medium">{teacherId?.name}</h3>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                        <Star className="h-4 w-4" />
                        <span>{teacherId?.experience ?? 0} yrs exp</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {teacherId?.nationality ?? "N/A"}
                      </p>
                    </div>

                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTeacher({
                            _id: teacherId._id,
                            name: teacherId.name,
                            initials: getInitials(teacherId.name),
                            nationality: teacherId.nationality ?? "N/A",
                            experience: teacherId.experience ?? 0,
                            aboutMe: teacherId.aboutMe ?? "",
                            interests: teacherId.interests ?? [],
                            languages: teacherId.languages ?? [],
                            profilePicture: teacherId.profilePicture,
                            day: selectedDay,
                            date: selectedDate,
                            startTime: selectedTime,
                          });
                          setOpenProfile(true);
                        }}
                      >
                        View Profile
                      </Button>

                      <Button
                        size="sm"
                        className="bg-[#A9F877] hover:bg-[#C1FF72] text-black"
                        disabled={
                          isBooking && bookingTeacherId === teacherId._id
                        }
                        onClick={() => handleBookClass(teacherId._id)}
                      >
                        {isBooking && bookingTeacherId === teacherId._id
                          ? "Booking..."
                          : "Book Class"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      <TeacherProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        teacher={selectedTeacher}
      />
    </div>
  );
}
