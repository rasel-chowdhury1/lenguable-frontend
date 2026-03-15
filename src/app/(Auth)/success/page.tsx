"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ResetSuccess() {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary/20 to-primary/30 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo" width={200} height={60} />
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="text-center py-10 space-y-5">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />

            <h2 className="text-2xl font-bold">Password Updated</h2>

            <p className="text-muted-foreground">
              Your password has been successfully reset. You can now login with
              your new password.
            </p>

            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
