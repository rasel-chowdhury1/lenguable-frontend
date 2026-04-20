"use client";
import { Button } from "@/components/ui/button";
import img1 from "../../../../public/images/img (1).jpg";
import img2 from "../../../../public/images/img (2).jpg";
import img3 from "../../../../public/images/img (3).jpg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="lg:py-20 py-10 bg-linear-to-b from-[#EEFEE4] to-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-white rounded-full px-4 py-2 text-sm text-gray-700 border border-gray-200">
              Transforming life through speaking
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connect with Native English Tutors
            </h1>

            <p className="text-lg text-gray-600">
              Structured Courses from A2 to C1 with experienced native English
              teachers and personalized tutoring support.
            </p>

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
              <div className="space-y-4">
                <div className="bg-gray-200 rounded-2xl h-48 overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-200">
                    <Image
                      src={img1}
                      alt="Hero Image 1"
                      height={192}
                      width={256}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">
                      100% Teaching Live
                    </span>
                    <div className="w-10 h-10 bg-[#A9F877] hover:bg-[#C1FF72] text-black rounded-full flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    We matched the student and native English-speaking tutors
                  </p>
                  <Link href="/about-us">
                    <Button className="w-full text-sm bg-[#A9F877] hover:bg-[#C1FF72] text-black cursor-pointer">
                      Learn more
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8">
                <div className="bg-gray-200 rounded-2xl h-72 overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-200">
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
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gray-200 rounded-2xl w-32 h-32 hidden lg:block">
              <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-200 rounded-xl">
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
    </div>
  );
}
