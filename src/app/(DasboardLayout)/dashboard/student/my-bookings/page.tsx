"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Video, X } from "lucide-react";
import { format } from "date-fns";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [filter, setFilter] = useState<
        "All" | "Pending" | "Confirmed" | "Completed"
    >("All");

    const filteredClasses =
        filter === "All"
            ? myClasses
            : myClasses.filter((booking) => booking.status === filter);

    const handleCancelClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setCancelModalOpen(true);
    };

    const handleConfirmCancel = () => {
        console.log("Class canceled:", selectedBooking);
        setCancelModalOpen(false);
        setSelectedBooking(null);
    };

    return (
        <div className="max-w-7xl mx-auto my-10">
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

                {/* Filter Buttons */}
                <div className="flex gap-2 mb-4">
                    {["All", "Pending", "Confirmed", "Completed"].map((status) => (
                        <Button
                            key={status}
                            size="sm"
                            variant={filter === status ? "default" : "outline"}
                            onClick={() =>
                                setFilter(
                                    status as "All" | "Pending" | "Confirmed" | "Completed"
                                )
                            }
                        >
                            {status}
                        </Button>
                    ))}
                </div>

                <div className="border rounded-md overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Teacher</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredClasses.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                booking.status === "Completed"
                                                    ? "secondary"
                                                    : booking.status === "Pending"
                                                        ? "outline"
                                                        : "default"
                                            }
                                        >
                                            {booking.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={booking.photo} />
                                                <AvatarFallback>
                                                    {booking.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{booking.name}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell>{booking.email}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>
                                        {format(new Date(booking.date), "MMM dd, yyyy")}
                                    </TableCell>
                                    <TableCell>{booking.time}</TableCell>

                                    <TableCell className="flex justify-end gap-2">
                                        <Button size="sm">
                                            <Video className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleCancelClick(booking)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {filteredClasses.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6">
                                        No classes found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* Cancel Modal */}
            <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cancel Class</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>Are you sure you want to cancel this class?</p>
                        <p className="mt-2 text-sm text-orange-600">
                            ⚠️ Cancelling within 24 hours will not refund your credit.
                        </p>
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setCancelModalOpen(false)}
                        >
                            Go Back
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmCancel}>
                            Yes, Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
