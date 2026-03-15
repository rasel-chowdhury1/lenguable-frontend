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

export interface Student {
  id: string;
  name: string;
  initials: string;
  level: string;
  lessonsCompleted: number;
}

const students: Student[] = [
  {
    id: "1",
    name: "Maria Garcia",
    initials: "MG",
    level: "A1",
    lessonsCompleted: 3,
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    initials: "CR",
    level: "A2",
    lessonsCompleted: 8,
  },
];

export default function MyStudentsPage() {
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Students</h1>

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
            {students.map((student) => (
              <TableRow key={student.id} className="border-t border-gray-100">
                {/* Student */}
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

                {/* Level */}
                <TableCell>
                  <Badge className="bg-[#A9F877] text-gray-900 border-0 shadow-none font-semibold text-xs px-2.5 py-0.5 rounded-full">
                    {student.level}
                  </Badge>
                </TableCell>

                {/* Lessons */}
                <TableCell className="text-sm text-gray-700 hidden sm:table-cell">
                  {student.lessonsCompleted}
                </TableCell>

                {/* Actions */}
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Student Dashboard Modal */}
      {activeStudent && (
        <StudentDashboard
          student={activeStudent}
          onClose={() => setActiveStudent(null)}
        />
      )}
    </div>
  );
}
