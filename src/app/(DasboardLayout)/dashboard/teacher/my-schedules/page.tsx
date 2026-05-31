/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Clock, CalendarPlus, Trash2, Edit, Loader2 } from "lucide-react";
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
import { toast } from "sonner";
import {
  useCreateAvailabilityMutation,
  useDeleteSlotMutation,
  useGetMyAvailabilityQuery,
  useUpdateSlotMutation,
} from "@/redux/features/availabilityApi";
import Schedule from "./_components/Schedule";

type SlotItem = {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

type AvailabilityItem = {
  _id: string;
  day: string;
  date: string;
  slots: SlotItem[];
};

export default function Calendar() {
  const { data, isLoading } = useGetMyAvailabilityQuery(undefined);
  const [createAvailability, { isLoading: isCreating }] =
    useCreateAvailabilityMutation();
  const [updateSlot, { isLoading: isUpdating }] = useUpdateSlotMutation();
  const [deleteSlot, { isLoading: isDeleting }] = useDeleteSlotMutation();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editingSlot, setEditingSlot] = useState<{
    availabilityId: string;
    slotId: string;
    time: string;
  } | null>(null);

  const schedule: AvailabilityItem[] = data?.data ?? [];

  const now = new Date();
  const todayStr = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

  // const getDayName = (dateString: string) => {
  //   if (!dateString) return "";
  //   return new Date(dateString + "T00:00").toLocaleDateString("en-US", {
  //     weekday: "long",
  //   });
  // };

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString + "T00:00").toLocaleDateString(undefined, {
  //     month: "short",
  //     day: "numeric",
  //   });
  // };

  // const formatTime = (timeString: string) => {
  //   if (!timeString) return "";

  //   const date = timeString.includes("T")
  //     ? new Date(timeString)
  //     : (() => {
  //         const [h, m] = timeString.split(":").map(Number);
  //         const d = new Date();
  //         d.setHours(h, m, 0, 0);
  //         return d;
  //       })();

  //   // undefined locale = browser's local format automatically
  //   return date
  //     .toLocaleTimeString(undefined, {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       // hour12: true,
  //     })
  //     .toUpperCase();
  // };

  const getDayName = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
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

  const get24hTime = (timeString: string) => {
    if (!timeString) return "";
    if (timeString.includes("T")) {
      const date = new Date(timeString);
      return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }
    return timeString;
  };

  // Returns true only if the slot's full datetime is at least 24 hours from now
  const isSlotInFuture = (slotStartTime: string, slotDate: string) => {
    if (!slotStartTime) return false;

    let slotDateTime: Date;

    if (slotStartTime.includes("T")) {
      slotDateTime = new Date(slotStartTime);
    } else {
      const [year, month, day] = slotDate.split("-").map(Number);
      const [hour, minute] = slotStartTime.split(":").map(Number);
      slotDateTime = new Date(year, month - 1, day, hour, minute, 0, 0);
    }

    const cutoff = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return slotDateTime >= cutoff;
  };

  // Filter: only show items with at least one unbooked slot at least 24h from now
  const futureSchedule = schedule
    .map((item) => ({
      ...item,
      slots: item.slots.filter(
        (slot) => !slot.isBooked && isSlotInFuture(slot.startTime, item.date),
      ),
    }))
    .filter((item) => item.slots.length > 0)
    .sort((a, b) => a.date.localeCompare(b.date));

  const handleCreateSchedule = async () => {
    if (!date || !startTime || !endTime) return;

    if (date < todayStr) {
      toast.error("Cannot create schedule for a past date");
      return;
    }

    if (endTime <= startTime) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      // Send plain local strings — NO new Date(...).toISOString() here
      await createAvailability({
        availabilities: [
          {
            day: getDayName(date),
            date, // "2026-05-28"  (local date as picked)
            slots: [{ startTime, endTime }], // "20:00", "21:00" (local time)
          },
        ],
        // timezone is added automatically by the API layer above
      }).unwrap();

      toast.success("Schedule created successfully");
      setDate("");
      setStartTime("");
      setEndTime("");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create schedule");
    }
  };

  const handleEdit = (availabilityId: string, slot: SlotItem) => {
    setEditingSlot({
      availabilityId,
      slotId: slot._id,
      time: `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`,
    });
    setStartTime(get24hTime(slot.startTime));
    setEndTime(get24hTime(slot.endTime));
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!editingSlot || !startTime || !endTime) return;

    if (endTime <= startTime) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      await updateSlot({
        availabilityId: editingSlot.availabilityId,
        slotId: editingSlot.slotId,
        startTime,
        endTime,
      }).unwrap();

      toast.success("Slot updated successfully");
      setEditingSlot(null);
      setStartTime("");
      setEndTime("");
      setEditOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update slot");
    }
  };

  const handleDelete = async (availabilityId: string, slotId: string) => {
    try {
      await deleteSlot({ availabilityId, slotId }).unwrap();
      toast.success("Slot deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete slot");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-40">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

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

      {/* EMPTY STATE */}
      {futureSchedule.length === 0 && (
        <div className="text-center text-muted-foreground py-10">
          No upcoming availability scheduled yet.
        </div>
      )}

      {/* SCHEDULE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        {futureSchedule.map((item) => (
          <Card key={item._id} className="min-w-45">
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium">{item.day}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(item.date)}
                </p>
              </div>

              <div className="space-y-2">
                {item.slots.map((slot) => (
                  <div
                    key={slot._id}
                    className="flex items-center justify-between gap-2 border rounded-md px-2 py-1"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        disabled={slot.isBooked || isUpdating}
                        onClick={() => handleEdit(item._id, slot)}
                      >
                        <Edit className="w-4 h-4 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        disabled={slot.isBooked || isDeleting}
                        onClick={() => handleDelete(item._id, slot._id)}
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

      <Schedule />

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
              min={todayStr}
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
            <Button onClick={handleCreateSchedule} disabled={isCreating}>
              {isCreating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
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
            <Button onClick={saveEdit} disabled={isUpdating}>
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
