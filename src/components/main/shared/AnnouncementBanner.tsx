"use client";

import { useGetAnnouncementQuery } from "@/redux/features/announcementApi";
import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const { data } = useGetAnnouncementQuery(undefined);
  const announcement = data?.data;
  //   console.log(announcement, "Announcement ==>");

  if (!announcement?.isEnabled || dismissed) return null;

  return (
    <div className="w-full bg-[#A9F877] text-black py-2 px-5 text-center text-sm font-semibold relative">
      <span className="font-bold mr-2">{announcement.title}:</span>
      <span>{announcement.text}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
