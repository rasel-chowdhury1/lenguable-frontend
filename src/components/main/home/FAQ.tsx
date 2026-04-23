/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useGetAllFAQQuery } from "@/redux/features/faqApi";

export default function FAQ() {
  const { data } = useGetAllFAQQuery(undefined);
  const faqData = data?.data?.[0];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mt-40">
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-bold">{faqData?.sectionTitle}</h2>
          <p className="text-gray-600 mt-2">{faqData?.sectionSubtitle}</p>
        </div>

        {/* RIGHT */}
        <div className="space-y-3">
          {faqData?.faqs?.map((item: any, index: number) => (
            <div key={index} className="bg-[#EEFEE4] rounded-lg">
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between"
              >
                <span className="font-medium">{item.question}</span>
                <Plus
                  className={`transition ${open === index ? "rotate-45" : ""}`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-4 text-sm text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
