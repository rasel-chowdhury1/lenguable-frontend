/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useUpdateStudentMutation } from "@/redux/features/studentApi";
import { toast } from "sonner";

interface FormValues {
  name: string;
  interests: string;
  aboutMe: string;
}

export default function MyAccountPage() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const userData = data?.data || [];
  const studentData = userData?.student || [];
  // console.log(studentData, "student data ==>");

  // React Hook Form
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: userData.name || "",
      interests: studentData.interests?.join(", ") || "",
      aboutMe: studentData.aboutMe || "",
    },
  });

  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  // Reset form when API data changes
  useEffect(() => {
    if (!isLoading && userData) {
      reset({
        name: userData.name || "",
        interests: studentData?.interests?.join(", ") || "",
        aboutMe: studentData?.aboutMe || "",
      });
    }
  }, [isLoading, userData, studentData, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!studentData._id) return;

    try {
      const res = await updateStudent({
        id: studentData._id,
        aboutMe: values.aboutMe,
        interests: values.interests.split(",").map((i) => i.trim()),
      }).unwrap();

      toast.success(res?.message || "Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5 lg:my-20">
      <h1 className="text-2xl font-semibold mb-5">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg font-medium bg-gray-100 text-gray-600">
                  {(userData.name || "NA")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
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
                <Input {...register("interests")} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">About Me</label>
                <Textarea
                  {...register("aboutMe")}
                  placeholder="About me"
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
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  Add Credits
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="space-y-3">
              <Card className="shadow-none p-0 rounded-md bg-[#F9FAFB] border-none">
                <CardContent className="py-4 flex items-center justify-between px-4">
                  <p className="text-sm text-muted-foreground">
                    Total Classes Taken
                  </p>
                  <p className="text-xl font-semibold">12</p>
                </CardContent>
              </Card>
              <Card className="shadow-none p-0 rounded-md bg-[#F9FAFB] border-none">
                <CardContent className="py-4 flex items-center justify-between px-4">
                  <p className="text-sm text-muted-foreground">
                    Upcoming Classes
                  </p>
                  <p className="text-xl font-semibold">
                    {studentData?.booking?.length ?? 0}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-sm font-bold mb-3">Recent Activity</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#A9F877] shrink-0" />
                  <div>
                    <p>Completed A1 Lesson 1</p>
                    <p className="text-muted-foreground text-xs">
                      Jan 28, 2026
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                  <div>
                    <p>Booked class with John Smith</p>
                    <p className="text-muted-foreground text-xs">
                      Jan 27, 2026
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#A9F877] shrink-0" />
                  <div>
                    <p>Completed A0 Lesson 2</p>
                    <p className="text-muted-foreground text-xs">
                      Jan 25, 2026
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
