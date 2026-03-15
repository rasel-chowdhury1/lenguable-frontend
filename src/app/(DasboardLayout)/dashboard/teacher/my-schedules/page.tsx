/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Clock, CalendarPlus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type ScheduleItem = {
  day: string;
  date: string; // ISO format
  times: string[];
};

export default function Calendar() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    {
      day: "Saturday",
      date: "2026-03-25",
      times: [
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
      ],
    },
    {
      day: "Sunday",
      date: "2026-03-28",
      times: [
        "09:00 - 10:00",
        "10:00 - 11:00",
        "14:00 - 15:00",
        "16:00 - 17:00",
      ],
    },
  ]);

  // Modal state
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editingSlot, setEditingSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);

  // Helper: get day name from date
  const getDayName = (dateString: string) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(undefined, { weekday: "long" });
  };

  // Remove past slots
  const removePastSlots = () => {
    const now = new Date();
    setSchedule((prev) =>
      prev
        .map((dayItem) => {
          const validTimes = dayItem.times.filter((time) => {
            const [start] = time.split(" - ");
            const slotDate = new Date(`${dayItem.date}T${start}`);
            return slotDate >= now;
          });
          return { ...dayItem, times: validTimes };
        })
        .filter((item) => item.times.length > 0),
    );
  };

  useEffect(() => {
    removePastSlots();
  }, []);

  useEffect(() => {
    const interval = setInterval(removePastSlots, 5000);
    return () => clearInterval(interval);
  }, []);

  // Create new schedule
  const handleCreateSchedule = () => {
    if (!date || !startTime || !endTime) return;

    const day = getDayName(date);
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const timeSlot = `${startTime} - ${endTime}`;
    const existingDay = schedule.find((s) => s.date === formattedDate);

    if (existingDay) {
      existingDay.times.push(timeSlot);
      existingDay.times.sort();
      setSchedule([...schedule]);
    } else {
      setSchedule([
        ...schedule,
        { day, date: formattedDate, times: [timeSlot] },
      ]);
    }

    setDate("");
    setStartTime("");
    setEndTime("");
    setOpen(false);
  };

  // Delete a time slot
  const handleDelete = (date: string, time: string) => {
    setSchedule((prev) =>
      prev
        .map((item) =>
          item.date === date
            ? { ...item, times: item.times.filter((t) => t !== time) }
            : item,
        )
        .filter((item) => item.times.length > 0),
    );
  };

  // Open edit modal
  const handleEdit = (date: string, time: string) => {
    setEditingSlot({ date, time });
    const [start, end] = time.split(" - ");
    setStartTime(start);
    setEndTime(end);
    setEditOpen(true);
  };

  // Save edited time
  const saveEdit = () => {
    if (!editingSlot || !startTime || !endTime) return;

    const newTime = `${startTime} - ${endTime}`;
    setSchedule((prev) =>
      prev.map((item) =>
        item.date === editingSlot.date
          ? {
              ...item,
              times: item.times.map((t) =>
                t === editingSlot.time ? newTime : t,
              ),
            }
          : item,
      ),
    );

    setEditingSlot(null);
    setStartTime("");
    setEndTime("");
    setEditOpen(false);
  };

  return (
    <div className="w-full p-5">
      {/* HEADER */}
      <div className="mb-5">
        <Button
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <CalendarPlus className="w-4 h-4" />
          Create Schedule
        </Button>
      </div>

      {/* SCHEDULE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {schedule.map((item) => (
          <Card key={item.date} className="min-w-45">
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium">{item.day}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="space-y-2">
                {item.times.map((time) => (
                  <div
                    key={time}
                    className="flex items-center justify-between gap-2 border rounded-md px-2 py-1"
                  >
                    {/* Time display */}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{time}</span>
                    </div>

                    {/* Edit & Delete icons */}
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        onClick={() => handleEdit(item.date, time)}
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        onClick={() => handleDelete(item.date, time)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CREATE MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Schedule Slot</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSchedule}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Schedule Slot</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
