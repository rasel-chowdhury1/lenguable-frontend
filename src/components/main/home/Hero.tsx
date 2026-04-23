"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useGetHeroQuery } from "@/redux/features/heroApi";

const FALLBACK_IMAGES = [
  "/images/img (1).jpg",
  "/images/img (2).jpg",
  "/images/img (3).jpg",
];

export default function Hero() {
  const { data, isLoading } = useGetHeroQuery(undefined);
  const hero = data?.data;

  const badge = hero?.badge || "Transforming life through speaking";
  const title = hero?.title || "Connect with Native English Tutors";
  const description =
    hero?.description ||
    "Structured Courses from A2 to C1 with experienced native English teachers and personalized tutoring support.";
  const cardTitle = hero?.cardTitle || "100% Teaching Live";
  const cardDescription =
    hero?.cardDescription ||
    "We matched the student and native English-speaking tutors";

  const img1 = hero?.images?.[0] || FALLBACK_IMAGES[0];
  const img2 = hero?.images?.[1] || FALLBACK_IMAGES[1];
  const img3 = hero?.images?.[2] || FALLBACK_IMAGES[2];

  if (isLoading) {
    return (
      <div className="lg:py-20 py-10 bg-linear-to-b from-[#EEFEE4] to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center animate-pulse">
            <div className="space-y-6">
              <div className="h-8 w-48 bg-gray-200 rounded-full" />
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded-xl w-full" />
                <div className="h-12 bg-gray-200 rounded-xl w-4/5" />
                <div className="h-12 bg-gray-200 rounded-xl w-3/5" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
              <div className="flex gap-4">
                <div className="h-11 w-32 bg-gray-200 rounded-lg" />
                <div className="h-11 w-32 bg-gray-200 rounded-lg" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 bg-gray-200 rounded-2xl" />
                <div className="h-40 bg-gray-200 rounded-2xl" />
              </div>
              <div className="mt-8">
                <div className="h-72 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:py-20 py-10 bg-linear-to-b from-[#EEFEE4] to-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block bg-white rounded-full px-4 py-2 text-sm text-gray-700 border border-gray-200">
              {badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>

            <p className="text-lg text-gray-600">{description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#pricing">
                <Button
                  size="lg"
                  className="bg-[#A9F877] hover:bg-[#C1FF72] text-black cursor-pointer"
                >
                  Book Now
                </Button>
              </Link>
              <Link href="/about-us">
                <Button variant="outline" size="lg" className="cursor-pointer">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                <div className="bg-gray-200 rounded-2xl h-48 overflow-hidden">
                  <Image
                    src={img1}
                    alt="Hero Image 1"
                    height={192}
                    width={256}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">
                      {cardTitle}
                    </span>
                    <div className="w-10 h-10 bg-[#A9F877] hover:bg-[#C1FF72] text-black rounded-full flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {cardDescription}
                  </p>
                  <Link href="/about-us">
                    <Button className="w-full text-sm bg-[#A9F877] hover:bg-[#C1FF72] text-black cursor-pointer">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right column */}
              <div className="mt-8">
                <div className="bg-gray-200 rounded-2xl h-72 overflow-hidden">
                  <Image
                    src={img2}
                    alt="Hero Image 2"
                    height={288}
                    width={384}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Image 3 - absolute */}
            <div className="absolute -bottom-6 -right-6 bg-gray-200 rounded-2xl w-32 h-32 hidden lg:block overflow-hidden">
              <Image
                src={img3}
                alt="Hero Image 3"
                height={128}
                width={128}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
