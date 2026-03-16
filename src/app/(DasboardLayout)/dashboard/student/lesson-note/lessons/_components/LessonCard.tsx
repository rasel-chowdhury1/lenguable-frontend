import { Lock, Unlock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IApiLesson {
  _id: string;
  title: string;
  level: string;
  content: string;
  exercises: string;
  isLock: boolean;
}

interface LessonCardProps {
  lesson: IApiLesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const isLocked = lesson.isLock;

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Info */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {lesson.title}
            </p>

            {/* Status */}
            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 flex-wrap">
              {isLocked ? (
                <Lock className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              ) : (
                <Unlock className="h-3.5 w-3.5 shrink-0 text-green-500" />
              )}
              <span>Status:</span>
              <span
                className={cn(
                  "font-medium",
                  isLocked ? "text-gray-400" : "text-green-600",
                )}
              >
                {isLocked ? "Locked" : "Available"}
              </span>
            </div>

            {/* Exercises */}
            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 flex-wrap">
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span>Exercises:</span>
              <span
                className={cn(
                  "font-medium",
                  isLocked ? "text-gray-400" : "text-green-600",
                )}
              >
                {isLocked ? "Unavailable" : "Available"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2 sm:shrink-0">
          <Button
            size="sm"
            disabled={isLocked}
            className="w-full sm:w-auto bg-[#A9F877] text-gray-900 hover:bg-[#C1FF72] border-0 text-xs font-medium shadow-none disabled:opacity-50"
          >
            View Lesson
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={isLocked}
            className="w-full sm:w-auto text-xs text-gray-500 hover:text-gray-700 font-medium disabled:opacity-50"
          >
            View Practice
          </Button>
        </div>
      </div>
    </div>
  );
}
