/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Globe, Mail, Lock } from "lucide-react";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/redux/features/authApi";
import { toast } from "sonner";

type FormData = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success(res?.message || "Password reset link sent to your email");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Top */}
        <div className="flex justify-between items-center mb-5">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Button variant="ghost">
            <Globe className="h-4 w-4" />
            <span className="text-sm">ES</span>
          </Button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image
            src={logo}
            alt="Lenguable Logo"
            height={60}
            width={200}
            className="object-contain"
          />
        </div>

        {/* Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            {/* Lock icon */}
            <div className="flex justify-center mb-2">
              <div className="bg-green-100 p-3 rounded-full">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>

            <CardDescription>
              Enter your email to reset password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@example.com"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />

                  {/* Icon */}
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                {/* Error */}
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#A9F877] text-gray-900 hover:bg-[#A9F877] font-semibold"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
