"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Level, NavSection } from "@/app/data/lessonsData";

export type ActiveSection = "how-to-begin" | "core-lessons" | "resources";

interface SidebarProps {
  navSections: NavSection[];
  levels: Level[];
  activeSection: ActiveSection;
  activeLevel: string;
  onLevelChange: (id: string) => void;
  onSectionChange: (section: ActiveSection) => void;
}

export function Sidebar({
  navSections,
  levels,
  activeSection,
  activeLevel,
  onLevelChange,
  onSectionChange,
}: SidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "core-lessons": true,
  });

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-full md:w-56 md:shrink-0 bg-white border border-gray-200 rounded-xl p-4 h-fit">
      <nav className="space-y-1">
        {navSections.map((section) => {
          if (section.type === "link") {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id as ActiveSection)}
                className={cn(
                  "w-full text-left text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-[#b9ff6a] font-semibold text-gray-900"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                {section.label}
              </button>
            );
          }

          if (section.type === "group") {
            const isOpen = !!openGroups[section.id];

            return (
              <div key={section.id}>
                <button
                  onClick={() => {
                    toggleGroup(section.id);
                    onSectionChange(section.id as ActiveSection);
                  }}
                  className="w-full flex items-center justify-between text-sm text-gray-900 font-semibold px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span>{section.label}</span>

                  {section.id === "core-lessons" && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-500 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  )}
                </button>

                {/* Levels ONLY for Core Lessons */}
                {section.id === "core-lessons" && isOpen && (
                  <div className="space-y-0.5 pl-2 mt-1">
                    {levels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => {
                          onSectionChange("core-lessons");
                          onLevelChange(level.id);
                        }}
                        className={cn(
                          "w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                          activeLevel === level.id
                            ? "bg-[#b9ff6a] font-semibold text-gray-900"
                            : "text-gray-600 hover:bg-gray-50",
                        )}
                      >
                        {level.id}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </nav>
    </aside>
  );
}
