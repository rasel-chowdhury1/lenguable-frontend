/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useCheckOnboardingStatusQuery } from "@/redux/features/payoutApi";
import { useRouter } from "next/navigation";

export default function StripeSuccessPage() {
  const router = useRouter();
  const { data, isLoading } = useCheckOnboardingStatusQuery(undefined);
  const isOnboarded = data?.data?.isOnboarded;

  useEffect(() => {
    if (!isLoading && isOnboarded) {
      setTimeout(() => {
        router.push("/dashboard/teacher/my-schedules");
      }, 3000);
    }
  }, [isOnboarded, isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEFEE4]">
      <div className="text-center">
        {isLoading ? (
          <p className="text-muted-foreground">Verifying your account...</p>
        ) : isOnboarded ? (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#A9F877] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Stripe Account Connected!
            </h1>
            <p className="text-muted-foreground mb-2">
              You will now receive $10 for each completed class every Sunday.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-500 mb-2">
              Onboarding Incomplete
            </h1>
            <p className="text-muted-foreground mb-6">
              Please complete your Stripe onboarding to receive payouts.
            </p>

            <a
              href="/teacher/stripe/connect"
              className="bg-[#635BFF] text-white font-semibold px-6 py-2 rounded-lg"
            >
              Try Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}
