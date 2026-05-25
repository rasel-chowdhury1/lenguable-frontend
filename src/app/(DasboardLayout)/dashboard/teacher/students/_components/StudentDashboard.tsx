/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Student } from "../page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Lock, LockOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useGetMeQuery } from "@/redux/features/userApi";
import {
  useCreateNoteMutation,
  useGetLessonsForStudentQuery,
  useGetNotesByStudentQuery,
  useUnlockLessonMutation,
} from "@/redux/features/noteApi";

const LEVELS = ["A0", "A1", "A2", "B1", "B2", "C1"];

function getLessonOrder(title: string): number {
  if (/^Foundation/i.test(title)) return 0;
  const match = title.match(/^Lesson\s+(\d+)/i);
  if (match) return parseInt(match[1], 10);
  return 999;
}

export function StudentDashboard({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    lessonTaught: "",
    activitiesDone: "",
    strengths: "",
    areasToImprove: "",
    notes: "",
  });

  // optimisticLocks: map of lessonId -> isLock (boolean)
  // null means "use server value"
  const [optimisticLocks, setOptimisticLocks] = useState<
    Record<string, boolean>
  >({});

  const { data: lessonsData, isLoading: lessonsLoading } =
    useGetLessonsForStudentQuery(student.id);

  const { data: notesData, isLoading: notesLoading } =
    useGetNotesByStudentQuery(student.id);

  const { data: meData } = useGetMeQuery(undefined);
  const teacherId = meData?.data?.teacher?._id;

  const [unlockLesson] = useUnlockLessonMutation();
  const [createNote, { isLoading: isSaving }] = useCreateNoteMutation();

  const allLessons = [...(lessonsData?.data || [])].sort(
    (a: any, b: any) =>
      (a.order ?? getLessonOrder(a.title)) -
      (b.order ?? getLessonOrder(b.title)),
  );

  const groupedLessons = LEVELS.reduce(
    (acc, level) => {
      const levelLessons = allLessons.filter((l: any) => l.level === level);
      if (levelLessons.length > 0) acc[level] = levelLessons;
      return acc;
    },
    {} as Record<string, any[]>,
  );

  const notes = notesData?.data || [];

  const handleToggleLesson = async (
    lessonId: string,
    currentIsLock: boolean,
  ) => {
    const newIsLock = !currentIsLock;
    // Flip immediately for instant UI feedback
    setOptimisticLocks((prev) => ({ ...prev, [lessonId]: newIsLock }));

    try {
      await unlockLesson({
        studentId: student.id,
        lessonId,
      }).unwrap();
      // Keep optimistic value to prevent RTK Query cache re-render from flipping back
      toast.success("Lesson updated successfully!");
    } catch (err: any) {
      // Roll back on failure
      setOptimisticLocks((prev) => ({ ...prev, [lessonId]: currentIsLock }));
      toast.error(err?.data?.message || "Failed to update lesson.");
    }
  };

  const handleSave = async () => {
    if (!form.lessonTaught.trim()) return;
    if (!teacherId) {
      toast.error("Teacher ID not found.");
      return;
    }

    try {
      await createNote({
        studentId: student.id,
        teacherId,
        ...form,
      }).unwrap();
      toast.success("Note saved successfully!");
      setForm({
        lessonTaught: "",
        activitiesDone: "",
        strengths: "",
        areasToImprove: "",
        notes: "",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save note.");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-5xl! rounded-lg p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <DialogTitle className="text-base font-bold text-gray-900">
            {student.name} – Student Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">
          {/* Unlock Lessons */}
          <section>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Unlock Lesson
            </h3>
            {lessonsLoading ? (
              <p className="text-sm text-gray-400">Loading lessons...</p>
            ) : (
              <div className="space-y-4">
                {LEVELS.map((level) =>
                  groupedLessons[level] ? (
                    <div key={level}>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">
                        {level}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {groupedLessons[level].map((lesson: any) => {
                          // Use optimistic value if available, else server value
                          const locked =
                            lesson._id in optimisticLocks
                              ? optimisticLocks[lesson._id]
                              : lesson.isLock;

                          return (
                            <button
                              key={lesson._id}
                              onClick={() =>
                                handleToggleLesson(lesson._id, locked)
                              }
                              className={cn(
                                "flex items-center gap-2.5 text-sm px-4 py-2.5 rounded-lg border transition-all text-left font-medium",
                                !locked
                                  ? "bg-[#A9F877] border-[#A9F877] text-gray-900"
                                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50",
                              )}
                            >
                              {locked ? (
                                <Lock className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                              ) : (
                                <LockOpen className="h-3.5 w-3.5 shrink-0 text-gray-900" />
                              )}
                              <span className="text-xs text-gray-900 mr-1">
                                {lesson.level}
                              </span>
                              {lesson.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </section>

          {/* Add Note */}
          <section>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Add Note
            </h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500">
                    Lesson Taught
                  </label>
                  <Input
                    value={form.lessonTaught}
                    onChange={(e) =>
                      setForm({ ...form, lessonTaught: e.target.value })
                    }
                    placeholder="e.g., A2 Lesson 1: Past Simple"
                    className="rounded-md border-gray-200 text-sm h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500">
                    Activities Done
                  </label>
                  <Input
                    value={form.activitiesDone}
                    onChange={(e) =>
                      setForm({ ...form, activitiesDone: e.target.value })
                    }
                    placeholder="e.g., Presentation + Online Quiz"
                    className="rounded-md border-gray-200 text-sm h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500">
                    Strengths
                  </label>
                  <Input
                    value={form.strengths}
                    onChange={(e) =>
                      setForm({ ...form, strengths: e.target.value })
                    }
                    placeholder="What the student did well"
                    className="rounded-md border-gray-200 text-sm h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500">
                    Areas to Improve
                  </label>
                  <Input
                    value={form.areasToImprove}
                    onChange={(e) =>
                      setForm({ ...form, areasToImprove: e.target.value })
                    }
                    placeholder="What needs more work"
                    className="rounded-md border-gray-200 text-sm h-9"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">
                  Notes
                </label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Additional notes..."
                  className="rounded-md border-gray-200 text-sm resize-none min-h-20"
                />
              </div>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!form.lessonTaught.trim() || isSaving}
                className="bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Note"}
              </Button>
            </div>
          </section>

          {/* Teacher Notes */}
          <section>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Teacher Notes
            </h3>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-xs font-semibold text-gray-600 py-3">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-600 py-3">
                      Lesson Taught
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-600 py-3 hidden sm:table-cell">
                      Activities Done
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-600 py-3 hidden md:table-cell">
                      Strengths
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-600 py-3 hidden md:table-cell">
                      Areas to Improve
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-600 py-3 hidden lg:table-cell">
                      Notes
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notesLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-xs text-gray-400 py-6"
                      >
                        Loading notes...
                      </TableCell>
                    </TableRow>
                  ) : notes.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-xs text-gray-400 py-6"
                      >
                        No notes yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    notes.map((note: any) => (
                      <TableRow
                        key={note._id}
                        className="border-t border-gray-100"
                      >
                        <TableCell className="text-xs text-gray-600 py-3 whitespace-nowrap">
                          {new Date(note.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-gray-800 font-medium py-3">
                          {note.lessonTaught}
                        </TableCell>
                        <TableCell className="text-xs text-gray-600 py-3 hidden sm:table-cell">
                          {note.activitiesDone}
                        </TableCell>
                        <TableCell className="text-xs text-gray-600 py-3 hidden md:table-cell">
                          {note.strengths}
                        </TableCell>
                        <TableCell className="text-xs text-gray-600 py-3 hidden md:table-cell">
                          {note.areasToImprove}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500 py-3 hidden lg:table-cell">
                          {note.notes}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
