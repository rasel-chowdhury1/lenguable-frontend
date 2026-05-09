"use client";

import Image from "next/image";
import { useGetAllOurStoryQuery } from "@/redux/features/ourStoryApi";

export default function OurStory() {
  const { data, isLoading } = useGetAllOurStoryQuery(undefined);

  const story = data?.data?.[0];

  if (isLoading) {
    return null;
  }

  return (
    <section className="relative bg-[#EEFEE4] pt-12 md:pt-20 px-4 sm:px-6 overflow-hidden mt-12 md:mt-20">
      <div className="relative max-w-2xl mx-auto">
        {/* Heading */}
        <h2
          className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-10 tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {story?.sectionTitle || "Our Story"}
        </h2>

        {/* Paragraphs */}
        <div className="space-y-5 md:space-y-7 text-center text-gray-700 leading-relaxed text-sm md:text-[15px]">
          {story?.paragraphs?.map((paragraph: string, index: number) => (
            <p key={index} className="text-center">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom row: photo + signature */}
        <div className="mt-10 md:mt-14 flex items-end justify-between gap-4">
          {/* Founders photo */}
          <div className="relative w-32 h-28 sm:w-44 sm:h-36 md:w-60 md:h-44 shrink-0">
            {story?.founderImage && (
              <Image
                src={story.founderImage}
                alt={story.signature || "Founder"}
                fill
                className="object-contain object-bottom"
              />
            )}
          </div>

          {/* Signature */}
          <p
            className="text-3xl sm:text-5xl md:text-7xl text-gray-900 text-right"
            style={{ fontFamily: "'Stalemate', cursive" }}
          >
            {story?.signature}
          </p>
        </div>
      </div>
    </section>
  );
}
