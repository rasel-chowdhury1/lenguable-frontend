"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useGetAllHowItWorksQuery } from "@/redux/features/workApi";

interface IStep {
  title: string;
  description: string;
}

interface IHowItWorksData {
  _id: string;
  sectionTitle: string;
  sectionSubtitle: string;
  image: string;
  badge: {
    label: string;
    tagline: string;
  };
  steps: IStep[];
}

export default function HowItWorks() {
  const { data, isLoading } = useGetAllHowItWorksQuery(undefined);

  const section: IHowItWorksData = data?.data?.[0];

  if (isLoading) {
    return (
      <div className="mt-40 flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!section) return null;

  return (
    <div className="mt-40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="bg-gray-200 rounded-3xl h-96 overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-200">
                <Image
                  src={section.image}
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
                  <p className="font-semibold text-gray-900 mb-1">
                    {section.badge?.label}
                  </p>
                  <p className="text-sm text-gray-600">
                    {section.badge?.tagline}
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
              {section.sectionTitle}
            </h2>
            <p className="text-gray-600 mb-8">{section.sectionSubtitle}</p>

            <div className="space-y-6">
              {section.steps?.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 bg-[#EEFEE4] rounded-md p-4 ${
                    index % 2 === 0 ? "mr-14" : "ml-14"
                  }`}
                >
                  <div className="w-12 h-12 bg-[#C1FF72] text-white rounded-md flex items-center justify-center shrink-0 font-bold shadow-black shadow-2xl">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
