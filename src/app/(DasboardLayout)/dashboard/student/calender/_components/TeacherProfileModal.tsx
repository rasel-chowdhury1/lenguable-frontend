/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useCreateBookingMutation } from "@/redux/features/bookingApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Teacher = {
  _id: string;
  name: string;
  initials: string;
  nationality: string;
  experience: number;
  aboutMe: string;
  interests: string[];
  languages: string[];
  profilePicture?: string;
  day: string;
  date: string;
  startTime: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

const formatShortDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Format ISO or HH:MM time string to readable time
const formatTime = (timeString: string) => {
  if (!timeString) return "";
  if (timeString.includes("T")) {
    return new Date(timeString).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return timeString;
};

export default function TeacherProfileModal({ open, onClose, teacher }: Props) {
  const router = useRouter();
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  if (!teacher) return null;

  const handleBookClass = async () => {
    try {
      await createBooking({
        teacherId: teacher._id,
        date: teacher.date,
        startTime: teacher.startTime,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).unwrap();

      toast.success("Class booked successfully!");
      router.push("/dashboard/student/booking");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to book class.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="p-5 space-y-4">
          {/* Avatar + Name */}
          <div className="flex items-center justify-center">
            <Avatar className="h-44 w-44">
              <AvatarImage src={teacher.profilePicture} alt={teacher.name} />
              <AvatarFallback>{teacher.initials}</AvatarFallback>
            </Avatar>
          </div>

          {/* Experience & Rating */}
          <div>
            <h3 className="font-medium">{teacher.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{teacher.experience} years experience</span>
            </div>
          </div>

          {/* Nationality */}
          <div>
            <p className="text-sm font-medium">Nationality</p>
            <p className="text-sm text-muted-foreground">
              {teacher.nationality}
            </p>
          </div>

          {/* Experience */}
          <div>
            <p className="text-sm font-medium">Experience</p>
            <p className="text-sm text-muted-foreground">
              {teacher.experience} years
            </p>
          </div>

          {/* Languages */}
          <div>
            <p className="text-sm font-medium">Spoken Languages</p>
            {teacher.languages.length === 0 ? (
              <p className="text-sm text-muted-foreground">N/A</p>
            ) : (
              <div className="flex gap-2 mt-1 flex-wrap">
                {teacher.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interests */}
          <div>
            <p className="text-sm font-medium">Interests</p>
            {teacher.interests.length === 0 ? (
              <p className="text-sm text-muted-foreground">N/A</p>
            ) : (
              <div className="flex gap-2 mt-1 flex-wrap">
                {teacher.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-0.5 text-xs rounded-full bg-gray-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <p className="text-sm font-medium">About</p>
            <p className="text-sm text-muted-foreground">
              {teacher.aboutMe || "No description provided."}
            </p>
          </div>

          {/* Booking context */}
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-gray-900">Day: </span>
              {teacher.day}
            </p>
            <p>
              <span className="font-medium text-gray-900">Date: </span>
              {formatShortDate(teacher.date)}
            </p>
            <p>
              <span className="font-medium text-gray-900">Time: </span>
              {formatTime(teacher.startTime)}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 p-5 pt-0">
          <Button
            className="flex-1 bg-[#A9F877] hover:bg-[#C1FF72] text-black"
            onClick={handleBookClass}
            disabled={isLoading}
          >
            {isLoading ? "Booking..." : "Book Class"}
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
