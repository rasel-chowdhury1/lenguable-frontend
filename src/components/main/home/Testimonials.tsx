"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import img1 from "../../../../public/images/img (1).jpg";
import img2 from "../../../../public/images/img (2).jpg";
import img3 from "../../../../public/images/img (3).jpg";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: StaticImageData;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Isabella Torres",
    role: "University Student",
    image: img1,
    rating: 5,
    text: "The Course Structure Keeps Me Motivated And Consistent. I Can Clearly Track My Improvement Week By Week. The Course Structure Keeps Me Motivated And Consistent. I Can Clearly Track My Improvement Week By Week.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Professional Student",
    image: img2,
    rating: 5,
    text: "The personalized feedback and interactive lessons make learning feel natural and fun. My confidence has grown tremendously! The Course Structure Keeps Me Motivated And Consistent. I Can Clearly Track My Improvement Week By Week.",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Graduate Student",
    image: img3,
    rating: 5,
    text: "I've achieved more in three months here than I did in a year elsewhere. Highly recommend! The Course Structure Keeps Me Motivated And Consistent. I Can Clearly Track My Improvement Week By Week.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="max-w-7xl mx-auto mt-40">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Trusted by <span className="text-[#A9F877]">1,000+</span> Students
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
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-full">
              {/* IMPORTANT: text reset */}
              <Card className="text-foreground border-none">
                <CardContent className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
                  {/* Image */}
                  <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    {/* Stars (ONLY primary) */}
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-[#A9F877] fill-[#A9F877]"
                        />
                      ))}
                    </div>

                    {/* Text (NORMAL color) */}
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t.text}
                    </p>

                    {/* Author */}
                    <div>
                      <h4 className="text-2xl font-semibold text-foreground">
                        {t.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (ONLY primary) */}
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
          onClick={() =>
            setCurrent((p) => Math.min(p + 1, testimonials.length - 1))
          }
          disabled={current === testimonials.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
}
