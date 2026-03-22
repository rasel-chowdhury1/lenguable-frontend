"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Globe, CreditCard, CalendarPlus, LogIn } from "lucide-react";
import { useState } from "react";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useLogoutMutation } from "@/redux/features/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import GoogleTranslate from "./main/shared/GoogleTranslate";

const AppHeader = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<"en" | "es">("en");
  const { data } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const user = data?.data;

  const handleLogout = async () => {
    try {
      const res = await logout(undefined).unwrap();
      toast.success(res?.message || "User logout successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Logout failed!");
    }
  };

  return (
    <div className="flex h-16 shrink-0 items-center border-b bg-sidebar sticky top-0 z-50">
      <div className="flex w-full items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 px-4">
          {/* Credits & Book a Class (Student only) */}
          {user?.role === "STUDENT" && (
            <>
              <Button
                size="sm"
                className="gap-2 bg-[#A9F877] hover:bg-[#C1FF72] text-black"
              >
                <CreditCard className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">
                  {user?.student?.credits} Credit Class
                </span>
              </Button>

              <Link href="/dashboard/student/calender" passHref>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-sidebar cursor-pointer"
                >
                  <CalendarPlus className="h-4 w-4 shrink-0 sm:hidden inline" />
                  <span className="hidden sm:inline">Book a Class</span>
                </Button>
              </Link>
            </>
          )}

          {/* Stripe Connect (Teacher only) */}
          {user?.role === "TEACHER" && (
            <>
              {!user?.teacher?.stripeOnboarded ? (
                <Link href="/dashboard/teacher/stripe/connect">
                  <Button
                    size="sm"
                    className="gap-2 bg-[#A9F877] hover:bg-[#C1FF72] text-black"
                  >
                    Connect Stripe
                  </Button>
                </Link>
              ) : (
                <Badge className="bg-[#A9F877] px-3 py-1 text-xs text-black">
                  Stripe Connected
                </Badge>
              )}
            </>
          )}

          {/* Language Selector */}
          <GoogleTranslate />

          {/* Login / Logout */}
          {user ? (
            <Button
              onClick={handleLogout}
              size="sm"
              className="gap-2 bg-sidebar text-black hover:bg-sidebar hover:cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/")}
              size="sm"
              className="gap-2 bg-sidebar text-black hover:bg-sidebar hover:cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
