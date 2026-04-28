/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAnnouncementQuery } from "@/redux/features/announcementApi";
import { useGetAllDiscountCodesQuery } from "@/redux/features/discountCodeApi";
import { Copy, Check, Tag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data } = useGetAnnouncementQuery(undefined);
  const announcement = data?.data;

  const { data: codesData } = useGetAllDiscountCodesQuery(undefined);
  const activeCodes = (codesData?.data || []).filter((c: any) => !c.isUsed);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (dismissed) return null;
  if (!announcement?.isEnabled && activeCodes.length === 0) return null;

  return (
    <div className="w-full bg-[#A9F877] text-black py-2 px-10 text-sm font-semibold relative flex items-center justify-center gap-6 flex-wrap">
      {/* Announcement */}
      {announcement?.isEnabled && (
        <span>
          <span className="font-bold mr-2">{announcement.title}:</span>
          <span>{announcement.text}</span>
        </span>
      )}

      {/* Active Discount Codes */}
      {activeCodes.length > 0 && (
        <span className="flex items-center gap-2 flex-wrap">
          <Tag className="w-3.5 h-3.5 shrink-0" />
          {activeCodes.map((c: any) => (
            <span
              key={c._id}
              className="inline-flex items-center gap-1.5 bg-black/10 rounded px-2 py-0.5"
            >
              <code className="font-bold tracking-wider">{c.code}</code>
              <span className="text-xs">{c.discountPercent}% off</span>
              <span className="text-xs opacity-70">· {c.packageId?.name}</span>
              <button
                onClick={() => handleCopy(c.code, c._id)}
                className="ml-1 hover:opacity-70 transition-opacity"
              >
                {copiedId === c._id ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </span>
          ))}
        </span>
      )}

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
