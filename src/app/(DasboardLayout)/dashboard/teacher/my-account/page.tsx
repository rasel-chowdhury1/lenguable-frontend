/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useUpdateTeacherMutation } from "@/redux/features/teacherApi";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// --- Types ---
interface Review {
  text: string;
  reviewerName: string;
}

interface Teacher {
  _id: string;
  totalClasses: number;
  totalStudents: number;
  averageRating: number;
  reviewCount: number;
  experience?: number;
  languages?: string[];
  nationality?: string;
  interests?: string[];
  aboutMe?: string;
  reviews?: Review[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  teacher?: Teacher;
}

export default function MyAccountPage() {
  const { data } = useGetMeQuery(undefined);
  const user: User | undefined = data?.data;
  const teacher = user?.teacher;

  // Local form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    nationality: teacher?.nationality || "",
    experience: teacher?.experience ?? 0,
    languages: (teacher?.languages || []).join(", "),
    interests: (teacher?.interests || []).join(", "),
    aboutMe: teacher?.aboutMe || "",
  });

  // Sync form when data changes
  useEffect(() => {
    setFormData({
      name: user?.name || "",
      nationality: teacher?.nationality || "",
      experience: teacher?.experience ?? 0,
      languages: (teacher?.languages || []).join(", "),
      interests: (teacher?.interests || []).join(", "),
      aboutMe: teacher?.aboutMe || "",
    });
  }, [user, teacher]);

  const [updateTeacher, { isLoading }] = useUpdateTeacherMutation();

  // Input change handler
  const handleChange = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Save handler
  const handleSave = async () => {
    if (!teacher?._id) return;

    try {
      await updateTeacher({
        id: teacher._id,
        name: formData.name,
        nationality: formData.nationality,
        experience: Number(formData.experience),
        languages: formData.languages.split(",").map((l) => l.trim()),
        interests: formData.interests.split(",").map((i) => i.trim()),
        aboutMe: formData.aboutMe,
      }).unwrap();

      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-5">My Account</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT — Personal Info */}
        <Card className="rounded-xl">
          <CardContent className="space-y-5">
            <h2 className="font-semibold">Personal Information</h2>

            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
                {user?.name?.[0] || "U"}
              </div>
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div className="space-y-1">
                <p className="text-sm">Name</p>
                <Input
                  value={formData.name}
                  placeholder="Name"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              {/* Email (disabled) */}
              <div className="space-y-1">
                <p className="text-sm">Email</p>
                <Input value={user?.email || ""} placeholder="Email" disabled />
              </div>

              {/* Nationality */}
              <div className="space-y-1">
                <p className="text-sm">Nationality</p>
                <Input
                  value={formData.nationality}
                  placeholder="Nationality"
                  onChange={(e) => handleChange("nationality", e.target.value)}
                />
              </div>

              {/* Experience */}
              <div className="space-y-1">
                <p className="text-sm">Experience (years)</p>
                <Input
                  type="number"
                  value={formData.experience}
                  placeholder="Experience"
                  onChange={(e) =>
                    handleChange("experience", Number(e.target.value))
                  }
                />
              </div>

              {/* Spoken Languages */}
              <div className="space-y-1">
                <p className="text-sm">Spoken Languages</p>
                <Input
                  value={formData.languages}
                  placeholder="English, Spanish"
                  onChange={(e) => handleChange("languages", e.target.value)}
                />
              </div>

              {/* Interests */}
              <div className="space-y-1">
                <p className="text-sm">Interests</p>
                <Input
                  value={formData.interests}
                  placeholder="Music, Travel"
                  onChange={(e) => handleChange("interests", e.target.value)}
                />
              </div>

              {/* About Me */}
              <div className="space-y-1">
                <p className="text-sm">About Me</p>
                <Textarea
                  value={formData.aboutMe}
                  placeholder="About me"
                  onChange={(e) => handleChange("aboutMe", e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT — Stats */}
        <div className="space-y-6">
          <Card className="rounded-xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold">Teacher Statistics</h2>

              {/* Average Rating */}
              <div className="bg-yellow-50 rounded-lg p-4 space-y-1">
                <div className="flex items-center gap-2 text-yellow-600">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <p className="text-sm">Average Rating</p>
                </div>

                <p className="text-2xl font-bold">
                  {(teacher?.averageRating ?? 0).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on {teacher?.reviewCount ?? 0} reviews
                </p>
              </div>

              {/* Numbers */}
              <div className="flex justify-between bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  Total Classes Taught
                </p>
                <p className="font-semibold">{teacher?.totalClasses ?? 0}</p>
              </div>
              <div className="flex justify-between bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="font-semibold">{teacher?.totalStudents ?? 0}</p>
              </div>

              {/* Recent Reviews */}
              <div className="space-y-3">
                <p className="font-medium">Recent Reviews</p>
                {(teacher?.reviews || []).slice(0, 2).map((rev, i) => (
                  <div key={i} className="bg-muted rounded-lg p-3 space-y-1">
                    <div className="flex gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm">{rev.text}</p>
                    <p className="text-xs text-muted-foreground">
                      — {rev.reviewerName}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
