"use client";
import { Button } from "@/components/ui/button";
import img1 from "../../../../public/images/img (4).jpg";
import Image from "next/image";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="mt-40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="bg-gray-200 rounded-3xl h-96 overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-200">
                <Image
                  src={img1}
                  alt="How It Works Image"
                  height={384}
                  width={512}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
            <div className="hidden lg:block absolute lg:-bottom-20 lg:left-36 bg-white rounded-md p-6 shadow-lg border border-gray-100 max-w-xs">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-[#A9F877] hover:bg-[#C1FF72] text-black rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xl">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Guaranteed</p>
                  <p className="text-sm text-gray-600">
                    Connect with Native English Tutors
                  </p>
                </div>
              </div>
              <Link href="/about-us">
                <Button className="w-full text-sm bg-[#A9F877] hover:bg-[#C1FF72] text-black cursor-pointer">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 mb-8">
              Simple steps to start your English learning journey
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4 bg-[#EEFEE4] rounded-md p-4 mr-14">
                <div className="w-12 h-12 bg-[#C1FF72] text-white rounded-md flex items-center justify-center shrink-0 font-bold shadow-black shadow-2xl">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Choose Your Package
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Select the class package that works best for your schedule
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4 bg-[#EEFEE4] rounded-md p-4 ml-14">
                <div className="w-12 h-12 bg-[#C1FF72] text-white rounded-md flex items-center justify-center shrink-0 font-bold shadow-black shadow-2xl">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Book Your Class
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pick a convenient time slot that works for your schedule
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4 bg-[#EEFEE4] rounded-md p-4 mr-14">
                <div className="w-12 h-12 bg-[#C1FF72] text-white rounded-md flex items-center justify-center shrink-0 font-bold shadow-black shadow-2xl">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Start Learning
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Join your virtual classroom and progress through structured
                    lessons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
