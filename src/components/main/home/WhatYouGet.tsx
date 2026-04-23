"use client";

import { BookOpen, Calendar, Award, User, Loader2 } from "lucide-react";
import { useGetAllWhatYouGetQuery } from "@/redux/features/whatYouGetApi";
import type { LucideIcon } from "lucide-react";

type IconName = "User" | "BookOpen" | "Calendar" | "Award";

const iconMap: Record<IconName, LucideIcon> = {
  User,
  BookOpen,
  Calendar,
  Award,
};

interface IOffering {
  icon: IconName;
  title: string;
  description: string;
}

interface IWhatYouGetData {
  _id: string;
  sectionTitle: string;
  sectionSubtitle: string;
  offerings: IOffering[];
}

const WhatYouGet = () => {
  const { data, isLoading } = useGetAllWhatYouGetQuery(undefined);

  const section: IWhatYouGetData = data?.data?.[0];

  if (isLoading) {
    return (
      <div className="mt-40 flex items-center justify-center h-60">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!section) return null;

  return (
    <div className="mt-40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {section.sectionTitle}
          </h2>
          <p className="text-gray-600">{section.sectionSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {section.offerings?.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-linear-to-b from-[#A9F877] to-[#C1FF72] shadow-black shadow-2xl rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {Icon && <Icon className="w-8 h-8" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatYouGet;
