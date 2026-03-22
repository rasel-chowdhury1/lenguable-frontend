/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useCreateReviewMutation } from "@/redux/features/reviewApi";
import { toast } from "sonner";

interface LeaveReviewModalProps {
  open: boolean;
  onClose: () => void;
  teacherId: string;
}

export const LeaveReviewModal = ({
  open,
  onClose,
  teacherId,
}: LeaveReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleClose = () => {
    setRating(0);
    setHovered(0);
    setComment("");
    onClose();
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    try {
      await createReview({ teacherId, rating, comment }).unwrap();
      toast.success("Review submitted successfully!");
      handleClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Leave a Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Star Rating */}
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= (hovered || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">Comment</p>
            <Textarea
              placeholder="Write about your experience with this teacher..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-[#A9F877] text-gray-900 hover:bg-[#94e062]"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
