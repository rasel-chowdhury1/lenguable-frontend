/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreditCard, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useUpdateStudentMutation } from "@/redux/features/studentApi";
import { toast } from "sonner";
import Link from "next/link";

interface FormValues {
  name: string;
  interests: string;
  aboutMe: string;
}

interface IBooking {
  _id: string;
  day: string;
  startTime: string;
  date: string;
  meetLink: string;
  createdAt: string;
  teacherId: { _id: string; name: string } | string;
}

const isUpcoming = (date: string, startTime: string): boolean => {
  const now = new Date();
  const todayISO = now.toISOString().split("T")[0];
  if (date > todayISO) return true;
  if (date === todayISO) {
    const [hour, minute] = startTime.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);
    return slotTime > now;
  }
  return false;
};

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timeStr: string): string => {
  if (!timeStr) return "";
  if (timeStr.includes("T")) {
    return new Date(timeStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MyAccountPage() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const userData = data?.data || {};
  const studentData = userData?.student || {};

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: userData.name || "",
      interests: studentData.interests?.join(", ") || "",
      aboutMe: studentData.aboutMe || "",
    },
  });

  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  useEffect(() => {
    if (!isLoading && userData) {
      reset({
        name: userData.name || "",
        interests: studentData?.interests?.join(", ") || "",
        aboutMe: studentData?.aboutMe || "",
      });
    }
  }, [isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!studentData._id) return;
    try {
      const res = await updateStudent({
        id: studentData._id,
        name: values.name,
        aboutMe: values.aboutMe,
        interests: values.interests
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        ...(selectedFile && { file: selectedFile }),
      }).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
      setSelectedFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  const bookings: IBooking[] = studentData?.booking ?? [];
  const upcomingCount = bookings.filter((b) =>
    isUpcoming(b.date, b.startTime),
  ).length;
  const takenCount = bookings.length - upcomingCount;

  const upcomingBookings = bookings
    .filter((b) => isUpcoming(b.date, b.startTime))
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime),
    );

  const pastBookings = bookings
    .filter((b) => !isUpcoming(b.date, b.startTime))
    .sort((a, b) => b.date.localeCompare(a.date));

  const nextUpcoming = upcomingBookings.slice(0, 1);
  const recentBookings = [...nextUpcoming, ...pastBookings].slice(0, 5);

  const avatarSrc = previewImage || studentData.profilePicture || null;

  const avatarFallback = (studentData.name || userData.name || "NA")
    .split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <div className="max-w-5xl mx-auto md:p-5 lg:my-20">
      <h1 className="text-2xl font-semibold mb-5">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  {avatarSrc && <AvatarImage src={avatarSrc} alt="Profile" />}
                  <AvatarFallback className="text-lg font-medium bg-gray-100 text-gray-600">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
                >
                  <Camera className="h-3.5 w-3.5 text-gray-600" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Name</label>
                <Input {...register("name")} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <Input value={userData.email || ""} disabled />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Interests</label>
                <Input
                  {...register("interests")}
                  placeholder="e.g. Math, Science, History"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">About Me</label>
                <Textarea
                  {...register("aboutMe")}
                  placeholder="Tell us about yourself"
                  className="resize-none min-h-20"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold shadow-none border-0"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Class Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Class Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Credits */}
            <Card className="bg-blue-50 border-0 shadow-none p-0 rounded-md">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4 px-4">
                <div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <p className="text-sm text-muted-foreground">
                      Available Credits
                    </p>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-600">
                    {studentData.credits ?? 0}
                  </h3>
                </div>
                <Link href="/#pricing">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    Add Credits
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="space-y-3">
              <Card className="shadow-none p-0 rounded-md bg-[#F9FAFB] border-none">
                <CardContent className="py-4 flex items-center justify-between px-4">
                  <p className="text-sm text-muted-foreground">
                    Total Classes Taken
                  </p>
                  <p className="text-xl font-semibold">{takenCount}</p>
                </CardContent>
              </Card>
              <Card className="shadow-none p-0 rounded-md bg-[#F9FAFB] border-none">
                <CardContent className="py-4 flex items-center justify-between px-4">
                  <p className="text-sm text-muted-foreground">
                    Upcoming Classes
                  </p>
                  <p className="text-xl font-semibold">{upcomingCount}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-sm font-bold mb-3">Recent Activity</h3>
              {recentBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No activity yet.
                </p>
              ) : (
                <ul className="space-y-3 text-sm">
                  {recentBookings.map((b) => {
                    const teacherName =
                      typeof b.teacherId === "object" && b.teacherId !== null
                        ? b.teacherId.name
                        : "Teacher";
                    const upcoming = isUpcoming(b.date, b.startTime);
                    return (
                      <li key={b._id} className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                            upcoming ? "bg-blue-400" : "bg-[#A9F877]"
                          }`}
                        />
                        <div>
                          <p>
                            {upcoming ? "Upcoming" : "Completed"} class with{" "}
                            {teacherName}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formatDate(b.date)} &middot; {b.day} at{" "}
                            {formatTime(b.startTime)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
