"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

function JoinErrorContent() {
  const searchParams = useSearchParams();
  const message =
    searchParams.get("message") ||
    "Something went wrong while joining the class.";
    
  const role = searchParams.get("role");
  const isTeacher = role === "teacher";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEFEE4]">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Unable to Join Class
        </h1>
        <p className="text-gray-600 mb-6">{decodeURIComponent(message)}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={isTeacher ? "/dashboard/teacher/my-schedules" : "/dashboard/student/booking"}
            className="bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            {isTeacher ? "Go to My Schedules" : "Go to My Bookings"}
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function JoinErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#EEFEE4]" />}>
      <JoinErrorContent />
    </Suspense>
  );
}
