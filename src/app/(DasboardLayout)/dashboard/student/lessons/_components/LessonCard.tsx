"use client";

import { useState } from "react";
import { Lock, Unlock, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IApiLesson {
  _id: string;
  title: string;
  level: string;
  file: string;
  exercises: string[];
  isLock: boolean;
}

interface LessonCardProps {
  lesson: IApiLesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const isLocked = lesson.isLock;
  const [lessonOpen, setLessonOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  return (
    <>
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
              onClick={() => setLessonOpen(true)}
              className="w-full sm:w-auto bg-[#A9F877] text-gray-900 hover:bg-[#C1FF72] border-0 text-xs font-medium shadow-none disabled:opacity-50"
            >
              View Lesson
            </Button>

            <Button
              size="sm"
              variant="ghost"
              disabled={isLocked}
              onClick={() => setPracticeOpen(true)}
              className="w-full sm:w-auto text-xs text-gray-500 hover:text-gray-700 font-medium disabled:opacity-50"
            >
              View Practice
            </Button>
          </div>
        </div>
      </div>

      {/* ── Lesson PDF Modal ── */}
      <Dialog open={lessonOpen} onOpenChange={setLessonOpen}>
        <DialogContent className="max-w-5xl! w-full h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{lesson.title}</DialogTitle>
          </DialogHeader>

          <div className="flex-1">
            <iframe src={lesson.file} className="w-full h-full border-0" />
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Practice Exercises Modal ── */}
      <Dialog open={practiceOpen} onOpenChange={setPracticeOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Practice Exercises</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {lesson.title} — {lesson.level}
            </p>
          </DialogHeader>

          <div className="space-y-3 py-2">
            {Array.isArray(lesson.exercises) && lesson.exercises.length > 0 ? (
              lesson.exercises.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPracticeOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#A9F877] hover:bg-[#A9F877]/5 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#A9F877]/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-700">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex-1 truncate">
                    Exercise {index + 1}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gray-700 shrink-0" />
                </a>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No exercises available
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
