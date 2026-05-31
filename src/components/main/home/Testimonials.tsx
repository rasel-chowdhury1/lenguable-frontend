/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllReviewsQuery } from "@/redux/features/reviewApi";
import Image from "next/image";
import { useGetAllStudentsQuery } from "@/redux/features/studentApi";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const { data, isLoading, isError } = useGetAllReviewsQuery(undefined);
  const { data: studentsData } = useGetAllStudentsQuery(undefined);
  const studentCount = studentsData?.data?.length ?? 0;
  const reviews = data?.data || [];

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto mt-40">
        <div className="text-center text-muted-foreground">
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (isError || reviews.length === 0) {
    return (
      <section className="max-w-7xl mx-auto mt-40">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-[#A9F877]">{studentCount}</span>{" "}
            Students
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Highly rated by learners worldwide for quality teaching and real
            progress.
          </p>
        </div>
        <div className="text-center text-muted-foreground py-10">
          No reviews yet.
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-40">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Trusted by <span className="text-[#A9F877]">{studentCount}</span>{" "}
          Students
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Highly rated by learners worldwide for quality teaching and real
          progress.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {reviews.map((review: any) => (
            <div key={review._id} className="min-w-full">
              <Card className="text-foreground border-none">
                <CardContent className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
                  {/* Avatar */}
                  <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    {review.studentId?.profileImage ? (
                      <Image
                        src={review.studentId.profileImage}
                        alt={review.studentId?.name || "Student"}
                        height={600}
                        width={400}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="w-24 h-24 text-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {/* {Array.from({ length: review.rating }).map(
                        (_: any, i: number) => (
                          <Star
                            key={i}
                            className="w-6 h-6 text-[#A9F877] fill-[#A9F877]"
                          />
                        ),
                      )} */}

                      {Array.from({ length: 5 }).map((_: any, i: number) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${i < review.rating ? "text-[#A9F877] fill-[#A9F877]" : "text-gray-200 fill-gray-200"}`}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>

                    {/* Author */}
                    <div>
                      <h4 className="text-2xl font-semibold text-foreground">
                        {review.studentId?.name || "Anonymous"}
                      </h4>
                      <p className="text-sm text-muted-foreground">Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-5">
        <Button
          size="icon"
          className="bg-[#A9F877] hover:bg-[#C1FF72] text-black"
          onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
          disabled={current === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          size="icon"
          className="bg-[#A9F877] hover:bg-[#C1FF72] text-black"
          onClick={() => setCurrent((p) => Math.min(p + 1, reviews.length - 1))}
          disabled={current === reviews.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
}
