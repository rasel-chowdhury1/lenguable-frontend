// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { cn } from "@/lib/utils";
// import { ActiveSelection, AppData } from "@/types";
// import { Check, ChevronDown, Lock, Unlock } from "lucide-react";
// import { useState } from "react";

// export function SidebarNav({
//   data,
//   active,
//   onSelect,
// }: {
//   data: AppData;
//   active: ActiveSelection;
//   onSelect: (sel: ActiveSelection) => void;
// }) {
//   const [openIds, setOpenIds] = useState<string[]>([active.moduleId]);
//   const toggle = (id: string) =>
//     setOpenIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     );

//   return (
//     <div className="flex flex-col">
//       {data.modules.map((mod, index) => {
//         const isLast = index === data.modules.length - 1;
//         const isOpen = openIds.includes(mod.id);

//         return (
//           <Collapsible
//             key={mod.id}
//             open={isOpen}
//             onOpenChange={() => toggle(mod.id)}
//           >
//             <CollapsibleTrigger asChild>
//               <button
//                 className={cn(
//                   "flex items-start gap-3 p-3 w-full text-left transition-colors",
//                   !isLast && "border-b border-border/60",
//                   isOpen ? "bg-muted/30" : "hover:bg-muted/40",
//                 )}
//               >
//                 <ChevronDown
//                   className={cn(
//                     "w-4 h-4 mt-0.5 shrink-0 transition-transform duration-200",
//                     isOpen
//                       ? "rotate-0 text-foreground"
//                       : "-rotate-90 text-muted-foreground",
//                   )}
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-foreground leading-snug">
//                     {mod.label}
//                   </p>
//                 </div>
//               </button>
//             </CollapsibleTrigger>
//             <CollapsibleContent>
//               <div>
//                 {mod.lessons.map((lesson, li) => {
//                   const isLastLesson = li === mod.lessons.length - 1;
//                   const isSelected =
//                     active.moduleId === mod.id && active.lessonId === lesson.id;

//                   return (
//                     <button
//                       key={lesson.id}
//                       onClick={() =>
//                         onSelect({ moduleId: mod.id, lessonId: lesson.id })
//                       }
//                       className={cn(
//                         "w-full text-left pl-10 pr-3 py-3 transition-colors",
//                         !isLastLesson && "border-b border-border/40",
//                         isSelected ? "bg-primary/10" : "hover:bg-muted/40",
//                       )}
//                     >
//                       <p className="text-sm font-medium leading-snug truncate text-foreground">
//                         {lesson.title}
//                       </p>
//                       <p className="text-xs mt-0.5 flex items-center gap-1">
//                         {lesson.status === "completed" ? (
//                           <Check className="h-3 w-3 shrink-0 text-primary" />
//                         ) : lesson.status === "unlocked" ? (
//                           <Unlock className="h-3 w-3 shrink-0 text-muted-foreground" />
//                         ) : (
//                           <Lock className="h-3 w-3 shrink-0 text-muted-foreground" />
//                         )}
//                         <span
//                           className={cn(
//                             "font-medium capitalize",
//                             lesson.status === "completed"
//                               ? "text-primary"
//                               : "text-muted-foreground",
//                           )}
//                         >
//                           {lesson.status}
//                         </span>
//                       </p>
//                       {/* <p className="text-xs mt-0.5 flex items-center gap-1 text-muted-foreground">
//                         <FileText className="h-3 w-3 shrink-0" />
//                         <span>Practice Exercises: </span>
//                         <span
//                           className={cn(
//                             lesson.practiceAvailable
//                               ? "text-foreground"
//                               : "text-muted-foreground",
//                           )}
//                         >
//                           {lesson.practiceAvailable
//                             ? "Available"
//                             : "Unavailable"}
//                         </span>
//                       </p> */}
//                     </button>
//                   );
//                 })}
//               </div>
//             </CollapsibleContent>
//           </Collapsible>
//         );
//       })}
//     </div>
//   );
// }
