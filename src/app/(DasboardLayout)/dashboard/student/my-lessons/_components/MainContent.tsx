// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { ActiveSelection, AppData } from "@/types";
// import { LessonCard } from "./LessonCard";

// export function MainContent({ active, data }: { active: ActiveSelection; data: AppData }) {
//   const mod = data.modules.find((m) => m.id === active.moduleId);
//   const lesson = mod?.lessons.find((l) => l.id === active.lessonId);
//   if (!mod || !lesson) return null;
//   return (
//     <Card className="shadow-none border border-border/60">
//       <CardContent>
//         {/* <div className="flex items-center gap-2 flex-wrap mb-6">
//           <Badge variant="outline" className="text-xs font-semibold">
//             {mod.id.toUpperCase()}
//           </Badge>
//           <h2 className="text-base font-semibold text-foreground">{mod.fullLabel}</h2>
//           <span className="text-xs text-muted-foreground ml-auto">
//             {mod.completedCount}/{mod.totalCount} Completed
//           </span>
//         </div> */}
//         <LessonCard lesson={lesson} moduleLabel={mod.fullLabel} />
//       </CardContent>
//     </Card>
//   );
// }
