"use client";

import { ExternalLink, Headphones, BookOpen, Brain } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ResourceItem,
  ResourceLevel,
  ResourceTab,
} from "@/app/data/lessonsData";

interface ResourcePanelProps {
  resourceLevel: ResourceLevel;
  levelLabel: string;
}

const tabs: { id: ResourceTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "listening-guide",
    label: "Listening Guide",
    icon: <Headphones className="h-4 w-4 shrink-0" />,
  },
  {
    id: "external-activities",
    label: "External Activities",
    icon: <BookOpen className="h-4 w-4 shrink-0" />,
  },
  {
    id: "flashcards",
    label: "Flashcards",
    icon: <Brain className="h-4 w-4 shrink-0" />,
  },
];

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-5"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
          {item.description}
        </p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 mt-0.5 text-gray-600" />
    </a>
  );
}

export function ResourcePanel({
  resourceLevel,
  levelLabel,
}: ResourcePanelProps) {
  return (
    <main className="flex-1 bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-5">
        {levelLabel} – Resources
      </h2>

      <Tabs defaultValue="listening-guide">
        {/* Tabs scroll horizontally on very small screens */}
        <TabsList className="mb-5 bg-gray-100 p-1 rounded-lg w-full flex overflow-x-auto sm:overflow-visible">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium rounded-md px-2.5 py-1.5 transition-all whitespace-nowrap flex-1",
                "data-[state=active]:bg-[#A9F877] data-[state=active]:text-gray-900 data-[state=active]:shadow-none",
                "data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700",
              )}
            >
              {tab.icon}
              <span className="hidden xs:inline sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="listening-guide" className="space-y-3 mt-0">
          {resourceLevel.listeningGuide.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </TabsContent>

        <TabsContent value="external-activities" className="space-y-3 mt-0">
          {resourceLevel.externalActivities.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-3 mt-0">
          {resourceLevel.flashcards.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </TabsContent>
      </Tabs>
    </main>
  );
}