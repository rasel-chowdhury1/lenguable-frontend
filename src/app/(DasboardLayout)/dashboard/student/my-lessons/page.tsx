// "use client";

// import { useState } from "react";
// import lessonsData from "../../../../data/lessons.json";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ActiveSelection, AppData } from "@/types";
// import { SidebarNav } from "./_components/SidebarNav";
// import { MainContent } from "./_components/MainContent";

// export default function MyLessons() {
//   const data: AppData = lessonsData as AppData;
//   const firstModule = data.modules[0];
//   const firstLesson = firstModule.lessons[0];
//   const [active, setActive] = useState<ActiveSelection>({
//     moduleId: firstModule.id,
//     lessonId: firstLesson.id,
//   });

//   return (
//     <div className="max-w-7xl mx-auto my-10">
//       <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-5">
//         My Lessons
//       </h1>
//       <div>
//         {/* Desktop */}
//         <div className="hidden md:flex gap-6 items-start">
//           <aside className="w-80 shrink-0 self-start sticky top-20">
//             <div className="border border-border/60 rounded-md overflow-hidden">
//               <ScrollArea>
//                 <SidebarNav data={data} active={active} onSelect={setActive} />
//               </ScrollArea>
//             </div>
//           </aside>
//           <main className="flex-1 min-w-0">
//             <MainContent active={active} data={data} />
//           </main>
//         </div>
//         {/* Mobile */}
//         <div className="flex flex-col gap-4 md:hidden">
//           <div className="border border-border/60 rounded-md overflow-hidden">
//             <ScrollArea>
//               <SidebarNav data={data} active={active} onSelect={setActive} />
//             </ScrollArea>
//           </div>
//           <MainContent active={active} data={data} />
//         </div>
//       </div>
//     </div>
//   );
// }

const page = () => {
  return (
    <div>
      <h1>This is my lesson !</h1>
    </div>
  );
};

export default page;
