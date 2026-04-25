/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentDashboard } from "./_components/StudentDashboard";
import { useGetMyStudentsQuery } from "@/redux/features/noteApi";

export interface Student {
  id: string;
  name: string;
  initials: string;
  level: string;
  lessonsCompleted: number;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

const getCurrentLevel = (unlockedCount: number) => {
  if (unlockedCount === 1) return "A0";
  if (unlockedCount === 2) return "A1";
  if (unlockedCount === 3) return "A2";
  if (unlockedCount === 4) return "B1";
  if (unlockedCount === 5) return "B2";
  if (unlockedCount === 6) return "C1";
  return "A0";
};

export default function MyStudentsPage() {
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetMyStudentsQuery(undefined);

  const rawStudents = data?.data || [];

  const students: Student[] = rawStudents.map((s: any) => {
    const unlockedCount = s.unlockedLessons?.length ?? 0;
    return {
      id: s._id,
      name: s.name,
      initials: getInitials(s.name),
      level: getCurrentLevel(unlockedCount),
      lessonsCompleted: unlockedCount,
    };
  });

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto p-5 mt-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Students</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A9F877]"
      />

      {/* Students Table */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-semibold text-gray-600">
                Student
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">
                Current Level
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">
                Lessons Completed
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-600">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-sm text-gray-400 py-10"
                >
                  Loading students...
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-sm text-gray-400 py-10"
                >
                  {search
                    ? "No students match your search."
                    : "No students yet."}
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id} className="border-t border-gray-100">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="text-xs font-semibold bg-gray-100 text-gray-600">
                          {student.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-gray-900">
                        {student.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-[#A9F877] text-gray-900 border-0 shadow-none font-semibold text-xs px-2.5 py-0.5 rounded-full">
                      {student.level}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-gray-700 hidden sm:table-cell">
                    {student.lessonsCompleted}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => setActiveStudent(student)}
                      className="gap-1.5 bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">View Dashboard</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {activeStudent && (
        <StudentDashboard
          student={activeStudent}
          onClose={() => setActiveStudent(null)}
        />
      )}
    </div>
  );
}
