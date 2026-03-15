import { useState } from "react";
import { Student } from "../page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
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

interface Lesson {
  id: string;
  label: string;
  unlocked: boolean;
}

interface TeacherNote {
  id: string;
  date: string;
  lessonTaught: string;
  activitiesDone: string;
  strengths: string;
  areasToImprove: string;
  notes: string;
}

const allLessons: Lesson[] = [
  { id: "l1", label: "A0 Lesson 1: Greetings", unlocked: true },
  { id: "l2", label: "A0 Lesson 2: Numbers", unlocked: true },
  { id: "l3", label: "A0 Lesson 3: Common Objects", unlocked: false },
  { id: "l4", label: "A1 Lesson 1: Present Simple", unlocked: true },
  { id: "l5", label: "A1 Lesson 2: Daily Routines", unlocked: false },
  { id: "l6", label: "A1 Lesson 3: Family", unlocked: false },
  { id: "l7", label: "A2 Lesson 1: Past Simple", unlocked: false },
  { id: "l8", label: "A2 Lesson 2: Making Plans", unlocked: false },
  { id: "l9", label: "A2 Lesson 3: Shopping", unlocked: false },
];

const initialNotes: TeacherNote[] = [
  {
    id: "n1",
    date: "Jan 28, 2026",
    lessonTaught: "A1 Lesson 1: Present Simple",
    activitiesDone: "Presentation + Online Quiz",
    strengths: "Good pronunciation",
    areasToImprove: "Verb conjugation",
    notes: "Student wishes to review next class.",
  },
];

export function StudentDashboard({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  const [lessons, setLessons] = useState<Lesson[]>(allLessons);
  const [notes, setNotes] = useState<TeacherNote[]>(initialNotes);
  const [form, setForm] = useState({
    lessonTaught: "",
    activitiesDone: "",
    strengths: "",
    areasToImprove: "",
    notes: "",
  });

  const toggleLesson = (id: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, unlocked: !l.unlocked } : l)),
    );
  };

  const handleSave = () => {
    if (!form.lessonTaught.trim()) return;
    const newNote: TeacherNote = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      ...form,
    };
    setNotes((prev) => [newNote, ...prev]);
    setForm({
      lessonTaught: "",
      activitiesDone: "",
      strengths: "",
      areasToImprove: "",
      notes: "",
    });
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => toggleLesson(lesson.id)}
                  className={cn(
                    "flex items-center gap-2.5 text-sm px-4 py-2.5 rounded-lg border transition-all text-left font-medium",
                    lesson.unlocked
                      ? "bg-[#A9F877] border-[#A9F877] text-gray-900"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <Lock className="h-3.5 w-3.5 shrink-0" />
                  {lesson.label}
                </button>
              ))}
            </div>
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
                disabled={!form.lessonTaught.trim()}
                className="bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900  disabled:opacity-50"
              >
                Save Note
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
                  {notes.map((note) => (
                    <TableRow
                      key={note.id}
                      className="border-t border-gray-100"
                    >
                      <TableCell className="text-xs text-gray-600 py-3 whitespace-nowrap">
                        {note.date}
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
                  ))}
                  {notes.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-xs text-gray-400 py-6"
                      >
                        No notes yet.
                      </TableCell>
                    </TableRow>
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
