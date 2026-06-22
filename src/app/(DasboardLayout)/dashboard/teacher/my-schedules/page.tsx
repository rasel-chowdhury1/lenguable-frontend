/* eslint-disable react-hooks/purity */
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

export default function MySchedules() {
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



  const todayStr = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"

  const getDayName = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
   function formatUtcToShortDateByRK(
  utcDate: string,
  timeZone?: string
): string {
  return new Date(utcDate).toLocaleDateString("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

  function formatTime(time: string): string {
    if (!time) return "";
    const date = time.includes("T")
      ? new Date(time)
      : (() => {
        const [h, m] = time.split(":").map(Number);
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
  }

  // ✅ Use local hours (not UTC) so edit modal prefills correctly for all timezones
  const get24hTime = (timeString: string) => {
    if (!timeString) return "";
    if (timeString.includes("T")) {
      const date = new Date(timeString);
      return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }
    return timeString;
  };

  // ✅ ISO strings use new Date() directly; plain HH:mm treated as LOCAL (no Z)
  function isSlotInFuture(date: string, startTime: string): boolean {
    const slotDateTime = startTime.includes("T")
      ? new Date(startTime)
      : new Date(`${date}T${startTime}:00`);
    const cutoff = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return slotDateTime >= cutoff;
  }

  // ✅ Derive display date from ISO startTime to get correct local date for all timezones
  function getDisplayDate(date: string, firstSlotStartTime: string): string {

    if (firstSlotStartTime?.includes("T")) {
      return new Date(firstSlotStartTime).toLocaleDateString("en-CA"); // local YYYY-MM-DD
    }
    return date;
  }


  const futureSchedule = schedule
    .map((item) => ({
      ...item,
      slots: item.slots
        .filter(
          (slot) => !slot.isBooked && isSlotInFuture(item.date, slot.startTime),
        )
        .sort((a, b) => {
          const toMinutes = (t: string) => {
            if (t.includes("T")) {
              const d = new Date(t);
              return d.getHours() * 60 + d.getMinutes(); // ✅ local hours
            }
            const [h, m] = t.split(":").map(Number);
            return h * 60 + m;
          };
          return toMinutes(a.startTime) - toMinutes(b.startTime);
        }),
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
      await createAvailability({
        availabilities: [
          {
            day: getDayName(date),
            date,
            slots: [{ startTime, endTime }],
          },
        ],
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#A9F877]" />
          <p className="text-sm">Loading My Schedules...</p>
        </div>
      </div>
    );
  }


function createLocalDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day,
    12, // noon
    0,
    0
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
        {futureSchedule.map((item) => {
          // const displayDate = getDisplayDate(
          //   item.date,
          //   item.slots[0]?.startTime ?? "",
          // );

          // const localDate = new Date(`${item.date}T12:00:00`);
          const localDate = createLocalDate(item.date);


          console.log("Original Date:", item.date);
          console.log("Parsed Date:", localDate);
          console.log("Is Valid:", !isNaN(localDate.getTime()));
          console.log(
            "Timezone:",
            Intl.DateTimeFormat().resolvedOptions().timeZone
          );

          return (
            <Card key={item._id} className="min-w-45">
              <CardContent>
                <div className="mb-4">
                  {/* <h3 className="font-medium">{getDayName(displayDate)}  </h3> */}
                  {/* <h3 className="font-medium">{new Date(item.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" })}</h3>

                  <p className="text-sm text-muted-foreground">
                    {formatUtcToShortDateByRK(new Date(item.date + "T12:00:00").toLocaleString())}
                  </p> */}
                  {/* <h3 className="font-medium">{localDate.toLocaleDateString(undefined, {
    weekday: "long",
  })}</h3>

                  <p className="text-sm text-muted-foreground">
                    {localDate.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  })}
                  </p> */}

                  <h3 className="font-medium">
                    {localDate.toLocaleDateString(undefined, {
                      weekday: "long",
                    })}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {localDate.toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
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
          );
        })}
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
