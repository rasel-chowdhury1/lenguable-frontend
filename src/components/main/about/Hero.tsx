"use client";
import Image from "next/image";
import img from "../../../../public/images/img (5).jpg";

export default function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="mb-10">
        <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 leading-tight text-center">
          Building Confidence Through <br />
          Structured English Learning
        </h2>

        <p className="mt-8 text-gray-600 leading-relaxed lg:text-center text-justify">
          We are dedicated to helping learners achieve real confidence in
          English through structured courses and expert guidance. Our platform
          connects passionate students with experienced native-level teachers
          who focus on practical communication, fluency, and real-world skills.
          With a step-by-step curriculum from beginner to advanced levels, we
          ensure every learner progresses with clarity and purpose. Our goal is
          not just to teach English but to build confidence, open global
          opportunities, and create lasting success.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div className="mt-10 space-y-8">
          <div>
            <h3 className="text-4xl font-bold text-[#A9F877]">30+</h3>
            <p className="mt-1 font-semibold text-gray-900">Expert Tutors</p>
            <p className="mt-1 text-sm text-gray-600 max-w-sm">
              Carefully selected, highly qualified instructors committed to your
              growth.
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#A9F877]">100+</h3>
            <p className="mt-1 font-semibold text-gray-900">
              Structured Lessons
            </p>
            <p className="mt-1 text-sm text-gray-600 max-w-sm">
              Well-designed lessons that build skills step by step.
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#A9F877]">1M+</h3>
            <p className="mt-1 font-semibold text-gray-900">
              Learning Hours Delivered
            </p>
            <p className="mt-1 text-sm text-gray-600 max-w-sm">
              Proven impact through consistent, high-quality teaching
              experience.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={img}
              alt="English learning session"
              width={600}
              height={520}
              className="w-full h-[50vh] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
