/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useUpdateTeacherMutation } from "@/redux/features/teacherApi";
import { useGetTeacherReviewsQuery } from "@/redux/features/reviewApi";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  teacher?: {
    _id: string;
    totalClasses: number;
    bookings?: any[];
    averageRating?: number;
    totalReviews?: number;
    experience?: number;
    languages?: string[];
    country?: string;
    interests?: string[];
    aboutMe?: string;
    profilePicture?: string;
  };
}

export default function MyAccountPage() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const user: User | undefined = data?.data;
  const teacher = user?.teacher;

  const { data: reviewsData } = useGetTeacherReviewsQuery(teacher?._id ?? "", {
    skip: !teacher?._id,
  });
  const reviews = reviewsData?.data || [];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    country: teacher?.country || "",
    experience: teacher?.experience ?? 0,
    languages: (teacher?.languages || []).join(", "),
    interests: (teacher?.interests || []).join(", "),
    aboutMe: teacher?.aboutMe || "",
  });

  useEffect(() => {
    if (!isLoading && user) {
      setFormData({
        name: user?.name || "",
        country: teacher?.country || "",
        experience: teacher?.experience ?? 0,
        languages: (teacher?.languages || []).join(", "),
        interests: (teacher?.interests || []).join(", "),
        aboutMe: teacher?.aboutMe || "",
      });
    }
  }, [user, teacher, isLoading]);

  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();

  const handleChange = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!teacher?._id) return;
    try {
      await updateTeacher({
        id: teacher._id,
        name: formData.name,
        country: formData.country,
        experience: Number(formData.experience),
        languages: formData.languages.split(",").map((l) => l.trim()),
        interests: formData.interests.split(",").map((i) => i.trim()),
        aboutMe: formData.aboutMe,
        ...(selectedFile && { file: selectedFile }),
      }).unwrap();
      toast.success("Profile updated successfully!");
      setSelectedFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  const avatarSrc = previewImage || teacher?.profilePicture || null;

  const avatarFallback = (user?.name || "NA")
    .split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <div className="max-w-7xl mx-auto p-5 mt-10">
      <h1 className="text-2xl font-semibold mb-5">My Account</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT — Personal Info */}
        <Card>
          <CardContent className="space-y-5 pt-6">
            <h2 className="font-semibold">Personal Information</h2>

            {/* Avatar with upload button */}
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

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  placeholder="Name"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <Input value={user?.email || ""} disabled />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">country</label>
                <Input
                  value={formData.country}
                  placeholder="country"
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Experience (years)
                </label>
                <Input
                  type="number"
                  value={formData.experience}
                  placeholder="Experience"
                  onChange={(e) =>
                    handleChange("experience", Number(e.target.value))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Spoken Languages</label>
                <Input
                  value={formData.languages}
                  placeholder="English, Spanish"
                  onChange={(e) => handleChange("languages", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Interests</label>
                <Input
                  value={formData.interests}
                  placeholder="Music, Travel"
                  onChange={(e) => handleChange("interests", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">About Me</label>
                <Textarea
                  value={formData.aboutMe}
                  placeholder="About me"
                  className="resize-none min-h-20"
                  onChange={(e) => handleChange("aboutMe", e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold shadow-none border-0"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT — Stats */}
        <div className="space-y-6">
          <Card className="rounded-xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold">Teacher Statistics</h2>

              <div className="bg-yellow-50 rounded-lg p-4 space-y-1">
                <div className="flex items-center gap-2 text-yellow-600">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <p className="text-sm">Average Rating</p>
                </div>
                <p className="text-2xl font-bold">
                  {(teacher?.averageRating ?? 0).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on {teacher?.totalReviews ?? 0} reviews
                </p>
              </div>

              <div className="flex justify-between bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  Total Classes Taught
                </p>
                <p className="font-semibold">{teacher?.totalClasses ?? 0}</p>
              </div>
              <div className="flex justify-between bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="font-semibold">
                  {teacher?.bookings?.length ?? 0}
                </p>
              </div>

              <div className="space-y-3">
                <p className="font-medium">Recent Reviews ({reviews.length})</p>
                {reviews.length === 0 ? (
                  <div className="bg-muted rounded-lg p-3 text-center text-sm text-gray-400">
                    No reviews yet.
                  </div>
                ) : (
                  reviews.slice(0, 3).map((rev: any) => (
                    <div
                      key={rev._id}
                      className="bg-muted rounded-lg p-3 space-y-1"
                    >
                      <div className="flex gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${
                              idx < rev.rating
                                ? "fill-yellow-500 text-yellow-500"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm">{rev.comment}</p>
                      <p className="text-xs text-muted-foreground">
                        — {rev.studentId?.name || "Student"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
