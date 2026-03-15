"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, CalendarPlus, Star } from "lucide-react";

const teachers = [
  {
    id: "TCH-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 890",
    rating: 4.8,
    interests: ["Mathematics", "Physics"],
    experience: "8 Years",
    country: "USA",
    address: "New York, USA",
    bio: "Passionate math teacher with strong analytical teaching methods.",
    image: "https://i.pravatar.cc/150?img=11",
    schedule: [
      {
        day: "Monday",
        date: "2026-02-24",
        times: ["09:00 - 10:00", "10:00 - 11:00"],
      },
      { day: "Wednesday", date: "2026-02-26", times: ["14:00 - 15:00"] },
    ],
  },
  {
    id: "TCH-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 345 678 901",
    rating: 4.9,
    interests: ["English", "Literature"],
    experience: "6 Years",
    country: "UK",
    address: "London, UK",
    bio: "Creative literature teacher helping students improve writing skills.",
    image: "https://i.pravatar.cc/150?img=32",
    schedule: [
      {
        day: "Tuesday",
        date: "2026-02-25",
        times: ["09:00 - 10:00", "11:00 - 12:00"],
      },
      { day: "Thursday", date: "2026-02-27", times: ["15:00 - 16:00"] },
    ],
  },
];

export default function Page() {
  const [selectedTeacher, setSelectedTeacher] = useState<
    (typeof teachers)[0] | null
  >(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Close schedule modal completely
  const handleCloseSchedule = () => {
    setShowSchedule(false);
    setSelectedSlot(null);
    setSelectedTeacher(null); // ⭐ IMPORTANT FIX
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-5">My Teachers</h2>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="text-center">Photo</TableHead>
              <TableHead className="text-center">Teacher</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Schedule</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.id}</TableCell>

                <TableCell className="flex justify-center">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </TableCell>

                <TableCell className="text-center">{teacher.name}</TableCell>
                <TableCell className="text-center">{teacher.email}</TableCell>
                <TableCell className="text-center">{teacher.phone}</TableCell>

                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setShowSchedule(true);
                      setShowProfile(false);
                    }}
                  >
                    <CalendarPlus className="w-4 h-4" />
                    View Schedule
                  </Button>
                </TableCell>

                <TableCell className="text-end">
                  <Button
                    size="icon"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setShowProfile(true);
                      setShowSchedule(false);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PROFILE MODAL */}
      <Dialog
        open={showProfile}
        onOpenChange={() => {
          setShowProfile(false);
          setSelectedTeacher(null);
        }}
      >
        <DialogContent className="max-w-lg">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">
                  Teacher Profile
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4 text-center">
                <Image
                  src={selectedTeacher.image}
                  alt={selectedTeacher.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto border"
                />

                <h3 className="font-semibold text-lg">
                  {selectedTeacher.name}
                </h3>

                <div className="flex justify-center gap-1 items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {selectedTeacher.rating}
                </div>

                <p>
                  <strong>Experience:</strong> {selectedTeacher.experience}
                </p>
                <p>
                  <strong>Country:</strong> {selectedTeacher.country}
                </p>
                <p>
                  <strong>Address:</strong> {selectedTeacher.address}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {selectedTeacher.interests.map((i) => (
                    <Badge key={i}>{i}</Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  {selectedTeacher.bio}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* SCHEDULE MODAL */}
      <Dialog open={showSchedule} onOpenChange={handleCloseSchedule}>
        <DialogContent className="max-w-md">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">
                  {selectedTeacher.name}&apos;s Schedule
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3 mt-4">
                {selectedTeacher.schedule.map((day) => (
                  <div key={day.date} className="border p-3 rounded-md">
                    <h4 className="font-medium">
                      {day.day} - {new Date(day.date).toLocaleDateString()}
                    </h4>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {day.times.map((time) => {
                        const key = `${day.date}-${time}`;
                        return (
                          <Badge
                            key={key}
                            variant={
                              selectedSlot === key ? "default" : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => setSelectedSlot(key)}
                          >
                            {time}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCloseSchedule}>
                  Close
                </Button>
                <Button
                  disabled={!selectedSlot}
                  onClick={() => alert(`You selected: ${selectedSlot}`)}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
