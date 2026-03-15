"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed";
}

const myClasses: Booking[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 890",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2026-02-06",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 345 678 901",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2026-02-08",
    time: "2:00 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 456 789 012",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2026-02-10",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 567 890 123",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    date: "2026-02-12",
    time: "4:00 PM",
    status: "Confirmed",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 678 901 234",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
    date: "2026-02-14",
    time: "9:00 AM",
    status: "Pending",
  },
  {
    id: 6,
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    phone: "+1 789 012 345",
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
    date: "2026-02-16",
    time: "3:00 PM",
    status: "Completed",
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james.anderson@example.com",
    phone: "+1 890 123 456",
    photo: "https://randomuser.me/api/portraits/men/7.jpg",
    date: "2026-02-18",
    time: "1:00 PM",
    status: "Confirmed",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "+1 901 234 567",
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
    date: "2026-02-20",
    time: "5:00 PM",
    status: "Completed",
  },
  {
    id: 9,
    name: "Daniel Thomas",
    email: "daniel.thomas@example.com",
    phone: "+1 112 233 445",
    photo: "https://randomuser.me/api/portraits/men/9.jpg",
    date: "2026-02-22",
    time: "12:00 PM",
    status: "Pending",
  },
  {
    id: 10,
    name: "Isabella White",
    email: "isabella.white@example.com",
    phone: "+1 223 344 556",
    photo: "https://randomuser.me/api/portraits/women/10.jpg",
    date: "2026-02-24",
    time: "6:00 PM",
    status: "Completed",
  },
];

export default function MyBookingsPage() {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Booking | null>(null);

  const handleView = (booking: Booking) => {
    setSelectedStudent(booking);
    setOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <h2 className="text-xl font-semibold mb-4">My Students</h2>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {myClasses.map((booking, index) => (
              <TableRow key={booking.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={booking.photo} />
                      <AvatarFallback>{booking.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{booking.name}</span>
                  </div>
                </TableCell>

                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.phone}</TableCell>

                <TableCell className="flex justify-end">
                  <Button size="sm" onClick={() => handleView(booking)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Progress Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Student Progress</DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedStudent.photo} />
                  <AvatarFallback>
                    {selectedStudent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">{selectedStudent.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.email}
                  </p>
                </div>
              </div>

              {/* Example progress */}
              <div className="space-y-2">
                <p className="text-sm">Course Completion</p>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: "70%" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">70% completed</p>
              </div>

              <div>
                <p className="text-sm">Last Class Status</p>
                <Badge>{selectedStudent.status}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
