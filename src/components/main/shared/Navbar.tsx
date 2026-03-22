/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import logo from "../../../../public/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMeQuery } from "@/redux/features/userApi";
import { useLogoutMutation } from "@/redux/features/authApi";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const { data } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const user = data?.data;
  console.log(user, "User data ==>");

  const handleLanguageChange = (lang: string) => setSelectedLanguage(lang);

  const handleLogout = async () => {
    try {
      const res = await logout(undefined).unwrap();
      toast.success(res?.message || "User logout successfully !");
      window.location.reload();
      router.push("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "User logout successfully !");
    }
  };

  const links = [
    { name: "Our Pricing", href: "/#pricing" },
    { name: "About Us", href: "/about-us" },
  ];

  return (
    <header className="w-full bg-[#EEFEE4] py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src={logo}
              alt="Lenguable Logo"
              height={60}
              width={200}
              className="object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-semibold ${
                  pathname === link.href ? "underline text-gray-900" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 bg-transparent hover:bg-transparent hover:cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  {selectedLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("English")}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("Spanish")}
                >
                  Spanish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Conditional Auth Buttons */}
            {user ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-none bg-transparent hover:bg-transparent hover:cursor-pointer"
                >
                  Logout
                </Button>

                {/* Role-based Dashboard */}
                {user?.role &&
                  user?.student?.payment?.some(
                    (p: any) => p.status === "completed",
                  ) && (
                    <Link
                      href={`/dashboard/${
                        user.role === "STUDENT"
                          ? "student/lessons"
                          : "teacher/schedules"
                      }`}
                    >
                      <Button
                        variant="outline"
                        className="hover:cursor-pointer"
                      >
                        Dashboard
                      </Button>
                    </Link>
                  )}

                <Link href="/book">
                  <Button className="bg-[#A9F877] hover:bg-[#C1FF72] text-black">
                    Book Now
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-semibold hover:cursor-pointer"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="hover:cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/#">
                  <Button className="bg-[#A9F877] hover:bg-[#C1FF72] text-black hover:cursor-pointer">
                    Book Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3 text-center">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-semibold"
              >
                {link.name}
              </Link>
            ))}

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-1"
                >
                  <Globe className="w-4 h-4" />
                  {selectedLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    handleLanguageChange("English");
                    setMobileMenuOpen(false);
                  }}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleLanguageChange("Spanish");
                    setMobileMenuOpen(false);
                  }}
                >
                  Spanish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons for Mobile */}
            {user ? (
              <>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
                {user.role && (
                  <Link href={`/dashboard/${user.role.toLowerCase()}`}>
                    <Button variant="outline" className="w-full mt-3">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Link href="/#" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full mt-3">Book Now</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full mt-3">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full mt-3">Book Now</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
