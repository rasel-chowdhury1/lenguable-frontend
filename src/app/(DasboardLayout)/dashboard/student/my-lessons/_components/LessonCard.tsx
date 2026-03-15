// "use client";
// import { Lesson } from "@/types";
// import { FileText } from "lucide-react";
// import Image from "next/image";

// export function LessonCard({
//   lesson,
// }: {
//   lesson: Lesson;
//   moduleLabel: string;
// }) {
//   return (
//     <div>
//       {/* Lesson image */}
//       {lesson.image && (
//         <Image
//           src={lesson.image}
//           alt={lesson.title}
//           height={400}
//           width={600}
//           className="w-full max-h-150 object-cover rounded-md"
//         />
//       )}

//       {/* Resources */}
//       {lesson.resources && lesson.resources.length > 0 && (
//         <div className="mt-5">
//           <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1 border-b pb-5">
//             <FileText className="h-3 w-3 shrink-0" /> Resources:
//           </p>
//           <ul className="list-disc list-inside text-xs text-foreground mt-5">
//             {lesson.resources.map((res, i) => (
//               <li key={i}>{res}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
