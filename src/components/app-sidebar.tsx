/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BookOpen,
  Settings,
  Users,
  Wallet,
  Clock,
  GraduationCap,
  CalendarDays,
  User,
} from "lucide-react";

import { NavItems } from "@/components/nav-items";
import { SidebarLogo } from "@/components/sidebar-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetMeQuery } from "@/redux/features/userApi";


const menus: Record<string, any[]> = {
  STUDENT: [
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
    {
      title: "Calendar",
      url: "/dashboard/student/calender",
      icon: CalendarDays,
    },
    {
      title: "My Booking",
      url: "/dashboard/student/booking",
      icon: BookOpen,
    },
    {
      title: "My Account",
      url: "/dashboard/student/my-account",
      icon: Settings,
    },
  ],

  TEACHER: [
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
      <SidebarRail />
    </Sidebar>
  );
}
