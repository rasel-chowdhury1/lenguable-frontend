import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEFEE4]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          No charges were made to your account.
        </p>
        <Link
          href="/#pricing"
          className="bg-[#A9F877] hover:bg-[#C1FF72] text-gray-900 font-semibold px-6 py-2 rounded-lg"
        >
          Back to Pricing
        </Link>
      </div>
    </div>
  );
}
