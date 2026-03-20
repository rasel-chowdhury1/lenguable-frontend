/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ActiveSection, Sidebar } from "./_components/Sidebar";
import { levels, navSections } from "@/app/data/lessonsData";
import { HowToBegin } from "./_components/HowToBegin";
import { LessonList } from "./_components/LessonList";
import { ResourcePanel } from "./_components/ResourcePanel";
import { useGetMyLessonsQuery } from "@/redux/features/noteApi"; // ← only change
import { useGetAllResourcesQuery } from "@/redux/features/resourceApi";

export default function MyLessonsPage() {
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("how-to-begin");

  const [activeLevel, setActiveLevel] = useState("");

  // ← only change: was useGetAllLessonsQuery from LessonApi
  const { data, isLoading } = useGetMyLessonsQuery(undefined);
  const apiLessons = data?.data || [];

  // Resources API
  const { data: resourceData, isLoading: resourceLoading } =
    useGetAllResourcesQuery(undefined);

  const apiResources = resourceData?.data || [];

  // console.log(apiResources, "Resources ==>");

  const filteredLessons = apiLessons.filter(
    (l: any) => l.level === activeLevel,
  );

  const activeLevelLabel =
    levels.find((l) => l.id === activeLevel)?.label ?? activeLevel;

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
        <ResourcePanel resources={apiResources} isLoading={resourceLoading} />
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
          onLevelChange={setActiveLevel}
          onSectionChange={setActiveSection}
        />

        <div className="w-full min-w-0">{mainContent}</div>
      </div>
    </div>
  );
}
