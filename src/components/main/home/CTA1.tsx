"use client";

import Image from "next/image";
import { useGetCTAQuery } from "@/redux/features/ctaApi";

const CTA1 = () => {
  const { data, isLoading } = useGetCTAQuery(undefined);

  const cta = data?.data;

  // loading state
  if (isLoading) {
    return (
      <div className="mt-40 flex justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // empty state
  if (!cta) {
    return null;
  }

  return (
    <div className="mt-40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* badge */}
            <div className="inline-block bg-white rounded-full px-4 py-2 text-sm text-gray-700 border border-gray-200 mb-5">
              {cta.badgeText}
            </div>

            {/* title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {cta.title}
            </h2>

            {/* description */}
            <p className="text-gray-700">{cta.description}</p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="bg-gray-200 rounded-lg h-96 overflow-hidden relative">
            <Image
              src={cta.image}
              alt="CTA Image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA1;
