import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
