// "use client";

// import { useConnectStripeMutation } from "@/redux/features/payoutApi";
// import { useEffect } from "react";

// export default function StripeRefreshPage() {
//   const [connectStripe] = useConnectStripeMutation();

//   useEffect(() => {
//     const refresh = async () => {
//       try {
//         const res = await connectStripe(undefined).unwrap();
//         if (res?.data?.url) {
//           window.location.href = res.data.url;
//         }
//       } catch {
//         window.location.href = "/teacher/stripe/connect";
//       }
//     };

//     refresh();
//   }, [connectStripe]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-muted-foreground">Refreshing your Stripe session...</p>
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StripeRefreshPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/teacher/stripe/connect");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
}
