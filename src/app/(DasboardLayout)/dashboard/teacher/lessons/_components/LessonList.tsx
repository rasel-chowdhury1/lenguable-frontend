import { Lesson } from "@/app/data/lessonsData";
import { LessonCard } from "./LessonCard";

interface LessonListProps {
  title: string;
  lessons: Lesson[];
}

export function LessonList({ title, lessons }: LessonListProps) {
  return (
    <main className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-5">{title}</h2>
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </main>
  );
}
