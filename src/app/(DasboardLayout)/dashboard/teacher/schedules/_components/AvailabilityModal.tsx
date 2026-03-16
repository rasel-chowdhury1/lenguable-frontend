/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useCreateAvailabilityMutation } from "@/redux/features/availabilityApi";
import { toast } from "sonner";

// Format a date like "Feb 16"
const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

// Format date as "YYYY-MM-DD" for storage
const toISODate = (date: Date) => date.toISOString().split("T")[0];

// Generate slots from startHour, skipping past hours if it's today
const generateSlots = (startHour = 9, totalHours = 12, currentDate?: Date) => {
  const slots: string[] = [];
  const now = currentDate ?? new Date();

  for (let i = 0; i < totalHours; i++) {
    const start = new Date();
    start.setHours(startHour + i, 0, 0, 0);

    // Skip past hours for today
    if (
      start.getDate() === now.getDate() &&
      start.getMonth() === now.getMonth() &&
      start.getFullYear() === now.getFullYear() &&
      start.getHours() < now.getHours()
    ) {
      continue;
    }

    const formatTime = (d: Date) =>
      d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    slots.push(formatTime(start));
  }

  return slots;
};

// Generate weekdays with slots and actual dates
const getWeekDays = (startDate: Date, numberOfDays = 4) => {
  const week: {
    day: string;
    date: string;
    isoDate: string;
    slots: string[];
  }[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + i);

    week.push({
      day: current.toLocaleDateString("en-US", { weekday: "long" }),
      date: formatDate(current),
      isoDate: toISODate(current), // "2026-03-17"
      slots: generateSlots(9, 12, current),
    });
  }

  return week;
};

// Helper to get endTime for each slot (1 hour after startTime)
const getEndTime = (startTime: string) => {
  const [hour, minute] = startTime.split(":").map(Number);
  const nextHour = (hour + 1).toString().padStart(2, "0");
  return `${nextHour}:${minute.toString().padStart(2, "0")}`;
};

export function AvailabilityModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [createAvailability, { isLoading }] = useCreateAvailabilityMutation();

  const weekDays = getWeekDays(new Date(), 4);

  // Toggle slot selection keyed by day
  const toggle = (day: string, slot: string) => {
    setSelected((prev) => {
      const current = prev[day] ?? [];
      return {
        ...prev,
        [day]: current.includes(slot)
          ? current.filter((s) => s !== slot)
          : [...current, slot],
      };
    });
  };

  const handleAddAvailability = async () => {
    if (!Object.keys(selected).length) {
      toast.error("Please select at least one slot");
      return;
    }

    const payload = {
      availabilities: Object.entries(selected)
        .filter(([, slots]) => slots.length > 0)
        .map(([day, slots]) => {
          // Find the isoDate for this day from weekDays
          const dayInfo = weekDays.find((d) => d.day === day);
          return {
            day,
            slots: slots.map((startTime) => ({
              startTime,
              endTime: getEndTime(startTime),
              date: dayInfo!.isoDate, // actual calendar date e.g. "2026-03-21"
            })),
          };
        }),
    };

    try {
      const res = await createAvailability(payload).unwrap();
      setSelected({});
      onClose();
      toast.success(res?.message || "Availability created successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save availability!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-5xl! rounded-xl p-8">
        <DialogHeader>
          <DialogTitle className="sr-only">Add Availability</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-2 overflow-x-auto">
          {weekDays.map(({ day, date, slots }) => (
            <div
              key={day}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <p className="text-sm font-semibold text-gray-900">{day}</p>
              <p className="text-xs text-gray-400 mb-4">{date}</p>

              <div className="flex flex-col gap-2.5 max-h-150 overflow-y-auto">
                {slots.map((slot) => {
                  const isActive = selected[day]?.includes(slot);

                  return (
                    <button
                      key={slot}
                      onClick={() => toggle(day, slot)}
                      className={cn(
                        "flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-all w-full",
                        isActive
                          ? "bg-[#A9F877] text-gray-900"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            size="sm"
            onClick={handleAddAvailability}
            className="bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Add Availability"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}