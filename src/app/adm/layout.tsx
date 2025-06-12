"use client";
import { JSX, useState } from "react";
import { Footer } from "@/components/footer";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";
import { TableServices } from "@/components/Category/Services-category/TableServices";
import { TableClients } from "@/components/Category/Clients-category/TableClients";
import { CalendarApp } from "@/components/Category/Calendar-category/Calendar";
import { TableAgends } from "@/components/Category/Agends-category/page";
import { DashboardInteractive } from "@/components/Dashboard/Dashboard-interactive";
import { SettingOption } from "@/components/Category/Setting-option/page";

type PageKey =
  | "home"
  | "dashboard"
  | "calendar"
  | "appointments"
  | "services"
  | "clients"
  | "settings"
  | "help";

const pageTitles: Record<PageKey, string> = {
  home: "Início",
  dashboard: "Dashboard",
  calendar: "Calendário",
  appointments: "Agendamentos",
  services: "Serviços",
  clients: "Clientes",
  settings: "Configurações",
  help: "Ajuda",
};

//  Mapeamos os componentes para cada página
const pages: Record<PageKey, JSX.Element> = {
  home: <SectionCards />,
  dashboard: <DashboardInteractive />,
  calendar: <CalendarApp />,
  appointments: <TableAgends />,
  services: <TableServices />,
  clients: <TableClients />,
  settings: <SettingOption />,
  help: <h1 className="text-center text-2xl font-bold">Ajuda</h1>,
};

export default function Layout() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");

  return (
    <>
      <SidebarProvider>
        <AppSidebar onChangePage={setCurrentPage} currentPage={currentPage} />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-full flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="w-full px-4 lg:px-6 space-y-3">
                <SiteHeader title={pageTitles[currentPage]} />
                {pages[currentPage]}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
