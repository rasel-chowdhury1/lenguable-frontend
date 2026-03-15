/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ActiveSection, Sidebar } from "./_components/Sidebar";
import { levels, navSections, resources } from "@/app/data/lessonsData";
import { HowToBegin } from "./_components/HowToBegin";
import { LessonList } from "./_components/LessonList";
import { ResourcePanel } from "./_components/ResourcePanel";
import { useGetAllLessonsQuery } from "@/redux/features/LessonApi";

export default function MyLessonsPage() {
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("how-to-begin");
  const [activeLevel, setActiveLevel] = useState("A1");
  const [activeResourceLevel, setActiveResourceLevel] = useState("A1");

  const { data, isLoading } = useGetAllLessonsQuery(undefined);
  const apiLessons = data?.data || [];

  // Filter API lessons by selected level
  const filteredLessons = apiLessons.filter(
    (l: any) => l.level === activeLevel,
  );

  const activeLevelLabel =
    levels.find((l) => l.id === activeLevel)?.label ?? activeLevel;

  const activeResourceData = resources.find(
    (r) => r.levelId === activeResourceLevel,
  )!;

  const activeResourceLabel =
    levels.find((l) => l.id === activeResourceLevel)?.label ??
    activeResourceLevel;

  const mainContent = (
    <>
      {activeSection === "how-to-begin" && <HowToBegin />}
      {activeSection === "core-lessons" && (
        <LessonList
          title={activeLevelLabel}
          lessons={filteredLessons}
          isLoading={isLoading}
        />
      )}
      {activeSection === "resources" && (
        <ResourcePanel
          resourceLevel={activeResourceData}
          levelLabel={activeResourceLabel}
        />
      )}
    </>
  );

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-5">My Lessons</h1>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        <Sidebar
          navSections={navSections}
          levels={levels}
          activeSection={activeSection}
          activeLevel={activeLevel}
          activeResourceLevel={activeResourceLevel}
          onLevelChange={setActiveLevel}
          onResourceLevelChange={setActiveResourceLevel}
          onSectionChange={setActiveSection}
        />

        <div className="w-full min-w-0">{mainContent}</div>
      </div>
    </div>
  );
}