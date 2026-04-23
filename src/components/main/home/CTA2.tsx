"use client";

import { useGetCTA2Query } from "@/redux/features/cta2Api";

const CTA2 = () => {
  const { data, isLoading } = useGetCTA2Query(undefined);

  const cta = Array.isArray(data?.data) ? data.data[0] : data?.data;

  if (isLoading) {
    return (
      <div className="mt-40 py-20 bg-[#EEFEE4] text-center">Loading...</div>
    );
  }

  if (!cta) return null;

  return (
    <div className="mt-40 py-20 bg-[#EEFEE4]">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {cta.title}
        </h2>

        <p className="text-gray-600">{cta.description}</p>
      </div>
    </div>
  );
};

export default CTA2;
