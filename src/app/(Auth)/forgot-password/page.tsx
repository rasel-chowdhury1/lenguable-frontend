"use client";
import React, { useState } from "react";
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

export default function Login() {
  const [email, setEmail] = useState("dorman@example.com");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Forgot password", { email });
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
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="your@example.com"
                  />

                  {/* Mail icon */}
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#A9F877] text-gray-900 hover:bg-[#A9F877] font-semibold"
                size="lg"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}