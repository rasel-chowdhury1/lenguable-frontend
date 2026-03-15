"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Lock } from "lucide-react";

export default function OtpPage() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    alert("OTP: " + value);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Image src={logo} alt="Logo" height={60} width={200} />
        </div>

        {/* Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>

            <CardDescription>
              Enter the 6 digit code sent to your email
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OTP input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(val) => setValue(val)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Verify */}
            <Button
              className="w-full"
              size="lg"
              disabled={value.length !== 6}
              onClick={handleSubmit}
            >
              Verify OTP
            </Button>

            {/* Resend */}
            <p className="text-center text-sm text-muted-foreground">
              Didn’t receive code? <Button variant="link">Resend OTP</Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
