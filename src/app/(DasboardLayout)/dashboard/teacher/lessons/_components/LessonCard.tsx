import { Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lesson } from "@/app/data/lessonsData";

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const isLocked = lesson.status === "locked";
  const isPracticeAvailable = lesson.practiceAvailable;

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Info */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {lesson.title}
            </p>

            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 flex-wrap">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              <span>Status:</span>
              <span
                className={cn(
                  "font-medium",
                  isPracticeAvailable ? "text-green-600" : "text-gray-400",
                )}
              >
                {isLocked ? "Locked" : "Available"}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 flex-wrap">
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span>Exercises:</span>
              <span
                className={cn(
                  "font-medium",
                  isPracticeAvailable ? "text-green-600" : "text-gray-400",
                )}
              >
                {isPracticeAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons — each takes exactly 50% on mobile, auto width on sm+ */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 sm:shrink-0">
          <Button
            size="sm"
            disabled
            className="w-full sm:w-auto bg-[#A9F877] text-gray-900 hover:bg-[#C1FF72] border-0 text-xs font-medium shadow-none"
          >
            View Lesson
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled
            className="w-full sm:w-auto text-xs text-gray-500 hover:text-gray-700 font-medium"
          >
            View Practice
          </Button>
        </div>
      </div>
    </div>
  );
}
