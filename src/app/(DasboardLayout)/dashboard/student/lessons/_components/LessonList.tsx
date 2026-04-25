import { LessonCard } from "./LessonCard";

interface IApiLesson {
  _id: string;
  title: string;
  level: string;
  file: string; 
  exercises: string;
  isLock: boolean;
}

interface LessonListProps {
  title: string;
  lessons: IApiLesson[];
  isLoading: boolean;
}

export function LessonList({ title, lessons, isLoading }: LessonListProps) {
  return (
    <main className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-5">{title}</h2>

      {isLoading ? (
        <div className="text-sm text-gray-400">Loading lessons...</div>
      ) : lessons.length === 0 ? (
        <div className="text-sm text-gray-400">
          No lessons available for this level.
        </div>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      )}
    </main>
  );
}