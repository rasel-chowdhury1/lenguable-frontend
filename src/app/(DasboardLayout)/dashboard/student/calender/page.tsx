/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import TeacherProfileModal from "./_components/TeacherProfileModal";
import { useGetAllAvailabilityQuery } from "@/redux/features/availabilityApi";
import { useCreateBookingMutation } from "@/redux/features/bookingApi";
import { toast } from "sonner";

interface ISlot {
  startTime: string;
  endTime: string;
  date: string; // "YYYY-MM-DD"
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
  profile?: string;
}

interface IAvailability {
  _id: string;
  teacherId: ITeacher;
  day: string;
  slots: ISlot[];
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const DAY_ORDER = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Format "YYYY-MM-DD" → "Mar 21"
const formatShortDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function Calendar() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [bookingTeacherId, setBookingTeacherId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllAvailabilityQuery(undefined);
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const availability: IAvailability[] = data?.data || [];

  // Build schedule: group unbooked slots by day, keeping the date per slot
  const scheduleMap: Record<string, { times: Set<string>; date: string }> = {};

  availability.forEach((item) => {
    item.slots
      .filter((s) => !s.isBooked)
      .forEach((s) => {
        if (!scheduleMap[item.day]) {
          scheduleMap[item.day] = { times: new Set(), date: s.date };
        }
        scheduleMap[item.day].times.add(s.startTime);
        // Use the earliest date found for this day
        if (s.date < scheduleMap[item.day].date) {
          scheduleMap[item.day].date = s.date;
        }
      });
  });

  const schedule = Object.entries(scheduleMap)
    .sort(([a], [b]) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b))
    .map(([day, { times, date }]) => ({
      day,
      date,
      times: Array.from(times).sort(),
    }))
    .filter((item) => item.times.length > 0);

  // Find teachers available for selected day + time
  const availableTeachers = availability.filter(
    (item) =>
      item.day === selectedDay &&
      item.slots.some((s) => s.startTime === selectedTime && !s.isBooked),
  );

  const handleBookClass = async (teacherId: string) => {
    try {
      setBookingTeacherId(teacherId);
      await createBooking({
        teacherId,
        day: selectedDay,
        startTime: selectedTime,
      }).unwrap();
      toast.success("Class booked successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to book class.");
    } finally {
      setBookingTeacherId(null);
    }
  };

  return (
    <div className="w-full p-5">
      {/* HEADER */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Book a Class</h1>
        <p className="text-sm text-muted-foreground">
          Select a time slot to see available teachers
        </p>
      </div>

      {/* SCHEDULE */}
      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading schedule...</div>
      ) : schedule.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No availability found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-5">
          {schedule.map((item) => (
            <Card key={item.day} className="min-w-45">
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-medium">{item.day}</h3>
                  {/* Date shown under day name */}
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
                      }}
                    >
                      <Clock className="h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AVAILABLE TEACHERS */}
      {selectedTime && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-6">
            Available Teachers – {selectedDay} at {selectedTime}
          </h2>

          {availableTeachers.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No teachers available for this slot.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {availableTeachers.map(({ teacherId }) => (
                <Card key={teacherId._id}>
                  <CardContent className="text-center space-y-4">
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarFallback>
                        {getInitials(teacherId.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-medium">{teacherId.name}</h3>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                        <Star className="h-4 w-4" />
                        <span>{teacherId.experience ?? 0} yrs exp</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {teacherId.nationality ?? "N/A"}
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
                            profile: teacherId.profile,
                            day: selectedDay,
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
