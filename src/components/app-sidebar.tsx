/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  // LayoutDashboard,
  BookOpen,
  Settings,
  Users,
  Wallet,
  Clock,
  // CalendarCheck,
  GraduationCap,
  CalendarDays,
  User,
} from "lucide-react";

import { NavItems } from "@/components/nav-items";
// import { NavUser } from "@/components/nav-user";
import { SidebarLogo } from "@/components/sidebar-logo";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetMeQuery } from "@/redux/features/userApi";

// const user = {
//   name: "Admin",
//   email: "admin@gmail.com",
//   avatar: "/avatars/shadcn.jpg",
//   // role: "Student",
// };

// const role = "TEACHER";

const menus: Record<string, any[]> = {
  STUDENT: [
    // { title: "Dashboard", url: "/dashboard/student", icon: LayoutDashboard },
    {
      title: "My Lessons",
      url: "/dashboard/student/lessons",
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      url: "/dashboard/student/teachers",
      icon: Users,
    },
    // {
    //   title: "My Lessons",
    //   url: "/dashboard/student/my-lessons",
    //   icon: GraduationCap,
    // },
    {
      title: "Calendar",
      url: "/dashboard/student/calender",
      icon: CalendarDays,
    },
    // { title: "My Teacher", url: "/dashboard/student/my-teachers", icon: Users },
    {
      title: "My Booking",
      url: "/dashboard/student/booking",
      icon: BookOpen,
    },
    // {
    //   title: "My Booking",
    //   url: "/dashboard/student/my-bookings",
    //   icon: BookOpen,
    // },
    // { title: "My Credit", url: "/dashboard/student/my-credit", icon: CreditCard },
    {
      title: "My Account",
      url: "/dashboard/student/my-account",
      icon: Settings,
    },
  ],

  TEACHER: [
    // { title: "Dashboard", url: "/dashboard/teacher", icon: LayoutDashboard },
    // {
    //   title: "My Schedule",
    //   url: "/dashboard/teacher/schedules",
    //   icon: Clock,
    // },
    {
      title: "My Schedule",
      url: "/dashboard/teacher/my-schedules",
      icon: Clock,
    },
    {
      title: "My Students",
      url: "/dashboard/teacher/students",
      icon: Users,
    },
    // {
    //   title: "My Booking",
    //   url: "/dashboard/teacher/my-booking",
    //   icon: CalendarCheck,
    // },
    // {
    //   title: "My Students",
    //   url: "/dashboard/teacher/my-students",
    //   icon: Users,
    // },
    {
      title: "My Lessons",
      url: "/dashboard/teacher/lessons",
      icon: GraduationCap,
    },
    {
      title: "My Earnings",
      url: "/dashboard/teacher/my-earnings",
      icon: Wallet,
    },
    {
      title: "My Account",
      url: "/dashboard/teacher/my-account",
      icon: User,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { data } = useGetMeQuery(undefined);
  const user = data?.data;

  const navItems = user ? menus[user.role] || [] : [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent>
        <NavItems items={navItems} />
      </SidebarContent>
      {/* 
      {user && (
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      )} */}

      <SidebarRail />
    </Sidebar>
  );
}
