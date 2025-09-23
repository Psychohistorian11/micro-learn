"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Command } from "lucide-react";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { navigationBarData } from "@/lib/data";
import { AuthAlertDialog } from "@/components/ui/custom/auth-alert-dialog";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { CommunitiesSection } from "../community/communities-section";
import { SearchResults } from "../search/search_result";
import { useState } from "react";

export function AppDesktopSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { requireAuth, showDialog, handleLoginRedirect, closeDialog } = useAuthGuard();
  const [activeItem, setActiveItem] = useState(navigationBarData.navMain[0]);
  const [query, setQuery] = useState("")
  const [mails, setMails] = useState(navigationBarData.mails || []);
  const { setOpen } = useSidebar();

  function handleClick(item: (typeof navigationBarData.navMain)[0]) {
    if (item.title === "Create") {
      requireAuth(() => {
        setActiveItem(item);
        router.push(item.url);
      }, "Necesitas estar logueado para crear un recurso.");
    } else {
      router.push(item.url);
      setActiveItem(item);
      const mail = navigationBarData.mails.sort(() => Math.random() - 0.5);
      setMails(mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1)));
      setOpen(true);
    }
  }

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
        {...props}
      >
        <Sidebar
          collapsible="none"
          className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r bli"
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push("/")} size="lg" asChild className="md:h-8 md:p-0">
                  <a>
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Micro Learn</span>
                      <span className="truncate text-xs"></span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup >
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {navigationBarData.navMain
                    .filter((item) =>
                      item.title === "Home" || item.url === "/create-resource"
                    )
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={{
                            children: item.title,
                            hidden: false,
                          }}
                          onClick={() => handleClick(item)}
                          isActive={activeItem?.title === item.title}
                          className="px-2.5 md:px-2"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>


              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="">
              <div className="border border-t-1 mb-2"></div>
              <SidebarGroupContent>
                <CommunitiesSection />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <NavUser user={navigationBarData.user} />
          </SidebarFooter>
        </Sidebar>

        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <SidebarInput
              placeholder="Buscar recursos o comunidades..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SidebarHeader>

          <SidebarContent>
            {query ? (
              <SearchResults query={query} />
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                Escribe para buscar
              </div>
            )}
          </SidebarContent>
        </Sidebar>
      </Sidebar>

      <AuthAlertDialog
        open={showDialog}
        onOpenChange={closeDialog}
        onLogin={handleLoginRedirect}
        description="Necesitas estar logueado para crear un recurso."
      />
    </>
  );
}
