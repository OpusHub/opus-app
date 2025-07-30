"use client";

import {
  Calendar,
  Settings,
  ChartColumnBig,
  BotMessageSquare,
  UsersRound,
  LogOutIcon,
  Settings2,
  MessageSquare,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartColumnBig,
  },
  {
    title: "Clientes",
    url: "/clients",
    icon: UsersRound,
  },
  {
    title: "Agenda",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Meu Agente",
    url: "/agents",
    icon: BotMessageSquare,
  },
  {
    title: "Chat",
    url: "/chat-opus",
    icon: MessageSquare,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter(); 
  const pathname = usePathname();

  const session = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth");
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b-1">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Opus" width={50} height={50} />
          <div className="flex gap-2 items-end">
             <h1 className="text-2xl font-semibold text-white">Opus</h1><p className="text-muted-foreground text-sm mr-8">ecomm</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <SidebarMenu>
          <SidebarMenuItem >
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="size-lg py-6 cursor-pointer">
                  <Avatar>
                    <AvatarFallback>{session.data?.user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div >
                    <p className="text-sm ">
                      {session.data?.user?.company?.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {session.data?.user?.email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSignOut()}>
                  <LogOutIcon />
                  Sair
                </DropdownMenuItem><DropdownMenuItem >
                  <Settings />
                  Configurações Da Conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
