/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useGetAllAboutQuery } from "@/redux/features/aboutApi";

export default function Hero() {
  const { data, isLoading } = useGetAllAboutQuery(undefined);
  const about = data?.data?.[0];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-5 mt-20 animate-pulse">
        <div className="mb-10 space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="mt-10 space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-200 rounded w-64" />
              </div>
            ))}
          </div>
          <div className="h-[50vh] bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!about) return null;

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="mb-10">
        <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 leading-tight text-center">
          {about.title}
        </h2>

        <p className="mt-8 text-gray-600 leading-relaxed lg:text-center text-justify">
          {about.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT — stats */}
        <div className="mt-10 space-y-8">
          {about.stats?.map((stat: any, i: number) => (
            <div key={i}>
              <h3 className="text-4xl font-bold text-[#A9F877]">
                {stat.value}
              </h3>
              <p className="mt-1 font-semibold text-gray-900">{stat.label}</p>
              <p className="mt-1 text-sm text-gray-600 max-w-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={about.image}
              alt={about.title}
              width={600}
              height={520}
              className="w-full h-[50vh] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
