/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "./ui/sidebar";
// import { Button } from "./ui/button";
// import { Badge } from "@/components/ui/badge";
// import { LogOut, CreditCard, CalendarPlus, LogIn } from "lucide-react";
// import { useGetMeQuery } from "@/redux/features/userApi";
// import { useLogoutMutation } from "@/redux/features/authApi";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import Link from "next/link";
// import GoogleTranslate from "./main/shared/GoogleTranslate";
// import { baseApi } from "@/redux/api/baseApi";
// import { store } from "@/redux/store";

// const AppHeader = () => {
//   const router = useRouter();
//   const { data } = useGetMeQuery(undefined);
//   const [logout] = useLogoutMutation();
//   const user = data?.data;

//   const handleLogout = async () => {
//     try {
//       const res = await logout(undefined).unwrap();
//       toast.success(res?.message || "User logout successfully!");
//       store.dispatch(baseApi.util.resetApiState());
//       router.push("/");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Logout failed!");
//     }
//   };

//   return (
//     <div className="flex h-16 shrink-0 items-center border-b bg-sidebar sticky top-0 z-50">
//       <div className="flex w-full items-center justify-between">
//         {/* LEFT */}
//         <div className="flex items-center gap-2 px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator orientation="vertical" className="mr-2 h-4" />
//         </div>

//         {/* RIGHT — notranslate prevents Google Translate from mutating
//             interactive elements and breaking React event handlers */}
//         <div className="flex items-center gap-2 px-4 notranslate">
//           {/* Credits & Book a Class (Student only) */}
//           {user?.role === "STUDENT" && (
//             <>
//               <Link href="/#pricing">
//                 <Button
//                   size="sm"
//                   className="gap-2 bg-[#A9F877] hover:bg-[#C1FF72] text-black"
//                 >
//                   <CreditCard className="h-4 w-4 shrink-0" />
//                   <span className="hidden sm:inline">
//                     {user?.student?.credits} Credit Class
//                   </span>
//                 </Button>
//               </Link>

//               <Link href="/dashboard/student/calender" passHref>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="gap-2 bg-sidebar cursor-pointer"
//                 >
//                   <CalendarPlus className="h-4 w-4 shrink-0 sm:hidden inline" />
//                   <span className="hidden sm:inline">Book a Class</span>
//                 </Button>
//               </Link>
//             </>
//           )}

//           {/* Stripe Connect (Teacher only) */}
//           {user?.role === "TEACHER" && (
//             <>
//               {!user?.teacher?.stripeOnboarded ? (
//                 <Link href="/dashboard/teacher/stripe/connect">
//                   <Button
//                     size="sm"
//                     className="gap-2 bg-[#A9F877] hover:bg-[#C1FF72] text-black"
//                   >
//                     Connect Stripe
//                   </Button>
//                 </Link>
//               ) : (
//                 <Badge className="bg-[#A9F877] px-3 py-1 text-xs text-black">
//                   Stripe Connected
//                 </Badge>
//               )}
//             </>
//           )}

//           {/* Language Selector */}
//           <div className="hidden md:block">
//             <GoogleTranslate />
//           </div>

//           {/* Login / Logout */}
//           {user ? (
//             <Button
//               onClick={handleLogout}
//               size="sm"
//               className="gap-2 bg-sidebar text-black hover:bg-sidebar hover:cursor-pointer"
//             >
//               <LogOut className="h-4 w-4" />
//               Logout
//             </Button>
//           ) : (
//             <Button
//               onClick={() => router.push("/")}
//               size="sm"
//               className="gap-2 bg-sidebar text-black hover:bg-sidebar hover:cursor-pointer"
//             >
//               <LogIn className="h-4 w-4" />
//               Login
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppHeader;

"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  CreditCard,
  CalendarPlus,
  LogIn,
  MoreVertical,
  X,
  Languages,
} from "lucide-react";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useLogoutMutation } from "@/redux/features/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import GoogleTranslate from "./main/shared/GoogleTranslate";
import { baseApi } from "@/redux/api/baseApi";
import { store } from "@/redux/store";

const AppHeader = () => {
  const router = useRouter();
  const { data } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = data?.data;

  const handleLogout = async () => {
    try {
      const res = await logout(undefined).unwrap();
      toast.success(res?.message || "User logout successfully!");
      store.dispatch(baseApi.util.resetApiState());
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Logout failed!");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-sidebar border-b notranslate">
      {/* Main bar */}
      <div className="flex h-16 items-center justify-between px-4">
        {/* LEFT — sidebar trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <SidebarTrigger className="-ml-1 hover:cursor-pointer" />
          <Separator orientation="vertical" className="h-4" />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* ── STUDENT ── */}
          {user?.role === "STUDENT" && (
            <>
              {/* Credits — always visible, label shrinks on mobile */}
              <Link href="/#pricing">
                <Button
                  size="sm"
                  className="gap-2 bg-[#A9F877] hover:bg-[#C1FF72] text-black hover:cursor-pointer"
                >
                  <CreditCard className="hidden md:block h-4 w-4 shrink-0" />
                  <span className="hidden md:block">
                    {user?.student?.credits} Credit
                  </span>
                  <span className="md:hidden block">
                    {user?.student?.credits}
                  </span>
                </Button>
              </Link>

              {/* Book a Class — icon-only on mobile, full label on sm+ */}
              <Link href="/dashboard/student/calender" passHref>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-sidebar hover:cursor-pointer"
                >
                  <CalendarPlus className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Book Class</span>
                </Button>
              </Link>
            </>
          )}

          {/* ── TEACHER ── */}
          {user?.role === "TEACHER" && (
            <>
              {!user?.teacher?.stripeOnboarded ? (
                <Link href="/dashboard/teacher/stripe/connect">
                  <Button
                    size="sm"
                    className="gap-2 bg-[#A9F877] hover:bg-[#C1FF72] text-black hover:cursor-pointer"
                  >
                    <span className="hidden sm:inline">Connect </span>Stripe
                  </Button>
                </Link>
              ) : (
                <Badge className="bg-[#A9F877] px-3 py-1 text-xs text-black hidden sm:inline-flex">
                  Stripe Connected
                </Badge>
              )}
            </>
          )}

          {/* Google Translate — hidden on mobile, shown via mobile menu */}
          <div className="hidden md:block">
            <GoogleTranslate />
          </div>

          {/* Login / Logout — icon-only on mobile */}
          {user ? (
            <Button
              onClick={handleLogout}
              size="sm"
              variant="outline"
              className="gap-2 bg-sidebar text-black cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/")}
              size="sm"
              className="gap-2 bg-sidebar text-black cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}

          {/* Mobile overflow menu toggle — visible only on mobile */}
          <Button
            size="sm"
            variant="outline"
            className="md:hidden bg-sidebar"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="More options"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              // <MoreVertical className="h-4 w-4" />
              <Languages className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile expanded menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-sidebar px-4 py-3 flex flex-col gap-2">
          {/* Language selector */}
          <div className="w-full">
            <GoogleTranslate />
          </div>

          {/* Stripe badge (mobile — teacher only) */}
          {user?.role === "TEACHER" && user?.teacher?.stripeOnboarded && (
            <Badge className="bg-[#A9F877] px-3 py-1 text-xs text-black w-fit">
              Stripe Connected
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AppHeader;
