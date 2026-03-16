import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Clock, User, Video } from "lucide-react";
import { Booking, BookingStatus } from "../page";

const statusStyles: Record<BookingStatus, string> = {
  scheduled: "bg-[#A9F877] text-gray-800",
  completed: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-700",
};

export function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            className={cn(
              "text-xs font-semibold px-2.5 py-0.5 rounded-full border-0",
              statusStyles[booking.status],
            )}
          >
            {booking.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-900">
            {booking.tutorName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{booking.date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{booking.time}</span>
        </div>
      </div>

      {/* Right — only shown for upcoming bookings */}
      {booking.isUpcoming && (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => window.open(booking.meetLink, "_blank")}
            className="flex items-center gap-1.5 bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900"
          >
            <Video className="h-3.5 w-3.5" />
            Join Class
          </Button>
          <Button size="sm" variant="destructive" onClick={onCancel}>
            ✕
          </Button>
        </div>
      )}
    </div>
  );
}
