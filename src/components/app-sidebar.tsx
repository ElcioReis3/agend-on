"use client";

import * as React from "react";
import {
  HomeIcon,
  Calendar,
  ListIcon,
  FolderIcon,
  UsersIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  HelpCircleIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";

// Adicionamos "home" como uma opção válida
type PageKey =
  | "home"
  | "dashboard"
  | "calendar"
  | "appointments"
  | "services"
  | "clients"
  | "settings"
  | "help";

//  Criamos o menu de navegação com a opção "Início"
const menuItems: {
  title: string;
  page: PageKey;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { title: "Início", page: "home", icon: HomeIcon },
  { title: "Dashboard", page: "dashboard", icon: LayoutDashboardIcon },
  { title: "Calendário", page: "calendar", icon: Calendar },
  { title: "Agendamentos", page: "appointments", icon: ListIcon },
  { title: "Serviços", page: "services", icon: FolderIcon },
  { title: "Clientes", page: "clients", icon: UsersIcon },
];

type AppSidebarProps = {
  onChangePage: (page: PageKey) => void;
  currentPage: PageKey;
};

export function AppSidebar({ onChangePage, currentPage }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.page}>
              <SidebarMenuButton
                onClick={() => onChangePage(item.page)}
                className={`${
                  item.page === currentPage
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu className="mt-auto">
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => onChangePage("settings")}>
              <SettingsIcon className="w-5 h-5 mr-2" />
              Configurações
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => onChangePage("help")}>
              <HelpCircleIcon className="w-5 h-5 mr-2" />
              Ajuda
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
