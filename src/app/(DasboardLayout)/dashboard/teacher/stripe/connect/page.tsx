// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   useConnectStripeMutation,
//   useCheckOnboardingStatusQuery,
// } from "@/redux/features/payoutApi";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";

// export default function StripeConnectPage() {
//   const [connectStripe, { isLoading }] = useConnectStripeMutation();
//   const { data: statusData } = useCheckOnboardingStatusQuery(undefined);
//   const isOnboarded = statusData?.data?.isOnboarded;

//   const handleConnect = async () => {
//     try {
//       const res = await connectStripe(undefined).unwrap();
//       if (res?.data?.url) {
//         // Redirect teacher to Stripe onboarding
//         window.location.href = res.data.url;
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to connect Stripe");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-20 p-8 rounded-xl border border-border bg-white">
//       <h1 className="text-2xl font-bold text-foreground mb-2">
//         Connect Your Stripe Account
//       </h1>
//       <p className="text-muted-foreground text-sm mb-8">
//         Connect your Stripe account to receive weekly payouts every Sunday. You
//         will earn $10 for each completed class.
//       </p>

//       {isOnboarded ? (
//         <div className="flex items-center gap-3 p-4 rounded-lg bg-[#EEFEE4] border border-[#A9F877]">
//           <div className="w-8 h-8 rounded-full bg-[#A9F877] flex items-center justify-center shrink-0">
//             <svg
//               className="w-4 h-4 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//           <div>
//             <p className="font-semibold text-foreground">Stripe Connected</p>
//             <p className="text-sm text-muted-foreground">
//               You will receive payouts every Sunday automatically.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <Button
//           className="w-full bg-[#A9F877] shadow-2xl hover:bg-[#C1FF72] text-black"
//           onClick={handleConnect}
//           disabled={isLoading}
//         >
//           {isLoading ? <Spinner /> : "Connect with Stripe"}
//         </Button>
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useConnectStripeMutation } from "@/redux/features/payoutApi";
import { useGetMeQuery } from "@/redux/features/userApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function StripeConnectPage() {
  const [connectStripe, { isLoading }] = useConnectStripeMutation();

  // ✅ Use cached user data — no extra API call on load
  const { data } = useGetMeQuery(undefined);
  const isOnboarded = data?.data?.teacher?.stripeOnboarded;

  const handleConnect = async () => {
    try {
      const res = await connectStripe(undefined).unwrap();
      if (res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to connect Stripe");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 rounded-xl border border-border bg-white">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Connect Your Stripe Account
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Connect your Stripe account to receive weekly payouts every Sunday. You
        will earn $10 for each completed class.
      </p>

      {isOnboarded ? (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-[#EEFEE4] border border-[#A9F877]">
          <div className="w-8 h-8 rounded-full bg-[#A9F877] flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-white"
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
          <div>
            <p className="font-semibold text-foreground">Stripe Connected</p>
            <p className="text-sm text-muted-foreground">
              You will receive payouts every Sunday automatically.
            </p>
          </div>
        </div>
      ) : (
        <Button
          className="w-full bg-[#A9F877] shadow-2xl hover:bg-[#C1FF72] text-black hover:cursor-pointer"
          onClick={handleConnect}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Connect with Stripe"}
        </Button>
      )}
    </div>
  );
}
