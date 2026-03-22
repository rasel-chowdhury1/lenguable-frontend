// export default function PaymentSuccess() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#EEFEE4]">
//       <div className="text-center">
//         <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#A9F877] flex items-center justify-center">
//           <svg
//             className="w-8 h-8 text-white"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Payment Successful!
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Your credits have been added to your account.
//         </p>
//         <a
//           href="/dashboard/student/lessons"
//           className="bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold px-6 py-2 rounded-lg"
//         >
//           Go to Dashboard
//         </a>
//       </div>
//     </div>
//   );
// }

"use client";
import { useVerifySessionQuery } from "@/redux/features/purchaseApi";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { isLoading } = useVerifySessionQuery(sessionId!, {
    skip: !sessionId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEFEE4]">
      <div className="text-center">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your credits have been added to your account.
        </p>
        {/* <a
          href="/dashboard/student/lessons"
          className="bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold px-6 py-2 rounded-lg"
        >
          Go to Dashboard
        </a> */}
      </div>
    </div>
  );
}
