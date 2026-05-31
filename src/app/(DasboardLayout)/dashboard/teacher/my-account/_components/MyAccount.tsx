/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, Camera, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useUpdateTeacherMutation } from "@/redux/features/teacherApi";
import { useGetTeacherReviewsQuery } from "@/redux/features/reviewApi";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import countries from "i18n-iso-countries";

// Register English locale
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Generate country list
const countryList = Object.entries(
  countries.getNames("en", { select: "official" }),
).map(([code, name]) => ({ code, name }));

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
    nationality?: string;
    interests?: string[];
    aboutMe?: string;
    profilePicture?: string;
    stripeOnboarded?: boolean;
    unpaidEarnings?: number;
    totalPaidOut?: number;
    googleRefreshToken?: string; // added this
  };
}

export default function MyAccount() {
  const { data, isLoading, refetch } = useGetMeQuery(undefined);
  const user: User | undefined = data?.data;
  const teacher = user?.teacher;

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("google") === "connected") {
      refetch(); // refresh user data
      toast.success("Google account connected successfully!");

      // 👇 Clear the query param so it doesn't fire again on reload
      const url = new URL(window.location.href);
      url.searchParams.delete("google");
      window.history.replaceState({}, "", url.toString());
    }
  }, []); // 👈 empty deps — run once on mount only

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
    nationality: teacher?.country || "",
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
        nationality: teacher?.nationality || "",
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
        nationality: formData.nationality,
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

  // Correct — points to /teacher/google/connect
  const handleConnectGoogle = () => {
    const userId = user?._id; // get from your redux state
    // window.location.href = `http://localhost:5000/api/v1/teacher/google/connect?userId=${userId}`;
    window.location.href = `https://lenguable.com/api/v1/teacher/google/connect?userId=${userId}`;
  };

  const isGoogleConnected = !!teacher?.googleRefreshToken;

  const avatarSrc = previewImage || teacher?.profilePicture || null;
  const avatarFallback = (user?.name || "NA")
    .split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <div className="max-w-7xl mx-auto md:p-5 mt-10">
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
                <label className="text-sm font-medium">Nationality</label>
                <Input
                  value={formData.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Banking Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a country</option>
                  {countryList.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
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

        {/* RIGHT — Stats + Google Connect */}
        <div className="space-y-6">
          {/* Google Calendar Connect Card */}
          <Card className="rounded-xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold">Google Calendar</h2>
              <p className="text-sm text-muted-foreground">
                Connect your Google account so you are the host of all student
                meetings. Your students will join via Google Meet directly from
                your calendar.
              </p>

              {isGoogleConnected ? (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Google account connected
                    </p>
                    <p className="text-xs text-green-600">
                      You are the host of all your classes
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-800">
                      ⚠️ Google account not connected. Students won't be able to
                      book classes until you connect your account.
                    </p>
                  </div>
                  <Button
                    onClick={handleConnectGoogle}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-none"
                    variant="outline"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Connect Google Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="rounded-xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold">Teacher Statistics</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-1">
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
                <p className="text-sm text-muted-foreground">Total Bookings</p>
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
