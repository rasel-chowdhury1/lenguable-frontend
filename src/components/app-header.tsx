"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, CreditCard, CalendarPlus, LogIn } from "lucide-react";
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
              <Link href="/#pricing">
                <Button
                  size="sm"
                  className="gap-2 bg-[#A9F877] hover:bg-[#C1FF72] text-black"
                >
                  <CreditCard className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">
                    {user?.student?.credits} Credit Class
                  </span>
                </Button>
              </Link>

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
          <div className="hidden md:block">
            <GoogleTranslate />
          </div>

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
