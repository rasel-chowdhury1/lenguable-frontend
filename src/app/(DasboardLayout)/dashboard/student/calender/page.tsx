/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import TeacherProfileModal from "./_components/TeacherProfileModal";

const schedule = [
  {
    day: "Saturday",
    date: "Feb 5",
    times: ["09:00", "10:00", "14:00", "16:00"],
  },
  {
    day: "Sunday",
    date: "Feb 5",
    times: ["09:00", "10:00", "14:00", "16:00"],
  },
  {
    day: "Monday",
    date: "Feb 5",
    times: ["09:00", "10:00", "14:00", "16:00"],
  },
  {
    day: "Tuesday",
    date: "Feb 6",
    times: ["09:00", "11:00", "15:00", "17:00"],
  },
  {
    day: "Wednesday",
    date: "Feb 7",
    times: ["10:00", "13:00", "15:00", "18:00"],
  },
  {
    day: "Thursday",
    date: "Feb 8",
    times: ["09:00", "12:00", "14:00", "16:00"],
  },
  {
    day: "Friday",
    date: "Feb 9",
    times: ["10:00", "11:00", "15:00", "17:00"],
  },
];

const teachers = [
  {
    name: "John Smith",
    initials: "JS",
    rating: 4.9,
    country: "USA",
    experience: "5 years experience",
  },
  {
    name: "Sarah Johnson",
    initials: "SJ",
    rating: 5,
    country: "UK",
    experience: "8 years experience",
  },
  {
    name: "Michael Brown",
    initials: "MB",
    rating: 4.8,
    country: "Canada",
    experience: "3 years experience",
  },
];

export default function Calendar() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-5">
        {schedule.map((item) => (
          <Card key={item.day} className="min-w-45">
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium">{item.day}</h3>
                <p className="text-sm text-muted-foreground">{item.date}</p>
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

      {/* AVAILABLE TEACHERS */}
      {selectedTime && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-6">
            Available Teachers – {selectedDay} at {selectedTime}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {teachers.map((teacher) => (
              <Card key={teacher.name}>
                <CardContent className="text-center space-y-4">
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarFallback>{teacher.initials}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-medium">{teacher.name}</h3>

                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                      <Star className="h-4 w-4" />
                      {teacher.rating}
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      {teacher.country}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {teacher.experience}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setOpenProfile(true);
                      }}
                    >
                      View Profile
                    </Button>

                    <Button
                      size="sm"
                      className="bg-[#A9F877] hover:bg-[#C1FF72] text-black"
                    >
                      Book Class
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
