import { BookOpen, Calendar, Award, User } from "lucide-react";

const WhatYouGet = () => {
  const offerings = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Native English Tutors",
      description: "Learn from certified native English speakers",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Structured Curriculum (A2-C1)",
      description: "Comprehensive course from beginner to advanced",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Book classes at your convenience",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Practice Resources",
      description: "Access exclusive learning materials",
    },
  ];
  return (
    <div className="mt-40">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What You Get
          </h2>
          <p className="text-gray-600">
            Expert tutors, flexible classes, and a clear learning path
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((item, index) => (
            <div key={index} className="text-center">
              <div
                className="w-16 h-16 bg-linear-to-b from-[#A9F877] to-[#C1FF72] shadow-black shadow-2xl rounded-lg flex items-center justify-center mx-auto mb-4 text-white"
              >
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatYouGet;
