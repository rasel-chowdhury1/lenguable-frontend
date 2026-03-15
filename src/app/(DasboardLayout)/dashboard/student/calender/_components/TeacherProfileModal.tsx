"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Teacher = {
  name: string;
  initials: string;
  rating: number;
  country: string;
  experience: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

export default function TeacherProfileModal({ open, onClose, teacher }: Props) {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* BODY */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback>{teacher.initials}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-medium">{teacher.name}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {teacher.rating}
                <span className="text-muted-foreground">
                  • {teacher.experience}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Nationality</p>
            <p className="text-sm text-muted-foreground">{teacher.country}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Spoken Languages</p>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                English
              </span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                Spanish
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">Interests</p>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100">
                Travel
              </span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100">
                Sports
              </span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100">
                Music
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">About</p>
            <p className="text-sm text-muted-foreground">
              Experienced English teacher passionate about helping Spanish
              speakers achieve fluency.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 p-5 pt-0">
          <Button className="flex-1 bg-[#A9F877] hover:bg-[#C1FF72] text-black">
            Book Class
          </Button>
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
